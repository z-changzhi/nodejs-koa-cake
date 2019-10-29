const {Category} = require('../models/category')
const {Product} = require('../models/product')
const {ProductDao} = require('../dao/product')
const {Sequelize, Op} = require('sequelize')

class CategoryDao {
    // 创建分类
    static async createCategory(v) {
        // 查询是否存在重复的分类
        const hasCategory = await Category.findOne({
            where: {
                key: v.get('body.key'),
                deleted_at: null
            }
        });

        if (hasCategory) {
            throw new global.errs.Existing('分类已存在');
        }
        ;

        const category = new Category();
        category.name = v.get('body.name');
        category.key = v.get('body.key');
        category.parent_id = v.get('body.parent_id');

        category.save();
    }

    // 删除分类
    static async destroyCategory(id) {
        // 查询分类
        const category = await Category.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');

        }
        category.destroy()
    }

    // 获取分类详情
    static async getCategory(id) {
        const category = await Category.scope('bh').findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }

        return category
    }

    // 更新分类
    static async updateCategory(id, v) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        category.name = v.get('body.name');
        category.key = v.get('body.key');
        category.parent_id = v.get('body.parent_id');

        category.save();
    }

    // 分类列表
    static async getCategoryList() {
        const category = await Category.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        });

        // 统计每个分类下有多个产品
        const ids = [];
        category.forEach(item => {
            ids.push(item.id);
        });
        const product = await CategoryDao._getProduct(ids);

        category.forEach(item => {
            CategoryDao._setProduct(item, product)
        })

        return category;

    }

    // 获取每个分类下有多个产品
    static async _getProduct(ids) {
        return await Product.scope('bh').findAll({
            where: {
                category_id: {
                    [Op.in]: ids
                }
            },
            group: ['category_id'],
            attributes: ['category_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    }

    // 设置每个分类下个产品总数
    static _setProduct(category, product) {
        let count = 0;
        product.forEach(item => {
            if (parseInt(category.id) === parseInt(item.category_id)) {
                count = item.get('count')
            }
        })
        category.setDataValue('product_nums', count);

        return category
    }

    // 获取一个分类下个产品
    static async getCategoryProduct(category_id, page = 1, desc = 'created_at') {
        const pageSize = 10;

        const product = await Product.scope('iv').findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where: {
                deleted_at: null,
                category_id
            },
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const productIds = [];

        const r = product.rows;
        r.forEach(product => {
            productIds.push(product.id);
            categoryIds.push(product.category_id);
        });


        // 获取每个产品分类详情
        const category = await ProductDao._getProductCategoryDetail(categoryIds);
        r.forEach(product => {
            ProductDao._setProductCategoryDetail(product, category)
        });

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
    CategoryDao
}