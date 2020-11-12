import firebase from 'firebase/app';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from './actionTypes';

export const signUpAction = (user) => async (dispatch) => {
  await firebase.database().ref(`/users/${user.uid}`).set({
    displayName: user.displayName,
    photoURL: user.photoURL,
    conversationsList: null,
    statut: true,
    mail: user.email,
  });

  dispatch({
    type: AUTH_SIGN_IN,
    user,
  });
};

export const signInAction = (user) => async (dispatch) => {
  await firebase.database().ref(`/users/${user.uid}/statut`).set(true);
  dispatch({
    type: AUTH_SIGN_IN,
    user,
  });
};

export const signOutAction = (user) => async (dispatch) => {
  await firebase.database().ref(`/users/${user.uid}/statut`).set(false);
  await firebase.auth().signOut();

  dispatch({
    type: AUTH_SIGN_OUT,
  });
};
