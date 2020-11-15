import firebase from 'firebase/app';
import {
  SUBSCRIBE_CONVERSATIONS_LIST,
  UPDATE_CONVERSATIONS_LIST,
  UNSUBSCRIBE_CONVERSATIONS_LIST,
} from './actionTypes';

const subscribeConversationsList = () => (dispatch, getState) => {
  const { uid } = getState().user;

  const conversionListSubscriber = firebase
    .database()
    .ref(`conversationsList/${uid}`)
    .on('value', (snapshot) => {
      if (!snapshot.val()) return;
      dispatch({
        type: UPDATE_CONVERSATIONS_LIST,
        payload: snapshot.val(),
      });
    });

  dispatch({
    type: SUBSCRIBE_CONVERSATIONS_LIST,
    payload: conversionListSubscriber,
  });
};

const unsubscribeConversationsList = () => (dispatch, getState) => {
  const { subscriber } = getState().conversationsList;
  const { uid } = getState().user;

  firebase.database().ref(`conversationsList/${uid}`).off('value', subscriber);

  dispatch({
    type: UNSUBSCRIBE_CONVERSATIONS_LIST,
  });
};

export { subscribeConversationsList, unsubscribeConversationsList };
