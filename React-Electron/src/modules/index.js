//modules 는 action 과 reducer
//리듀서 여러개를 하나로 묶음
import { combineReducers } from 'redux';
//인증 처리 는 electron
// import Auth,{ AuthAsyncSaga } from './Auth/AuthModule';
//인카세일즈뱅크 - 한줄공지 
import OneNoti, { OneNotisSaga } from './IncarSalesBank/main/OneNotiModule';
//인카세일즈뱅크 - 검색어 순위
import SearchWordRank, { SearchWordRanksSaga } from './IncarSalesBank/main/SearchWordRankModule';
//인카세일즈뱅크 - 메뉴 카테고리
import MenuCategory, { MenuCategorysSaga } from './IncarSalesBank/main/MenuCategoryModule';
//인카세일즈뱅크 - 총합 검색
import ISBTotalSearch, { ISBTotalSearchsSaga } from './IncarSalesBank/main/ISBTotalSearchModule';
//인카세일즈뱅크 - 뷰필터 - > 이거는 common으로 뺴야됨
import ViewFilter, { ViewFiltersSaga } from './IncarSalesBank/main/ViewFilterModule';
//공통 -
import { CommonsSaga } from './common/CommonModule';

//redux-saga 여러개를 묶음
import { all } from 'redux-saga/effects';

//Auth, AuthAsyncSaga()
const rootReducer = combineReducers({ OneNoti , SearchWordRank , MenuCategory , ISBTotalSearch , ViewFilter });
export function* rootSaga() {
  yield all([ OneNotisSaga() , SearchWordRanksSaga() , MenuCategorysSaga() , ISBTotalSearchsSaga() , ViewFiltersSaga(), CommonsSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
