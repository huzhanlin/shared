<template>
  <div class="login-wrapper">
    <form action class="form">
      <div class="form-wrapper">
        <div class="label">
          <input type="text" v-model="from.email" placeholder="请输入登录账号（邮箱）" />
        </div>
        <div class="password">
          <input type="password" v-model="from.password" placeholder="请输入登录密码" />
        </div>
        <div class="img-yzm">
          <div class="imgyzm">
            <img :src="`${imgUrl}/personalCenter/getimgyzm?${random}`" @click="randomNum" alt />
          </div>
          <input type="text" v-model="from.imgyzm" placeholder="请输入验证码" />
        </div>
        <div class="save-time">
          <select v-model="from.savetime">
            <option value="0">请选择账号有效期(默认为单次有效)</option>
            <option value="1">保存一天</option>
            <option value="7">保存一个星期</option>
            <option value="30">保存一个月</option>
          </select>
        </div>
        <div class="login-in">
          <button @click="loginMetheds">登录</button>
        </div>
        <div class="link">
          <router-link to="register">注册</router-link>
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
      imgUrl: adminUrl,
      random: 0,
      from: {
        email: "",
        password: "",
        imgyzm: "",
        savetime: "0"
      }
    };
  },
  methods: {
    randomNum() {
      this.random = Date.now();
    },
    loginMetheds() {
      event.preventDefault();
      let data = new FormData();
      data.append("email", this.from.email);
      data.append("password", this.from.password);
      data.append("imgyzm", this.from.imgyzm);
      data.append("savetime", this.from.savetime);
      this.$axios
        .post(`${adminUrl}/personalCenter/login`, data)
        .then(res => {
          if (res.data.ok === 1) {
            alert(res.data.data);
            this.$store.commit("admin/setLoginToggle", "personalCenter");
            
            this.$store.commit("admin/setUsertext", this.from.email);
            if (this.from.savetime !== "0") {
              localStorage.setItem(
                "from",
                JSON.stringify({
                  email: this.from.email,
                  password: this.from.password,
                  imgyzm: this.from.imgyzm,
                  savetime: this.from.savetime
                })
              );
            } else {
              this.$store.commit("admin/setUserData", {
                email: this.from.email,
                password: this.from.password,
                imgyzm: this.from.imgyzm,
                savetime: this.from.savetime
              });
            }
            this.from.email = "";
            this.from.password = "";
            this.from.imgyzm = "";
            this.from.savetime = 0;
            this.$router.push({ path: "/personalCenter" });
          } else {
            alert(res.data.data);
          }
        })
        .catch(err => {
          alert("500：" + err);
        });
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
        @include flex(space-between,center)
        .imgyzm
          flex: 0 0 30%
          border: 1px solid #dcdcdc
        >input
          flex: 0 0 50%
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