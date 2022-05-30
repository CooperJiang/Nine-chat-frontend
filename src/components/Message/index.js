import vue from 'vue';
import Message from './index.vue';

const NOTIFY = vue.extend(Message);
const notifyWrap = document.createElement('div');
notifyWrap.className = 'notify-wrap';
notifyWrap.style =
	'min-width: 380px;position: fixed;left: 50%;top: 20px;transform: translateX(-50%);transition: opacity .3s,transform .4s,top .4s;display: flex;align-items: center;flex-direction: column; z-index:300';
document.body.appendChild(notifyWrap);
const Notice = {
	/**
	 * 通知框
	 * @content 提示内容;
	 * @type 提示框类型，parameter： message，success，error，warning
	 * @time 显示时长
	 * @noNotifyBtn 是否显示 不再提示 的按钮
	 */
	notify: ({ content, type, time = 3000, noNotifyBtn = false }) => {
		if (sessionStorage.getItem('dontRemindAgain')) {
			return;
		}
		// 创建一个存放通知的div
		const NOTIFYDOM = new NOTIFY({
			el: document.createElement('div'),
			data() {
				return {
					notifyFlag: true, // 是否显示
					time, // 取消按钮是否显示
					content, // 文本内容
					type: type || 'message', // 类型
					noNotifyBtn, // 不再提示的按钮是否显示
					timer: '',
					timeFlag: false
				};
			},
			watch: {
				timeFlag() {
					if (this.timeFlag) {
						this.notifyFlag = false; // 销毁div渲染
						window.clearTimeout(this.timer); // 清除计时器
					}
				}
			},
			created() {
				this.timer = setTimeout(() => {
					this.timeFlag = true; // 时间到了，就变为true
				}, this.time);
			},
			beforeDestroy() {
				window.clearTimeout(this.timer);
			}
		});
		// 往notifyWrap里面添加通知
		notifyWrap.appendChild(NOTIFYDOM.$el);
	}
};

export const $message = {};
$message.success = function (content) {
	return Notice.notify({
		content,
		type: 'success',
		time: 3000,
		noNotifyBtn: false
	});
};
$message.info = function (content) {
	return Notice.notify({
		content,
		type: 'message',
		time: 3000,
		noNotifyBtn: false
	});
};
$message.error = function (content) {
	return Notice.notify({
		content,
		type: 'error',
		time: 3000,
		noNotifyBtn: false
	});
};
$message.warning = function (content) {
	return Notice.notify({
		content,
		type: 'warning',
		time: 3000,
		noNotifyBtn: false
	});
};
// 注册
function register() {
	vue.prototype.$message = Notice;
	vue.prototype.$message.success = $message.success;
	vue.prototype.$message.error = $message.error;
	vue.prototype.$message.info = $message.info;
	vue.prototype.$message.warning = $message.warning;
}

export default {
	Message,
	register
};
