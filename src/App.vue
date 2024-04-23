<template>
  <HeaderView />
  <HomeView />
</template>

<script>

import HeaderView from "@/views/HeaderView.vue";
import HomeView from "@/views/Home/View.vue";

export default {
  components: {
    HeaderView,
    HomeView
  },
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

</style>
