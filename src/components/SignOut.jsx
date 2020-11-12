import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../store/actions/actions';

function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <button
      className="bg-gray-700 text-white text-bold rounded p-2"
      type="button"
      onClick={() => {
        dispatch(signOutAction(user));
      }}
    >
      Sign out
    </button>
  );
}

export default SignOut;
