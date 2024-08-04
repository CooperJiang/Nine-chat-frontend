<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { mapState } from "vuex";
import { setTheme } from "@/theme";

export default {
	data() {
		return {
			sendMsgFromParentWindow: null,
			ignoreNextMessage: false,
		};
	},
	computed: {
		...mapState(["theme"]),
	},
	watch: {
		theme(val) {
			if (!val || !this.sendMsgFromParentWindow) return;
			this.ignoreNextMessage = true;
			this.sendMsgFromParentWindow({ type: 'theme', data: val === 'default' ? 'light' : 'dark' });
		}
	},
	mounted() {
		window.addEventListener('message', this.messageHandler);
	},
	beforeDestroy() {
		window.removeEventListener('message', this.messageHandler);
	},
	methods: {
		messageHandler(event) {
			const { type } = event.data;
			if (this.ignoreNextMessage) {
				this.ignoreNextMessage = false;
				return;
			}

			if (type === 'theme') {
				const THEME = event.data.data === 'dark' ? 'black' : 'default';
				setTheme(THEME);
			}

			if (type === 'token') {
				localStorage.chat_token = event.data.data;
				this.$router.push("/");
			}

			this.sendMsgFromParentWindow = (message) => {
				event.source.postMessage(message, event.origin);
			};
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
