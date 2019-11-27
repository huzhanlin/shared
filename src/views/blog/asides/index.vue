<template>
  <div class="asides">
    <div class="qd">
      <button class="qd-date" :disabled="disabled" @click="qd()">
        <p>{{time}}</p>
        <p>{{qdData}}</p>
      </button>
      <div class="qd-number">
        <p>总签到次数</p>
        <p>{{qdNum}}</p>
      </div>
    </div>
    <div class="declaration">
      <h1>个人宣言</h1>
      <p>{{zymData}}</p>
    </div>
    <div class="noteBook">
      <h1>记事本</h1>
      <ul>
        <li v-for="data in jsbData" :key="data.id">
          <p>{{data.text}}</p>
          <p>{{data.flogs}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { adminUrl } from "../../admin/url.js";
export default {
  name: "asides",
  data() {
    return {
      time: "",
      disabled: true,
      qdNum: 0
    };
  },
  mounted() {
    this.getzymData();
    this.getjsbData();
    this.dateInit();
    this.getNowDate();
  },
  methods: {
    getNowDate() {
      this.$store.dispatch("admin/getqdData");
    },
    dateInit() {
      let date = new Date();
      let timeData = `${date.getFullYear()}.${date.getMonth() +
        1}.${date.getDate()}`;
      this.time = timeData;
    },
    getzymData() {
      this.$store.dispatch("admin/getzymData");
    },
    getjsbData() {
      this.$store.dispatch("admin/getjsbData");
    },
    qd() {
      this.$axios.get(`${adminUrl}/bk/qd`).then(res => {
        if (res.data.ok) {
          alert("数据添加成功！");
          this.disabled = true;
          this.getNowDate();
        }
      });
    }
  },
  computed: {
    qdData() {
      let data = this.$store.state.admin.qdData;
      if (data.length) {
        this.qdNum = data.length;
        let timeData = data[0].date.split("-");
        timeData =
          timeData[0] + "." + timeData[1] + "." + timeData[2].slice(0, 2);

        if (timeData === this.time) {
          this.disabled = true;
          return "已签到";
        } else {
          this.disabled = false;
          return "签到";
        }
      } else {
        this.disabled = false;
        return "签到";
      }
    },
    zymData() {
      let data = this.$store.state.admin.zymData;
      if (data.text) {
        return data.text;
      }
    },
    jsbData() {
      let data = this.$store.state.admin;
      if (data.jsbData) {
        return data.jsbData;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/default.sass'
.asides
  width: 100%
  .declaration, .noteBook
    background-color: #fff
    width: 100%
    margin-top: 10px
    overflow: hidden
    padding: 5px
    >h1
      border-left: 10px solid rgba(46, 176, 55, 0.8)
      padding-left: 10px
      height: 19px
      line-height: 19px
      font-size: 19px
      margin: 10px 0
  .declaration
    width: 100%
    p
      line-height: 30px
      padding: 20px
      text-indent: 1em
  .noteBook
    width: 100%
    >ul
      width: 100%
      padding: 0 20px
      >li
        width: 100%
        padding: 10px 0
        line-height: 25px
        border-bottom: 1px solid #dcdcdc
        @include flex(space-between,center)
        >p
          flex: 1          
          &:last-child
            flex: 0 0 20%
            text-align: right
            color: #eb2001
        &:last-child
          border-bottom: none
  .qd
    width: 100%
    height: 80px
    background-color: #fff
    @include flex(flex-start,flex-start)
    .qd-date
      flex: 0 0 30%
      height: 100%
      background-color: #f5d0dc
      cursor: pointer
      @include align(center)
      p
        line-height: 20px
        flex: 0 0 100%
        text-align: center
        color: #c35673
        &:last-child
          font-size: 16px
    .qd-number
      flex: 1
      height: 100%
      @include align(center)
      >p
        flex: 0 0 100%
        line-height: 30px
        padding-left: 20%
        color: #c35673
        &:last-child
          font-size: 16px
      &:hover
        background-color: #F56C6C
        >p
          color: #fff
</style>