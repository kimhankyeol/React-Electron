//한줄공지
import * as getPostAPI from 'src/api/IncarSalesBank/post'; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
} from 'src/lib/asyncUtils';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
/* 액션 타입 */
//액션 타입_SUCCESS  , 액션 타입_ERROR 은  asyncUtil 에서 처리 할떄 사용
//나중에 네임스페이스화 시켜야됨 요청 ox 기준으로

//AXIOS 요청 O  (비동기 통신)
//액션타입 인카세일즈뱅크 한줄공지
const GET_ONENOTILIST = 'incarSalesBank/GET_ONENOTILIST'; // 인카세일즈뱅크 한줄공지 조회
const GET_ONENOTILIST_SUCCESS = 'incarSalesBank/GET_ONENOTILIST_SUCCESS' ; //인카세일즈뱅크 한줄공지 조회 성공
const GET_ONENOTILIST_ERROR = 'incarSalesBank/GET_ONENOTILIST_ERROR' ; // 인카세일즈뱅크 한줄공지 조회 실패

//AXIOS 요청 X (이벤트만 처리) 단순 호버 , 클릭 등등
//액션타입 한줄공지 탭 on off
const ONELINENOTITABONOFF = 'incarSalesBank/ONELINENOTITABONOFF';
const ONELINENOTITABONOFF_ASYNC = 'incarSalesBank/ONELINENOTITABONOFF_ASYNC';
//액션타입 한줄공지 row add 로우 추가
const ONELINENOTIROWADD = 'incarSalesBank/ONELINENOTIROWADD';
const ONELINENOTIROWADD_ASYNC = 'incarSalesBank/ONELINENOTIROWADD_ASYNC';
//액션타입 한줄공지 row add 로우 삭제
const ONELINENOTIROWDEL = 'incarSalesBank/ONELINENOTIROWDEL';
const ONELINENOTIROWDEL_ASYNC = 'incarSalesBank/ONELINENOTIROWDEL_ASYNC';

/* 액션 함수 */
//axios 요청 o (비동기 통신 )
//액션 함수 인카세일즈뱅크 한줄공지
export const getOneNotiList = () => ({ type: GET_ONENOTILIST });

//axios 요청 x (단순 이벤트 처리)
//액션 함수 사이드바 탭 - 한줄공지 수정 보여주기/가리기
export const oneLineNotiTabOnOff = (OneNotiVisible) =>({ type:ONELINENOTITABONOFF, OneNotiVisible:OneNotiVisible});
export const oneLineNotiTabOnOffAsync = (OneNotiVisible) =>({ type:ONELINENOTITABONOFF_ASYNC, OneNotiVisible:OneNotiVisible});
//액션 함수 한줄공지 row 추가 
export const oneLineNotiRowAdd = () => ({ type: ONELINENOTIROWADD});
export const oneLineNotiRowAddAsync = () => ({ type: ONELINENOTIROWADD_ASYNC});
//액션 함수 한줄공지 row 삭제 
export const oneLineNotiRowDel = (id) => ({ type: ONELINENOTIROWDEL, id:id});
export const oneLineNotiRowDelAsync = (id) => ({ type: ONELINENOTIROWDEL_ASYNC, id:id});


/*사가 */
//axios 요청 o (비동기 통신 )
//인카세일즈뱅크 한줄공지조회 사가
const getOneNotiListSaga = createPromiseSaga(GET_ONENOTILIST, getPostAPI.getOneNotiList);

//axios 요청 x (단순 이벤트 처리)
//한줄공지 보여주기 사가
function* oneLineNotiTabOnOffSaga(action) {
  yield put(oneLineNotiTabOnOff(action.OneNotiVisible)); // put은 특정 액션을 디스패치 해줍니다.
}
//한줄공지 행 추가 이벤트 사가
function* oneLineNotiRowAddSaga(){
  yield put(oneLineNotiRowAdd());
}
//한줄공지 행 삭제 이벤트 사가
function* oneLineNotiRowDelSaga(action){
  yield put(oneLineNotiRowDel(action.id));
}


export function* OneNotisSaga() {
  yield takeEvery(GET_ONENOTILIST, getOneNotiListSaga);
  yield takeLatest(ONELINENOTITABONOFF_ASYNC,oneLineNotiTabOnOffSaga);
  yield takeLatest(ONELINENOTIROWADD_ASYNC,oneLineNotiRowAddSaga);
  yield takeLatest(ONELINENOTIROWDEL_ASYNC,oneLineNotiRowDelSaga);

}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
   OneNotiList: reducerUtils.initial() // 한줄공지조회
  ,OneNotiListNewRowNo: 1  // 이거는 한줄공지 조회 된거 제외하고 추가되는 로우에 대한 숫자 이거는 막증가해도 상관없음
  ,OneNotiVisible:false  //사이드 탭 - 한줄공지 수정
};

export default function OneNoti(state = initialState, action) {
  let oneNotiRows = state.OneNotiList.data;
  switch (action.type) {
    case GET_ONENOTILIST:
    case GET_ONENOTILIST_SUCCESS:
    case GET_ONENOTILIST_ERROR:
      return handleAsyncActions(GET_ONENOTILIST, 'OneNotiList', true)(state, action);
    case ONELINENOTITABONOFF_ASYNC:
      return {
        ...state,
        OneNotiVisible:!action.OneNotiVisible
      };
    case ONELINENOTIROWADD_ASYNC:
      return {
        ...state,
        OneNotiListNewRowNo:state.OneNotiListNewRowNo+1,
        OneNotiList:reducerUtils.initial(
          //좀더 고민하면 될거같은데 일단은 이렇게
          {"result":oneNotiRows.result.concat({"id":"newRow"+state.OneNotiListNewRowNo,"title":"","startDate":new Date(),"endDate":new Date(),"order":""})}
          )
      };
    case ONELINENOTIROWDEL_ASYNC:
      return {
        ...state,
        OneNotiList:reducerUtils.initial(
          //좀더 고민하면 될거같은데 일단은 이렇게
          {"result":oneNotiRows.result.filter(row => row.id !== action.id )}
          )
      };
    default:
      return state;
  }
}
