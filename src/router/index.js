import Vue from 'vue'
import Router from 'vue-router'
import AddGoods from '@/views/add-goods/index.vue'
import GoodsList from '@/views/goods-list/index.vue'
import AddCategory from '@/views/add-category/index.vue'
import CategoryList from '@/views/category-list/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods-list'
    },
    {
      path: '/goods-list',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/add-goods',
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: '/category-list',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/add-category',
      name: 'AddCategory',
      component: AddCategory
    }
  ]
})
