import {combineReducers} from 'redux';

import home from './groups/home';

const appReducers = combineReducers({
  home,
});

export default (state, action) => {
  return appReducers(state, action);
};
