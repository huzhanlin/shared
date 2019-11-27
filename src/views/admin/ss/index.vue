<template>
  <div class="admin-ss">
    <el-form class="add-list-data" :model="form" ref="form">
      <h3>发布新说说</h3>
      <el-form-item class="title" prop="label" :rules="{ required: true, message: '年龄不能为空'}">
        <el-input type="text" v-model="form.label" placeholder="请输入说说标题" />
      </el-form-item>
      <el-form-item class="body" prop="body" :rules="{ required: true, message: '年龄不能为空'}">
        <el-input type="textarea" v-model="form.body" placeholder="请输入说说内容"></el-input>
      </el-form-item>
      <div class="select">
        <div class="mood">
          <span>心情：</span>
          <el-input type="text" v-model="form.mood" placeholder="描述心情"></el-input>
        </div>
        <div class="icon">
          <el-select placeholder="请选择心情图标" v-model="form.moodIconNum">
            <el-option value="0">笑脸</el-option>
            <el-option value="1">滑稽</el-option>
            <el-option value="2">难过</el-option>
          </el-select>
        </div>
        <div class="hot">
          <el-checkbox-group v-model="form.hot">
            <el-checkbox label="hot" name="hot"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="btn">
          <el-button @click="setMoodData('form')">发布</el-button>
        </div>
      </div>
    </el-form>
    <el-table
      v-if="tabelData"
      :data="tabelData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="label" label="标题" sortable width="300"></el-table-column>
      <el-table-column prop="mood" label="心情"></el-table-column>
      <el-table-column prop="hot" label="置顶"></el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">切换置顶状态</el-button>
          <el-button size="mini" type="danger" @click="delectData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "Admin-ss",
  data() {
    return {
      form: {
        label: "",
        body: "",
        hot: "",
        moodIconNum: "0",
        mood: ""
      }
    };
  },
  mounted() {},
  methods: {
    setMoodData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get(`${adminUrl}/Ss`, {
              params: this.form
            })
            .then(res => {
              if (res.data.ok) {
                this.form.noteBookData = "";
                alert("说说数据添加成功！");
                this.form.label = "";
                this.form.body = "";
                this.form.hot = "";
                this.form.moodIconNum = "";
                this.form.mood = "";
              }
            });
        } else {
          return false;
        }
      });
    },
    handleEdit(data) {
      let newData = {
        label: data.label,
        hot: data.hot === 1 ? false : true
      };
      this.$axios
        .get(`${adminUrl}/ss/updata`, { params: newData })
        .then(res => {
          if (res.data.ok) {
            alert("置顶状态切换成功");
          } else {
            alert("错误的返回状态");
          }
        })
        .catch(err => {
          console.log("错误:" + err);
        });
    },
    delectData(data) {
      let newData = data.label;
      this.$axios
        .get(`${adminUrl}/ss/delete`, {
          params: { label: newData }
        })
        .then(res => {
          if (res.data.ok) {
            alert("数据删除成功");
          }
        })
        .catch(err => {
          console.log("状态：" + err);
        });
    }
  },
  computed: {
    tabelData() {
      let data = this.$store.state.admin.ssData;
      if (data.length) {
        data.forEach(value => {
          if (value.hot) {
            value.hot = 1;
          } else {
            value.hot = 0;
          }
        });
        return data;
      } else {
        this.$store.dispatch("admin/getSsData");
      }
    }
  }
};
</script>

<style lang="sass" scoped> 
@import '@/assets/default.sass'
.admin-ss
  width: 100%
  .add-list-data
    padding: 20px
    background-color: #fff
    h3
      line-height: 40px
    .title
      width: 100%
      height: 40px
      line-height: 40px
    .body
      margin-top: 10px
    .select
      margin-top: 10px
      @include flex(space-between,center)
      .mood
        @include flex(flex-start,center)
        span
          flex: 0 0 20%
</style>