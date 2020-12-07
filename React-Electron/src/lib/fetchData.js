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
   
//비동기 요청 공통
//변수 1. error 함수 , 2. loading 함수 , 3.response 함수 , 4. 요청 url 5. 파라미터 6. get / post
export async function fetchData(setError,setLoading,setResponse,url,params,type){
    setError(null); //에러 null 처리
    try{
      setLoading(true); //로딩중
      //여기서 res 안에 상태를 통해 오류처리
      let res = "";
      if(type==="get"){
        res = await axios.get(url,{
            params:params
        });
      }else if(type==="post"){
         res = await axios.post(url,{
            params:params
        });
      }
      setResponse(res);

    }catch(e){
      setError(e); //error 설정
    }
    setLoading(false);
  }
export async function BridgeFetchData(setError,setLoading,setResponse,url,params,type){
  // let mid=localStorage.getItem('mid')

    const requestBody = {
       //서버통신에 필요한값 파라미터 처리
    }
    setError(null); //에러 null 처리
    try{
      setLoading(true); //로딩중
      //여기서 res 안에 상태를 통해 오류처리
      let res = "";
      //우리 회사는 다 Post
      if(type==="get"){
        res = await axios.get(process.env.REACT_APP_BRIDGE_API+url,stringify(requestBody),config);
      }else if(type==="post"){
         res = await axios.post(process.env.REACT_APP_BRIDGE_API+url,stringify(requestBody),config);
      }
      setResponse(res);

    }catch(e){
      setError(e); //error 설정
    }
    setLoading(false);
  } 