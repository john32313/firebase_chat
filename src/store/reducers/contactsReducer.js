import { GET_CONTACTS } from '../actions/actionTypes';

export default function contactsReducer(state = {}, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return { ...action.payload };
    default:
      return state;
  }
}
