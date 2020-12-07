import axios from 'axios';
// const config = {
//   headers:{
//     "Access-Control-Allow-Origin": "*",
//     // 'Content-Type':'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Methods':' GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers':'Origin, Content-Type'
//   }
// }

//설정으로 dev 면 자신이 설정한 테스트 ip  아니면 운영경로
//나중에 post 로  axios.post
//검색어 순위 조회 
export const getSearchRankWord = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'/isb/get/searchRankWord');
  return response.data;
};
//게시판 통합 조회 
export const getISBTotalsearch = async (params) => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'/isb/get/totalSearch',{
    params:params
  });
  return response.data;
}
//한줄공지 조회(수정)
export const getOneNotiList = async() =>{
  const response = await axios.get(process.env.REACT_APP_API_URL+'/isb/get/oneNotiList');
  return  response.data;
}
