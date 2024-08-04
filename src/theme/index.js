import store from '@/store';

const themes = {};

const themeFiles = require.context('./modules', true, /\.js$/);
themeFiles.keys().forEach(modulePath => {
	const themeName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	themes[themeName] = themeFiles(modulePath).default;
	return themes;
});

const changeStyle = obj => {
	if (!obj) return;
	Object.keys(obj).forEach(key => {
		document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, obj[key]);
	});
};

export const setTheme = themeName => {
	localStorage.setItem('theme', themeName);
	store.commit('setTheme', themeName);
	const isHasTheme = Object.keys(themes).includes(themeName);
	if (isHasTheme) {
		const themeConfig = themes[themeName];
		Object.keys(themeConfig).forEach(key => localStorage.setItem(key, themeConfig[key]));
		changeStyle(themeConfig);
	} else {
		const themeConfig = {};
		const keys = ['sidebarBgColor', 'sidebarTextColor', 'mainBgColor', 'mainTextColor', 'borderColor', 'primaryTextColor'];
		keys.forEach(key => {
			localStorage[key] && (themeConfig[key] = localStorage[key]);
		});
		changeStyle(themeConfig);
	}
};
