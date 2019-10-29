<template>
  <div class="content-box">
    <div class="content-top">
      <dl>
        <dt>分类：</dt>
        <dd
          v-for="(item,index) in categorys"
          :key="index"
        >
          <a
            :class="[item.categoryId==nowType?'active':'']"
            @click="go(item.categoryId)"
          >{{item.name}}</a>
        </dd>
      </dl>
      <dl>
        <dt>口味：</dt>
        <dd>
          <a
            href="####"
            style="color:#bb9772;"
          >全部口味</a>
        </dd>
        <dd>
          <a href="####">乳脂奶油</a>
        </dd>
        <dd>
          <a href="####">慕斯</a>
        </dd>
        <dd>
          <a href="####">乳酪</a>
        </dd>
        <dd>
          <a href="####">巧克力</a>
        </dd>
        <dd>
          <a href="####">坚果</a>
        </dd>
        <dd>
          <a href="####">水果</a>
        </dd>
        <dd>
          <a href="####">含酒</a>
        </dd>
        <dd>
          <a href="####">咖菲</a>
        </dd>
      </dl>
    </div>
    <div class="content-img">
      <ul>
        <!-- http://localhost:8081/product/detail/1 -->
        <li
          v-for="(item,index) in goods"
          :key="index"
        >
          <router-link :to="{path: `/product/detail/${item.id}`}">
            <gallery-product v-bind:product="item"></gallery-product>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import galleryProduct from "./galleryProduct";
export default {
  components: {
    galleryProduct
  },
  data() {
    return {
      title: "cake",
      nowType: 1,
      goods: [],
      categorys: [
        {
          categoryId: 0,
          name: "全部分类"
        },
        {
          categoryId: 1,
          name: "蛋糕"
        },
        {
          categoryId: 2,
          name: "面包"
        },
        {
          categoryId: 3,
          name: "咖啡下午茶"
        },
        {
          categoryId: 4,
          name: "常温蛋糕"
        }
      ]
    };
  },
  created() {
    // this.goods = this.cakes;
    this.nowType = this.$route.params.id;
    console.log(`11`);
    this._getProductList(this.nowType);
    // this.$http.get("../../static/json/goods.json").then(
    //   res => {
    //     console.log(res.data.productList);
    //     this.goods = res.data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  },
  beforeRouteUpdate(to, from, next) {
    //在当前路由改变，但是该组件被复用时调用
    //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
    // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(this, 'beforeRouteUpdate'); //当前组件实例
    // console.log(to, '组件独享守卫beforeRouteUpdate第一个参数');
    // console.log(from, '组件独享守beforeRouteUpdate卫第二个参数');
    // console.log(next, '组件独享守beforeRouteUpdate卫第三个参数');

    // this.nowType = to.query.type;

    this.go(to.params.id);
    next();
    // location.reload()
  },
  methods: {
    ...mapActions({
      getProductList: "product/getProductList"
    }),
    // 获取商品

    go(categoryId) {
      // console.log(categoryId);
      this.nowType = categoryId;
      this._getProductList(categoryId);
      // this.goods = this.cakes;
      // this.title = "cake";
      // console.log("jjja");
    },
    // getCategoryList(categoryId) {
    //   this.$http.get("../../static/json/" + categoryId + ".json").then(
    //     res => {
    //       console.log(res.data.productList);
    //       this.goods = res.data;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    async _getProductList(id) {
      // let {page, desc, category_id, keyword} = this.$route.query;
      id = id == 0 ? null : id;
      const res = await this.getProductList({
        category_id: id
      });
      this.goods = res.data.data.data;
      console.log(res.data.data.data);
    }
    // goBread() {
    //   this.goods = this.breads;
    //   this.title = "bread";
    //   // console.log(this.title);
    // },
    // goIcecream() {
    //   this.goods = this.icecreams;
    //   this.title = "icecream";
    //   // console.log("jjja");
    // },
    // goCoffee() {
    //   this.goods = this.coffees;
    //   this.title = "coffee";
    //   // console.log("jjja");
    // }
  }
};
</script>

<style scoped lang='scss'>
/*导购*/
a {
  text-decoration: none;
  color: #684029;
}
a:hover {
  color: #bb9772;
}
.content-box {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  // padding-bottom: 50px;

  .content-top {
    font-size: 13px;
    margin-top: 15px;
    // margin-bottom: 25px;
    width: 1200px;
    border-top: #f2f2f2 solid 1px;
    border-bottom: #f2f2f2 solid 1px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  dl {
    line-height: 30px;
    height: 30px;
    dd {
      float: left;
      margin: 0px 13px;
      color: #684029;
      cursor: pointer;
    }
    dt {
      float: left;
      color: #9b9b9b;
      margin-right: 38px;
    }
    .active {
      color: #bb9772;
    }
    dd a:hover {
      color: #bb9772;
    }
  }
}

/*neirong*/
.content-img ul li {
  // border: 2px solid #ff5800;
  list-style: none;
  display: inline-block;
  padding: 0 18px;
  margin: 0 18px 18px 0px;
  // position: relative;
  // .pro {
  //   width: 228px;
  //   text-align: center;
  //   height: 364px;
  //   position: relative;
  //   img {
  //     width: 228px;
  //     height: 246px;
  //   }
  //   h3 {
  //     font-size: 13px;
  //     line-height: 20px;
  //   }
  //   span {
  //     display: block;
  //     color: #bb9772;
  //     line-height: 18px;
  //     margin-top: 5px;
  //     font-size: 13px;
  //   }
  // }
  // .label a {
  //   display: inline-block;
  //   border: 1px solid #d5bfa7;
  //   border-radius: 100px;
  //   padding: 0 6px 0 8px;
  //   color: #d5bfa7;
  //   margin: 8px 3px;
  //   font-size: 13px;
  // }
}

// .cakebus {
//   font-size: 13px;
//   line-height: 24px;
//   color: #684029;
//   i {
//     width: 24px;
//     height: 24px;
//     display: inline-block;
//     vertical-align: middle;
//     margin-right: 6px;
//     background-image: url(../../assets/images/buybus.png);
//   }
// }
</style>