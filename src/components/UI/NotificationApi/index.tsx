import React from 'react';
import Notification from './Notification';

const prefixCls = 'notification-prefix';
const notificationInstance = (new Notification({})).newInstance({className: prefixCls});
interface ArgsProps {
  message: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number;
  style?: string;
  className?: string;
}
export default {
  open(args: ArgsProps): void {
    notificationInstance.add({
      duration: args.duration || 10,
      content: <span className = {`${prefixCls}-notice`}>{args.message}</span>,
      className: `${prefixCls}-notice-container`,
    });
  }
};