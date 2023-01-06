<template>
	<div class="chat-tips">
		<div class="tips">
			<span class="tips-lable">Tips: </span>
			<ul class="tips-content" :class="{ anim: animate == true }">
				<li v-for="(item, index) in tips" :key="index" class="item s-1-line">
					<span class="value">{{ item.msg }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      animate: false,
      tips: [
        { msg: '点击ESC即可切换到弹幕模式啦...' },
        { msg: '聊天框右下角拥有超多设置哟...' },
        { msg: '想要隐藏自己的专属背景请按 ~ 键...'},
        { msg: '可以粘贴就能发送图片啦...' },
        { msg: '点击表情包可以搜索哟...' },
        { msg: '有bug欢迎反馈哟、看到就会改啦！' }
      ],
      timer: null
    }
  },
  created() {
    this.timer = setInterval(this.scroll, 3000)
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    scroll() {
      this.animate = true
      setTimeout(() => {
        this.tips.push(this.tips[0])
        this.tips.shift()
        this.animate = false
      }, 1500)
    }
  }
}
</script>
<style lang="less" scoped>
.chat-tips {
  height: 100%;
  display: flex;
  align-items: center;
}
.tips {
  // width: 400px;
  height: 22px;
  overflow: hidden;
  padding-left: 30px;
  display: flex;
  align-items: center;
  &-lable {
    color:  @message-main-text-color;
    margin-right: 10px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    .item {
      list-style: none;
      line-height: 20px;
      height: 20px;
      .value {
        color: #999;
      }
    }
  }
}
.anim {
  transition: all 1.5s;
  margin-top: -20px;
}
</style>
