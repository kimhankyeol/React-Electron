import * as getPostAPI from 'src/api/IncarSalesBank/post'; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
} from 'src/lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects';

/* 액션 타입 */
//액션 타입_SUCCESS  , 액션 타입_ERROR 은  asyncUtil 에서 처리 할떄 사용

// GET 검색어 순위 조회
const GET_SEARCHRANKWORD = 'incarSalesBank/GET_SEARCHRANKWORD'; // GET 검색어 순위 시작
const GET_SEARCHRANKWORD_SUCCESS = 'incarSalesBank/GET_SEARCHRANKWORD_SUCCESS'; // GET 검색어 순위 요청 성공
const GET_SEARCHRANKWORD_ERROR = 'incarSalesBank/GET_SEARCHRANKWORD_ERROR'; // GET 검색어 순위 요청 실패

/* 액션 함수 */
//액션 함수 인카세일즈뱅크 검색어 순위 
export const getSearchRankWord = () => ({ type: GET_SEARCHRANKWORD });

/*사가 */
//인카세일즈뱅크 순위 사가
const getSearchRankWordSaga = createPromiseSaga(GET_SEARCHRANKWORD, getPostAPI.getSearchRankWord);


export function* SearchWordRanksSaga() {
  yield takeEvery(GET_SEARCHRANKWORD, getSearchRankWordSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  SearchWordRank: reducerUtils.initial(), // 리팩토링 : 외부동작을 바꾸지않으면서 내부구조 변경
};

export default function SearchWordRank(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCHRANKWORD:
    case GET_SEARCHRANKWORD_SUCCESS:
    case GET_SEARCHRANKWORD_ERROR:
      return handleAsyncActions(GET_SEARCHRANKWORD, 'SearchWordRank', true)(state, action);
    default:
      return state;
  }
}
