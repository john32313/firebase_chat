import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import SignOut from './SignOut';

function Auth() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? <SignOut /> : <SignIn />;
}

export default Auth;
