<template>
  <div class="view" ref="view">
    <div class="scroll-helper">
      <div
        class="card"
        v-for="({ id, color, title }) in movies"
        :key="id"
        :style="{
          backgroundColor: color
        }"
      >
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
        markers: true
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
}
.card {
  height: 100vh;
}
</style>
