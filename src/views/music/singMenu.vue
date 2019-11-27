<template>
  <div class="sing-menu-wrapper">
    <div class="title">
      <div class="order">
        <h3 :class="order === 'hot' ? 'active' : ''" @click="singOrderHot()">
          推荐歌单
        </h3>
        <h3 :class="order === 'new' ? 'active' : ''" @click="singOrderNew()">
          最新歌单
        </h3>
      </div>
      <div class="page-turning">
        <el-button
          size="mini"
          :disabled="menuPagePre"
          @click="changeSingOffsetPre()"
        >
          <i class="el-icon-caret-left"></i
        ></el-button>
        <el-button
          size="mini"
          :disabled="menuPageNext"
          @click="changeSingOffsetNext()"
        >
          <i class="el-icon-caret-right"></i
        ></el-button>
      </div>
    </div>
    <div class="content">
      <div class="hot">
        <ul>
          <li v-for="data in singListData" :key="data.id">
            <div class="image" @click="gotoSingMenu(data)">
              <img :src="data.coverImgUrl" alt />
              <div class="count">
                <span class="track-count">{{ data.trackCount }}</span>
                <span class="play-count">
                  <i class="el-icon-headset"></i>
                  {{ data.playCount | initPlayCount }}
                </span>
              </div>
              <div class="subscribers" v-if="data.subscribers.length">
                <div class="sub">
                  <span v-for="sub in data.subscribers" :key="sub.userId">{{
                    sub.nickname
                  }}</span>
                </div>
                <div class="signature">
                  <p v-for="sub in data.subscribers" :key="sub.userId">
                    {{ sub.signature }}
                  </p>
                </div>
              </div>
            </div>
            <div class="text">
              <div class="tags">
                <span v-for="tag in data.tags" :key="tag">{{ tag }}</span>
              </div>
              <span>{{ data.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { musicApi } from "@/views/admin/url.js";
export default {
  name: "SingMenu",
  mounted() {
    this.order = "hot";
  },
  filters: {
    initPlayCount(num) {
      return Math.round(num / 10000) + "万";
    }
  },
  data() {
    return {
      singListData: [],
      order: "",
      more: true,
      offset: 0,
      limit: 10,
      menuPageNext: false,
      menuPagePre: true
    };
  },
  watch: {
    order() {
      this.getSingMenuData();
    },
    more() {
      if (this.more) {
        this.menuPageNext = false;
      } else {
        this.menuPageNext = true;
      }
    },
    offset() {
      this.offset === 0
        ? (this.menuPagePre = true)
        : (this.menuPagePre = false);
      this.getSingMenuData(true);
    }
  },
  methods: {
    changeSingOffsetPre() {
      this.offset = this.offset - 1;
    },
    changeSingOffsetNext() {
      this.offset = this.offset + 1;
    },
    gotoSingMenu(data) {
      // 编程式路由跳转到singMenu_id页面
      // sessionStorage.setItem('singMenuParams',JSON.stringify(data))
      this.$router.push("singmenu/" + data.id);
    },
    singOrderHot() {
      //改变歌单的order值
      this.order = "hot";
    },
    singOrderNew() {
      this.order = "new";
    },
    getSingMenuData(flog) {
      if (!flog) {
        this.offset = 0;
      }
      this.$axios
        .get(`${musicApi}/top/playlist`, {
          params: {
            limit: this.limit,
            offset: this.offset * this.limit,
            order: this.order
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.more = res.data.more;
            this.singListData = res.data.playlists;
          }
        })
        .catch(err => {
          console.log("错误提示：" + err);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/default.sass"
.sing-menu-wrapper
  width: 100%
  margin: 10px 0 
  .title
    width: 100%
    height: 50px
    background-color: #eee
    line-height: 50px
    @include flex(flex-start,center)
    .order
      padding: 0 10px
      flex: 1
      height: 100%
      @include flex(flex-start,center)
      >h3
        cursor: pointer
        flex: 0 0 100px
        height: 100%
        &:after
          content: "|"
          margin-left: 15px
        &:last-child
          &:after
            content: ""
      .active
        color: #eb2001        
      .page-turning
        width: 100px
        height: 30px
        @include flex(space-between,center)
  .content
    width: 100%
    margin-top: 10px
    .hot
      flex: 0 0 100%
      >ul
        width: 100%
        @include flex(space-between,flex-start)
        @include align(flex-start)
        >li
          flex: 0 0 19%
          overflow: hidden
          margin-bottom: 30px        
          .image
            width: 100%
            height: 250px
            position: relative
            cursor: pointer
            overflow: hidden
            @include flex(center,center)
            &:hover            
              .subscribers
                transition: bottom .5s
                bottom: 0
            >img
              width: 100%   
              min-height: 200px   
            .subscribers
              transition: bottom .5s
              width: 100%
              height: 44px
              overflow: hidden
              position: absolute
              bottom: -44px
              right: 0
              background-color: rgba(0,0,0,.3)  
              padding: 2px
              .sub
                width: 100%
                height: 20px
                color: #fff
                @include align(center)
                >span
                  text-align: right
                  height: 20px
                  &:after
                    content: "|"
                  &:last-child
                    &:after
                      content: ""
              .signature
                width: 100%
                height: 20px
                color: #e0e0e0
                >p       
                  width: 100%
                  height: 20px
                  overflow: hidden
                  text-overflow: ellipsis
                  white-space: nowrap
            .count
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 30px
              background-color: rgba(255,255,255,0.2)
              padding: 0 10px
              @include flex(space-between,center)
              >span
                color: #000
              .track-count
                background-color: #eb2001
                border-radius: 10px
                padding: 2px 5px
                color: #fff
                @include flex(center,center)
          .text
            width: 100%
            height: 60px
            @include align(center)
            .tags
              width: 100%
              height: 25px
              @include flex(flex-start,center)
              >span
                color: #333
                &:after
                  content: "|"
                  padding: 0 5px
                &:last-child
                  &:after
                    content: ""
            >span
              width: 100%
              height: 35px
              line-height: 17.5px
              overflow: hidden
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
</style>