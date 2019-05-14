import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 请求首页热门方案
  GET_HOT_PLAN_REQUEST,
  GET_HOT_PLAN_SUCCESS,
  GET_HOT_PLAN_FAILURE,
  // 全部车型方案
  GET_ALL_CAR_TYPE_REQUEST,
  GET_ALL_CAR_TYPE_SUCCESS,
  GET_ALL_CAR_TYPE_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    case GET_HOT_PLAN_REQUEST:
      return state
        .set('ListFetching', true)
    case GET_HOT_PLAN_SUCCESS:
      return state
        .set('ListFetching', false)
        .set('mainHotList', action.payload)
    case GET_HOT_PLAN_FAILURE:
      return state
        .set('ListFetching', false)
// 全部车型方案
    case GET_ALL_CAR_TYPE_REQUEST:
      return state
        .set('allCarTypeFetching', true)
    case GET_ALL_CAR_TYPE_SUCCESS:
      return state
        .set('allCarTypeFetching', false)
        .set('allCarTypeList', action.payload)
    case GET_ALL_CAR_TYPE_FAILURE:
      return state
        .set('allCarTypeFetching', false)
    default:
      return state;
  }
}