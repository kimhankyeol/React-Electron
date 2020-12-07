
import React  from 'react';

// import { useSelector, useDispatch,shallowEqual } from 'react-redux';
// import { viewFilterAsync } from 'src/modules/IncarSalesBank/main/ViewFilterModule';//IncarSalesBank
import { Descriptions , Layout, Button, Input  } from 'antd';
import ReactQuill from 'react-quill';
import ImgThumbUpload from 'src/components/common/ImgThumbUpload';
import FileUpload from 'src/components/common/FileUpload';

function RegisterContainer(){
     // //useSelector 상태값을 효율적으로 사용하려면 const 변수로 각각 따로 선언 하던가 ,shallowEqual 써야됨-> 객체의 겉의 값만 보고 판단함  
    // 이유 Hook을 통해 매번 렌더링될떄마다 새로운 객체를 만드는것이기 때문에 낭비 렌더링이 일어남
    // 자세히 보면 useSelect 해서 받는 곳은 const인데 const 는 지역상수이므로 변하지 않는게 맞지만 Hooks로 계속 값을 바꿔주고 있기 때문에 낭비가 일어날수도 있음
    // const  ISBTotalSearchResult  = useSelector(state => state.ISBTotalSearch.ISBTotalSearch,shallowEqual);

    return (
        <Layout>
            <Layout.Content>
                {/* title은 탭 정보 받아와서 세일즈북인즈 인카is뭔들인지  */}
                    <Descriptions title="User Info" bordered style={{width:"80%",margin:"0 auto"}}>
                        <Descriptions.Item label="제목" span={3} style={{padding:"10px 10px"}} ><Input /></Descriptions.Item>
                        <Descriptions.Item label="작성자" span={3} style={{padding:"10px 10px"}}><Input /></Descriptions.Item>
                        <Descriptions.Item label="썸네일" span={3} style={{padding:"10px 10px"}}>
                            {/* 이미지 업로드 (클래스형으로 되어있음) 1. imgListCount : 이미지 업로드 갯수 */}
                            <ImgThumbUpload imgListCount="1"/>
                        </Descriptions.Item>
                        <Descriptions.Item label="첨부파일" span={3} style={{padding:"10px 10px"}}>
                            {/* 파일 멀티 업로드 */}
                            {FileUpload()}
                        </Descriptions.Item>
                    </Descriptions>
                    {/* modules={{toolbar:false}} */}
                    <ReactQuill value=""  style={{width:"80%",height:"300px",margin:"0 auto",paddingTop:20,paddingBottom:20}}  />
                <div style={{width:"100%",textAlign:"center",margin:"0 auto",paddingTop:"20px"}}>
                    <Button style={{margin:10}} type="primary">
                        등록
                    </Button>
                    <Button style={{margin:10}} type="primary">
                        취소
                    </Button>
                    <Button style={{margin:10}} type="primary">
                        목록
                    </Button>
                </div>
                
            </Layout.Content>
        </Layout>

    )
}

export default RegisterContainer;