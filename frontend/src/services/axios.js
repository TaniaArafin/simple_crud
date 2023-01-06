import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const token = localStorage.getItem('user-token');

if(token) {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
}

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('user-token')
    
    if(token && !config.headers.Authorization) {
        config.headers['Authorization'] = "Bearer " + token
    }
   
    return config;

  }, error => Promise.reject(error));

axiosInstance.interceptors.response.use( response => response, function (error) {
    const token = localStorage.getItem('user-token');
    if(error.response.status == 401 && !token) {
        localStorage.removeItem('user-info')
        window.location.href = '/'
    }
   
    return Promise.reject(error);
  })


export default axiosInstance;