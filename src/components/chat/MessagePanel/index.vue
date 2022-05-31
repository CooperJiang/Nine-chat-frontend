<template>
	<div id="box" class="message-box">
		<div v-for="(item, index) in messageList" :key="index" :ref="`message__${item.id || -1}`" :class="['message-box-item', messageClass(item)]">
			<!-- text  'notice', 'info' 类型分别代表公告和中间的提示消息不在此处显示-->
			<span v-if="!tipsMessageType.includes(item.message_type)" class="message-box-item-info">
				<el-dropdown trigger="click" placement="bottom" size="mini" @command="handlerMessageCommand($event, item)">
					<div class="info-box">
						<span :class="['name']">
							{{ item.user_info && item.user_info.user_nick }}
						</span>

						<!-- 文字消息 -->
						<span
							v-if="
                item.message_type === 'text' && !isUrl(item.message_content)
              "
							:class="['message', textClass(item)]"
							v-html="replaceEmotionText(item.message_content)"
						></span>
						<!-- 链接地址 -->
						<a v-if="item.message_type === 'text' && isUrl(item.message_content)" :href="item.message_content" target="_blank" :class="['message', 'msg-url']" @click.stop>
							<icon name="chat-panel-link" scale="1.8" />
							{{ item.message_content }}
						</a>
						<!-- 图片消息 -->
						<span v-if="imgMessageType.includes(item.message_type)" :class="['msg-img', { 'msg-emo': item.message_type === 'emo' }]">
							<img :ref="`img__${item.id}`" :src="item.message_content.url" @click="previewImg(item)" />
						</span>
						<!-- 非图片的类型的其他信息 不包含公告提示和文字图片等所有类型 -->
						<span v-if="otherFileType(item.message_type)" class="msg-other">
							<div class="msg-other-panel">
								<div class="file-info">
									<span class="file-info-name">{{
                    item.message_content.name
									}}</span>
									<span class="file-info-size">{{
                    item.message_content.size
									}}</span>
								</div>
								<icon class="file-icon" name="chat-frame-unknow-file" scale="4" />
							</div>
						</span>
						<!--  引用消息 -->
						<span
							v-if="item.quote_info"
							:class="[
                'quote-panel',
                { recall: item.quote_info.quote_message_status === -1 },
              ]"
							@click.stop="handlerJumpMessage(item.quote_info.quote_message_id)"
						>
							<span v-if="item.quote_info.quote_message_status === 1" style="margin: 5px">{{ item.quote_info.quote_user_nick }}:</span>
							<!-- 引用消息已被撤回 -->
							<span v-if="item.quote_info.quote_message_status === -1"> 引用消息已被撤回</span>
							<!-- 文字消息引用 -->
							<span
								v-if="
                  item.quote_info.quote_message_type === 'text' &&
                  item.quote_info.quote_message_status === 1
                "
							>
								{{ item.quote_info.quote_message_content }}</span
							>
							<!-- 图片消息引用 包含表情包 -->
							<img
								v-if="
                  imgMessageType.includes(item.quote_info.quote_message_type) &&
                  item.quote_info.quote_message_status === 1
                "
								:src="item.quote_info.quote_message_content.url"
								class="message-img"
							/>
							<!-- 特殊格式文件引用 -->
							<span
								v-if="
                  otherFileType(item.quote_info.quote_message_type) &&
                  item.quote_info.quote_message_status === 1
                "
								class="msg-other quote-msg-other"
							>
								<div class="msg-other-panel">
									<div class="file-info">
										<span class="file-info-name">{{
                      item.quote_info.quote_message_content.name
										}}</span>
										<span class="file-info-size">{{
                      item.quote_info.quote_message_content.size
										}}</span>
									</div>
									<icon class="file-icon" name="chat-frame-unknow-file" scale="4" />
								</div>
							</span>
						</span>

						<!-- 时间 -->
						<span class="time">{{ formatChatTime(item.createdAt) }}</span>
					</div>
					<span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-chat-line-square" command="1">引用消息</el-dropdown-item>
							<el-dropdown-item v-if="item.user_info.id === mine_id" icon="el-icon-delete" command="2">撤回消息</el-dropdown-item>
							<el-dropdown-item
								v-if="
                  imgMessageType.includes(item.message_type) &&
                  item.message_type !== 'emo'
                "
								icon="el-icon-search"
								command="3"
								>预览大图</el-dropdown-item
							>
							<el-dropdown-item v-if="otherFileType(item.message_type)" icon="el-icon-download" command="4">下载文件</el-dropdown-item>
						</el-dropdown-menu>
					</span>
				</el-dropdown>

				<!-- 用户可能删除账户的情况就没有item.user_info了 -->
				<img v-if="item.user_info" class="avatar" :src="item.user_info.user_avatar" />
				<img v-if="!item.user_info" class="avatar" :src="errAvatar" />
			</span>

			<!-- info -->
			<span v-if="item.message_type === 'info'" class="msg">
				{{ item.message_content }}
			</span>

			<!-- notice -->
			<span v-if="item.message_type === 'notice'" class="notice-box">
				<div class="notice-box-header">
					<span class="title">房间公告</span>
				</div>
				<div v-for="(t, i) in item.message_content" :key="i">{{ t }}</div>
			</span>
		</div>

		<div id="panelEnd" ref="end"></div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { replaceEmotionText } from "@/components/Emotion/emotion.js";
