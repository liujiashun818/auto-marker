import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 请求推送相关的消息
  NOTIFICATION_DETAIL_REQUEST,
  NOTIFICATION_DETAIL_SUCCESS,
  NOTIFICATION_DETAIL_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    // 请求发送验证码
    case NOTIFICATION_DETAIL_REQUEST: {
      return state
        .set('notificationFetching', true)
        .set('notificationError', null);
    }
    case NOTIFICATION_DETAIL_SUCCESS: {
      if (action.payload) {
        const notificationList = state.get('notificationList', []).slice(0);
        notificationList.unshift(action.payload);
        return state
          .set('notificationFetching', false)
          .set('notificationList', notificationList)
          .set('currentNotification', action.payload);
      } else {
        return state;
      }
    }
    case NOTIFICATION_DETAIL_FAILURE: {
      return state
        .set('notificationFetching', false)
        .set('notificationError', action.payload);
    }

    default:
      return state;
  }
}
