import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 哈斯
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      // 首页
      path: '/',
      component(resolve) {
        require(['../views/index/index.vue'], resolve);
      }
    },
    {
      // 画廊gallery
      path: '/gallery/:id',
      component(resolve) {
        require(['../views/gallery/gallery.vue'], resolve);
      }
    },
    {
      // 购物车
      path: '/orderCart',
      component(resolve) {
        require(['../views/orderCart/orderCart.vue'], resolve);
      }
    },
    {
      // 产品详情
      path: '/product/detail/:id',
      component(resolve) {
        require(['../views/productDetail/productDetail.vue'], resolve);
      }
    }
  ]
})
