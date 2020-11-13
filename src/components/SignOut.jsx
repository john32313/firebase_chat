import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../store/actions';
import { userSelector } from '../store/selectors';

function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

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
