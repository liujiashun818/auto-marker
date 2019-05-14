import { ActionConst, Actions } from 'react-native-router-flux';

import api from '../../config/api';
import server from '../../utils/server';

const {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,

  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,

  EDIT_CUSTOMER_REQUEST,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,

} = require('../reduxActionTypes').default;

/**
 * 获取客户列表
 * @return {{array}}
 */
export function getCustomersRequest() {
  return {
    type: GET_CUSTOMERS_REQUEST,
  };
}

export function getCustomersSuccess(json) {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: json,
  };
}

export function getCustomersFailure(json) {
  return {
    type: GET_CUSTOMERS_FAILURE,
    payload: json,
  };
}

export function getCustomers(page = 1, key = '') {
  return (dispatch) => {
    dispatch(getCustomersRequest());
    server.get(api.customer.list(page, key), (data) => {
      let { total } = data.res;
      if (total) {
        total = parseInt(total, 10);
      }
      dispatch(getCustomersSuccess({ customers: data.res.list, total }));
    }, (error) => {
      dispatch(getCustomersFailure(error));
    });
  };
}

/**
 * 添加客户
 * @return {{object}}
 */
export function addCustomerRequest() {
  return {
    type: ADD_CUSTOMER_REQUEST,
  };
}

export function addCustomerSuccess(json) {
  return {
    type: ADD_CUSTOMER_SUCCESS,
    payload: json,
  };
}

export function addCustomerFailure(json) {
  return {
    type: ADD_CUSTOMER_FAILURE,
    payload: json,
  };
}

export function addCustomer(params) {
  return (dispatch) => {
    dispatch(addCustomerRequest());
    server.post(api.customer.add(), params, (data) => {
      dispatch(addCustomerSuccess(data.res));
      dispatch(getCustomers());
      Actions.pop({ type: ActionConst.REFRESH });
    }, (error) => {
      dispatch(addCustomerFailure(error));
    });
  };
}

/**
 * 添加客户
 * @return {{object}}
 */
export function editCustomerRequest() {
  return {
    type: EDIT_CUSTOMER_REQUEST,
  };
}

export function editCustomerSuccess(json) {
  return {
    type: EDIT_CUSTOMER_SUCCESS,
    payload: json,
  };
}

export function editCustomerFailure(json) {
  return {
    type: EDIT_CUSTOMER_FAILURE,
    payload: json,
  };
}

export function editCustomer(params) {
  return (dispatch) => {
    dispatch(editCustomerRequest());
    server.post(api.customer.edit(), params, (data) => {
      console.log('edit customer res', data);
      dispatch(editCustomerSuccess(data.res));
      dispatch(getCustomers());
      Actions.pop();
    }, (error) => {
      dispatch(editCustomerFailure(error));
    });
  };
}
