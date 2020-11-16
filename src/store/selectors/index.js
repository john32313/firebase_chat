const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts.contacts;

const usersListConv = (convoUid) => (state) =>
  state.conversationsList.convList[convoUid].userList;
const unreadConv = (convoUid) => (state) =>
  state.conversationsList.convList[convoUid].unread;
const conversationsListSelector = (state) => state.conversationsList.convList;
const conversationsListArraySelector = (state) =>
  Object.entries(state.conversationsList.convList).reduce(
    (acc, cur) => [...acc, { uid_conv: cur[0], ...cur[1] }],
    [],
  );

export {
  unreadConv,
  isAuthSelector,
  userSelector,
  contactsSelector,
  usersListConv,
  conversationsListSelector,
  conversationsListArraySelector,
};
