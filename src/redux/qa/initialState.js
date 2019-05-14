import { Record } from 'immutable';

const InitialState = Record({
  ListFetching: true,
  questionList: [],   //问答列表
});

export default InitialState;
