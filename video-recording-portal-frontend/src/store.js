import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './redux';

const persistConfig = {
  key: 'root',
  storage
}

const initialState = {
  auth: {},
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer, initialState, compose(
  applyMiddleware(reduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

export const persistor = persistStore(store);
export default store;



// function configureStore (
//   state = {
//     auth:{},
//   }
// ){
//   return createStore(
//     persistedReducer,
//     state,
//     compose(
//       applyMiddleware(reduxThunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//     )
//   )
// }

// export default configureStore;