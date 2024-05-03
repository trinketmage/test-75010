<template>
  <div class="view">
    <div class="gabarit">
      <h2>{{ $t('popularReleases.title') }}</h2>
      <span class="label">{{ $t('popularReleases.subtitle') }}</span>
    </div>
    <div class="gabarit">
      <InfiniteSlider :movies="movies"></InfiniteSlider>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import InfiniteSlider from "@/components/InfiniteSlider.vue";
import Movies from "@/assets/movies.json";

export default {
  components: {
    InfiniteSlider
  },
  setup() {
    let ids = [
      "film1",
      "film2",
      "film3",
      "film4",
      "film5",
      "film6",
      "film7",
      "film8",
      "film9",
      "film10"
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
  padding-top: calc(var(--gutter) + 20px);
  padding-bottom: var(--gutter);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 156vw;
}
.gabarit + .gabarit {
  margin-top: 100px;
  flex: 1;
  @include respond-to("xs-down") {
    margin-top: var(--gutter);
  }
}
.label {
  color: var(--white-50);
  margin-top: 28px;
  display: block;
}
</style>
