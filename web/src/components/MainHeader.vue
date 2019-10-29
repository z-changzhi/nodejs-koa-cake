<template>
  <section>
    <header class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path: '/'}">
          <img src="../assets/images/logo.png" />
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li
              v-if="username=== ''"
              @click="goIndex"
            >首页</li>
            <!-- <li v-if="username=== ''" @click="goCake">蛋糕</li> -->
            <router-link :to="{path: '/gallery/1'}">
              <li :class="[username===1?'active':'']">蛋糕</li>
            </router-link>
            <router-link :to="{path: '/gallery/2'}">
              <li v-if="username=== ''">面包</li>
            </router-link>
            <router-link :to="{path: '/gallery/3'}">
              <li v-if="username=== ''">咖啡下午茶</li>
            </router-link>
            <router-link :to="{path: '/gallery/4'}">
              <li v-if="username=== ''">冰淇淋</li>
            </router-link>
            <router-link :to="{path: '/gallery/'}">
              <li v-if="username=== ''">企业专区</li>
            </router-link>
          </ul>
        </div>
        <!-- {{adminAuth.email}} -->
        <div class="head-right">
          <ul class="nav-list">
            <li>{{ adminAuth==null?'':adminAuth.email }}</li>
            <li
              v-if="adminAuth"
              class="nav-pile"
            >|</li>
            <li
              v-if="adminAuth"
              @click="quit"
            >退出</li>
            <li
              v-if="!adminAuth"
              @click="logClick"
            >登录</li>
            <li class="nav-pile">|</li>
            <li
              v-if="!adminAuth"
              @click="regClick"
            >注册</li>
            <li
              v-if="!adminAuth"
              class="nav-pile"
            >|</li>
            <li @click="goCart">购物车</li>
          </ul>
        </div>
      </div>
    </header>

    <my-dialog
      :is-show="isShowLogDialog"
      @on-close="closeDialog('isShowLogDialog')"
    >
      <log-form
        class="my-login"
        @has-log="onSuccessLog"
      ></log-form>
    </my-dialog>

    <my-dialog
      :is-show="isShowRegDialog"
      @on-close="closeDialog('isShowRegDialog')"
    >
      <reg-form class="my-login"></reg-form>
    </my-dialog>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Dialog from "./base/dialog";
import LogForm from "./base/logForm";
import RegForm from "./base/regForm";
import Vue from "vue";

export default {
  components: {
    MyDialog: Dialog,
    LogForm,
    RegForm
  },
  data() {
    return {
      isShowAboutDialog: false,
      isShowLogDialog: false,
      isShowRegDialog: false,
      username: ""
    };
  },
  computed: {
    ...mapState({
      adminAuth: state => state.admin.adminAuth,
      mainLoading: state => state.main_loading,
      pictureModal: state => state.picture_modal
    })
  },
  methods: {
    aboutClick() {
      this.isShowAboutDialog = true;
    },
    goIndex() {
      this.$router.replace("/");
      // 去首页
      // this.isShowLogDialog = true
    },
    goCake() {
      this.$router.replace("/detail/cake");
      // 去蛋糕
      // this.isShowRegDialog = true
    },
    goBread() {
      this.$router.replace("/detail/bread");
      // this.isShowRegDialog = true
    },
    goIceCream() {
      this.$router.replace("/detail/icecream");
      // 去蛋糕
      // this.isShowRegDialog = true
    },
    goCoffee() {
      this.$router.replace("/detail/coffee");
    },
    goCart() {
      this.$router.replace("/orderCart");
    },
    logClick() {
      this.isShowLogDialog = true;
    },
    regClick() {
      this.isShowRegDialog = true;
    },
    closeDialog(attr) {
      this[attr] = false;
    },
    onSuccessLog(data) {
      console.log(data);
      this.closeDialog("isShowLogDialog");
      this.username = data.username;
    },
    quit() {
      Vue.ls.remove("token");
      window.location.href = "/";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-head {
  background: #ffffff;
  color: #442919;
  height: 90px;
  line-height: 90px;
  width: 100%;
  box-shadow: 1px 1px 5px #aaa;
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
    position: relative;

    img {
      width: 120px;
      margin-left: 50px;
      vertical-align: middle;
    }
  }
  .head-nav {
    display: inline-block;
    position: absolute;
    left: 200px;

    ul {
      overflow: hidden;

      li {
        float: left;
        color: #442919;
        padding-left: 14px;
        padding-right: 14px;
        cursor: pointer;
        .active {
        }
      }
      li:hover {
        color: #bb9772;
      }
    }
  }
  .head-right {
    float: right;
    ul {
      overflow: hidden;
    }
    li {
      cursor: pointer;
      float: left;
    }

    .nav-pile {
      padding: 0 10px;
    }
  }
}

.my-login {
  left: 50%;
  position: relative;
  margin-left: -200px;
  z-index: 1001;
}
</style>
