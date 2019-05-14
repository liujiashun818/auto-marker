// import Toast from 'react-native-root-toast';
import api from '../config/api';
import getApiSign from './apiSign';

function handleResultErrorForTest(resData) {
  // if (resData.code !== 1001 && AData.PackageMode.Mode == AData.PackageMode.Debug) {
  //   let debugError = `错误码：${resData.code}，错误信息："${resData.msg}"，请求码：${resData.request_id}。`;
  //   alert(debugError);
  //   AData.PackageMode.Mode == AData.PackageMode.Debug && console.log(`>>>>error:\n${debugError}\n${JSON.stringify(resData)}`);
  // }
}

function handleCatchErrorForTest(rawError) {
  // if (AData.PackageMode.Mode == AData.PackageMode.Debug) {
  //   alert(rawError);
  //   AData.PackageMode.Mode == AData.PackageMode.Debug && console.log(`>>>>error:\n${JSON.stringify(rawError)}`);
  // }
}

class Server {
  apiSign = null;

  constructor() {
    this.initApiSign();
  }

  // 设置签名Key
  setApiSignKey(rawKey = null) {
    this.apiSign.setSignKey(rawKey);
  }

  initApiSign() {
    const self = this;
    this.apiSign = getApiSign();

    // 循环5次获得修正时间，防止意外失败，若5次都失败了，时间差设置为0
    let flag = 5;

    function getTimeDiff() {
      self.get(api.utility.getSystemTime(), (data) => {
        const localTime = Number(Date.parse(new Date()).toString().substr(0, 10));
        const systemTime = Number(data.systime);
        self.apiSign.setTimeDiff((systemTime - localTime) * 10000);
      }, (error) => {
        console.log('Function getTimeDiff error:', error);
        if (flag--) {
          getTimeDiff();
        } else {
          self.apiSign.setTimeDiff(0);
        }
      }, true, true);
    }

    getTimeDiff();
  }

  // 过滤消息状态码时，针对特的定消息状态的额外处理：{'状态码': func(){}}
  filterCodeHandlers = {};

  setFilterCodeHandler(code, handler) {
    this.filterCodeHandlers[code] = handler;
  }

  removeFilterCodeHandler(code) {
    delete this.filterCodeHandlers[code];
  }

  // 签名get
  get(url,
      successHandler = null,
      failHandler = null,
      ignoreCode = false,
      printData = false) {
    const self = this;
    let signRes = this.apiSign.signUrl(url);
    // console.log('get url --------', signRes.url);
    return fetch(signRes.url, {
      headers: signRes.headers,
      credentials: 'include',
    })
      .then(self.filterJSON)
      .then((resData) => {
        printData && console.log(`\n\n>>>>>>>>GET\n>>url:\n${signRes.url}\n\n>>headers:\n${JSON.stringify(signRes.headers)}\n\n>>res data:\n${JSON.stringify(resData)}`);
        if (ignoreCode) {
          successHandler && successHandler(resData);
        } else {
          self.filterResultCode(resData, successHandler, failHandler);
        }
      })
      .catch((rawError) => {
        self.catchError(rawError, failHandler);
      });
  }

  // 签名post
  post(url,
       data,
       successHandler = null,
       failHandler = null,
       ignoreCode = false,
       printData = false) {
    const self = this;
    let signRes = this.apiSign.signUrl(url);
    // console.log('post url --------', signRes.url);
    let formData = new FormData();
    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        formData.append([propName], data[propName]);
      }
    }
    return fetch(signRes.url, {
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      headers: signRes.headers,
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      body: formData,
    })
      .then(self.filterJSON)
      .then((resData) => {
        printData && console.log(`\n\n>>>>>>>>POST\n>>url:\n${signRes.url}\n\n>>headers:\n${JSON.stringify(signRes.headers)}\n\n>>res data:\n${JSON.stringify(resData)}`);
        if (ignoreCode) {
          successHandler && successHandler(resData);
        } else {
          self.filterResultCode(resData, successHandler, failHandler);
        }
      })
      .catch((rawError) => {
        self.catchError(rawError, failHandler);
      });
  }

  // Filters
  filterJSON(res) {
    return res.json();
  }

  filterResultCode(resData, successHandler = null, failHandler = null) {
    if (resData.code !== 0) {
      // 未登陆，清除storage中的用户信息
      const codeHandler = this.filterCodeHandlers[resData.code];
      if (codeHandler && (typeof codeHandler === 'function')) {
        codeHandler(resData.code, resData);
      }
      // if (resData.code !== 1001) {
      //   Toast.show(resData.msg, { position: -70 });
      // }
      handleResultErrorForTest(resData);
      console.log('resData\n', JSON.stringify(resData));
      failHandler && failHandler(resData.msg, resData);
    } else {
      successHandler && successHandler(resData);
    }
    return resData;
  }

  catchError(rawError, failHandler = null) {
    // Toast.show(rawError, { position: -70 });
    handleCatchErrorForTest(rawError);
    failHandler && failHandler(rawError, null);
  }
}

export default new Server();
