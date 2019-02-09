import { combineReducers } from 'redux';

import reduserApi from '@app/reducers/api';
import reduserApp from '@app/reducers/app';

export default combineReducers ({
  reduserApi,
  reduserApp
}); 
 
