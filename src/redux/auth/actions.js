import { Actions, ActionConst } from 'react-native-router-flux';

import Message from '../../components/Message';

import api from '../../config/api';
import server from '../../utils/server';

import { resetUserInfo } from '../user/actions';
import { setUserMiPushAlias, unsetUserMiPushAlias } from '../tools';

const {
  // 请求发送验证码
  AUTH_CODE_REQUEST,
  AUTH_CODE_SUCCESS,
  AUTH_CODE_FAILURE,
  // 登陆
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,

  // 设置当前用户
  SET_CURRENT_USER,
  // 注销
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,

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

// 监测版本更新
export function getNewVersionInfo(platform, currentVersion, updateHandler = null) {
  return (dispatch) => {
    server.get(api.utility.getNewVersionInfo(platform, currentVersion), (data) => {
      if (data.res.need_update === true && data.res.url) {
        typeof (updateHandler) === 'function' && updateHandler(data.res.url);
      } else {
        console.log('getNewVersionInfo res, but not need update');
      }
    }, (error) => {
      console.log(`getNewVersionInfo error: ${error}`);
    });
  };
}

export function handleUserStatus(userInfo = null) {
  return (dispatch) => {
    setUserMiPushAlias(userInfo);
    if (!userInfo) {                        // 无用户信息
      Actions.Login({ type: ActionConst.RESET });
    } else if (userInfo.status === -1) {    // 封禁
      Actions.Login({ type: ActionConst.RESET });
    } else if (userInfo.status === 0) {     // 待审核
      dispatch(resetUserInfo());
      Actions.TabBar({ type: ActionConst.RESET });
      Actions.ArtificerInfoBasicEdit();
    } else if (userInfo.status === 1) {     // 已审核通过
      Actions.TabBar({ type: ActionConst.RESET });
    } else if (userInfo.status === 2) {     // 已驳回
      dispatch(resetUserInfo());
      Actions.TabBar({ type: ActionConst.RESET });
      Actions.ArtificerInfoBasicEdit();
    } else if (userInfo.status === 3) {     // 审核中
      Actions.TabBar({ type: ActionConst.RESET });
    } else {                                // 状态异常
      Actions.TabBar({ type: ActionConst.RESET });
    }
  };
}

// 请求发送验证码
export function getAuthCodeRequest(phone = '') {
  return {
    type: AUTH_CODE_REQUEST,
    payload: phone,
  };
}

export function getAuthCodeSuccess(smsId = '') {
  return {
    type: AUTH_CODE_SUCCESS,
    payload: smsId,
  };
}

export function getAuthCodeFail(error = null) {
  return {
    type: AUTH_CODE_FAILURE,
    payload: error,
  };
}

export function getAuthCode(phone, codeId) {
  return (dispatch) => {
    dispatch(getAuthCodeRequest(phone));
    server.post(api.user.getVerifyCode(), { phone, codeId }, (data) => {
      dispatch(getAuthCodeSuccess(data.res.sms && data.res.sms._id));
    }, (error) => {
      dispatch(getAuthCodeFail(error));
      Message.show(error);
    });
  };
}

/**
 * 登录
 */
export function loginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function loginSuccess(currentUser) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: currentUser,
  };
}

export function loginFail(error = null) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
  };
}

export function login(phone, code, codeId) {
  return (dispatch) => {
    dispatch(loginRequest());
    server.post(api.user.login(), { phone, code, code_id: codeId }, (data) => {
      dispatch(loginSuccess(data.res.user));
      Actions.TabBar({ type: ActionConst.RESET });
    }, (error) => {
      dispatch(loginFail(error));
      Message.show(error);
    });
  };
}

// 设置用户信息
export function setCurrentUser(currentUser = null, isLoading = false, dispatch) {
  if (isLoading) {
    dispatch(handleUserStatus(currentUser));
  }
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
}

// 从服务器获取用户信息，失败则从本地读取
export function getUserInfo(isLoading = false, succ, fail) {
  return (dispatch) => {
    server.get(api.user.info(), (data) => {
      dispatch(setCurrentUser(data.res.user, isLoading, dispatch));
      if (typeof succ === 'function') succ(data.res.user);
    }, (error) => {
      dispatch(setCurrentUser(null, isLoading, dispatch));
      if (typeof fail === 'function') fail(error);
      Message.show(error);
    });
  };
}

