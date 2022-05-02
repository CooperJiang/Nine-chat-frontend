import request from "@/utils/request";

export const queryEmo = (data) => {
  return request("get", "/chat/emoticon", data);
};
