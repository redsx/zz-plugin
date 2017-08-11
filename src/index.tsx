import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import messageApi from './components/UI/NotificationApi';
import NeteaseCard from './components/UI/NeteaseCard';

import './less';

interface IAppProps {
  foo: string;
}

class App extends Component<IAppProps, any> {
  public render(): JSX.Element {
    return (
      <div>
        <button onClick={this.handleClick}>
          弹出全局提醒
        </button>
        <NeteaseCard />
      </div>
    );
  }
  handleClick(): void {
    messageApi.open({message: '弹出全局提醒'});
  }
}
render(
  <App foo={'123'} />,
  document.getElementById('app')
);
