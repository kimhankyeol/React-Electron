import React from 'react';
// import { useSelector,shallowEqual } from 'react-redux';
// import ViewContainer from 'src/containers/ViewContainer';
import RegisterContainer from 'src/containers/IncarSalesBank/RegisterContainer';

function ISBRegisterPage() {
    //const view = useSelector(state => state.ViewFilter.viewFilter,shallowEqual);
    return (
      <>
      {/* 추후 상세보기 화면이 조금씩 달라서 viewcontainer로 처리 */}
        <RegisterContainer />
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
  
  export default ISBRegisterPage;
  