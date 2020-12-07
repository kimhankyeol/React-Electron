
import React  from 'react';
import { Input  } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { goToPath } from 'src/modules/common/CommonModule';
import NotificationAlarm from 'src/components/common/NotificationAlarm';

const HeaderContainer2 = ({match,mbCheck}) => {
     //useSelector 상태값을 효율적으로 사용하려면 const 변수로 각각 따로 선언 하던가 ,shallowEqual 써야됨-> 객체의 겉의 값만 보고 판단함  
    // 이유 Hook을 통해 매번 렌더링될떄마다 새로운 객체를 만드는것이기 때문에 낭비 렌더링이 일어남
    // 자세히 보면 useSelect 해서 받는 곳은 const인데 const 는 지역상수이므로 변하지 않는게 맞지만 Hooks로 계속 값을 바꿔주고 있기 때문에 낭비가 일어날수도 있음
    const ISBTotalSearchResult  = useSelector(state => state.ISBTotalSearch.ISBTotalSearch,shallowEqual);
    const dispatch = useDispatch();
    // 뷰만 변경
    const GoToPath = (path)=>{
        dispatch(goToPath(path));
    }
    return (
        <div style={{padding:"20px 8px 20px 8px" , maxWidth: mbCheck === false ? 1000 : 592 , margin:"0 auto"}}>
            <div style={{width:"100%",textAlign:"center"}}><img src="./img/logo.gif" style={{paddingBottom:20}} onClick={()=>{GoToPath('/')}} alt=""/></div>
            <Input.Search  placeholder="원하는 자료명을 검색하세요" onSearch={(value)=>{
                        if(value===""){
                            NotificationAlarm("입력한 검색어가 없습니다.");
                            return false;
                        }else{
                            //나중에는 serviceworker 로 처리해야될듯 중복호출
                            if(ISBTotalSearchResult.loading===false){
                                GoToPath(`/isb/search/`+value);
                            }else{
                                NotificationAlarm("검색어를 조회중입니다.");
                                return false;
                            }
                        }
                    }} enterButton  loading={ISBTotalSearchResult.loading}/>
        </div>
    )
}

export default HeaderContainer2;