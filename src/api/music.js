import request from "@/utils/request";

export const search = (data) => {
  return request("get", "/music/search", data);
};

export const collectMusic = (data) => {
  return request("post", "/music/collectMusic", data);
};

export const collectList = (data) => {
  return request("get", "/music/collectList", data);
};

export const hot = (data) => {
  return request("get", "/music/hot", data);
};

export const removeCollect = (data) => {
  return request("post", "/music/removeCollect", data);
};