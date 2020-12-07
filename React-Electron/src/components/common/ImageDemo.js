//클릭시 이미지 크기 크게 나옴
import React from 'react';
import { Image } from 'antd';

const ImageDemo = (src,width,height) => {
    return (
        <Image
        src={src}
        width={width}
        height={height}
        />
    );
};
  
export default ImageDemo;