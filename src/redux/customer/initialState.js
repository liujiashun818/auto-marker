import { Record } from 'immutable';

const InitialState = Record({
  isFetching: false,
  isUpdating: false,

  customers: [],
  page: 1,
  totalPage: 1,
});

export default InitialState;
