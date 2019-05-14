import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import api from '../../config/api';
import server from '../../utils/server';

import { getUserInfo } from '../auth/actions';

const {
  // 重置用户信息
  RESET_USER_INFO,

  SAVE_AVATAR_REQUEST,
  SAVE_AVATAR_SUCCESS,
  SAVE_AVATAR_FAILURE,

  // unused
  // 设置定位位置信息
  SET_LOCATION_INFO,
  // 设置技师姓名信息
  SET_ARTIFICER_NAME_INFO,
  // 设置身份证号信息
  SET_ID_NUMBER_INFO,
  // 设置支付宝账号信息
  SET_ALIPAY_NUMBER_INFO,
  // 设置入行时间
  SET_START_WORK_TIME,
  // 设置身份证图片
  SET_ID_CARD_IMAGE_INFO,
  // 设置工牌图片
  SET_WORKER_CARD_IMAGE_INFO,
  // 设置头像图片
  SET_AVATAR_IMAGE_INFO,
  // 设置当前省份
  SET_CURRENT_PROVINCE,
  // 设置当前城市
  SET_CURRENT_CITY,
  // 设置当前区县
  SET_CURRENT_DISTRICT,
  // 选择擅长的品牌
  SELECT_GOOD_AT_BRAND,
  // 请求省份列表
  GET_PROVINCE_LIST_REQUEST,
  GET_PROVINCE_LIST_SUCCESS,
  GET_PROVINCE_LIST_FAILURE,
  // 请求某省份城市列表
  GET_CITY_LIST_REQUEST,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_FAILURE,
  // 请求某城市区县列表
  GET_DISTRICT_LIST_REQUEST,
  GET_DISTRICT_LIST_SUCCESS,
  GET_DISTRICT_LIST_FAILURE,
  // 获取车品牌列表
  GET_AUTO_BRANDS_LIST_REQUEST,
  GET_AUTO_BRANDS_LIST_SUCCESS,
  GET_AUTO_BRANDS_LIST_FAILURE,
  // 技师信息提交编辑
  SUBMIT_ARTIFICER_EDIT_REQUEST,
  SUBMIT_ARTIFICER_EDIT_SUCCESS,
  SUBMIT_ARTIFICER_EDIT_FAILURE,
  // 技师信息编辑提交审核
  SUBMIT_ARTIFICER_AUDIT_REQUEST,
  SUBMIT_ARTIFICER_AUDIT_SUCCESS,
  SUBMIT_ARTIFICER_AUDIT_FAILURE,
} = require('../reduxActionTypes').default;

/**
 * 上传用户头像
 * @return {{object}}
 */
export function saveAvatarRequest() {
  return {
    type: SAVE_AVATAR_REQUEST,
  };
}

export function saveAvatarSuccess(json) {
  return {
    type: SAVE_AVATAR_SUCCESS,
    payload: json,
  };
}

export function saveAvatarFailure(json) {
  return {
    type: SAVE_AVATAR_FAILURE,
    payload: json,
  };
}

export function saveAvatarImg(imgKey) {
  return (dispatch) => {
    dispatch(saveAvatarRequest());

    server.post(api.user.editAvatar(), { avatar_pic: imgKey },
      (data) => {
        dispatch(saveAvatarSuccess());
      }, (error) => {
        dispatch(saveAvatarFailure(error));
      });
  };
}

export function resetUserInfo(currentUser = null) {
  let user = currentUser;
  return (dispatch, getState) => {
    if (!user) {
      const authState = getState().auth;
      user = authState.get('currentUser', null);
    }

    dispatch({
      type: RESET_USER_INFO,
      payload: user,
    });
  };
}

// 设置定位位置信息
export function setLocationInfo(locationInfo = null) {
  return {
    type: SET_LOCATION_INFO,
    payload: locationInfo,
  };
}

// 设置名字
export function setArtificerName(value) {
  return {
    type: SET_ARTIFICER_NAME_INFO,
    payload: value,
  };
}

// 设置身份证号
export function setIdNumber(value) {
  return {
    type: SET_ID_NUMBER_INFO,
    payload: value,
  };
}

