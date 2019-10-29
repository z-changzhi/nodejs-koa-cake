<template>
  <div class="content">
    <div class="content-bgc">
      <div class="login-box">
        <div class="login-header">
          <span class="span1">
            <a href="###">账号密码登陆</a>
          </span>|
          <span class="span2">
            <a href="###">手机验证码登录</a>
          </span>
        </div>
        <div class="form1">
          <input
            v-model="form.email"
            class="input1"
            type="text"
            placeholder="请输入您的账号"
          />
          <input

            v-model="form.password"
            class="input2"
            type="password"
            placeholder="请输入密码"
          />
          <br />
          <input
            @click="handleSubmit"
            type="button"
            class="button1"
            value="登录"
          />

          <span>
            <ul>
              <li>
                <input type="checkbox" />&nbsp;&nbsp;记住账号
              </li>
              <li class="li1">
                <a href="###">忘记密码</a>
              </li>
              <li>
                <a href="注册.html">去注册</a>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      // 表单内容，email && 密码
      form: {
        email: "zcz@qq.com",
        password: "Cz202020"
      }

      // 表单验证，email && 密码
    };
  },
  created() {
    this.$Loading.finish();
  },
  methods: {
    ...mapActions({
      login: "admin/login"
    }),

    // 提交登录
    handleSubmit() {
      // console.log("aaaa");
      // this.buttonLoading = true;
      // 表单验证
      // var formLabel = this.$refs.loginForm;
      console.log(this.form);
      this.login(this.form)
        .then(ret => {
          console.log(ret.data);
          this.$ls.set("token", ret.data.token);
          // 跳转
          // this.$Message.success("登录成功！");
          this.$message({
            message: "登录成功！",
            type: "success"
          });

          setTimeout(res => {
            window.location.href = "/";
          }, 1000);
        })
        .catch(err => {
          console.log("err");
          console.log(err);
          this.buttonLoading = false;
        });
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
.content {
  position: fixed;
  top: 170px;

  // margin: auto;
  // border: 2px solid #e90000;
  .content-bgc {
    position: relative;
    width: 400px;
    // border: 1px solid #e90000;
    text-align: center;
    .login-box {
      background-color: #f1f1f1;
      // height: 300px;
      // border: 1px solid #e90000;
      width: 400px;
      position: relative;
      text-align: center;
      padding-top: 30px;
      // padding: 28px 42px;
      .form1 {
        width: 300px;
        height: 258px;
        padding-top: 15px;
        display: inline-block;
        .input1 {
          width: 294px;
          height: 36px;
          border: 1px solid #e9e9e9;
          margin-top: 20px;
          padding-left: 5px;
        }
        .input2 {
          width: 294px;
          height: 36px;
          border: 1px solid #e9e9e9;
          margin-top: 20px;
          padding-left: 5px;
        }
        .button1 {
          width: 302px;
          height: 48px;
          font-size: 18px;
          color: #ffffff;
          text-align: center;
          line-height: 48px;
          background-color: #442818;
          margin-top: 15px;
          border: 0px solid #442818;
          border-radius: 2px;
          cursor: pointer;
        }
        span {
          font-size: 12px;
          color: #442818;
          margin-top: 15px;
          // border: 2px solid #aa0;
          width: 302px;
          height: 48px;
          line-height: 48px;
          ul li {
            float: left;
            text-align: center;
            font-size: 12px;
          }
          ul .li1 {
            margin-left: 69px;
            margin-right: 48px;
          }
        }
      }
      // border: 5px solid #27cc43;
    }
    .login-header {
      text-align: center;
      font-size: 18px;
      .span1 {
        margin-right: 20px;
      }
      .span2 {
        margin-left: 20px;
      }
    }
  }
}
</style>
