import firebase from 'firebase/app';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from './actionTypes';

export const signInAction = (user) => async (dispatch) => {
  await firebase.database().ref(`/users/${user.uid}`).set({
    displayName: user.displayName,
    photoURL: user.photoURL,
  });

  dispatch({
    type: AUTH_SIGN_IN,
    user,
  });
};

export const signOutAction = () => async (dispatch) => {
  await firebase.auth().signOut();

  dispatch({
    type: AUTH_SIGN_OUT,
  });
};
