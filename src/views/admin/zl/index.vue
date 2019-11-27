<template>
  <div class="admin-ss">
    <el-form class="jbxx" ref="form01" :model="form01">
      <el-form-item label="年龄">
        <el-input-number :min="30" :max="100" v-model="form01.age" />
      </el-form-item>
      <el-form-item prop="address" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form01.address" placeholder="现住地址" />
      </el-form-item>
      <el-form-item prop="gzjy" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form01.gzjy" placeholder="工作经验" />
      </el-form-item>
      <el-form-item prop="intro" :rules="{ required: true, message: '不能为空'}">
        <el-input type="teaxarea" v-model="form01.intro" placeholder="自我介绍" />
      </el-form-item>
      <el-form-item>
        <el-button @click="updataGrzl('form01')">修改个人资料</el-button>
      </el-form-item>
    </el-form>
    <el-form class="jns">
      <div>
        <span>javaScript:</span>
        <el-input-number :min="1" :max="10" v-model="form02.javaScript" />
      </div>
      <div>
        <span>css3:</span>
        <el-input-number :min="1" :max="10" v-model="form02.css3" />
      </div>
      <div>
        <span>Vue:</span>
        <el-input-number :min="1" :max="10" v-model="form02.Vue" placeholder="Vue" />
      </div>
      <div>
        <span>sass:</span>
        <el-input-number :min="1" :max="10" v-model="form02.sass" placeholder="Sass" />
      </div>
      <div>
        <span>node:</span>
        <el-input-number :min="1" :max="10" v-model="form02.node" placeholder="Node" />
      </div>
      <div>
        <span>webpack:</span>
        <el-input-number :min="1" :max="10" v-model="form02.webpack" placeholder="Webpack" />
      </div>
      <div>
        <span>ElementUI:</span>
        <el-input-number :min="1" :max="10" v-model="form02.ElementUI" placeholder="ElementUI" />
      </div>
      <div>
        <span>photoShop:</span>
        <el-input-number :min="1" :max="10" v-model="form02.photoShop" placeholder="photoShop" />
      </div>
      <div>
        <span>es6:</span>
        <el-input-number :min="1" :max="10" v-model="form02.es6" placeholder="es6" />
      </div>
      <div>
        <el-button @click="setjnsData">更新技能树</el-button>
      </div>
    </el-form>
    <el-form class="gzjy" :model="form03" ref="form03">
      <el-form-item prop="gzzw" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.gzzw" placeholder="请输入工作职位"></el-input>
      </el-form-item>
      <el-form-item prop="gsmc" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.gsmc" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item prop="gslx" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.gslx" placeholder="请输入公司类型"></el-input>
      </el-form-item>
      <el-form-item prop="gsgm" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.gsgm" placeholder="请输入公司规模(200-500)"></el-input>
      </el-form-item>
      <el-form-item prop="zwms" :rules="{ required: true, message: '不能为空'}">
        <el-input type="textarea" v-model="form03.zwms" placeholder="请输入职位描述"></el-input>
      </el-form-item>
      <el-form-item prop="qita" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.qita" placeholder="其他信息(兼职/全职)"></el-input>
      </el-form-item>
      <el-form-item prop="rzsj" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.rzsj" placeholder="入职时间(2019-11)"></el-input>
      </el-form-item>
      <el-form-item prop="lzsj" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form03.lzsj" placeholder="离职时间(至今)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addgzjy('form03')">添加工作经验</el-button>
      </el-form-item>
    </el-form>
    <el-form class="xmjy" :model="form04" ref="form04">
      <el-form-item prop="lxsj" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form04.lxsj" placeholder="项目立项(2019-6)"></el-input>
      </el-form-item>
      <el-form-item prop="wjsj" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form04.wjsj" placeholder="项目完结(2019-11)"></el-input>
      </el-form-item>
      <el-form-item prop="bt" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form04.bt" placeholder="项目标题"></el-input>
      </el-form-item>
      <el-form-item prop="zz" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form04.zz" placeholder="项目职责"></el-input>
      </el-form-item>
      <el-form-item prop="ms" :rules="{ required: true, message: '不能为空'}">
        <el-input type="text" v-model="form04.ms" placeholder="项目描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addxmjy('form04')">添加项目经验</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { adminUrl } from "../url.js";
export default {
  name: "Admin-zl",
  data() {
    return {
      form01: {
        age: "",
        address: "",
        gzjy: "",
        intro: ""
      },
      form02: {
        javaScript: "",
        css3: "",
        Vue: "",
        sass: "",
        node: "",
        webpack: "",
        ElementUI: "",
        photoShop: "",
        es6: ""
      },
      form03: {
        gzzw: "",
        gsmc: "",
        gslx: "",
        gsgm: "",
        zwms: "",
        qita: "",
        rzsj: "",
        lzsj: ""
      },
      form04: {
        wjsj: "",
        lxsj: "",
        bt: "",
        zz: "",
        ms: ""
      }
    };
  },
  methods: {
    updataGrzl(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get(`${adminUrl}/zl`, {
              params: this.form01
            })
            .then(res => {
              if (res.data.ok) {
                alert("个人资料添加成功！");
                this.form01.age = "";
                this.form01.address = "";
                this.form01.gzjy = "";
                this.form01.intro = "";
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
    },
    setjnsData() {
      let newData = {};
      let data = this.form02;
      for (let value in data) {
        if (data[value] !== 1) {
          newData[value] = data[value];
        }
      }

      this.$axios
        .get(`${adminUrl}/zl/zlJns`, {
          params: newData
        })
        .then(res => {
          if (res.data.ok) {
            alert("技能树修改成功！");
          }
        })
        .catch(err => {
          if (err) {
            console.log("err：" + err);
          }
        });
    },
    addgzjy(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get(`${adminUrl}/zl/zlgzjy`, {
              params: this.form03
            })
            .then(res => {
              if (res.data.ok) {
                alert("工作经验添加成功！");
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
    },
    addxmjy(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get(`${adminUrl}/zl/xmjy`, {
              params: this.form04
            })
            .then(res => {
              if (res.data.ok) {
                alert("项目经验添加成功！");
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
.admin-ss
  width: 100%
  .jbxx
    width: 100%
    background-color: #fff
    padding: 20px
    >div
      margin-top: 10px
  .jns
    margin-top: 10px
    width: 100%
    background-color: #fff
    padding: 20px
    >div
      margin-top: 10px
      @include flex(flex-start,center)
      >span
        flex: 0 0 20%
        text-align: right
        padding-right: 10px
  .gzjy
    margin-top: 10px
    width: 100%
    background-color: #fff
    padding: 20px
    >div
      margin-top: 10px
  .xmjy
    margin-top: 10px
    width: 100%
    background-color: #fff
    padding: 20px
    >div
      margin-top: 10px
</style>