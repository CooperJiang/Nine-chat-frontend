import request from "@/utils/request";

export const history = (data) => {
  return request("post", "/chat/history", data);
};
