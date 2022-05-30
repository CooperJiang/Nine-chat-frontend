<template>
	<div class="queue">
		<div v-if="!music_queue_list.length" class="empty">
			<icon name="choose-music-empty" scale="16" class="m_b30" />
			<span class="tips">一首都没有、还不快来点</span>
		</div>
		<div v-else class="queue-content">
			<div v-for="(item, index) in music_queue_list" :key="index" class="music">
				<img :src="item.music_cover" alt="item.music_name" class="music-pic" />
				<div class="music-info">
					<div class="music-info-name">{{ item.music_name }}</div>
					<div class="music-info-desc s-1-line">歌手：{{ item.music_singer }} 专辑:{{ item.music_album }}</div>
				</div>
				<div class="music-btn" @click="tips"><icon name="queue-music-zan" scale="1.6" class="m_r3" />顶歌</div>
				<div class="music-btn" @click="removeQueueMusic(item)"><icon name="queue-music-del" scale="1.6" class="m_r3" />移除</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["music_queue_list"]),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    tips() {
      this.$message.info("正在加班加点开发ing");
    },
    removeQueueMusic(musicInfo) {
      this.$socket.client.emit("removeQueueMusic", musicInfo);
    },
  },
};
</script>
<style lang="less" scoped>
.queue {
  padding: 10px 15px;
  .empty {
    margin-top: 30px;
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tips {
      user-select: none;
      color: @message-main-text-color;
    }
  }
  &-content {
    height: 338px;
    overflow: hidden;
    overflow-y: auto;
    .music {
      display: flex;
      align-items: center;
      border-top: 1px solid @message-border-color;
      padding: 10px 0;
      &-pic {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      &-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 8px;
        flex: 1;
        width: 0;
        &-name {
          font-size: 14px;
          color: @message-main-text-color;
        }
        &-desc {
          font-size: 12px;
        }
      }
      &-btn {
        user-select: none;
        padding: 5px 10px;
        margin: 0 2px;
        border-radius: 5px;
        cursor: pointer;
        color: @message-main-text-color;
        &:hover {
          background: message-hover-bg-color;
        }
        &:active {
          filter: brightness(1.2);
          color: #000;
        }
      }
    }
  }
}
</style>
