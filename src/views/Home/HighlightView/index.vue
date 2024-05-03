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
              <StarLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//   import gsap from "@gsap/shockingly";
  import { ref, onMounted } from "vue";
  import { bind } from "./behavior.js";
  
  import StarLink from "@/components/StarLink.vue";
  
  import Movies from "@/assets/movies.json";
  
  export default {
    name: "HighlightView",
    components: { StarLink },
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
  
      onMounted(() => {
        // let mm = gsap.matchMedia(),
        //   breakPoint = 800;
  
        // mm.add({
        //   // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        //   isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        //   isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`
        // }, (context) => {
  
        //   console.log("context.conditions", context.conditions.isDesktop, context.conditions.isMobile);
        //   // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        //       // let { isDesktop, isMobile } = context.conditions,
        //       //     target = isDesktop ? ".desktop" : ".mobile",
        //       //     tl = gsap.timeline({
        //       //       scrollTrigger: {
        //       //         trigger: ".gray",
        //       //         scrub: 1,
        //       //         end: "200%",
        //       //         pin: true
        //       //       }
        //       //     });
        //       // tl.to(target, {scale: 2, rotation: 360})
        //       //   .to(target, {scale: 1});
  
        //       // // works for non-ScrollTrigger animations too: 
        //       // gsap.to(target, {backgroundColor: "#2c7ad2", duration: 0.8, ease: "none", repeat: -1, yoyo: true});
  
        //   return () => { 
        //     // optionally return a cleanup function that will be called when the media query no longer matches
        //     console.log("CLEANUP");
        //   }
        // }); 

        bind(view);
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
  .circle {
    width: calc(hypot(100vh, 100vw ));
    height: calc(hypot(100vh, 100vw ));
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
  }
  .thumb {
    position: absolute;
    left: 66.5%;
    top: 50%;
    transform: translate(0%, 0vh) rotate(3.5deg);
    img {
      transform: translate(-50%, -50%) ;
      width: 21.25vw;
    }
  }
  </style>
  