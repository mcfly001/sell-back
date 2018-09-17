// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Table, Page, Form, FormItem, Input, Option, Select, Message } from 'iview'
import './css/reset.css'
import './css/index.css'
import 'iview/dist/styles/iview.css';

const componentsArr = {
  Button,
  Table,
  Page,
  Form,
  FormItem,
  Input,
  Option,
  Select
}

router.beforeEach((to, from, next) => {
  if(to.path !== '/'){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
    if(userInfo.password !== '123123'){
      Message.error('请先登陆')
      return
    }
  }
  next()
})

Object.keys(componentsArr).forEach(item => {
  Vue.component(item, componentsArr[item])
})

Vue.prototype.$Message = Message
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
