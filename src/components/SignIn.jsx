import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

function SignIn() {
  useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      callbacks: {
        signInSuccess: () => false,
      },
    });
  }, []);

  return <div id="firebaseui-auth-container" />;
}

export default SignIn;
