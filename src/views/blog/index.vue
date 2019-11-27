<template>
  <div class="blog">
    <div class="navs">
      <navs />
    </div>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="asides">
      <asides />
    </div>
  </div>
</template>

<script>
import navs from "./navs";
import asides from "./asides";
export default {
  name: "Blog",
  components: {
    navs,
    asides
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.blog
  width: 1280px
  min-height: 95vh
  position: relative
  margin: 0 auto
  padding: 15px 0
  @include flex(space-between,flex-start)
  .navs
    flex: 0 0 8%
    position: sticky
    top: 0
  .main
    flex: 0 0 65%
  .asides
    flex: 0 0 25%
    position: sticky
    top: 0
</style>