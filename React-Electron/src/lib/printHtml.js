//팝업으로 DOM을 복사해 프린트: 편하긴 한데 css, js가 떨어짐
//전체 돔, 프린트 영역 원하는 돔 따로 저장한다음에 프린트영역만 살리고 프린트 후 전체 돔 살림: 편하긴 한데 js 이벤트 바인딩이 떨어짐
//3번방안  정상적으로 되긴하지만 html에..
export const printHtml = (el) => {
    const html = document.querySelector('html');
    const printContents = document.getElementById(el).innerHTML;
    const printDiv = document.createElement("DIV");
    printDiv.className = "print-div";

    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
    printDiv.remove();
}


//1번 방안 출력 클릭후 재출력 안됨 
// export const printHtml = (printContent) => {
//     var printContents = document.getElementById(printContent).innerHTML;
//     var originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
// }

//2번방안 팝업 띄어서 하면 dom 그자체를 가져오는게 아니기떄문에 css 깨짐
// export const printHtml = (printContent) => {
//     var printContents = document.getElementById(printContent).innerHTML;
//     var windowObject = window.open('',"PrintWindow","width=800, height=500, top=200, left=200, toolbars=no, scrollbars=no, status=no , resizable=no");
//     windowObject.document.writeln(printContents);
    
//     windowObject.document.close();
//     windowObject.focus();
//     windowObject.print();
//     windowObject.close();
// }
