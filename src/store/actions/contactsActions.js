/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import {
  UPDATE_CONTACTS,
  SUBSCRIBE_CONTACTS,
  UNSUBSCRIBE_CONTACTS,
} from './actionTypes';

const subscribeContactsAction = () => (dispatch, getState) => {
  const { uid } = getState().user;
  const { subscriber } = getState().contacts;

  if (subscriber !== null) return;

  const contactSubscriber = firebase
    .database()
    .ref('users')
    .on('value', (snapshot) => {
      const contacts = Object.entries(snapshot.val()).reduce((acc, cur) => {
        if (uid === cur[0]) return acc;
        return [...acc, { uid: cur[0], ...cur[1] }];
      }, []);

      dispatch({
        type: UPDATE_CONTACTS,
        payload: snapshot.val(),
      });
    });

  dispatch({
    type: SUBSCRIBE_CONTACTS,
    payload: contactSubscriber,
  });
};

const unsubscribeContactsAction = () => (dispatch, getState) => {
  const { subscriber } = getState().contacts;

  firebase.database().ref('users').off('value', subscriber);

  dispatch({
    type: UNSUBSCRIBE_CONTACTS,
  });
};

export { subscribeContactsAction, unsubscribeContactsAction };
