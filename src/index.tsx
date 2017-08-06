import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';

interface IAppProps {}
interface IAppState {}

class App extends Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>
        Hello typescript
      </div>
    );
  }
}
render(<App />, document.getElementById('app'));