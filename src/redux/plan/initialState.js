import { Record } from 'immutable';

const InitialState = Record({
  ListFetching: true,
  allCarTypeFetching: true,
  mainHotList: [],   // 首页热门方案列表
  allCarTypeList: [], // 全部车型方案
});

export default InitialState;