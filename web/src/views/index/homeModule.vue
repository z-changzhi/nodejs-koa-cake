<template>
  <div class="z-container">
    <!-- {{homeModule}} -->
    <div class="home-module-title">
      {{homeModule.title}}&nbsp;/&nbsp;
      <span>{{homeModule.vice_title}}</span>
    </div>
    <div class="colorful-top-banner">
      <a href="#" target="_blank">
        <img :src="homeModule.imgSrc_1" />
      </a>
    </div>

    <div class="colorful-product-list">
      <div class="product" v-for="(item,index) in homeModule.goods" :key="index">
        <!-- {{item}} -->
        
            <product v-bind:product="item"></product>
          
      </div>

      <!-- <product class="product" v-bind:product="imgSrc_2"></product>
      <product class="product" v-bind:product="imgSrc_2"></product>
      <product class="product" v-bind:product="imgSrc_2"></product>-->
      <a href="#" target="_blank"></a>
    </div>
    <!-- <img  :src="imgSrc" > -->
  </div>
</template>

<script>
import product from "../../components/product";
export default {
  components: {
    product
  },
  props: {
    homeModule: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style scoped lang="scss">
.z-container {
  margin: 0px 0px 30px 0px;
  //  border: 1px #a00 solid;
}
.home-module-title {
  color: #764728;
  font-size: 20px;
  span {
    font-size: 16px;
  }
}
.colorful-top-banner {
  margin: 20px 0px 20px 0px;
}
.colorful-product-list {
  width: 120%;
  /* display: inline-block; */
  //  border: 1px #a00 solid;
  .product {
    width: 263px;
    display: inline-block;
    position: relative;

    margin: 0px 16px 0px 0px;
    padding: 0;
    // border: 1px #a00 solid; 
  }
}
</style>