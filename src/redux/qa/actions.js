import api from '../../config/api';
import server from '../../utils/server';

const {
  // 请求知识问答列表
  GET_KNOWLEDGE_LIST_REQUEST,
  GET_KNOWLEDGE_LIST_SUCCESS,
  GET_KNOWLEDGE_LIST_FAILURE,
} = require('../reduxActionTypes').default;

export function getKnowledgeListRequest() {
  return {
    type: GET_KNOWLEDGE_LIST_REQUEST,
  };
}

export function getKnowledgeListSuccess(data) {
  return {
    type: GET_KNOWLEDGE_LIST_SUCCESS,
    payload: data,
  };
}

export function getKnowledgeListFail(error) {
  return {
    type: GET_KNOWLEDGE_LIST_FAILURE,
    payload: error,
  };
}

export function getKnowledgeList() {
  return (dispatch) => {
    dispatch(getKnowledgeListRequest());
    server.get(api.question.questionList(), (data) => {
      dispatch(getKnowledgeListSuccess(data.res.list));
    }, (error) => {
      dispatch(getKnowledgeListFail(error));
    });
  };
}