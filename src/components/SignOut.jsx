import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../store/actions/actions';

function SignOut() {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => {
        dispatch(signOutAction());
      }}
    >
      Sign out
    </button>
  );
}

export default SignOut;
