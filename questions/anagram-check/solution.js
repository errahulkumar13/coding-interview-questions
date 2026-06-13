"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAnagrams = areAnagrams;
function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function areAnagrams(first, second) {
    const normalizedFirst = normalizeText(first);
    const normalizedSecond = normalizeText(second);
    if (normalizedFirst.length !== normalizedSecond.length) {
        return false;
    }
    const characterCounts = {};
    for (const character of normalizedFirst) {
        characterCounts[character] = (characterCounts[character] || 0) + 1;
    }
    for (const character of normalizedSecond) {
        const currentCount = characterCounts[character];
        if (!currentCount) {
            return false;
        }
        if (currentCount === 1) {
            delete characterCounts[character];
        }
        else {
            characterCounts[character] = currentCount - 1;
        }
    }
    return Object.keys(characterCounts).length === 0;
}
const testCases = [
    ["listen", "silent", true],
    ["hello", "world", false],
    ["Dormitory", "Dirty room", true],
    ["The eyes", "They see", true],
    ["JavaScript", "TypeScript", false],
];
for (const [first, second, expected] of testCases) {
    const actual = areAnagrams(first, second);
    const status = actual === expected ? "PASS" : "FAIL";
    console.log(`${status}: "${first}" and "${second}" => ${actual}`);
}
