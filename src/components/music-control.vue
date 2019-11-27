<template>
  <div class="music-control-wrapper">
    <div class="control">
      <div class="audio" v-if="playIngData.length">
        <audio
          controls
          ref="audio"
          @ended="audioEnd"
          :src="playIngData[0].url"
          @timeupdate="setPlayingTime"
          @error="audioError"
          @canplay="audioReady"
        ></audio>
      </div>
      <div class="play">
        <button class="pre" @click="pre" :disabled="disabled">
          <i></i>
          <i></i>
        </button>
        <span class="played" @click="togglePlayed">
          <i class="playing" v-if="palyed"></i>
          <i class="pause" v-else>
            <span></span>
            <span></span>
          </i>
        </span>
        <button class="next" @click="next" :disabled="disabled">
          <i></i>
          <i></i>
        </button>
      </div>
      <div class="bar">
        <div class="show-img">
          <img v-if="playingImg" :src="playingImg" alt />
        </div>
        <span class="nowtime">{{currentTime.playingTime | toStringMusicTime}}</span>
        <span class="scrollbar" @click="changePlayingTime">
          <div class="btn" :style="{left:upbarWidth + '%'}">
            <span></span>
          </div>
          <div class="upbar" :style="{width:upbarWidth + '%'}"></div>
          <div class="downbar"></div>
        </span>
        <span class="alltime">{{currentTime.allTime | toStringMusicTime}}</span>
      </div>
      <div class="action">
        <button class="play-type" @click="toggleAction" :disabled="disabled">
          <i class="el-icon-s-unfold" title="顺序播放" v-if="type === 0"></i>
          <i class="el-icon-paperclip" title="随机播放" v-else-if="type === 1"></i>
          <i class="el-icon-sort" title="单曲循环" v-else></i>
        </button>
        <span class="sing-list" title="歌曲列表" @click="toggleSingList">
          <i class="el-icon-document"></i>
          <span>{{historyListData.length}}</span>
        </span>
        <span @click="addCollection">
          <i class="el-icon-circle-plus-outline" title="加入收藏"></i>
        </span>
        <span
          class="gechi"
          title="展开歌词"
          @click="changeMusicWordFlog"
          :class="musicWordFlog? 'clolrgechi' : ''"
        >词</span>
        <span class="music-volume" title="音量调节" @click="toggleMusicVolume">
          <i class="el-icon-close-notification" v-if="!volumeFlog"></i>
          <i class="el-icon-bell" v-else></i>
          <div class="volume-bar" ref="volumeBar" @click.stop="changeVolume">
            <div class="btn" :style="{bottom: volume * 100 + 'px'}">
              <span></span>
            </div>
            <div class="upbar" :style="{height: volume * 100 + 'px'}"></div>
            <div class="downbar"></div>
          </div>
        </span>
      </div>
    </div>
    <singList
      :newUserListData="newUserListData"
      :singListFlog="singListFlog"
      @_closeSingList="_closeSingList"
      @_clearMusicWord="_clearMusicWord"
    ></singList>
    <VmusicWord v-if="musicWordFlog" :musicWord="musicWord" :activeNumber="activeNumber" />
  </div>
</template>

