<template>
  <div class="music-wrapper">
    <div class="seatch">
      <searchs></searchs>
    </div>
    <banner></banner>
    <div class="artist-list">
      <div class="label">
        <el-tag
          v-for="data in categoryCode"
          :key="data.type"
          type="danger"
          @click="getArtistList(data.type, data.label)"
          >{{ data.label }}</el-tag
        >
      </div>
      <div class="content">
        <div class="data-label">
          <h3>{{ labelData }}</h3>
          <div class="page-turning">
            <el-button
              size="mini"
              :disabled="singPagePre"
              @click="changeSingOffsetPre()"
            >
              <i class="el-icon-caret-left"></i
            ></el-button>
            <el-button
              size="mini"
              :disabled="singPageNext"
              @click="changeSingOffsetNext()"
            >
              <i class="el-icon-caret-right"></i
            ></el-button>
          </div>
        </div>
        <ul>
          <li
            @click="gotoArtistId(data.id)"
            v-for="data in artistListData"
            :key="data.id"
          >
            <div class="img">
              <img :src="data.picUrl" alt />
            </div>
            <div class="description">
              <div class="name-wrapper">
                <span class="name">{{ data.name }}</span>
                <span class="change-color" v-if="data.alias.length">
                  <span class="alias" v-for="list in data.alias" :key="list"
                    >/{{ list }}</span
                  >
                </span>
              </div>
              <div class="num">
                <span>
                  歌曲:
                  <i>{{ data.musicSize }}</i>
                </span>
                <span>
                  专辑:
                  <i>{{ data.albumSize }}</i>
                </span>
              </div>
              <div class="brief-desc" v-if="data.briefDesc">
                <span>{{ data.briefDesc }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <singMenu></singMenu>
  </div>
</template>

<script>
import searchs from "@/views/music/search.vue";
import { musicApi } from "@/views/admin/url.js";
import singMenu from "@/views/music/singMenu.vue";
import banner from "@/views/music/banner.vue";
export default {
  name: "Music",
  components: {
    searchs,
    banner,
    singMenu
  },
  data() {
    return {
      categoryCode: [
        {
          label: "入驻歌手",
          type: 5001
        },
        {
          label: "华语男歌手",
          type: 1001
        },
        {
          label: "华语女歌手",
          type: 1002
        },
        {
          label: "华语组合/乐队",
          type: 1003
        },

        {
          label: "日本男歌手",
          type: 6001
        },
        {
          label: "日本女歌手",
          type: 6002
        },
        {
          label: "日本组合/乐队",
          type: 6003
        },
        {
          label: "韩国男歌手",
          type: 7001
        },

        {
          label: "韩国女歌手",
          type: 7002
        },
        {
          label: "韩国组合/乐队",
          type: 7003
        },

        {
          label: "其他男歌手",
          type: 4001
        },
        {
          label: "其他女歌手",
          type: 4002
        },
        {
          label: "其他组合/乐队",
          type: 4003
        }
      ],
      artistListData: [],
      labelData: "",
      typeData: 5001,
      singPagePre: true,
      singPageNext: false,
      more: true,
      offset: 0,
      limit: 12
    };
  },
  watch: {
    more() {
      if (this.more) {
        this.singPageNext = false;
      } else {
        this.singPageNext = true;
      }
    },
    offset() {
      this.offset === 0
        ? (this.singPagePre = true)
        : (this.singPagePre = false);
      this.getArtistList(this.typeData, this.labelData, true);
    }
  },
  mounted() {
    // 获取歌手分类列表
    this.getArtistList();
  },
  methods: {
    changeSingOffsetPre() {
      this.offset = this.offset - 1;
    },
    changeSingOffsetNext() {
      this.offset = this.offset + 1;
    },
    gotoArtistId(id) {
      this.$router.push("artist/" + id);
    },
    getArtistList(
      type = this.categoryCode[0].type,
      label = this.categoryCode[0].label,
      flog
    ) {
      if (!flog) {
        this.offset = 0;
      }
      this.labelData = label;
      this.typeData = type;
      let url = `artist/list?cat=${type}`;
      this.$axios
        .get(`${musicApi}/${url}`, {
          params: {
            limit: this.limit,
            offset: this.offset * this.limit
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.more = res.data.more;
            this.artistListData = res.data.artists;
          }
        })
        .catch(err => {
          console.log(err + "数据请求错误");
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
  .artist-list
    width: 100%    
    .label
      height: 32px
      width: 100%
      @include flex(space-between,flex-start)
      .el-tag
        cursor: pointer
    .content
      width: 100%
      .data-label
        width: 100%
        height: 40px
        line-height: 40px
        @include flex(space-between,flex-end)
        h3
          width: 100%
          height: 30px
          line-height: 30px
        .page-turning
          width: 100px
          height: 30px
          @include flex(space-between,center)
      ul
        width: 100%
        padding: 20px 0
        @include align(flex-start)
        @include flex(space-between,flex-start)
        li
          flex: 0 0 15%
          overflow: hidden
          margin-bottom: 10px 
          border-radius: 5px    
          cursor: pointer     
          .img
            width: 100%
            height: 156px
            background-color: #dcdcdc
            overflow: hidden
            @include flex(center,center)
            img
              width: 100%
              min-height: 100%
              transition: all .3s
            &:hover
              img
                transition: all .3s
                width: 120%
                min-height: 120%
          .description
            padding: 5px
            width: 100%
            background-color: #fff
            .name-wrapper
              width: 100%
              height: 30px
              line-height: 30px              
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap                      
              .change-color
                color: rgba(111,111,111,.5)
            .num
              width: 100%
              height: 30px
              line-height: 30px   
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              span
                margin-right: 10px           
              span:last-child
                margin-right: 5px
              i
                color: #eb2001
            .brief-desc
              width: 100%
              height: 25px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
</style>