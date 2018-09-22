<template>
  <div class="login_box">
    <div class="login_center">
      <div class="title">test</div>
      <div class="login_width_password" v-show="isPasswordlogin">
        <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username"/>
        <input @keyup.13="login" class="myinput" type="password" placeholder="请输入密码" v-model="password"/>
        <div class="login_other">
          <a href="javascript:void(0);">找回密码</a>
          <input type="checkbox" id="remenberme"/><label for="remenberme">记住我</label>
        </div>
        <button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
      </div>

      <div class="login_width_orcode" v-show="!isPasswordlogin">
        <div id="qrcode"></div>
        <div class="instructions">
          <div>请登录微信</div>
          <div>打开左侧栏“扫一扫”功能登录</div>
        </div>
      </div>
      <div class="login-type">
        <span class="useType" @click="isPasswordlogin = !isPasswordlogin">
          {{ isPasswordlogin ? '使用扫码登录' : '使用密码登陆' }}
          <i class="arrows"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode2'
  import { loginBg } from '@/api/api'
  export default {
    name: 'Login',
    data() {
      return {
        isPasswordlogin: false,
        username: '',
        password: '',
        disablebtn: false,
        loginText: '登陆'
      }
    },
    mounted(){
      let qrcode = new QRCode(document.getElementById('qrcode'), {
        text: 'http://10.1.128.18:3334/#/login',
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })

//      var ws = new WebSocket('ws://47.98.169.84:8001');
//
//      ws.onopen = function(e){
//        console.log("连接服务器成功");
//        ws.send("game1");
//      }
//
//      ws.onclose = function(e){
//        console.log("服务器关闭");
//      }
//
//      ws.onerror = function(){
//        console.log("连接出错");
//      }
//
//      ws.onmessage = function(e){
//        console.log(e.data)
//      }
    },
    methods: {
      login(){
        this.disablebtn = true
        loginBg('15088257253', '123123').then(data => {
          this.disablebtn = false
          if (!data.data) {
            sessionStorage.setItem('userInfo', JSON.stringify({account: this.username, password: this.password}))
            this.$router.push({
              path: '/home/goods-list'
            })
          }
          else {
            this.$Message.error('登陆失败')
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
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
    width: 100%;
    height: 100%;
    background-image: url('../../images/bg.png');
    background-size: cover;

    .login_center {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -190px;
      transform: translateY(-50%);
      width: 380px;
      height: 450px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
      background: white;
      padding: 20px 40px 0;

      .title {
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
      }
    }
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
    transition: all 0.5s ease;
    cursor: pointer;
    outline: none;
    color: #fff;
    margin-top: 20px;
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

  .login-type {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f3f3f3;
    color: #333333;
    text-align: center;
    font-size: 16px;
    cursor: pointer;

    .arrows {
      display: inline-block;
      width: 10px;
      height: 15px;
      margin-left: 4px;
      background: url("https://assets.2dfire.com/frontend/a7de968d5eb104cb56e6e44d5c70930d.png") 0 0 no-repeat;
      background-size: cover;
      vertical-align: -2px;
    }
  }

  .login_width_orcode {
    margin-top: 20px;

    #qrcode {
      margin-left: 50px;
      width: 200px;
      height: 200px;
    }

    .instructions {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>

