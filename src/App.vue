<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { mapState } from "vuex";
import { setTheme, setPostMessageHandle } from "@/theme";
export default {
	data(){
		return {
			sendMsgFromParentWindow: null
		}
	},
	computed:{
		...mapState(["theme"]),
	},
	methods:{
		messageHandler(event){
			const { type } = event.data
    	if(type === 'theme') {
				const THEME = event.data.data === 'dark' ? 'black' : 'default'
			};
			if(type === 'token'){
				console.log('event.data.data: ', event.data.data);

				localStorage.chat_token = event.data.data;
        this.$router.push("/");
			}
			setTheme(THEME)
			this.sendMsgFromParentWindow = (message) => {
				event.source.postMessage(message, event.origin);
			}
		}
	},
	mounted(){
		window.addEventListener('message', this.messageHandler);
	},
	beforeDestroy(){
		window.removeEventListener('message', this.messageHandler);
	},
	watch:{
		theme(val){
			if(!val || !this.sendMsgFromParentWindow) return;
			console.log('theme: ', val, val === 'default' ? 'light' : 'dark');
			this.sendMsgFromParentWindow({ type: 'theme', data: val === 'default' ? 'light' : 'dark' })
		}
	}
}
</script>

<style lang="css">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
