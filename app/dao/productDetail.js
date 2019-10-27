const {Sequelize, Op} = require('sequelize')


const {ProductDetail} = require('../models/productDetail')
const {Product} = require('../models/product')
const {Category} = require('../models/category')
const {Comments} = require('../models/comments')

// 定义产品详情模型
class ProductDetailDao {

    // 创建产品详情
    static async createProductDetail(v) {

        // 检测是否存在产品
        const hasProduct = await ProductDetail.findOne({
            where: {
                productId: v.get('body.productId'),
                deleted_at: null
            }
        });

        // 如果存在，抛出存在信息
        if (hasProduct) {
            throw new global.errs.Existing('产品详情已存在，请点击编辑按钮');
        }

        // 创建产品详情
        const productDetail = new ProductDetail();

        productDetail.productId = v.get('body.productId');
        productDetail.detailTitle = v.get('body.detailTitle');
        productDetail.detailDesc = v.get('body.detailDesc');
        productDetail.detailLabels = v.get('body.detailLabels');
        productDetail.sweetness = v.get('body.sweetness');
        productDetail.detailImg = v.get('body.detailImg');
        productDetail.content =v.get('body.content');

        productDetail.save();
    }

    //  更新产品详情
    static async updateProduct(id, v) {
        // 查询产品详情
        const productDetail = await ProductDetail.findOne({
            where: {
                productId:id,
                deleted_at: null
            }
        });
        if (!productDetail) {
            throw new global.errs.NotFound('更新失败，没有找到相关产品详情');
        }

        // 更新产品详情

        // product.productId = v.get('body.productId');
        productDetail.detailTitle = v.get('body.detailTitle');
        productDetail.detailDesc = v.get('body.detailDesc');
        productDetail.detailLabels = v.get('body.detailLabels');
        productDetail.sweetness = v.get('body.sweetness');
        productDetail.detailImg = v.get('body.detailImg');
        productDetail.content =v.get('body.content');

        productDetail.save();
    }

    // 更新产品详情浏览次数
    /*static async updateProductBrowse(id, browse) {
        // 查询产品详情
        const product = await Product.findByPk(id);
        if (!product) {
            throw new global.errs.NotFound('没有找到相关产品详情');
        }
        // 更新产品详情浏览
        product.browse = browse;

        product.save();
    }*/

    // 产品详情详情 - 用作数据 回显
    static async getProductDetail(id) {
        const productDetail = await ProductDetail.findOne({
            where: {
                productId:id
            }
        });

        if (!productDetail) {
            throw new global.errs.NotFound('没有找到相关产品详情');
        }

        return productDetail;
    }

    //  搜索产品详情
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

        // 获取每篇产品详情评论
        const comments = await ArticleDao._getArticleComments(articleIds);
        r.forEach(article => {
            ArticleDao._setArticleComments(article, comments)
        });

        // 获取每篇产品详情分类详情
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




    // 获取每篇产品详情评论
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

    // 设置每章产品详情评论总数
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

    // 获取每篇产品详情分类详情
    static async _getArticleCategoryDetail(categoryIds) {
        return await Category.scope('bh').findAll({
            where: {
                id: {
                    [Op.in]: categoryIds
                }
            }
        })
    }

    // 设置每章产品详情分类详情
    static _setArticleCategoryDetail(article, category) {
        category.forEach(item => {
            if (parseInt(article.category_id) === parseInt(item.id)) {
                article.setDataValue('category_detail', item);
            }
        })

        return article
    }


}

module.exports = {
    ProductDetailDao
}
