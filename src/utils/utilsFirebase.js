import firebase from 'firebase/app';

/**
 * A partir de id conversation transmis
 * ecoute vers la conversation /conversations/uidconv
 * trie les messages dans ordre de timestamp
 * retourne la conversation
 */

const subscribeConversationMessages = (setMessages, uidConvToShow) => {
  firebase
    .database()
    .ref(`conversations/${uidConvToShow}/messages`)
    .on('value', (snapshot) => {
      const result = snapshot.val();
      const timeRangeByOrder = Object.keys(result).sort();
      setMessages(timeRangeByOrder.map((time) => result[time]));
    });
};

const subscribeConversationUserList = (setUsersList, uidConvToShow) => {
  firebase
    .database()
    .ref(`conversations/${uidConvToShow}/userList`)
    .on('value', (snapshot) => {
      setUsersList(snapshot.val());
    });
};

const unsubscribeConversation = (uidConvToShow = 'uidconv4') => {
  firebase.database().ref(`conversations/${uidConvToShow}`).off('value');
};

const createConversation = (userList) => {
  const db = firebase.database();
  const newConvRef = db.ref('conversations').push();
  const {
    path: {
      pieces_: [, uidConv],
    },
  } = newConvRef;

  newConvRef.set({
    userList,
    messages: [],
  });

  userList.forEach((curr) => {
    db.ref(`conversationsList/${curr}/${uidConv}`).set({
      userList: userList.filter((u) => u !== curr),
      unread: 0,
    });
  });
  return uidConv;
};

const sendMessage = (uidConv, uidUser, msg) => {
  const timestamp = firebase.database.ServerValue.TIMESTAMP;
  firebase.database().ref(`conversations/${uidConv}/messages`).push().set({
    text: msg,
    exp: uidUser,
    time: timestamp,
  });
};

export {
  subscribeConversationMessages,
  subscribeConversationUserList,
  unsubscribeConversation,
  createConversation,
  sendMessage,
};
