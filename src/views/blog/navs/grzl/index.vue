<template>
  <div class="grzl">
    <div class="article">
      <div>
        <div class="aside">
          <div class="aside-left" v-if="zlData">
            <div class="aside-top">
              <el-row class="avatar">
                <el-col>
                  <img :src="infoData.src" alt />
                </el-col>
              </el-row>
              <el-row class="my-info">
                <el-col style="font-size: 16px;color: #000">{{zlData.name}}</el-col>
                <el-col style="color: #0487dc">{{zlData.ename}}</el-col>
              </el-row>
            </div>
            <div class="aside-middle">
              <ul>
                <li>
                  <span>性别：</span>
                  {{zlData.sex | sexInit}}
                </li>
                <li>
                  <span>年龄：</span>
                  {{zlData.age}}
                </li>
                <li>
                  <span>现处地址：</span>
                  {{zlData.address}}
                </li>
                <li>
                  <span>身高：</span>
                  {{zlData.height}}
                </li>
                <li>
                  <span>邮箱：</span>
                  {{zlData.email}}
                </li>
                <li>
                  <span>工作经验：</span>
                  {{zlData.gzjy}}
                </li>
                <li>
                  <span>自我介绍：</span>
                  {{zlData.intro}}
                </li>
              </ul>
            </div>
          </div>
          <div class="aside-right">
            <ul>
              <h3>技能树</h3>
              <li v-for="(data,index) in jnsData" :key="data.id">
                <el-tag effect="plain">{{index}} {{data}}</el-tag>
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="data | classInit"
                  :color="data | classColor"
                ></el-progress>
              </li>
            </ul>
          </div>
        </div>
        <div class="main">
          <div class="list-one">
            <h3>工作经历</h3>
            <el-tabs tab-position="right" style="height: 200px;">
              <el-tab-pane :label="data.gsmc" v-for="data in gzjyData" :key="data.gsmc">
                <div class="label">
                  <span style="color: rgb(46,176,55)">{{data.gzzw}}</span> |
                  <span style="color: #0487dc">{{data.gsmc}}</span>
                </div>
                <div class="nature">
                  <span>{{data.nature}}</span>
                  <span>人数：{{data.gsgm}}</span>
                  <span>状态：{{data.qita}}</span>
                </div>
                <div class="duties">
                  <span>职位描述：{{data.zwms}}</span>
                </div>
                <div class="time">
                  <ul>
                    <span>在职时间：</span>
                    <li>{{data.rzsj}}</li>
                    <li>{{data.lzsj}}</li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="list-two">
            <h3>项目经验</h3>
            <el-tabs tab-position="left" style="height: 200px;">
              <el-tab-pane :label="data.bt" v-for="data in xmjyData" :key="data.bt">
                <div class="label">
                  <span style="color: rgb(46,176,55)">{{data.bt}}</span> |
                  <span style="color: #0487dc">{{data.zz}}</span>
                </div>
                <div class="duties">
                  <span>
                    职位描述：
                    <pre>{{data.ms}}</pre>
                  </span>
                </div>
                <div class="time">
                  <ul>
                    <span>在职时间：</span>
                    <li>{{data.lxsj}}</li>
                    <li>{{data.wjsj}}</li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Grzl",
  data() {
    return {
      infoData: {
        desc:
          "态度端正，热爱学习，责任心强，无不良嗜好，js基础扎实，熟练使用Vue全家桶。熟悉webpack、node,了解elementUI、mongoDB。",
        workExperience: [
          {
            office: "前端开发工程师",
            company: "浙江邦芒大数据有限公司",
            nature: "民营企业",
            NumberOfPeople: "200-500",
            Duties: "通过UI图还原到网页，维护优化其他网站",
            other: "兼职",
            date: ["2019-03", "至今"]
          },
          {
            office: "美工、网页设计",
            company: "嘉兴万象汽配有限公司",
            nature: "私营企业",
            NumberOfPeople: "50-200",
            Duties: "负责产品抠图设计，海报宣传册设计，阿里国际站网页设计。",
            other: "全职",
            date: ["2018-07", "至今"]
          }
        ],
        ProjectExperience: [
          {
            date: ["2019-04", "2019-06"],
            label: "vue多页应用-小说阅读器",
            Duties: "整个前端独立开发，后端使用追书神器api",
            desc:
              "根据追书神器接口，使用vue全家桶配置多页应用，实现阅读小说-无线端。 /n 使用rem做适配，sass预处理器。 /n 项目地址： daug.top"
          },
          {
            date: ["2019-04", "至今"],
            label: "官方页面pc端和无线端实现",
            Duties:
              "使用webpack配置autoprefixer做ie兼容，使用sass编写css，使用flex布局。",
            desc:
              "项目地址：www.50bmkz.com /n www.50bm.com.cn /n www.renlibao.cn /n jxrlzy.com"
          }
        ],
        src: require("@/assets/zym.jpg")
      }
    };
  },
  mounted() {
    this.getGrzlData();
    this.getJnsData();
    this.getGzjyData();
    this.getXmjyData();
  },
  methods: {
    getGrzlData() {
      this.$store.dispatch("admin/getGrzlData");
    },
    getJnsData() {
      this.$store.dispatch("admin/getJnsData");
    },
    getGzjyData() {
      this.$store.dispatch("admin/getGzjyData");
    },
    getXmjyData() {
      this.$store.dispatch("admin/getXmjyData");
    }
  },
  computed: {
    zlData() {
      let data = this.$store.state.admin.zlData;
      if (data.sex) {
        return data;
      }
    },
    jnsData() {
      let data = this.$store.state.admin.jnsData;
      if (data.css3) {
        delete data._id;
        return data;
      }
    },
    gzjyData() {
      let data = this.$store.state.admin.gzjyData;
      if (data.length) {
        return data;
      }
    },
    xmjyData() {
      let data = this.$store.state.admin.xmjyData;
      if (data.length) {
        return data;
      }
    }
  },
  filters: {
    sexInit(data) {
      if (data) {
        return "男";
      } else {
        return "女";
      }
    },
    classInit(data) {
      if (data == 1) {
        return 20;
      } else if (data == 2) {
        return 40;
      } else if (data == 3) {
        return 60;
      } else if (data == 4) {
        return 80;
      } else {
        return 100;
      }
    },
    classColor(data) {
      if (data == 1) {
        return "#F56C6C";
      } else if (data == 2) {
        return "#E6A23C";
      } else if (data == 3) {
        return "#909399";
      } else if (data == 4) {
        return "#409EFF";
      } else {
        return "#67C23A";
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.grzl
  width: 100%
  .article
    max-width: 1280px
    margin: 0 auto
    .aside
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      padding: 1%
      height: 480px
      @include flex(space-between,flex-start)
      .aside-left
        flex: 0 0 40%
        padding: 10px
        height: 100%
        background-color: #fff
        .aside-top
          background-color: rgba(46,176,55,.3)
          height: 180px
          .avatar
            width: 100%
            .el-col
              margin: 15px 0
              @include flex(center,center)
              img
                width: 100px
                height: 100px
                border-radius: 50%
          .my-info
            width: 100%
            .el-col
              height: 20px
              line-height: 20px
              @include flex(center,center)
        .aside-middle
          width: 100%
          margin: 20px 0
          ul
            width: 100%
            li
              line-height: 25px
              color: #000
              border-bottom: 1px solid #eee
              span
                color: #666
              &:last-child
                border: none
      .aside-right   
        background-color: #fff   
        flex: 0 0 59%
        padding: 10px
        height: 100%
        ul
          width: 100%
          height: 100%
          h3
            width: 100%
            height: 20px
            background-color: #dcdcdc
            line-height: 20px
            padding-left: 10px
            margin-bottom: 30px
            border-left: 10px solid rgba(46,176,55,.8)
          li
            margin: 10px 0            
            @include flex(center,center)
            .el-tag
              flex: 0 0 30%
            .el-progress
              flex: 1
              padding-left: 10px
    .main  
      padding-top: 0  
      padding-bottom: 0
      margin-top: 20px
      .list-one,.list-two
        width: 100%
        background-color: rgba(46,176,55,.3)
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        padding: 1% 2%
        margin-bottom: 20px
        h3
          width: 100%
          height: 25px
          line-height: 25px
          border-bottom: 1px solid rgba(46,176,55,.3)
          margin: 5px 0
          color: #444
        .label
          line-height: 50px
        .nature
          line-height: 40px
          span
            padding-right: 20px
        .duties
          line-height: 20px
          height: 60px
          overflow: hidden
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
        .time
          width: 100%
          ul
            width: 100%
            @include flex(flex-start,center)              
            li
              line-height: 30px
              padding: 0 3px
              &:after
                content: " -"
              &:last-child
                &:after
                  content: ""
      .list-two
        background-color: rgba(4,135,220,.3)
        .duties
          pre
            white-space: pre-wrap
            word-wrap: break-word
      >div
        &:last-child
          margin-bottom: 0px              
</style>