import product from '../../api/product'

const state = {}
const mutations = {}
const actions = {
  // 获取商品列表
  async getProductList({ state, commit }, params) {
    return product.list(params);
  },

  // 获取商品详情
  async getProduct({ state, commit }, params) {
    return product.detail(params);
  },

  // 获取 商品详情
  async getProductDetail({ state, commit }, params) {
    return product.productDetail(params);
  },
  
  // 创建商品
  async createProduct({ state, commit }, params) {
    return product.create(params);
  },

  // 更新商品
  async updateProduct({ state, commit }, params) {
    return product.update(params);
  },

  // 设置商品详情
  async settingProduct({ state, commit }, params) {
    return product.setting(params);
  },

  // 删除商品
  async destroyProduct({ state, commit }, id) {
    return product.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
