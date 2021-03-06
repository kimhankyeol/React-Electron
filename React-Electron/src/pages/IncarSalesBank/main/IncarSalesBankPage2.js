import React from 'react';
// import { useSelector,shallowEqual } from 'react-redux';
// import ViewContainer from 'src/containers/ViewContainer';
import HeaderContainer from 'src/containers/IncarSalesBank/HeaderContainer2';
import BodyContainer from 'src/containers/IncarSalesBank/BodyContainer2';

import { mobileCheck } from 'src/lib/mobileCheck';
// import ISBBoardPopupContainer from 'src/containers/IncarSalesBank/popup/ISBBoardPopupContainer';
// import TotalBoardContainer from 'src/containers/IncarSalesBank/TotalBoardContainer';

function IncarSalesBankPage2() {
  //const view = useSelector(state => state.ViewFilter.viewFilter,shallowEqual);
  const mbCheck = mobileCheck();
  return (
    <>
      <HeaderContainer mbCheck={mbCheck} />
      <BodyContainer mbCheck={mbCheck} />
      {/* 나중에 ViewContainer 하나 만들어서 분기처리 해야될거같음  이렇게하면 if 문안하고 렌더 가능*/}
      {/* <ViewContainer visible={view==='BodyContainer'}>
        <BodyContainer />
      </ViewContainer>
       <ViewContainer visible={view==='TotalBoardContainer'}>
        <TotalBoardContainer/>
      </ViewContainer> */}
  </>
 );
}

export default IncarSalesBankPage2;
