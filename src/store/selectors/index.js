const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts.contacts;

const conversationsListSelector = (state) => state.conversationsList;

export {
  isAuthSelector,
  userSelector,
  contactsSelector,
  conversationsListSelector,
};
