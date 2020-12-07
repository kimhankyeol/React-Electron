//web용 openPopup
export const openPopup = (url,title) => {
    //option 은 여기서 지정
    var option = "widht=800,height=600,top=50,toolbar=no,menubar=no,resizable=no,location=no";
    window.open(url,title,option);
    // window.open(window.location.origin +url,title,option);
    // var isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? true : false;
    // return isMobile;
}
