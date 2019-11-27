<template>
  <div class="xc">
    <div class="tabs">
      <el-tabs v-model="activeName" v-if="spData">
        <el-tab-pane label="原创视频">
          <ul v-if="spData.ycsp.length" class="item">
            <li @click="openDrawer(data)" class="list" v-for="data in spData.ycsp" :key="data.id">
              <div class="photo-wrapper">
                <video :src="data.url | setVideoUrl"></video>
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="网上转载">
          <ul v-if="spData.wszz.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in spData.wszz" :key="data.id">
              <div class="photo-wrapper">
                <video :src="data.url | setVideoUrl"></video>
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的家">
          <ul v-if="spData.wdj.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in spData.wdj" :key="data.id">
              <div class="photo-wrapper">
                <video :src="data.url | setVideoUrl"></video>
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="私密视频">
          <ul v-if="spData.smsp.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in spData.smsp" :key="data.id">
              <div class="photo-wrapper">
                <video :src="data.url | setVideoUrl"></video>
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>

      <el-drawer :visible.sync="drawer" :direction="direction" size="60%">
        <div style="height: 100vh;overflow: auto;padding: 0 20px">
          <h1
            style="text-align: center;height: 5vh;font-size: 30px;color: #555"
          >{{drawerData.label}}</h1>
          <div style="height: 70vh;padding: 20px;text-align: center;">
            <div
              id="J_prismPlayer"
              class="prism-player"
              ref="aliplayer"
              style="width: 890px;height: 500px;margin: 0 auto"
            ></div>

            <!-- <video :src="drawerData.url | setVideoUrl" controls ref="video" style="height: 100%"></video> -->
          </div>
          <div style="height: 25vh">
            <div style="padding: 20px; text-align: center">
              <span style="display: block;line-height: 25px;">{{drawerData.label}}</span>
            </div>
            <div style="padding: 20px;text-align: center">
              <span>{{drawerData.date | setDate}}</span>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { videoUrl } from "@/views/admin/url.js";
export default {
  name: "Sp",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawerData: {},
      activeName: "0",
      player: {}
    };
  },

  mounted() {
    this.getSpData();
  },
  methods: {
    getAliplayer() {
      if (this.drawerData.url) {
        let url = this.drawerData.url;
        url = `${videoUrl}/${url}`;
        // 初始化播放器
        this.player = new Aliplayer(
          {
            id: "J_prismPlayer", // 容器id
            source: url, // 视频url
            width: "100%", // 播放器宽度
            height: "400px" // 播放器高度
          },
          function(player) {
            console.log("播放器创建了");
          }
        );
      }
    },
    closeVideo() {
      this.player.dispose();
    },
    openDrawer(data) {
      this.drawerData = data;
      this.drawer = true;
    },
    getSpData() {
      this.$store.dispatch("admin/getSpData");
    }
  },
  computed: {
    spData() {
      let data = this.$store.state.admin.spData;
      if (data.length) {
        let newData = {
          ycsp: [],
          wszz: [],
          wdj: [],
          smsp: []
        };
        data.forEach(value => {
          if (value.inits === "私密视频") {
            newData.smsp.push(value);
          } else if (value.inits === "网上转载") {
            newData.wszz.push(value);
          } else if (value.inits === "我的家") {
            newData.wdj.push(value);
          } else {
            newData.ycsp.push(value);
          }
        });
        return newData;
      }
    }
  },
  watch: {
    drawer() {
      if (this.drawer) {
        this.$nextTick(() => {
          this.getAliplayer();
        });
        // setTimeout(this.getAliplayer, 2000);
      } else {
        this.closeVideo();
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.xc
  width: 100%
  .tabs
    width: 100%
    padding: 10px 20px
    background-color: #fff
    .item
      width: 100%
      flex-wrap: wrap
      padding: 20px 0
      @include flex(flex-start,flex-start)
      .list
        flex: 0 0 23%
        margin: 0 1%
        padding: 5px
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        .photo-wrapper
          width: 100%
          height: 120px
          overflow: hidden
          @include flex(center,center)
          >video
            width: 100%
        .photo-desc
          width: 100%
          .label
            width: 100%
            height: 35px
            line-height: 45px
          .time
            line-height: 25px
</style>