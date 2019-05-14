import Toast from 'react-native-root-toast';

import Notification from '../components/Notification/index';

import { getNotificationDetail } from '../redux/notification/actions';
import { auditResult, getUserInfo } from '../redux/auth/actions';

// 推送的类型
const NOTIFICATION_TYPES = {
  DID_FINISH_LAUNCH_WITH_OPTIONS: 'MiPush_didFinishLaunchingWithOptions',
  DID_RECEIVE_REMOTE_NOTIFICATION: 'MiPush_didReceiveRemoteNotification',
  DID_NOTIFICATION_MESSAGE_CLICKED: 'MiPush_didNotificationMessageClicked',
  DID_REQUEST_SUCC_WITH_SELECTOR: 'MiPush_requestSuccWithSelector',
};

// 推送详情的类型
const MESSAGE_TYPES = {
  TYPE: {
    SYSTEM: 1,
    MESSAGE: 2,
  },

  SUB_TYPE: {
    AUDIT_SUCCESS: 101,     // 认证成功
    AUDIT_FAIL: 102,        // 认证失败
    NEW_QUESTION: 201,      // 有新问题
    NEW_MESSAGE: 202,       // 有新消息
    ANSWER_ADOPTED: 203,    // 回答被采纳
    FIRST_REWARD: 204,      // 第一次收到奖金
  },
};

export default class NotificationCenter {

  /**
   * 保存store
   * @type {null}
   */
  static store = null;

  static setStore(store) {
    NotificationCenter.store = store;
  }

  static getStore() {
    return NotificationCenter.store;
  }

  /**
   * 保存会话id，自动屏蔽当前会话消息的Toast
   * @type {null}
   */
  static currentAnswerId = null;

  static setCurrentAnswerId(currentAnswerId = null) {
    NotificationCenter.currentAnswerId = currentAnswerId || null;
  }

  /**
   * 当收到推送通知消息
   * @param message
   */
  static onReceiveNotification(message) {
    if (!NotificationCenter.store) return;
    const msg = message._data;
    if (!msg) return;

    const handleNotification = NotificationCenter.handleNotification.bind(this, msg.type);

    switch (msg.type) {
      case NOTIFICATION_TYPES.DID_FINISH_LAUNCH_WITH_OPTIONS:   // iOS点击远程推送启动
        // {"_data":
        // {"type":"MiPush_didFinishLaunchingWithOptions",
        // "data":{"remoteNotification":
        // {"aps":{"alert":'xxxxxxxx'},"_id_":"alx_xxx","notify_effect":"1"}}}}
        if (msg.data.remoteNotification._id_) {
          NotificationCenter.store.dispatch(getNotificationDetail(
            msg.data.remoteNotification._id_,
            null,
            handleNotification,
            NotificationCenter.getNotificationFail,
          ));
        }
        break;
      case NOTIFICATION_TYPES.DID_RECEIVE_REMOTE_NOTIFICATION:  // 运行态下收到远程推送 ++Android ++iOS
        if (AData.OS === 'ios') {
          // {"_data":
          // {"type":"","data":{"aps":{"alert":"点击查看详情"},"_id_":"alx_xxx","notify_effect":"1"}}}
          if (msg.data._id_) {
            NotificationCenter.store.dispatch(getNotificationDetail(
              msg.data._id_,
              null,
              handleNotification,
              NotificationCenter.getNotificationFail,
            ));
          }
        } else if (msg.messageId) {
          NotificationCenter.store.dispatch(getNotificationDetail(
            msg.messageId,
            null,
            handleNotification,
            NotificationCenter.getNotificationFail,
          ));
        }
        break;
      case NOTIFICATION_TYPES.DID_NOTIFICATION_MESSAGE_CLICKED: // Android点击远程推送启动
        if (msg.messageId) {
          NotificationCenter.store.dispatch(getNotificationDetail(
            msg.messageId,
            null,
            handleNotification,
            NotificationCenter.getNotificationFail,
          ));
        }
        break;
      default: {
        break;
      }
    }
  }

