import { createApp } from "vue";
import App from "./App.vue";

//import router
import router from "./Router";

// import bootstrao, popper, jquery
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
// use vue Router
app.use(router);

app.mount("#app");
