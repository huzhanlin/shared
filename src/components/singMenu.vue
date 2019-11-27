<template>
  <div class="sing-menu">
    <div class="content">
      <div class="hot">
        <ul v-if="singListData.playlists">
          <li v-for="data in singListData.playlists" :key="data.id">
            <div class="image" @click="gotoSingMenu(data)">
              <img :src="data.coverImgUrl" alt />
              <div class="count">
                <span class="track-count">{{ data.trackCount }}</span>
                <span class="play-count">
                  <i class="el-icon-headset"></i>
                  {{ data.playCount | initPlayCount }}
                </span>
              </div>
              <div class="subscribers" v-if="data.description">{{data.description}}</div>
              <!-- <div class="subscribers" v-if="data.subscribers.length">
                <div class="sub">
                  <span v-for="sub in data.subscribers" :key="sub.userId">
                    {{
                    sub.nickname
                    }}
                  </span>
                </div>
                <div class="signature">
                  <p v-for="sub in data.subscribers" :key="sub.userId">{{ sub.signature }}</p>
                </div>
              </div>-->
            </div>
            <div class="text">
              <!-- <div class="tags">
              <span v-for="tag in data.tags" :key="tag">{{ tag }}</span>
              </div>-->
              <span>{{ data.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singListData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    initPlayCount(num) {
      return Math.round(num / 10000) + "万";
    }
  },
  methods: {
    gotoSingMenu(data) {
      // 编程式路由跳转到singMenu_id页面
      // sessionStorage.setItem('singMenuParams',JSON.stringify(data))
      this.$router.push("singmenu/" + data.id);
    }
  }
};
</script>

<style scoped lang="sass">
@import "@/assets/default.sass"
.sing-menu
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
              line-height: 22px
              overflow: hidden
              position: absolute
              bottom: -44px
              right: 0
              background-color: rgba(0,0,0,.3)  
              padding: 2px
              color: #fff
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
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