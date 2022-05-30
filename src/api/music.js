import request from '@/utils/request';

export const search = data => request('get', '/music/search', data);

export const collectMusic = data => request('post', '/music/collectMusic', data);

export const collectList = data => request('get', '/music/collectList', data);

export const hot = data => request('get', '/music/hot', data);

export const removeCollect = data => request('post', '/music/removeCollect', data);
