const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [
      {
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {module: "/", title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },

      //todo: 管理员
      {
        path: 'admin',
        name: 'admin',
        meta: {module: "/admin", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },


      //todo: 分类管理
      {
        path: 'category',
        name: 'category',
        meta: {module: "/category", group: "category", title: '分类 - 列表'},
        component: (resolve) => require(['../views/category/list.vue'], resolve),
      },
      {
        path: 'category/create',
        name: 'category/create',
        meta: {module: "/category/create", group: "category", title: '分类 - 创建'},
        component: (resolve) => require(['../views/category/create.vue'], resolve),
      },
      {
        path: 'category/update/:id',
        name: 'category/update',
        meta: {edit: true, module: "/category", group: "category", title: '分类 - 更新'},
        component: (resolve) => require(['../views/category/update.vue'], resolve),
      },
      //todo: 商品管理 product
      {
        path: 'product',
        name: 'product',
        meta: {module: "/product", group: "product", title: '分类 - 列表'},
        component: (resolve) => require(['../views/product/list.vue'], resolve),
      },
      {
        path: 'product/create',
        name: 'product/create',
        meta: {module: "/product/create", group: "product", title: '分类 - 创建'},
        component: (resolve) => require(['../views/product/create.vue'], resolve),
      },
      {
        path: 'product/update/:id',
        name: 'product/update',
        meta: {edit: true, module: "/product", group: "product", title: '分类 - 更新'},
        component: (resolve) => require(['../views/product/update.vue'], resolve),
      },
      {
        path: 'product/setting/:id',
        name: 'product/setting',
        meta: {edit: true, module: "/product", group: "product", title: '分类 - 设置'},
        component: (resolve) => require(['../views/product/setting.vue'], resolve),
      },
      {
        //todo: 404
        path: '*',
        name: '404',
        meta: {module: "/", title: '404 - 页面不存在'},
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
