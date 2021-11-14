<template>
  <div class="lrc s-1-line">
    <icon name="music" class="icon" scale="1.6" />
    {{ lrc || "歌词正在加载中..." }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["current_music_time", "music_lrc"]),
    lrc() {
      if (!this.music_lrc) return;
      const res = this.music_lrc.filter(
        (t) => t.time < this.current_music_time
      );
      let currentLrc = null;
      res.length && (currentLrc = res[res.length - 1].lineLyric);
      return currentLrc;
    },
  },
};
</script>
<style lang="less" scoped>
.lrc {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #999;
  .icon {
    margin-right: 5px;
  }
}
</style>
