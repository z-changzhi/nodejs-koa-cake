const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义产品模型
class Product extends Model {

}

// 初始产品模型
Product.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 产品-标题
    title: Sequelize.STRING,
    // 产品-描述
    desc: Sequelize.STRING(64),
    // 产品的-标签","分割
    labels: Sequelize.STRING,
    // 产品-每磅价格
    price: Sequelize.DOUBLE(0,2),
    // 产品-该蛋糕的规格","分割
    scales: Sequelize.STRING,
    // 产品封面
    cover: Sequelize.STRING,
    // 产品分类ID
    category_id: {
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
