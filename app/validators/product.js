const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {Category} = require('../models/category')

class ProductValidator extends LinValidator {
    constructor() {
        super();
        this.title = [new Rule("isLength", "title不能为空", {min: 1})];
        this.desc = [new Rule("isLength", "desc不能为空", {min: 1})];
        this.labels = [new Rule("isLength", "labels不能为空", {min: 1})];
        this.price = [new Rule("isLength", "price不能为空", {min: 1})];
        this.scales = [new Rule("isLength", "scales不能为空", {min: 1})];
        this.cover = [new Rule("isLength", "cover不能为空", {min: 1})];
        this.category_id = [new Rule("isLength", "category_id不能为空", {min: 1})];
    }

    async validateCategoryId(vals) {
        const categoryId = vals.body.category_id;

        const category = await Category.findOne({
            where: {
                id: categoryId
            }
        });

        if (!category) {
            throw new Error('暂无此分类ID')
        }
    }
}

class PositiveIdParamsValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '商品ID需要正整数', {min: 1})
        ]
    }
}

class ProductSearchValidator extends LinValidator {
    constructor() {
        super();
        this.keyword = [
            new Rule('isLength', '必须传入搜索关键字', {min: 1})
        ]
    }
}

module.exports = {
    ProductValidator,
    PositiveIdParamsValidator,
    ProductSearchValidator
}
