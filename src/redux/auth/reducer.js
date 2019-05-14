import storage from 'react-native-simple-store';
import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 请求发送验证码
  AUTH_CODE_REQUEST,
  AUTH_CODE_SUCCESS,
  AUTH_CODE_FAILURE,
  // 登陆
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  // 设置用户信息
  SET_CURRENT_USER,
  // 注销
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  // 请求技师信息
  GET_ARTIFICER_INFO_REQUEST,
  GET_ARTIFICER_INFO_SUCCESS,
  GET_ARTIFICER_INFO_FAILURE,
  // 技师收益记录
  GET_ARTIFICER_INCOME_REQUEST,
  GET_ARTIFICER_INCOME_SUCCESS,
  GET_ARTIFICER_INCOME_FAILURE,
  // 获得技师充值记录
  GET_ARTIFICER_CHARGE_REQUEST,
  GET_ARTIFICER_CHARGE_SUCCESS,
  GET_ARTIFICER_CHARGE_FAILURE,
  // 获得技师提现记录
  GET_ARTIFICER_WITHDRAW_REQUEST,
  GET_ARTIFICER_WITHDRAW_SUCCESS,
  GET_ARTIFICER_WITHDRAW_FAILURE,
  // 获得技师提问支付记录
  GET_ARTIFICER_PAY_REQUEST,
  GET_ARTIFICER_PAY_SUCCESS,
  GET_ARTIFICER_PAY_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    // 请求发送验证码
    case AUTH_CODE_REQUEST: {
      return state
        .set('authCodeRequiring', true)
        .set('authCodePhone', action.payload)
        .set('authCodeRequireId', '')
        .set('authCodeRequireTime', new Date())
        .set('authCodeRequireError', null);
    }
    case AUTH_CODE_SUCCESS: {
      return state
        .set('authCodeRequiring', false)
        .set('authCodeRequireId', action.payload);
    }
    case AUTH_CODE_FAILURE: {
      return state
        .set('authCodeRequiring', false)
        .set('authCodeRequireError', action.payload);
    }

    // 登陆
    case AUTH_LOGIN_REQUEST: {
      storage.delete('currentUser');
      return state
        .set('loginRequiring', true)
        .set('currentUser', null)
        .set('currentUserLoginTime', null)
        .set('loginError', null);
    }
    case AUTH_LOGIN_SUCCESS: {
      storage.save('currentUser', action.payload);
      return state
        .set('loginRequiring', false)
        .set('currentUserLoginTime', new Date())
        .set('currentUser', action.payload);
    }
    case AUTH_LOGIN_FAILURE: {
      return state
        .set('loginRequiring', false)
        .set('loginError', action.payload);
    }

    // 设置用户信息
    case SET_CURRENT_USER: {
      if (action.payload) {
        storage.save('currentUser', action.payload);
      } else {
        storage.delete('currentUser');
      }
      return state
        .set('currentUser', action.payload);
    }

    // 登陆
    case AUTH_LOGOUT_REQUEST: {
      return state
        .set('logoutRequiring', true)
        .set('logoutError', null);
    }
    case AUTH_LOGOUT_SUCCESS: {
      storage.delete('currentUser');
      return state
        .set('logoutRequiring', false)
        .set('currentUser', null);
    }
    case AUTH_LOGOUT_FAILURE: {
      return state
        .set('logoutRequiring', false)
        .set('logoutError', action.payload);
    }

    // 请求技师信息
    case GET_ARTIFICER_INFO_REQUEST: {
      return state
        .set('artificerInfoFetching', true)
        .set('artificerInfoError', null);
    }
    case GET_ARTIFICER_INFO_SUCCESS: {
      return state
        .set('artificerInfoFetching', false)
        .set('currentUser', action.payload);
    }
    case GET_ARTIFICER_INFO_FAILURE: {
      return state
        .set('artificerInfoFetching', false)
        .set('artificerInfoError', action.payload);
    }
    // 请求技师收益
    case GET_ARTIFICER_INCOME_REQUEST: {
      return state
        .set('artificerIncomeFetching', true)
        .set('artificerIncomeError', null);
    }
    case GET_ARTIFICER_INCOME_SUCCESS: {
      return state
        .set('artificerIncomeFetching', false)
        .set('artificerIncome', action.payload);
    }
    case GET_ARTIFICER_INCOME_FAILURE: {
      return state
        .set('artificerIncomeFetching', false)
        .set('artificerIncomeError', action.payload);
    }
    // 请求技师充值
    case GET_ARTIFICER_CHARGE_REQUEST: {
      return state
        .set('artificerChargeFetching', true)
        .set('artificerChargeError', null);
    }
    case GET_ARTIFICER_CHARGE_SUCCESS: {
      return state
        .set('artificerChargeFetching', false)
        .set('artificerCharge', action.payload);
    }
    case GET_ARTIFICER_CHARGE_FAILURE: {
      return state
        .set('artificerChargeFetching', false)
        .set('artificerChargeError', action.payload);
    }
    // 请求技师提现
    case GET_ARTIFICER_WITHDRAW_REQUEST: {
      return state
        .set('artificerWithDrawFetching', true)
        .set('artificerWithDrawError', null);
    }
    case GET_ARTIFICER_WITHDRAW_SUCCESS: {
      return state
        .set('artificerWithDrawFetching', false)
        .set('artificerWithDraw', action.payload);
    }
    case GET_ARTIFICER_WITHDRAW_FAILURE: {
      return state
        .set('artificerWithDrawFetching', false)
        .set('artificerWithDrawError', action.payload);
    }
    // 请求技师支付
    case GET_ARTIFICER_PAY_REQUEST: {
      return state
        .set('artificerPayFetching', true)
        .set('artificerPayError', null);
    }
    case GET_ARTIFICER_PAY_SUCCESS: {
      return state
        .set('artificerPayFetching', false)
        .set('artificerPay', action.payload);
    }
    case GET_ARTIFICER_PAY_FAILURE: {
      return state
        .set('artificerPayFetching', false)
        .set('artificerPayError', action.payload);
    }

    default:
      return state;
  }
}
