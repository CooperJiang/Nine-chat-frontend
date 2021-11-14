import { compilerOnlineUser } from "@/utils/chat";
export default {
  setSignInPopup(state, isShow) {
    state.showSignInPopup = isShow;
  },

  setSignUpPopup(state, isShow) {
    state.showSignUpPopup = isShow;
  },

  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },

  setToken(state, token) {
    state.token = token;
  },

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },

  setOnlineUserList(state, userList) {
    state.onlineUserList = compilerOnlineUser(userList);
  },

  setMessageDataList(state, messageInfo) {
    const isArray = Array.isArray(messageInfo);
    let result = [];
    isArray && (result = [...state.messageDataList, ...messageInfo]);
    !isArray && (result = [...state.messageDataList, ...[messageInfo]]);
    state.messageDataList = result;
  },

  setCurrentMusicInfo(state, currentMusicInfo) {
    const { music_info, music_lrc, music_src } = currentMusicInfo;
    state.music_info = music_info;
    state.music_lrc = music_lrc;
    state.music_src = music_src;
  },

  setCurrentMusicStartTime(state, music_start_time) {
    state.music_start_time = music_start_time;
  },

  setCurrenMusicTime(state, current_music_time) {
    state.current_music_time = current_music_time;
  },

  setQueueMusicList(state, queue_music_list) {
    state.queue_music_list = queue_music_list;
  },
};
