import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../store/actions/actions';
import { userSelector } from '../store/selectors';

function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  return (
    <button
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
