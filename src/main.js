import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementUi from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import "./plugins/element-ui";
import "./assets/css/index.less";
import "./socket-io/index.js";
import "./utils/vue.prototype";
import Icon from "vue-svg-icon/Icon.vue";
import Message from "@/components/Message/index.js";
Vue.use(Message.register);
Vue.component("icon", Icon);
// Vue.use(ElementUi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
