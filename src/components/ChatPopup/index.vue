<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="options && options.show"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        right: `${right}px`,
        left: `${left}px`,
        bottom: `${bottom}px`,
      }"
      class="frame"
      @click.stop
    >
      <div class="frame-title title">{{ title }}</div>
      <div class="frame-content"><slot></slot></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ChatFrame",
  props: {
    options: {
      type: Object,
      default: () => {} /* 使用对象的接收v-if可以达到子组件改变父组件属性 */,
    },
    width: {
      type: Number,
      default: () => 350,
    },
    height: {
      type: Number,
      default: () => 500,
    },
    top: {
      type: Number,
      default: () => null,
    },
    right: {
      type: Number,
      default: () => null,
    },
    bottom: {
      type: Number,
      default: () => null,
    },
    left: {
      type: Number,
      default: () => null,
    },
    title: {
      type: String,
      default: () => "标题信息",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.bodyClose);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyClose);
  },
  methods: {
    bodyClose() {
      const self = this;
      if (self.options.show === true) {
        self.options.show = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 480px) {
  .frame {
    position: absolute;
    right: 10px !important;
    left: 10px !important;
    height: 60vh !important;
    width: auto !important;
  }
}
.frame {
  transition: all 0.3s;
  position: absolute;
  width: 350px;
  height: 500px;
  box-shadow: 0 0 10px rgba(89, 36, 36, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  .title {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    /* stylelint-disable */
    font-family: "webfont";
  }
  &-title {
    font-size: 16px;
    padding: 10px 15px;
    padding-right: 10px;
    display: flex;
    align-items: center;
  }
  &-content {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  width: 0;
  height: 0;
  transform: translateX(150px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
</style>
