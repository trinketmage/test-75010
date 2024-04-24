<template>
  <div class="view" ref="view">
    <div
      class="image-scroller"
    >
      <div
        class="image-helper main"
        :style="{
          backgroundImage: `url(/assets/images/push.jpg)`
        }"
      >
      </div>
    </div>
    <div class="details">
      <span class="label">Collection</span>
      <h2>LE CINÉMA DE DENIS VILLENEUVE</h2>
      <CallToAction label="DÉCOUVRIR"></CallToAction>
    </div>
  </div>
</template>

<script>
import gsap from "@gsap/shockingly";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

import CallToAction from "@/components/CallToAction.vue";

export default {
  components: { CallToAction },
  setup() {
    const view = ref(null);
    let st = null;

    onMounted(() => {
      if (view.value) {
        const animation = gsap.timeline();
        animation.fromTo(
          view.value.querySelector(".image-scroller"),
          {
            yPercent: -15
          },
          {
            ease: "linear",
            duration: 1,
            yPercent: 0
          },
          "a"
        );
        animation.from(
          view.value.querySelector(".details"),
          {
            alpha: 0,
            duration: 0.625
          },
          "a+=0.375"
        );
        st = ScrollTrigger.create({
          trigger: view.value,
          start: "top bottom",
          end: "top top",
          scrub: true,
          animation,
        });
      }
    });

    onUnmounted(() => {
      if (st) st.kill();
    });
    return {
      view
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.image-scroller {
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: -1;
}
.image-helper {
  height: 100%;
  background-position: 50% 36%;
  background-size: cover;
}
.label {
  display: block;
  margin-bottom: 20px;
  font-size: 24px;
}
h2 {
  max-width: 8em;
}
</style>
