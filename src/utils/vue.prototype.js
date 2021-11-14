import Vue from "vue";

/**
 * @desc 让节点滚动到可视区域 聊天面板发送消息后回到底部
 * @param {} el dom
 */
export function $scorllToBottom(el = document.querySelector(`#panel_bottom`)) {
  el.scrollIntoView(true);
}

Vue.prototype.$scorllToBottom = $scorllToBottom;
