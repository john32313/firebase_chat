import firebase from 'firebase/app';

// a transformer en async
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

const createMessage = (uidConv, uidUser, msg) => {
  const timestamp = firebase.database.ServerValue.TIMESTAMP;
  firebase.database().ref(`conversations/${uidConv}/messages`).push().set({
    text: msg,
    exp: uidUser,
    time: timestamp,
  });
};

export { createConversation, createMessage };
