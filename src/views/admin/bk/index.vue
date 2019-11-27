<template>
  <div class="admin-bk">
    <div class="zym">
      <el-input type="text" v-model="form.zymData" placeholder="请输入座右铭文本" />
      <el-button @click="setZymData">提交</el-button>
    </div>
    <div class="note-book">
      <el-input type="text" v-model="form.noteBookData" placeholder="请输入记事本文本" />
      <el-button @click="setJsbData">提交</el-button>
    </div>
    <div class="updata-note-book" v-if="jsbData">
      <el-table
        :data="jsbData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="flogs" label="完成状态" sortable width="300"></el-table-column>
        <el-table-column prop="text" label="事件"></el-table-column>
        <el-table-column label="修改状态">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">切换完成状态</el-button>
            <el-button size="mini" type="danger" @click="delectData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "Admin-bk",
  data() {
    return {
      form: {
        zymData: "",
        noteBookData: ""
      }
    };
  },
  methods: {
    setZymData() {
      this.$axios
        .get(`${adminUrl}/bk/zym?text=${this.form.zymData}`)
        .then(res => {
          if (res.data.ok) {
            this.form.zymData = "";
            alert("数据添加成功！");
          }
        });
    },
    setJsbData() {
      this.$axios
        .get(`${adminUrl}/bk/jsb?text=${this.form.noteBookData}`)
        .then(res => {
          if (res.data.ok) {
            this.form.noteBookData = "";
            alert("数据添加成功！");
          }
        });
    },
    handleEdit(data) {
      this.$axios
        .get(`${adminUrl}/bk/updatajsb?text=${data.text}&flogs=${data.flogs}`)
        .then(res => {
          if (res.data.ok) {
            this.form.noteBookData = "";
            alert("数据修改成功！");
          }
        });
    },
    delectData(data) {
      let newData = { text: data.text };
      this.$axios
        .get(`${adminUrl}/bk/deljsb`, { params: newData })
        .then(res => {
          if (res.data.ok) {
            this.form.noteBookData = "";
            alert("数据删除成功！");
          }
        });
    }
  },
  computed: {
    jsbData() {
      let data = this.$store.state.admin.jsbData;
      if (data.length) {
        return data;
      } else {
        this.$store.dispatch("admin/getjsbData");
      }
    }
  }
};
</script>

<style lang="sass" scoped> 
@import '@/assets/default.sass'
.admin-bk
  width: 100%
  .zym
    background-color: #fff
    width: 100%
    height: 140px
    padding: 10px 20px 
    .el-button
      margin-top: 20px
  .note-book
    margin-top: 10px
    background-color: #fff
    padding: 10px 20px   
    height: 140px  
    .el-button
      margin-top: 20px
  .updata-note-book
    margin-top: 10px
    .el-table
      padding: 10px
</style>