import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';

import auth from './auth/reducers'
import { LOGOUT } from './auth/types';


const appReducer = combineReducers({
  auth: auth,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    storage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;