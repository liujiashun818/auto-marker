import api from '../../config/api';
import server from '../../utils/server';

const {
  // 请求推送相关的消息
  NOTIFICATION_DETAIL_REQUEST,
  NOTIFICATION_DETAIL_SUCCESS,
  NOTIFICATION_DETAIL_FAILURE,
} = require('../reduxActionTypes').default;

// 请求推送相关的消息
export function getSaveNotificationDetailRequest() {
  return {
    type: NOTIFICATION_DETAIL_REQUEST,
  };
}

export function getSaveNotificationDetailSuccess(currentNotification) {
  return {
    type: NOTIFICATION_DETAIL_SUCCESS,
    payload: currentNotification,
  };
}

export function getSaveNotificationDetailFail(error = null) {
  return {
    type: NOTIFICATION_DETAIL_FAILURE,
    payload: error,
  };
}

export function getSaveNotificationDetail(pushId = '', customerId = '') {
  return (dispatch, getState) => {
    if (!customerId) {
      const authState = getState().auth;
      const currentUser = authState.get('currentUser', {});
      customerId = currentUser._id || '';
    }
    dispatch(getSaveNotificationDetailRequest());
    server.get(api.notification.getDetail(pushId, customerId), (data) => {
      dispatch(getSaveNotificationDetailSuccess(data.res.detail));
    }, (error) => {
      dispatch(getSaveNotificationDetailFail(error));
      // Toast.show(error, { position: -70 });
    });
  };
}

export function getNotificationDetail(pushId = '',
                                      customerId = '',
                                      successHandler = null,
                                      failHandler = null) {
  return (dispatch, getState) => {
    setTimeout(() => {
      if (!customerId) {
        const authState = getState().auth;
        const currentUser = authState.get('currentUser', {}) || 0;
        customerId = currentUser._id || '';
      }
      server.get(api.notification.getDetail(pushId, customerId), (data) => {
        successHandler && successHandler(data.res.detail);
      }, (error) => {
        failHandler && failHandler(error);
        // Toast.show(error, { position: -70 });
      });
    }, 1500);
  };
}
