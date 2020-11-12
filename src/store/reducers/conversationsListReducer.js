import { GET_CONVERSATIONS_LIST, AUTH_SIGN_OUT } from '../actions/actionTypes';

const conversationsListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS_LIST:
      return { ...action.payload };
    case AUTH_SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default conversationsListReducer;
