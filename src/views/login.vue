<template>
	<div class="login">
		<div class="login-container">
			<div class="logo">
				<img src="https://img2.baidu.com/it/u=2285567582,1185119578&fm=26&fmt=auto" />
				<span class="logo-name">小九音乐聊天室</span>
			</div>

			<div class="form">
				<el-form ref="loginForm" :model="form" :rules="rules">
					<el-form-item prop="user_name">
						<el-input v-model="form.user_name" clearable placeholder="您的账户或邮箱" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="user_password">
						<el-input v-model="form.user_password" clearable show-password placeholder="您的账户密码" size="medium" @keyup.native.enter="login"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<div class="links">
				<a @click="foegetPassword">忘记密码</a>
				<a @click="testLogin">使用测试账号登录</a>
				<a @click="$router.push('/register')">注册账号</a>
			</div>

			<el-button style="width: 100%" type="primary" size="medium" @click="login">登录小九聊天室</el-button>
		</div>
	</div>
</template>

<script>
import { login } from "@/api/user";

export default {
  components: {},
  data() {
    return {
      form: {
        user_name: "",
        user_password: "",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入您的账号", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        user_password: [
          { required: true, message: "请输入您的账户密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    localStorage.user_name && (this.form.user_name = localStorage.user_name);
    localStorage.user_password &&
      (this.form.user_password = localStorage.user_password);
  },
  mounted() {},
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return;
        const { data } = await login(this.form);
        const { token } = data;
        localStorage.chat_token = token;
        this.$router.push("/");
        const { user_name, user_password } = this.form;
        localStorage.user_name = user_name;
        localStorage.user_password = user_password;
      });
    },

    foegetPassword() {
      return this.$message.warning("都没邮箱验证，你找不回密码洛！");
    },

    testLogin() {
      this.form.user_name = "admin2";
      this.form.user_password = "123456";
      this.login();
    },
  },
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 820px) {
  .login-container {
    margin-top: 50px !important;
  }
}
.login {
  background: url("https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif");
  height: 100%;
  display: flex;
  justify-content: center;
  &-container {
    margin-top: 100px;
    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;

      img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }

      &-name {
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
      }
    }

    .form {
      margin-top: 50px;
      width: 300px;
    }

    .links {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      cursor: pointer;
      color: #fff;
      margin-bottom: 30px;
    }
  }
}
</style>
