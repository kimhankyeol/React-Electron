// //2020-11-17 인증은 electron에서 진행함
// import * as getAuthAPI from 'src/api/Auth/Authentication'; // api/posts 안의 함수 모두 불러오기
// import {
//   reducerUtils,
//   handleAsyncActions,
//   createPromiseSaga,
// } from 'src/lib/asyncUtils';
// import { takeEvery,getContext } from 'redux-saga/effects';//takeEvery
// /* 액션 타입 */

// //인증
// // const GET_AUTH = 'AUTH/GET_AUTH'; 
// // const GET_AUTH_SUCCESS = 'AUTH/GET_AUTH_SUCCESS';
// // const GET_AUTH_ERROR = 'AUTH/GET_AUTH_ERROR';
// //인증후 경로 변경
// const GO_TO_PATH = 'GO_TO_PATH';

// /* 액션 함수 */

// let mid=localStorage.getItem('mid')

// //테스트
// //export const getAuth = key => ({ type: GET_AUTH,payload:key });
// //운영 15초마다 인증키가 바껴서 테스트하기 어려움
// // export const AuthCheck = () => ({ type: GET_AUTH , payload:{서버 통신의 필요한값 파라미터 처리} });

// export const goToPath = path => ({ type: GO_TO_PATH , payload:path});

// //나중에 변수로 넣어서 처리 해야될거같음
// function* goToPathSaga(action) {
//   const history = yield getContext('history');
//   history.push(action.payload);
// }
// // const getLoginAuthSaga = createPromiseSaga(GET_AUTH, getAuthAPI.AuthCheck);


// export function* AuthAsyncSaga() {
//     // yield takeEvery(GET_AUTH, getLoginAuthSaga);
//     yield takeEvery(GO_TO_PATH, goToPathSaga);
// }


// // initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
// const initialState = {
//     Auth: reducerUtils.initial(), // 리팩토링 : 외부동작을 바꾸지않으면서 내부구조 변경
// };

// export default function Auth(state = initialState, action) {
//     switch (action.type) {
//       // case GET_AUTH:
//       // case GET_AUTH_SUCCESS:
//       // case GET_AUTH_ERROR:
//       //   return handleAsyncActions(GET_AUTH, 'Auth', true)(state, action);
//       default:
//         return state;
//     }
//   }
  