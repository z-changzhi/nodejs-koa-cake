
const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义订单模型
class OrderMaster extends Model {

}

// 初始订单模型
OrderMaster.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 买家名字
    buyer_name: Sequelize.STRING,
    // 买家电话
    buyer_phone: Sequelize.STRING,
    // 买家地址
    buyer_address: Sequelize.STRING,
    // 买家id
    buyer_id: Sequelize.STRING,
    // 订单金额
    order_amount: Sequelize.DOUBLE(0,2),
    // 买家订单状态
    order_status: Sequelize.INTEGER,
    // 支付状态
    pay_status: Sequelize.INTEGER,

    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }

    }
}, {
    sequelize,
    tableName: 'order_master'
})

module.exports = {
    OrderMaster
}
