<template>
  <div class="singDetail-id">
    <div class="songs" v-if="singData.id">
      <div class="describe">
        <div class="intro">
          <div class="left">
            <img :src="singData.al.picUrl" alt />
          </div>
          <div class="right">
            <div class="label">
              <span>单曲</span>
              <h2>{{ singData.name }}</h2>
            </div>
            <div class="singName">
              歌手：
              <span class="ar-name" v-for="ar in singData.ar" :key="ar.id">
                {{ ar.name }}
                <span
                  class="alias-name"
                  v-for="alias in ar.alias"
                  :key="alias"
                >{{ alias }}</span>
              </span>
            </div>
            <div class="album">
              所属专辑：
              <span>{{ singData.al.name }}</span>
            </div>
            <div class="btn">
              <el-button size="mini" @click="addSingerList(singData)">播放</el-button>
              <el-button size="mini" @click="addCollection(singData)">收藏</el-button>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="comment-title">
            <i class="el-icon-edit"></i>
            共
            <span>{{total}}</span>评论数
          </div>
          <div class="comment-content" v-for="hot in hotSingComment" :key="hot.commentId">
            <div class="left">
              <img :src="hot.user.avatarUrl" alt />
            </div>
            <div class="right">
              <div class="label">
                <span>{{hot.user.nickname}}</span>
                <el-tag size="mini" v-for="experts in hot.user.experts" :key="experts">{{experts}}</el-tag>
              </div>
              <div class="body">
                <div class="body-text">{{ hot.content }}</div>
                <div class="num">
                  <i class="el-icon-thumb"></i>
                  ({{hot.likedCount}})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="singword">
        <p v-for="text in singWord" :key="text.time">{{ text.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { musicApi, adminUrl } from "@/views/admin/url.js";
export default {
  name: "singDetail_id",
  data() {
    return {
      singData: {},
      singWord: [],
      hotSingComment: [],
      total: 0
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getSingDetailData(id);
  },
  methods: {
    addCollection(data) {
      if (this.usertext) {
        // 添加歌曲到用户收藏，需要登录
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
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }
    },
    addSingerList(data) {
      // 播放当前歌曲
      let id = data.id;
      let url = "song/url";
      this.addSingData(data);
      this.$axios
        .get(`${musicApi}/${url}`, {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.addSingList(res.data.data);
          }
        })
        .catch(err => {
          console.log("程序错误:" + err);
        });
    },
    getSingDetailData(id) {
      this.$axios
        .get(`${musicApi}/song/detail`, {
          params: {
            ids: id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.singData = res.data.songs[0];
            this._getSingWord(this.singData.id);
            this._getsingComment(this.singData.id);
          }
        })
        .catch(err => {
          console.log("错误提示：" + err);
        });
    },
    _getsingComment(id) {
      this.$axios
        .get(`${musicApi}/comment/music`, {
          params: {
            id,
            limit: 10
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.total = res.data.total;
            this.hotSingComment = res.data.hotComments;
          }
        });
    },
    _getSingWord(id) {
      this.$axios
        .get(`${musicApi}/lyric`, {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.singWord = this._initMusicWord(res.data.lrc.lyric);
          }
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
    ...mapMutations("music", [
      "addSingList",
      "addSingData",
      "setNewUserListData"
    ])
  },
  computed: {
    ...mapState("admin", ["usertext"])
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.singDetail-id
  width: 1280px
  margin: 40px auto
  .songs
    width: 100%
    @include flex(flex-start,flex-start)
    .describe
      width: 100%
      flex: 0 0 60%
      padding-right: 40px
      .intro
        @include flex(space-between,flex-start)
        .left
          flex: 0 0 200px
          height: 200px
          border-radius: 20px
          border: 5px solid #fff
          overflow: hidden
          box-shadow: 2px 2px 10px rgba(0,0,0,.3)
          >img
            width: 100%
            height: 100%
        .right
          flex: 1
          padding-left: 40px
          .label
            width: 100%
            height: 40px
            @include flex(flex-start,center)
            span
              padding: 3px 5px
              border: 1px solid #eb2001
              color: #000
              font-size: 18px
            h2
              margin-left: 10px
              color: #000
          .singName  
            height: 50px
            line-height: 50px
            width: 100%
            .ar-name
              color: #0487dc
              margin-right: 10px
            .ar-alias
              color: #999
          .album
            width: 100%
            >span
              color: #0487dc
          .btn
            width: 100%
            height: 60px
            line-height: 60px
      .comment
        width: 100%
        margin-top: 40px
        .comment-title
          width: 100%
          height: 40px
          line-height: 40px
          border-bottom: 3px solid #eb2001
          padding: 0 10px
          font-size: 21px
          >i
            color: #000
            margin-right: 10px
          >span
            color: #eb2001
        .comment-content
          margin-top: 20px
          width: 100%
          padding-bottom: 10px
          border-bottom: 1px solid rgba(0,0,0,0.05)
          @include flex(flex-start,flex-start)
          .left
            flex: 0 0 60px
            border-radius: 10px
            overflow: hidden
            height: 60px
            >img
              width: 100%
              height: 100%
          .right
            flex: 1
            padding: 0 10px
            .label
              line-height: 20px
              height: 20px
              overflow: hidden
              >span
                color: #000
              .el-tag
                margin-left: 10px
                color: #0487dc
            .body
              width: 100%
              line-height: 20px
              @include flex(space-between,flex-start)
              .body-text
                flex: 1
              .num
                flex: 0 0 13%
                margin-left: 20px
                background-color: #e0e0e0
                text-align: center
                height: 100%
    .singword
      flex: 1
      width: 100%
      background-color: #dcdcdc
      >p
        text-align: center
        line-height: 30px
</style>