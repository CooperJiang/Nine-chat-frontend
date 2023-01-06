export default function getDefaultValue() {
	return {
		token: null,
		user_info: null,
		room_list: [],
		room_id: 888,
		on_line_user_list: [],
		messageList: [],
		music_info: null,
		music_lrc: null,
		music_src: null,
		music_start_time: null,
		current_music_time: null,
		music_queue_list: [],
		room_admin_info: {},
		un_read_msg_num: 0, // 未读消息数
		pre_img: null,
		room_info: null, // 此处的信息来自于初始化阶段，后续不会变更，页面使用的数据 以getters的room_info为准 来自ws实时更新的数据

		show_all_tips: true,
		showTipsJoinRoom: true,
		showTipsQuitRoom: true,
		showTipsSwitchMusic: true,
		showTipsPlayMusic: true,
		showTipsNotice: true,
		showHistoryBarrageInfo: true,
		showBarrageImg: false,
		showBarrageAvatar: true,
		theme: 'black'
	};
}
