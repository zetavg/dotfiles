/**
 * globals.ts hold some globals used throughout the extension
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Globals {
}
// true for running tests, false during regular runtime
Globals.isTesting = false;
Globals.modeHandlerForTesting = undefined;
Globals.WhitespaceRegExp = new RegExp("^ *$");
exports.Globals = Globals;
//# sourceMappingURL=globals.js.map