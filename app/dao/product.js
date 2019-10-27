const {Sequelize, Op} = require('sequelize')


const {Product} = require('../models/product')
const {Category} = require('../models/category')
const {Comments} = require('../models/comments')

// 定义产品模型
class ProductDao {

    // 创建产品
    static async createProduct(v) {

        // 检测是否存在产品
        const hasProduct = await Product.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });

        // 如果存在，抛出存在信息
        if (hasProduct) {
            throw new global.errs.Existing('产品已存在');
        }

        // 创建产品
        const product = new Product();

        product.title = v.get('body.title');
        product.desc = v.get('body.desc');
        product.labels = v.get('body.labels');
        product.price = v.get('body.price');
        product.scales = v.get('body.scales');
        product.cover = v.get('body.cover');
        product.category_id = v.get('body.category_id');

        product.save();
    }

    // 获取产品列表
    static async getProductList(page = 1, desc, category_id, keyword) {
        const pageSize = 10;
        desc = desc||'created_at'
        // 筛选方式
        let filter = {
            deleted_at: null
        };

        // 筛选方式：存在分类ID
        if (category_id) {
            filter.category_id = category_id;
        }

        // 筛选方式：存在搜索关键字
        if (keyword) {
            filter.title = {
                [Op.like]: `%${keyword}%`
            };
        }
        const product = await Product.scope('iv').findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where: filter,
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const productIds = [];
        const r = product.rows;

        /*

                r.forEach(product => {
                    productIds.push(product.id);
                    categoryIds.push(product.category_id);
                });
        */


        // // 获取每篇产品评论
        /*
        const comments = await ProductDao._getProductComments(productIds);
        r.forEach(product => {
            ProductDao._setProductComments(product, comments)
        });
        */

        // 获取每篇产品分类详情
        /*const category = await ProductDao._getProductCategoryDetail(categoryIds);
        r.forEach(product => {
            ProductDao._setProductCategoryDetail(product, category)
        });
*/
        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: product.count,
                total: product.count,
                total_pages: Math.ceil(product.count / 10),
            }
        };
    }

    // 获取每篇产品评论
    static async _getArticleComments(articleIds) {
        return await Comments.scope('bh').findAll({
            where: {
                article_id: {
                    [Op.in]: articleIds
                }
            },
            group: ['article_id'],
            attributes: ['article_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    }

    // 设置每章产品评论总数
    static _setArticleComments(article, comments) {
        let count = 0;
        comments.forEach(item => {
            if (parseInt(article.id) === parseInt(item.article_id)) {
                count = item.get('count')
            }
        })
        article.setDataValue('comments_nums', count);

        return article
    }

    // 获取每篇产品分类详情
    static async _getArticleCategoryDetail(categoryIds) {
        return await Category.scope('bh').findAll({
            where: {
                id: {
                    [Op.in]: categoryIds
                }
            }
        })
    }

    // 设置每章产品分类详情
    static _setArticleCategoryDetail(article, category) {
        category.forEach(item => {
            if (parseInt(article.category_id) === parseInt(item.id)) {
                article.setDataValue('category_detail', item);
            }
        })

        return article
    }


    //  删除产品
    static async destroyProduct(id) {
        // 检测是否存在产品
        const product = await Product.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        // 不存在抛出错误
        if (!product) {
            throw new global.errs.NotFound('没有找到相关产品');
        }

        // 软删除产品
        product.destroy()
    }

    //  更新产品
    static async updateProduct(id, v) {
        // 查询产品
        const product = await Product.findByPk(id);
        if (!product) {
            throw new global.errs.NotFound('更新失败，没有找到相关产品');
        }

        // 更新产品

        product.title = v.get('body.title');
        product.desc = v.get('body.desc');
        product.labels = v.get('body.labels');
        product.price = v.get('body.price');
        product.scales = v.get('body.scales');
        product.cover = v.get('body.cover');
        product.category_id = v.get('body.category_id');

        product.save();
    }

    // 更新产品浏览次数
    /*static async updateProductBrowse(id, browse) {
        // 查询产品
        const product = await Product.findByPk(id);
        if (!product) {
            throw new global.errs.NotFound('没有找到相关产品');
        }
        // 更新产品浏览
        product.browse = browse;

        product.save();
    }*/

    // 产品详情 - 用作数据 回显
    static async getProductDetail(id) {
        const product = await Product.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new global.errs.NotFound('没有找到相关产品');
        }

        return product;
    }

    //  搜索产品
    static async getProductByKeyword(keyword, page = 1,desc ) {
        const pageSize = 10;
        desc = desc||'created_at'
        const product = await Product.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`
                },
                deleted_at: null
            },
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const articleIds = [];

        const r = product.rows;
/*        r.forEach(article => {
            articleIds.push(article.id);
            categoryIds.push(article.category_id);
        });

        // 获取每篇产品评论
        const comments = await ArticleDao._getArticleComments(articleIds);
        r.forEach(article => {
            ArticleDao._setArticleComments(article, comments)
        });

        // 获取每篇产品分类详情
        const category = await ArticleDao._getArticleCategoryDetail(categoryIds);
        r.forEach(article => {
            ArticleDao._setArticleCategoryDetail(article, category)
        });*/

        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: product.count,
                total: product.count,
                total_pages: Math.ceil(product.count / 10),
            }
        };
    }

}

module.exports = {
    ProductDao
}
