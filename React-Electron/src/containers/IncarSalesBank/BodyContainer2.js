import React, { useEffect, useState }  from 'react';
import { useSelector, useDispatch,shallowEqual } from 'react-redux';
import { Row , Col, Badge , Tabs , Tooltip , Card , Carousel ,Avatar, Spin } from 'antd';
import { UserOutlined , NotificationFilled , EditFilled, LoadingOutlined } from '@ant-design/icons';
import { hoverOnAsync, hoverOffAsync } from 'src/modules/IncarSalesBank/main/MenuCategoryModule';//IncarSalesBank
import { getOneNotiList, oneLineNotiTabOnOffAsync } from 'src/modules/IncarSalesBank/main/OneNotiModule';
// import { } from '@ant-design/icons';
import TextLoop from "react-text-loop";
//사이드 탭  - 한줄공지 수정 클릭
import SideTab from 'src/components/common/SideTab';
//알림
import NotificationAlarm from 'src/components/common/NotificationAlarm';
//비동기 요청
import { fetchData , BridgeFetchData} from 'src/lib/fetchData';
//날짜 포맷
import { todayFormat } from 'src/lib/dateFormatter';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

//Carousel   비동기 통신후에 img 경로 가져오면 될듯 상태값
const imgList = [{"src":"./img/incar1.jpg","i":1,"alt":"알트1"},{"src":"./img/incar2.jpg","i":2,"alt":"알트2"}];

  //검색순위 렌더
  let searchRankWordRender = "";
  //한줄공지 렌더
  let oneNotiRender = "";
  //메뉴 렌더
  let menuRender = "";
  //모바일용메뉴
  let mobileMenuRender = "";
  //이미지 슬라이드 렌더
  let imgSlideRender = "";
    
