<template>
	<div class="toolbar">
		<chat-popup :options="opt1" :bottom="55" :left="10" :width="500" :height="400" title="表情包">
			<toolbar-emotion @emotion="(val) => $emit('emotion', val)" />
		</chat-popup>
		<chat-popup :options="opt2" :bottom="55" :left="10" :width="500" :height="400" title="点歌台">
			<toolbar-choose-music @chooseMusic="(val) => $emit('chooseMusic', val)" />
		</chat-popup>
		<chat-popup :options="opt3" :bottom="55" :left="10" :width="500" :height="400" title="等待播放中的歌曲">
			<toolbar-queue-music />
		</chat-popup>
		<chat-popup :options="opt4" :bottom="55" :left="10" :width="500" :height="400" title="我收藏的歌单">
			<toolbar-collect />
		</chat-popup>
		<div class="toolbar-left">
			<div :class="['toolbar-left-item',' flex_center',{ 'active-menu': opt1.show },]" @click.stop="openBox(1)">
				<icon name="toolbar-pic" class="m_r5" scale="1.6" />
				表情
			</div>
			<div :class="['toolbar-left-item',' flex_center',{ 'active-menu': opt2.show },]" @click.stop="openBox(2)">
				<icon name="toolbar-music" class="m_r5" scale="1.6" />
				点歌
			</div>
			<div :class="['toolbar-left-item',' flex_center',{ 'active-menu': opt3.show }]" @click.stop="openBox(3)">
				<icon name="toolbar-hook" class="m_r5" scale="1.6" />
				已点
			</div>
			<div :class="[ 'toolbar-left-item', ' flex_center', { 'active-menu': opt4.show }]" @click.stop="openBox(4)">
				<icon name="toolbar-love" class="m_r5" scale="1.6" />
				收藏
			</div>
		</div>
		<div class="toolbar-right"></div>
	</div>
</template>

<script>
import ChatPopup from "@/components/ChatPopup";
import ToolbarEmotion from "./components/ToolbarEmotion.vue";
import ToolbarChooseMusic from "./components/ToolbarChooseMusic.vue";
import ToolbarQueueMusic from "./components/ToolbarQueueMusic.vue";
import ToolbarCollect from "./components/ToolbarCollect.vue";
import WxPre from "./components/WxPre.vue";

export default {
  components: {
    ChatPopup,
    ToolbarEmotion,
    ToolbarChooseMusic,
    ToolbarQueueMusic,
    ToolbarCollect,
    WxPre
  },
  data() {
    return {
      opt1: { show: false },
      opt2: { show: false },
      opt3: { show: false },
      opt4: { show: false },
    };
  },
  methods: {
    openBox(val) {
      if (this[`opt${val}`].show) return (this[`opt${val}`].show = false);
      this.closeBox();
      this[`opt${val}`].show = !this[`opt${val}`].show;
    },
    closeBox() {
      // eslint-disable-next-line no-underscore-dangle
      const keys = Object.keys(this._data).filter(
        (t) => t.search("opt") !== -1
      );
      keys.forEach((t) => (this[t].show = false));
    },
  },
};
</script>
<style lang="less" scoped>
.toolbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  color: #999;
  padding: 3px 0;
  .active-menu {
    background: @message-hover-bg-color !important;
  }
  &-left {
    display: flex;
    &-item {
      user-select: none;
      margin-right: 5px;
      padding: 5px 10px;
      border-radius: 5px;
      transition: all 0.3s;
      cursor: pointer;
      position: relative;
      &:nth-child(1) {
        margin-left: 15px;
      }
      &:hover {
        background: @message-hover-bg-color;
      }
      .wx-container{
        position: absolute;
        bottom: 50px;
      }
    }
    .icon {
      margin-right: 4px;
    }
  }
}
</style>
