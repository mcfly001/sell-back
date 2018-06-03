import request from './index'

// 获取商品列表
export const getGoodsList = (pageSize = 1, pageNum = 20, searchText = '') => {
  return request('/get.goods.list', {pageSize, pageNum, searchText}, 'get')
}

// 添加商品
export const addGoods = (name = '', price = '', category = '', breif = '') => {
  return request('/add.goods', {name, price, category, breif}, 'post')
}

// 删除商品
export const removeGoods = (_id) => {
  return request('/delete.goods', {_id}, 'post')
}

// 获取分类列表
export const getCategoryList = (pageSize = 1, pageNum = 20, searchText = '') => {
  return request('/get.category.list', {pageSize, pageNum, searchText}, 'get')
}

// 添加分类
export const addCategory = (name) => {
  return request('/add.category', {name}, 'post')
}

// 删除分类
export const removeCategory = (_id) => {
  return request('/delete.category', {_id}, 'post')
}
