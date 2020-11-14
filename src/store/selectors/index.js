const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts.contacts;
const allUsersSelector = (state) => {
  return [...state.contacts.contacts, state.user].reduce((acc, curr) => {
    const { displayName, isOnline, email, photoURL } = curr;
    acc[curr.uid] = {
      displayName,
      isOnline,
      email,
      photoURL,
    };
    return acc;
  }, {});
};

const conversationsListSelector = (state) => state.conversationsList.convList;

export {
  isAuthSelector,
  userSelector,
  contactsSelector,
  allUsersSelector,
  conversationsListSelector,
};
