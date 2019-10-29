<template>
  <div class="content">
    <div class="content-bgc">
      <div class="register-box">
        <div class="register-header">
          <span class="span1">
            <a href="###">用户注册</a>
          </span>
          <div class="form1 clearfix">
            <ul>
              <li>
                <input type="text" placeholder="请输入手机号码" />
              </li>
              <li>
                <input type="password" placeholder="密码：请输入8~20个字符，需同时包括英文和数字" />
              </li>
              <li>
                <input type="password" placeholder="确认密码" />
              </li>
              <li class="message ">
                <input class="message" type="text" placeholder="短信验证" />
              </li>
              <a class="getm">获取验证码</a>
              <li>
                <input type="text" placeholder="选择生日" />
              </li>
            </ul>
            <input type="button" class="button1" value="注册" />

            <span>
              <ul>
                <li>
                  <input type="checkbox" class="cb" />&nbsp;&nbsp;已阅读并同意
                </li>
                <li>
                  <a href="###">21客会员协议</a>
                </li>
                <li>和</li>
                <li>
                  <a href="####">隐私保护和政策</a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>-->
</template>

<script>
export default {
  data() {
    return {
      usernameModel: "",
      passwordModel: "",
      errorText: ""
    };
  },
  computed: {
    userErrors() {
      let errorText, status;
      if (!/@/g.test(this.usernameModel)) {
        status = false;
        errorText = "不包含@";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.userFlag) {
        errorText = "";
        this.userFlag = true;
      }
      return {
        status,
        errorText
      };
    },
    passwordErrors() {
      let errorText, status;
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false;
        errorText = "密码不是1-6位";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.passwordFlag) {
        errorText = "";
        this.passwordFlag = true;
      }
      return {
        status,
        errorText
      };
    }
  },
  methods: {
    onLogin() {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = "部分选项未通过";
      } else {
        this.errorText = "";
        this.$http.get("api/login").then(
          res => {
            this.$emit("has-log", res.data);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #111;
}
ul li {
  list-style: none;
  display: inline-block;
}
/*注册*/
.content {
  position: fixed;
  top: 170px;
  // width: 100%;
  width: 400px;
  // border: 3px solid #e00;
  // height: 576px;
  .content-bgc {
    position: relative;
    // border: 1px solid #e90;
    width: 400px;
    // height: 576px;
    // height: 100%;
    .register-box {
      height: 404px;
      width: 300px;
      // position: absolute;
      // right: 100px;
      padding: 28px 42px;
      // top: 114px;
      // border: 1px solid #e9e9e9;
      background-color: #f1f1f1;
      .register-header {
        text-align: center;
        font-size: 18px;
      }
      .register-header .span1 {
        text-align: center;
        margin-right: 20px;
      }
      .form1 {
        width: 310px;
        height: 300px;
        padding-top: 15px;
      }
      .form1 ul li input {
        width: 300px;
        height: 36px;
        border: 1px solid #e9e9e9;
        margin-bottom: 10px;
        padding-left: 5px;
      }
      .form1 ul li .message {
        float: left;
        margin-left: -8px;
        width: 144px;
        height: 36px;
        border: 1px solid #e9e9e9;
        margin-bottom: 10px;
        // padding-left: 5px;
      }
      .form1 ul .getm {
        float: right;
        width: 145px;
        height: 36px;
        font-size: 12px;
        background-color: #fafafa;
        border: 1px solid #e9e9e9;
        margin-bottom: 10px;
        text-align: center;
        line-height: 36px;
      }
      .form1 .button1 {
        width: 308px;
        height: 48px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        line-height: 48px;
        background-color: #442818;
        margin-top: 30px;
        margin-bottom: 20px;
        border: 0px solid #442818;
        border-radius: 2px;
      }
      .form1 span ul li .cb {
        width: 14px;
        height: 14px;
      }
      .form1 span ul li {
        float: left;
        font-size: 12px;
        color: #744f3a;
        padding-right: 10px;
      }
      .form1 span ul li a {
        color: #2a99fa;
      }
    }
  }
}
</style>
