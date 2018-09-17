<template>
  <div class="backlogin">
    <div v-show="!isLoginSuccess" class="login_box">
      <div class="title">后台登录</div>
      <div>
        <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username"/>
      </div>
      <div>
        <input @keyup.13="login" class="myinput" type="password" placeholder="请输入密码" v-model="password"/>
      </div>
      <div class="login_other">
        <a href="javascript:void(0);">找回密码</a>
        <input type="checkbox" id="remenberme"/><label for="remenberme">记住我</label>
      </div>
      <button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
    </div>
    <Home v-show="isLoginSuccess"></Home>
  </div>
</template>

<script>
  import Home from './views/Home.vue'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        username: '',
        password: '',
        disablebtn: false,
        loginText: '登陆',
        isLoginSuccess: false
      }
    },
    created(){
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.isLoginSuccess = Boolean(userInfo && userInfo.userName)
    },
    methods: {
      login(){
        this.disablebtn = true
        if (this.username === '15088257253' && this.password === '123123') {
          this.isLoginSuccess = true
          this.$Message.success('登陆成功')
          sessionStorage.setItem('userInfo', JSON.stringify({userName: '15088257253', password: '123123'}))
        }
        else {
          this.$Message.error('登陆失败')
        }
      }
    },
    components: {
      Home
    }
  }
</script>

<style scoped>

  .backlogin {
    height: 100%;
  }

  .header {
    height: 60px;
    box-shadow: 0 1px 5px rgba(13, 62, 73, 0.2);
  }

  .header img {
    width: 170px;
    margin-top: 12px;
    margin-left: 15px;
    float: left;
  }

  .header span {
    float: left;
    color: #566a80;
    margin: 21px 0 0 20px;
  }

  .login_box {
    width: 320px;
    margin: 50px auto;
  }

  .login_box .myinput {
    width: 100%;
    border: 1px solid #cad3de;
    height: 40px;
    line-height: 40px;
    margin: 5px 0 10px;
    border-radius: 3px;
    padding: 0 10px;
    outline: none;
    box-sizing: border-box;
  }

  .login_box .myinput:focus {
    border: 1px solid #4289dc;
  }

  .login_other {
    overflow: hidden;
  }

  .login_other a {
    float: right;
    color: #727f8f;
  }

  .login_other a:hover {
    color: #273444;
  }

  .login_other input, .login_other label {
    float: left;
    color: #727f8f;
  }

  .login_other input {
    margin: 4px 5px 0 0;
  }

  .login {
    box-sizing: border-box;
    border: none 0;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background: #4187db;
    font-size: 16px;
    border-radius: 3px;
    margin-right: 40px;
    transition: all 0.5s ease;
    cursor: pointer;
    outline: none;
    color: #fff;
    margin-top: 15px;
  }

  .login:hover {
    background: #2668b5;
  }

  .login[disabled] {
    opacity: 0.8;
  }

  .login[disabled]:hover {
    background: #4187db;
  }

  .title {
    color: #273444;
    font-size: 1.5em;
    text-align: center;
    margin: 0 0 20px 0;
  }

  @media only screen and (max-width: 768px) {
    .login_box {
      width: 280px;
      margin: 50px auto;
    }
  }
</style>
