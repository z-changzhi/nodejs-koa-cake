<template>
  <div class="list-box">
    <router-link :to="{path: `/product/detail/${product.id}`}">
      <a href="#">
        <img :src="product.cover" alt />
      </a>
    </router-link>
    <a class="box-1" href="#">{{product.title}}</a>
    <a class="box-2" href="#">{{product.desc}}</a>
    <div class="box-3">
      <a v-for="(item,index) in product.labels.split(',')" href="#" :key="index">{{item}}&nbsp;></a>
    </div>
    <div class="cart-info">
      <span>¥{{product.price}}/{{product.scales.split(',')[0]*454}}g({{product.scales.split(',')[0]}})磅</span>
      <a
        href="javascript:void(0);"
        class="add-cart"
        name="add_cart_1_1095"
        data-id="1095"
        @click="changeCart"
      >加入购物车</a>
    </div>
    <!-- 冒泡 -->
    <my-dialog :is-show="isCart" @on-close="closeDialog('isCart')">
      <div class="spec-detail" style="display: block;">
        <div class="spec-title">￥298.00/454g(1.0磅)</div>
        <div class="spec-info">
          <a
            href="javascript:void(0);"
            class="active"
            data-product="9392"
            data-price="198.00"
            data-spec="6个（6种口味）"
          >
            <span>440g</span>(1.0磅)
            <i></i>
          </a>
        </div>
        <div class="product-buttons">
          <div class="buttons-button-L" @click="add_db(product)">
            <router-link class="link" :to="{path: 'orderCart?id=' + product.id}">立即购买</router-link>
          </div>

          <div class="buttons-button-R" @click="add_db(product)">
            <router-link class="link" :to="{path: 'orderCart?id=' + product.id}">加入购物车</router-link>
          </div>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from "./base/dialog";
