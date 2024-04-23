<template>
  <div class="view" ref="view">
    <div
      class="image-scroller"
    >
      <div
        class="image-helper main"
        :style="{
          backgroundImage: `url(${movie.image})`
        }"
      >
        <div
          class="image-helper red"
          :style="{
            backgroundImage: `url(${movie.image})`
          }"
        >
        </div>
        <div
          class="image-helper blue"
          :style="{
            backgroundImage: `url(${movie.image})`
          }"
        >
        </div>
        <div
          class="image-helper blur"
          :style="{
            backgroundImage: `url(${movie.image})`
          }"
        >
        </div>
      </div>
    </div>
    <div class="card">
      <span class="tag">New Arrival</span>
      <h1>{{ movie.title }}</h1>
    </div>
  </div>
</template>

<script>
import gsap from "@gsap/shockingly";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

import Movies from "@/assets/movies.json";
export default {
  setup() {
    const view = ref(null);
    let st = null;
    const movie = Movies.find(({ slug }) => slug === "spider-man-across-the-spider-verse");
    
    onMounted(() => {
      if (view.value) {
        const animation = gsap.to(view.value.querySelector(".image-scroller"), {
          ease: "linear",
          yPercent: 29
        });
        st = ScrollTrigger.create({
          trigger: view.value,
          start: "top-=95px top",
          end: "bottom",
          scrub: true,
          animation,
        });
      }
    });

    onUnmounted(() => {
      if (st) st.kill();
    });

    return {
      view,
      movie
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;

  overflow: hidden;
  padding-bottom: 90px;
  height: calc(100vh - var(--header-size));
}
.image-scroller {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.image-helper {
  position: absolute;
  inset: 0;
  background-position: 50% 100%;
  background-size: cover;
  transition: transform 1s ease, opacity 1s linear;
  transform: scale(1.08) translateY(-3.7%);;
  will-change: transform, opacity;
  
  &.blur {
    filter: blur(100px);
    opacity: 0;
  }
  &.blue {
    filter: hue-rotate(310deg);
    opacity: 0;
    transform: translateX(0px) translateY(0px) rotate(0deg);
    transition: transform 1s ease, opacity 1s linear;
  }
  &.red {
    filter: hue-rotate(310deg);
    opacity: 0;
    transform: translateX(0px) translateY(0px) rotate(0deg);
    transition: transform 1s ease, opacity 1s linear;
  }
}

.v-enter-active {
  transition: opacity 3s ease;
}

.v-enter-from {
  .image-helper {
    &.main {
      transform: scale(1.2);
    }
    &.blur {
      opacity: 1;
    }
    &.blue {
      filter: hue-rotate(310deg);
      opacity: 0.25;
      transform: translateX(10px) translateY(10px) rotate(-10deg);
    }
    &.red {
      filter: hue-rotate(310deg);
      opacity: 0.25;
      transform: translateX(-10px) translateY(-10px) rotate(10deg);
    }
  }
}
</style>
