import React from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../store/actions';
import { userSelector } from '../store/selectors';

function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  return (
    <Button
      color="inherit"
      startIcon={<ExitToAppIcon />}
      onClick={() => {
        dispatch(signOutAction(user));
      }}
    >
      Se déconnecter
    </Button>
  );
}

export default SignOut;
