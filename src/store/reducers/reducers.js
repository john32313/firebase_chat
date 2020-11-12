import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contactsReducer from './contactsReducer';
import conversationListReducers from './conversationsListReducer';

export default combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  conversationsList: conversationListReducers,
});
