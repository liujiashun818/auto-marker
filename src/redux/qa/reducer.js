import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 请求知识问答列表
  GET_KNOWLEDGE_LIST_REQUEST,
  GET_KNOWLEDGE_LIST_SUCCESS,
  GET_KNOWLEDGE_LIST_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    // 请求发送验证码
    case GET_KNOWLEDGE_LIST_REQUEST:
      return state
        .set('ListFetching', true)
    case GET_KNOWLEDGE_LIST_SUCCESS:
      return state
        .set('ListFetching', false)
        .set('questionList', action.payload)
    case GET_KNOWLEDGE_LIST_FAILURE:
      return state
          .set('ListFetching', false)
    default:
      return state;
  }
}