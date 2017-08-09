import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Notice from './Notice';

function getUuid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default class Notification extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
    };
  }
  unmount: boolean = false;
  componentDidMount() {
    this.unmount = true;
    this.add({
      duration: 100,
      content: <div>addd</div>,
    });
  }
  componentWillUnmount() {
    this.unmount = false;
  }
  public render(): JSX.Element {
    // const { className } = this.props;
    console.log('this.state: ', this.state);
    return (
      <div className = {'className'}>
        {
          this.state.notices.map((notice, index) => {
            console.log('notice: ', notice, index);
            return (
              <Notice
                onClose = {notice.onClose}
                duration = {notice.duration}
                style = {notice.style}
                className = {notice.className}
                key = {index}
              >
                {notice.content}
              </Notice>
            );
          })
        }
      </div>
    );
  }
  public newInstance(props = {}) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const notification = render(<Notification {...props}/>, div) as Notification;
    return  {
      component: notification,
      add: function(props){
        notification.add(props);
      },
      remove: notification.remove.bind(notification),
      destroy() {
        unmountComponentAtNode(div);
        document.body.removeChild(div);
      },
    };
  }
  public add(notice: any): void {
    const key: string = notice.key || getUuid();
    console.log(this.unmount);
    const notices = this.state.notices;
    if (!(notices.filter(item => item.key === key)).length) {
      this.setState({
        notices: notices.concat(notice),
      });
    }
  }
  public remove(key: string): void {
    const notices = this.state.notices.filter(notice => notice.key !== key);
    this.setState({ notices });
  }
}