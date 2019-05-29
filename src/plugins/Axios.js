import axios from 'axios'

export const Axios = axios.create({
  baseURL:  'http://localhost:8080/',
  timeout: 10000,
})

//POST传参序列化(添加请求拦截器)
 // 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    if (localStorage.token) {   
        axios.get('http://localhost:8080/user/refreshtoken?_token='+localStorage.token)
          .then(res => {
            if (res.data != '' || res.data != null || res.data != undefined) {
              localStorage.token = res.data
            }
            config.headers.Authorization = 'Bearer ' + localStorage.token
        }).catch(err => {
            config.headers.Authorization = 'Bearer ' + localStorage.token
        })
    }
    config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
    
},error =>{
    alert("错误的传参", 'fail')
    return Promise.reject(error)
})

// //返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(res =>{
//    //对响应数据做些事
//     if(!res.data.success){
//        alert(res.error_msg)
//        return Promise.reject(res)
//     }
//     return res
// }, error => {
//     if(error.response.status === 401) {
//       // 401 说明 token 验证失败
//       // 可以直接跳转到登录页面，重新登录获取 token
//       location.href = '/login'
//     } else if (error.response.status === 500) {
//        // 服务器错误
//        // do something
//        return Promise.reject(error.response.data)
//     }
//     // 返回 response 里的错误信息
//     return Promise.reject(error.response.data)
// })

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}