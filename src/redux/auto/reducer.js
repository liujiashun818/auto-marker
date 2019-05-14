import InitialState from './initialState';

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

const initialState = new InitialState();

/**
 * ## autoReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 * @desc 汽车相关
 */
export default function autoReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    /**
     * request
     */
    case GET_BRANDS_REQUEST:
      return state
        .set('isFetchBrand', true);
    case GET_BRAND_SERIES_REQUEST:
      return state
        .set('isFetchSeries', true);
    case GET_SERIES_TYPES_REQUEST:
      return state
        .set('isFetchTypes', true);

    /**
     * 跳过完善车辆信息
     */
    case CLEAR_BRAND_SERIES_TYPE:
      return state
        .set('selectBrand', {})
        .set('selectSeries', {})      // 清除选择的品牌、车系、车型数据
        .set('selectType', {});

    /**
     * 获取品牌车系车型列表
     */
    case GET_BRANDS_SUCCESS:
      return state
        .set('isFetchBrand', false)
        .set('brands', action.payload);
    case GET_BRAND_SERIES_SUCCESS:
      return state
        .set('isFetchSeries', false)
        .set('series', action.payload);
    case GET_SERIES_TYPES_SUCCESS:
      return state
        .set('isFetchTypes', false)
        .set('types', action.payload);

    case GET_BRANDS_FAILURE:
      return state
        .set('isFetchBrand', false)
        .set('error', action.payload);
    case GET_BRAND_SERIES_FAILURE:
      return state
        .set('isFetchSeries', false)
        .set('error', action.payload);

    case GET_SERIES_TYPES_FAILURE:
      return state
        .set('isFetchTypes', false)
        .set('error', action.payload);

    /**
     * 保存选择的品牌车系及车型信息
     */
    case SET_SELECT_BRAND:
      return state
        .set('selectBrand', action.payload);

    case SET_SELECT_SERIES:
      return state
        .set('selectSeries', action.payload)
        .set('selectType', {}); // 重新选择品牌车系，清空车型数据

    case SET_SELECT_TYPE:
      return state
        .set('selectType', action.payload);

    default:
      return state;
  }
}
