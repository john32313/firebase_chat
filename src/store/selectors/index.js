const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts.contacts;

const conversationsListSelector = (state) =>
  state.conversationsListSelector.convList;

export {
  isAuthSelector,
  userSelector,
  contactsSelector,
  conversationsListSelector,
};
