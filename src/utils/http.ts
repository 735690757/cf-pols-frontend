import axios from 'axios';
export const http = axios.create({
});
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['satoken'] = token; // 添加到请求头
        }
        return config;
    },(error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);