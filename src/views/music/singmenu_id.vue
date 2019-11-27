<template>
  <div class="singmenu_id">
    <div class="title">
      <div class="left">
        <img :src="menuData.coverImgUrl" alt />
        <span>{{ menuData.trackCount }}</span>
      </div>
      <div class="right">
        <div class="label">
          <span>歌单</span>
          {{ menuData.name }}
        </div>
        <div class="time">
          <span>
            创建时间：
            <i>{{ menuData.createTime | menuTime }}</i>
          </span>
        </div>
        <div class="number">
          <span>播放次数：{{ menuData.playCount | initPlayCount }}</span>
          <span>分享次数：{{ menuData.shareCount }}</span>
          <span>订阅计数：{{ menuData.subscribedCount }}</span>
          <span>歌曲数量：{{ menuData.trackCount }}</span>
        </div>
        <div class="tags">
          <el-tag type="warning" size="mini" v-for="tag in menuData.tags" :key="tag">{{ tag }}</el-tag>
        </div>
        <div class="intro">
          <span>{{ menuData.description }}</span>
        </div>
      </div>
    </div>
    <div class="content sing-menu-table">
      <!-- :span-method="arraySpanMethod" -->
      <el-table
        highlight-current-row
        @row-click="addSingerList"
        :stripe="bmw"
        v-if="menuData.tracks"
        :data="
          menuData.tracks.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="音乐标题">
          <template slot-scope="scope">
            <span
              v-if="scope.row.fee === 1"
              style="backgroundColor: #eb2001;borderRadius:3px;margin-right:5px;color:#fff;padding: 0 3px"
            >v</span>
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手">
          <template slot-scope="scope">
            <span v-for="(ar, index) in scope.row.ar" :key="index">
              {{
              ar.name
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="专辑" prop="al.name"></el-table-column>
        <el-table-column label="时长" width="50px">
          <template slot-scope="scope">
            <div>{{ scope.row.dt | toStringMusicTime }}</div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="200px">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="音乐标题关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-link type="primary" @click.stop="gotoDetailPage(scope.row.id)">查看详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { musicApi } from "@/views/admin/url.js";
export default {
  name: "singmenu_id",
  mounted() {
    this.getSingMenuDetail(this.$route.params.id);
  },
  data() {
    return {
      menuData: {},
      search: "",
      bmw: true
    };
  },
  filters: {
    menuTime(time) {
      return new Date(time).toLocaleString().split(" ")[0];
    },
    initPlayCount(num) {
      return Math.round(num / 10000) + "万";
    }
  },
  methods: {
    gotoDetailPage(id) {
      this.$router.push("/music/singDetail/" + id);
    },
    addSingerList(data, column, event) {
      if (data.fee === 1) {
        this.$message({
          message: "暂时不支持vip歌曲的播放！",
          type: "warning"
        });
        return;
      }
      let id = data.id;
      let url = "song/url";
      this.addSingData(data);
      this.$axios
        .get(`${musicApi}/${url}`, {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.addSingList(res.data.data);
          }
        })
        .catch(err => {
          console.log("程序错误:" + err);
        });
    },
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 3) {
    //     return [1, 2];
    //   }
    // },
    getSingMenuDetail(id) {
      // 获取歌单详情
      this.$axios
        .get(`${musicApi}/playlist/detail`, {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.menuData = res.data.playlist;
          }
        })
        .catch(err => {
          console.log("错误信息：" + err);
        });
    },
    ...mapMutations("music", ["addSingList", "addSingData"])
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.singmenu_id
  width: 1280px
  margin: 30px auto
  .title
    width: 100%
    height: 250px
    @include flex(space-between,flex-start)
    .left
      flex: 0 0 250px
      position: relative
      border-radius: 5px
      overflow: hidden
      @include flex(center,center)
      >img
        width: 100%
        height: 100%
      >span 
        position: absolute
        bottom: 0
        left: 0
        color: #fff
        background-color: #eb2001
        border-radius: 3px
        padding: 3px
    .right
      flex: 1
      padding: 0 30px
      .label
        width: 100%
        height: 40px
        font-size: 21px
        color: #000
        @include flex(flex-start,center)
        >span
          border: 1px solid #eb2001
          padding: 2px 5px
          border-radius: 2px
          font-size: 16px
          color: #666
          margin-right: 10px
      .time
        width: 100%
        height: 30px
        @include flex(flex-start,center)
        >span
          >i
            color: #eb2001
      .number
        width: 100%
        height: 40px
        line-height: 40px
        >span
          margin-right: 10px
      .tags
        width: 100%
        height: 50px
        line-height: 50px
        .el-tag
          margin-right: 10px
      .intro
        width: 100%
        height: 80px
        line-height: 20px
        overflow: hidden
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 4
  .content
    margin-top: 30px  
</style>

<style>
.sing-menu-table .el-table__body tr.current-row > td {
  background-color: #fdf3ea;
  color: #f19944;
}
.sing-menu-table .el-table__body tr:hover {
  cursor: pointer;
}
</style>