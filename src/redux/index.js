import { combineReducers } from 'redux';

import AuthInitialState from './auth/initialState';
import NotificationInitialState from './notification/initialState';
import UserInitialState from './user/initialState';
import AutoInitialState from './auto/initialState';

import CustomerInitialState from './customer/initialState';
import QaState from './qa/initialState';
import BannerState from './banner/initialState';
import PlanState from './plan/initialState';

import auth from './auth/reducer';
import notification from './notification/reducer';
import user from './user/reducer';
import auto from './auto/reducer';

import customer from './customer/reducer';
import qa from './qa/reducer';
import banner from './banner/reducer';
import plan from './plan/reducer';

const rootReducer = combineReducers({
  auth,
  notification,
  user,
  auto,
  customer,
  qa,
  banner,
  plan,
});

const rootState = {
  auth: new AuthInitialState(),
  notification: new NotificationInitialState(),
  user: new UserInitialState(),
  auto: new AutoInitialState(),
  customer: new CustomerInitialState(),
  qa: new QaState(),
  banner: new BannerState(),
  plan: new PlanState(),
};

export { rootReducer, rootState };

