import request from '@/utils/request';

export const queryEmo = data => request('get', '/chat/emoticon', data);
