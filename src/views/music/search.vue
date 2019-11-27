<template>
  <div class="music-search">
    <div class="search">
      <el-row>
        <el-col>
          <form @submit="addToSearchPage()">
            <el-input placeholder="请输入歌曲或者歌手" v-model="searchWord">
              <el-button slot="append" icon="el-icon-search" @click="addToSearchPage()"></el-button>
            </el-input>
          </form>

        </el-col>
      </el-row>
      <div class="hot-list">
        <ul>
          <el-tag @click="addToSearchPage(data.first)" v-for="data in searchHotData" :key="data.first" type="success">
            {{data.first}}</el-tag>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { musicApi } from "@/views/admin/url.js";
  import { mapMutations, mapState } from 'vuex';
  export default {
    name: "music-search",
    data() {
      return {
        searchWord: ''
      }
    },
    mounted() {
      this.getHotWord()
    },
    methods: {
      addToSearchPage(data = this.searchWord) {
        // 跳转到音乐搜索页面        
        event.preventDefault()
        this.$router.push({
          path: 'search',
          query: { search: data }
        })

      },
      getHotWord() {
        let url = "search/hot";
        this.$axios.get(`${musicApi}/${url}`).then(res => {
          if (res.data.code === 200) {
            this.setSearchHotData(res.data.result.hots);
            
          }
        }).catch(err => {
          console.log(err);
          
        })
      
      },
      ...mapMutations('music', ['setSearchHotData'])
    },
    computed: {
      ...mapState('music', ['searchHotData'])
    }
  }
</script>

<style lang="sass" scoped>
    @import "@/assets/default.sass"
    .music-search
      width: 100%
      margin-bottom: 40px
      background-color: #fff
      border-radius: 5px
      box-shadow: 2px 2px 10px rgba(0,0,0,.1)
      .search
        width: 100%
        height: 60px
        padding: 0 10px
        line-height: 60px
        @include flex(space-between,center)
        .el-row
          height: 100%
          flex: 0 0 13%
        .hot-list
          padding: 0 0 0 10px 
          flex: 1
          height: 100%
          >ul
            width: 100%
            height: 100% 
            overflow: hidden
            .el-tag     
              margin-right: 8px 
              cursor: pointer
    </style>
    