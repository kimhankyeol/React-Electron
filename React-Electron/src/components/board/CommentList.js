import React from 'react';
import { List , Comment , Button , Input , Pagination } from 'antd';

const CommentList = (data) =>{
    return (
    <>
        <div  style={{width:"95%",margin:"0 auto "}}>
            <div>
                <Input placeholder="댓글을 입력해주세요" style={{width:"80%"}} />           
                <Button htmlType="submit" style={{width:"20%"}}  type="primary">
                등록
                </Button>
            </div>
            <List
                className="comment-list"
                style={{padding:10, backgroundColor:"white"}}
                header={`2개의 댓글`}
                itemLayout="horizontal"
                dataSource={data}
                
                renderItem={item => (
                <li>
                    <Comment
                    // actions={item.actions}
                    author={item.author}
                    // avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    />
                </li>
                )}
            />
            <Pagination defaultCurrent={1} total={100} style={{textAlign:"center" ,padding:10}} />
            {/* loading={submitting} onClick={onSubmit} */}
            {/* onChange={onChange} value={value} */}
           
        </div>
    </>
    );
}

export default CommentList;