type ParsedTag = {
  name: string;
  isClosing: boolean;
  isSelfClosing: boolean;
};

function parseTag(rawTag: string): ParsedTag | null {
  const match = rawTag.match(/^<\s*(\/)?\s*([a-zA-Z][a-zA-Z0-9-]*)(?:\s+[^<>]*?)?\s*(\/)?\s*>$/);

  if (!match) {
    return null;
  }

  const isClosing = match[1] === "/";
  const name = match[2].toLowerCase();
  const isSelfClosing = match[3] === "/";

  if (isClosing && isSelfClosing) {
    return null;
  }

  return {
    name,
    isClosing,
    isSelfClosing,
  };
}

function validateHtmlLikeNesting(input: string): boolean {
  const stack: string[] = [];
  const tagPattern = /<[^<>]*>/g;
  let currentMatch: RegExpExecArray | null;
  let lastMatchEnd = 0;

  while ((currentMatch = tagPattern.exec(input)) !== null) {
    const textBeforeTag = input.slice(lastMatchEnd, currentMatch.index);

    if (textBeforeTag.indexOf("<") !== -1 || textBeforeTag.indexOf(">") !== -1) {
      return false;
    }

    const parsedTag = parseTag(currentMatch[0]);

    if (!parsedTag) {
      return false;
    }

    if (parsedTag.isSelfClosing) {
      lastMatchEnd = tagPattern.lastIndex;
      continue;
    }

    if (!parsedTag.isClosing) {
      stack.push(parsedTag.name);
      lastMatchEnd = tagPattern.lastIndex;
      continue;
    }

    const lastOpenedTag = stack.pop();

    if (lastOpenedTag !== parsedTag.name) {
      return false;
    }

    lastMatchEnd = tagPattern.lastIndex;
  }

  const remainingText = input.slice(lastMatchEnd);

  if (remainingText.indexOf("<") !== -1 || remainingText.indexOf(">") !== -1) {
    return false;
  }

  return stack.length === 0;
}

const testCases: Array<[string, boolean]> = [
  ["<div><p>Hello</p></div>", true],
  ["<div><p>Hello</div></p>", false],
  ["<section><img /></section>", true],
  ['<div class="card"><span>Text</span></div>', true],
  ["<ul><li>One</li><li>Two</li></ul>", true],
  ["<div><span></div>", false],
  ["<div><br /></div>", true],
  ["<div><p>Missing close</div>", false],
  ["plain text only", true],
  ["<1invalid></1invalid>", false],
];

for (const testCase of testCases) {
  const input = testCase[0];
  const expected = testCase[1];
  const actual = validateHtmlLikeNesting(input);
  const status = actual === expected ? "PASS" : "FAIL";

  console.log(`${status}: ${input} => ${actual}`);
}

export { validateHtmlLikeNesting };
