import keyMirror from 'key-mirror';

export default keyMirror({
  // 推送
  NOTIFICATION_DETAIL_REQUEST: null,              // 请求推送相关的消息
  NOTIFICATION_DETAIL_SUCCESS: null,
  NOTIFICATION_DETAIL_FAILURE: null,

  // Auth
  AUTH_CODE_REQUEST: null,                        // 请求发送验证码
  AUTH_CODE_SUCCESS: null,
  AUTH_CODE_FAILURE: null,

  AUTH_LOGIN_REQUEST: null,                       // 登陆
  AUTH_LOGIN_SUCCESS: null,
  AUTH_LOGIN_FAILURE: null,

  // customer list
  GET_CUSTOMERS_REQUEST: null,
  GET_CUSTOMERS_SUCCESS: null,
  GET_CUSTOMERS_FAILURE: null,

  // add customer
  ADD_CUSTOMER_REQUEST: null,
  ADD_CUSTOMER_SUCCESS: null,
  ADD_CUSTOMER_FAILURE: null,

  // edit customer
  EDIT_CUSTOMER_REQUEST: null,
  EDIT_CUSTOMER_SUCCESS: null,
  EDIT_CUSTOMER_FAILURE: null,

  // save user's avatar
  SAVE_AVATAR_REQUEST: null,
  SAVE_AVATAR_SUCCESS: null,
  SAVE_AVATAR_FAILURE: null,

  SET_CURRENT_USER: null,                         // 设置当前用户信息

  AUTH_LOGOUT_REQUEST: null,                      // 注销
  AUTH_LOGOUT_SUCCESS: null,
  AUTH_LOGOUT_FAILURE: null,

  // 技术支持
  GET_GOOD_AT_QUESTION_LIST_REQUEST: null,        // 擅长问题列表
  GET_GOOD_AT_QUESTION_LIST_SUCCESS: null,
  GET_GOOD_AT_QUESTION_LIST_FAILURE: null,

  GET_ALL_QUESTION_LIST_REQUEST: null,            // 所有问题列表
  GET_ALL_QUESTION_LIST_SUCCESS: null,
  GET_ALL_QUESTION_LIST_FAILURE: null,

  GET_MY_QUESTION_LIST_REQUEST: null,             // 我的问题列表
  GET_MY_QUESTION_LIST_SUCCESS: null,
  GET_MY_QUESTION_LIST_FAILURE: null,

  SET_CURRENT_QUESTION: null,                     // 设置当前问题
  CLEAR_CURRENT_QUESTION: null,                   // 清除当前问题
  SET_CURRENT_ANSWER: null,                       // 设置当前回答
  CLEAR_CURRENT_ANSWER: null,                     // 清除当前回答

  REPLY_QUESTION_REQUEST: null,                   // 接受回答问题
  REPLY_QUESTION_SUCCESS: null,
  REPLY_QUESTION_FAILURE: null,

  GET_QUESTION_DIALOG_LIST_REQUEST: null,         // 问题回答列表
  GET_QUESTION_DIALOG_LIST_SUCCESS: null,
  GET_QUESTION_DIALOG_LIST_FAILURE: null,
  CLEAR_QUESTION_DIALOG_LIST: null,

  REPLIED_NOT_FINISHED_QUESTION_LIST_REQUEST: null,   // 我的未完成的回答列表
  REPLIED_NOT_FINISHED_QUESTION_LIST_SUCCESS: null,
  REPLIED_NOT_FINISHED_QUESTION_LIST_FAILURE: null,

  REPLIED_FINISHED_QUESTION_LIST_REQUEST: null,       // 我的已完成的回答列表
  REPLIED_FINISHED_QUESTION_LIST_SUCCESS: null,
  REPLIED_FINISHED_QUESTION_LIST_FAILURE: null,

  GET_QUESTION_DETAIL_REQUEST: null,              // 问题详情
  GET_QUESTION_DETAIL_SUCCESS: null,
  GET_QUESTION_DETAIL_FAILURE: null,

  GET_ANSWER_INFO_REQUEST: null,                  // 已接受问题的回话信息
  GET_ANSWER_INFO_SUCCESS: null,
  GET_ANSWER_INFO_FAILURE: null,

  CREATE_QUESTION_REQUEST: null,                  // 创建问题
  CREATE_QUESTION_SUCCESS: null,
  CREATE_QUESTION_FAILURE: null,

  ADOPT_ANSWER_REQUEST: null,               // 技师采纳问题
  ADOPT_ANSWER_SUCCESS: null,
  ADOPT_ANSWER_FAILURE: null,

  CREATE_QUESTION_UPLOAD_IMAGE_REQUEST: null,     // 上传图片
  CREATE_QUESTION_UPLOAD_IMAGE_SUCCESS: null,
  CREATE_QUESTION_UPLOAD_IMAGE_FAILURE: null,
  CREATE_QUESTION_DELETE_IMAGE: null,
  CREATE_QUESTION_CLEAR_UPLOAD_IMAGE: null,

  // 技术支持WebIM
  SET_WEBIM_IDS: null,                            // 设置环信IM双方账号
  CLEAR_WEBIM_IDS: null,                          // 清除环信IM双方账号
  CLEAR_WEBIM_DATA: null,                         // 清除所有WebIM的数据

  WEBIM_LOGIN_REQUEST: null,                      // 登陆环信WebIM
  WEBIM_LOGIN_SUCCESS: null,
  WEBIM_LOGIN_FAILURE: null,

  WEBIM_GET_USER_INFO_REQUEST: null,              // 获取用户信息，如头像、昵称
  WEBIM_GET_USER_INFO_SUCCESS: null,              // 获取用户信息，如头像、昵称
  WEBIM_GET_USER_INFO_FAILURE: null,              // 获取用户信息，如头像、昵称

  WEBIM_GET_MESSAGE_LIST_REQUEST: null,           // 获取已有聊天信息
  WEBIM_GET_MESSAGE_LIST_SUCCESS: null,
  WEBIM_GET_MESSAGE_LIST_FAILURE: null,

  WEBIM_ADD_MESSAGE: null,                        // 收到消息后添加消息

  // Artificer相关
  GET_ARTIFICER_INFO_REQUEST: null,               // 请求技师信息
  GET_ARTIFICER_INFO_SUCCESS: null,
  GET_ARTIFICER_INFO_FAILURE: null,

  RESET_USER_INFO: null,                          // 重置用户信息

  SET_LOCATION_INFO: null,                        // 设置定位位置信息

  SET_ARTIFICER_NAME_INFO: null,                  // 设置技师姓名信息
  SET_ID_NUMBER_INFO: null,                       // 设置身份证号信息
  SET_ALIPAY_NUMBER_INFO: null,                   // 设置支付宝账号信息
  SET_START_WORK_TIME: null,                      // 设置入行时间
  SET_ID_CARD_IMAGE_INFO: null,                   // 设置身份证图片
  SET_WORKER_CARD_IMAGE_INFO: null,               // 设置工牌图片
  SET_AVATAR_IMAGE_INFO: null,                    // 设置头像图片
  SET_CURRENT_PROVINCE: null,                     // 设置当前省份
  SET_CURRENT_CITY: null,                         // 设置当前城市
  SET_CURRENT_DISTRICT: null,                     // 设置当前区县
  SELECT_GOOD_AT_BRAND: null,                     // 选择擅长的品牌

  GET_PROVINCE_LIST_REQUEST: null,                // 请求省份列表
  GET_PROVINCE_LIST_SUCCESS: null,
  GET_PROVINCE_LIST_FAILURE: null,

  GET_CITY_LIST_REQUEST: null,                    // 某省份城市列表
  GET_CITY_LIST_SUCCESS: null,
  GET_CITY_LIST_FAILURE: null,

  GET_DISTRICT_LIST_REQUEST: null,                // 某城市区县列表
  GET_DISTRICT_LIST_SUCCESS: null,
  GET_DISTRICT_LIST_FAILURE: null,

  GET_AUTO_BRANDS_LIST_REQUEST: null,             // 获取车品牌列表
  GET_AUTO_BRANDS_LIST_SUCCESS: null,
  GET_AUTO_BRANDS_LIST_FAILURE: null,

  SUBMIT_ARTIFICER_EDIT_REQUEST: null,            // 技师信息提交编辑
  SUBMIT_ARTIFICER_EDIT_SUCCESS: null,
  SUBMIT_ARTIFICER_EDIT_FAILURE: null,

  SUBMIT_ARTIFICER_AUDIT_REQUEST: null,           // 技师信息提交审核
  SUBMIT_ARTIFICER_AUDIT_SUCCESS: null,
  SUBMIT_ARTIFICER_AUDIT_FAILURE: null,

  // 品牌车型车系选择
  GET_BRANDS_REQUEST: null,                       // 获取车品牌列表
  GET_BRANDS_SUCCESS: null,
  GET_BRANDS_FAILURE: null,

  GET_BRAND_SERIES_REQUEST: null,                 // 获取车品牌下车系列表
  GET_BRAND_SERIES_SUCCESS: null,
  GET_BRAND_SERIES_FAILURE: null,

  GET_SERIES_TYPES_REQUEST: null,                 // 获取车系下车型列表
  GET_SERIES_TYPES_SUCCESS: null,
  GET_SERIES_TYPES_FAILURE: null,

  SET_SELECT_BRAND: null,                         // 设置/清除当前选中的车品牌,车系,车型
  SET_SELECT_SERIES: null,
  SET_SELECT_TYPE: null,
  CLEAR_BRAND_SERIES_TYPE: null,

  GET_ARTIFICER_INCOME_REQUEST: null,             // 获得技师收益记录
  GET_ARTIFICER_INCOME_SUCCESS: null,
  GET_ARTIFICER_INCOME_FAILURE: null,

  GET_ARTIFICER_CHARGE_REQUEST: null,             // 获得技师充值记录
  GET_ARTIFICER_CHARGE_SUCCESS: null,
  GET_ARTIFICER_CHARGE_FAILURE: null,

  GET_ARTIFICER_WITHDRAW_REQUEST: null,             // 获得技师提现记录
  GET_ARTIFICER_WITHDRAW_SUCCESS: null,
  GET_ARTIFICER_WITHDRAW_FAILURE: null,

  GET_ARTIFICER_PAY_REQUEST: null,             // 获得技师提问支付记录
  GET_ARTIFICER_PAY_SUCCESS: null,
  GET_ARTIFICER_PAY_FAILURE: null,

  GET_KNOWLEDGE_LIST_REQUEST: null,           // 获得知识问答列表
  GET_KNOWLEDGE_LIST_SUCCESS: null,
  GET_KNOWLEDGE_LIST_FAILURE: null,

  GET_BANNER_REQUEST: null,       // 获得首页banner
  GET_BANNER_SUCCESS: null,
  GET_BANNER_FAILURE: null,

  GET_HOT_PLAN_REQUEST: null,    // 首页热门方案
  GET_HOT_PLAN_SUCCESS: null,
  GET_HOT_PLAN_FAILURE: null,

  GET_ALL_CAR_TYPE_REQUEST: null,   // 全部车型方案
  GET_ALL_CAR_TYPE_SUCCESS: null,
  GET_ALL_CAR_TYPE_FAILURE: null,

  CREATE_SELECT_PRODUCT_REQUEST: null,  // 根据风控计算可选方案
  CREATE_SELECT_PRODUCT_SUCCESS: null,
  CREATE_SELECT_PRODUCT_FAILURE: null,
});
