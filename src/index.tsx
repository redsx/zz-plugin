import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import messageApi from './components/UI/NotificationApi';

interface IAppProps {
  foo: string;
}

class App extends Component<IAppProps, any> {
  public render(): JSX.Element {
    return (
      <div onClick={messageApi.open}>
        Hello typescript
      </div>
    );
  }
}
render(
  <App foo={'123'} />,
  document.getElementById('app')
);