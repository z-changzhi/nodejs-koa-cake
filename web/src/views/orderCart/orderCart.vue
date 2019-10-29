<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="shop-list">
      <table
        class="table"
        width="1200"
        cellpadding="0"
        cellspacing="0"
      >
        <thead class="thead">
          <tr>
            <th width="400">商品</th>
            <th width="140">生日牌</th>
            <th width="140">单价</th>
            <th width="140">数量</th>
            <th width="140">金额</th>
            <th width="140">删除</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cart,index) in cartList"
            :key="index"
          >
            <td class="table-td-1">
              <div>
                <img
                  :src="cart.cover"
                  alt
                />
                <span class="h4">{{cart.title}}</span>
                <span>{{cart.title}}</span>
              </div>
            </td>
            <td>{{cart.labels}}</td>
            <td>¥{{changeNumber(cart.price)}}</td>
            <td>
              <div
                @click="action_cart(index,'reduce_db')"
                class="btn-sub"
              >-</div>
              {{cart.num}}
              <div
                @click="action_cart(index,'add_db')"
                class="btn-add"
              >+</div>
            </td>
            <td class="price">¥{{changeNumber(cart.price*cart.num)}}</td>
            <td>
              <div
                @click="action_cart(index,'delete_db')"
                class="btn-delete"
                title="删除"
              >x</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <shop-info></shop-info>
  </div>
</template>

<script>
// import List from './List'
import Info from "./orderInfo";

export default {
  components: {
    // shopList:List,
    shopInfo: Info
  },
  name: "cart-list",
  computed: {
    cartList() {
      // console.log('cart.vue computed cartlist');
      // console.log(this.$store.getters.getCartList);

      return this.$store.getters.getCartList;
    }
  },

  methods: {
    /**
     * 购物车加减删操作
     * @param  {number} index 当前操作的索引
     * @param  {string} type  对应的mutations值
     * @param  {string} type=add_db  增加
     * @param  {string} type=reduce_db  减少
     * @param  {string} type=delete_db  删除
     */
    action_cart(index, type) {
      //先更新当前索引
      this.$store.dispatch("update_cur_shop_status", {
        index
      });

      //执行更新state动作
      this.$store.dispatch(type);
    },
    changeNumber(num) {
      num += "";
      num = num.replace(/[^0-9|\.]/g, ""); //清除字符串中的非数字非.字符

      if (/^0+/)
        //清除字符串开头的0
        num = num.replace(/^0+/, "");
      if (!/\./.test(num))
        //为整数字符串在末尾添加.00
        num += ".00";
      if (/^\./.test(num))
        //字符以.开头时,在开头添加0
        num = "0" + num;
      num += "00"; //在字符串末尾补零
      num = num.match(/\d+\.\d{2}/)[0];
      return num;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.shop-list {
  // ul{
  //   li{
  //     list-style: none;
  //     display: inline-block;
  //   }
  // }
  // border: 1px solid #600;
  padding-bottom: 45px;
  .table {
    // border: 1px solid #600;
    // text-align: center;
    .thead {
      background-color: #fafafa;

      height: 44px;
    }
    tbody {
      // background-color: #600;
      // padding-top: 20px;
      top: 25px;
      position: relative;
    }
  }

  th {
    text-align: center;

    // margin-right: 10px;
    // margin-bottom: 20px;
  }
  tr {
    text-align: center;
    color: #442919;
    .table-td-1 {
      color: #442919;
      font-size: 14px;
      font-weight: 400;
      position: relative;
      text-align: left;
      img {
        position: relative;
        left: 30px;
        border: 1px #ccc solid;
        display: inline-block;
        height: 80px;
        width: 80px;
      }
      .h4 {
        font-size: 18px;
        font-weight: bold;
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        color: #684029;
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 124px;
        text-decoration: none;
        outline: none;
        cursor: pointer;
      }
      span {
        color: #d5bfa7;
        display: inline-block;
        text-decoration: none;
        position: absolute;
        top: 40px;
        left: 124px;
        outline: none;
        cursor: pointer;
      }
    }
    td {
      vertical-align: middle;
      .btn-sub {
        // background: #990;
        border: 1px solid #aaa;
        width: 20px;
        height: 20px;
        line-height: 20px;
        display: inline-block;
        cursor: pointer;
      }
      .btn-add {
        // background: #990;
        border: 1px solid #aaa;
        width: 20px;
        height: 20px;
        line-height: 20px;
        display: inline-block;
        cursor: pointer;
      }
      .btn-delete {
        border: 1px solid #aaa;
        width: 30px;
        height: 30px;
        display: inline-block;
        line-height: 30px;
        cursor: pointer;
      }
    }

    .price {
      color: #a00;
    }
  }
}

.order-wrap {
  width: 1200px;
  min-height: 400px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
/* 标题栏开始 */
.cart-goods-info {
  text-align: left;
  width: 1200px;
  margin-top: 32px;
  font-size: 13px;
}

.cart-goods-info .thead-ul {
  background: #fafafa;
  font-size: 13px;
  width: 1200px;
  overflow: hidden;
  line-height: 44px;
  border: 1px solid #e1e1e1;
}
.cart-goods-info .thead-ul li {
  height: 44px;

  float: left;
}
.cart-goods-info .goods-ti {
  width: 285px;

  margin-left: 166px;
}
.cart-goods-info .birthday-card-ti,
.cart-goods-info .select-birthday {
  width: 300px;

  position: relative;
}
.cart-goods-info .number-ti,
.cart-goods-info .number-li {
  width: 150px;
}
.cart-goods-info .unit-Price,
.cart-goods-info .cart-unit-Price {
  width: 150px;

  position: relative;
}
.cart-goods-info .money-ti {
  width: 130px;
}
/* 标题栏结束 */
</style>
