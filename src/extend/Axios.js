import Vue from 'vue'
import Axios from 'axios'
// mark 需在此重新声明Vue对vue-resource的引用，否则无法调用
Vue.use(require('vue-resource'))
export function get(url, params, timeout) {
  return new Promise(function(resolve, reject) {
    Axios.get(url, {
      _timeout: timeout ? 5000 : undefined,
      params,
      onTimeout: (request) => {
        reject("timeout")
      }
    }).then(function(res) {
      if (res.statusText == 'OK') {
        if (res.data) {
          resolve(res.data)
        } else {
          reject("error")
        }
      } else {
        reject(res.body)
      }
    }).catch(function(e) {
      if (e.response.data) {
        reject(e.response.data)
      } else {
        reject("unknown error")
      }
    })
  })
}

export function post(url, params, timeout) {
  return new Promise(function(resolve, reject) {
    Axios.post(url, params, {
      _timeout: timeout ? 5000 : undefined,
      onTimeout: (request) => {
        reject("timeout")
      }
    }).then(function(res) {
      if (res.statusText == 'OK') {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(function(e) {
      if (e.response.data) {
        reject(e.response.data)
      } else {
        reject("unknown error")
      }
    })
  })
}
