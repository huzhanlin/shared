<template>
  <div class="login-wrapper">
    <form action class="form">
      <div class="form-wrapper">
        <div class="label">
          <input type="text" v-model="form.email" placeholder="请输入邮箱账号" />
          <el-button type="mini" :disabled="disabled" @click="sendYzm">{{yzTime}}</el-button>
        </div>
        <div class="password">
          <input type="password" v-model="form.password" placeholder="请输入注册密码" />
        </div>
        <div class="password">
          <input type="password" v-model="yzPassword" placeholder="请重复输入密码" />
        </div>
        <div class="img-yzm">
          <div>验证码：</div>
          <input type="text" v-model="form.yzm" placeholder="请输入验证码" />
        </div>
        <div class="login-in">
          <button @click="registerInfo">注册</button>
        </div>
        <div class="link">
          <router-link to="login">登录</router-link>
          <router-link to="updataPassword">修改密码</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { adminUrl } from "../../admin/url";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        yzm: ""
      },
      yzPassword: "",
      yzTime: "发送验证码",
      disabled: false
    };
  },
  methods: {
    sendYzm() {
      this.disabled = true;
      if (this.form.email === "") {
        alert("请填写您的邮箱");
        this.disabled = false;
        return;
      }
      let data = this.form.email;
      this.$axios
        .get(`${adminUrl}/personalCenter/getemailyzm`, {
          params: {
            email: data
          }
        })
        .then(res => {
          if (res.data.ok) {
            alert("邮箱验证码发送成功！");
            this.yzTime = 60;
            let time = setInterval(() => {
              if (this.yzTime === 0) {
                this.yzTime = "发送验证码";
                this.disabled = false;
                clearInterval(time);
              } else {
                this.yzTime = this.yzTime - 1;
              }
            }, 1000);
          } else {
            alert("邮箱验证码发送失败，请检查邮箱是否填写正确。");
            this.disabled = false;
          }
        })
        .catch(err => {
          alert("请求的数据错误：" + err);
          this.disabled = false;
        });
    },
    registerInfo() {
      event.preventDefault();
      if (
        !this.yzPassword ||
        !this.form.password ||
        !this.form.yzm ||
        !this.form.email
      ) {
        alert("请填写所有字段的数据。");
        return;
      }
      if (this.yzPassword !== this.form.password) {
        alert("你输入的两次密码不一致！");
        return;
      } else {
        let data = new FormData();
        data.append("email", this.form.email);
        data.append("password", this.form.password);
        data.append("yzm", this.form.yzm);
        this.$axios
          .post(`${adminUrl}/personalCenter/register`, data)
          .then(res => {
            if (res.data.ok === 1) {
              alert("账号注册成功");
              this.$router.push("login");
            } else if (res.data.ok === -2) {
              alert("验证码错误！");
            } else if (res.data.ok === -3) {
              alert(res.data.data);
            } else if (res.data.ok === -4) {
              alert("验证码已过期,请重新发送验证码！");
            } else {
              alert("数据返回错误！");
            }
          })
          .catch(err => {
            alert("请求数据错误：" + err);
          });
      }
    }
  }
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
        @include flex(space-between,flex-start)
        input
          flex: 0 0 70%
          border: none
          border-bottom: 1px solid #dcdcdc
          height: 40px
          outline: none
        .el-button
          flex: 0 0 20%          
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