import axios from 'axios';

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export async function get(path, params) {
  return new Promise((resolve, reject) => {
    api.get(path, {params}).then(data => {
      if (data.status !== 200) {
        reject(data);
      }
      resolve(data.data);
    }).catch(err => {
      reject(err);
    });
  });
}

export function post(path, params) {
  return api.post(path, params);
}
