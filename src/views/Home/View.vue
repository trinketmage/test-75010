<template>
  <Transition appear @enter="enter">
    <HeroView ref="hero" />
  </Transition>
  <PopularView />
  <HighlightView />
  <LinkView />
</template>

<script>
import gsap from "@gsap/shockingly";
import SplitText from "@gsap/shockingly/SplitText";
import { ref } from "vue";

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
  setup() {
    const hero = ref(null);
    const enter = (el, done) => {
      const card = hero.value.view.querySelector(".card");
      SplitText
      const tl = gsap.timeline({
        onComplete: done
      });
      var split = new SplitText(card.querySelector('h1'), {type: "words"});


      tl.from(card.querySelector('.tag'), {
        delay: 0.5,
        duration: 0.625,
        alpha: 0,
        yPercent: 62.5,
      }, 'a');
      tl.from(split.words, {
        delay: 0.5,
        duration: 0.625,
        alpha: 0,
        yPercent: 62.5,
        stagger: 0.05
      }, 'a+=0.05');
    }

    return {
      hero,
      enter,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
