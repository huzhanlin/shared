<template>
  <div class="search-page">
    <div class="search-input">
      <el-row>
        <el-col>
          <el-input placeholder="请输入歌曲或者歌手" v-model="searchWord" suffix-icon="el-icon-search"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="search-hot-words">
      <h3>热门搜索词：</h3>
      <UL>
        <el-tag
          @click="setSearchWord(data.first)"
          v-for="data in searchHotData"
          :key="data.first"
          type="success"
        >{{data.first}}</el-tag>
      </UL>
    </div>
    <div class="music-type">
      <el-menu
        mode="horizontal"
        background-color="#ddd"
        text-color="#999"
        active-text-color="#000"
        default-active="1"
      >
        <el-menu-item
          v-for="data in musicType"
          :key="data.type"
          :index="data.index"
          @click="toggleType(data.type)"
        >{{data.text}}</el-menu-item>
      </el-menu>
      <div class="result">
        <div class="search-number" v-if="searchResult.songCount">
          搜索
          <span>{{searchWord}}</span>找到
          <span>{{searchResult.songCount}}</span>首歌曲/歌单
        </div>
        <div class="songs">
          <ul v-if="musicTypeSelect === 1">
            <li @click="addSingerList(data)" v-for="data in searchResult.songs" :key="data.id">
              <div class="name">
                <span
                  style="backgroundColor: #eb2001;borderRadius:3px;margin-right:5px;color:#fff;padding: 0 3px"
                  v-if="data.fee === 1"
                >v</span>
                {{data.name}}
                <span
                  v-for="trans in data.transNames"
                  :key="trans"
                >- {{trans}}</span>
                <span v-for="alia in data.album.alia" :key="alia">{{alia}}</span>
              </div>
              <div class="auther">
                <span v-for="artists in data.artists" :key="artists._id">{{artists.name}}</span>
              </div>
              <div class="album">《{{data.album.name}}》</div>
              <div class="time">{{data.duration | toStringMusicTime}}</div>
              <div class="detail">
                <el-link
                  type="primary"
                  :underline="false"
                  @click.stop="gotoDetailPage(data.id)"
                >查看详情</el-link>
              </div>
            </li>
          </ul>

          <ul v-if="musicTypeSelect === 10">
            <li>暂不开放！</li>
          </ul>
          <ul v-if="musicTypeSelect === 100">
            <li>暂不开放！</li>
          </ul>

          <singMenu v-if="musicTypeSelect === 1000" :singListData="searchResult"></singMenu>

          <ul v-if="musicTypeSelect === 1004">
            <li>暂不开放！</li>
          </ul>
          <ul v-if="musicTypeSelect === 1006">
            <li>暂不开放！</li>
          </ul>
          <ul v-if="musicTypeSelect === 1009">
            <li>暂不开放！</li>
          </ul>
          <ul v-if="musicTypeSelect === 1014">
            <li>暂不开放！</li>
          </ul>
          <ul v-if="musicTypeSelect === 1018">
            <li>暂不开放！</li>
          </ul>
        </div>
        <div class="page">
          <ul>
            <div class="pre">
              <el-button size="mini" @click="getPrePage()" :disabled="pre">上一页</el-button>
            </div>
            <li
              v-for="(data,index) in pageNumber"
              :key="data"
              :class="offset === index ? 'active' : ''"
              @click="getIndexData(index)"
            >{{data}}</li>
            <div class="next">
              <el-button size="mini" :disabled="next" @click="getNextPage()">下一页</el-button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { musicApi } from "@/views/admin/url.js";
