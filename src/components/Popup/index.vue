<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="modal" @click.stop="maskClose">
      <div :style="{ width, marginTop: top }" class="modal-container">
        <div class="header">
          <slot v-if="!title" name="header"></slot>
          <div class="header-default">
            <span>{{ title }}</span>
            <span @click="close">
              <icon v-if="showCloseBtn" name="close" scale="2.4" />
            </span>
          </div>
        </div>
        <div class="content">
          <slot> </slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    lock: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "标题",
    },
    width: {
      type: String,
      default: () => "50%",
    },
    top: {
      type: String,
      default: () => "15vh",
    },
    beforeClose: {
      type: Function,
      default: () => true,
    },
    showCloseBtn: {
      type: Boolean,
      default: () => true,
    },
  },
  methods: {
    joinRoom() {
      this.$emit("joinRoom");
      this.show = false;
    },
    maskClose() {
      if (this.lock) return;
      this.beforeClose() && this.$emit("close");
    },
    close() {
      this.beforeClose() && this.$emit("close");
    },
  },
  mounted() {},
  watch: {
    show(n) {
      this.visible = n;
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
  font-family: "webfont";

  &-container {
    background: #fff;
    border: 1px solid #fff;
    box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
    border-radius: 5px;
    margin: 0 auto 50px;
    padding: 20px;
    .header {
      color: #303133;
      font-size: 18px;
      font-weight: 600;
      &-default {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      margin: 20px 0;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
</style>
