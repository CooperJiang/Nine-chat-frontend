import { getInfo } from "@/api/user";

export default {
  toggleSignInPopup({ commit }, isShow) {
    commit("setSignInPopup", isShow);
  },

  toggleSignUpPopup({ commit }, isShow) {
    commit("setSignUpPopup", isShow);
  },

  async initGetInfo({ commit }, token) {
    commit("setToken", token);
    localStorage.chat_token = token;
    return new Promise((resolve) => {
      getInfo().then((res) => {
        const { userInfo } = res.data;
        commit("setUserInfo", userInfo);
        commit("setIsLogin", true);
        resolve(true);
      });
    });
  },
};