import { throttle, formatChatTime } from "@/utils/tools";

export default {
  props: {
    /* 是否还有历史数据，是否还能上拉加载 */
    stopLoadmore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisible: true, // 是否在可视区域
      unReadNum: 0, // 未读消息条数
      firstNodeId: 0,
      imgMessageType: ["png", "jpg", "jpeg", "gif", "emo"], // emo 是特殊类型的表情包 也属于图片
      tipsMessageType: ["notice", "info"], // 中间显示的类型 目前有公搞和一些进出切歌房间这类提示
      errAvatar:
        "https://img1.baidu.com/it/u=430660535,1172956011&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    };
  },
  computed: {
    ...mapState(["messageList", "un_read_msg_num"]),
    ...mapGetters(["mine_id", "room_admin_id"]),
    messageClass() {
      return (item) => {
        const { user_id, message_type } = item;
        if (!["info", "notice"].includes(message_type)) {
          return user_id === this.mine_id ? "mine" : "other";
        }
        return message_type;
      };
    },

    textClass() {
      return (item) => {
        if (!item.user_info) return;
        const { user_role, id } = item.user_info;
        if (user_role === "admin") return "admin-text";
        if (this.room_admin_id === id) return "homeowner";
      };
    },

    /* 不属于文字，图片，提示等类型的其他格式消息 */
    otherFileType() {
      return (type) => ![
          ...this.imgMessageType,
          ...this.tipsMessageType,
          "text",
        ].includes(type);
    },

    /* 检测是不是URL地址 */
    isUrl() {
      return (text) => {
        const reg =
          /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        return reg.test(text);
      };
    },
  },
  watch: {
    /* 来了新消息并且在450范围内就直接滚动到消息查看，否则提示未读消息数量 */
    messageList(n, o) {
      if (!n.length) return;
      const isOneMsg = n.length - o.length === 1; // 是否本次增加了一条消息

      /*  记录旧的数据第一个id可以拿到所有消息的最顶部那条消息id 然后拿到节点 */
      const lastNodeId = o.length > 10 ? o[0].id : 0;

      /* 当不是在可视区域并且一次不止一条消息加入队列的情况说明是上拉刷新 */
      if (!this.isVisible && !isOneMsg) {
        /* 加载完成后将历史消息的第一条置于可视区域即可 */
        this.$nextTick(() => {
          this.$refs[`message__${lastNodeId}`][0].scrollIntoView();
        });
      }
      /* 增加一条消息的时候窗口滚动才添加动画 批量增加可能是初始化或者 上拉加载 不需要动画 */
      const params = isOneMsg ? { behavior: "smooth" } : {};
      this.$nextTick(() => this.isVisible && this.toEnd(params));

      /* 不在可是区域并且增加了一条消息 提示未读消息+1 */
      !this.isVisible &&
        isOneMsg &&
        this.setUnReadMsgNum(this.un_read_msg_num + 1);
    },

    stopLoadmore(n) {
      n &&
        document
          .querySelector(`#box`)
          .removeEventListener("scroll", this.scrollToTop);
    },
  },
  mounted() {
    const panel = document.querySelector(`#box`);
    panel.addEventListener("scroll", this.scrollToTop);
    this.$once("hook:beforeDestory", () =>
      panel.removeEventListener("scroll", this.scrollToTop)
    );
  },
  methods: {
    ...mapMutations(["setMessageDataList", "setUnReadMsgNum", "setPreImg"]),
    replaceEmotionText,
    formatChatTime,
    /**
     * @desc 监听窗口确定是否跳转到底部
     *       1. 初始化的时候默认在消息底部
     *       2. 在视窗高度450内的时候有消息自动滑到底部
     *       3. 在视窗450以上说明去看历史消息了 这个时候不到底部 提示有新消息
     *       4. 在显示有新消息的时候 再次到底部新消息提示消失
     */
    scrollToTop: throttle(function () {
      const el = document.querySelector(`#box`);
      const {scrollTop} = el;
      const {scrollHeight} = el;

      /* 是否在可是区域  */
      this.isVisible = el.offsetHeight + scrollTop - scrollHeight > -450;

      /* 滑到可视区域那么未读消息自动变为0 */
      this.isVisible && this.setUnReadMsgNum(0);

      /* 快到顶部了加载更多消息 */
      if (scrollTop < 30 && this.messageList.length > 0) {
        this.loadHistoryMessage();
      }
    }, 200),

    loadHistoryMessage() {
      this.$emit("loadHistoryMessage");
    },

    /* 滚动到底部 */
    toEnd(params) {
      this.$nextTick(() =>
        document.getElementById("panelEnd").scrollIntoView(params)
      );
    },
    previewImg() {},

    /* 下拉菜单 */
    handlerMessageCommand(val, message) {
      if (Number(val) === 1) return this.$emit("quoteMessage", message);
      if (Number(val) === 2)
        return this.$socket.client.emit("recallMessage", {
          id: message.id,
          user_nick: message.user_info.user_nick,
        });
      if (Number(val) === 3) return this.handlerPreBigImg(message);
      if (Number(val) === 4) return this.handlerDownLiad(message);
    },

    /* 点击引用消息滚动到引用消息位置 */
    handlerJumpMessage(id) {
      const isHasMessage = this.messageList.filter((t) => t.id === id).length;
      if (!isHasMessage)
        return this.$message.warning("当前消息在历史消息中，还没加载出来呢！");
      this.$refs[`message__${id}`][0].scrollIntoView({ behavior: "smooth" });
    },

    /* 预览大图 */
    handlerPreBigImg(message) {
      const { width, height } = this.$refs[`img__${message.id}`][0];
      this.setPreImg({
        url: message.message_content.url,
        width: width * 2,
        height: height * 2,
      });
    },

    /* 下载 */
    handlerDownLiad(message) {
      const { url } = message.message_content;
      const link = document.createElement("a"); // 自己创建的a标签
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>
<style lang="less" scoped>
.message-box {
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  // overflow: overlay;
  display: flex;
  flex-direction: column;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.3);
  }
  &::-webkit-scrollbar-track {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.1);
  }

  &-item {
    display: flex;
    margin: 7px 0;
    &-info {
      display: flex;
      .info-box {
        display: flex;
        flex-direction: column;
        .message {
          font-size: 13px;
          padding: 4px 16px;
          border-radius: 6px;
          margin-top: 10px;
          cursor: pointer;
          text-align: justify;
          line-height: 2;
          max-width: 300px;
          word-break: break-all;
        }
        /* 引用消息 */
        .quote-panel {
          cursor: pointer;
          margin-top: 5px;
          background: @message-panel-tips-bg-color;
          color: #868181;
          display: flex;
          align-items: center;
          padding: 5px 15px;
          border-radius: 5px;
          position: relative;
          word-break: break-all;
          max-width: 350px;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
          .message-img {
            max-height: 75px;
            border: 1px solid #b6b6b6;
            border-radius: 3px;
          }
        }
        /* 撤回消息 */
        .recall {
          background: #868181;
          color: #e1e1e1;
        }
        .time {
          font-size: 12px;
          color: #9f9898;
          margin-top: 5px;
        }
        .msg-img {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          /* 图片图片 */
          img {
            max-width: 220px;
            border-radius: 10px;
            object-fit: cover;
            cursor: pointer;
            user-select: none;
            -webkit-user-drag: none;
            border: 1px solid #b6b6b6;
          }
        }
        /* 特殊格式文件 */
        .msg-other {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          padding: 10px 20px;
          min-width: 140px;
          border-radius: 3px;
          margin-top: 10px;
          filter: brightness(0.9);
          &-panel {
            display: flex;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;
            .file-info {
              display: flex;
              flex-direction: column;
              &-name {
                color: #807d7d;
                max-width: 90px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              &-size {
                margin-top: 5px;
                color: #ccc;
                font-size: 12px;
              }
            }
            .file-icon {
              margin-left: 30px;
            }
          }
          &:hover {
            filter: brightness(1);
          }
        }
        .quote-msg-other {
          background: #e2e2e2;
          padding: 6px 10px;
          margin-top: 0;
          &:hover {
            filter: brightness(0.9);
          }
        }
        /* 表情包 */
        .msg-emo img {
          user-select: none;
          max-width: 100px;
          -webkit-user-drag: none;
        }
        /* 连接地址 */
        .msg-url {
          color: blue !important;
          cursor: pointer;
        }
        .name {
          font-size: 14px;
          color: @message-main-text-color;
        }
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }
  }
}
.mine {
  color: #000;
  justify-content: flex-end;
  .message-box-item-info {
    flex-direction: row;
    .info-box {
      align-items: flex-end;
      margin-right: 20px;
      .message {
        background-color: #a9e87a;
        color: #000;
        position: relative;
        font-size: 14px;
        &::before {
          content: "";
          position: absolute;
          top: -5px;
          left: auto;
          right: -13px;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 15px 0;
          color: #a9e87a;
        }
      }
    }
  }
}
.other {
  justify-content: flex-start;
  .message-box-item-info {
    flex-direction: row-reverse;
    .info-box {
      align-items: flex-start;
      margin-left: 20px;
      .message {
        background-color: #eee;
        color: #000;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -5px;
          left: -13px;
          right: auto;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 0 15px;
          color: #eee;
        }
      }
    }
  }
}
.info {
  justify-content: center;
  .msg {
    font-size: 12px;
    color: #aaa;
    display: inline-block;
    background-color: @message-panel-tips-bg-color;
    padding: 2px 8px;
    border-radius: 3px;
    max-width: 500px;
  }
}
.notice {
  justify-content: center;
  &-box {
    text-align: left;
    max-width: 500px;
    background: @message-panel-tips-bg-color;
    padding: 10px 15px;
    border-radius: 10px;
    color: #999;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    letter-spacing: 3px;
    &-header {
      display: flex;
      .title {
        font-size: 16px;
        color: #1295dd;
        display: inline-block;
        border-bottom: 2px dotted #1295dd;
        margin-bottom: 10px;
        padding-bottom: 5px;
      }
    }
  }
}

/* admin-text */
.admin-text {
  background: #000 !important;
  color: #fff !important;
  &::before {
    color: #000 !important;
  }
  &::after {
    color: #000 !important;
  }
}

/* homeowner */
.homeowner {
  background: #f0bc77 !important;
  color: #fff !important;
  &::before {
    color: #f0bc77 !important;
  }
  &::after {
    color: #f0bc77 !important;
  }
}
</style>
