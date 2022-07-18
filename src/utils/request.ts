import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { message } from 'ant-design-vue';

const service = axios.create({
  baseURL: "/api/"
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something!
    return config;
  },
  (error: Error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: Error) => {
    error?.message && message.error(error?.message);
    return Promise.reject(error);
  }
);

export default service;
