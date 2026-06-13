"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHtmlLikeNesting = validateHtmlLikeNesting;
function parseTag(rawTag) {
    var match = rawTag.match(/^<\s*(\/)?\s*([a-zA-Z][a-zA-Z0-9-]*)(?:\s+[^<>]*?)?\s*(\/)?\s*>$/);
    if (!match) {
        return null;
    }
    var isClosing = match[1] === "/";
    var name = match[2].toLowerCase();
    var isSelfClosing = match[3] === "/";
    if (isClosing && isSelfClosing) {
        return null;
    }
    return {
        name: name,
        isClosing: isClosing,
        isSelfClosing: isSelfClosing,
    };
}
function validateHtmlLikeNesting(input) {
    var stack = [];
    var tagPattern = /<[^<>]*>/g;
    var currentMatch;
    var lastMatchEnd = 0;
    while ((currentMatch = tagPattern.exec(input)) !== null) {
        var textBeforeTag = input.slice(lastMatchEnd, currentMatch.index);
        if (textBeforeTag.indexOf("<") !== -1 || textBeforeTag.indexOf(">") !== -1) {
            return false;
        }
        var parsedTag = parseTag(currentMatch[0]);
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
        var lastOpenedTag = stack.pop();
        if (lastOpenedTag !== parsedTag.name) {
            return false;
        }
        lastMatchEnd = tagPattern.lastIndex;
    }
    var remainingText = input.slice(lastMatchEnd);
    if (remainingText.indexOf("<") !== -1 || remainingText.indexOf(">") !== -1) {
        return false;
    }
    return stack.length === 0;
}
var testCases = [
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
for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
    var testCase = testCases_1[_i];
    var input = testCase[0];
    var expected = testCase[1];
    var actual = validateHtmlLikeNesting(input);
    var status_1 = actual === expected ? "PASS" : "FAIL";
    console.log("".concat(status_1, ": ").concat(input, " => ").concat(actual));
}
