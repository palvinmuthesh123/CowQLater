import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import authReducer from './auth.reducer';

const config = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  timeout: null,
  whitelist: [
    'authReducer',
  ],
};
const reducers = persistCombineReducers(config, {
  authReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
