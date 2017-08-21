import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TransitionGroup  from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
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
  public render(): JSX.Element {
    const { className } = this.props;
    return (
      <TransitionGroup className={className}>
        {
          this.state.notices.map((notice, index) => {
            return (
              <CSSTransition
                timeout = {500}
                classNames= {className}
                key = {notice.key}
              >
                <Notice
                  className = {notice.className}
                  duration = {notice.duration}
                  onClose = {notice.onClose}
                  onEnd = {() => this.remove(notice.key)}
                  style = {notice.style}
                >
                  {notice.content}
                </Notice>
              </CSSTransition>
            );
          })
        }
      </TransitionGroup>
    );
  }
  public newInstance(props = {}) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const notification = render(<Notification {...props}/>, div) as Notification;
    return  {
      component: notification,
      add: notification.add.bind(notification),
      remove: notification.remove.bind(notification),
      destroy() {
        unmountComponentAtNode(div);
        document.body.removeChild(div);
      },
    };
  }
  public add(notice: any): string {
    const key: string = notice.key = notice.key || getUuid();
    const notices = this.state.notices;
    if (!(notices.filter(item => item.key === key)).length) {
      this.setState({
        notices: notices.concat(notice),
      });
    }
    return key;
  }
  public remove(key: string): void {
    const notices = this.state.notices.filter(notice => notice.key !== key);
    this.setState({ notices });
  }
}