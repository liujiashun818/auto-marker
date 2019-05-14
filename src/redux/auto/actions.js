import { Actions } from 'react-native-router-flux';

import api from '../../config/api';
import server from '../../utils/server';

import { getCustomer } from '../auth/actions';

const {
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,

  GET_BRAND_SERIES_REQUEST,
  GET_BRAND_SERIES_SUCCESS,
  GET_BRAND_SERIES_FAILURE,

  GET_SERIES_TYPES_REQUEST,
  GET_SERIES_TYPES_SUCCESS,
  GET_SERIES_TYPES_FAILURE,

  SET_SELECT_BRAND,
  SET_SELECT_SERIES,
  SET_SELECT_TYPE,
  CLEAR_BRAND_SERIES_TYPE,

} = require('../reduxActionTypes').default;

/**
 * 获取品牌列表
 * @return {{type}}
 */
export function getBrandsRequest() {
  return {
    type: GET_BRANDS_REQUEST,
  };
}

export function getBrandsSuccess(json) {
  return {
    type: GET_BRANDS_SUCCESS,
    payload: json,
  };
}

export function getBrandsFailure(json) {
  return {
    type: GET_BRANDS_FAILURE,
    payload: json,
  };
}

export function getBrands() {
  return (dispatch) => {
    dispatch(getBrandsRequest());
    server.get(api.auto.getBrandLabelList(), (data) => {
      dispatch(getBrandsSuccess(data.res.auto_brand_list));
    }, (error) => {
      dispatch(getBrandsFailure(error));
    });
  };
}

/**
 * 根据品牌获取车系
 * @return {{type}}
 */
export function getBrandSeriesRequest() {
  return {
    type: GET_BRAND_SERIES_REQUEST,
  };
}

export function getBrandSeriesSuccess(json) {
  return {
    type: GET_BRAND_SERIES_SUCCESS,
    payload: json,
  };
}

export function getBrandSeriesFailure(json) {
  return {
    type: GET_BRAND_SERIES_FAILURE,
    payload: json,
  };
}

export function getBrandSeries(brandId) {
  return (dispatch) => {
    dispatch(getBrandSeriesRequest());
    server.get(api.auto.getBrandSeries(brandId), (data) => {
      dispatch(getBrandSeriesSuccess(data.res.series));
    }, (error) => {
      dispatch(getBrandSeriesFailure(error));
    });
  };
}

/**
 * 根据车系获取车型
 * @return {{type}}
 */
export function getSeriesTypeRequest() {
  return {
    type: GET_SERIES_TYPES_REQUEST,
  };
}

export function getSeriesTypeSuccess(json) {
  return {
    type: GET_SERIES_TYPES_SUCCESS,
    payload: json,
  };
}

export function getSeriesTypeFailure(json) {
  return {
    type: GET_SERIES_TYPES_FAILURE,
    payload: json,
  };
}

export function getSeriesTypes(seriesId) {
  return (dispatch) => {
    dispatch(getSeriesTypeRequest());
    server.get(api.auto.getSeriesTypes(seriesId), (data) => {
      dispatch(getSeriesTypeSuccess(data.res.type));
    }, (error) => {
      dispatch(getSeriesTypeFailure(error));
    });
  };
}

/**
 * save auto brand, series, type in state
 * @param brand, series, type
 * @return {{type: exports.default.SET_SELECT_BRAND, payload: *}}
 */
export function setSelectBrand(brand) {
  return {
    type: SET_SELECT_BRAND,
    payload: brand,
  };
}

export function setSelectSeries(series) {
  return {
    type: SET_SELECT_SERIES,
    payload: series,
  };
}

export function setSelectType(type) {
  return {
    type: SET_SELECT_TYPE,
    payload: type,
  };
}

export function clearBrandSeriesType() {
  return {
    type: CLEAR_BRAND_SERIES_TYPE,
  };
}
