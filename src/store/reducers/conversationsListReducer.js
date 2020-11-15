import {
  SUBSCRIBE_CONVERSATIONS_LIST,
  UPDATE_CONVERSATIONS_LIST,
  UNSUBSCRIBE_CONVERSATIONS_LIST,
  AUTH_SIGN_OUT,
} from '../actions/actionTypes';

const conversationsListReducer = (
  state = { convList: {}, subscriber: null },
  action,
) => {
  switch (action.type) {
    case SUBSCRIBE_CONVERSATIONS_LIST:
      return { ...state, subscriber: action.payload };

    case UPDATE_CONVERSATIONS_LIST:
      return { ...state, convList: action.payload };

    case UNSUBSCRIBE_CONVERSATIONS_LIST:
    case AUTH_SIGN_OUT:
      return {};

    default:
      return state;
  }
};

export default conversationsListReducer;
