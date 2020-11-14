import {
  UPDATE_CONTACTS,
  SUBSCRIBE_CONTACTS,
  UNSUBSCRIBE_CONTACTS,
  AUTH_SIGN_OUT,
} from '../actions/actionTypes';

export default function contactsReducer(
  state = { contacts: {}, subscriber: null },
  action,
) {
  switch (action.type) {
    case UPDATE_CONTACTS:
      return { ...state, contacts: action.payload };

    case SUBSCRIBE_CONTACTS:
      return { ...state, subscriber: action.payload };

    case UNSUBSCRIBE_CONTACTS: // Fallthrough
    case AUTH_SIGN_OUT:
      return { contacts: {}, subscriber: null };
    default:
      return state;
  }
}
