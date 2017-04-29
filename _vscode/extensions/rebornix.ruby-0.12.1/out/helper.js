"use strict";
function startsWith(str, searchString, position) {
    position = position || 0;
    return str.substr(position, searchString.length) === searchString;
}
exports.startsWith = startsWith;
;
function endsWith(str, searchString, position) {
    var subjectString = str.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
exports.endsWith = endsWith;
;
function includes(str, search, start) {
    'use strict';
    if (typeof start !== 'number') {
        start = 0;
    }
    if (start + search.length > str.length) {
        return false;
    }
    else {
        return str.indexOf(search, start) !== -1;
    }
}
exports.includes = includes;
;
//# sourceMappingURL=helper.js.map