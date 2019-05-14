// Api签名
import DeviceInfo from 'react-native-device-info';
import storage from 'react-native-simple-store';
import sha1 from 'sha1';
import apiConfig from '../config/apiConfig';

class ApiSign {
  // 所有数据
  // devVersion;       // dev-version      // 本地设置
  // devName;          // dev-name         // 本地设置
  // devId;            // dev-id           // 本地设置
  // appType;          // app-type         // 本地设置
  // appVersion;       // app-version      // 本地设置
  // netType;          // net-type         // 从window.AData.netType读取
  // timeDiff;         // time-diff        // 外部设置，server.js
  // rtick;            // rtick            // 本地设置，每次生成，Number(Date.parse(new Date()).toString().substr(0, 10))
  // defaultSignKey;   // default-sign-key // 本地设置
  // signType;         // sign-type        // 异步设置，监听登录登出
  // signKey;          // sign-key         // 异步设置，监听登录登出
  // sign;             // sign             // 本地设置，每次生成

  // 签名数据
  signData = {
    'dev-version': 'devVersion',
    'dev-name': 'devName',
    'dev-id': 'devId',
    'app-type': 'appType',
    'app-version': 'appVersion',
    'net-type': 'netType',
    'rtick': 'rtick',
  };

  // 消息头数据{[Header重的key: apiSign中的属性名]}
  headerData = {
    'dev-version': 'devVersion',
    'dev-name': 'devName',
    'dev-id': 'devId',
    'app-type': 'appType',
    'app-version': 'appVersion',
    'net-type': 'netType',
    'sign-type': 'signType',
    'rtick': 'rtick',
    'sign': 'sign',
  };

  // Url中的数据
  urlData = {
    'rtick': 'rtick',
  };

  constructor() {
    const self = this;
    // 设备、App相关信息
    this.devVersion = DeviceInfo.getSystemVersion();
    this.devName = DeviceInfo.getModel();
    this.devId = DeviceInfo.getUniqueID();
    this.appType = DeviceInfo.getSystemName();

    let appVersion1 = DeviceInfo.getVersion();
    let appVersion2 = DeviceInfo.getReadableVersion();
    let appVersion = String.prototype.toLowerCase.call(this.appType) === 'ios'
      ? appVersion2.substr(appVersion1.length + 1)
      : appVersion2;
    let jsVersion = AData.JsVersion;
    this.appVersion = appVersion + '/' + jsVersion;

    // 网络状态
    this.netType = window.AData.netType;

    // 时间
    this.timeDiff = 0;
    this.rtick = 0;
    // 默认签名key
    this.defaultSignKey = apiConfig.defaultSignKey;

    // 用户登录数据
    this.signType = 0;
    this.signKey = this.defaultSignKey;
    storage.get('currentUser')
      .then((currentUser) => {
        if (currentUser) {
          self.signType = 1;
          self.signKey = currentUser.phone;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // 签名sign
    this.sign = '';
  }

  setTimeDiff(timeDiff) {
    let timeDiffNum = Number(timeDiff);
    this.timeDiff = isNaN(timeDiffNum) ? 0 : timeDiffNum;
  }

  setSignKey(rawKey = null) {
    this.signKey = rawKey ? rawKey : this.defaultSignKey;
    this.signType = rawKey ? 1 : 0;
  }

  signUrl(url) {
    // 网络状态
    this.netType = window.AData.netType;

    // 解析查询字符串
    let urlArray = url.split('?');
    let urlQueryString = urlArray[1] ? urlArray.slice(1).join('?') : '';
    let urlQueryObject = this.parseQueryString(urlQueryString);

    // 拼入附加get参数
    let random = Math.floor(Math.random() * 8999) + 1000;
    this.rtick = this.timeDiff + Number(Date.parse(new Date()).toString().substr(0, 10)) * 10000 +
      random;
    for (let key in this.urlData) {
      let val = this.urlData[key];
      urlQueryObject[key] = this[val];
    }

    // 合并key、value合并，并排序，生成URLQueryString
    let urlQueryArray = [];
    for (let key of Object.keys(urlQueryObject).sort()) {
      if (urlQueryObject.hasOwnProperty(key)) {
        urlQueryArray.push(`${key}=${encodeURIComponent(urlQueryObject[key])}`);
      }
    }
    urlQueryString = '?' + urlQueryArray.join('&');
    let sortedUrl = urlArray[0] + urlQueryString;

    // headers
    let headers = {};
    for (let key in this.headerData) {
      let val = this.headerData[key];
      headers[key] = encodeURIComponent(this[val]);
    }

    // 签名数据
    let signDataObject = {};
    for (let key in this.signData) {
      let val = this.signData[key];
      signDataObject[key] = this[val];
    }

    let queryPath = '/' + urlArray[0].split('/').slice(3).join('/');
    let signObject = Object.assign({}, urlQueryObject, signDataObject);
    let signArray = [];
    for (let key of Object.keys(signObject).sort()) {
      if (signObject.hasOwnProperty(key)) {
        signArray.push(`${key}=${encodeURIComponent(signObject[key])}`);
      }
    }
    signArray.push(`sign-type=${this.signType}`);
    signArray.push(`sign-key=${this.signKey}`);
    let signString = queryPath + '?' + signArray.join('&');

    // 签名
    this.sign = sha1(signString);
    headers['sign'] = this.sign;

    return { url: sortedUrl, headers: headers };
  }

  parseQueryString(str) {
    let reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
    let result = {};
    let match;
    let key;
    let value;
    while (match = reg.exec(str)) {
      key = match[2];
      value = match[3] || '';
      result[key] = decodeURIComponent(value);
    }
    return result;
  }
}

// export default ApiSign;
export default getApiSign = (function() {
  let apiSign;
  return function() {
    return apiSign || (apiSign = new ApiSign());
  };
})();
