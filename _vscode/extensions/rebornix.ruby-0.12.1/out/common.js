"use strict";
(function (SocketClientState) {
    SocketClientState[SocketClientState["ready"] = 0] = "ready";
    SocketClientState[SocketClientState["connected"] = 1] = "connected";
    SocketClientState[SocketClientState["closed"] = 2] = "closed";
})(exports.SocketClientState || (exports.SocketClientState = {}));
var SocketClientState = exports.SocketClientState;
(function (Mode) {
    Mode[Mode["launch"] = 0] = "launch";
    Mode[Mode["attach"] = 1] = "attach";
})(exports.Mode || (exports.Mode = {}));
var Mode = exports.Mode;
//# sourceMappingURL=common.js.map