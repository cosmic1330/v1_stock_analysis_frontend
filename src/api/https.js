import axios from 'axios';
import { tip, toLogin, to403Page } from './utils.js';

const errorHandle = (status, msg) => {
    switch (status) {
        case 400:
            tip(msg);
            break;
        case 401:
            tip('登入過期,請重新登入');
            setTimeout(() => {
                toLogin();
            }, 1500);
            break;
        case 403:
            to403Page();
            break;
        case 404:
            tip(msg);
            break;
        default:
            tip('res沒有攔截到的錯誤' + msg);
            break;
    }
};

// 預設路由
const instance = axios.create({
    baseURL: process.env.VUE_APP_SECRET,
});

const instanceCors = axios.create({
    baseURL: process.env.VUE_APP_CORS,
});

// request攔截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// response攔截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data);
            return Promise.reject(error);
        } else {
            if (!window.navigator.online) {
                tip('請檢察網路，連線後再重新刷新頁面');
            } else {
                return Promise.reject(error);
            }
        }
    },
);

// 封裝
export const base = ({ method, url, data = null, config = null }) => {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data, config);
    } else if (method == 'get') {
        return instance.get(url, config);
    } else if (method == 'delete') {
        return instance.delete(url, config);
    } else if (method == 'put') {
        return instance.put(url, data, config);
    } else if (method == 'patch') {
        return instance.patch(url, data, config);
    } else {
        console.error('未知的method' + method);
        return false;
    }
};

export const cors = ({ method, url }) => {
    method = method.toLowerCase();
    if (method == 'get') {
        return instanceCors.get(url);
    } else {
        console.error('未知的method' + method);
        return false;
    }
};
