<template>
  <div class="view">
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
</template>

<script>
import Movies from "@/assets/movies.json";
import { ref } from "vue";

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

    return {
      movies
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  overflow: hidden;
}
.card {
  height: 100vh;
}
</style>
