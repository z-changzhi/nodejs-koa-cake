<template>
  <section>
    <footer class="footer-inner">
      <img src="../assets/images/footer-logo.png" width="96px" height="36px" alt="wu" />
      <ul class="last-list">
        <li>
          <a href="###">联系我们</a>
          <span>|</span>
        </li>
        <li>
          <a href="###">订购帮助</a>
          <span>|</span>
        </li>
        <li>
          <a href="###">企业合作</a>
          <span>|</span>
        </li>
        <li>
          <a href="###">生产经营资质</a>
          <span>|</span>
        </li>
        <li>
          <a href="###">公告专区</a>
        </li>
      </ul>
      <div class="last-img">
        <a href="###">
          <img src="../assets/images/footericon-01.png" alt="wu" width="50px" height="50px" />
        </a>
        <a href="###">
          <img src="../assets/images/footericon-02.png" alt="wu" width="50px" height="50px" />
        </a>
        <a href="###">
          <img src="../assets/images/APPlogo.png" alt="wu" width="50px" height="50px" />
        </a>
      </div>
      <ul class="last-text">
        <li>订购专线：400 650 2121（服务时间 08:00–22:00），企业团购热线：021-37768396</span>
        <li>客服电话：021-23099721（全国），kefu@21cake.com（邮箱）</li>
        <li>杭州/广州：提前5小时预订；北京：提前6小时预订；上海：提前5.5-6小时预订；天津/苏州/无锡/深圳：提前8小时预订（部分偏远地区除外，当日22点以后订单，于次日8点开始审核)</li>
        <li>当日蛋糕配送截止下单时间：北京/上海：16:30；杭州/广州：14:00；天津：10:30；苏州/无锡/深圳：11:00</li>
        <li>网站注册公司名称: 北京廿一客食品有限公司 地址: 北京市北京经济技术开发区兴海二街5号院3号楼</li>
      </ul>
      <hr>
      <ul class="last-bottom">
        <li>Copyright© 21Cake蛋糕官网商城 2007-2019, 版权所有 京ICP备14006254号-1</li>
      </ul>
    </footer> 
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.footer-inner {
  width: 100%;
  background-color: #333;
  
  
    text-align: center;
    width: 100%;
    padding-top: 50px;
    .last-list {
      text-align: center;
      color: #ffffff;
      margin: 25px 0;
      li {
        display: inline-block;
        
        a{
        margin: 0px 25px;
        color: #ffffff;
        text-decoration: none;
        }
      }
    }
    .last-img {
      text-align: center;
      margin: 25px 0px;
      a {
        margin: 0px 25px;
        text-decoration: none;
      }
    }
    .last-text {
      text-align: center;
      line-height: 18px;
      color: #9a9a9a;
      li {
        display: block;
      }
    }
    .last-bottom{
      height:70px;
      li{
        line-height: 60px;
        color: #9a9a9a;
      }
    }
}
</style>
