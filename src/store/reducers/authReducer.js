import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../actions/actionTypes';

export default function authReducer(
  state = { isAuth: false, user: null },
  action,
) {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        isAuth: true,
        user: action.user,
      };

    case AUTH_SIGN_OUT:
      return {
        isAuth: false,
        user: null,
      };

    default:
      return state;
  }
}
