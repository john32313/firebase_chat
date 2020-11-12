const isAuthSelector = (state) => state.auth.isAuth;
const userSelector = (state) => state.auth.user;

export { isAuthSelector, userSelector };
