import * as getPostAPI from 'src/api/IncarSalesBank/post'; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
} from 'src/lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects';

/* 액션 타입 */
//액션 타입_SUCCESS  , 액션 타입_ERROR 은  asyncUtil 에서 처리 할떄 사용

//액션타입 인카세일즈뱅크게시판 통합 조회 
const GET_ISBTOTALSEARCH = 'incarSalesBank/GET_ISBTOTALSEARCH'; // 인카세일즈뱅크게시판 통합 조회
const GET_ISBTOTALSEARCH_SUCCESS = 'incarSalesBank/GET_ISBTOTALSEARCH_SUCCESS' ; //인카세일즈뱅크게시판 통합 조회 성공
const GET_ISBTOTALSEARCH_ERROR = 'incarSalesBank/GET_ISBTOTALSEARCH_ERROR' ; // 인카세일즈뱅크게시판 통합 조회 실패

/* 액션 함수 */
//액션 함수 인카세일즈뱅크 통합조회
export const getISBTotalSearch = (params) => ({type: GET_ISBTOTALSEARCH,payload:params});

/*사가 */
//인카세일즈뱅크 통합조회 사가
const getISBTotalSearchSaga = createPromiseSaga(GET_ISBTOTALSEARCH, getPostAPI.getISBTotalsearch);

export function* ISBTotalSearchsSaga() {
  yield takeEvery(GET_ISBTOTALSEARCH, getISBTotalSearchSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  ISBTotalSearch: reducerUtils.initial()
};

export default function ISBTotalSearch(state = initialState, action) {
  switch (action.type) {
    case GET_ISBTOTALSEARCH:
    case GET_ISBTOTALSEARCH_SUCCESS:
    case GET_ISBTOTALSEARCH_ERROR:
      return handleAsyncActions(GET_ISBTOTALSEARCH, 'ISBTotalSearch', true)(state, action);
    default:
      return state;
  }
}
