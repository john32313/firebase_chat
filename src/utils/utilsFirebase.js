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
      if (!result) {
        setMessages([]);
        return;
      }
      const timeRangeByOrder = Object.keys(result).sort();
      setMessages(timeRangeByOrder.map((time) => result[time]));
    });
};

const unsubscribeConversationMessages = (uidConvToShow = 'uidconv4') => {
  firebase
    .database()
    .ref(`conversations/${uidConvToShow}/messages`)
    .off('value');
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

const pushUnreadUsersList = (uidConv, usersList) => {
  usersList.forEach((u) => {
    firebase
      .database()
      .ref(`conversationsList/${u}/${uidConv}/unread`)
      .set(firebase.database.ServerValue.increment(1));
  });
};

const popUnreadConv = (uidConv, uidUser) => {
  firebase
    .database()
    .ref(`conversationsList/${uidUser}/${uidConv}/unread`)
    .set(0);
};

export {
  subscribeConversationMessages,
  unsubscribeConversationMessages,
  createConversation,
  sendMessage,
  pushUnreadUsersList,
  popUnreadConv,
};
