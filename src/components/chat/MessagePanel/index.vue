<template>
  <div id="box" class="message-box">
    <div
      v-for="(item, index) in messageList"
      :key="index"
      :class="['message-box-item', messageClass(item)]"
    >
      <!-- text  -->
      <span
        v-if="['text', 'img'].includes(item.message_type)"
        class="message-box-item-info"
      >
        <div class="info-box">
          <span :class="['name']">
            {{ item.user_info && item.user_info.user_nick }}
          </span>
          <span
            v-if="item.message_type === 'text'"
            class="message"
            v-html="replaceEmotionText(item.message_content)"
          ></span>
          <span v-if="item.message_type === 'img'" class="emoji">
            <img
              :src="item.message_content"
              loading="lazy"
              @click="previewImg(item)"
            />
          </span>
        </div>
        <!-- 用户可能删除账户的情况就没有item.user_info了 -->
        <img
          v-if="item.user_info"
          class="avatar"
          :src="item.user_info.user_avatar"
        />
        <img v-if="!item.user_info" class="avatar" :src="errAvatar" />
      </span>

      <!-- info -->
      <span v-if="item.message_type === 'info'" class="msg">
        {{ item.message_content }}
      </span>

      <!-- notice -->
      <span v-if="item.message_type === 'notice'" class="notice-box">
        <div class="notice-box-header">
          <span class="title">房间公告</span>
        </div>
        <div v-for="(t, i) in item.message_content" :key="i">{{ t }}</div>
      </span>
    </div>
    <!-- <chat-preview ref="preImg" mode="preImg" :lock-modal="false" /> -->
    <div ref="end" id="panel_bottom" class="end"></div>
  </div>
</template>

<script>
import { replaceEmotionText } from "@/components/Emotion/emotion.js";
import { throttle } from "@/utils/tools";
import { mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      isVisible: true, // 是否在可视区域
      unReadNum: 0, // 未读消息条数
      errAvatar:
        "https://img1.baidu.com/it/u=430660535,1172956011&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    };
  },
  methods: {
    ...mapMutations(["setMessageDataList"]),
    replaceEmotionText,
    /**
     * @desc 监听窗口确定是否跳转到底部
     *       1. 初始化的时候默认在消息底部
     *       2. 在视窗高度450内的时候有消息自动滑到底部
     *       3. 在视窗450以上说明去看历史消息了 这个时候不到底部 提示有新消息
     *       4. 在显示有新消息的时候 再次到底部新消息提示消失
     */
    scrollToTop() {
      const el = document.querySelector(`#box`);
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      this.isVisible = el.offsetHeight + scrollTop - scrollHeight > -450;
      /* 滑到顶部了加载更多消息 */
      const msgEl = document.querySelector(`.message-box-item`);
      this.isVisible && (this.unReadNum = 0);
      this.isVisible && this.$emit("newMsg", this.unReadNum);
      !scrollTop && this.$emit("loadMoreMessage");
      !scrollTop && msgEl.scrollIntoView(true);
      if (el.offsetHeight + scrollTop - scrollHeight === 0) {
        // console.log("到底了");
      }
    },
    /* 滚动到底部 */
    toEnd() {
      this.$nextTick(() => {
        this.$refs.end.scrollIntoView(true);
      });
    },
    previewImg() {
      console.log("预览图片");
    },
  },
  created() {},
  mounted() {
    document
      .querySelector(`#box`)
      .addEventListener("scroll", throttle(this.scrollToTop));
  },
  watch: {
    messageList() {
      this.isVisible && this.toEnd();
      if (!this.isVisible) {
        this.unReadNum += 1;
        this.$emit("unReadMsg", this.unReadNum);
      }
    },
  },
  computed: {
    mineId() {
      return this.$store.state.userInfo.userId;
    },
    messageList() {
      return this.$store.state.messageDataList;
    },
    messageClass() {
      return (item) => {
        const { user_id, message_type } = item;
        if (["text", "img"].includes(message_type)) {
          return user_id === this.mineId ? "mine" : "other";
        }
        return message_type;
      };
    },
  },
};
</script>
<style lang="less" scoped>
.message-box {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &-item {
    display: flex;
    margin: 7px 0;
    &-info {
      display: flex;
      .info-box {
        display: flex;
        flex-direction: column;
        .message {
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 6px;
          margin-top: 10px;
          cursor: pointer;
          text-align: justify;
          line-height: 2;
          max-width: 300px;
        }
        .emoji {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          img {
            max-width: 350px;
            border-radius: 5px;
            cursor: pointer;
          }
        }
        .name {
          font-size: 14px;
          color: #3c3c3c;
        }
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }
  }
}
.mine {
  color: #000;
  justify-content: flex-end;
  .message-box-item-info {
    flex-direction: row;
    .info-box {
      align-items: flex-end;
      margin-right: 20px;
      .message {
        background-color: #a9e87a;
        color: #000;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: -5px;
          left: auto;
          right: -13px;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 15px 0;
          color: #a9e87a;
        }
      }
    }
  }
}
.other {
  justify-content: flex-start;
  .message-box-item-info {
    flex-direction: row-reverse;
    .info-box {
      align-items: flex-start;
      margin-left: 20px;
      .message {
        background-color: #eee;
        color: #000;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -5px;
          left: -13px;
          right: auto;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 0 15px;
          color: #eee;
        }
      }
    }
  }
}
.info {
  justify-content: center;
  .msg {
    font-size: 12px;
    color: #aaa;
    display: inline-block;
    background-color: #eee;
    padding: 2px 8px;
    border-radius: 3px;
    max-width: 500px;
  }
}
.notice {
  justify-content: center;
  &-box {
    text-align: left;
    max-width: 500px;
    background: #eee;
    padding: 10px 15px;
    border-radius: 10px;
    color: #999;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    letter-spacing: 3px;
    &-header {
      display: flex;
      .title {
        font-size: 16px;
        color: #1295dd;
        display: inline-block;
        border-bottom: 2px dotted #1295dd;
        margin-bottom: 10px;
        padding-bottom: 5px;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
