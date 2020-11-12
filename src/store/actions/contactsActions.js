/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import { GET_CONTACTS } from './actionTypes';

const getContactsAction = (currentUser) => (dispatch) => {
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
        type: GET_CONTACTS,
        payload: contacts,
      });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { getContactsAction };
