//사이드바 같은 것
import React from 'react';
import { Drawer, Form, Button, Col, Row, DatePicker, Input } from 'antd';
import moment from 'moment';
import { oneLineNotiRowAddAsync, oneLineNotiRowDelAsync } from 'src/modules/IncarSalesBank/main/OneNotiModule'
import { useDispatch } from 'react-redux';

// import 'moment/locale/ko';
// import locale from 'antd/es/date-picker/locale/ko_KR';

//dateFormat
const dateFormat ='YYYY-MM-DD';
function SideTab(visible,tabOnOff,oneNotiList,sideTitle,placement){

  const dispatch = useDispatch();
  //한줄공지 row 추가-수정
  const oneLineNotiRowAdd = () => {
      dispatch(oneLineNotiRowAddAsync(visible));
  }
  //한줄공지 row 삭제-수정
  const oneLineNotiRowDel = (id)=>{
      dispatch(oneLineNotiRowDelAsync(id));
  }

  let changeValue = (chgVal,index)=>{
    let newList = [oneNotiList];
    newList[index] = chgVal;
  }

  let render="";
  if(oneNotiList.data!==null){
  render = 
  oneNotiList.data.result.map((d,index)=>{
       return (
         <Row gutter={16} key={"notiRow"+index}>
           <Col span={11}>
               <Form.Item
               rules={[{ required: true, message: '공지내용을 입력하세요' }]}
               >
               <Input name={d.id} key={index} onChange={(e)=>{changeValue(e.target.value, index)}} defaultValue={d.title} placeholder="공지내용을 입력하세요" />
               </Form.Item>
           </Col>
           <Col span={9}>
               <Form.Item
               rules={[{ required: true, message: 'Please choose the dateTime' }]}
               >
               <DatePicker.RangePicker
                   defaultValue={[moment(d.startDate,dateFormat),moment(d.endDate,dateFormat)]}
                   format={dateFormat}
                   style={{ width: '100%' }} 
                   getPopupContainer={trigger => trigger.parentElement}
               />
               </Form.Item>
           </Col>
           <Col span={4} style={{textAlign:"center"}}>
               <Button danger onClick={()=>{oneLineNotiRowDel(d.id)}}>삭제</Button>
           </Col>
        </Row>
       )
     })
  }

    return (
      <>
        <Drawer
          title={sideTitle}
          height="50%"
          onClose={tabOnOff}
          maskClosable={false}
          visible={visible}
          placement={placement}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button  type="success" style={{ marginRight: 8 }} onClick={()=>{oneLineNotiRowAdd();}}>
                추가
              </Button>
              <Button  style={{ marginRight: 8 }}>
                돌아가기
              </Button>
              <Button  type="primary">
                저장
              </Button>
            </div>
          }
        >
          <Form layout="vertical"  hideRequiredMark>
            <Row gutter={16} style={{paddingBottom:20}}>
              <Col span={11} style={{textAlign:"center"}}>공지내용</Col>
              <Col span={9} style={{textAlign:"center"}}>게시기간</Col>
              <Col span={4} style={{textAlign:"center"}}>버튼</Col>
            </Row>
           {render}
          </Form>
        </Drawer>
      </>
    );
}

export default SideTab;