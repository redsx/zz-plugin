import messageApi from '../components/UI/NotificationApi';
import axios from 'axios';

interface AudioApiInter {
  playList?: number[];
  lyricState?: boolean;
  model?: string;
  apiHost?: string;
}

interface LyricInf {
  lyric: string;
  time: number;
}
interface PlayInfo {
  id: number;
  name: string;
  playUrl?: string;
  blurPicUrl?: string;
  artist?: string;
  lyric?: LyricInf[];
  [propName: string]: any;
}

export default class AudioApi {
  timer: any = null;
  lyricKey: string = '';
  audio: HTMLAudioElement = new Audio;
  lyricState: boolean = false;
  paused: boolean = false;
  HOST: string = '';
  curPlayInfo: PlayInfo = {
    id: 0,
    name: '',
  };
  private playList: number[] = [];
  constructor(config: AudioApiInter) {
    this.HOST = config.apiHost || 'http://mdzzapp.com:3123';
    this.playList = config.playList || [];
    this.lyricState = config.lyricState || false;
    this.audio.addEventListener('ended', () => { console.warn('ended!!!!'); });
  }
  setLyricState(state: boolean) {
    if (state && !this.lyricState) {
      this.paused = false;
      this.lyricState = state;
      this.showLyric();
    } else if (!state && this.lyricState) {
      this.paused = true;
      this.lyricState = state;
      messageApi.close(this.lyricKey);
    }
  }
  pause() {
    this.paused = true;
    this.audio.pause();
    if (this.lyricState) {
      clearTimeout(this.timer);
    }
  }
  start() {
    this.paused = false;
    this.audio.play();
    this.showLyric();
  }
  replay() {
    this.play(this.curPlayInfo.id);
  }
  play(id?: number): void {
    this.paused = false;
    if (!id && this.playList.length) {
      return;
    } else {
      id = id || this.playList.shift() || 0;
      console.log('play id: ', id);
      this.getMuisicDetail(id)
      .then((ret: any) => {
        const song: PlayInfo = ret.data.songs && ret.data.songs[0];
        console.log('getMuisicDetail: ', song);
        this.curPlayInfo = {
          id: song.id,
          name: song.name,
          blurPicUrl: song.al && song.al.picUrl,
          artist: song.ar && song.ar[0] && song.ar[0].name,
        };
        console.log('play info: ', this.curPlayInfo);
        return this.getMusicUrl(this.curPlayInfo.id);
      })
      .then((ret) => {
        const info = ret.data.data && ret.data.data[0];
        this.curPlayInfo.playUrl = info && info.url;
        console.log('getMusicUrl: ', ret.data, this.curPlayInfo);
        this.audio.src = this.curPlayInfo.playUrl || '';
        return this.audio.play();
      })
      .then(() => {
        if (this.lyricState) {
          this.showLyric();
        }
      })
      .catch((err) => {
        console.warn(err);
      });
    }
  }
  add(id: number) {
    this.playList.push(id);
  }
  showLyric() {
    this.getCurPlayLyric()
    .then((ret: LyricInf[]): any => {
      const time: number = this.audio.currentTime;
      const length: number = ret.length;
      const lastLyric: LyricInf = ret[length - 2];
      if (time > lastLyric.time) {
        this.lyricKey = messageApi.open({
          message: lastLyric.lyric,
          duration: 10,
        });
        return;
      }
      for (let i = 0; i < length - 1; ++i) {
        const cur = ret[i];
        const next = ret[i + 1];
        if (time < ret[0].time) {
          return this.lyricTimer(ret, i, ret[0].time - time);
        }
        if ((time >= cur.time && time < next.time)) {
          return this.lyricTimer(ret, i, next.time - time);
        }
      }
    });
  }
  lyricTimer(lyricArr: LyricInf[], index, time) {
    let nextTime: number = 0;
    if (index < lyricArr.length - 2) {
      nextTime = lyricArr[index + 2].time - lyricArr[index + 1].time;
      nextTime = nextTime > 0 ? nextTime : 3;
    }
    if (nextTime < 0 || index > lyricArr.length - 2 || this.paused) {
      return;
    }
    console.log('lyricTimer: ', lyricArr[index]);
    this.lyricKey = messageApi.open({
      message: lyricArr[index].lyric || '~~~',
      duration: time - 0.5,
    });
    const timer = this.timer = setTimeout(() => {
      this.timer && clearTimeout(this.timer);
      this.timer = this.lyricTimer(lyricArr, index + 1, nextTime);
    }, time * 1000);
    return timer;
  }
  serchMusic(keywords: string) {
    return axios.get(`${this.HOST}/search?keywords=${keywords}&limit=10&type=1`);
  }
  getMuisicDetail(id: number) {
    return axios.get(`${this.HOST}/song/detail?ids=${id}`);
  }
  getMusicUrl(id: number) {
    return axios.get(`${this.HOST}/music/url?id=${id}`);
  }
  getCurPlayLyric() {
    const id: number = this.curPlayInfo.id;
    if (id !== 0) {
      return axios.get(`${this.HOST}/lyric?id=${id}`)
      .then((ret: any) => {
        console.log('get curPlayLyric res: ', ret.data.lrc.lyric);
        return this.getLyricArr(ret.data.lrc.lyric);
      });
    }
    return Promise.reject('id is undefined');
  }
  // getMusicInfo(musicId: number) {
  //   return axios.get(`$`)
  // }
  getLyricArr(lyric): LyricInf[] {
    lyric = lyric.split('\n');
    let lyricArr: LyricInf[] = [];
    for (let i = 0; i < lyric.length; ++i) {
      let l = lyric[i];
      let lyricObj: LyricInf = {
        time: 0,
        lyric: ''
      };
      l = l.replace(/^\[[0-9]{2}:[0-9]{2}.[0-9]{2,6}\s*\]/g, (ret) => {
        let time: string[] = ret.match(/[^\[\]]+/)[0].split(':');
        let min: number = parseInt(time[0]);
        let sec: number = parseFloat(time[1]);
        lyricObj.time = min * 60 + sec;
        return '';
      });
      lyricObj.lyric = l;
      lyricArr.push(lyricObj);
    }
    return lyricArr;
  }
}