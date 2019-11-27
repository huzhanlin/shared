<template>
  <div class="artistList_id">
    <div class="artist" v-if="listData.artist">
      <div class="image">
        <img :src="listData.artist.picUrl" alt />
      </div>
      <div class="author">
        <div class="name-wrapper">
          <span class="name">{{listData.artist.name}}</span>
          <span class="change-color" v-if="listData.artist.alias.length">
            <span class="alias" v-for="list in listData.artist.alias" :key="list">/{{list}}</span>
          </span>
        </div>
        <div class="body">
          <span>
            专辑：
            <i>{{listData.artist.albumSize}}</i>
          </span>
          <span>
            歌曲：
            <i>{{listData.artist.musicSize}}</i>
          </span>
          <span>
            MV:
            <i>{{listData.artist.mvSize}}</i>
          </span>
        </div>
        <div class="briefDesc">{{listData.artist.briefDesc}}</div>
      </div>
    </div>
    <div class="hotSongs">
      <ul class="item">
        <li
          class="list"
          @click="addSingerList(data)"
          v-for="data in listData.hotSongs"
          :key="data.id"
        >
          <div class="name-wrapper">
            <span class="name">
              <span
                v-if="data.fee === 1"
                style="backgroundColor: #eb2001;borderRadius:3px;margin-right:5px;color:#fff;padding: 0 3px"
              >v</span>
              {{data.name}}
            </span>
            <span class="change-color" v-if="data.alia.length">
              <span class="alias" v-for="list in data.alia" :key="list">/ {{list}}</span>
            </span>
          </div>
          <div class="ar" v-if="data.ar.length">
            <span class="name-w" v-for="list in data.ar" :key="list.id">
              <span class="name">{{list.name}}</span>
            </span>
          </div>
          <div class="detail">
            <el-link type="primary" @click.stop="gotoDetailPage(data.id)">查看详情</el-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { musicApi } from "../admin/url";
import { mapMutations } from "vuex";
export default {
  name: "artise_id",
  data() {
    return {
      id: this.$route.params.id,
      listData: {}
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    gotoDetailPage(id) {
      this.$router.push("/music/singDetail/" + id);
    },
    getListData() {
      let url = "artists";
      this.$axios
        .get(`${musicApi}/${url}`, {
          params: {
            id: this.id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.listData = res.data;
          }
        })
        .catch(err => {
          console.log("数据读取错误：" + err);
        });
    },
    addSingerList(data) {
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
    ...mapMutations("music", ["addSingList", "addSingData"])
  }
};
</script>

<style scoped lang="sass">
@import '@/assets/default.sass'
.artistList_id
  width: 1280px
  margin: 50px auto
  .artist
    width: 100%
    height: 150px
    @include flex(flex-start,flex-start)
    .image
      width: 150px
      height: 100%
      border-radius: 10px
      overflow: hidden
      img
        width: 100%
        height: 100%
    .author
      padding: 0 20px
      flex: 1
      height: 100%
      .name-wrapper
        width: 100%
        height: 30px
        line-height: 30px              
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap                      
        .change-color
          color: rgba(111,111,111,.5)
      .body
        width: 100%
        height: 40px
        line-height: 40px   
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        span
          margin-right: 10px           
        span:last-child
          margin-right: 5px
        i
          color: #eb2001
      .briefDesc
        line-height: 20px
        height: 80px
        overflow: hidden
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 4
  .hotSongs 
    width: 100%
    margin-top: 20px
    .item
      width: 100%
      .list
        width: 100%
        height: 30px
        line-height: 30px
        padding: 0 10px
        cursor: pointer
        border: 1px solid rgba(225,78,226,.2)
        border-radius: 50%
        margin-bottom: 10px
        @include flex(space-between,center)
        .name-wrapper
          flex: 0 0 30%
          font-size: 14px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          .name
            color: #444
          .change-color
            margin-left: 5px
        .ar
          color: #665
          flex: 1
          text-align: right
          overflow: hidden
          padding-left: 50px
          text-overflow: ellipsis
          white-space: nowrap
          .name-w
            width: 100%
            height: 30px
            line-height: 30px              
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap 
            .name
              color: #666
            &:after
              content: "/"    
            &:last-child
              &:after
                content: ""    
        .detail
          flex: 0 0 10%
          @include flex(flex-end,center)
          .el-button 
            width: 80px              
        &:hover
          background-color: #2eb037
          border-radius: 5px
          .name-wrapper
            font-size: 14px
            .name
              color: #fff
            .change-color
              color: #ddd
          .ar
            .name-w
              .name
                color: #ddd             
</style>