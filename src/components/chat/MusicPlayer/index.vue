<template>
  <div class="music">
    <audio
      v-if="music_src"
      ref="music"
      :src="music_src"
      autoplay
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  watch: {
    music_start_time(n) {
      this.specifiedTime(n);
    },
  },
  computed: {
    ...mapState(["music_src", "music_start_time"]),
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
      // const res = this.musicLrc.filter((t) => t.time < e.target.currentTime);
      // let currentLrc = null;
      // res.length && (currentLrc = res[res.length - 1].lineLyric);
      // this.$emit("updateLrc", {
      //   currentLrc,
      //   currentTime: parseInt(e.target.currentTime),
      // });
    },
  },
};
</script>
