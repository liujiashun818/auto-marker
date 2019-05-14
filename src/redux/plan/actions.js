import api from '../../config/api';
import server from '../../utils/server';

const {
  // 请求首页热门方案
  GET_HOT_PLAN_REQUEST,
  GET_HOT_PLAN_SUCCESS,
  GET_HOT_PLAN_FAILURE,
  // 全部车型方案
  GET_ALL_CAR_TYPE_REQUEST,
  GET_ALL_CAR_TYPE_SUCCESS,
  GET_ALL_CAR_TYPE_FAILURE,
  // 根据风控计算可选方案
  CREATE_SELECT_PRODUCT_REQUEST,
  CREATE_SELECT_PRODUCT_SUCCESS,
  CREATE_SELECT_PRODUCT_FAILURE,
} = require('../reduxActionTypes').default;

export function getMainHotPlanRequest() {
  return {
    type: GET_HOT_PLAN_REQUEST,
  };
}

export function getMainHotPlanSuccess(data) {
  return {
    type: GET_HOT_PLAN_SUCCESS,
    payload: data,
  };
}

export function getMainHotPlanFail(error) {
  return {
    type: GET_HOT_PLAN_FAILURE,
    payload: error,
  };
}

export function getMainPlan() {
  return (dispatch) => {
    dispatch(getMainHotPlanRequest());
    server.get(api.plan.hotPlan(), (data) => {
      dispatch(getMainHotPlanSuccess(data.res.list));
    }, (error) => {
      dispatch(getMainHotPlanFail(error));
    });
  };
}

export function createSlectCarTypeRequest() {
  return {
    type: CREATE_SELECT_PRODUCT_REQUEST,
  };
}

export function createSlectCarTypeSuccess() {
  return {
    type: GET_ALL_CAR_TYPE_SUCCESS,
  };
}

export function createSlectCarTypeFail() {
  return {
    type: GET_ALL_CAR_TYPE_FAILURE,
  };
}

export function createSelectCarType() {
  return (dispatch) => {
    dispatch(createSlectCarTypeRequest());
    server.get(api.plan.allCarTypeList(rentDownPay, monthlyRent, carType), (data) => {
      dispatch(createSlectCarTypeSuccess(data.res.list));
    }, (error) => {
      dispatch(createSlectCarTypeFail(error));
    });
  };
}


export function getALLCarTypeRequest() {
  return {
    type: GET_ALL_CAR_TYPE_REQUEST,
  };
}

export function getALLCarTypeSuccess(data) {
  return {
    type: GET_ALL_CAR_TYPE_SUCCESS,
    payload: data,
  };
}

export function getALLCarTypeFail(error) {
  return {
    type: GET_ALL_CAR_TYPE_FAILURE,
    payload: error,
  };
}

export function getAllCarType(rentDownPay, monthlyRent, carType) {
  return (dispatch) => {
    dispatch(getALLCarTypeRequest());
    server.get(api.plan.allCarTypeList(rentDownPay, monthlyRent, carType), (data) => {
      dispatch(getALLCarTypeSuccess(data.res.list));
    }, (error) => {
      dispatch(getALLCarTypeFail(error));
    });
  };
}

