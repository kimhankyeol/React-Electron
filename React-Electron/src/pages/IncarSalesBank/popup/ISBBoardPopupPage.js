import React from 'react';
import ISBBoardPopupContainer from 'src/containers/IncarSalesBank/popup/ISBBoardPopupContainer';

function ISBBoardPopupPage({match}) {
  document.title="인카세일즈뱅크 게시판"
  return <ISBBoardPopupContainer match={match}/>
}

export default ISBBoardPopupPage;
