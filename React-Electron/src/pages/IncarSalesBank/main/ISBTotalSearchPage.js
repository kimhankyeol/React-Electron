import React from 'react';
// import { useSelector,shallowEqual } from 'react-redux';
// import ViewContainer from 'src/containers/ViewContainer';
import HeaderContainer from 'src/containers/IncarSalesBank/HeaderContainer2';
import TotalBoardContainer from 'src/containers/IncarSalesBank/TotalBoardContainer';
import { mobileCheck } from 'src/lib/mobileCheck';

function ISBTotalSearchPage({match}) {
    const mbCheck = mobileCheck();
    // const view = useSelector(state => state.ViewFilter.viewFilter,shallowEqual);
    return (
      <>
        {/* 헤더는 ISBTotalSearchResult useSelector 따로 */}
        <HeaderContainer match={match} mbCheck={mbCheck} />
        <TotalBoardContainer match={match} mbCheck={mbCheck} />
        {/* 나중에 ViewContainer 하나 만들어서 분기처리 해야될거같음  이렇게하면 if 문안하고 렌더 가능*/}
        {/* <ViewContainer visible={view==='MenuContainer'}>
          <MenuContainer mbCheck={mbCheck}/>
        </ViewContainer>
         <ViewContainer visible={view==='TotalBoardContainer'}>
          <TotalBoardContainer match={match} mbCheck={mbCheck} ISBTotalSearchResult={ISBTotalSearchResult}/>
        </ViewContainer> */}
    </>
   );
  }
  
  export default ISBTotalSearchPage;
  