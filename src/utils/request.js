import service from "./axios";

export default function request(method, url, data = {}, headers = {}) {
  const dataType = method.toLocaleLowerCase() == "get" ? "params" : "data";
  const options = {
    method,
    url,
    [dataType]: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  };
  return service(options);
}