import singMenu from "@/components/singMenu.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "search-page",
  components: {
    singMenu
  },
  mounted() {
    let query = this.$route.query;
    this.searchWord = query.search;

    if (!this.searchHotData.length) {
      let url = "search/hot";
      this.$axios
        .get(`${musicApi}/${url}`)
        .then(res => {
          if (res.data.code === 200) {
            this.setSearchHotData(res.data.result.hots);
          }
        })
        .catch(err => {
          this.$message.errors("歌曲热词数据读取错误，请刷新重试：" + err);
        });
    }
  },
  data() {
    return {
      pre: true,
      next: false,
      searchWord: "",
      searchResult: [],
      musicType: [
        {
          type: 1,
          text: "单曲",
          index: "1"
        },
        {
          type: 1000,
          text: "歌单",
          index: "4"
        }
        // {
        //   type: 10,
        //   text: "专辑",
        //   index: "2"
        // },
        // {
        //   type: 100,
        //   text: "歌手",
        //   index: "3"
        // },
        // {
        //   type: 1004,
        //   text: "MV",
        //   index: "5"
        // },
        // {
        //   type: 1006,
        //   text: "歌词",
        //   index: "6"
        // },
        // {
        //   type: 1009,
        //   text: "电台",
        //   index: "7"
        // },
        // {
        //   type: 1014,
        //   text: "视频",
        //   index: "8"
        // },
        // {
        //   type: 1018,
        //   text: "综合",
        //   index: "9"
        // }
      ],
      musicTypeSelect: 1,
      limit: 30,
      offset: 0
    };
  },
  watch: {
    offset() {
      if (this.offset === 0) {
        this.pre = true;
        this.next = false;
      } else if (
        this.offset === Math.ceil(this.searchResult.songCount / this.limit - 1)
      ) {
        this.next = true;
        this.pre = false;
      } else {
        this.pre = false;
        this.next = false;
      }
      this.getSearchResult(true);
    },
    searchWord() {
      if (this.searchWord.trim()) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.getSearchResult, 500);
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  methods: {
    gotoDetailPage(id) {
      this.$router.push("/music/singDetail/" + id);
    },
    setSearchWord(text) {
      // 将热搜词赋值给搜索框
      this.searchWord = text;
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
    getIndexData(index) {
      this.offset = index;
    },
    getPrePage() {
      this.offset = this.offset - 1;
    },
    getNextPage() {
      this.offset = this.offset + 1;
    },
    toggleType(type) {
      this.musicTypeSelect = type;
      this.getSearchResult();
    },
    getSearchResult(Bool) {
      if (!Bool) {
        this.offset = 0;
      }
      let url = `${musicApi}/search`;
      let offsetNumber = this.offset * this.limit;
      this.$axios
        .get(url, {
          params: {
            keywords: this.searchWord,
            type: this.musicTypeSelect,
            limit: this.limit,
            offset: offsetNumber
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            let result = res.data.result;
            if (!result.songCount) {
              result.songCount = res.data.result.playlistCount;
            }
            this.searchResult = result;
            if (
              this.offset ===
                Math.ceil(this.searchResult.songCount / this.limit - 1) &&
              this.offset === 0
            ) {
              this.pre = true;
              this.next = true;
            }
            //  else {
            //   this.pre = true;
            //   this.next = false;
            // }
          }
        })
        .catch(err => {
          console.log(err + "数据获取错误");
        });
    },
    ...mapMutations("music", ["setSearchHotData", "addSingList", "addSingData"])
  },
  computed: {
    pageNumber() {
      if (this.searchResult.songCount > 20) {
        return Math.ceil(this.searchResult.songCount / this.limit);
      }
    },
    ...mapState("music", ["searchHotData"])
  }
};
</script>


<style lang="sass" scoped>
@import "@/assets/default.sass"
.search-page
  width: 1280px
  margin: 50px auto
  .search-hot-words
    margin-top: 20px
    height: 40px
    width: 100%
    @include flex(space-between,center)
    >h3
      flex: 0 0 8%
      font-size: 16px
    >ul
      flex: 1
      >span
        margin-left: 10px
        cursor: pointer
  .music-type
    width: 100%
    margin-top: 30px
    .el-menu
      padding: 0 120px
      @include flex(center,center)
      .el-menu-item
        flex: 0 0 60px
        margin: 0 20px
        text-align: center
    .result
      width: 100%
      .search-number
        width: 100%
        height: 60px
        line-height: 60px
        font-size: 19px
        >span
          color: #eb2001
      .songs
        width: 100%
        >ul
          width: 100%
          >li
            cursor: pointer
            width: 100%
            height: 45px
            line-height: 45px
            @include flex(flex-start,center)
            .name
              padding: 0 10px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              flex: 1
              color: #222
              >span
                color: #999
            .auther
              padding: 0 5px
              flex: 0 0 20%
              color: #222
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .album
              padding: 0 5px
              flex: 0 0 25%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .time
              flex: 0 0 5%
            .detail
              flex: 0 0 5%
              padding-right: 5px
            &:nth-of-type(odd)
              background-color: #eee
      .page
        width: 100%        
        height: 80px
        padding-top: 30px
        overflow: hidden
        >ul
          width: 100%
          height: 28px
          @include flex(center,center)
          .pre
            width: 80px
            height: 100%
            text-align: center
          .next
            width: 80px
            height: 100%
            text-align: center
          >li
            width: 28px
            height: 100%
            background-color: #ffffff
            border: 1px solid #dcdcdc
            margin: 0 2px
            cursor: pointer
            @include flex(center,center)
          .active
            color: #eb2001
</style>




<!-- <template>
  <div class="music-wrapper">
    <div class="search">
      <el-row>
        <el-col :span="16" :push="4" :pull="4">
          <el-input placeholder="请输入歌曲或者歌手" suffix-icon="el-icon-search" v-model="searchWord"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="search-end">
      <div class="search-hot-words">
        <h3>热门搜索词：</h3>
        <UL>
          <el-tag
            @click="setSearchData(data)"
            v-for="data in searchHotData"
            :key="data.first"
            type="success"
          >{{data.first}}</el-tag>
        </UL>
      </div>
      <div class="search-resoult">
        <el-tabs v-if="searchResult.songs" tab-position="right">
          <el-tab-pane :label="searchResult.order[0] | setLabelData">
            <ul v-if="searchResult[searchResult.order[0]].length">
              <li v-for="list in searchResult[searchResult.order[0]]" :key="list.id">
                <div class="content">
                  <div class="label">
                    <span>{{list.name}}</span>
                  </div>
                  <div class="label-time">
                    <span>时长：{{list.duration | timerInit}}</span>
                  </div>
                </div>
                <div class="artists">
                  <div class="tags">
                    <el-tag v-for="artist in list.artists" :key="artist.id">
                      <span>{{artist.name}}</span>
                    </el-tag>
                  </div>
                  <div class="album" v-if="list.album">
                    <span>专辑：{{list.album.name}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane :label="searchResult.order[1] | setLabelData">
            <ul v-if="searchResult[searchResult.order[1]].length">
              <li v-for="list in searchResult[searchResult.order[1]]" :key="list.id">
                
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { musicApi } from "@/views/admin/url.js";
export default {
  name: "Music-search",
  data() {
    return {
      searchHotData: [],
      searchWord: "",
      timer: -1,
      searchResult: {}
    };
  },
  filters: {
    setLabelData(data) {
      if (data === "songs") {
        return "歌曲";
      } else if (data === "playlists") {
        return "播放清单";
      } else if (data === "artists") {
        return "歌手";
      } else {
        return "专辑";
      }
    },
    timerInit(data) {
      data = (data / 1000) | 0;
      const miunte = (data / 60) | 0;
      const second = data % 60;
      return `${miunte}:${second}`;
    }
  },
  watch: {
    searchWord() {
      if (this.searchWord.trim()) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.getSearchResult, 500);
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  mounted() {
    this.getHotWord();
  },
  methods: {
    setSearchData(data) {
      this.searchWord = data.first;
    },
    getHotWord() {
      let url = "search/hot";
      this.$axios.get(`${musicApi}/${url}`).then(res => {
        if (res.data.code === 200) {
          this.searchHotData = res.data.result.hots;
        }
      });
    },
    getSearchResult() {
      let url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp";
      this.$axios
        .get(url, {
          params: {
            w: this.searchWord
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.searchResult = res.data.result;
            console.log(res.data.result);
          }
        })
        .catch(err => {
          console.log(err + "数据获取错误");
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/default.sass"
.music-wrapper
  width: 1280px
  margin: 50px auto
  overflow: hidden
  .search
    width: 100%
  .search-end
    width: 100%
    margin-top: 50px
    background-color: #fff
    @include flex(space-between,flex-start)
    .search-hot-words
      flex: 0  0 20%
      padding: 1%
      height: 100%
      background-color: rgba(0,0,0,.2)
      >h3
        width: 100%
        height: 40px
        line-height: 40px
      >ul
        width: 100%
        .el-tag
          margin: 5px
    .search-resoult
      flex: 1
      padding: 1%
      height: 100%
      .el-tabs
        width: 100%
        .el-tab-pane
          width: 100%
          >ul
            width: 100%
            padding: 0 20px
            >li
              width: 100%
              border-bottom: 1px solid #dcdcdc
              padding-bottom: 10px
              .content
                @include flex(space-between,flex-start)
                line-height: 40px
                .label
                  flex: 0 0 70%
                .label-time
                  flex: 1
              .artists
                @include flex(space-between,flex-start)
                overflow: hidden
                .tags
                  flex: 0 0 70%
                  @include flex(flex-start,flex-start)
                  .el-tag
                    margin-right: 10px   
                    @include flex(flex-start,center)                
                .album
                  flex: 1
                  overflow: hidden
                  height: 32px
                  @include flex(flex-start,center)
                  >span
                    width: 100%                    
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
              &:last-child
                border: none    
                  
</style> -->