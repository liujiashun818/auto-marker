import { Record } from 'immutable';

const InitialState = Record({

  authCodeRequiring: false,       // 验证码请求中
  authCodePhone: '',              // 验证码所属手机
  authCodeRequireId: '',          // 验证码请求id
  authCodeRequireTime: '',        // 验证码请求时间
  authCodeRequireError: null,     // 验证码请求失败

  loginRequiring: false,          // 登陆中
  currentUser: null,              // 当前用户
  currentUserLoginTime: null,     // 当前用户登陆时间
  loginError: null,               // 登陆失败

  logoutRequiring: false,         // 注销中
  logoutError: null,              // 注销失败

  artificerInfoFetching: false,   // 技师信息请求中
  artificerInfoError: null,       // 技师信息请求错误
  // artificerInfo: null,         // 技师信息=currentUser

  artificerIncomeFetching: false, // 技师收益
  artificerIncome: [],
  artificerIncomeError: null,

  artificerChargeFetching: false, // 技师充值
  artificerCharge: [],
  artificerChargeError: null,

  artificerWithDrawFetching: false, // 技师提现
  artificerWithDraw: [],
  artificerWithDrawError: null,

  artificerPayFetching: false, // 技师支付
  artificerPay: [],
  artificerPayError: null,
});

export default InitialState;
