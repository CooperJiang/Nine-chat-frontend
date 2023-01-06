<template>
	<div class="global-config">
		<el-form label-position="left" label-width="140px">
			<el-form-item label="主题设置">
				<el-radio-group v-model="theme" @change="changeTheme">
					<el-radio style="margin: 5px" label="default" border size="mini">默认主题</el-radio>
					<el-radio style="margin: 5px" label="black" border size="mini">暗黑主题</el-radio>
					<el-radio style="margin: 5px" label="transparent" border size="mini">透明主题</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="开启所有提示">
				<el-switch v-model="show_all_tips"></el-switch>
			</el-form-item>
			<el-form-item label="是否提示进房信息">
				<el-switch v-model="showTipsJoinRoom"></el-switch>
			</el-form-item>
			<el-form-item label="是否提示退房信息">
				<el-switch v-model="showTipsQuitRoom"></el-switch>
			</el-form-item>
			<el-form-item label="是否提示切歌信息">
				<el-switch v-model="showTipsSwitchMusic"></el-switch>
			</el-form-item>
			<el-form-item label="是否提示播放信息">
				<el-switch v-model="showTipsPlayMusic"></el-switch>
			</el-form-item>
			<el-form-item label="是否提示房间公告">
				<el-switch v-model="showTipsNotice"></el-switch>
			</el-form-item>
			<el-form-item label="个性化工具栏">
				<el-button type="danger" size="mini" @click="clearTipsInfo">清空提示信息</el-button>
				<el-button type="danger" size="mini" @click="clearNoticeInfo">清空公告信息</el-button>
			</el-form-item>
			<el-form-item label="是否显示历史弹幕">
				<el-switch v-model="showHistoryBarrageInfo"></el-switch>
			</el-form-item>
			<el-form-item label="是否显示图片弹幕">
				<el-switch v-model="showBarrageImg"></el-switch>
			</el-form-item>
			<el-form-item label="是否显示弹幕头像">
				<el-switch v-model="showBarrageAvatar"></el-switch>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import { setTheme } from "@/theme";

export default {
  computed: {
    showTipsJoinRoom: {
      get() {
        return this.$store.state.showTipsJoinRoom;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showTipsJoinRoom", value });
      },
    },
    showTipsQuitRoom: {
      get() {
        return this.$store.state.showTipsQuitRoom;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showTipsQuitRoom", value });
      },
    },
    showTipsSwitchMusic: {
      get() {
        return this.$store.state.showTipsSwitchMusic;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showTipsSwitchMusic", value });
      },
    },
    showTipsPlayMusic: {
      get() {
        return this.$store.state.showTipsPlayMusic;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showTipsPlayMusic", value });
      },
    },
    show_all_tips: {
      get() {
        return this.$store.state.show_all_tips;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "show_all_tips", value });
      },
    },
    showTipsNotice: {
      get() {
        return this.$store.state.showTipsNotice;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showTipsNotice", value });
      },
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "theme", value });
      },
    },
    showHistoryBarrageInfo: {
      get() {
        return this.$store.state.showHistoryBarrageInfo;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showHistoryBarrageInfo", value });
      },
    },
    showBarrageImg: {
      get() {
        return this.$store.state.showBarrageImg;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showBarrageImg", value });
      },
    },
    showBarrageAvatar: {
      get() {
        return this.$store.state.showBarrageAvatar;
      },
      set(value) {
        return this.setGlobalRoomConfig({ key: "showBarrageAvatar", value });
      },
    },
  },
  methods: {
    ...mapMutations([
      "setGlobalRoomConfig",
      "clearTipsInfo",
      "clearNoticeInfo",
    ]),
    changeTheme(val) {
      setTheme(val);
    },
  },
};
</script>
<style lang="less" scoped>
.global-config {
  padding: 0 15px;
  width: 100%;
  height: 100%;
}
</style>
