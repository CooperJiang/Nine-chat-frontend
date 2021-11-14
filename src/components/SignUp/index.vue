<template>
  <div class="sign-in">
    <Popup
      title="注册账户"
      width="300px"
      :show="show"
      lock
      :showCloseBtn="false"
      @close="handlerClose"
    >
      <input
        v-model="params.user_name"
        class="common-input"
        type="text"
        placeholder="用户姓名"
        style="width: 260px"
        @keyup.enter="login"
      />
      <input
        v-model="params.user_nick"
        class="common-input"
        type="text"
        placeholder="用户昵称"
        style="width: 260px"
        @keyup.enter="login"
      />
      <input
        v-model="params.user_email"
        class="common-input"
        type="text"
        placeholder="用户邮箱"
        style="width: 260px"
        @keyup.enter="login"
      />
      <input
        v-model="params.user_password"
        class="common-input"
        type="password"
        placeholder="用户密码"
        style="width: 260px"
        @keyup.enter="login"
      />

      <input
        v-model="params.user_password2"
        class="common-input"
        type="password"
        placeholder="确认密码"
        style="width: 260px"
        @keyup.enter="login"
      />
      <div style="text-align: right">
        <span style="font-size: 12px; color: #999; cursor: pointer">
          忘记密码？
        </span>
      </div>
      <div class="btn" slot="footer">
        <btn theme="gradient" :loading="loading" long @click="register"
          >我要注册
        </btn>
        <btn :style="{ marginTop: '10px' }" long @click="goLogin"
          >前往登录
        </btn>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from "../Popup/index.vue";
import Btn from "../Btn";
import { validatorsExp } from "../../utils/validate";
import { mapActions } from "vuex";
import { register } from "@/api/user";
export default {
  components: { Popup, Btn },
  data() {
    return {
      params: {
        user_name: null,
        user_nick: null,
        user_email: null,
        user_password: null,
        user_password2: null,
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["toggleSignInPopup", "toggleSignUpPopup"]),
    register() {
      this.validateForm().then(async (valid) => {
        if (valid) {
          await register(this.params);
          this.$message.success("恭喜您、注册成功啦");
        }
      });
    },
    goLogin() {
      this.toggleSignUpPopup(false);
      this.toggleSignInPopup(true);
    },
    handlerClose() {
      this.toggleSignUpPopup(false);
    },
    validateForm() {
      const {
        user_name,
        user_nick,
        user_email,
        user_password,
        user_password2,
      } = this.params;
      return new Promise((resolve) => {
        if (Object.values(this.params).filter((t) => t).length < 5) {
          this.$message.error("请按要求填写完所有信息！");
          resolve(false);
        }
        if (user_name.length > 8 || user_name.length < 2) {
          this.$message.error("请输入2-6位数的用户名称");
          resolve(false);
        }
        if (user_nick.length > 8 || user_nick.length < 2) {
          this.$message.error("请输入2-8位数的用户昵称");
          resolve(false);
        }
        if (user_password.length > 8 || user_password.length < 2) {
          this.$message.error("密码在6-32位数之间哟");
          resolve(false);
        }
        if (!validatorsExp.email.test(user_email)) {
          this.$message.error("请正确填写邮箱！");
          return resolve(false);
        }
        if (user_password !== user_password2) {
          this.$message.error("两次密码不一致、请确认密码输入正确！");
          return resolve(false);
        }
        return resolve(true);
      });
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    show() {
      return this.$store.state.showSignUpPopup;
    },
  },
};
</script>
<style lang="less" scoped>
.sign-in {
  .btn {
    width: 100%;
    padding: 0 10px;
  }
}
</style>
