import { Record } from 'immutable';

const InitialState = Record({
  isFetching: false,
  isSaving: false,
  isSaveSuccess: false,
  isEditSuccess: false,
  isShowMsg: false,
  isSkip: false,

  // 获取车辆相关品牌
  isFetchBrand: false,
  isFetchSeries: false,
  isFetchTypes: false,

  error: null,

  // 按字母分组的列表
  brands: {},
  series: [],
  types: [],

  selectBrand: {},
  selectSeries: {},
  selectType: {},
});

export default InitialState;
