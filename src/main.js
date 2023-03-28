import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import swalPlugin from './plugins/sweetalert2.js';

createApp(App).use(router).use(swalPlugin).mount('#app')
