import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 请求首页banner
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    case GET_BANNER_REQUEST:
      return state
        .set('ListFetching', true)
    case GET_BANNER_SUCCESS:
      return state
        .set('ListFetching', false)
        .set('mainBannerList', action.payload)
    case GET_BANNER_FAILURE:
      return state
          .set('ListFetching', false)
    default:
      return state;
  }
}