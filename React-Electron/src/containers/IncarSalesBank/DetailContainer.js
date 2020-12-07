import React  from 'react';
import { Descriptions , List , Layout, Button, Tooltip  } from 'antd';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { DownloadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import moment from 'moment';
//프린트 출력
import { printHtml } from 'src/lib/printHtml';

//댓글
import CommentList from 'src/components/board/CommentList';
  const comRes = [
      {"pk":"1","author":"김한결","content":"댓글입니다.","datetime":"2020-11-19 11:11:11"}
      ,{"pk":"2","author":"김한결1","content":"댓글입니다1.1","datetime":"2020-11-20 11:11:11"}
  ];
  let commentList = comRes.map((data)=>{
      var obj = {};
      obj["pk"] = data.pk;
      obj["author"] = data.author;
      obj["content"] = <p>{data.content}</p>;
      obj["datetime"] =  
      <Tooltip title={moment(data.datetime).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(data.datetime).fromNow()}</span>
      </Tooltip>;
      return obj;
  })
function DetailContainer({mbCheck,match}){
    let dpMaxWidth = mbCheck === false ? 1000 : 592
    return (
        <Layout>
            <Layout.Content>
                <div id="printArea">
                {/* title은 탭 정보 받아와서 세일즈북인즈 인카is뭔들인지  */}
                    <Descriptions title="User Info" bordered style={{maxWidth:dpMaxWidth,margin:"0 auto"}}>
                        <Descriptions.Item label="제목" span={3} style={{padding:"10px 10px"}} >제목이다.</Descriptions.Item>
                        <Descriptions.Item label="작성자" span={3} style={{padding:"10px 10px"}}>김한결</Descriptions.Item>
                        <Descriptions.Item label="첨부파일" span={3} style={{padding:"10px 10px"}}>
                            {/* map으로 돌림  datasource // itemrender*/}
                            <List itemLayout="horizontal" size="small" bordered style={{height:100,overflow:"scroll"}}>
                                <List.Item>
                                    <List.Item.Meta title="kim.pdf" />
                                    <a href="123.html" target="_blank" rel="noopener noreferrer" download>
                                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="middle">
                                            Download
                                        </Button>
                                    </a>
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta title="kim.pdf" />
                                    <a href="123.html" target="_blank" rel="noopener noreferrer" download>
                                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="middle">
                                            Download
                                        </Button>
                                    </a>
                                </List.Item>
                            </List>
                        </Descriptions.Item>
                        <Descriptions.Item label="조회수" style={{padding:"10px 10px"}}>365</Descriptions.Item>
                        <Descriptions.Item label="별점" style={{padding:"10px 10px"}}>$20.00</Descriptions.Item>
                        <Descriptions.Item label="댓글수" style={{padding:"10px 10px"}}>123</Descriptions.Item>
                    </Descriptions>
                    <ReactQuill value="" modules={{toolbar:false}} style={{width:"100%",height:"300px",margin:"0 auto",paddingTop:20,paddingBottom:20}} readOnly />
                </div>
                {CommentList(commentList)}
                <div style={{width:"100%",textAlign:"center"}}>
                    <Button style={{margin:10}} onClick={()=>{
                        printHtml('printArea');
                    }} type="primary">
                        출력
                    </Button>
                    <Button style={{margin:10}} type="primary">
                        삭제
                    </Button>
                    <Button style={{margin:10}} type="primary">
                        수정
                    </Button>
                    <Button style={{margin:10}} onClick={()=>{window.history.go(-1)}} type="primary">
                        이전
                    </Button>
                </div>
           
            </Layout.Content>
        </Layout>

    )
}

export default DetailContainer;