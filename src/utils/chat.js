/**
 * @desc 返回的在线列表是对象，转化为数组，并且把有管理员的话把管理员放到首位
 * @param {*} userList 在线用户列表
 */
export const compilerOnlineUser = (userList) => {
  const keys = Object.keys(userList);
  if (!keys.length) return [];
  let userInfo = Object.values(userList);
  let homeowner = null;
  let homeownerIndex = userInfo.findIndex((k) => k.role === "admin");
  homeownerIndex != -1 && (homeowner = userInfo.splice(homeownerIndex, 1));
  homeownerIndex != -1 && (userInfo = [...homeowner, ...userInfo]);
  return userInfo;
};
