<template>
	<div class="login">
		<div class="login-container">
			<div class="logo">
				<img src="https://img2.baidu.com/it/u=2285567582,1185119578&fm=26&fmt=auto" />
				<span class="logo-name">小九音乐聊天室</span>
			</div>

			<div class="form">
				<el-form ref="registerForm" :model="form" :rules="rules">
					<el-form-item prop="user_name">
						<el-input v-model="form.user_name" clearable placeholder="您的账号" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="user_nick">
						<el-input v-model="form.user_nick" clearable placeholder="您的昵称" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="user_email">
						<el-input v-model="form.user_email" clearable placeholder="您的邮箱" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="user_password">
						<el-input v-model="form.user_password" clearable show-password placeholder="您的账户密码" size="medium" @keyup.native.enter="register"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<el-button style="width: 100%" type="primary" size="medium" @click="register">注册并登录聊天室</el-button>
			<div class="links">
				<a @click="$router.push('/login')">已有账号去登录</a>
			</div>
		</div>
	</div>
</template>

<script>
import { register, login } from "@/api/user";

export default {
  components: {},
  data() {
    return {
      form: {
        user_name: null,
        user_nick: null,
        user_email: null,
        user_password: null,
        user_password2: null,
      },
      rules: {
        user_name: [
          { required: true, message: "请输入您的账号", trigger: "blur" },
          { min: 1, max: 8, message: "长度在1至10个字符", trigger: "blur" },
        ],
        user_nick: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在1到8个字符", trigger: "blur" },
        ],
        user_email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        user_password: [
          { required: true, message: "请输入您的账户密码", trigger: "blur" },
          { min: 6, max: 32, message: "长度在6到32个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    register() {
      this.$refs.registerForm.validate(async (valid) => {
        if (!valid) return;
        await register(this.form);
        this.$message.success("注册成功，即将登录！");
        setTimeout(async () => {
          const { user_name, user_password } = this.form;
          const { data } = await login({ user_name, user_password });
          const { token } = data;
          localStorage.chat_token = token;
          this.$router.push("/");
          this.$message.success("登录成功!");
        }, 1000);
      });
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
      justify-content: flex-end;
      font-size: 12px;
      cursor: pointer;
      color: #fff;
      margin-top: 15px;
    }
  }
}
</style>
