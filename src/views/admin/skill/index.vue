<template>
  <div class="admin-skill-wrapper">
    <div class="set-skill-data">
      <h3>
        <i class="el-icon-edit-outline"></i>技术文章
      </h3>
      <div class="label">
        <input type="text" placeholder="请输入技术文章的标题" v-model="skill.label" required />
      </div>
      <div class="body">
        <textarea
          name
          id
          cols="30"
          rows="10"
          v-model="skill.body"
          placeholder="请输入技术文章的内容"
          required
        ></textarea>
      </div>
      <div class="option">
        <div class="type">
          <select name id v-model="skill.type">
            <option value="javaScript">javaScript</option>
            <option value="css3">css3</option>
            <option value="Vue">Vue</option>
            <option value="sass">sass</option>
            <option value="node">node</option>
            <option value="webpack">webpack</option>
            <option value="ElementUI">ElementUI</option>
            <option value="photoShop">photoShop</option>
            <option value="es6">es6</option>
          </select>
        </div>
        <div class="hot">
          <label for="hot">置顶</label>
          <input type="checkbox" v-model="skill.hot" name="hot" id="hot" />
        </div>
        <div class="btn">
          <el-button size="mini" @click="setSkillData">发布文章</el-button>
        </div>
      </div>
    </div>

    <el-table
      v-if="skillData"
      ref="filterTable"
      style="width: 100%"
      :data="skillData.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="label" label="标题" width="280"></el-table-column>
      <el-table-column label="置顶状态" prop="hot"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer v-if="drawerData.label" :visible.sync="drawer" :direction="direction">
      <div class="skill-admin" style="height: 100vh;overflow: auto">
        <slot name="title">
          <input type="text" :value="drawerData.label" ref="label" />
        </slot>
        <div>
          <textarea
            ref="body"
            name
            id
            cols="30"
            rows="30"
            class="body marked"
            :value="drawerData.body"
          ></textarea>
        </div>
        <div style="padding: 20px;text-align: center;margin-top: 30px">
          <span>发表日期：{{drawerData.date | setDate}}</span>
        </div>
        <div>
          <el-button size="mini" @click="updataSkillData">修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "admin-skill",
  data() {
    return {
      skill: {
        hot: false,
        label: "",
        type: "javaScript",
        body: ""
      },
      search: "",
      drawer: false,
      direction: "rtl",
      drawerData: {}
    };
  },
  methods: {
    getSkillData() {
      let data = {
        type: "all"
      };
      this.$store.dispatch("admin/getSkillData", data);
    },
    setSkillData() {
      let fileFormData = new FormData();
      fileFormData.append("label", this.skill.label);
      fileFormData.append("body", this.skill.body);
      fileFormData.append("hot", this.skill.hot);
      fileFormData.append("type", this.skill.type);
      this.$axios
        .post(`${adminUrl}/skill/setskilldata`, fileFormData)
        .then(res => {
          if (res.data.ok) {
            alert("文章数据上传成功");
          }
        })
        .catch(err => {
          alert("文章数据上传失败:" + err);
        });
    },
    handleDelete(index, row) {
      let _id = row._id;
      this.$axios
        .get(`${adminUrl}/skill/deletedata`, {
          params: { _id }
        })
        .then(res => {
          if (res.data.ok) {
            alert("删除数据成功");
          } else {
            alert("删除数据失败");
          }
        });
    },
    handleEdit(index, row) {
      this.drawerData = row;
      this.drawer = true;
    },
    updataSkillData() {
      let label = this.$refs.label.value;
      let body = this.$refs.body.value;
      this.$axios
        .get(`${adminUrl}/skill/updatadata`, {
          params: {
            label,
            body,
            _id: this.drawerData._id
          }
        })
        .then(res => {
          if (res.data.ok) {
            alert("修改数据成功");
          } else {
            alert("修改数据失败");
          }
        });
    }
  },
  computed: {
    skillData() {
      let data = this.$store.state.admin.skillData;
      if (data.length) {
        let newData = data.map(value => {
          let date = new Date(value.date);
          date = `${date.getFullYear()}.${date.getMonth() +
            1}.${date.getDate()}`;
          if (value.hot === true) {
            value.hot = 1;
            value.date = date;
          } else {
            value.hot = 0;
            value.date = date;
          }
          return value;
        });
        return newData;
      } else {
        this.getSkillData();
      }
    }
  }
};
</script>

<style scoped lang="sass">
@import "@/assets/default.sass"
.admin-skill-wrapper
  width: 100%
  .set-skill-data
    background-color: #fff
    padding: 20px
    h3
      width: 100%
      height: 40px
      line-height: 40px
      >i
        color: #eb2001
        font-size: 18px
        margin-right: 10px
    .label
      width: 100%
      height: 40px
      line-height: 40px
      >input
        width: 100%
        height: 100%
        padding: 0 10px
    .body
      margin-top: 10px
      width: 100%
      height: 300px
      >textarea
        width: 100%
        height: 100%
        padding: 10px
    .option
      margin-top: 10px
      width: 100%
      @include flex(space-between,center)
      .type
        flex: 0 0 200px
        height: 40px
        line-height: 40px
        >select
          width: 100%
          height: 30px
      .hot
        flex: 0 0 80px
        height: 100%
        line-height: 100%
        >label
          margin-right: 10px
  .el-table
    margin-top: 20px
</style>

<style lang="sass">
.el-drawer
  width: 100%
  .skill-admin
    width: 100%
    padding: 0 20px
    input
      width: 100%
      height: 40px
      padding: 0 10px
    textarea
      margin-top: 20px
      width: 100%
      padding: 10px
      line-height: 20px
    .el-button
      width: 100%
</style>