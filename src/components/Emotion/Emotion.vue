<template>
	<div :style="{ height: height, backgroundColor: bgColor }" class="emoji-box">
		<ul :style="{ width: width, padding: `${padding}px` }" class="emoji-wrap">
			<li v-for="item in list" :key="item.id" :data-code="item.id" :title="item.text" class="emoji" @click="handleClick(item)">
				<img :alt="item.text" :src="getEmotionImgUrl(item.id)" />
			</li>
		</ul>
	</div>
</template>

<script>
import { emotionData, getImgUrl } from "@/components/Emotion/emotion";

export default {
  name: "Emotion",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    bgColor: {
      type: String,
      default: "transparent",
    },
    padding: {
      type: Number,
      default: () => 5,
    },
  },
  data() {
    return {
      list: emotionData,
    };
  },
  methods: {
    handleClick(item) {
      this.$emit("emotion", item);
    },
    getEmotionImgUrl(id) {
      return getImgUrl(id);
    },
  },
};
</script>

<style lang="less" scoped>
.emoji-box {
  border-radius: 5px;
  overflow: hidden;
  overflow-y: auto;
  .emoji-wrap {
    overflow: hidden;
    .emoji {
      float: left;
      margin: 5px;
      padding: 3px;
      border-radius: 5px;
      border: 1px solid @message-hover-bg-color;
      background: @message-hover-bg-color;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      -webkit-user-drag: none;
      img {
        transition: all 0.2s ease-in-out;
        width: 30px;
        height: 30px;
        -webkit-user-drag: none;
        pointer-events: none;
        user-select: none;
      }
      &:hover {
        background: @message-hover-bg-color;
        img {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
