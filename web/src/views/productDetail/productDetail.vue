<template>
  <div class="content-box">
    ···
    {{detail}}
    <div class="product-1">
      <div class="leftImg">
        <img :src="detail.detailImg" />
      </div>
      <div class="rightImg">
        <img :src="detail.detailImg" />
        <img :src="detail.detailImg" />
        <img :src="detail.detailImg" />
        <img :src="detail.detailImg" />
      </div>
    </div>
    <div class="product-2">
      <div class="left">
        <h1>{{detail.detailTitle}}</h1>
        <p>{{detail.detailTitle}}</p>
        <div class="label">
          <a
            v-for="(item,index) in detail.detailLabels.split(',')"
            href="#"
            :key="index"
          >{{item}}&nbsp;></a>
          <!-- <a href="####">情侣 &gt;</a>
          <a href="####">人气 &gt;</a>
      <a href="####">生日 &gt;</a>-->
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div>
      <mavon-editor
        style="height: 100%;box-shadow:none !importent;background-color:#f8f8f8;"
        :ishljs="true"
        v-model="detail.content"
        :defaultOpen="'preview'"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      >
      </mavon-editor>
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      detail: null
    };
  },
  created() {
    // this.goods = this.cakes;
    this.nowType = this.$route.params.id;
    console.log(`11`);
    this._getProductDetailList(this.nowType);
  },
  beforeRouteUpdate(to, from, next) {
    this.go(to.params.id);
    next();
  },
  methods: {
    ...mapActions({
      getProductDetailList: "product/getProductDetail"
    }),
    // 获取商品

    go(categoryId) {
      // console.log(categoryId);
      this.nowType = categoryId;
      this._getProductDetailList(categoryId);
    },

    async _getProductDetailList(id) {
      // let {page, desc, category_id, keyword} = this.$route.query;
      const res = await this.getProductDetailList({
        id: id
      });
      this.detail = res.data.data;
      console.log(res.data.data);
    }
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
  background-color: #fbfbfb;
  width: 1200px;
  height: auto;
  margin: 0 auto;
  // padding-bottom: 50px;
  .product-1 {
    position: relative;
    .leftImg {
      width: 900px;
      display: inline-block;
      position: relative;
      img {
        width: 900px;
        height: 500px;
      }
    }
    .rightImg {
      width: 90px;
      display: inline-block;
      position: relative;
      img {
        width: 80px;
        height: 48px;
      }
    }
  }
  .product-2 {
    .left {
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
  }
}

/*neirong*/
.content-img ul li {
  // border: 2px solid #ff5800;
  list-style: none;
  display: inline-block;
  padding: 0 18px;
  margin: 0 18px 18px 0px;
}
</style>