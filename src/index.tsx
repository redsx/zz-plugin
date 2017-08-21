import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import messageApi from './components/UI/NotificationApi';
import NeteaseCard from './components/UI/NeteaseCard';
import AudioApi from './utils/audio';

import './less';

interface IAppProps {
  foo: string;
}


declare const window: any;

const audioApi = new AudioApi({}) as AudioApi;

window.audioApi = audioApi;

class App extends Component<IAppProps, any> {
  public render(): JSX.Element {
    return (
      <div>
        <button onClick={this.handleClick}>
          播放
        </button>
        <button onClick={this.handlePause}>
          停止
        </button>
        <button onClick={this.handleStart}>
          开始
        </button>
        <button onClick={this.handleReplay}>
          重新播放
        </button>
        <button onClick={this.handleShow}>
          显示歌词
        </button>
        <button onClick={this.handleHide}>
          隐藏歌词
        </button>
        <NeteaseCard />
      </div>
    );
  }
  handleClick(): void {
    messageApi.open({message: '开始播放'});
    audioApi.play(432506345);
  }
  handlePause() {
    audioApi.pause();
  }
  handleStart() {
    audioApi.start();
  }
  handleReplay() {
    audioApi.replay();
  }
  handleShow() {
    audioApi.setLyricState(true);
  }
  handleHide() {
    audioApi.setLyricState(false);
  }
}
render(
  <App foo={'123'} />,
  document.getElementById('app')
);
