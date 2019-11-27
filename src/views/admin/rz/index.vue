<template>
  <div class="admin-rz">
    <el-form class="add-list-data" :model="form" ref="form">
      <h3>发布新日志</h3>
      <el-form-item prop="label" :rules="{ required: true, message: '标题不能为空'}">
        <el-input type="text" v-model="form.label" autocomplete="off" placeholder="请输入日志标题"></el-input>
      </el-form-item>
      <el-form-item class="body" prop="body" :rules="{ required: true, message: '内容不能为空'}">
        <el-input type="textarea" v-model="form.body" placeholder="请输入日志内容"></el-input>
      </el-form-item>
      <div class="select">
        <el-upload
          class="upload-demo"
          action
          list-type="picture"
          :http-request="addAttachment"
          :limit="limitNum"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <div class="hot">
          <el-radio-group v-model="form.hot">
            <el-checkbox label="hot"></el-checkbox>
          </el-radio-group>
        </div>
        <el-form-item>
          <el-button @click="submitForm('form')">上传</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "Admin-rz",
  data() {
    return {
      form: {
        label: "",
        body: "",
        hot: "",
        age: ""
      },
      fileData: {},
      limitNum: 1,
      numberValidateForm: { age: "" }
    };
  },
  methods: {
    addAttachment(file) {
      this.fileData = file.file;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fileFormData = new FormData();
          fileFormData.append("image", this.fileData);
          fileFormData.append("label", this.form.label);
          fileFormData.append("body", this.form.body);
          fileFormData.append("hot", this.form.hot);
          if (!fileFormData.get("image").name) {
            return;
          }
          this.$axios
            .post(`${adminUrl}/rz`, fileFormData)
            .then(res => {
              if (res.data.ok) {
                alert("数据添加成功！");
              }
            })
            .catch(err => {
              if (err) {
                console.log("err：" + err);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped> 
@import '@/assets/default.sass'
.admin-rz
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
</style>