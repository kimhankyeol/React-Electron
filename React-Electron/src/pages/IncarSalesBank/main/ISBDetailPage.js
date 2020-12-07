import React from 'react';
// import { useSelector,shallowEqual } from 'react-redux';
// import ViewContainer from 'src/containers/ViewContainer';
import DetailContainer from 'src/containers/IncarSalesBank/DetailContainer';
import { mobileCheck } from 'src/lib/mobileCheck';

function ISBDetailPage({match}) {
    //const view = useSelector(state => state.ViewFilter.viewFilter,shallowEqual);
    const mbCheck = mobileCheck();
    return (
      <>
        <DetailContainer mbCheck={mbCheck} match={match}/>
      </>
   );
  }
  
  export default ISBDetailPage;
  