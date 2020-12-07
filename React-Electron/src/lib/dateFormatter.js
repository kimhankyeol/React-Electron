export const todayFormat = (type) => { 

    //type 1 , 2 , 3. .... 개발자가 원하는 포맷으로 지정하면 될듯
    var date   = new Date();
    var year   = date.getFullYear();
    var month  = date.getMonth()+1;
    var day    = date.getDate();
    var hour   = date.getHours();
    var minute = date.getMinutes();
    switch (type) {
        case 1:
            return year+"."+month+"."+day+" "+hour+":"+minute+" 기준";
        default:
            return year+"."+month+"."+day+" "+hour+":"+minute+" 기준";
    }


}

