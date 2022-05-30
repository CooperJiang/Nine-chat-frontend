<template>
	<transition name="slide">
		<div v-if="show" class="animation-content">
			<div ref="imgContent" class="img-view">
				<img ref="img" v-dragwidth draggable="false" :width="img.w" :height="img.h" :src="filePath" @error="handleError" />
				<!-- <div class="zoom-bage">{{zoom}}</div> -->
			</div>
			<div class="btns">
				<div class="iconfont icon-guanbi" @click="handleClose">
					<icon name="chat-pre-close" scale="1.8" />
				</div>
				<div class="iconfont icon-huifu" @click="handleRef">
					<icon name="chat-pre-recovert" scale="1.8" />
				</div>
				<div class="iconfont icon-xiazai" @click="handleDownFile">
					<icon name="chat-pre-download" scale="1.8" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { aspectRatioToWH, getImgBlod } from "@/utils/tools";

export default {
  name: "PreImg",
  directives: {
    dragwidth: {
      bind(el) {
        const odiv = el;
        let x = 0;
        let y = 0;
        let l = 0;
        let t = 0;
        let isDown = false;
        odiv.onmousedown = function (e) {
          if (e.button === 0) {
            x = e.clientX;
            y = e.clientY;
            l = odiv.offsetLeft;
            t = odiv.offsetTop;
            isDown = true;

            document.onmousemove = function (e) {
              if (!isDown) return;
              const nx = e.clientX;
              const ny = e.clientY;
              odiv.style.left = `${nx - (x - l)}px`;
              odiv.style.top = `${ny - (y - t)}px`;
            };
            document.onmouseup = function () {
              isDown = false;
              document.onmousemove = null;
              document.onmouseup = null;
            };
          }
        };
      },
    },
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
      filePath: "",
      zoom: 0, // 缩放比 %
      img: {
        w: 0,
        h: 0,
      },
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        if (!Object.keys(val).length) return;
        const { width, height, downFilePath, url } = val;
        this.show = true;
        this.filePath = url;
        this.img = aspectRatioToWH(
          this.clientWidth - 100,
          this.clientHeight - 200,
          width / height,
          width,
          height
        );
        this.originalW = width;
        this.zoom = parseInt((this.img.w / width) * 100, 10);
        this.minImg = { ...this.img };
        setTimeout(() => {
          this.$refs.img.style.left = "auto";
          this.$refs.img.style.top = "auto";
          this.$refs.imgContent.addEventListener("wheel", this.setImgWH);
        }, 800);

        // 获取高清图片
        if (!downFilePath) return;
        getImgBlod(downFilePath)
          .then((res) => {
            this.filePath = res;
            this.img = aspectRatioToWH(
              this.clientWidth - 100,
              this.clientHeight - 200,
              width / height,
              width,
              height
            );
          })
          .catch(() => {
            this.$message.error("图片加载失败");
          });
      },
    },
  },
  mounted() {
    const { height, width } = document.documentElement.getBoundingClientRect();
    this.clientWidth = width;
    this.clientHeight = height;
  },
  methods: {
    handleRef() {
      this.$refs.img.style.left = "auto";
      this.$refs.img.style.top = "auto";
      this.img = { ...this.minImg };
    },
    handleError() {
      this.$message.error("图片加载失败");
    },
    setImgWH(e) {
      const { img } = this.$refs;
      if (!img) return;
      const oX = img.offsetLeft + this.img.w / 2;
      const oY = img.offsetTop + this.img.h / 2;
      if (e.wheelDeltaY > 0) {
        this.img.w += this.img.w * 0.1;
        this.img.h += this.img.h * 0.1;
      } else {
        this.img.w -= this.img.w * 0.1;
        this.img.h -= this.img.h * 0.1;
      }
      this.img.w < this.minImg.w && (this.img.w = this.minImg.w);
      this.img.h < this.minImg.h && (this.img.h = this.minImg.h);
      img.style.left = `${oX - this.img.w / 2}px`;
      img.style.top = `${oY - this.img.h / 2}px`;
      this.zoom = parseInt((this.img.w / this.originalW) * 100, 10);
    },
    handleClose() {
      this.show = false;
    },
    handleDownFile() {
      return this.$message.warning("服务器资源有限，暂不提供原图下载功能！");
    },
  },
};
</script>

<style lang="less" scoped>
.animation-content {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  backdrop-filter: blur(20px);
  overflow: hidden;

  .img-view {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      position: absolute;
      // cursor: pointer;
    }

    .zoom-bage {
      position: absolute;
      right: 0px;
      bottom: 10px;
      font-size: 14px;
      color: #fff;
      width: 88px;
      text-align: center;
    }
  }

  .btns {
    position: absolute;
    right: 20px;
    bottom: 60px;
    transform: translateY(-50%);
    color: #ffffff9e;
    z-index: 1000;

    div {
      margin: 10px 0;
      display: flex;
      width: 35px;
      height: 35px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      background: #0016484f;
      cursor: pointer;

      &:hover {
        background: #38acfa;
        color: #ffffff;
      }

      &.shoucang {
        color: #38acfa;
        &:hover {
          color: #ffffff;
        }
      }
    }
  }
}

.slide-enter-active {
  transition: all 0.5s, border-radius 0.8s 0.3s;
}
.slide-leave-active {
  transition: all 0.8s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  border-radius: 0 0 100% 0;
  width: 10px;
  height: 10px;
  background: #000;
}

.slide-leave-to {
  border-radius: 0 0 0 100%;
  right: 0;
}
</style>
