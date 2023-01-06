<template>
	<div class="bullect">
		<span></span>
		<!-- <span>弹幕系统将于3.0开发</span> -->
		<div v-if="lrc" class="bullect-lrc">
			{{ lrc || "歌词正在加载中..." }}
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState(["current_music_time", "music_lrc"]),
    lrc() {
      if (!this.music_lrc) return;
      const res = this.music_lrc.filter(t => t.time < this.current_music_time );
      return res.length && res[res.length - 1].lineLyric;
    },
  },
}
</script>
<style lang="less" scoped>
.bullect{
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  &-lrc{
    font-size: 18px;
  }
}
</style>
