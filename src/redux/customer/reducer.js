import InitialState from './initialState';
import { apiLimit } from '../../config/apiConfig';

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

const initialState = new InitialState();

/**
 * ## customerReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 * @desc customer
 */
export default function customerReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    /**
     * get customers
     */
    case GET_CUSTOMERS_REQUEST:
      return state
        .set('isFetching', true);

    case GET_CUSTOMERS_SUCCESS: {
      const { customers, total } = action.payload;

      // todo 处理分页
      let totalPage = 1;
      if (total > apiLimit) {
        totalPage = Math.ceil(total / apiLimit);
      }

      return state
        .set('isFetching', false)
        .set('customers', customers)
        .set('totalPage', totalPage);
    }
    case GET_CUSTOMERS_FAILURE:
      return state
        .set('isFetching', false)
        .set('customers', []);

    /**
     * add customer
     */
    case ADD_CUSTOMER_REQUEST:
      return state
        .set('isUpdating', true);
    case ADD_CUSTOMER_SUCCESS:
      return state
        .set('isUpdating', false);
    case ADD_CUSTOMER_FAILURE:
      return state
        .set('isUpdating', false);

    /**
     * add customer
     */
    case EDIT_CUSTOMER_REQUEST:
      return state
        .set('isUpdating', true);
    case EDIT_CUSTOMER_SUCCESS:
      return state
        .set('isUpdating', false);
    case EDIT_CUSTOMER_FAILURE:
      return state
        .set('isUpdating', false);

    default:
      return state;
  }
}