export default {
  components: {
    MyDialog: Dialog
  },
  props: {
    product: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      isCart: false,
      shop: {
        id: 1,
        name: "家常面包套餐",
        price: 12
      }
      // shop_list: [
      //   {
      //     id: 1,
      //     name: "家常面包套餐",
      //     price: 12
      //   },
      //   {
      //     id: 2,
      //     name: "宫保鸡丁",
      //     price: 14.01
      //   },
      //   {
      //     id: 3,
      //     name: "土豆丝",
      //     price: 10.02
      //   },
      //   {
      //     id: 4,
      //     name: "米饭",
      //     price: 2.1
      //   }
      // ]
    };
  },
  // mounted() {
  //   /**
  //    * 初始化时把购物车的菜品数量绑定到菜品列表中
  //    */
  //   var list = this.$store.state.cart.cartList;
  //   for (var i = 0; i < this.shop_list.length; i++) {
  //     for (var j = 0; j < list.length; j++) {
  //       if (list[j].id == this.shop_list[i].id) {
  //         //这种赋值属性的方式，初始化完成时，无法从state同步到列表
  //         // this.$set(this.shop_list[i], 'num', list[j].num);

  //         //通过直接赋值对象，造成对象引用，从而改变state时,达到自动同步列表数据目的
  //         this.$set(this.shop_list, i, list[j]);
  //         break;
  //       }
  //     }
  //   }

  //   // console.log(this.shop_list[0].num);
  //   // console.log(this.shop_list[1].num);
  // },
  // mounted() {
  //   /**
  //    * 初始化时把购物车的菜品数量绑定到菜品列表中
  //    */
  //   var list = this.$store.state.cart.cartList;
  //   for (var i = 0; i < this.shop_list.length; i++) {
  //     for (var j = 0; j < list.length; j++) {
  //       if (list[j].id == this.shop_list[i].id) {
  //         //这种赋值属性的方式，初始化完成时，无法从state同步到列表
  //         // this.$set(this.shop_list[i], 'num', list[j].num);

  //         //通过直接赋值对象，造成对象引用，从而改变state时,达到自动同步列表数据目的
  //         this.$set(this.shop_list, i, list[j]);
  //         break;
  //       }
  //     }
  //   }

  //   // console.log(this.shop_list[0].num);
  //   // console.log(this.shop_list[1].num);
  // },
  methods: {
    changeCart() {
      this.isCart = !this.isCart;
    },
    closeDialog(attr) {
      this[attr] = false;
    },
    add_db(shop) {
      this.isCart = !this.isCart;
      var id = shop.id;

      //检测是否存在购物车中,如果存在修改state.curState为true,并设置state.curIndex为当前菜品在购物车中的索引
      this.$store.dispatch("check_db", {
        id
      });

      //如果存在,先自增当前菜品中的num，再设置购物车的数量
      //如果不存在，直接往购物车中push一个新的菜品
      if (this.$store.state.cart.curIndex != -1) {
        console.log("add_db");
        this.$store.dispatch("add_db");
      } else {
        console.log("create_db");
        this.$set(shop, "num", 1);
        this.$store.dispatch("create_db", {
          shop
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #111;
}
.list-box {
  width: 263px;
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: inline-block;
  // margin-left: -20px;

  // border: 1px #aa0 solid;
  position: relative;
  left: 0px;
  /* width: 24%; */
  /* border: 1px #aa0 solid; */
  img {
    width: 100%;
    background: #f9f9f9;
  }
  .box-1 {
    display: block;
    height: 23px;
    line-height: 23px;
    font-size: 18px;
    /* border: 1px #aa0 solid; */
  }
  .box-2 {
    display: block;
    height: 23px;
    line-height: 23px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
    /* border: 1px #aa0 solid; */
  }
  .box-3 {
    display: block;
    /* height: 23px; */
    line-height: 23px;
    font-size: 14px;
    color: #666;
    /* border: 1px #aa0 solid; */
    a {
      display: inline-block;
      padding: 0px 10px 0px 10px;
      margin: 8px 5px 8px 0px;
      border-radius: 20px;
      // height: 17px;
      line-height: 17px;
      font-size: 14px;
      color: #666;
      border: 1px #bb9772 solid;
      color: #bb9772;
    }
  }
  .cart-info {
    border-top: 1px dashed #d5bfa7;
    height: 30px;
    color: #b0986f;
    margin-top: 0px;
    padding-top: 0px;
    -webkit-font-smoothing: antialiased;
    position: relative;
    .spec {
      display: block;
      line-height: 14px;
      color: #bb9772;
      font-size: 14px;
      position: absolute;
      left: 0;
      bottom: 4px;
      max-width: 165px;
    }
    .add-cart {
      display: block;
      line-height: 20px;
      font-size: 12px;
      background: #643e28;
      color: #fff;
      padding: 0 10px;
      position: absolute;
      right: 0;
      bottom: 0px;
    }
  }
}
.spec-detail {
  position: absolute;
  box-sizing: border-box;
  padding: 12px;
  background: #fafafa;
  width: 100%;
  bottom: 0;
  left: 0;
  display: none;
  z-index: 1001;
  /* border: 2px #a00 solid; */
  .spec-title {
    font-size: 16px;
    color: #684029;
  }

  .spec-info {
    padding: 10px 0;
    a {
      display: inline-block;
      box-sizing: border-box;
      font-size: 12px;
      color: #7a5844;
      border: 1px solid #d0c3bb;
      padding: 2px 8px;
      min-width: 55px;
      text-align: center;
      margin: 2px;
      position: relative;
      line-height: 14px;
      span {
        display: block;
        text-align: center;
        width: 100%;
        height: 14px;
      }
    }
  }
}
// .spec-detail
/* .spec-detail .spec-info a li {
  display: block;
  height: 10px;
  width: 10px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(/themes/site/img/icon.png) no-repeat;
  background-position-x: 0%;
  background-position-y: 0%;
  background-size: auto;
  background-position: 0px -40px;
  background-size: 310px 120px;
} */
.spec-detail .spec-info a:active {
  border: 1px solid #684029;

  color: #684029;
}
.product-buttons {
  color: #684029;
  font-size: 12px;
  .buttons-button-L {
    float: left;
    .link {
      width: 200px;
      // border: 2px #a00 solid;
      text-decoration: none;
      color: #555555;
    }
    display: inline-block;
    position: relative;
    width: 90px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #fff;
    color: #7a5844;
    cursor: pointer;
  }
  .buttons-button-R {
    float: right;
    .link {
      width: 200px;
      // border: 2px #a00 solid;
      text-decoration: none;
      color: #f1f1f1;
    }
    // margin-right:20px;
    // border: 2px #aaa solid;
    display: inline-block;
    position: relative;
    width: 90px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #7a5844;
    color: #fff;
    cursor: pointer;
  }
}
</style>