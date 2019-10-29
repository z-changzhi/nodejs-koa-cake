import fetch from './fetch';

export default {
  // 获取产品列表
  list(params) {
    return fetch.get('/product', params)
  },

  // 搜索产品列表
  search(params) {
    return fetch.get('/search/product', params)
  },

  // 获取产品详情
  detail(params) {
    const { id } = params;
    delete params.id;
    return fetch.get('/product/' + id, params);
  },
  // 获取产品详情
  productDetail(params) {
    const { id } = params;
    delete params.id;
    return fetch.get('/productDetail/' + id, params);
  },
  // 更新产品
  update(params) {
    const { id } = params;
    delete params.id;
    return fetch.put('/product/' + id, params)
  },


  // 设置产品
  setting(params) {
    const { id } = params;
    delete params.id;
    return fetch.put('/productDetail/' + id, params)
  },

  // 删除产品
  destroy(id) {
    return fetch.delete('/product/' + id)
  },

  // 创建产品
  create(params) {
    return fetch.post('/product', params);
  }
}
