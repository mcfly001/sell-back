import axios from 'axios'

const request = (url, options = {}, method = 'get') => {
  let key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'
  options = Object.assign({}, options)
  return axios({'url': url, 'method': method, baseURL: nodePath + ':3333', timeout: 6400, [key]: options})
    .then(res => {
      if (res.data && res.data.success) {
        return res.data
      } else {
        Promise.reject(res.data && res.data.data && res.data.errMessage)
      }
    })
}

export default request
