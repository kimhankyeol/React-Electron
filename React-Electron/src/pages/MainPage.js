// import { Spin } from 'antd';
// import React from 'react';
// // import  { AuthCheck, goToPath } from 'src/modules/Auth/AuthModule';//IncarSalesBank

// // import { useSelector,shallowEqual } from 'react-redux';
// // import ViewContainer from 'src/containers/ViewContainer';

// //인증은 electron 에서 

// function MainPage() {
//   let mainRender = "";
//   //2020-11-17
//   //인증코드 받아오므로 다시 로그인 로직 짜야됨
//   // if( Auth !== null && Auth.data !==null && Auth.error === null ){
//   //   // if( Auth.data.status.ercode === 0 ){
//   //   //   //인증진행을 완료 한적이 있고  요청 에러가 없는경우
//   //   //   dispatch(goToPath('/isb'));
//   //   // }else{
//   //   //   //인증진행은 하였지만 login이 안된 경우  요청 에러가 없는경우 
//   //   //   dispatch(goToPath('/login'));
//   //   // } 
//   // }else if( Auth.error !== null ){
//   //   //요청 에러
//   //   mainRender =<>오류 발생 - {Auth.error}</>
//   // }else if( Auth.loading === true ){
//   //   //로딩
//   //   mainRender =
//   //   <Spin spinning={Auth.loading} 
//   //   style = {{ position: "absolute",top: "50%",height: "100px",marginTop: "-50px",textAlign: "center",width: "100%"}}
//   //   size="large" tip="인증중입니다.">
//   //   </Spin>
//   // }else if( Auth.data === null && Auth.loading === false && Auth.error === null ){
    
//   //   //초기인증
//   //   dispatch(AuthCheck());
//   //   //테스트 
//   //   //dispatch(getAuth());
//   // }
//   return (
//     <>
//       {mainRender}
//     </>
//  );
// }

// export default MainPage;
