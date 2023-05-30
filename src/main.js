import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import swalPlugin from './plugins/sweetalert2.js';
import apiPlugin from "./plugins/api.js";
import iziToastPlugin from "./plugins/izitoast.js";
import { createPinia } from 'pinia';

createApp(App)
    .use(router)
    .use(swalPlugin)
    .use(apiPlugin)
    .use(iziToastPlugin)
    .use(createPinia())
    .mount('#app')
