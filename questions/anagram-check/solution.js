"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAnagrams = areAnagrams;
function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function areAnagrams(first, second) {
    var normalizedFirst = normalizeText(first);
    var normalizedSecond = normalizeText(second);
    if (normalizedFirst.length !== normalizedSecond.length) {
        return false;
    }
    var characterCounts = {};
    for (var _i = 0, normalizedFirst_1 = normalizedFirst; _i < normalizedFirst_1.length; _i++) {
        var character = normalizedFirst_1[_i];
        characterCounts[character] = (characterCounts[character] || 0) + 1;
    }
    for (var _a = 0, normalizedSecond_1 = normalizedSecond; _a < normalizedSecond_1.length; _a++) {
        var character = normalizedSecond_1[_a];
        var currentCount = characterCounts[character];
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
var testCases = [
    ["listen", "silent", true],
    ["hello", "world", false],
    ["Dormitory", "Dirty room", true],
    ["The eyes", "They see", true],
    ["JavaScript", "TypeScript", false],
];
for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
    var _a = testCases_1[_i], first = _a[0], second = _a[1], expected = _a[2];
    var actual = areAnagrams(first, second);
    var status_1 = actual === expected ? "PASS" : "FAIL";
    console.log("".concat(status_1, ": \"").concat(first, "\" and \"").concat(second, "\" => ").concat(actual));
}
