import firebase from 'firebase/app';
import { GET_CONVERSATIONS_LIST } from './actionTypes';

const getConversationsListAction = (currentUser) => (dispatch) => {
  const { uid } = currentUser;

  firebase
    .database()
    .ref(`conversationsList/${uid}`)
    .on('value', (snapshot) => {
      if (!snapshot.val()) return;
      const conversationsList = Object.entries(snapshot.val()).reduce(
        (acc, cur) => [...acc, { uid_conv: cur[0], ...cur[1] }],
        [],
      );
      dispatch({
        type: GET_CONVERSATIONS_LIST,
        payload: conversationsList,
      });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { getConversationsListAction };
