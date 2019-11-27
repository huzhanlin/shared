<template>
  <div id="app">
    <div class="nav">
      <div class="nav-wrapper">
        <div class="logo">
          <a href="/">
            <span class="an">An</span>
            <span class="lin">lin</span>
          </a>
        </div>
        <ul class="link">
          <li v-for="data in linkData" :key="data.to" class="link-wrapper">
            <router-link :to="data.to">
              <span>{{data.label}}</span>
            </router-link>
          </li>
        </ul>
        <div class="sign-in">
          <ul class="sign-item">
            <router-link :to="logData[toggle].to">{{logData[toggle].label}}</router-link>
          </ul>
          <div v-if="usertext">欢迎你！{{usertext}}</div>
        </div>
      </div>
    </div>
    <div :style="marginBottom">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <musicControl
      @_changeMusicWord="_changeMusicWord"
      v-show="musicControlFlog"
      class="music"
      ref="musicControl"
    ></musicControl>
    <div class="music-toggle" @click="closeMusicControl">
      <i class="el-icon-headset"></i>
    </div>
  </div>
</template>
<script>
import musicControl from "@/components/music-control";
import { adminUrl } from "./views/admin/url";
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  name: "App",
  components: {
    musicControl
  },
  data() {
    return {
      linkData: [
        {
          label: "博客",
          to: "/blog"
        },
        {
          label: "后台管理",
          to: "/admin"
        },
        {
          label: "听音乐",
          to: "/music"
        }
        // {
        //   label: "聊天室",
        //   to: "/admin"
        // }
      ],
      musicControlFlog: true,
      musicWord: false,
      logData: {
        personalCenter: {
          to: "/personalCenter",
          label: "个人中心"
        },
        memberLogin: {
          to: "/memberLogin",
          label: "会员登录"
        }
      },
      init: false
    };
  },
  computed: {
    marginBottom() {
      if (this.musicControlFlog && this.musicWord) {
        return {
          marginBottom: "90px"
        };
      }
      if (this.musicControlFlog) {
        return {
          marginBottom: "50px"
        };
      }
    },
    toggle() {
      let data = this.$store.state.admin.loginToggle;
      if (data) {
        return data;
      }
    },
    usertext: {
      get() {
        let data = this.$store.state.admin.usertext;
        if (data) {
          return data;
        }
      },
      set() {}
    },
    ...mapGetters("music", ["historyListData"])
  },

  mounted() {
    let data = JSON.parse(localStorage.getItem("from"));
    let globalData = this.$store.state.admin.userData;
    if ((data && data.savetime) || globalData.email) {
      this.loginMetheds(data);
    } else {
      this.init = true;
      this.$store.commit("admin/setLoginToggle", "memberLogin");
      this.$router.push({ path: "memberLogin" });
    }

    this.keyDownMethods();
    this.initSessionMusicData();
  },
  methods: {
    _changeMusicWord(Bool) {
      this.musicWord = Bool;
    },
    closeMusicControl() {
      // 切换音乐播放器的显示和隐藏
      this.musicControlFlog = !this.musicControlFlog;
    },
    keyDownMethods() {
      let body = document.getElementsByTagName("body")[0];
      body.onkeydown = e => {
        if (e.keyCode === 32) {
          e.preventDefault();
          this.$refs.musicControl.togglePlayed();
        } else if (e.keyCode === 38) {
          e.preventDefault();
          this.$refs.musicControl._addChangeVolume(0.1);
        } else if (e.keyCode === 40) {
          e.preventDefault();
          this.$refs.musicControl._backChangeVolume(0.1);
        }
      };
    },
    loginMetheds(data) {
      let datas = new FormData();
      datas.append("email", data.email);
      datas.append("password", data.password);
      datas.append("imgyzm", data.imgyzm);
      datas.append("savetime", data.savetime);
      this.$axios
        .post(`${adminUrl}/personalCenter/login`, datas)
        .then(res => {
          if (res.data.ok === 1) {
            this.usertext = this.$store.commit("admin/setUsertext", data.email);
            this.$store.commit("admin/setLoginToggle", "personalCenter");
          } else {
            this.$store.commit("admin/setLoginToggle", "memberLogin");
          }
        })
        .catch(err => {
          alert("500：" + err);
          this.$store.commit("admin/setLoginToggle", "memberLogin");
        });
    },
    ...mapMutations("music", ["initSessionMusicData"])
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
#app
  width: 100%
  background-color: #f6f6f6
  position: relative
  .nav
    width: 100%
    background-color: #fff
    height: 7vh
    .nav-wrapper
      width: 1280px
      height: 100%
      margin: 0 auto
      @include flex(space-between,flex-start)
    .logo
      flex: 0 0 8%
      height: 100%
      font-size: 26px
      font-weight: 700
      @include flex(center,center)
      .an
        color: #0487dc
      .lin
        color: #2eb037
    .sign-in
      flex: 0 0 25%
      height: 100%
      @include flex(space-between,center)
    .link
      flex: 0 0 65%
      height: 100%
      @include flex(flex-start,center)
      .link-wrapper        
        height: 100%
        transition: all .5s
        >a
          height: 100%
          width: 100%
          padding: 0 15px
          color: #666C7A    
          display: block      
          >span
            width: 100%
            height: 100%
            @include flex(center,center)
        &:hover
          background-color: #f6f6f6
          transition: all .5s
        .router-link-active
          >span
            border-bottom: 2px solid #D92E2E
            color: #000
  .music
    position: fixed
    left: 0
    bottom: 0
    z-index: 100
  .music-toggle
    position: fixed
    right: 50px
    bottom: 90px
    background-color: #0487dc
    width: 30px
    height: 30px
    border-radius: 50%
    overflow: hidden
    @include flex(center,center)
    box-shadow: 2px 2px 2px rgba(0,0,0,.2)
    cursor: pointer
    >i
      font-size: 21px
      color: #fff
    &:hover
      background-color: #666
      color: #eee
</style>