const MenuContainer = ({mbCheck}) => {

    //pc 면 1000 모바일 이면 592
    let dpMaxWidth = !mbCheck === false ? 1000 : 592

    //변수 및 함수 선언
    // 메뉴 리스트 변수 
    const [isbMenuList,setIsbMenuList] = useState(null);
    const [imlLoading , setImlLoading] = useState(false);
    const [imlError , setImlError] = useState(null);

    // 한줄 공지 변수
    const [oneNotiData,setOneNotiData] = useState(null);
    const [ondLoading , setOndLoading] = useState(false);
    const [ondError , setOndError] = useState(null);

    //한줄 공지 수정 변수
    //이 전역변수는  수정에서 사용할 변수들
    const { id , oneNotiList , oneNotiVisible } = useSelector(state => ({ 
        id : state.MenuCategory.id
        ,oneNotiList : state.OneNoti.OneNotiList    
        ,oneNotiVisible : state.OneNoti.OneNotiVisible
    }),shallowEqual);

    //검색순위 변수
    const [searchWordRankResult , setSearchWordRankResult] = useState(null);
    const [swLoading , setSwLoading] = useState(false);
    const [swError , setSwError] = useState(null);


    const dispatch = useDispatch();
    //메뉴 호버
    const onHover = (id) => {
        dispatch(hoverOnAsync(id));
    };
    const offHover = () => {
        dispatch(hoverOffAsync());
    };
    useEffect (() =>{
          //공통 함수 axios 요청  // 전역 스토어 관리와 같은 개념으로 만듬 //지역 변수 관리할시 사용 
        //변수 1. error 함수 , 2. loading 함수 , 3.response 함수 , 4. 요청 url 5. 파라미터 6. get / post
        //인카의 모든 요청은 일단 post
        //1. 메뉴 탭 리스트  
        BridgeFetchData(setImlError,setImlLoading,setIsbMenuList,"/Etc/ISalesBankNew/TabList",{},"post");
        BridgeFetchData(setSwError,setSwLoading,setSearchWordRankResult,"/Etc/ISalesBankNew/SearchWordRank",{},"post");
        BridgeFetchData(setOndError,setOndLoading,setOneNotiData,"/Etc/ISalesBankNew/OneLineNotice",{},"post");s
    },[] //변수  바뀔때만 실행  굳이 저부분 안넣어도 됨  [] 안에 있는값이 변경되면 useEffect 실행
    )
    //메뉴박스 호버
    //원래는 p태그 썻는데 p태그안에 div 허용안되서 변경함
    const  DemoBox = props =>
    <>
        <div
            onMouseOver={()=>{
                onHover(props.tabno);
            }}
            onMouseLeave={()=>{
                offHover();
            }}
            onClick={()=>{
                // openPopup('#/isb/boardPopup/'+props.tabno,'인카 세일즈 뱅크 게시판');
            }}
            style={{
                width:"100%",
                height:props.value,backgroundColor:"rgb(114, 128, 194)",
                display: "block",
                marginBlockStart: "1em",
                marginBlockEnd: "1em",
                marginInlineStart:"0px",
                marginInlineEnd:"0px",
                marginTop: 0,
                marginBottom: "1em"
            }}>
            { 
            //이중 삼항연산자 
                id===props.tabno ?
                (isbMenuList===null ? <div style={{height:props.value}}></div> : <div style={{height:props.value}} dangerouslySetInnerHTML={{__html:isbMenuList.data.object.rec.filter(row => row.data === props.tabno.toString())[0].content}}></div>  )
                :(isbMenuList===null ? "":isbMenuList.data.object.rec.filter(row => row.data === props.tabno.toString())[0].label) 
            }
        </div>
    </>
   

    //한줄공지 on/off -수정
    const oneLineNotiTabOnOff = () => {
        dispatch(oneLineNotiTabOnOffAsync(oneNotiVisible));
        //oneNotivisible 이 false 일때 (닫혀있을떈) 데이터 초기화 
        if(oneNotiVisible===false){
        dispatch(getOneNotiList());
        }
    }
    
    //여기는 하드코딩된 부분이라 굳이 비동기로 데이터를 가져올 필요없음
    const noticePrefix = <NotificationFilled style={{fontSize:20,color:"#273a8c",width:"10%"}} />;
    const noticeSuffix = <EditFilled onClick={()=>{oneLineNotiTabOnOff()}} style={{fontSize:20,color:"#273a8c",width:"10%"}}/>;
  
    //모바일 메뉴 분기 처리 
    if(imlLoading === false && imlError === null && isbMenuList !== null){
        mobileMenuRender=
            isbMenuList.data.object.rec.map(data =>
                (
                <Col xs={{span:5,offset:1}} lg={{span:5,offset:1}} key={"imlColKey"+data.data}>
                    <span className="avatar-item" >
                        <Badge count={data.new_db_cnt}>
                            <Avatar style={{width:"100%",height:"100%"}} shape="square" icon={<UserOutlined/>} />
                            <div
                            style={{
                                display: "block",
                                marginBlockStart: "1em",
                                marginBlockEnd: "1em",
                                marginInlineStart:"0px",
                                marginInlineEnd:"0px",
                                marginTop: 0,
                                marginBottom: "1em",
                                textAlign:"center",
                                lineHeight:"20px"
                            }}
                            dangerouslySetInnerHTML={{__html:data.mbtitle}}
                            ></div>
                        </Badge>
                    </span>
                </Col>
                )
            )
    }else if(imlError !== null){
        menuRender=NotificationAlarm("메뉴","에러입니다.")
    }

    //검색순위 분기 처리 
    if(swLoading === false && swError === null && searchWordRankResult !== null){
        searchRankWordRender = 
            JSON.parse(searchWordRankResult.data.object.rec).map((searchWord,index)=>{
            const text  = <p>{searchWord}</p>;
            return  <Tooltip placement="topLeft" key={"searchRankWord"+index+1} title={text}><p style={{width:"50%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}><span style={{color:"#273a8c",fontWeight:"bold"}}>{index+1}</span>{" "+searchWord}</p></Tooltip>
        })
    }else if(swError !== null){
        searchRankWordRender=NotificationAlarm("검색어","에러입니다.")
    }

    //한줄공지 분기 처리
    if(ondLoading === false && ondError === null && oneNotiData !== null){
        console.log(oneNotiData.data.object.rec)
        //한줄공지
        oneNotiRender =
        <div style={{margin:"0 auto",maxWidth:dpMaxWidth-16}}>
            <div style={{marginBottom:"15px",paddingTop:"5px",paddingBottom:"5px",display:"inline-flex",width:"100%",backgroundColor:"white"}}>
                {noticePrefix}
                <div style={{width:"80%"}}>
                    <div className="lineEllips">
                    { oneNotiData.data.object.rec.map((data)=>(data.title))&&<TextLoop interval={3000} children={ oneNotiData.data.object.rec.map((data)=>(data.title)) }></TextLoop> }
                    </div>
                </div>
                {noticeSuffix}
            </div>
        </div>
    }else if( ondError !== null ){
        oneNotiRender=NotificationAlarm("한줄공지 조회","에러입니다.")
    }
    
    //이미지 슬라이드 렌더 
    //여기도 분기처리해야됨
    imgSlideRender =
    <div style={{maxWidth:dpMaxWidth,margin: "0px auto",paddingTop:10}}>
        <Carousel autoplay>
            {imgList.map(image=>(<div key={image.i}><img src={image.src} style={{width:"100%",height:180,maxHeight:200, minHeight:150}} alt={image.alt} /></div>))}
        </Carousel>
    </div>
  //최종 렌더링 - 모바일인지 PC 인지 

  if(!mbCheck){
    //메뉴
    menuRender=
    <Tabs defaultActiveKey="1"  style={{ maxWidth:dpMaxWidth , margin:"0 auto" }} tabBarStyle={{margin:"0 auto"}} tabBarGutter={30}>
        <TabPane tab="메뉴" key="1">
            <Row align="top" gutter={[8,16]} style={{margin:0}}>
                {mobileMenuRender}
            </Row>
        </TabPane>
        <TabPane tab="검색 순위" key="2">
            <Card title={<div style={{display:"flex",justifyContent:"space-between"}}><div>{"자료 조회 순위"}</div><div style={{fontWeight:100}}>{todayFormat()}</div></div>} loading={swLoading} style={{height:"100%",margin:"0 auto",paddingBottom:"0px"}} headStyle={{fontWeight:"bold"}} bodyStyle={{padding:12}}>
                {searchRankWordRender}
            </Card>
        </TabPane>
    </Tabs> 
  }else{
    menuRender = 
    // 나중에 탭 no 정해야됨
        <Row justify="center" align="top" gutter={16}  style={{ maxWidth:dpMaxWidth , margin:"0 auto"}}>
            <Col span={7} >
                <DemoBox value={210} tabno={2}></DemoBox>
                <DemoBox value={70} tabno={6}></DemoBox>
            </Col>
            <Col span={17}>
                <div>
                <DemoBox value={170} tabno={1}></DemoBox>
                </div>
                <div style={{marginLeft:"-8px",marginRight:"-8px",display:"flex"}}>
                    <Col span={12}><DemoBox value={110} tabno={3}></DemoBox></Col>
                    <Col span={12}><DemoBox value={110} tabno={4}></DemoBox></Col>
                </div>
            </Col>
            <Col span={12}>
                <DemoBox value={50} tabno={5}></DemoBox>
            </Col>
            <Col span={12}>
                <DemoBox value={50} tabno={7}></DemoBox>
            </Col>
        </Row> 
  }

  return (    
    <>
        {/* 한줄공지 */}
        {oneNotiRender}
        {/* 메뉴  */}
        <Spin
        spinning={imlLoading} 
        size="large"  indicator={<LoadingOutlined spin/>} 
        style={{
        width: "100%",
        position: "absolute",
        backgroundColor:"rgba(0,0,0,0.3)",
        color:"#273a8c",
        zIndex: 9999}}
        >
            {menuRender}
        </Spin>
        {/* 이미지 슬라이드 */}
        {imgSlideRender}
        {/* 사이드바  1. 비저블 2.탭 함수 3.데이터(수정할 데이터), 4. 제목 5. 원본 데이터 6.위치  */}
        { SideTab(oneNotiVisible,oneLineNotiTabOnOff,oneNotiList,"한줄공지 수정","bottom") }
        {/* <Link to="/isb/detail/1/1" style={{width:"100%",height:"auto"}}>  */}
            <div onClick={()=>{
                // openPopup('#/isb/detail/1/1','게시판 상세보기')
            }}>게시판상세보기 연습</div>
            {/* </Link> */}
            <Link to="/isb/register/1" style={{width:"100%",height:"auto"}}> 
            <div>게시판등록 </div>
            </Link>
            <Link to="/isb/boardPopup" style={{width:"100%",height:"auto"}}> 
            <div>게시판등록팝업연습 </div>
        </Link>
    </>
  )
}

export default MenuContainer;
