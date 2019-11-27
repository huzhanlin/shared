<template>
  <div class="music-musicWord">
    <ul class="item" :style="{marginLeft: -(activeNumber * 30 ) + '%'}">
      <li
        class="list"
        :class="[index === activeNumber? 'active': '' ]"
        v-for="(data,index) in musicWord"
        :key="data.time"
      >{{data.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "music-musicWord",
  props: {
    musicWord: {
      type: Array,
      default() {
        return [];
      }
    },
    activeNumber: {
      type: Number,
      default() {
        return 0;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/default.sass"
.music-musicWord
  width: 100%
  height: 40px
  position: fixed
  left: 0
  bottom: 50px
  line-height: 40px
  .item
    width: 100%
    height: 100%
    transition: all .3s
    @include flex(flex-start,center)
    .list 
      flex: 0 0 30%
      width: 30%
      height: 100%
      text-align: center
      background-color: rgba(0,0,0,.02)
      font-size: 24px
      font-weight: 700
      text-shadow: 2px 2px 2px rgba(0,0,0,.3)
      transition: all .3s
      white-space: nowrap
    .active
      color: red
      background-color: rgba(0,0,0,.1)
</style>