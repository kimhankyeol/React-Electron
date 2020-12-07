import { put,takeLatest } from 'redux-saga/effects';

//axios 요청 o

//axios 요청 x 
// 액션 타입  에는 접두사 넣어야 중복을 방지한다.
//액션타입 메뉴 호버
const HOVERON = 'incarSalesBank/HOVERON';
const HOVEROFF = 'incarSalesBank/HOVEROFF';
const HOVERON_ASYNC = 'incarSalesBank/HOVERON_ASYNC';
const HOVEROFF_ASYNC = 'incarSalesBank/HOVEROFF_ASYNC';
// 액션 생성 함수
//axios 요청 o

//axios 요청 x 
//액션 함수 메뉴 호버
export const hoverOn = (id) => ({ type: HOVERON,id:id });
export const hoverOnAsync = (id) => ({ type: HOVERON_ASYNC,id:id});
export const hoverOff = () => ({ type: HOVEROFF });
export const hoverOffAsync = () => ({ type: HOVEROFF_ASYNC });


  //사가
  //axios 요청 o

  //axios 요청 x 
  //메뉴 호버 사가
  function* hoverOnSaga(action) {
    yield put(hoverOn(action.id)); // put은 특정 액션을 디스패치 해줍니다.
  }
  function* hoverOffSaga() {
    yield put(hoverOff()); // put은 특정 액션을 디스패치 해줍니다.
  }

  //사가 집합
  export function* MenuCategorysSaga() {
      yield takeLatest(HOVERON_ASYNC, hoverOnSaga); // takeEvery모든 INCREASE_ASYNC 액션을 처리
      yield takeLatest(HOVEROFF_ASYNC, hoverOffSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  }
  
  // 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
  //hover
  const initialState = {
      id:0 // 여기서 id는 인카세일즈뱅크 호버시 사용  구버전 
  };
  
  export default function MenuCategory(state = initialState, action) {
    switch (action.type) {
      case HOVERON:
        return {
          ...state, // ... spread syntax javascript 위와 같이 정해지지 않은 갯수의 매개변수를 받는 함수를 전개 구문(...)
          id:action.id,
        };
      case HOVEROFF:
        return {
          ...state,
          id:0,
        };
      default:
        return state;
    }
  }
  