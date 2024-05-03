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
              v-for="({ id, title, description, rating, thumb, color }) in movies"
              :key="id"
              class="details"
                :style="{
                    '--background-color': color
                }"
            >
                <img :src="thumb" class="thumb-mobile" />
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
        bind(view.value);
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
    height: auto;
    @include respond-to("xs") {
        height: 300vh;
    }
  }
  .scroll-helper {
    perspective: 800px;
    @include respond-to("xs") {
        height: 100vh;
        overflow: hidden;
    }
  }
  .gabarit {
    height: 100%;
    @include respond-to("xs-down") {
        padding: 0;
    }
  }
  .wrapper {
    @include respond-to("xs") {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        margin-right: calc(-65px);
    }
    @include respond-to("lg") {
        margin-right: calc(-50vw + var(--half-gabarit));
    }
  }
  .card {
    @include respond-to("xs") {
        height: 100vh;
    }
  }
  .details {
    min-width: 100%;
    .thumb-mobile {
        display: none;
        @include respond-to("xs-down") {
            display: block;
            margin: auto;
            max-width: 260px;
            margin-bottom: var(--gutter);
            transform: rotate(3.5deg);
        }
    }
    @include respond-to("xs-down") {
        background-color: var(--background-color);
        padding: var(--header-size) var(--gutter);
    }
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
    @include respond-to("xs-down") {
        display: none;
    }
  }
  </style>
  