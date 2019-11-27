<template>
  <div class="admin">
    <div class="container">
      <el-aside>
        <div class="user">
          欢迎你！
          <span>{{user.email}}</span>
        </div>
        <ul>
          <router-link v-for="data in asideData" :key="data.label" :to="data.to">{{data.label}}</router-link>
        </ul>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </div>
  </div>
</template>

<script>
import { adminUrl } from "./url";
export default {
  name: "Admin",
  data() {
    return {
      asideData: [
        {
          label: "说说",
          to: "ss"
        },
        {
          label: "日志",
          to: "rz"
        },
        {
          label: "相册",
          to: "xc"
        },
        {
          label: "视频",
          to: "sp"
        },
        {
          label: "资料",
          to: "zl"
        },
        {
          label: "板块",
          to: "bk"
        },
        {
          label: "技术文章",
          to: "skill"
        }
      ],
      user: {
        email: ""
      }
    };
  },
  activated() {
    let user = JSON.parse(localStorage.getItem("from"));
    let globalData = this.$store.state.admin.userData;
    if ((user && user.savetime) || globalData.email) {
      let hasData = "";
      if (globalData.email) {
        hasData = globalData;
      } else {
        hasData = user;
      }
      let data = new FormData();
      data.append("email", hasData.email);
      data.append("password", hasData.password);
      data.append("imgyzm", hasData.imgyzm);
      data.append("savetime", hasData.savetime);
      this.$axios.post(`${adminUrl}/personalCenter/login`, data).then(res => {
        if (res.data.ok !== 1) {
          alert("错误！" + res.data.data);
          this.$router.push({ path: "/memberLogin/login" });
        } else {
          this.user.email = hasData.email;
        }
      });
    } else {
      alert("你还未登录，请登录！");
      this.$router.push({ path: "/memberLogin/login" });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.admin
  width: 1280px
  min-height: 95vh
  margin: 0 auto
  .container
    width: 100%
    padding: 20px 0
    position: relative
    @include flex(space-between,flex-start)
    .el-aside
      flex: 0 0 20%
      position: sticky
      top: 0
      .user
        background-color: #fff
        padding: 0 10px
        line-height: 60px
        line-height: 60px
        span
          color: #000
      >ul
        margin-top: 10px
        background-color: #fff
        width: 100%
        padding: 20px
        >a
          display: block
          width: 100%
          height: 30px
          line-height: 30px
          padding: 0 10px 
          transition: all .3s   
          &:hover:not(.router-link-active)
            background-color: #333
            color: #dcdcdc  
            transition: all .3s          
        .router-link-active
          background-color: #000
          color: #fff
    .el-main
      flex: 1 
      padding: 0 20px
</style>