import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer, rootState} from './index';

export default function configureStore() {
  return createStore(rootReducer, rootState, applyMiddleware(thunk));
}