// 设置支付宝账号
export function setAliPayNumber(value) {
  return {
    type: SET_ALIPAY_NUMBER_INFO,
    payload: value,
  };
}

// 设置入行时间
export function setStartWorkTime(value) {
  return {
    type: SET_START_WORK_TIME,
    payload: value,
  };
}

// 设置身份证图片
export function setIdCardImg(imageName = '', imageUri = '') {
  return {
    type: SET_ID_CARD_IMAGE_INFO,
    payload: { imageName, imageUri },
  };
}

// 设置工牌图片
export function setWorkerCardImg(imageName = '', imageUri = '') {
  return {
    type: SET_WORKER_CARD_IMAGE_INFO,
    payload: { imageName, imageUri },
  };
}

// 设置头像图片
export function setAvatarImg(imageName = '', imageUri = '') {
  return {
    type: SET_AVATAR_IMAGE_INFO,
    payload: { imageName, imageUri },
  };
}

// 设置当前省份
export function setCurrentProvince(province) {
  return {
    type: SET_CURRENT_PROVINCE,
    payload: province,
  };
}

// 设置当前城市
export function setCurrentCity(city) {
  return {
    type: SET_CURRENT_CITY,
    payload: city,
  };
}

// 设置当前区县
export function setCurrentDistrict(district) {
  return {
    type: SET_CURRENT_DISTRICT,
    payload: district,
  };
}

// 选择擅长的品牌
export function selectGoodAtBrand(autoBrand) {
  return {
    type: SELECT_GOOD_AT_BRAND,
    payload: autoBrand,
  };
}

// 请求省份列表
export function getProvinceListRequest() {
  return {
    type: GET_PROVINCE_LIST_REQUEST,
  };
}

export function getProvinceListSuccess(provinceList) {
  return {
    type: GET_PROVINCE_LIST_SUCCESS,
    payload: provinceList,
  };
}

export function getProvinceListFail(error = null) {
  return {
    type: GET_PROVINCE_LIST_FAILURE,
    payload: error,
  };
}

export function getProvinceList() {
  return (dispatch) => {
    dispatch(getProvinceListRequest());
    server.get(api.location.provinceList(), (data) => {
      dispatch(getProvinceListSuccess(data.res.province_list || []));
    }, (error) => {
      dispatch(getProvinceListFail(error));
      Toast.show(error, { position: -70 });
    });
  };
}

// 请求某省份城市列表
export function getCityListRequest() {
  return {
    type: GET_CITY_LIST_REQUEST,
  };
}

export function getCityListSuccess(provinceList) {
  return {
    type: GET_CITY_LIST_SUCCESS,
    payload: provinceList,
  };
}

export function getCityListFail(error = null) {
  return {
    type: GET_CITY_LIST_FAILURE,
    payload: error,
  };
}

export function getCityList(provinceName) {
  return (dispatch) => {
    dispatch(getCityListRequest());
    server.get(api.location.cityList(provinceName), (data) => {
      dispatch(getCityListSuccess(data.res.city_list || []));
    }, (error) => {
      dispatch(getCityListFail(error));
      Toast.show(error, { position: -70 });
    });
  };
}

// 请求某城市区县列表
export function getDistrictListRequest() {
  return {
    type: GET_DISTRICT_LIST_REQUEST,
  };
}

export function getDistrictListSuccess(provinceList) {
  return {
    type: GET_DISTRICT_LIST_SUCCESS,
    payload: provinceList,
  };
}

export function getDistrictListFail(error = null) {
  return {
    type: GET_DISTRICT_LIST_FAILURE,
    payload: error,
  };
}

export function getDistrictList(provinceName, cityName) {
  return (dispatch) => {
    dispatch(getDistrictListRequest());
    server.get(api.location.countryList(provinceName, cityName), (data) => {
      dispatch(getDistrictListSuccess(data.res.country_list || []));
    }, (error) => {
      dispatch(getDistrictListFail(error));
      Toast.show(error, { position: -70 });
    });
  };
}

