# Data Structures: Validate HTML-like String Nesting

## Problem Statement

Write a TypeScript function that validates whether an HTML-like string has correctly nested tags.

Use a stack to track opening tags and make sure every closing tag matches the most recent unmatched opening tag.

## Examples

```text
Input: "<div><p>Hello</p></div>"
Output: true
```

```text
Input: "<div><p>Hello</div></p>"
Output: false
```

```text
Input: "<section><img /></section>"
Output: true
```

## Requirements

- Use a stack.
- Support opening tags like `<div>`.
- Support closing tags like `</div>`.
- Support self-closing tags like `<img />`.
- Ignore plain text between tags.
- Return `true` for valid nesting.
- Return `false` for invalid nesting.

## Bonus

- Handle attributes like `<div class="card">`.
- Treat malformed tags as invalid.
- Mention the time and space complexity.

## Run

Compile the TypeScript:

```powershell
tsc.cmd solution.ts
```

Run the generated JavaScript:

```powershell
node solution.js
```