// 注销
export function logoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}

export function logoutFail(error = null) {
  return {
    type: AUTH_LOGOUT_FAILURE,
    payload: error,
  };
}

export function logout(userId = '') {
  return (dispatch, getState) => {
    const authState = getState().auth;
    const currentUser = authState.get('currentUser', {}) || 0;

    dispatch(logoutRequest());
    server.post(api.user.logout(), { user_id: userId }, () => {
      // unsetUserMiPushAlias(currentUser);
      dispatch(handleUserStatus());
      dispatch(logoutSuccess());
    }, (error) => {
      dispatch(logoutFail(error));
      Message.show(error);
    });
  };
}

// 信息审核成功前往审核结果页
export function auditResult() {
  return () => {
    Actions.ArtificerInfoAuditResult();
  };
}

// 信息审核成功前往主页
export function auditSuccessAndGoHome() {
  return () => {
    Actions.Questions();
  };
}

// 信息审核失败前往查看
export function auditFailAndReview() {
  return (dispatch) => {
    dispatch(resetUserInfo());
    Actions.ArtificerInfoBasicEdit();
  };
}

export function getArtificerIncomeRequest() {
  return {
    type: GET_ARTIFICER_INCOME_REQUEST,
  };
}

export function getArtificerIncomeSuccess(data) {
  return {
    type: GET_ARTIFICER_INCOME_SUCCESS,
    payload: data,
  };
}

export function getArtificerIncomeFail(error) {
  return {
    type: GET_ARTIFICER_INCOME_FAILURE,
    payload: error,
  };
}

// 技师收益记录
export function getArtificerIncome() {
  return (dispatch) => {
    dispatch(getArtificerIncomeRequest());
    server.get(api.artificer.incomeLog(), (data) => {
      dispatch(getArtificerIncomeSuccess(data.res.list));
    }, (error) => {
      dispatch(getArtificerIncomeFail(error));
    });
  };
}

export function getArtificerChargeRequest() {
  return {
    type: GET_ARTIFICER_CHARGE_REQUEST,
  };
}

export function getArtificerChargeSuccess(data) {
  return {
    type: GET_ARTIFICER_CHARGE_SUCCESS,
    payload: data,
  };
}

export function getArtificerChargeFail(error) {
  return {
    type: GET_ARTIFICER_CHARGE_FAILURE,
    payload: error,
  };
}

// 获得技师充值记录
export function getArtificerCharge() {
  return (dispatch) => {
    dispatch(getArtificerChargeRequest());
    server.get(api.artificer.chargeLog(), (data) => {
      dispatch(getArtificerChargeSuccess(data.res.list));
    }, (error) => {
      dispatch(getArtificerChargeFail(error));
    });
  };
}

export function getArtificerWithDrawRequest() {
  return {
    type: GET_ARTIFICER_WITHDRAW_REQUEST,
  };
}

export function getArtificerWithDrawSuccess(data) {
  return {
    type: GET_ARTIFICER_WITHDRAW_SUCCESS,
    payload: data,
  };
}

export function getArtificerWithDrawFail(error) {
  return {
    type: GET_ARTIFICER_WITHDRAW_FAILURE,
    payload: error,
  };
}

// 获得技师提现记录
export function getArtificerWithDraw() {
  return (dispatch) => {
    dispatch(getArtificerWithDrawRequest());
    server.get(api.artificer.withdrawLog(), (data) => {
      dispatch(getArtificerWithDrawSuccess(data.res.list));
    }, (error) => {
      dispatch(getArtificerWithDrawFail(error));
    });
  };
}

export function getArtificerPayRequest() {
  return {
    type: GET_ARTIFICER_PAY_REQUEST,
  };
}

export function getArtificerPaySuccess(data) {
  return {
    type: GET_ARTIFICER_PAY_SUCCESS,
    payload: data,
  };
}

export function getArtificerPayFail(error) {
  return {
    type: GET_ARTIFICER_PAY_FAILURE,
    payload: error,
  };
}

// 获得技师支付记录
export function getArtificerPay() {
  return (dispatch) => {
    dispatch(getArtificerPayRequest());
    server.get(api.artificer.payLog(), (data) => {
      dispatch(getArtificerPaySuccess(data.res.list));
    }, (error) => {
      dispatch(getArtificerPayFail(error));
    });
  };
}
