import React from 'react';
import Notification from './Notification';

console.log(Notification.prototype);

const notificationInstance = (new Notification({})).newInstance();

export default {
  open() {
    console.log(notificationInstance);
    notificationInstance.add({
      duration: 100,
      content: <div>addd</div>,
    });
  }
};