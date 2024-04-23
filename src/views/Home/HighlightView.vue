<template>
  <div class="view" ref="view">
      <div
        class="card ghost"
        v-for="({ id, color }, i) in movies"
        :key="id"
        :style="{
          backgroundColor: color,
          top: i * 100 + 'vh',
        }"
      ></div>
    <div class="scroll-helper">
      <div class="gabarit">
        <div class="wrapper">
          <div
            v-for="({ id, title, description, rating }) in movies"
            :key="id"
            class="details"
          >
            <!-- <div
              class="card "
              v-for="({ id, color, title }) in movies"
              :key="id"
              :style="{
                backgroundColor: color
              }"
            > -->
            <h3>{{ title }} <span class="rating">{{ rating }}/10</span></h3>
            <div class="description">{{ description }}</div>
            <a>⭐️ PICK OF THE MONTH</a>
          </div>
        </div>
      </div>
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
    let ids = [
      "film-c-1",
      "film-c-2",
      "film-c-3"
    ];
    const movies = ref(
      Movies.filter(({ id }) => {
        return ids.indexOf(id) > -1;
      })
    );

    const view = ref(null);
    let st = null;

    onMounted(() => {

      const animation = gsap.timeline();

      const details = view.value.querySelectorAll('.details')
      animation.to(view.value.querySelector('.wrapper'), {
        xPercent: -200,
        ease: 'linear',
        duration: 2
      }, 'a')
      animation.from(details[1], {
        alpha: 0.1,
        ease: 'linear',
        duration: 1
      }, 'a')
      animation.from(details[2], {
        alpha: 0.1,
        ease: 'linear',
        duration: 1
      }, 'a+=1')

      st = ScrollTrigger.create({
        trigger: view.value.querySelector('.scroll-helper'),
        start: "top top", 
        end: () => "+=200%",
        pin: true,
        scrub: true,
        markers: true,
        snap: {
          snapTo: [0, 0.5, 1],
          duration: { min: 0.1, max: 1 },
          delay: 0.0,
          ease: "power1.inOut",
        },
        animation,
      });
    })

    onUnmounted(() => {
      if (st) st.kill();
    })

    return {
      movies,
      view
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  height: 300vh;
}
.scroll-helper {
  overflow: hidden;
  height: 100vh;
}
.gabarit {
  height: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin-right: -65px; //half gutter

}
.card {
  height: 100vh;
}
.details {
  min-width: 100%;
}
.ghost {
  position: absolute;
  z-index: -1;
  width: 100%;
}
h3 {
  font-size: 64px;
  font-weight: bold;
  .rating {
    font-weight: 300;
    font-size: 16px;
  }
}
.description {
  max-width: 23.5em;
  font-size: 24px;
  color: var(--ivory);
  margin-top: 40px;
  margin-bottom: 40px;
}
a {
  font-size: 24px;
  font-weight: bold;
}
</style>
