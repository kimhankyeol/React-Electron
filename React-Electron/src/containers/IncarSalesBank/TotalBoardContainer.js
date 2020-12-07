//통합 검색 및 공통 검색화면 
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

function TotalBoardContainer({match,mbCheck}) {
   
    ///////////////////////////////////////
    ////////////전역적 상태관리의 예 //////
    const ISBTotalSearchResult  = useSelector(state => state.ISBTotalSearch.ISBTotalSearch,shallowEqual);
    //구조화 할당
    const { searchWord }  = match.params;
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getISBTotalSearch({searchWord:searchWord}));
    },[searchWord,dispatch])

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
    </>
  );
}

export default TotalBoardContainer;
