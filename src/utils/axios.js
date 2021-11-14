import axios from "axios";
import store from "../store/index";
import { getToken } from "@/utils/auth";
import { $message } from "@/components/Message/index.js";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (![200, 201].includes(response.status)) {
      console.log(response, "返回code不是200,201");
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res;
  },
  (error) => {
    if (error.message == "timeout of 5000ms exceeded") {
      $message.error("请求超时，请检查您的网络状态或重新请求！");
    }
    console.log({ error });
    const { code, message } = error.response.data;
    if (code === 401) {
      $message.error(`身份信息校验失败、请重新登录`);
      store.commit("setSignInPopup", true);
    } else {
      $message.error(message);
    }
    return Promise.reject(error);
  }
);

export default service;
