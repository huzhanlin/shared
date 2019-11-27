<template>
  <div class="login-wrapper">
    <form action class="form">
      <div class="form-wrapper">
        <div class="label">
          <input type="text" placeholder="请输入要修改密码的账号" />
        </div>
        <div class="password">
          <input type="password" placeholder="请输入修改密码" />
        </div>
        <div class="password">
          <input type="password" placeholder="请重复输入密码" />
        </div>
        <div class="login-in">
          <button>确定修改</button>
        </div>
        <div class="link">
          <router-link to="login">登录</router-link>
          <router-link to="register">注册</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="sass">
@import '@/assets/default.sass'
.login-wrapper
  width: 100%
  height: 95vh
  .form
    width: 500px
    height: 500px
    margin: 20px auto
    background-color: #fff
    padding: 40px
    box-shadow: 0px 2px 10px rgba(0,0,0,.3)
    .form-wrapper      
      width: 100%
      height: 100%
      @include align(middle)
      .label
        width: 100%
        height: 60px
        pading: 10px 0
        input
          width: 100%
          border: none
          border-bottom: 1px solid #dcdcdc
          height: 40px
          outline: none
      .password
        width: 100%
        height: 60px
        pading: 10px 0
        input
          width: 100%
          border: none
          border-bottom: 1px solid #dcdcdc
          height: 40px
          outline: none
      .img-yzm
        width: 100%
        height: 80px
        pading: 10px 0
        @include flex(flex-start,center)
        >div
          flex: 1
        >input
          flex: 1
          height: 40px
          outline: none
          border: none
          border-bottom: 1px solid #dcdcdc
      .save-time
        margin-top: 10px
        width: 100%
        height: 80px
        pading: 20px 0
        >select 
          width: 100%
          height: 40px
      .login-in
        width: 100%
        height: 40px
        >button
          width: 100%
          height: 100%
          background-color: #eb2001
          color: #FFF
          &:hover
            background-color: #666
            color: #000
      .link
        width: 100%
        height: 40px
        @include flex(space-between,center)
        >a
          color: #ea003a
          &:hover
            color: #000
</style>