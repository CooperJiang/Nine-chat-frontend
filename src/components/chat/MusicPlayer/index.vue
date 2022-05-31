<template>
	<div class="music">
		<audio v-if="music_src" ref="music" :src="music_src" autoplay @timeupdate="updateTime"></audio>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      time: null,
      isPlay: false,
    };
  },
  computed: {
    ...mapState(["music_src", "music_start_time"]),
  },
  watch: {
    music_start_time(n) {
      this.time = n;
      this.specifiedTime(n);
    },
  },
  mounted() {
    document.addEventListener("touchstart", this.handlerTouchPlay, false);
  },
  methods: {
    ...mapMutations(["setCurrenMusicTime"]),
    play() {
      this.$refs.music.play();
    },
    pause() {
      this.$refs.music.pause();
    },
    specifiedTime(currentTime) {
      this.$nextTick(() => {
        if (this.$refs.music?.fastSeek) {
          this.$refs.music.fastSeek(currentTime);
        } else {
          this.$refs.music.currentTime = currentTime;
          this.$refs.music.play();
        }
      });
    },
    /* 拿到当前时间，取出当前歌词 */
    updateTime(e) {
      this.setCurrenMusicTime(e.target.currentTime);
    },

    /* 部分设备不支持自动播放，让其他点击屏幕到加载了歌曲播放为止 */
    handlerTouchPlay() {
      if (!this.isPlay && this.time && this.$refs.music) {
        this.$refs.music.currentTime = this.time;
        this.$refs.music.play();
        this.isPlay = true;
        document.removeEventListener("touchstart", this.handlerTouchPlay);
      }
    },
  },
};
</script>
