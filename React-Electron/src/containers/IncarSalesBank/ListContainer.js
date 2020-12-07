//공통 검색화면 
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, List , Space , Spin , Typography } from 'antd';
import { MessageOutlined, LikeOutlined, LoadingOutlined, FieldTimeOutlined } from '@ant-design/icons';
import ImageDemo from 'src/components/common/ImageDemo';

import { getISBTotalSearch } from 'src/modules/IncarSalesBank/main/ISBTotalSearchModule'
//비동기 요청 공통(지역)
// import { fetchData } from 'src/lib/fetchData';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ListContainer({match,mbCheck}) {
   
    ///////////////////////////////////////
    ////////////전역적 상태관리의 예 //////
    // const ISBTotalSearchResult  = useSelector(state => state.ISBTotalSearch.ISBTotalSearch,shallowEqual);
    // //구조화 할당
    // const { searchWord }  = match.params;
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //   dispatch(getISBTotalSearch({searchWord:searchWord}));
    // },[searchWord,dispatch])
    //////////////////////////////////////////
    /////지역적 상태관리의 예////////////////
    // 구조화 할당
    const { tabno } = match.params;
    const [ISBBoardSearchList , setISBBoardSearchList] = useState(null);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);
    const dispatch = useDispatch();
    // const parameters = {"searchWord":searchWord}
    useEffect (() =>{
        //공통 함수 axios 요청  // 전역 스토어 관리와 같은 개념으로 만듬 //지역 변수 관리할시 사용 
        //변수 1. error 함수 , 2. loading 함수 , 3.response 함수 , 4. 요청 url 5. 파라미터 6. get / post
        fetchData(setError,setLoading,setISBTotalSearchResult,"서버url/isb/get/listSearch",parameters,"get");
    },[searchWord] //검색어 바뀔때만 실행
  )
  
  return (
   ///////전역적 상태관리의 예////////////////
    <>
      <Spin spinning={ISBTotalSearchResult.loading} 
        size="large" tip="자료를 조회중입니다..." indicator={<LoadingOutlined spin/>} 
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor:"rgba(0,0,0,0.3)",
          color:"#273a8c",
          zIndex: 9999
        }}
        ></Spin>
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={ ISBTotalSearchResult.data!==null ? ISBTotalSearchResult.data.result : []}
        header={ ISBTotalSearchResult.data!==null ? <h2><b>{searchWord}</b> 통합검색 결과</h2>  : "" }
        //모바일 체크  모바일이면 maxwidth 592 pc 면 maxwidth 1000
        style={{maxWidth: mbCheck === false ? 1000 : 592,margin: "0 auto"}}
        renderItem={item => (
          
          //화면 분기 처리
          mbCheck === true ?
          //모바일
          <>
            <Card
                style={{alignItems:"center",marginBottom:10}}
                key={item.title}
                actions={[
                <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
                <IconText icon={FieldTimeOutlined} text={item.regDate} key="list-vertical-time-o" />
                ]}
                hoverable
                cover={
                  <div style={{textAlign:"center",marginTop:10,marginBottom:10}}>                  
                    {ImageDemo(item.src,100)}
                  </div>
                }
              >
                <Link to={`/isb/detail/`+item.tabno+`/`+item.id }> 
                  <Card.Meta
                    title={
                    // <Typography.Text strong><Link to="">{"제목 : "+item.title}</Link></Typography.Text>
                    <Typography.Text strong>{"제목 : "+item.title}</Typography.Text>
                    }
                    description={
                    <>
                      <Typography.Text strong>{"게시판 : "+item.description}</Typography.Text>
                      {/* <br /> */}
                      {/* <Typography.Text strong>{"내용 : ..."+item.content+"..."}</Typography.Text>   */}
                    </>
                    }
                  />
                  {item.content}
                </Link>
              </Card>
            </>
            :
            //pc
            <>
              <List.Item
                style={{alignItems:"center",marginBottom:10}}
                key={item.title}
                actions={[
                <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
                <IconText icon={FieldTimeOutlined} text={item.regDate} key="list-vertical-time-o" />
                ]}
                extra={
                  ImageDemo(item.src,150)
                }
              >
              <Link to={`/isb/detail/`+item.tabno+`/`+item.id }> 
                <List.Item.Meta
                  title={
                  // <Typography.Text strong><Link to="">{"제목 : "+item.title}</Link></Typography.Text>
                  <Typography.Text strong>{"제목 : "+item.title}</Typography.Text>
                  }
                  description={
                  <>
                    <Typography.Text strong>{"게시판 : "+item.description}</Typography.Text>
                    {/* <br /> */}
                    {/* <Typography.Text strong>{"내용 : ..."+item.content+"..."}</Typography.Text>   */}
                  </>
                  }
                />
                {item.content}
              </Link>
            </List.Item>
          </>
           
          )}
        />
       
      {/* </Spin> */}
      {/* //////////////////////////////////////////
    ///////지역적 상태관리의 예//////////////// */}
      {/* <Spin spinning={loading} 
      size="large" tip="자료를 조회중입니다..." indicator={<LoadingOutlined spin/>} 
      style = {{ position: "absolute",top: "50%",height: "100px",marginTop: "-50px",textAlign: "center",width: "100%", color:"#273a8c"}} >
        <Layout>
          <Layout.Content style={{height:"100%"}}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                style={{width:"80%",margin:"0 auto"}}
                dataSource={ ISBTotalSearchResult!==null ? ISBTotalSearchResult.data.result : []}
                header={ ISBTotalSearchResult!==null ? <h2><b>{searchWord}</b> 통합검색 결과</h2>  : "" }
                renderItem={item => (
                  <div style={{padding:"16px 8px",display:"inline-flex",width:"100%"}}>
                    {ImageDemo(item.src,"250")}
                    <Link to={`/isb/detail/`+item.tabno+`/`+item.id } style={{width:"100%",height:"auto"}}> 
                      <Card
                          key={item.id} 
                          style={{width:"100%",height:"100%"}}
                          bodyStyle={{display:"inline-flex"}}
                          hoverable
                          actions={[
                          <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                          <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
                          <IconText icon={FieldTimeOutlined} text={item.regDate} key="list-vertical-time-o" />
                          ]}
                      >
                      <Card.Meta
                          style={{margin:"auto 0"}}
                          title={
                            // <Typography.Text strong><Link to="">{"제목 : "+item.title}</Link></Typography.Text>
                            <Typography.Text strong>{"제목 : "+item.title}</Typography.Text>
                          }
                          description={
                            <>
                              <Typography.Text strong>{"게시판 종류 : "+item.description}</Typography.Text>
                              <br />
                              <Typography.Text strong>{"내용 : ..."+item.content+"..."}</Typography.Text>  
                            </>
                            }
                          prefixCls
                          />
                      </Card>
                    </Link>
                    <div onClick={()=>{history.goBack()}}>이전</div>
                  </div>
                )}
              />
          </Layout.Content>
        </Layout>
      </Spin> */}
    </>
  );
}

export default ListContainer;
