<template>
  <div class="xc">
    <div class="tabs">
      <el-tabs v-model="activeName" v-if="xcData">
        <el-tab-pane label="个人相册">
          <ul v-if="xcData.grxc.length" class="item">
            <li @click="openDrawer(data)" class="list" v-for="data in xcData.grxc" :key="data.id">
              <div class="photo-wrapper">
                <img :src="data.url | setImageUrl" alt />
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="精彩瞬间">
          <ul v-if="xcData.jcsj.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in xcData.jcsj" :key="data.id">
              <div class="photo-wrapper">
                <img :src="data.url | setImageUrl" alt />
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="人生历程">
          <ul v-if="xcData.rslc.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in xcData.rslc" :key="data.id">
              <div class="photo-wrapper">
                <img :src="data.url | setImageUrl" alt />
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="私密照片">
          <ul v-if="xcData.smzp.length" class="item">
            <li class="list" @click="openDrawer(data)" v-for="data in xcData.smzp" :key="data.id">
              <div class="photo-wrapper">
                <img :src="data.url | setImageUrl" alt />
              </div>
              <div class="photo-desc">
                <p class="label">{{data.label}}</p>
                <p class="time">{{data.date | setDate}}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>

      <el-drawer :visible.sync="drawer" :direction="direction" size="70%">
        <div style="height: 100vh;overflow: auto;padding: 0 20px">
          <h1 style="text-align: center;height: 5vh;font-size: 30px;color: #555">{{drawerData.label}}</h1>
          <div style="height: 70vh;padding: 20px;text-align: center" >
            <img :src="drawerData.url | setImageUrl" alt style="height: 100%" />
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
export default {
  name: "Xc",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawerData: {},
      activeName: "0"
    };
  },

  mounted() {
    this.getXcData();
  },
  methods: {
    openDrawer(data) {
      this.drawerData = data;
      this.drawer = true;
    },
    getXcData() {
      this.$store.dispatch("admin/getXcData");
    }
  },
  computed: {
    xcData() {
      let data = this.$store.state.admin.xcData;
      if (data.length) {
        let newData = {
          grxc: [],
          jcsj: [],
          rslc: [],
          smzp: []
        };
        data.forEach(value => {
          if (value.inits === "私密照片") {
            newData.smzp.push(value);
          } else if (value.inits === "精彩瞬间") {
            newData.jcsj.push(value);
          } else if (value.inits === "人生历程") {
            newData.rslc.push(value);
          } else {
            newData.grxc.push(value);
          }
        });

        return newData;
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
          >img
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