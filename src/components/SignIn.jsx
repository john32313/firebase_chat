import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { signUpAction } from '../store/actions';

function SignIn() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ??
      new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
        // {
        //   provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // },
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          if (authResult.additionalUserInfo.isNewUser)
            dispatch(signUpAction(authResult.user));
          return false;
        },
      },
    });
  }, []);

  return <div id="firebaseui-auth-container" />;
}

export default SignIn;
