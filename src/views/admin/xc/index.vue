<template>
  <div class="admin-xc">
    <el-form class="add-list-data" ref="form" :model="form">
      <h3>添加图片</h3>
      <el-form-item class="title" prop="label" :rules="{ required: true, message: '标题不能为空'}">
        <el-input type="text" v-model="form.label" placeholder="请输入相册标题" />
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
          <el-select v-model="form.inits">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-form-item>
          <el-button @click="setXcData('form')">上传</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "Admin-xc",
  data() {
    return {
      form: {
        label: "",
        inits: "个人相册"
      },
      fileData: {},
      options: [
        {
          label: "个人相册",
          value: "个人相册"
        },
        {
          label: "精彩瞬间",
          value: "精彩瞬间"
        },
        {
          label: "人生历程",
          value: "人生历程"
        },
        {
          label: "私密照片",
          value: "私密照片"
        }
      ],
      limitNum: 1
    };
  },
  methods: {
    addAttachment(file) {
      this.fileData = file.file;
    },
    setXcData(formName) {        
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fileFormData = new FormData();
          fileFormData.append("image", this.fileData);
          fileFormData.append("label", this.form.label);
          fileFormData.append("inits", this.form.inits);
          if (!fileFormData.get("image").name) {
            return;
          }
          this.$axios
            .post(`${adminUrl}/xc`, fileFormData)
            .then(res => {
              if (res.data.ok) {
                alert("相册数据添加成功！");
                this.fileData = "";
                this.form.label = "";
                this.form.inits = "个人相册";
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
.admin-xc
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