import getDefaultValue from './default';

export default {
	setSignInPopup(state, isShow) {
		state.showSignInPopup = isShow;
	},

	setSignUpPopup(state, isShow) {
		state.showSignUpPopup = isShow;
	},

	setToken(state, token) {
		state.token = token;
	},

	setTheme(state, theme){
		state.theme = theme;
	},

	setUserInfo(state, user_info) {
		state.user_info = user_info;
	},

	/* 设置房间当前所在的房间room_id */
	setRoomId(state, room_id) {
		state.room_id = Number(room_id);
	},

	/* 房间列表信息 */
	setRoomList(state, room_list) {
		state.room_list = room_list;
	},

	/* 房间在线用户列表 */
	setOnlineUserList(state, on_line_user_list) {
		state.on_line_user_list = on_line_user_list;
	},

	/* 房间房主信息 */
	setRoomAdminInfo(state, room_admin_info) {
		state.room_admin_info = room_admin_info;
	},

	/**
	 * @desc 变更消息列表
	 * @param {*} state
	 * @param {*} messageInfo [] || {} 数组表示第一次获取了历史信息或者上拉加载更多 {} 表示一条新消息， 直接存入即可
	 */
	setMessageDataList(state, messageInfo) {
		const isArray = Array.isArray(messageInfo);
		let result = [];
		isArray && (result = [...messageInfo, ...state.messageList]);
		!isArray && (result = [...state.messageList, ...[messageInfo]]);
		state.messageList = state.show_all_tips ? result : result.filter(t => t.message_type !== 'info');
	},

	/* 清除所有公告信息 */
	clearTipsInfo(state) {
		state.messageList = state.messageList.filter(t => t.message_type !== 'info');
	},

	/* 清除公告信息 */
	clearNoticeInfo(state) {
		state.messageList = state.messageList.filter(t => t.message_type !== 'notice');
	},

	/* 撤回消息修改列表信息 */
	updateMessageList(state, { id, msg }) {
		const messageIndex = state.messageList.findIndex(t => t.id === id);
		messageIndex !== -1 && (state.messageList[messageIndex].message_content = msg);
		messageIndex !== -1 && (state.messageList[messageIndex].message_type = 'info');
		state.messageList.forEach(item => {
			if (item?.quote_info?.quote_message_id === id) {
				item.quote_info.quote_message_status = -1;
			}
		});
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

	setQueueMusicList(state, music_queue_list) {
		state.music_queue_list = music_queue_list;
	},

	setUnReadMsgNum(state, un_read_msg_num) {
		state.un_read_msg_num = un_read_msg_num;
	},

	emptyMessageDataList(state) {
		state.messageList = [];
	},

	resetStore(state) {
		Object.assign(state, getDefaultValue());
	},

	/* 设置预览图片 */
	setPreImg(state, pre_img) {
		state.pre_img = pre_img;
	},

	/* 设置当前房间信息 */
	setRoomInfo(state, room_info) {
		state.room_info = room_info;
	},

	/* 设置全局配置信息 */
	setGlobalRoomConfig(state, { key, value }) {
		state[key] = value;
		localStorage.setItem(key, typeof value === 'boolean' ? JSON.stringify(value) : value);
	}
};
