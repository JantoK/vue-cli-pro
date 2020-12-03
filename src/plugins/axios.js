import axios from "axios";

const service = axios.create({
  // 后端api请求的前缀，无可不设置，此处以/api/...为例子
  baseUrl: "/api/",
  timeout: 20000
});

// 错误处理
const err = error => {
  if (!error.response || error.response.code === null) {
    return console.log("请求无响应");
  }

  if (error.response) {
    const statusCode = error.response.status;
    switch (statusCode) {
      case 404:
      case 500:
        return console.log("系统异常");
      case 502:
        return console.log("网络连接不顺畅，请稍后重试");
      default:
        break;
    }
  }

  return Promise.reject(error);
};

// 请求拦截与设置
service.interceptors.request.use(config => {
  // 设置跨域头部,虽然很多浏览器默认都是使用json传数据，考虑IE浏览器。
  config.headers["Content-Type"] = "application/json, text/plain";

  //Todo: 同时在此处可设置/校验token
  return config;
}, err);

// 响应拦截与设置
service.interceptors.response.use(response => {
  const code = response.data.code;
  if (code === 1001) {
    return console.log("身份验证无效");
  }
  return response.data;
}, err);

export default service;
