const TokenKey = 'chat_token';

export function getToken() {
	return localStorage.getItem(TokenKey);
}

export function setToken(token) {
	return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
	localStorage.clear();
}
