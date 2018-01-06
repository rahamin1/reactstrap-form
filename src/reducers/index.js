import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  users: UsersReducer
});

export default rootReducer;
