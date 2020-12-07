import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  /*
  {
    "name": "xxx.png",
    "status": "done",
    "url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "thumbUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
  */
 //파일을 보내는곳  // 여기서 업로드 안시킬거면 요청만 보내서 상태만 바꿔주면될거같음 저장/등록 누르고 업로드 할시
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
      console.log('asd--');
    //   console.log(info);
    //   console.log(document.getElementById('kim').value);

    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 파일업로드가 정상적으로 성공하였습니다.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 파일업로드가 실패하였습니다.`);
    }
  },
};

const FileUpload = () => {
    return (
        <>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">클릭하거나 파일을 여기에 드래그 해서 업로드 해주세요</p>
                <p className="ant-upload-hint">
                파일업로드시 최대 MB까지 업로드 가능합니다.
                </p>
            </Dragger>
            {/* <input id="kim" type="file"/> */}
        </>

        
    );
}

export default FileUpload;