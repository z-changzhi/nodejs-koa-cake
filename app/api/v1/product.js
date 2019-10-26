const Router = require('koa-router');

const {
    ProductValidator,
    PositiveIdParamsValidator,
    ProductSearchValidator
} = require('../../validators/product');

const {Auth} = require('../../../middlewares/auth');
const {ProductDao} = require('../../dao/product');
const {CategoryDao} = require('../../dao/category');
const {CommentsDao} = require('../../dao/comments');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 创建商品
 */
router.post('/product', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ProductValidator().validate(ctx);

    // 创建商品
    await ProductDao.createProduct(v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建商品成功');
});

/**
 *  删除产品
 */
router.delete('/product/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取产品ID参数
    const id = v.get('path.id');
    // 删除产品
    await ProductDao.destroyProduct(id);

    ctx.response.status = 200;
    ctx.body = res.success('删除产品成功');
})

/**
 *  更新产品
 */
router.put('/product/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取产品ID参数
    const id = v.get('path.id');
    // 更新产品
    await ProductDao.updateProduct(id, v);

    ctx.response.status = 200;
    ctx.body = res.success('更新产品成功');
})


/**
 *  获取产品列表
 */
router.get('/product', async (ctx) => {
    // 获取页码，排序方法，分类ID，搜索关键字
    const {page, desc, category_id, keyword} = ctx.query;
    // 查询产品列表
    const productList = await ProductDao.getProductList(page, desc, category_id, keyword);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(productList);
});

/**
 * TODO 查询产品详情
 */
router.get('/product/:id', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取产品ID参数
    const id = v.get('path.id');
    // 查询产品
    const product = await ProductDao.getProductDetail(id);

    // 获取关联此产品的分类详情
    // const category = await CategoryDao.getCategory(product.getDataValue('category_id'));
    // 获取关联此产品的评论列表
    // const commentsList = await CommentsDao.getProductComments(id);

    // 更新产品浏览
    await ProductDao.updateProductBrowse(id, ++product.browse);

    // await product.setDataValue('category_detail', category);
    // await product.setDataValue('comments_list', commentsList);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(product);

})


/**
 *  搜索产品
 */
router.get('/search/product', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ProductSearchValidator().validate(ctx);

    // 获取查询产品关键字
    const keyword = v.get('query.keyword');
    // 页码
    const page = v.get('query.page');
    // 排序
    const desc = v.get('query.desc');

    // 查询产品
    const product = await ProductDao.getProductByKeyword(keyword, page, desc);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(product);

})

module.exports = router
