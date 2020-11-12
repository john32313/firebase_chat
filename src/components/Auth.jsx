import React from 'react';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../store/selectors';
import SignIn from './SignIn';
import SignOut from './SignOut';

function Auth() {
  const isAuth = useSelector(isAuthSelector);

  return isAuth ? <SignOut /> : <SignIn />;
}

export default Auth;
