import request from '@/utils/request';

export const register = data => request('post', '/user/register', data);

export const login = data => request('post', '/user/login', data);

export const getInfo = data => request('get', '/user/getInfo', data);

export const updateUserInfo = data => request('post', '/user/update', data);
