import firebase from 'firebase/app';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from './actionTypes';

export const signUpAction = (user) => async (dispatch) => {
  const { displayName, photoURL, email, uid } = user;

  await firebase.database().ref(`/users/${user.uid}`).set({
    displayName,
    photoURL,
    conversationsList: null,
    isOnline: true,
    email,
  });

  dispatch({
    type: AUTH_SIGN_IN,
    user: { displayName, photoURL, email, uid },
  });
};

export const signInAction = (user) => async (dispatch) => {
  const { displayName, photoURL, email, uid } = user;

  dispatch({
    type: AUTH_SIGN_IN,
    user: { displayName, photoURL, email, uid },
  });

  await firebase.database().ref(`/users/${user.uid}/isOnline`).set(true);
  await firebase
    .database()
    .ref(`/users/${user.uid}/isOnline`)
    .onDisconnect()
    .set(false);
};

export const signOutAction = (user) => async (dispatch) => {
  await firebase.database().ref(`/users/${user.uid}/isOnline`).set(false);
  await firebase.auth().signOut();

  dispatch({
    type: AUTH_SIGN_OUT,
  });
};
