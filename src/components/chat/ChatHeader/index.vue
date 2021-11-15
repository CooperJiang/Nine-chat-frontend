<template>
  <div class="header flex_between">
    <div class="header-left flex_start">
      <div class="header-left-id">
        <span class="visible-xl visible-md visible-sm">ID:</span>
        888
      </div>
      <div class="header-left-name">
        <span class="visible-xl visible-md visible-sm">听听听听听歌鸭</span>
      </div>
      <div
        class="header-left-share flex_center"
        :data-clipboard-text="copyText"
        @click="share"
      >
        <icon name="chat-share" scale="1.8" class="icon" />
        <span class="visible-xl visible-md visible-sm">分享</span>
      </div>
    </div>
    <div class="header-right flex_center">
      <div class="header-right-item flex_center" @click.stop="openBox(1)">
        <icon name="chat-online" scale="1.8" class="icon" />
        <span class="visible-xl visible-md visible-sm">
          在线[{{ onLineNum }}]
        </span>
      </div>
      <div class="header-right-item flex_center" @click.stop="openBox(2)">
        <icon name="chat-room" scale="1.8" class="icon" />
        <span class="visible-xl visible-md visible-sm">房间</span>
      </div>
      <div class="header-right-item flex_center" @click.stop="openBox(3)">
        <icon name="chat-mine" scale="1.8" class="icon" />
        <span class="visible-xl visible-md visible-sm">我的</span>
      </div>
      <div class="header-right-item flex_center" @click="toBlog">
        <icon name="chat-go" scale="1.8" class="icon" />
        <span class="visible-xl visible-md visible-sm">前往</span>
      </div>
    </div>
    <!-- popup -->
    <chat-popup :options="opt1" :top="60" :right="10" title="在线用户">
      <online-list />
    </chat-popup>
    <chat-popup :options="opt2" :top="60" :right="10" title="房间信息" />
    <chat-popup :options="opt3" :top="60" :right="10" title="个人中心" />
  </div>
</template>

<script>
import Clipboard from "clipboard";
import ChatPopup from "@/components/ChatPopup";
import OnlineList from "./components/OnLineList.vue";
export default {
  components: { ChatPopup, OnlineList },
  data() {
    return {
      opt1: {
        show: false,
      },
      opt2: {
        show: false,
      },
      opt3: {
        show: false,
      },
    };
  },
  methods: {
    share() {
      const clipboard = new Clipboard(".header-left-share");
      clipboard.on("success", () => {
        this.$message.success("复制成功、快发给你的小伙伴一起来听音乐吧~");
        clipboard.destroy();
      });
    },
    openBox(val) {
      if (this[`opt${val}`].show) return (this[`opt${val}`].show = false);
      this.closeBox();
      this[`opt${val}`].show = !this[`opt${val}`].show;
    },
    closeBox() {
      const self = this;
      const res = Object.keys(self._data).filter(
        (key) => key.search("opt") !== -1
      );
      res.forEach((t) => (self[t].show = false));
    },
    toBlog() {
      window.open("https://jiangly.com");
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    copyText() {
      return "分享内容";
    },
    onLineNum() {
      return this.$store.state.onlineUserList.length;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 100%;
  padding: 0 15px;
  user-select: none;
  &-left {
    &-id {
      user-select: none;
      background-color: #333;
      color: #fff;
      display: flex;
      padding: 0 5px;
      font-size: 14px;
      border-radius: 3px;
      margin-right: 5px;
    }
    &-name {
      font-size: 18px;
      user-select: none;
      margin-right: 12px;
    }
    &-share {
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 5px;
      transition: all 0.3s;
      .icon {
        margin-right: 3px;
      }
      &:hover {
        background: #eee;
      }
    }
  }

  &-right {
    &-item {
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      color: #999;
      border-radius: 5px;
      margin: 0 3px;
      z-index: 3001;
      .icon {
        margin-right: 3px;
      }
      &:hover {
        background: #eee;
      }
      &:active {
        filter: brightness(1.2);
      }
    }
  }
}
</style>
