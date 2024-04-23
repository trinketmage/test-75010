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
}
.image-scroller {
  height: 100%;
}
.image-helper {
  height: 100%;
  background-position: 50% 50%;
  background-size: cover;
}
</style>
