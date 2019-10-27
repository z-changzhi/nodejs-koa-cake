const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {Category} = require('../models/category')
const {Product} = require('../models/product')


class ProductDetailValidator extends LinValidator {
    constructor() {
        super();
        this.productId = [new Rule("isLength", "productId不能为空", {min: 1})];
        this.detailTitle = [new Rule("isLength", "detailTitle不能为空", {min: 1})];
        this.detailDesc = [new Rule("isLength", "detailDesc不能为空", {min: 1})];
        this.detailLabels = [new Rule("isLength", "detailLabels不能为空", {min: 1})];
        this.sweetness = [new Rule("isLength", "sweetness不能为空", {min: 1})];
        this.detailImg = [new Rule("isLength", "detailImg不能为空", {min: 1})];
        this.content = [new Rule("isLength", "content不能为空", {min: 1})];
    }

    async validateCategoryId(vals) {
        const productId = vals.body.productId;

        const category = await Product.findOne({
            where: {
                id: productId
            }
        });

        if (!category) {
            throw new Error('暂无此商品ID')
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
    ProductDetailValidator,
    PositiveIdParamsValidator,
    ProductSearchValidator
}
