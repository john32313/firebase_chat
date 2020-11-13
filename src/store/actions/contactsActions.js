/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import { SUBSCRIBE_CONTACTS } from './actionTypes';

const subscribeContactsAction = (currentUser) => (dispatch) => {
  const { uid } = currentUser;

  firebase
    .database()
    .ref(`users`)
    .on('value', (snapshot) => {
      const contacts = Object.entries(snapshot.val()).reduce((acc, cur) => {
        if (uid === cur[0]) return acc;
        return [...acc, { uid: cur[0], ...cur[1] }];
      }, []);
      dispatch({
        type: SUBSCRIBE_CONTACTS,
        payload: contacts,
      });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { subscribeContactsAction };
