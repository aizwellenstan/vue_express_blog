require('dotenv').config()
import axios from "axios"
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/blog/api',
    // baseURL: 'http://localhost:3000/blog/api'
})

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
})

http.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    // Do something with response error
    Vue.prototype.$message({
        message: error.response.status+error.response.data.message,
        type: 'error'
    })
    if (error.response.status === 401) {
        router.push('/login')
    }
    // return Promise.reject(error);
});
export default http
