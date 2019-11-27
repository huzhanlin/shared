<template>
  <div class="navs">
    <ul class="item">
      <li v-for="data in navData" :key="data.to" class="list">
        <router-link :to="data.to">{{data.label}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navs",
  data() {
    return {
      navData: [
        { label: "说说", to: "/blog/ss" },
        { label: "日志", to: "/blog/rz" },
        { label: "相册", to: "/blog/xc" },
        { label: "视频", to: "/blog/sp" },
        { label: "技术文章", to: "/blog/skill" },
        { label: "个人资料", to: "/blog/grzl" }
      ]
    };
  }
};
</script>

<style lang="sass" scoped> 
@import '@/assets/default.sass'
.navs
  width: 100%
  background-color: #fff
  .item
    width: 100%
    padding: 5px 0
    .list
      height: 38px
      overflow: hidden
      text-overflow: ellopsis
      white-space: nowrap
      padding: 1px 0
      >a
        @include flex(center,center)
        width: 100%
        height: 100%
        display: flex
        color: #707070
        transition: .3s
        &:hover
          background-color: #f44444
          color: #fff
          transition: .3s
      .router-link-active
        background-color: #f44444
        color: #fff
</style>