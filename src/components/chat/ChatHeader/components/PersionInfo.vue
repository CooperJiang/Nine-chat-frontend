<template>
	<div class="persion">
		<div class="header">
			<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img :src="form.user_avatar" class="avatar" />
			</el-upload>
		</div>
		<span class="uuid">UUID: {{ uuid }}</span>
		<div class="form">
			<el-form ref="userForm" :model="form" label-position="right" label-width="60px" size="mini" :rules="rules">
				<el-form-item prop="user_name" label="账号">
					<el-input v-model="form.user_name" clearable placeholder="您的名称或邮箱账号" />
				</el-form-item>
				<el-form-item prop="user_nick" label="昵称">
					<el-input v-model="form.user_nick" clearable placeholder="您的账户昵称" />
				</el-form-item>
				<el-form-item prop="user_sex" label="性别">
					<el-select v-model="form.user_sex" placeholder="请选择您的性别" style="width: 100%">
						<el-option label="小哥哥" :value="1"></el-option>
						<el-option label="小姐姐" :value="2"></el-option>
						<el-option label="保密" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="user_sign" label="签名">
					<el-input v-model="form.user_sign" type="textarea" :rows="3" placeholder="请填写您的签名" />
				</el-form-item>
			</el-form>
			<div class="btns">
				<el-upload :action="uploadUrl" :on-success="handleRoomBgSuccess" :before-upload="beforeRoomBgUpload" :show-file-list="false">
					<el-button class="btn" size="mini" type="success">专属背景</el-button>
				</el-upload>
				<el-button class="btn" size="mini" type="danger" @click="removeUserRoomBg">移除背景</el-button>
				<el-button class="btn" size="mini" type="primary" @click="updateUser">更新资料</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { updateUserInfo } from "@/api/user";
import config from '@/config'

export default {
  name: "PersionInfo",
  components: {},
  data() {
    return {
      uploadUrl: config.file_upload_url,
      imageUrl: "",
      form: {
        user_name: "",
        user_nick: "",
        user_sex: "",
        user_sign: "",
        user_avatar: "",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入您的账号", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        user_nick: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        user_sex: [
          { required: true, message: "请选择您的性别", trigger: "change" },
        ],
        user_sign: [
          { required: true, message: "请输入您的个性签名", trigger: "blur" },
          { max: 255, message: "长度最长为255个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    handleAvatarSuccess(res) {
      if (!res.data[0].url) return this.$message.error("上传头像失败");
      this.form.user_avatar = res.data[0].url;
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过1MB!");
      }
      return isLt1M;
    },
    beforeRoomBgUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["jpg", "png", "gif", "jpeg"];
      if (whiteList.indexOf(type) === -1) {
        this.message({ message: "仅仅支持图片上传", type: "warning" });
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过1MB!");
        return false;
      }
    },
    async handleRoomBgSuccess(res) {
      if (!res.data[0].url) return this.$message.error("上传专属背景图失败");
      await updateUserInfo({ user_room_bg: res.data[0].url });
      this.$message.success("设置您的专属聊天室背景成功！");
      await this.getUserInfo();
    },
    initUserInfo() {
      if (!this.user_info) return;
      const { user_name, user_nick, user_sex, user_sign, user_avatar, id } =
        this.user_info;
      Object.assign(this.form, {
        user_name,
        user_nick,
        user_sex,
        user_sign,
        user_avatar,
      });
      this.uuid = `10${  id.toString().padStart(4, 0)}`;
    },
    updateUser() {
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) return;
        await updateUserInfo(this.form);
        this.$message.success("资料更新成功");
        await this.getUserInfo();
        const { user_name, user_nick, user_sex, user_sign, user_avatar } =
          this.user_info;
        const newUserInfo = {
          user_name,
          user_nick,
          user_sex,
          user_sign,
          user_avatar,
        };
        /* 通知服务端聊天室需要更新用户的信息 */
        this.$socket.client.connected &&
          this.$socket.client.emit("updateRoomUserInfo", newUserInfo);
      });
    },
    async removeUserRoomBg() {
      await updateUserInfo({ user_room_bg: "" });
      this.$message.success("已移除掉您的专属背景！");
      await this.getUserInfo();
    },
  },
  watch: {},
  created() {
    this.initUserInfo();
  },
  mounted() {},
  computed: {
    ...mapGetters(["user_info"]),
  },
};
</script>
<style lang="less" scoped>
.persion {
  padding: 0 15px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .uuid {
    display: inline-block;
    font-size: 12px;
    background: #ccc;
    padding: 2px 5px;
    color: #fff;
    font-weight: 600;
    border-radius: 5px;
    margin-top: 5px;
  }

  .form {
    width: 100%;
    margin-top: 15px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    .btn {
      margin-left: 10px;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 6px;
  border: 1px dashed #ccc !important;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  display: block;
  border: 1px solid #ddd8d8;
}
</style>
