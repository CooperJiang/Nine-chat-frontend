import request from "@/utils/request";

export const register = (data) => {
  return request("post", "/user/register", data);
};

export const login = (data) => {
  return request("post", "/user/login", data);
};

export const getInfo = (data) => {
  return request("get", "/user/getInfo", data);
};
