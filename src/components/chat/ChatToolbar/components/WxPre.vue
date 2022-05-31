<template>
	<div class="wx">
		<img :src="wxImg" />
	</div>
</template>

<script>
import config from '@/config'

export default {
	data() {
		return {
			wxImg:config.wx_avatar
		};
	},
}
</script>

<style lang="less" scoped>
.wx{
	padding: 10px;
	box-sizing: border-box;
	background: @message-popup-bg-color;
	box-shadow: 0 0 3px rgba(89, 36, 36, 0.2);
	img{
		width: 150px;
		height: 150px;
		border-radius: 5px;
		filter: brightness(.9);
	}
}
</style>
