import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../actions/actionTypes';

export default function userReducer(state = { isAuth: false }, action) {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        isAuth: true,
        ...action.user,
      };

    case AUTH_SIGN_OUT:
      return {
        isAuth: false,
      };

    default:
      return state;
  }
}
