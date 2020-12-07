import axios from 'axios';
import { stringify } from 'querystring';
//axios 헤더설정
const config = {
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type':'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods':'  POST, OPTIONS',
    'Access-Control-Allow-Headers':'Origin, Content-Type'
  }
}


export const axiosCommon = async(paramInfo) =>{
//  파라미터 정보
  const response = await axios.post(`서버url`,stringify(paramInfo),config);
  return response.data;
}
