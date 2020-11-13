import firebase from 'firebase/app';
import { SUBSCRIBE_CONVERSATIONS_LIST } from './actionTypes';

const subscribeConversationsList = (currentUser) => (dispatch) => {
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
        type: SUBSCRIBE_CONVERSATIONS_LIST,
        payload: conversationsList,
      });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { subscribeConversationsList };
