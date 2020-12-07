import React from 'react';
import { Route,Switch } from 'react-router-dom';
// import MainPage from './pages/MainPage';
//로그인 페이지
// import LoginPage from './pages/Auth/LoginPage';
import IncarSalesBankPage from './pages/IncarSalesBank/main/IncarSalesBankPage2';

import ISBTotalSearchPage from './pages/IncarSalesBank/main/ISBTotalSearchPage';
// import ISBBoardPopupPage from './pages/IncarSalesBank/popup/ISBBoardPopupPage';
//상세 페이지
import ISBDetailPage from './pages/IncarSalesBank/main/ISBDetailPage';
//등록 페이지
import ISBRegisterPage from './pages/IncarSalesBank/main/ISBRegisterPage';

function App() {
  return (
    <>
      <Switch>
        {/* <Route path="/" component={MainPage} exact={true} /> */}
        <Route path="/" component={IncarSalesBankPage} exact={true} />
        <Route path="/isb/search/:searchWord" component={ISBTotalSearchPage} exact={true} />
        <Route path="/isb/detail/:tabno/:pk" component={ISBDetailPage}></Route>
        <Route path="/isb/register/:tabno" component={ISBRegisterPage}></Route>
        <Route path="/isb/list/:tabno" component={ISBRegisterPage}></Route>
        {/* <Route path="/isb/boardPopup/:tabno" component={ISBBoardPopupPage} exact={true} /> */}
      </Switch>    
    </>
  );
}

export default App;
