export function getOnlyDate(d: any) {
    const date = new Date(d);
    let sDate = '';
    sDate += date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    sDate += '/';
    sDate += date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    sDate += '/';
    sDate += date.getFullYear();

    return sDate;
}