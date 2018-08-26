import axios from 'axios'
import { Message } from 'element-ui'
// import router from '@/router'

const instance = axios.create({
  baseURL: process.env.BASE_API
  // timeout: 100 * 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 请求函数
 * @param  {Object} config
 * @return {Object} config:处理后的配置，error:错误信息
 */
instance.interceptors.request.use(config => {
  let user = sessionStorage.getItem('token')
  alert(user)
  if (user) {
    config.headers['Authorization'] = 'Basic ' + user
  }
  return config
}, error => {
  const { status } = error.response || {}
  console.log('error_req:', status)
  return Promise.reject(error)
})

/**
 * 响应函数
 * @param  {Object} res 响应
 * @return {Object} data：处理过的数据, error：错误信息
 */
instance.interceptors.response.use(res => {
  if (res && res.data.code === '0') {
    return res.data
  } else {
    Message({ showClose: true, message: res.data.msg, type: 'info' })
    return res.data
  }
}, error => {
  const { status } = error.response || {}
  console.log(error)
  console.log('error_res:', status)
  return Promise.reject(error)
})

export default instance
