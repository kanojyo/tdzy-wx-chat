import axios from 'axios';
import router from '@/router';

import ElementUI from 'element-ui';

// 创建axios实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // Do something before request is sent
    if(sessionStorage.getItem('token')){
        config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    }
    if(localStorage.getItem('device')){
        config.headers.device = localStorage.getItem('device');   // 添加设备号
    }
    // ElementUI.Loading.service({text: '玩命加载中...', background: 'rgba(0, 0, 0, .3)'});    //  全局加载层
    // console.log(config);
    return config;
    
}, error => {
  // Do something with request error
    console.log(error);      // for debug
    Promise.reject(error);
})
// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        const res = response.data;
        if(res.code === 401){   //  token过期后跳转到登录页面
            router.push('/');
            sessionStorage.clear();
            window.location.reload();
            ElementUI.Message.error(res.message);
        }
        else if(res.code === 400){
            ElementUI.Message.error(res.message);
        }
        else if(res.code === 500){
            ElementUI.Message.error(res.message);
        }
        else if(res.code === 402){
            ElementUI.Message.error(res.message);
        }
        else if(res.code === 403){
            ElementUI.Message.error(res.message);
        }
        else if(res.code === 200){
            if(sessionStorage.getItem('token')){
                if(response.headers.authorization !== undefined){
                    let authorization = response.headers.authorization.replace(/Bearer /, '');   //  存储token
                    sessionStorage.setItem('token',  authorization);
                }
            }
        }
        // console.log(res);
        // ElementUI.Loading.service().close();
        return res;
}, error => {
    ElementUI.Message.error('404:网络链接错误');
    ElementUI.Loading.service().close();
    return Promise.reject(error);
})

export default instance;
