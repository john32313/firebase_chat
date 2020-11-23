const isAuthSelector = (state) => state.user.isAuth;
const userSelector = (state) => state.user;

const contactsSelector = (state) => state.contacts.contacts;

const usersListConv = (convoUid) => (state) =>
  state.conversationsList.convList[convoUid].userList;
const unreadConv = (convoUid) => (state) =>
  state.conversationsList.convList[convoUid].unread;
const conversationsListSelector = (state) => state.conversationsList.convList;
const conversationsListArraySelector = (state) =>
  Object.entries(state.conversationsList.convList).reduce((acc, cur) => {
    const curCopy = cur;
    curCopy[1].userList = Object.values(curCopy[1].userList);
    return [...acc, { uid_conv: curCopy[0], ...curCopy[1] }];
  }, []);

export {
  unreadConv,
  isAuthSelector,
  userSelector,
  contactsSelector,
  usersListConv,
  conversationsListSelector,
  conversationsListArraySelector,
};