  /**
   * 处理推动通知消息
   * @param type Notification_type
   * @param notify
   */
  static handleNotification(type, notify) {
    if (!notify) return;
    notify.msg = JSON.parse(notify.msg || '{}');

    if (type === NOTIFICATION_TYPES.DID_FINISH_LAUNCH_WITH_OPTIONS        // iOS点击远程推送启动
      || type === NOTIFICATION_TYPES.DID_NOTIFICATION_MESSAGE_CLICKED     // Android点击远程推送启动
    ) {
      switch (notify.sub_type) {
        case MESSAGE_TYPES.SUB_TYPE.AUDIT_SUCCESS:
          // 前往审核结果页
          // NotificationCenter.store.dispatch(auditResult());
          break;
        case MESSAGE_TYPES.SUB_TYPE.AUDIT_FAIL:
          // 前往审核结果页
          NotificationCenter.store.dispatch(auditResult());
          break;
        case MESSAGE_TYPES.SUB_TYPE.NEW_QUESTION:
          // 前往问题详情
          // NotificationCenter.store.dispatch(
          //   getQuestionInfoAndGoQuestionDetail(notify.msg._id || 0),
          // );
          break;
        case MESSAGE_TYPES.SUB_TYPE.NEW_MESSAGE:
          // 前往对话
          // NotificationCenter.store.dispatch(
          //   getQuestionAnswerInfoAndGoWebIM(notify.msg.question_id, notify.msg._id || 0),
          // );
          break;
        // case MESSAGE_TYPES.SUB_TYPE.ANSWER_ADOPTED:
        //   Notification.show(`${notify.abstract}`, () => {
        //     NotificationCenter.store.dispatch(
        //       getQuestionAnswerInfoAndGoWebIM(notify.msg.question_id || 0),
        //     );
        //   });
        //   break;
        case MESSAGE_TYPES.SUB_TYPE.FIRST_REWARD:
          // NotificationCenter.store.dispatch(answerAuditAlert());
          break;
        default:
          break;
      }
    } else if (type === NOTIFICATION_TYPES.DID_RECEIVE_REMOTE_NOTIFICATION) { // 运行中收到推送消息
      switch (notify.sub_type) {
        case MESSAGE_TYPES.SUB_TYPE.AUDIT_SUCCESS:
          // NotificationCenter.store.dispatch(getUserInfo());
          // Notification.show(`${notify.abstract}`, () => {
          //   NotificationCenter.store.dispatch(auditResult());
          // });
          break;
        case MESSAGE_TYPES.SUB_TYPE.AUDIT_FAIL:
          // NotificationCenter.store.dispatch(getUserInfo());
          // Notification.show(`${notify.abstract}`, () => {
          //   NotificationCenter.store.dispatch(auditResult());
          // });
          break;
        case MESSAGE_TYPES.SUB_TYPE.NEW_QUESTION:
          // Notification.show(`${notify.abstract}`, () => {
          //   NotificationCenter.store.dispatch(
          //     getQuestionInfoAndGoQuestionDetail(notify.msg._id || 0),
          //   );
          // });
          break;
        case MESSAGE_TYPES.SUB_TYPE.NEW_MESSAGE:
          // if (notify.msg._id !== NotificationCenter.currentAnswerId) {
          //   Notification.show(`${notify.abstract}`, () => {
          //     NotificationCenter.store.dispatch(
          //       getQuestionAnswerInfoAndGoWebIM(notify.msg.question_id, notify.msg._id || 0),
          //     );
          //   });
          // }
          break;
        // case MESSAGE_TYPES.SUB_TYPE.ANSWER_ADOPTED:
        //   Notification.show(`${notify.abstract}`, () => {
        //     NotificationCenter.store.dispatch(
        //       getQuestionAnswerInfoAndGoWebIM(notify.msg.question_id || 0),
        //     );
        //   });
        //   break;
        case MESSAGE_TYPES.SUB_TYPE.FIRST_REWARD:
          // NotificationCenter.store.dispatch(answerAuditAlert());
          break;
        default:
          break;
      }
    }
  }

  static getNotificationFail(error) {
    Toast.show(`发生错误：${error}`, { position: -70 });
  }
}
