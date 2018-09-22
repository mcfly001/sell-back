<template>
  <div id="app">
    <div class="header">
      <p class="text-left m-l-large pull-left">test</p>
      <div class="pull-right m-r" @click="loginOut">推出</div>
    </div>
    <div class="container">
      <ul class="leftnav">
        <li v-for="(item, $index) in lefeNavList"
            class="leftnav-item"
            :key="$index">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        lefeNavList: [
          {
            path: '/home/goods-list',
            name: '商品列表'
          },
          {
            path: '/home/category-list',
            name: '分类列表'
          },
          {
            path: '/home/add-goods',
            name: '添加商品'
          },
          {
            path: '/home/add-category',
            name: '添加分类'
          }
        ]
      }
    },
    methods: {
      loginOut(){
        sessionStorage.removeItem('userInfo')
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #272727;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  .container{
    height: 100%;
    padding-top: 70px;
    box-sizing: border-box;

    .leftnav{
      width: 250px;
      height: 100%;
      float: left;
      background: #333;
      padding-top: 30px;

      .leftnav-item{
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
        font-size: 18px;

        a{
          color: white;
          text-decoration: none;

          &.router-link-active{
            color: #68a7ff;
          }
        }
      }
    }

    .content{
      background: #f7f7fa;
      overflow: hidden;
      height: 100%;
    }
  }
</style>
