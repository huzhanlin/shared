<template>
  <div class="rz">
    <ul class="item">
      <li v-for="data in rzData" :key="data.id" class="list">
        <div class="photo" @click="openDrawer(data)">
          <img :src="data.url | setImageUrl" alt />
        </div>
        <div class="desc-wrapper">
          <div class="title">
            <i v-if="data.hot" class="el-icon-star-on"></i>
            <span>{{data.label}}</span>
          </div>
          <div class="desc">
            <span>{{data.date | setDate}}</span>
            <el-button size="mini" @click="openDrawer(data)">点击查看 >></el-button>
          </div>
        </div>
      </li>
    </ul>
    <el-drawer :visible.sync="drawer" :direction="direction" size="70%">
      <div style="height: 100vh;overflow: auto;padding: 0 20px">
        <h1 style="text-align: center;height: 5vh;font-size: 30px;color: #555">{{drawerData.label}}</h1>
        <div style="height: 70vh;padding: 20px;text-align: center" >
          <img :src="drawerData.url | setImageUrl" alt style="height: 100%" />
        </div>
        <div style="height: 25vh">
          <div style="padding: 20px; text-align: center">
            <span style="display: block;line-height: 25px;">{{drawerData.body}}</span>
          </div>
          <div style="padding: 20px;text-align: center">
            <span>{{drawerData.date | setDate}}</span>
          </div>
        </div>

      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Rz",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawerData: {}
    };
  },
  mounted() {
    this.getRzData();
  },
  methods: {
    getRzData() {
      this.$store.dispatch("admin/getRzData");
    },
    openDrawer(data) {
      this.drawerData = data;
      this.drawer = true;
    }
  },
  computed: {
    rzData() {
      let data = this.$store.state.admin.rzData;
      return data;
    }
  }
};
</script>
<style lang="sass" scoped>
@import '@/assets/default.sass'
.rz
  width: 100%
  background-color: #fff
  .item
    width: 100%
    .list
      width: 100%
      padding: 20px
      border-bottom: 1px solid #f6f6f6
      @include flex(space-between,flex-start)
      .photo
        flex: 0 0 20%
        height: 80px
        overflow: hidden
        @include flex(center,center)
        img
          width: 100%
      .desc-wrapper
        flex: 0 0 78%        
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
            font-size: 21px
            color: #3d3d3d
            font-weight: 700
        .desc
          width: 100%
          height: 40px
          line-height: 40px
          @include flex(space-between,center)
          >img
            width: 26px
            height: 26px
</style>