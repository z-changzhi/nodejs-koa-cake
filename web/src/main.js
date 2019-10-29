import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'



import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Tabs,
  TabPane,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tag,
  Icon
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Icon);

Vue.prototype.$message = Message;
Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueLocalStorage);
// Vue.use(VueLocalStorage, {
//   namespace: 'z-changzhi-'
// });

Vue.use(VueLazyLoad, {
  error: '../static/z-changzhi.png',
  loading: '../static/z-changzhi.png'
})

router.beforeEach(async (to, from, next) => {
  // Util.title(to.meta.title)
  let token = Vue.ls.get("token");
  if (token) {
    store.dispatch('admin/auth').then(() => {
      next()

    }).catch(ret => {
      next()
      console.log('admin/auth请求失败')
    })

  } else {
    // 判断是否需要登录
    if (!!to.meta.noAuth) {
      next()

    } else {
      next()
    }
  }
  // // 获取用户信息
  // const z-changzhi_FE_TOKEN = Vue.ls.get('z-changzhi_FE_TOKEN');
  // if (z-changzhi_FE_TOKEN) {

  //   const auth = {
  //     username: z-changzhi_FE_TOKEN
  //   }

  //   try {
  //     await store.dispatch('user/getUserInfo', auth);
  //     await next()

  //   } catch (e) {
  //     await next()
  //   }

    // await next()

  // } else {
    // await next()
  // }

});

router.afterEach(() => {

});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
