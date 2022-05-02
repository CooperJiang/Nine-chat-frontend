<template>
  <div class="message-frame">
    <chat-toolbar @emotion="handlerEmotion" />
    <textarea
      ref="messageInput"
      v-model.trim="message"
      class="message-frame-input"
      @keydown="sendMsg"
      @paste="pasting"
    />
  </div>
</template>

<script>
import ChatToolbar from "@/components/chat/ChatToolbar";

export default {
  components: { ChatToolbar },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMsg(e) {
      if (e.keyCode === 13 && this.message) {
        const data = { message_type: "text", message_content: this.message };
        this.$socket.client.emit("message", data);
        this.$nextTick(() => {
          this.$scorllToBottom();
        });
        this.message = "";
        e.preventDefault();
      }
    },
    pasting() {},

    handlerEmotion(emoji) {
      this.message += `[${emoji.text}]`;
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="less" scoped>
.message-frame {
  width: 100%;
  .progress {
    width: 100%;
    height: 2px;
  }
  &-input {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 50px;
    padding: 10px 15px;
    resize: none;
    outline: none;
    border: none;
    font-size: 13px;
    background-color: transparent;
  }
}
</style>
