import Vue from 'vue';

/**
 * @desc 让节点滚动到可视区域 聊天面板发送消息后回到底部
 * @param {} el dom
 */
export function $scorllToBottom(options = { id: 'panelEnd', animation: false }) {
	const { id = 'panelEnd', animation = false } = options;
	const el = document.getElementById(id);
	const params = {};
	animation && (params.behavior = 'smooth');
	el.scrollIntoView(params);
}

Vue.prototype.$scorllToBottom = $scorllToBottom;
