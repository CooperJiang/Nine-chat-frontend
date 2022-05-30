<template>
	<div v-if="show" class="modal">
		<div class="modal-container">
			<div class="header">
				<slot name="header"> {{ title }} </slot>
			</div>
			<div class="content">
				<slot name="content">{{ content }}</slot>
			</div>
			<slot name="footer">
				<div class="footer">
					<btn v-if="showCancelButton" class="m_r5" @click="cancel">{{
            cancelButtonText
					}}</btn>
					<btn v-if="showConfirmButton" theme="gradient" @click="confirm">{{
            confirmButtonText
					}}</btn>
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
import Btn from "@/components/Btn";

export default {
  components: { Btn },
  props: {
    title: {
      type: String,
      default: "欢迎加入聊天室",
    },
    content: {
      type: String,
      default: "请注意:加入聊天室将开始自动播放音乐！",
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    showCancelButton: {
      type: Boolean,
      default: false,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    confirmButtonText: {
      type: String,
      default: "确认",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm");
      this.show = false;
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  /* stylelint-disable */
  font-family: "webfont";
  &-container {
    padding: 10px 15px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    .header {
      color: #303133;
      font-size: 18px;
      font-weight: 600;
    }
    .content {
      padding: 15px;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      .btn {
        padding: 4px 15px;
        border-radius: 3px;
        background: #409eff;
        color: #fff;
        font-weight: 500;
        user-select: none;
        cursor: pointer;
        &:hover {
          filter: brightness(0.8);
        }
        &:active {
          filter: brightness(1.1);
        }
      }
    }
  }
}
</style>
