const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义产品模型
class ProductDetail extends Model {

}

// 初始产品模型
ProductDetail.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: Sequelize.INTEGER,
    },
    // 产品详情-标题
    detailTitle: Sequelize.STRING,
    // 产品详情-描述
    detailDesc: Sequelize.STRING(64),
    // 产品详情-标签","分割
    detailLabels: Sequelize.STRING,
    // 产品-该蛋糕的甜度
    sweetness: Sequelize.INTEGER,
    // 产品详情-每磅价格
    // price: Sequelize.DOUBLE,
    // 产品详情-该蛋糕的规格","分割
    // scales: Sequelize.STRING,
    // 详情图片-存储四个src ","分割
    detailImg:Sequelize.TEXT,
    // 产品详情-内容
    content: Sequelize.TEXT,
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
    tableName: 'productDetail'
})

module.exports = {
    ProductDetail
}
