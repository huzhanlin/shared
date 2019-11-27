<template>
  <div class="banner-wrapper">
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in bannerData" :key="item.targetId">
        <h3 class="medium" :style="{ backgroundColor: item.titleColor }">
          {{ item.typeTitle }}
        </h3>
        <img :src="item.imageUrl" alt="" @click="gotoDetailPage(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { musicApi } from "@/views/admin/url.js";
export default {
  name: "Banner",
  data() {
    return {
      bannerData: []
    };
  },
  mounted() {
    this.getBannerData();
  },
  methods: {
    gotoDetailPage(item) {
      if (item.targetType === 1) {
        this.$router.push("singDetail/" + item.targetId);
      }
    },
    getBannerData() {
      // 实现获取banner数据
      this.$axios
        .get(`${musicApi}/banner`, {
          params: {
            type: 0
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.bannerData = res.data.banners;
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
.banner-wrapper
  width: 100%
  .el-carousel
    overflow: hidden
    margin: 40px 0
    .el-carousel__item
      >img
        width: 100%
        height: 100%
</style>

<style>
.el-carousel__item h3 {
  color: #fff;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>