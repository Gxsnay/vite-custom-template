import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';

// import mockXHR from '../mock/index.ts';
// if (!VITE_APP_IS_SERVE) mockXHR();

import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount('#app');
