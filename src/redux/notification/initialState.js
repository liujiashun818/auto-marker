import { Record } from 'immutable';

const InitialState = Record({
  notificationList: [],             // 应用打开期间所有的推送

  notificationFetching: false,      // 推送消息请求中
  currentNotification: null,        // 当前推送消息
  notificationError: null,          // 推送消息请失败
});

export default InitialState;
