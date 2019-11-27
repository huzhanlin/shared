<template>
  <div class="skill-wrapper">
    <!-- <div class="search">
      <el-input v-model="searchData" placeholder="请输入搜索关键词">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>-->
    <div class="skill-content">
      <el-tabs v-model="tabsData">
        <el-tab-pane
          v-for="(data,key,index) in skillData"
          :key="key"
          :label="key"
          :name="index + ''"
        >
          <ul class="items">
            <li class="list" v-for="dt in data" :key="dt._id">
              <div class="ctx-left">
                <div class="label marked">
                  <i v-if="dt.hot" class="el-icon-star-on"></i>
                  {{dt.label}}
                </div>
                <div class="date marked">{{dt.date | setDate}}</div>
              </div>
              <div class="ctx-right">
                <el-button size="mini" @click="openDrwaer(dt)">查看文章</el-button>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-drawer v-if="drawerData.label" :visible.sync="drawer" :direction="direction" size="40%">
      <div style="height: 100vh;overflow: auto">
        <slot name="title" style="height: 10vh">
          <div
            style="color: 068412;padding: 0 20px;font-size: 24px;border-left: 8px solid #f00;margin-bottom: 10px"
          >{{drawerData.label}}</div>
        </slot>
        <div
          style="padding: 20px;height: 80vh; overflow: auto;background-color:#f0f0f0;box-shadow: 0px 0px 5px rgba(0,0,0,.3) inset;"
        >
          <div class="body marked" v-html="markedMethods(drawerData.body)"></div>
        </div>
        <div style="height: 10vh;padding: 30px 20px 0px;text-align: center;">
          <span>发表日期：{{drawerData.date | setDate}}</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "Skill",
  data() {
    return {
      tabsData: "0",
      searchData: "",
      drawer: false,
      direction: "rtl",
      drawerData: {}
    };
  },
  mounted() {    
    this.getSkillData();
  },
  methods: {
    openDrwaer(data) {
      this.drawerData = data;
      this.drawer = true;
    },
    getSkillData() {
      let data = {
        type: "all"
      };
      this.$store.dispatch("admin/getSkillData", data);
    },
    markedMethods(data) {
      return marked(data);
    }
  },
  computed: {
    skillData() {
      let data = this.$store.state.admin.skillData;
      if (data.length) {
        let newData = {};
        data.forEach(value => {
          let type = value.type;
          if (newData[type]) {
            newData[type].push(value);
          } else {
            newData[type] = [];
            newData[type].push(value);
          }
        });
        return newData;
      }
    }
  }
};
</script>

<style scoped lang="sass">
@import '@/assets/default.sass'
.skill-wrapper
  width: 100%
  .skill-content
    width: 100%
    background-color: #fff
    padding: 20px
    .items
      width: 100%
      .list
        width: 100%
        padding: 20px 0
        border-bottom: 1px solid #dcdcdc
        @include flex(space-between,center)
        .ctx-left
          flex: 0 0 88%
          .label
            line-height: 40px
            height: 40px
            font-size: 18px
            >i
              color: #eb2001
          .date
            line-height: 30px
            height: 30px
        .ctx-right
          flex: 1
          text-align: right
        &:last-child
          border: none
</style>
<style lang="sass">
@import '@/assets/marked.sass'
</style>