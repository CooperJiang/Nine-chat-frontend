<template>
  <div v-loading="loading" class="choose">
    <div class="choose-header">
      <input
        ref="input"
        v-model="params.keyword"
        type="text"
        placeholder="歌手/歌名/专辑搜索..."
        @keydown.enter="search"
      />
      <div class="choose-header-btn" @click="search">
        <icon name="toolbar-search" class="m_r5" scale="1.6" />
        搜索
      </div>
    </div>
    <div class="choose-content">
      <div v-if="!isShowMusic" class="choose-content-empty" @click="focus">
        <icon name="choose-music-empty" class="icon" scale="16" />
        <span class="tips">请输入关键词搜索歌曲</span>
      </div>

      <div v-if="isShowMusic" class="choose-content-music">
        <div v-for="(item, index) in musicList" :key="index" class="music">
          <img
            v-if="item.music_pic120"
            :src="item.music_pic120"
            alt="item.name"
            class="music-pic"
          />
          <img
            v-if="item.music_pic"
            :src="item.music_pic"
            alt="item.name"
            class="music-pic"
          />
          <div class="music-info">
            <div class="music-info-name">{{ item.music_name }}</div>
            <div class="music-info-desc s-1-line">
              歌手：{{ item.music_artist }} 专辑:{{ item.music_album }}
            </div>
          </div>
          <div class="music-btn" @click="chooseMusic(item)">
            <icon name="choose-music-play" class="m_r5" scale="1.6" />点歌
          </div>
          <div class="music-btn" @click="loveMusic(item)">
            <icon name="choose-music-love" class="m_r5" scale="1.6" />收藏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { search, collectMusic, hot } from "@/api/music";
export default {
  data() {
    return {
      isShowMusic: false,
      musicList: [],
      loading: false,
      params: {
        page: 1,
        pagesize: 30,
        keyword: "孤城",
      },
    };
  },
  mounted() {
    this.focus();
  },
  created() {
    this.queryHotMusic()
  },
  methods: {
    /* 光标到输入框 */
    focus() {
      this.$refs.input.focus();
    },
    /* 搜索歌曲 */
    async search() {
      if (!this.params.keyword) return;
      this.loading = true;
      const res = await search(this.params);
      this.loading = false;
      this.musicList = res.data;
      this.isShowMusic = true;
    },
    /* 客户端点歌请求 */
    chooseMusic(val) {
      this.$socket.client.emit("chooseMusic", val)
    },
    /* 客户端收藏音乐到歌单 */
    async loveMusic(val) {
      await collectMusic(val)
      this.$message.success("收藏歌曲成功！")
    },
    /* 获取热门歌曲 */
    async queryHotMusic() {
      const res = await hot();
      this.isShowMusic = true;
      this.musicList = res.data;
    }
  },
};
</script>
<style lang="less" scoped>
.choose {
  padding: 0 15px;
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
      transition: all .3s;
      &:hover {
        filter: brightness(0.8);
        border-left: 1px solid transparent;
      }
      &:active {
        filter: brightness(1.2);
        transform: scale(1.2);
      }
    }
  }

  &-content {
    height: 275px;
    user-select: none;
    overflow: hidden;
    overflow-y: auto;
    &-empty {
      padding: 25px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        margin-bottom: 20px;
      }
      .tips {
        user-select: none;
        color: #909399;
      }
    }
    .music {
      display: flex;
      align-items: center;
      border-top: 1px solid #f5f5f5;
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
          color: #333;
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
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          margin-right: 3px;
        }
        &:hover {
          background: #eee;
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
