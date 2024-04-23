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
      <a>DÉCOUVRIR</a>
    </div>
  </div>
</template>

<script>
import gsap from "@gsap/shockingly";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const view = ref(null);
    let st = null;

    onMounted(() => {
      if (view.value) {
        const animation = gsap.fromTo(
          view.value.querySelector(".image-scroller"),
          {
            yPercent: -15
          },
          {
            ease: "linear",
            yPercent: 0
          },
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
  background-position: 50% 50%;
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
a {
  font-size: 16px;
  background-color: var(--white);
  color: var(--midnight);
  font-weight: bold;
  letter-spacing: 0.1em;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 40px;
  margin-top: 35px;
  cursor: pointer;
}
</style>