// 获取车品牌列表
export function getAutoBrandListRequest() {
  return {
    type: GET_AUTO_BRANDS_LIST_REQUEST,
  };
}

export function getAutoBrandListSuccess(autoBrandList) {
  return {
    type: GET_AUTO_BRANDS_LIST_SUCCESS,
    payload: autoBrandList,
  };
}

export function getAutoBrandListFail(error = null) {
  return {
    type: GET_AUTO_BRANDS_LIST_FAILURE,
    payload: error,
  };
}

export function getAutoBrandList() {
  return (dispatch) => {
    dispatch(getAutoBrandListRequest());
    server.get(api.auto.getBrandList(), (data) => {
      dispatch(getAutoBrandListSuccess(data.res.auto_brand_list || []));
    }, (error) => {
      dispatch(getAutoBrandListFail(error));
      Toast.show(error, { position: -70 });
    });
  };
}

// 技师信息提交编辑
export function submitArtificerEditBasicRequest() {
  return {
    type: SUBMIT_ARTIFICER_EDIT_REQUEST,
  };
}

export function submitArtificerEditBasicSuccess() {
  return {
    type: SUBMIT_ARTIFICER_EDIT_SUCCESS,
  };
}

export function submitArtificerEditBasicFail(error = null) {
  return {
    type: SUBMIT_ARTIFICER_EDIT_FAILURE,
    payload: error,
  };
}

export function submitArtificerEditBasic(formData, successHandler) {
  return (dispatch) => {
    dispatch(submitArtificerEditBasicRequest());
    server.post(api.artificer.basicEdit(), formData, (data) => {
      dispatch(submitArtificerEditBasicSuccess());
      dispatch(getUserInfo());
      successHandler && successHandler();
    }, (error) => {
      dispatch(resetUserInfo());
      dispatch(submitArtificerEditBasicFail(error));
      // Alert.alert('失败', `提交审核失败！${error}`);
      // Message.show('提交修改失败');
      Toast.show(error, { position: -70 });
    });
  };
}

// 技师信息编辑提交审核
export function submitArtificerAuditRequest() {
  return {
    type: SUBMIT_ARTIFICER_AUDIT_REQUEST,
  };
}

export function submitArtificerAuditSuccess() {
  return {
    type: SUBMIT_ARTIFICER_AUDIT_SUCCESS,
  };
}

export function submitArtificerAuditFail(error = null) {
  return {
    type: SUBMIT_ARTIFICER_AUDIT_FAILURE,
    payload: error,
  };
}

export function submitArtificerAudit(formData, successHandler) {
  return (dispatch) => {
    dispatch(submitArtificerAuditRequest());
    server.post(api.artificer.submitAudit(), formData, (data) => {
      dispatch(submitArtificerAuditSuccess());
      dispatch(getUserInfo());
      successHandler && successHandler();
    }, (error) => {
      dispatch(resetUserInfo());
      dispatch(submitArtificerAuditFail(error));
      // Toast.show(error, { position: -70 });
      Toast.show('提交审核失败', { position: -70 });
    });
  };
}

// 技师信息编辑
export function submitArtificerEditRequest() {
  return {
    type: SUBMIT_ARTIFICER_EDIT_REQUEST,
  };
}

export function submitArtificerEditSuccess() {
  return {
    type: SUBMIT_ARTIFICER_EDIT_SUCCESS,
  };
}

export function submitArtificerEditFail(error = null) {
  return {
    type: SUBMIT_ARTIFICER_EDIT_FAILURE,
    payload: error,
  };
}

export function submitArtificerEdit(formData) {
  return (dispatch) => {
    dispatch(submitArtificerEditRequest());
    server.post(api.artificer.edit(), formData, (data) => {
      dispatch(submitArtificerEditSuccess());
      dispatch(getUserInfo());
      // Message.show('提交成功');
      Toast.show('提交成功', { position: -70 });
      Actions.pop();
    }, (error) => {
      dispatch(resetUserInfo());
      dispatch(submitArtificerEditFail(error));
      // Toast.show(error, { position: -70 });
      Toast.show('提交失败', { position: -70 });
    });
  };
}
