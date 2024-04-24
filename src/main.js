import gsap from "@gsap/shockingly";
import Draggable from "@gsap/shockingly/Draggable";
import InertiaPlugin from "@gsap/shockingly/InertiaPlugin";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";
import SplitText from "@gsap/shockingly/SplitText";
import Physics2DPlugin from "@gsap/shockingly/Physics2DPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText, Physics2DPlugin); 

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.mount('#app');
