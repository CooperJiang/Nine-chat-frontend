<template>
  <div class="emotion">
    <div class="emotion-header">
      <input
        ref="input"
        v-model="keyword"
        type="text"
        placeholder="找到你喜欢的表情包吧[请输入中文]"
        @keydown.enter="search"
        @input="input"
      />
      <div class="emotion-header-btn" @click="search">
        <icon name="toolbar-search" class="icon" scale="1.6" />
        搜索
      </div>
    </div>
    <div v-loading="loading" class="emotion-content">
      <emotion v-if="!emoticonList.length" :padding="0" @emotion="emotion" />
      <div v-else class="emotion-content-emoji">
        <div v-for="(url, index) in emoticonList" :key="index" class="resulu">
          <img :src="url" class="resulu-pic" @click="sendEmoji(url)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Emotion from "@/components/Emotion/Emotion.vue";
import { queryEmo } from "@/api/emoticon";
export default {
  components: { Emotion },
  data() {
    return {
      loading: false,
      keyword: null,
      emoticonList: [],
    };
  },
  methods: {
    emotion(val) {
      this.$emit("emotion", val);
    },
    async search() {
      if (!this.keyword) return;
      this.loading = true;
      try {
        const res = await queryEmo({ keyword: this.keyword });
        this.emoticonList = res.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    input(e) {
      if (!e.target.value) {
        this.emoticonList = [];
      }
    },
    sendEmoji(url) {
      const data = { message_type: "img", message_content: url };
      this.$socket.client.emit("message", data);
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="less" scoped>
.emotion {
  padding: 0 10px;
  border-top: 1px solid #eee;
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e5e5e5;
    transition: all 0.3s;
    font-size: 13px;
    color: #999;
    border-radius: 5px;
    margin: 7px 0;
    input {
      padding: 8px 16px;
      flex: 1;
      font-size: 13px;
      outline: none;
      border: none;
      color: #999;
      background: transparent;
      &::placeholder {
        color: #ccc;
        font-size: 14px;
      }
    }
    &-btn {
      padding: 9px 18px;
      border-left: 1px solid #e5e5e5;
      user-select: none;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      .icon {
        margin-right: 3px;
      }
      &:hover {
        filter: brightness(0.8);
        border-left: 1px solid transparent;
      }
      &:active {
        filter: brightness(1.2);
      }
    }
  }

  &-content {
    height: 275px;
    user-select: none;
    overflow: hidden;
    overflow-y: auto;
    &-emoji {
      display: flex;
      flex-wrap: wrap;
      img {
        width: 82px;
        height: 82px;
        margin: 6px;
        border-radius: 8px;
        border: 1px solid #eee;
        padding: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        transition: all 0.3s;
        &:active {
          transform: scale(1.3);
        }
      }
    }
  }
}
</style>
