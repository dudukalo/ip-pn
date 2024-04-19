import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "./router";
import { createPinia } from "pinia";

import "normalize.css";
import "element-plus/dist/index.css";
import "./style.css";

const pinia = createPinia();

import App from "./App.vue";

createApp(App).use(pinia).use(ElementPlus).use(router).mount("#app");
