import { put, takeLatest } from 'redux-saga/effects';//takeEvery
// 액션 타입  에는 접두사 넣어야 중복을 방지한다.
//액션타입 뷰필터
const VIEW_FILTER = 'incarSalesBank/VIEW_FILTER';
const VIEW_FILTER_ASYNC = 'incarSalesBank/VIEW_FILTER_ASYNC';
 
// 액션 생성 함수

//액션 함수 뷰필터 예) /  한경로 내에 여러 뷰 보여줄떄 사용 (filter)
export const viewFilter = (filter)=>({type:VIEW_FILTER,filter:filter});
export const viewFilterAsync = (filter) => ({ type: VIEW_FILTER_ASYNC,filter:filter});

//사가
//뷰 필터 사가
function * viewFilterSaga(action){
  yield put(viewFilter(action.filter));
}

//사가 집합
export function* ViewFiltersSaga() {
  yield takeLatest(VIEW_FILTER_ASYNC,viewFilterSaga);
}

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
//hover
const initialState = {
    viewFilter:"MenuContainer" // 뷰필터 기본값 인카세일즈 바디
};

export default function ViewFilter(state = initialState, action) {
  switch (action.type) {
    case VIEW_FILTER:
      return {
        ...state,
        viewFilter:action.filter
      };
    default:
      return state;
  }
}
