import Injector from 'lib/Injector';
import { combineReducers } from 'redux';

const registerReducers = () => {
  Injector.reducer.register('extraFields', combineReducers({

  }));
};

export default registerReducers;
