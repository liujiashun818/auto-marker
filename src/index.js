import React, { Component } from 'react';
import { Alert, AppRegistry, Linking } from 'react-native';
import Toast from 'react-native-root-toast';
// bugsnag. Bug reporter
import { Client } from 'bugsnag-react-native';
import bugsnagConfig from './config/bugsnagConfig';
// Init Global Variables
import './config/globalVariables';
// Redux
import { Provider } from 'react-redux';
import configureStore from './redux/reduxConfigureStore';
// Redux Actions will be dispatched.
import { getNewVersionInfo, getUserInfo, setCurrentUser } from './redux/auth/actions';
// 米推
import MiPush from 'react-native-mipush';
import NotificationCenter from './utils/NotificationCenter';
// Server. Import and Init api sign config.
import server from './utils/server';

import Routes from './routes';
// dataConfig
import { AppSecondVersion, OS } from './config/dataConfig';

export default function native() {
  // 返回键返回次数
  let exitTime = 0;

  class AutoMarket extends Component {

    constructor(props) {
      super(props);
      const self = this;
      // bugsnag. bug 收集
      self.client = new Client(bugsnagConfig.apiKey);

      self.store = configureStore();
      // 请求员工数据
      self.store.dispatch(getUserInfo(true));

      // 设置请求返回码的统一函数，如1001需要登陆时
      server.setFilterCodeHandler('1001', () => {
        self.store.dispatch(setCurrentUser(null, false, self.store.dispatch));
      });

      // 开始米推监听
      NotificationCenter.setStore(self.store);
      MiPush.registerMiPushAndConnect();
      self.pushlisteners = [
        MiPush.addEventListener('mipush', NotificationCenter.onReceiveNotification),
      ];
    }

    componentDidMount() {
      // todo
      // this.store.dispatch(getNewVersionInfo(OS, AppSecondVersion, (url) => {
      //   Alert.alert(
      //     '检测到新版本',
      //     '是否更新？',
      //     [
      //       {
      //         text: '否',
      //         onPress: () => {},
      //         style: 'cancel',
      //       },
      //       {
      //         text: '是',
      //         onPress: () => Linking.openURL(url),
      //       },
      //     ],
      //   );
      // }));
    }

    componentWillUnmount() {
      this.pushlisteners.forEach(listener => {
        MiPush.removeEventListener(listener);
      });
    }

    handleExit = () => {
      if (exitTime === 0) {
        Toast.show('再按一次退出程序', { position: -70 });
        exitTime = new Date().getTime();
        return true;
      } else if ((new Date().getTime() - exitTime) > 2000) {
        Toast.show('再按一次退出程序', { position: -70 });
        exitTime = new Date().getTime();
        return true;
      }
      exitTime = 0;
      return false;
    };

    render() {
      return (
        <Provider store={this.store}>
          <Routes handleExit={this.handleExit} />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('AutoMarket', () => AutoMarket);
}
