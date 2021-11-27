<template>
  <transition name="slide-fade">
    <div class="my-notify" v-if="notifyFlag">
      <div class="notify success" v-if="type == 'success'">
        <icon name="icon-success" scale="2"></icon>
        <span class="content"> {{ content }}</span>
        <div v-if="noNotifyBtn" class="noNotifyAgain">
          <span @click="noAgainFun">{{ noRemind }}</span>
        </div>
      </div>
      <div class="notify message" v-else-if="type == 'message'">
        <icon name="icon-message" scale="2"></icon>
        <span class="content">{{ content }}</span>
        <div v-if="noNotifyBtn" class="noNotifyAgain">
          <span @click="noAgainFun">{{ noRemind }}</span>
        </div>
      </div>
      <div class="notify error" v-else-if="type == 'error'">
        <icon name="icon-error" scale="2"></icon>
        <span class="content">{{ content }}</span>
        <div v-if="noNotifyBtn" class="noNotifyAgain">
          <span @click="noAgainFun">{{ noRemind }}</span>
        </div>
      </div>
      <div class="notify warning" v-else-if="type == 'warning'">
        <icon name="icon-warning" scale="2"></icon>
        <span class="content">{{ content }}</span>
        <div v-if="noNotifyBtn" class="noNotifyAgain">
          <span @click="noAgainFun">{{ noRemind }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "notifyMessage",
  props: {},
  components: {},
  data() {
    return {
      noRemind: "Dont remind again",
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    noAgainFun() {
      sessionStorage.setItem("dontRemindAgain", "1");
    },
  },
};
</script>

<style lang="less" scoped>
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.notify-wrap {
  background-color: #edf2fc;
}
.my-notify {
  margin: 10px;
  min-width: 380px;
  z-index: 999;
}
.notify {
  padding: 15px 15px;
  border-radius: 4px;
  background-color: rgb(255, 244, 224);
  box-shadow: -5px 5px 12px 0 rgba(204, 204, 204, 0.8);
  animation: show cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
  display: flex;
  align-items: center;
  z-index: 999;
  .content {
    font-size: 14px;
    word-break: break-all;
    word-wrap: break-word;
    margin-left: 5px;
  }
}
.notifyPadding {
  // padding: 15px 15px 10px 15px;
}
.message {
  background-color: #edf2fc;
  i,
  .content {
    color: #909399;
  }
}
.success {
  background-color: #f0f9eb;
  i,
  .content {
    color: #67c23a;
  }
}
.error {
  background-color: #fef0f0;
  i,
  .content {
    color: #f56c6c;
  }
}
.warning {
  background-color: #fdf6ec;
  i,
  .content {
    color: #e6a23c;
  }
}
.noNotifyAgain {
  width: 100%;
  text-align: right;
  span {
    font-size: 12px;
    color: rgb(204, 201, 201);
    border-bottom: 1px solid rgb(204, 201, 201);
    cursor: pointer;
    &:hover {
      color: #001a70;
      border-bottom: 1px solid #001a70;
    }
  }
}
@keyframes show {
  0% {
    transform: translateY(-60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
