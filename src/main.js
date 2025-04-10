import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles.css'
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');