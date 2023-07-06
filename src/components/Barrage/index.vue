<template>
	<div class="barrage">
		========{{ showBarrageImg }}
		<Barrage :data="data" style="height: 400px" :barrage-style="barrageStyle" show-area="top" touch-pause :defer="1" :track-height="50" :speed="20">
			<template #default="data">
				<div v-if="data.message_type === 'text'" :class="[{mine: data.user_id === mine_id}, 'barrage-wapper']">
					<img v-if="data.user_info.user_avatar && showBarrageAvatar" :src="data.user_info.user_avatar" class="barrage-avatar" alt="" />
					<span v-html="replaceEmotionText(data.message_content)"></span>
				</div>
				<img v-if="data.message_type === 'png' && showBarrageImg" class="barrage-img" :src="data.message_content.url" />
			</template>
		</Barrage>
	</div>
</template>

<script>
import {  mapGetters, mapState } from "vuex";
import { history } from "@/api/chat";
import { replaceEmotionText } from "@/components/Emotion/emotion.js";

export default {
    components: {},
    props: {
        newMsg: {
            type: [Object,String,Number],
            default: () => {}
        }
    },
    data() {
        return {
            data: [],
            number: 999,
            params: {
                page: 1,
                pagesize: 10,
            }
        };
    },
    computed: {
        ...mapGetters(["mine_id", "room_id"]),
        ...mapState(['showHistoryBarrageInfo','showBarrageImg','showBarrageAvatar']),
        barrageStyle(){
            return {
                color: '#fff'
            }
        }
    },
    watch: {
        newMsg(n){
            const random = Math.floor(Math.random()*7+1)
            const res = []
            for (let index = 0; index < random; index++) {
                res.push({})
            }
            n && (this.data = [...res,n])
        },
        showHistoryBarrageInfo:{
            handler(n){
                this.loopBarrage = n
                this.queryMsg()
            },
            immediate: true
        }
    },
    created() {},
    mounted() {},
    methods: {
        replaceEmotionText,
        async queryMsg(){
            if(!this.loopBarrage) return
            const res = await history({
                room_id: this.room_id,
                ...this.params,
            })
            this.data = res.data
            this.params.page = res.data.length < this.params.pagesize ? 1 : ++this.params.page
            setTimeout(() => {
                this.queryMsg()
            }, 3500);
        }
    },
    }
</script>
<style lang="less" scoped>
// 弹幕图片
.barrage-img{
    width: 60px;
    max-height: 50px;
}

.barrage-wapper{
    display: flex;
    align-items: center;
}

// 弹幕头像
.barrage-avatar{
    height: 30px;
    width: 30px;
    border-radius: 50px;
    margin-right: 10px;
}
// 自己发的弹幕样式
.mine{
    border: 1px solid rgb(30, 162, 147);
    padding: 5px;
    border-radius: 5px;
}
</style>
