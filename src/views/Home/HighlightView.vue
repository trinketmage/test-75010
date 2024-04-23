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
    <div class="scroll-helper  proximity-scroll-snapping">
      <div
        v-for="({ id, title }) in movies"
        :key="id"
      >
      <!-- <div
        class="card "
        v-for="({ id, color, title }) in movies"
        :key="id"
        :style="{
          backgroundColor: color
        }"
      > -->
      {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import Movies from "@/assets/movies.json";
import { ref, onMounted, onUnmounted } from "vue";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";

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

      st = ScrollTrigger.create({
        trigger: view.value.querySelector('.scroll-helper'),
        start: "top top", 
        end: () => "+=200%",
        pin: true,
        scrub: true,
        markers: true,
        snap: [0, 0.5, 1]
        // animation,
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
  background-color: rgba(255, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  height: 100vh;
}
.ghost {
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
