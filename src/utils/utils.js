function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const checkConvExist = (convList, userList) => {
  for (let i = 0; i < convList.length; i += 1) {
    if (arraysEqual(convList[i].userList.sort(), userList.sort()))
      return convList[i].uid_conv;
  }
  return null;
};

// eslint-disable-next-line import/prefer-default-export
export { checkConvExist };
