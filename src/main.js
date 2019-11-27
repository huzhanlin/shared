import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { imageUrl, videoUrl } from '@/views/admin/url.js'
Vue.use(ElementUI);

Vue.filter('setDate', (date) => {
  if (date) {
    date = date.split('-');
    if (date.length > 1) {
      return date[0] + '.' + date[1] + '.' + date[2].slice(0, 2)
    } else {
      return date.toString()
    }
  }
  // date = new Date(date)
  // return `${date.getFullYear()}.${date.getMonth() +
  //   1}.${date.getDate()}`;
});

Vue.filter('setImageUrl', (image) => {
  let url = `${imageUrl}`
  return `${url}/${image}`;
});

Vue.filter('setVideoUrl', (video) => {
  let url = `${videoUrl}`
  return `${url}/${video}`;
});

Vue.filter('toStringMusicTime', (data) => {
  let minute = data / 1000 / 60 | 0;
  let second = data / 1000 % 60 | 0;
  if (second.toString().length === 1) {
    second = "0" + second
  }
  return `${minute}:${second}`
})

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
