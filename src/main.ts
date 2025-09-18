import { createApp } from "vue";
// store
import { createPinia } from "pinia";
// ui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./Form.vue";

const app = createApp(App);

// store
app.use(createPinia());
// ui
app.use(ElementPlus);

app.mount("#app");
