const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {orderMaster} = require('./orderMaster')
// 定义订单详情模型
class orderDetail extends Model {

}

// 初始订单详情模型
orderDetail.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 订单id
    order_id: {
        type:Sequelize.INTEGER
    },
    // 产品id
    product_id: {
        type:Sequelize.INTEGER
    },
    // 产品名称
    product_title: Sequelize.STRING,
    // 产品单价
    product_price: Sequelize.DOUBLE(0,2),
    // 产品数量
    product_quantity: Sequelize.INTEGER,

    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }

    }
}, {
    sequelize,
    tableName: 'order_detail'
})

module.exports = {
    orderDetail
}

