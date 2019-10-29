<template>
  <div class="pro">
    <a href="####">
      <img
        :src="product.cover"
        width="228px"
        height="246px"
        alt="wu"
      />
      <h3>{{product.title}}</h3>
      <span>¥{{product.price}}/{{product.scales.split(',')[0]*454}}g({{product.scales.split(',')[0]}})磅</span>
    </a>

    <div class="label">
      <a
        v-for="(item,index) in product.labels.split(',')"
        href="#"
        :key="index"
      >{{item}}&nbsp;></a>
      <!-- <a href="####">情侣 &gt;</a>
          <a href="####">人气 &gt;</a>
      <a href="####">生日 &gt;</a>-->
    </div>
    <div @click="add_db(product)">
      <router-link
        class="cakebus"
        :to="{path: '../orderCart?goodsId=' + product.id}"
      >
        <i></i>
        加入购物车
      </router-link>
    </div>
    <!-- <div class="buttons-button-R" @click="add_db(product)">
      <router-link class="link" :to="{path: 'orderCart?goodsId=' + product.goodsId}">加入购物车</router-link>
    </div>-->
    <!-- <div class="buttons-button-R" @click="add_db(product)">
            <router-link class="link" :to="{path: 'orderCart?goodsId=' + product.goodsId}">加入购物车</router-link>
    </div>-->
  </div>
</template>

<script>
// import slideShow from "../components/slideShow";
import Dialog from "../../components/base/dialog";
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
    return {};
  },
  methods: {
    changeCart() {
      this.isCart = !this.isCart;
    },
    closeDialog(attr) {
      this[attr] = false;
    },
    add_db(shop) {
      // this.isCart = !this.isCart;
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

<style scoped lang='scss'>
a {
  text-decoration: none;
  color: #684029;
}
a:hover {
  color: #bb9772;
}
/*neirong*/
.content-img ul li {
  list-style: none;
  float: left;
  padding: 0 18px;
  margin: 0 18px 18px 0px;
  position: relative;
  display: inline-block;
  .pro {
    width: 228px;
    text-align: center;
    height: 364px;
    position: relative;
    img {
      width: 228px;
      height: 246px;
    }
    h3 {
      font-size: 13px;
      line-height: 20px;
    }
    span {
      display: block;
      color: #bb9772;
      line-height: 18px;
      margin-top: 5px;
      font-size: 13px;
    }
  }
  .label a {
    display: inline-block;
    border: 1px solid #d5bfa7;
    border-radius: 100px;
    padding: 0 6px 0 8px;
    color: #d5bfa7;
    margin: 8px 3px;
    font-size: 13px;
  }
}
.cakebus {
  font-size: 13px;
  line-height: 24px;
  color: #684029;
  i {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    background-image: url(../../assets/images/buybus.png);
  }
}
</style>