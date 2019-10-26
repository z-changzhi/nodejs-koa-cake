const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义文章模型
class Product extends Model {

}

// 初始文章模型
Product.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 产品标题
    title: Sequelize.STRING,
    // 卖家联系方式
    call: Sequelize.STRING(64),
    // 产品描述
    desc: Sequelize.STRING(64),
    // 产品价格
    price: Sequelize.INTEGER,
    // 产品图片
    cover: Sequelize.STRING,
    // 产品分类ID
    category_id: Sequelize.STRING,
    // 产品浏览次数
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    tableName: 'product'
})

module.exports = {
    Product
}
