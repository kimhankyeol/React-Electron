import React from 'react';
import { notification } from 'antd';
import { AlertOutlined} from '@ant-design/icons';

const notificationAlarm = (title,desc) => {
  notification.open({
    message: title,
    description:desc,
    icon: <AlertOutlined style={{ color: '#ff1818d9' }} />,
  });
};

export default notificationAlarm;