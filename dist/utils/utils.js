"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlyDate = void 0;
function getOnlyDate(d) {
    var date = new Date(d);
    var sDate = '';
    sDate += date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    sDate += '/';
    sDate += date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    sDate += '/';
    sDate += date.getFullYear();
    return sDate;
}
exports.getOnlyDate = getOnlyDate;
