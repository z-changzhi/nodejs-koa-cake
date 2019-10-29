<template>
  <div class="index-wrap">
    <div class="index-1">
      <div class="index-board-slide">
        <slide-show :slides="slides" :inv="invTime"></slide-show>
      </div>
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item, index) in boardList"
          :key="index"
          :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]"
        >
          <div class="index-board-item-inner"></div>
        </div>
      </div>
      <div class="index-board-home">
        <home-module v-for="(item,index) in productList" :key="index" :homeModule="item"></home-module>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from "../../components/slideShow";
import homeModule from "./homeModule";

export default {
  components: {
    slideShow,
    homeModule
  },
  data() {
    return {
      invTime: 2000,
      slides: [],
      boardList: [],
      productList: {}
    };
  },
  created() {
    // console.log(this._getUserAccount())
    this.$http.get("../../../static/json/indexProducts.json").then(
      res => {
        // console.log(res.data.productList);
        this.productList = res.data.productList;
      },
      err => {
        console.log(err);
      }
    );
    this.$http.get("../../../static/json/indexBoardList.json").then(
      res => {
        // console.log(res.data.productList);
        this.boardList = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.$http.get("../../../static/json/indexSlides.json").then(
      res => {
        // console.log(res.data.productList);
        this.slides = res.data;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods:{
    async getUserAccount() {
      return await this.$axios.get('../../../static/json/indexBoardList.json');
    }
  }
};
</script>

<style scoped lang="scss">
.index-wrap {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  /* text-align: center; */
  /* border: 2px #a00 solid; */
  position: relative;
  background-color: #fff;
  .index-1 {
    width: 100%;
    .index-board-slide {
      // border: 3px solid #442919;
      position: relative;
    }
    .index-board-list {
      width: 1200px;
      position: relative;
      display: block;
      margin: 0 auto;
      top: 0px;
      /* border: 2px #a00 solid; */
      overflow: hidden;
      .index-board-item {
        /* float: left; */
        display: inline-block;
        position: relative;
        left: 40px;
        width: 200px;
        background: #fff;
        box-shadow: 2px 2px 15px #ddd;
        margin: 20px 0px 20px 20px;
        .index-board-item-inner {
          position:relative;
          top:10px;
          display:block;
          width:100%;
          background-size:100% ;
          
          min-height: 125px;
          margin:auto;
          /* padding-left: 120px; */
        }
        /*
  margin-left: 5px;
  margin-right: 5px; */
        /* margin-bottom: 10px; */
      }
      .index-board-item:hover {
        box-shadow: 2px 2px 25px rgb(100, 100, 100);
      }
    }
    .index-board-home {
      width: 1100px;
      position: relative;
      display: block;
      margin: 0 auto;
      top: 0px;
      /* border: 2px #a00 solid; */
      overflow: hidden;
    }
  }
}

.index-board-newProduct .index-board-item-inner {
  background: url(https://m.z-changzhi.cn/static/images/1.jpg) no-repeat;
}
.index-board-birthday .index-board-item-inner {
  background: url(https://m.z-changzhi.cn/static/images/2.jpg) no-repeat;
}
.index-board-children .index-board-item-inner {
  background: url(https://m.z-changzhi.cn/static/images/3.jpg) no-repeat;
}
.index-board-party .index-board-item-inner {
  background: url(https://m.z-changzhi.cn/static/images/4.jpg) no-repeat;
}
.index-board-activity .index-board-item-inner {
  background: url(https://m.z-changzhi.cn/static/images/5.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
