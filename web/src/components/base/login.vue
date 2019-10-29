<template>
  <div
    class="login"
    @keydown.enter="handleSubmit"
  >
    <div class="login-con">

    </div>
    <Card :bordered="false">
      <p slot="title">
        欢迎登录
      </p>
      <div class="form-con">
        <Form
          ref="loginForm"
          :model="form"
          :rules="rules"
        >
          <input
            v-model="form.email"
            placeholder="请输入用户名"
          />
          <input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />

          <div
            class="button"
            @click="handleSubmit"
          >登录</div>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      buttonLoading: false,
      // 表单内容，email && 密码
      form: {
        email: "zcz@qq.com",
        password: '',
      }

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
      console.log(this.form);
      this.login(this.form)
        .then(ret => {
          console.log(ret.data);
          this.$ls.set("token", ret.data.token);
          // 跳转
          // this.$Message.success("登录成功！");
          window.location.href = "/";
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

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

.login {
  width: 600px;
  height: 400px;
  background-color: #f1f1f1;
  position: fixed;
  top: 170px;
  .login-con {
    position: absolute;
    width: 300px;
  }

  .login-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
  }

  .form-con {
    padding: 10px 0 0;
    .button {
      cursor: pointer;
    }
  }

  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
}
</style>

