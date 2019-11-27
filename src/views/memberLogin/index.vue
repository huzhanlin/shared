<template>
  <div class="personal-center">
    <div class="navs">
      <router-link v-for="data in navsData" :key="data.to" :to="data.to">{{data.label}}</router-link>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal-center",
  data() {
    return {
      navsData: [
        {
          label: "注册",
          to: "register"
        },
        {
          label: "登录",
          to: "login"
        },
        {
          label: "修改密码",
          to: "updataPassword"
        },
        // {
        //   label: "激活账号",
        //   to: "activation"
        // }
      ]
    };
  }
};
</script>

<style scoped lang="sass">
@import '@/assets/default.sass'
.personal-center
  width: 100%
  height: 95vh
  .navs
    width: 500px
    height: 40px
    margin: 40px auto
    background-color: #fff
    @include flex(cenrter,center)
    box-shadow: 0px 2px 10px rgba(0,0,0,.3)
    >a
      flex: 1
      height: 100%
      @include flex(center,center)
      border-right: 1px solid #dcdcdc
      &:last-child
        border-right: none
      &:hover:not(.router-link-active)
        background-color: #666
        color: #fff
    .router-link-active
      background-color: #333
      color: #fff
</style>