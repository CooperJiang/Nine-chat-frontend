import request from '@/utils/request';

export const history = data => request('post', '/chat/history', data);

export const createRoom = data => request('post', '/chat/createRoom', data);

export const queryRoomInfo = data => request('get', '/chat/roomInfo', data);

export const updateRoomInfo = data => request('post', '/chat/updateRoomInfo', data);
