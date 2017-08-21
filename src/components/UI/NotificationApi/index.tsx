import React from 'react';
import Notification from './Notification';

const prefixCls = 'lyric-prefix';
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
  open(args: ArgsProps): string {
    return notificationInstance.add({
      duration: args.duration || 10,
      content: <span className = {`${prefixCls}-notice`}>{args.message}</span>,
      className: `${prefixCls}-notice-container`,
    });
  },
  close(key: string) {
    notificationInstance.remove(key);
  }
};