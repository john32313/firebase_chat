import { GET_CONTACTS, AUTH_SIGN_OUT } from '../actions/actionTypes';

export default function contactsReducer(state = {}, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return { ...action.payload };
    case AUTH_SIGN_OUT:
      return {};
    default:
      return state;
  }
}
