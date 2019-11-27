<template>
  <div class="personalCenter-wrapper">
    <div class="ctx-wrapper">
      <div class="navs">
        <ul class="nav-link-wrapper">
          <li v-for="data in inforData" :key="data.bk" class="link">
            <div class="number">{{data.number}}</div>
            <div class="bk">{{data.bk | textString}}</div>
          </li>
        </ul>
        <div class="infos">
          <div class="xuanyan">
            <i class="el-icon-edit"></i>
            这家伙很懒，什么都没有记录
          </div>
          <div class="jibenziliao">
            <i class="el-icon-s-order"></i>
            30岁，男
          </div>
          <div class="xianzhudizhi">
            <i class="el-icon-location-information"></i>
            嘉兴市桐乡市万象汽配有限公司
          </div>
          <div class="zhiye">
            <i class="el-icon-s-platform"></i>
            美工（意向前端开发）
          </div>
          <div class="lianxifangshi">
            <i class="el-icon-phone-outline"></i>
            手机号码：18680160654
          </div>
        </div>
        <div class="zuijinliuyan">
          <ul>
            <li>
              <div class="title">你是个猪</div>
              <div class="ctx-user">
                <div class="user-cover">
                  <i class="el-icon-user"></i>
                  <span>友人</span>
                </div>
                <div class="time">留言时间：2019-11-14</div>
              </div>
            </li>
            <li>
              <div class="title">嗨，帅哥，你真帅，我想打你啊！</div>
              <div class="ctx-user">
                <div class="user-cover">
                  <i class="el-icon-user"></i>
                  <span>友人</span>
                </div>
                <div class="time">留言时间：2019-11-14</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content" style="padding-right: 20px">
        <div>
          <img width="100%" src="@/assets/user01.png" alt />
        </div>
        <div style="margin-top: 10px">
          <img width="100%" src="@/assets/user02.png" alt />
        </div>
      </div>
      <div class="aside">
        <div class="btn">
          <el-button @click="logout" type="mini">退出登录</el-button>
        </div>
        <div class="btn">
          <el-button type="mini">更改密码</el-button>
        </div>
        <div class="btn">
          <el-button type="mini">设置访问权限</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      text: "",
      user: "",
      inforData: [
        { bk: "ss", number: 0 },
        { bk: "rz", number: 0 },
        { bk: "xc", number: 0 },
        { bk: "sp", number: 0 },
        { bk: "jswz", number: 0 }
      ]
    };
  },
  filters: {
    textString(data) {
      if (data === "ss") {
        return "说说";
      } else if (data === "rz") {
        return "日志";
      } else if (data === "xc") {
        return "相册";
      } else if (data === "sp") {
        return "视频";
      } else {
        return "技术文章";
      }
    }
  },
  mounted() {
    let data = JSON.parse(localStorage.getItem("from"));
    this.text = data.email;
  },
  methods: {
    logout() {
      localStorage.setItem("from", JSON.stringify({}));
      this.$store.commit("admin/setLoginToggle", "memberLogin");
      this.$store.commit("admin/setUsertext", "");
      this.$router.push({ path: "/memberLogin" });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/default.sass"
.personalCenter-wrapper
  width: 100%
  min-height: 90vh
  overflow: hidden
  .ctx-wrapper
    width: 1280px
    margin: 40px auto
    @include flex(sapce-between,flex-start)
    .navs
      flex: 0 0 30%
      padding-right: 20px
      .nav-link-wrapper
        padding: 5px
        width: 100%
        height: 80px
        background-color: #fff
        @include flex(flex-start,center)
        .link
          flex: 1
          height: 100%
          border-right: 1px solid #dcdcdc
          text-align: center
          .number
            font-size: 18px
            height: 30px
            line-height: 30px
          .bk
            height: 30px
            line-height: 30px
          &:last-child
            border-right: 0
      .infos
        width: 100%
        margin-top: 10px 
        background-color: #fff
        padding: 0 10px
        >div
          width: 100%
          line-height: 50px
          border-bottom: 1px solid #dcdcdc
          i
            color: #eb2001
            margin-right: 10px
          &:last-child
            border-bottom: none
      .zuijinliuyan
        width: 100%
        margin-top: 10px
        >ul
          width: 100%
          padding: 10px
          background-color: #fff
          >li
            width: 100%
            border-bottom: 1px solid #dcdcdc
            margin-bottom: 10px
            .title
              width: 100%
              line-height: 25px
              color: #000
            .ctx-user
              width: 100%
              line-height: 40px
              @include flex(space-between,center)
              .user-cover
                flex: 1
                >i
                  color: #eb2001
                  margin-right: 10px
                >span
                  color: #000
              .time   
                flex: 1    
            &:last-child
              border: none       
    .content
      flex: 1
    .aside
      flex: 0 0 10%
      .btn
        width: 100%
        height: 40px
        background-color: #fff
        @include flex(center,center)
        margin-bottom: 10px
</style>