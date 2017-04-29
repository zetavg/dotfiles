"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TagMatcher {
    constructor(corpus, position) {
        let opening = corpus.lastIndexOf(TagMatcher.openTag, position);
        if (opening === -1) {
            return;
        }
        // If we found the closing tag, keep searching back for the opening tag
        if (corpus[opening + 1] === TagMatcher.closeSlash) {
            position = opening;
            opening = corpus.lastIndexOf(TagMatcher.openTag, opening - 1);
            if (opening === -1) {
                return;
            }
        }
        const tagNameMatch = TagMatcher.tagNameRegex.exec(corpus.substring(opening + 1));
        if (tagNameMatch === null) {
            return;
        }
        const close = corpus.indexOf(TagMatcher.closeTag, opening + 1);
        const tagName = tagNameMatch[0];
        // We now know where the opening tag is
        this.openStart = opening;
        this.openEnd = close + 1;
        // Search for the closing tag
        const toFind = `</${tagName}>`;
        const closeTag = corpus.indexOf(toFind, position);
        if (closeTag === -1) {
            return;
        }
        this.closeStart = closeTag;
        this.closeEnd = closeTag + toFind.length;
    }
    findOpening(inclusive) {
        if (inclusive) {
            return this.openStart;
        }
        return this.openEnd;
    }
    findClosing(inclusive) {
        if (inclusive) {
            return this.closeEnd;
        }
        return this.closeStart;
    }
}
TagMatcher.openTag = "<";
TagMatcher.closeTag = ">";
TagMatcher.closeSlash = "/";
TagMatcher.tagNameRegex = /[^\s>]+/;
exports.TagMatcher = TagMatcher;
//# sourceMappingURL=tagMatcher.js.map