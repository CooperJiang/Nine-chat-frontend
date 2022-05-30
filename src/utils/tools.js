/**
 * @desc 防抖 如 input。核心：在给定的时间间隔内 只触发一次 取消上一次。连续的操作 只触发一次。
 */
export const debounce = (fn, wait = 500) => {
	let timer = null;

	return function () {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, wait);
		// timer = setTimeout(fn, wait);
	};
};

/**
 * @desc 节流 对高频事件的优化  如 scroll。
 * 与防抖区别：防抖在连续的操作过程中只触发一次，而节流可能触发多次，但是频率变低了。
 */
export const throttle = (fn, interval = 300) => {
	let timer = null;
	let timeStart = new Date();

	return function () {
		const now = new Date();
		const space = now - timeStart;
		if (space > interval) {
			fn.apply(this, arguments);
			timeStart = now;
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				// 这个 时候 currentTarget 为 null
				fn.apply(this, arguments);
			}, interval);
		}
	};
};

/**
 * @desc 节流（定时器方案） 对高频事件的优化  如 scroll。核心：间隔时间内 打开可执行标志。
 * 优点：确保最终结果，因为是延迟执行。
 * 缺点：不能马上触发 （方向键操作试下）
 */
export const throttle1 = (fn, interval = 1000) => {
	let timer = null;
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(this, arguments);
				clearTimeout(timer);
				timer = null;
			}, interval);
		}
	};
};

/**
 * @desc 节流（时间戳方案） 对高频事件的优化  如 scroll。 核心： 每隔给定时间，触发一次。
 * 优点：立即触发
 * 缺点：如果上一次停止操作的时间 跟下次操作时间没有超过给定的时间 将不会触发。（时间设置大一点 方向键操作试下）
 */
export const throttle2 = (fn, interval = 2000) => {
	let timeStart = new Date();
	return function () {
		const now = new Date();
		if (now - timeStart > interval) {
			fn.apply(this, arguments);
			timeStart = now;
		}
	};
};

/**
 * @desc 检测是不是空对象
 */
export const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

/**
 * @desc url 上获取参数
 */
export const getQueryString = name => {
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
	const regRewrite = new RegExp(`(^|/)${name}/([^/]*)(/|$)`, 'i');
	const r = window.location.search.substr(1).match(reg);
	const q = window.location.pathname.substr(1).match(regRewrite);
	if (r != null) {
		return unescape(r[2]);
	}
	if (q != null) {
		return unescape(q[2]);
	}
	return null;
};

/**
 * @desc 检测 value 是否在 validList 中
 * @param value 需要检测的值
 * @param validList 检测列表
 */
export function oneOf(value, validList) {
	for (let i = 0; i < validList.length; i++) {
		if (value === validList[i]) {
			return true;
		}
	}
	return false;
}

/**
 * @desc 格式化聊天时间记录
 * @param {*} timeSpace
 */
export const formatChatTime = date => {
	date = new Date(date).getTime();
	const autoZero = n => (String(n).length === 1 ? '0' : '') + n;
	const oriSecond = date / 1000;
	const curSecond = parseInt(new Date().getTime() / 1000);
	const diffSecond = curSecond - oriSecond;
	const curDate = new Date(curSecond * 1000);
	const oriDate = new Date(oriSecond * 1000);
	const Y = oriDate.getFullYear();
	const m = oriDate.getMonth() + 1;
	const d = oriDate.getDate();
	const H = oriDate.getHours();
	const i = oriDate.getMinutes();
	// just
	if (diffSecond < 60) {
		// within a minute
		return '刚刚';
	}
	if (diffSecond < 3600) {
		// within an hour
		return `${Math.floor(diffSecond / 60)}分钟前`;
	}
	if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
		return `今天${autoZero(H)}:${autoZero(i)}`;
	}
	// yesterday
	const mewDate = new Date((curSecond - 86400) * 1000);
	if (mewDate.getFullYear() === Y && mewDate.getMonth() + 1 === m && mewDate.getDate() === d) {
		return `昨天${autoZero(H)}:${autoZero(i)}`;
	}
	if (curDate.getFullYear() === Y) {
		return `${autoZero(m)}月${autoZero(d)}日`;
	}
	return `${Y}年${autoZero(m)}月${autoZero(d)}日`;
};

/**
 * 图片宽高比适应
 * @param {*} w 容器宽
 * @param {*} h 容器高
 * @param {*} r 图片宽高比
 */
export const aspectRatioToWH = (w, h, r, iw, ih) => {
	const o_l = w / h;
	if (iw < w && ih < h) {
		return { w: iw, h: ih };
	}
	// 容器宽度比 大=于 内容 宽高比  以高度为基准
	if (o_l > r) {
		return {
			w: h * r,
			h
		};
	}
	if (o_l < r) {
		return {
			w,
			h: w / r
		};
	}
	return {
		w,
		h
	};
};

/**
 * 获取图片数据
 * @param {*} url 文件地址
 * @param {*} timeout 超时时间
 */
export const getImgBlod = (url, timeout = 60000) =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'blob';

		let timedout = false;
		const timer = setTimeout(() => {
			timedout = true;
			xhr.abort();
		}, timeout);

		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;
			if (timedout) {
				return;
			}
			clearTimeout(timer);
			if (xhr.status === 200 || xhr.status === 304) {
				try {
					const blob = this.response;
					resolve(window.URL.createObjectURL(blob));
				} catch (error) {
					reject(xhr.responseText);
				}
			} else {
				reject(new Error(xhr.responseText));
			}
		};
		xhr.send();
	});
