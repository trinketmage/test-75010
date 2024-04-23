<template>
  <div class="view" ref="view">
    <div
      class="scroll-helper"
    >
      <div
        v-for="({ id, color }) in movies"
        :key="id"
        class="circle"
        :style="{
          backgroundColor: color
        }"
      >
      </div>
      <div
        v-for="({ id, thumb }, i) in movies"
        :key="id"
        class="thumb"
        :style="{
          zIndex: 3 - i
        }"
      >
        <img :src="thumb" />
      </div>
      <div class="gabarit">
        <div class="wrapper">
          <div
            v-for="({ id, title, description, rating }) in movies"
            :key="id"
            class="details"
          >
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
      const circles = view.value.querySelectorAll('.circle')
      const thumbs = view.value.querySelectorAll('.thumb')
      animation.to(view.value.querySelector('.wrapper'), {
        xPercent: -200,
        ease: 'linear',
        duration: 2
      }, 'a')
      animation.set(circles[0], {
        scale: 1
      }, 'a')
      animation.from(details[1], {
        alpha: 0.1,
        ease: 'linear',
        duration: 1
      }, 'a')
      animation.to(circles[1], {
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        ease: 'linear',
        duration: 1
      }, 'a')
      animation.to(thumbs[0], {
        y: '-100vh',
        rotation: 30,
        xPercent: -40, 
        z: 200,
        ease: 'linear',
        duration: 1
      }, 'a')
      animation.from(thumbs[1], {
        y: '5vh',
        rotation: 2,
        xPercent: 10, 
        z: -40,
        ease: 'linear',
        duration: 1
      }, 'a')

      animation.fromTo(thumbs[2], {
        y: '7.5vh',
        rotation: 0,
        xPercent: 20, 
        z: -60,
        ease: 'linear',
        duration: 1,
      }, {

        y: '5vh',
        rotation: 2,
        xPercent: 10, 
        z: -40,
        ease: 'linear',
        duration: 1
      }
      , 'a')
      animation.from(details[2], {
        alpha: 0.1,
        ease: 'linear',
        duration: 1
      }, 'a+=1')
      animation.to(circles[2], {
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        ease: 'linear',
        duration: 1
      }, 'a+=1')
      animation.to(thumbs[1], {
        y: '-100vh',
        rotation: 30,
        xPercent: -40, 
        z: 200,
        ease: 'linear',
        duration: 1
      }, 'a+=1')
      animation.to(thumbs[2], {
        y: '0vh',
        rotation: 3.5,
        xPercent: 0, 
        z: 0,
        ease: 'linear',
        duration: 1
      }, 'a+=1')

      st = ScrollTrigger.create({
        trigger: view.value.querySelector('.scroll-helper'),
        start: "top top", 
        end: () => "+=200%",
        pin: true,
        scrub: true,
        snap: {
          snapTo: [0, 0.5, 1],
          duration: { min: 0.1, max: 0.5 },
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
  overflow: hidden;
  perspective: 800px;
}
.gabarit {
  height: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  // margin-right: -65px;
  margin-right: calc(-50vw + 700px);
}
.card {
  height: 100vh;
}
.details {
  min-width: 100%;
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
  cursor: pointer;
}
.circle {
  width: calc(hypot(100vh, 100vw ));
  height: calc(hypot(100vh, 100vw ));
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) scale(0);
}
.thumb {
  position: absolute;
  left: 66.5%;
  top: 50%;
  transform: translateY(-50%) rotate(3.5deg);
  img {
    transform: translateX(-50%);
  }
}
</style>
