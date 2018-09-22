import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import AddGoods from '@/views/home/children/add-goods/index.vue'
import GoodsList from '@/views/home/children/goods-list/index.vue'
import AddCategory from '@/views/home/children/add-category/index.vue'
import CategoryList from '@/views/home/children/category-list/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'goods-list',
          name: 'GoodsList',
          component: GoodsList
        },
        {
          path: 'add-goods',
          name: 'AddGoods',
          component: AddGoods
        },
        {
          path: 'category-list',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: 'add-category',
          name: 'AddCategory',
          component: AddCategory
        }
      ]
    }
  ]
})
