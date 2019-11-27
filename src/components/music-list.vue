<template>
  <div class="music-list" v-if="singListFlog">
    <div class="item">
      <div class="header">
        <div class="list" :class="[itemIndex === 0 ? 'active':'']" @click="playList">
          <span>播放列表</span>
        </div>
        <div class="hostory" :class="[itemIndex === 1 ? 'active':'']" @click="history">
          <span>历史记录</span>
        </div>
        <div
          class="user-music-list"
          :class="[itemIndex === 2 ? 'active':'']"
          @click="userMusicList"
        >
          <span>用户收藏</span>
        </div>
        <div class="close-list" @click="setSingListFlog">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content" :style="{marginLeft: - (itemIndex * 100) + '%'}">
        <div class="list-wrapper">
          <div class="title">
            <div class="title-left">
              总
              <span>{{singData.length}}</span>首
            </div>
            <div class="title-right">
              <span @click="addAllListData">
                <i class="el-icon-document-add"></i> 收藏全部
              </span>
              <span @click="clearPlayListData">
                <i class="el-icon-delete"></i> 清空
              </span>
            </div>
          </div>
          <div class="body">
            <ul class="body-item">
              <li
                class="body-list"
                v-for="data in singData"
                :class="beforeClass(data)"
                :key="data.id"
                @click="addSingerList(data)"
              >
                <div class="name">{{data.name}}</div>
                <div class="artist">
                  <span v-for="ar in ar(data)" :key="ar.id">{{ar.name}}</span>
                </div>
                <div class="timer" v-if="data.dt">{{data.dt | toStringMusicTime}}</div>
                <div class="timer" v-else>{{data.duration | toStringMusicTime}}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="hostory-wrapper">
          <div class="title">
            <div class="title-left">
              总
              <span>{{historyListData.length}}</span>首
            </div>
            <div class="title-right">
              <span @click="addAllHistoryData">
                <i class="el-icon-document-add"></i> 收藏全部
              </span>
              <span @click="clearHistoryListData">
                <i class="el-icon-delete"></i> 清空
              </span>
            </div>
          </div>
          <div class="body">
            <ul class="body-item">
              <li
                class="body-list"
                v-for="data in historyListData"
                :class="beforeClass(data)"
                :key="data.id"
                @click="addSingerList(data)"
              >
                <div class="name">{{data.name}}</div>
                <div class="artist">
                  <span v-for="ar in ar(data)" :key="ar.id">{{ar.name}}</span>
                </div>
                <div class="timer" v-if="data.dt">{{data.dt | toStringMusicTime}}</div>
                <div class="timer" v-else>{{data.duration | toStringMusicTime}}</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="user-list-data">
          <div class="title">
            <div class="title-left">
              总
              <span>{{newUserListData.length}}</span>首
            </div>
            <div class="title-right">
              <span @click="allAddSingerList">
                <i class="el-icon-document-add"></i> 添加列表
              </span>
              <span @click="clearUserMusicData">
                <i class="el-icon-delete"></i> 清空
              </span>
            </div>
          </div>
          <div class="body">
            <div class="no-login" v-if="!usertext">你还未登录，要获得你的用户歌曲列表，请前往登录！</div>
            <ul v-else class="body-item">
              <li
                class="body-list"
                v-for="data in newUserListData"
                :class="beforeClass(data.data)"
                :key="data.data.id"
                @click="addSingerList(data.data)"
              >
                <div class="name">{{data.data.name}}</div>
                <div class="artist">
                  <span v-for="ar in ar(data.data)" :key="ar.id">{{ar.name}}</span>
                </div>
                <div class="timer" v-if="data.data.dt">{{data.data.dt | toStringMusicTime}}</div>
                <div class="timer" v-else>{{data.data.duration | toStringMusicTime}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { musicApi, adminUrl } from "@/views/admin/url";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "music-list",
  props: {
    singListFlog: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      itemIndex: 1
    };
  },
  watch: {
    usertext() {
      if (this.usertext) {
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
            console.log("错误信息：" + err);
          });
      }
    }
  },
  computed: {
    ...mapState("music", [
      "singData",
      "childLength",
      "singList",
      "newUserListData"
    ]),
    ...mapGetters("music", ["historyListData"]),
    ...mapState("admin", ["usertext"])
  },
  methods: {
    ar(data) {
      return data.ar || data.artists;
    },
    clearUserMusicData() {
      // 清空用户数据库的音乐数据
      if (!this.usertext) {
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }
      this.$confirm("此操作将永久删除数据库存储的音乐列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let user_id = this.usertext;
          this.$axios
            .get(`${adminUrl}/personalCenter/clearmusic`, {
              params: {
                user_id
              }
            })
            .then(res => {
              if (res.data.ok) {
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
                    console.log("错误信息：" + err);
                  });
              } else {
                console.log(res.data);
              }
            })
            .catch(err => {
              alert("err:" + err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addAllHistoryData() {
      // 把历史记录列表的所有数据添加到用户数据库
      if (this.usertext) {
        this._addDataMethods(this.historyListData);
      } else {
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }
    },
    addAllListData() {
      // 把播放列表的所有数据添加到用户数据库
      if (this.usertext) {
        this._addDataMethods(this.singData);
      } else {
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }
    },
    _addDataMethods(singData) {
      if (singData.length) {
        let data = singData.map(val => {
          return {
            user_id: this.usertext,
            data: val
          };
        });
        let form = new FormData();
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
        this.$message("当前列表中无歌曲数据，添加数据后再收藏！");
        return;
      }
    },
    clearPlayListData() {
      // 清除播放列表和播放器中的所有数据

      this.$confirm("此操作将清空播放列表的所有数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("_clearMusicWord");
          this.clearSingData();
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空操作"
          });
        });
    },
    clearHistoryListData() {
      this.$confirm("此操作将清空历史记录的所有数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("_clearMusicWord");
          this.clearSessionMusicData();
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空操作"
          });
        });
    },
    beforeClass(data) {
      if (
        this.singList.length &&
        this.singList[this.childLength].length !== undefined
      ) {
        return this.singList[this.childLength][0].id === data.id
          ? "active"
          : "";
      } else {
        return "";
      }
    },
    history() {
      //切换到历史记录
      this.itemIndex = 1;
    },
    playList() {
      // 切换到播放列表
      this.itemIndex = 0;
    },
    userMusicList() {
      // 切换到用户收藏列表
      this.itemIndex = 2;
    },
    allAddSingerList() {
      if (!this.usertext) {
        this.$message("你还没有登录，请登录再进行操作！");
        return;
      }
      this.newUserListData.forEach(val => {
        this.addSingerList(val.data);
      });
    },
    addSingerList(data) {
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
    setSingListFlog() {
      //调用父元素的方法关闭数据列表
      this.$emit("_closeSingList", false);
    },
    ...mapMutations("music", [
      "clearSessionMusicData",
      "addSingList",
      "addSingData",
      "clearSingData",
      "setNewUserListData"
    ])
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.music-list
  width: 580px
  height: 650px
  position: fixed
  bottom: 50px
  right: 0
  .item
    width: 100%
    height: 100%
    margin-left: auto
    background-color: #f0f0f0
    overflow: hidden
    box-shadow: -2px -2px 4px rgba(0,0,0,.3)
    .header
      width: 100%
      height: 50px
      background-color: #e0e0e0
      border-bottom: 1px solid #ccc
      position: relative
      @include flex(center,center)
      .close-list
        position: absolute
        right: 15px
        top: calc(50% - 8px)
        cursor: pointer
        >i
          font-size: 16px
      .list
        border-radius: 4px 0 0 4px
      .list, .hostory
        border-right: 1px solid #dcdcdc
      .list, .hostory, .user-music-list
        width: 100px
        height: 30px
        background-color: #fff
        cursor: pointer
        @include flex(center,center)
        >span
          color: #888
      .user-music-list
        border-radius: 0 4px 4px 0
      .active
        background-color: #666
        >span
          color: #fff
    .content
      width: 100%
      height: 600px
      @include flex(flex-start,flex-start)
      .list-wrapper, .hostory-wrapper, .user-list-data
        flex: 0 0 100%
        overflow: hidden
        .title
          width: 100%
          height: 30px
          padding: 0 20px
          border-bottom: 1px solid #dcdcdc
          background-color: #e9e9e9
          @include flex(flex-start,center)
          .title-left
            flex: 0 0 20%
            >span
              color: #eb2001
          .title-right
            flex: 1
            text-align: right
            >span
              cursor: pointer
              margin-left: 10px
        .body          
          width: 100%
          height: 570px
          overflow: auto
          .body-item
            width: 100%
            .body-list
              cursor: pointer
              padding: 0 20px
              width: 100%
              height: 30px
              overflow: hidden
              border-bottom: 1px solid #dcdcdc
              @include flex(flex-start,center)
              &:nth-of-type(even)
                background-color: #eaeaea
              .name
                flex: 0 0 60%
                padding-right: 10px
                width: 60%
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
              .artist
                flex: 0 0 30%
                padding-right: 10px
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                >span                  
                  &:after
                    content: "/"
                  &:last-child
                    &:after 
                      content: ""
              .timer
                flex: 1
              &:hover:not(active)
                background-color: #222
                color: #fff
            .active
              background-color: #0487dc!important
              color: #fff!important
      .hostory-wrapper
        flex: 0 0 100%
      .user-list-data
        flex: 0 0 100%
        .no-login
          width: 100%
          height: 40px
          line-height: 40px
          text-align: center
</style> 
