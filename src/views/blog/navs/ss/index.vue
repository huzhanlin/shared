<template>
  <div class="ss">
    <ul class="item">
      <li v-for="data in ssData" :key="data.id" class="list">
        <div class="title">
          <i v-if="data.hot" class="el-icon-star-on"></i>
          <span>{{data.label}}</span>
        </div>
        <div class="body">
          <span>{{data.body}}</span>
        </div>
        <div class="desc">
          <img :src="data.moodIconNum | icon" alt :title="data.mood" />
          <span>{{data.date | setDate}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ss",
  mounted() {
    this.getSsData();
  },
  methods: {
    getSsData() {
      this.$store.dispatch("admin/getSsData");
    }
  },
  computed: {
    ssData() {
      let data = this.$store.state.admin.ssData;
      if (data.length) {
        return data;
      }
    }
  },
  filters: {
    icon(num) {
      return require(`@/assets/${num}.png`);
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.ss
  width: 100%
  background-color: #fff
  .item
    width: 100%
    .list
      padding: 10px 20px
      width: 100%
      border-bottom: 1px solid #f6f6f6
      .title
        width: 100%
        height: 40px
        line-height: 40px
        @include flex(flex-start,center)
        >i
          color: #f44444
          font-size: 21px
          margin-right: 10px
        >span
          font-size: 19px
          color: #3d3d3d
          font-weight: 700
      .body
        width: 100%
        color: #8a8a8a
        line-height: 35px
      .desc
        width: 100%
        height: 50px
        line-height: 40px
        @include flex(space-between,center)
        >img
          width: 26px
          height: 26px
</style>