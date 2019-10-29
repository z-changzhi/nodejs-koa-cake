const {Sequelize, Op} = require('sequelize')


const {ProductDetail} = require('../models/productDetail')
const {Product} = require('../models/product')
const {Category} = require('../models/category')


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
    static async getProductDetailData(id) {
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
    static async getProductDetailByKeyword(keyword, page = 1,desc ) {
        const pageSize = 10;
        desc = desc||'created_at'
        const productDetail = await ProductDetail.findAndCountAll({
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


        const r = productDetail.rows;


        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: productDetail.count,
                total: productDetail.count,
                total_pages: Math.ceil(productDetail.count / 10),
            }
        };
    }

}

module.exports = {
    ProductDetailDao
}
