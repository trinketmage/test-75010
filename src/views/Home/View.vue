<template>
  <Transition appear>
    <HeroView />
  </Transition>
  <PopularView />
  <HighlightView />
  <LinkView />
</template>

<script>

import HeroView from "./HeroView.vue";
import PopularView from "./PopularView.vue";
import HighlightView from "./HighlightView.vue";
import LinkView from "./LinkView.vue";

export default {
  name: "HomeView",
  components: {
    HeroView,
    PopularView,
    HighlightView,
    LinkView
  },
}
</script>

<style lang="scss" scoped>
</style>
