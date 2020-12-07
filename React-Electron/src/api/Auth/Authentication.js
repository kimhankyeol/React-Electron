import axios from 'axios';
import { stringify } from 'querystring';
//헤더설정
const config = {
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type':'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods':' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'Origin, Content-Type'
  }
}


// export const AuthCheck = async (authInfo) => {
//   //인증정보
//   const requestBody ={
//     otp_key:authInfo.otp_key
//     ,machine_guid:authInfo.mid
//     ,url:authInfo.url
//   }
//   const response = await axios.post(`https://m-bridge.incar.co.kr/IIms/Request.php`,stringify(requestBody),config);
//   // console.log(response);
//   //성공
//   if(response.data.status.ercode==="0"){
//     sessionStorage.setItem("auth_info",response.data.object);
//   }
  
//   return response.data;
// }


// 인증  나중에 key 값 숨기던가 post로 바꿔야됨 //테스트용임
// export const getAuth = async (key) => {
//   const response = await axios.get(`서버url/test/Auth/${key}`);
//   // console.log(response);
//   // let AuthInfo = AuthCheck('1234').then(d=>{console.log(d)});

//   return response.data;
// }
