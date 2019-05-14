import api from '../../config/api';
import server from '../../utils/server';

const {
  // 请求首页banner
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAILURE,
} = require('../reduxActionTypes').default;

export function getMainBannerRequest() {
  return {
    type: GET_BANNER_REQUEST,
  };
}

export function getMainBannerSuccess(data) {
  return {
    type: GET_BANNER_SUCCESS,
    payload: data,
  };
}

export function getMainBannerFail(error) {
  return {
    type: GET_BANNER_FAILURE,
    payload: error,
  };
}

export function getMainBanner() {
  return (dispatch) => {
    dispatch(getMainBannerRequest());
    server.get(api.banner.mainBanner(), (data) => {
      dispatch(getMainBannerSuccess(data.res.list));
    }, (error) => {
      dispatch(getMainBannerFail(error));
    });
  };
}