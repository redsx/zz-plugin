import React, { Component } from 'react';

interface StyleInterface {
  right?: string;
  [propName: string]: any;
}

interface NoticeProps {
  onClose: () => void;
  duration: number;
  style: StyleInterface;
  className: string;
  children?: any;
}

export default class extends Component<NoticeProps, any> {
  timer: number | null = null;
  static defaultProps = {
    onClose() {},
    duration: 1.5,
    className: '',
    style: {
      right: '50%'
    }
  };
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.clearTimer();
    if (this.props.duration) {
      setTimeout(
        () => {
          this._close();
        },
        this.props.duration * 1000
      );
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  public render(): JSX.Element {
    const { className, style, children } = this.props;
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  private _close(): any {
    // this.setState({close})
    this.clearTimer();
    this.props.onClose();
  }
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}