<script>
import { musicApi, adminUrl } from "@/views/admin/url.js";
import singList from "./music-list";
import VmusicWord from "./music-musicWord";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "music-control-wrapper",
  components: {
    singList,
    VmusicWord
  },
  data() {
    return {
      volume: 0.5,
      volumeFlog: true,
      currentTime: {
        playingTime: 0,
        allTime: 0
      },
      upbarWidth: 0,
      disabled: false,
      singListFlog: false,
      displayTimer: 0,
      musicWord: [], // 歌词数组
      activeNumber: 0, // 激活的歌词文本数组值,
      musicWordFlog: false, // 歌词的显示和隐藏
      typeFlog: true, // 控制音乐播放器的歌曲超过2首则自动改为顺序播放，只执行一次
      audioReadyFlog: true
    };
  },
  watch: {
    musicWordFlog() {
      this.$emit("_changeMusicWord", this.musicWordFlog);
    },
    playIngData() {
      if (this.playIngData.length) {
        //播放器的url变化时启用的函数
        this.palyedToggle(false);
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
        let singData = this.singData;
        for (let i = 0; i < singData.length; i++) {
          if (singData[i].id === this.playIngData[0].id) {
            if (singData[i].al) {
              this.setPlayingImg(singData[i].al.picUrl);
            } else {
              this.setPlayingImg("");
            }
          }
        }

        this.activeNumber = 0;
        this.getSingWord(this.playIngData[0].id);
      }
    },
    volume() {
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volume;
        if (this.volume > 0) {
          this.volumeFlog = true;
        } else {
          this.volumeFlog = false;
        }
      }
    },
    palyed() {
      if (!this.palyed) {
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.audio.pause();
        });
      }
    },
    singList() {
      if (this.singList.length <= 1) {
        this.setType(2);
        this.typeFlog = true;
        this.disabled = true;
      } else {
        if (this.typeFlog) {
          this.setType(0);
          this.typeFlog = false;
        }
        this.disabled = false;
      }
    }
  },
  methods: {
    audioReady() {
      if (this.audioReadyFlog) {
        this.volume = 0.6;
        this.audioReadyFlog = false;
      }
    },
    _clearMusicWord() {
      this.musicWord = [];
      this.musicWordFlog = false;
    },
    addCollection() {
      // 添加歌曲到用户收藏，需要登录
      if (!this.usertext) {
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }

      if (this.playIngData.length) {
        let thisId = this.playIngData[0].id;
        let data;
        let singData = this.singData;
        if (singData.length) {
          for (let i = 0; i < singData.length; i++) {
            if (singData[i].id === thisId) {
              data = singData[i];
            }
          }
        }
        let form = new FormData();
        form.append("user_id", this.usertext);
        form.append("data", JSON.stringify(data));

        this.$axios
          .post(`${adminUrl}/personalCenter/setmusics`, form)
          .then(res => {
            if (res.data.ok) {
              this.$message({
                message: res.data.title,
                type: "success"
              });
              let user_id = this.usertext;
              this.$axios
                .get(`${adminUrl}/personalCenter/getusermusiclist`, {
                  params: {
                    user_id
                  }
                })
                .then(res => {
                  if (res.data.ok) {
                    this.setNewUserListData(res.data.data);
                  }
                })
                .catch(err => {
                  this.$message.error("错误信息：" + err);
                });
            }
          })
          .catch(err => {
            this.$message.error("错误信息：" + err);
          });
      } else {
        this.$message("当前播放器中没有歌曲，请先播放歌曲！");
        return;
      }
    },
    changeMusicWordFlog() {
      this.musicWordFlog = !this.musicWordFlog;
    },
    getSingWord(id) {
      //获取歌词
      this.$axios
        .get(`${musicApi}/lyric`, {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            let musicWord = this._initMusicWord(res.data.lrc.lyric);
            let newMusicWord = [];
            for (let i = 0; i < musicWord.length; i++) {
              if (musicWord[i].text || musicWord.time) {
                newMusicWord.push(musicWord[i]);
              }
            }
            this.musicWord = newMusicWord;
          }
        })
        .catch(err => {
          console.log("数据请求出错" + err);
        });
    },
    _initMusicWord(lyric) {
      let newLyric = lyric.split(/\n/);
      newLyric = newLyric.map(val => {
        let newVal = val.split("]");
        newVal[0] = newVal[0].slice(1, newVal[0].length);
        return {
          time: newVal[0],
          text: newVal[1] === "" ? "---------" : newVal[1]
        };
      });
      return newLyric;
    },
    changeVolume(e) {
      let offsetY = e.offsetY;
      if (offsetY < 10 || offsetY > 110) {
        return;
      } else {
        this.volume = Math.round((100 - (e.offsetY - 10)) / 10) / 10;
      }
    },
    _addChangeVolume(number) {
      if (this.volume < 1) {
        this.volume = this.volume + number;
      }
      if (this.volume > 1) {
        this.volume = 1;
      }

      clearTimeout(this.displayTimer);
      this.$refs.volumeBar.style.display = "flex";
      this.displayTimer = setTimeout(() => {
        this.$refs.volumeBar.style.display = "none";
      }, 1000);
    },
    _backChangeVolume(number) {
      if (this.volume > 0) {
        this.volume = this.volume - number;
      }
      if (this.volume < 0) {
        this.volume = 0;
        this.volumeFlog = false;
      }

      clearTimeout(this.displayTimer);
      this.$refs.volumeBar.style.display = "flex";
      this.displayTimer = setTimeout(() => {
        this.$refs.volumeBar.style.display = "none";
      }, 1000);
    },
    toggleMusicVolume() {
      if (this.$refs.audio) {
        if (this.volumeFlog) {
          this.volumeFlog = false;
          this.$refs.audio.volume = 0;
        } else {
          this.volumeFlog = true;
          this.$refs.audio.volume = this.volume;
        }
      } else {
        this.volumeFlog = !this.volumeFlog;
      }
    },
    toggleSingList() {
      // 切换歌曲列表的打开和关闭
      this.singListFlog = !this.singListFlog;
    },
    _closeSingList(Bool) {
      // 歌曲列表的关闭
      this.singListFlog = Bool;
    },
    audioEnd() {
      // 音乐播放器结束的时候触发的事件
      this.palyedToggle(true);
      if (this.type === 0) {
        this.next();
      } else if (this.type === 1) {
        let length = this.singList.length;
        let flog = true;
        while (flog) {
          let i = this._getRandomNumber(length);
          if (i !== this.childLength) {
            this.setChildLength(i);
            flog = false;
          }
        }
      } else {
        this.palyedToggle(false);
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      }
    },
    _getRandomNumber(length) {
      return Math.floor(Math.random() * length);
    },
    audioError() {
      // 音乐播放器出错误时触发的事件
      console.log("播放出错");
    },
    changePlayingTime(e) {
      // 点击改变音乐播放时间
      let width = e.target.offsetWidth,
        offsetx = e.offsetX,
        bl = offsetx / width,
        { allTime } = this.currentTime;
      this.$refs.audio.currentTime = (allTime / 1000) * bl;
      this.palyedToggle(false);
    },
    togglePlayed() {
      if (this.playIngData.length) {
        this.palyedToggle(!this.palyed);
      }
    },
    setPlayingTime(e) {
      // 音乐播放过程中触发的函数
      this.currentTime = {
        playingTime: e.target.currentTime * 1000,
        allTime: e.target.duration * 1000
      };
      let bl = this.currentTime.playingTime / this.currentTime.allTime;
      this.upbarWidth = bl * 100;

      this._activeNumberMethods(this.currentTime);
    },
    _activeNumberMethods(currentTime) {
      let { playingTime, allTime } = currentTime;

      for (let i = 0; i < this.musicWord.length; i++) {
        let time = this.musicWord[i].time;
        time = time.split(":");
        time[0] = Number(time[0]) * 1000 * 60;
        time[1] = Number(time[1]) * 1000;
        let lengthTime = time[0] + time[1];
        if (playingTime > lengthTime) {
          this.activeNumber = i;
        }
      }
    },
    toggleAction() {
      let data = this.type + 1;
      if (data === 3) {
        data = 0;
      }
      this.setType(data);
    },
    next() {
      this.nextSings();
    },
    pre() {
      this.preSings();
    },
    ...mapMutations("music", [
      "nextSings",
      "preSings",
      "palyedToggle",
      "setType",
      "addSingData",
      "setChildLength",
      "setPlayingImg",
      "setNewUserListData"
    ])
  },
  computed: {
    ...mapGetters("music", ["playIngData", "historyListData"]),
    ...mapState("music", [
      "palyed",
      "type",
      "singList",
      "childLength",
      "singData",
      "playingImg",
      "newUserListData"
    ]),
    ...mapState("admin", ["usertext"])
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/default.sass"
.music-control-wrapper
  width: 100%
  position: relative
  .control
    width: 100%
    height: 50px
    padding: 0 40px
    background-color: #f0f0f0
    box-shadow: 0px 0px 5px rgba(0,0,0,.3)
    @include flex(space-between,center)
    .audio
      width: 0
      height: 0
      overflow: hidden
    .play
      flex: 0 0 15%
      @include flex(flex-start,center)
      .pre
        cursor: pointer
        width: 32px
        height: 32px
        border-radius: 50%
        background-color: #eb2001
        overflow: hidden
        margin-right: 20px
        @include flex(center,center)
        >i:first-child
          width: 2px
          height: 10px
          background-color: #fff
        >i:last-child
          margin-left: -4px
          width: 0
          height: 0
          border: 6px solid
          border-color: transparent  #fff transparent transparent
      .played
        cursor: pointer
        width: 36px
        height: 36px
        border-radius: 50%
        background-color: #eb2001
        overflow: hidden
        margin-right: 20px
        @include flex(center,center)
        .playing
          margin-right: -16px
          width: 0
          height: 0
          border-left: 12px solid
          border-top: 8px solid
          border-right: 12px solid
          border-bottom: 8px solid 
          border-color: transparent  transparent transparent #fff
        .pause
          @include flex(center,center)
          >span
            width: 2px
            height: 16px
            background-color: #fff
            &:first-child
              margin-right: 4px
      .next
        cursor: pointer
        width: 32px
        height: 32px
        border-radius: 50%
        background-color: #eb2001
        overflow: hidden
        @include flex(center,center)
        >i:last-child
          margin-left: -4px
          width: 2px
          height: 10px
          background-color: #fff
        >i:first-child
          width: 0
          height: 0
          border: 6px solid
          border-color: transparent  transparent transparent #fff
    .bar
      flex: 1
      height: 100%
      color: #000
      @include flex(space-between,center)
      .show-img
        width: 40px
        height: 40px
        border-radius: 50%
        overflow: hidden
        margin-right: 20px
        >img
          width: 100%
          height: 100%
      .nowtime
        margin-right: 15px
      .scrollbar
        flex: 1
        position: relative
        height: 20px
        cursor: pointer
        @include flex(flex-start,center)
        .btn
          width: 16px
          height: 16px
          margin-left: -8px
          border-radius: 50%
          position: absolute
          top: calc(50%-5px)
          z-index: 100
          background-color: #fff
          border: 1px solid #dcdcdc
          pointer-events: none
          @include flex(center,center)
          span
            width: 4px 
            height: 4px
            border-radius: 50%
            background-color: #f00
            pointer-events: none
        .upbar
          height: 4px
          background-color: #eb2001
          border-radius: 3px
          position: absolute
          left: 0
          top: calc(50%-3px)
          pointer-events: none
        .downbar
          width: 100%
          height: 4px
          background-color: #dcdcdc
          border-radius: 3px
          pointer-events: none
      .alltime
        margin-left: 15px
    .action
      flex: 0 0 15%
      padding: 0 20px
      @include flex(flex-start,center)
      .play-type                
        .el-icon-sort
          transform: rotate(90deg)
      >span
        font-size: 16px
        margin-left: 20px
        cursor: pointer
      .gechi
        padding: 0 3px
        border: 1px solid #dcdcdc
        font-size: 14px
        @include flex(center,center)
      .clolrgechi
        color: #eb2001
      .music-volume
        z-index: 110
        position: relative
        height: 24px  
        padding-top: 4px      
        .volume-bar
          position: absolute
          left: -2px
          bottom: 24px
          width: 20px
          height: 120px
          background-color: #dcdcdc
          border-radius: 8px
          @include flex(center,center)
          display: none
          .btn
            width: 16px
            height: 16px
            border-radius: 50%
            position: absolute
            z-index: 100
            background-color: #fff
            border: 1px solid #dcdcdc
            pointer-events: none
            @include flex(center,center)
            span
              width: 4px 
              height: 4px
              border-radius: 50%
              background-color: #f00
              pointer-events: none
          .upbar
            width: 4px
            background-color: #eb2001
            border-radius: 3px
            position: absolute
            bottom: 10px
            pointer-events: none
          .downbar
            width: 4px
            height: 100px
            background-color: #fff
            border-radius: 3px
            pointer-events: none
        &:hover
          .volume-bar
            display: flex!important
      .sing-list
        padding: 0 3px
        border: 1px solid #dcdcdc
        border-radius: 5px
        @include flex(flex-start,center)
        >span
          color: #eb2001
          font-size: 14px

</style>