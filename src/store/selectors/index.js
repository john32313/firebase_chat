const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts;

const conversationsListSelector = (state) => state.conversationsListSelector;

export {
  isAuthSelector,
  userSelector,
  contactsSelector,
  conversationsListSelector,
};
