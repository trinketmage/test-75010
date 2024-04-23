import gsap from "@gsap/shockingly";
import Draggable from "@gsap/shockingly/Draggable";
import InertiaPlugin from "@gsap/shockingly/InertiaPlugin";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger); 

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.mount('#app');
