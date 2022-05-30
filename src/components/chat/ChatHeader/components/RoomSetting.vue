<template>
	<div class="persion">
		<div class="header">
			<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img :src="form.room_logo" class="avatar" />
			</el-upload>
		</div>
		<span class="uuid">专属房间ID: {{ uuid }}</span>
		<div class="form">
			<el-form ref="userForm" :model="form" label-position="right" label-width="80px" size="mini" :rules="rules">
				<el-form-item prop="room_name" label="房间名称">
					<el-input v-model="form.room_name" clearable placeholder="输入您的房间名称" />
				</el-form-item>
				<el-form-item prop="room_need_password" label="房间权限">
					<el-select v-model="form.room_need_password" placeholder="请选择您的房间权限" style="width: 100%">
						<el-option label="房间加密" :value="2"></el-option>
						<el-option label="公开房间" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="room_interval" label="点歌间隔">
					<el-input v-model="form.room_interval" disabled clearable placeholder="输入您的房间名称" />
				</el-form-item>
				<el-form-item prop="room_speak" label="发言权限">
					<el-select v-model="form.room_speak" disabled placeholder="请选择您的发言权限" style="width: 100%">
						<el-option label="允许所有人发言" :value="1"></el-option>
						<el-option label="禁止所有人发言" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="room_choose" label="点歌权限">
					<el-select v-model="form.room_choose" disabled placeholder="请选择您的点歌权限" style="width: 100%">
						<el-option label="允许所有人点歌" :value="1"></el-option>
						<el-option label="禁止所有人点歌" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="room_password" label="房间密码">
					<el-input v-model="form.room_password" show-password clearable placeholder="如不更改，无需填写" />
				</el-form-item>
				<el-form-item prop="room_notice" label="房间公告">
					<el-input v-model="form.room_notice" type="textarea" :rows="5" placeholder="请填写房间公告、以英文,换行" />
				</el-form-item>
			</el-form>
			<div class="btns">
				<el-button class="btn" size="mini" type="danger" @click="removeRoomBgImg">移除房间背景</el-button>
				<el-button class="btn" size="mini" type="primary" @click="updateUser">更新资料</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { updateRoomInfo } from "@/api/chat";
import config from '@/config'

export default {
  name: "PersionInfo",
  components: {},
  data() {
    return {
      uploadUrl: config.file_upload_url,
      imageUrl: "",
      uuid: "",
      form: {
        room_id: null,
        room_name: null,
        room_notice: null,
        room_need_password: null,
        room_password: null,
        room_logo: null,
        room_speak: 1,
        room_choose: 1,
        room_interval: 8,
      },
      rules: {
        room_name: [
          { required: true, message: "请输入您房间名称", trigger: "blur" },
          { min: 1, max: 12, message: "长度在1到10个字符", trigger: "blur" },
        ],
        room_notice: [
          { required: true, message: "请输入房间公告", trigger: "blur" },
          { max: 255, message: "最长为255字符", trigger: "blur" },
        ],
        room_need_password: [
          { required: true, message: "请设置房间权限", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getRoomInfo"]),
    handleAvatarSuccess(res) {
      if (!res.data[0].url) return this.$message.error("上传头像失败");
      this.form.room_logo = res.data[0].url;
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过1MB!");
      }
      return isLt1M;
    },

    initRoomInfo() {
      if (!this.room_info) return;
      const { room_name, room_notice, room_need_password, room_logo, room_id } =
        this.room_info;
      Object.assign(this.form, {
        room_name,
        room_notice,
        room_need_password,
        room_logo,
        room_id,
      });
      this.uuid = room_id.toString().padStart(3, 0);
    },

    updateUser() {
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) return;
        await updateRoomInfo(this.form);
        this.$message.success("修改房间设置完成");
        /* 修改完重新查一次保证本地数据是最新的 */
        await this.getRoomInfo();
        /* 数据格式同步于服务端connectSuccess */
        const {
          room_name,
          room_notice,
          room_need_password,
          room_id,
          room_bg_img,
          room_logo,
        } = this.form;
        /* 这个页面只能房主操作，所以这里的room_user_id就是自己 */
        const newRoomInfo = {
          room_name,
          room_notice,
          room_need_password,
          room_bg_img,
          room_logo,
          room_id,
          room_user_id: this.mine_id,
        };
        /* 通知服务端聊天室需要更新房间的信息 */
        this.$socket.client.connected &&
          this.$socket.client.emit("updateRoomInfo", newRoomInfo);
      });
    },

    /* 移除房间背景 */
    async removeRoomBgImg() {
      await updateRoomInfo({ room_bg_img: "", room_id: this.form.room_id });
      this.$message.success("已移除掉您的房间背景！");
      /* 修改完重新查一次保证本地数据是最新的 */
      await this.getRoomInfo();
      const {
        room_name,
        room_notice,
        room_need_password,
        room_id,
        room_bg_img,
        room_logo,
      } = this.form;
      const newRoomInfo = {
        room_name,
        room_notice,
        room_need_password,
        room_bg_img,
        room_logo,
        room_id,
        room_user_id: this.mine_id,
      };
      /* 通知服务端聊天室需要更新房间的信息 */
      this.$socket.client.connected &&
        this.$socket.client.emit("updateRoomInfo", newRoomInfo);
    },
  },
  watch: {},
  created() {
    this.initRoomInfo();
  },
  mounted() {},
  computed: {
    ...mapGetters(["mine_id", "room_info"]),
  },
};
</script>
<style lang="less" scoped>
.persion {
  padding: 0 15px;
  padding-bottom: 10px;
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
