<template>
    <div class="infinite-slider" ref="wrapper">
        <div class="card" v-for="({ thumb, title, date }, i) in movies" :key="i" ref="movieHelpers">
            <div class="size-helper">
                <img class="ghost" :src="thumb">
                <img class="main" :src="thumb">
                <div class="details">
                    <h3>{{ title }} <span class="date">({{ date }})</span></h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from "@gsap/shockingly";
import Draggable from "@gsap/shockingly/Draggable";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

import normalizeWheel from "@/pure/NormalizeWheel";

export default {
    props: {
        movies: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const wrapper = ref(null);
        const movieHelpers = ref(null);
        var proxy = document.createElement("div");
        var wrapProgress = gsap.utils.wrap(0, 1);
        var proxyProps = gsap.getProperty(proxy);
        var boxWidth = 0;
        var wrapWidth = 0;
        var snapBox = null;
        var animation = null;
        var overrideAnimation = null;
        var updateProgress = null;
        var draggable = null;

        const handleResize = () => {
            boxWidth = movieHelpers.value[0].querySelector("img.main").offsetWidth + 30;

            wrapWidth = props.movies.length * boxWidth;
            
            for (var i = 0; i < movieHelpers.value.length; i++) {
                let box = movieHelpers.value[i];
                gsap.set(box, { x: i * boxWidth, left: -boxWidth * 2 });
                gsap.set(box.querySelector('.size-helper'), { width: boxWidth - 30 });
            }

            snapBox = gsap.utils.snap(boxWidth);

            updateProgress = () => {
                animation.progress(wrapProgress(proxyProps("x") / wrapWidth));
            }
            animation = gsap.to(movieHelpers.value, {
                duration: 1,
                x: "+=" + wrapWidth,
                ease: "linear",
                paused: true,
                repeat: -1,
                modifiers: {
                    x: function(x) {
                        x = parseFloat(x) % wrapWidth;
                        return x + "px";
                    }
                }
            }).progress(1 / props.movies.length);

            updateProgress();
            if (draggable) {
                draggable[0].kill();
            }
            draggable = Draggable.create(proxy, {
                trigger: wrapper.value,
                throwProps: true,
                onPressInit: () => {
                    if (overrideAnimation) {
                        overrideAnimation.kill();
                    }       
                },
                onDrag: updateProgress,
                onThrowUpdate: updateProgress,
                snap: {
                    x: snapBox
                }
            });
        }
        let wheelEventEndTimeout = null;

        const handleWheel = (e) => {
            const ne = normalizeWheel(e);
            const { pixelX, pixelY } = ne;
            const delta = pixelX;
            clearTimeout(wheelEventEndTimeout);
            if (overrideAnimation) {
                overrideAnimation.kill();
            }
            if (Math.abs(pixelX) > Math.abs(pixelY)) {
                e.preventDefault();
                gsap.set(proxy, { x: proxyProps("x") - delta });
                animation.progress(wrapProgress(proxyProps("x") / wrapWidth));
                wheelEventEndTimeout = setTimeout(() => {
                    const nx = snapBox(proxyProps("x"));
                    overrideAnimation = gsap.to(proxy, {
                        x: nx,
                        duration: (Math.abs(nx - proxyProps("x")) / boxWidth) * 0.5, 
                        ease: "sine.out",
                        onUpdate: () => {
                            animation.progress(wrapProgress(proxyProps("x") / wrapWidth));

                        }
                    })
                }, 100);
            }
        }
        onMounted(() => {
            handleResize();
            ScrollTrigger.addEventListener('refreshInit', handleResize);
            wrapper.value.addEventListener('wheel', handleWheel, { passive:false });
        });
        onUnmounted(() => {
            ScrollTrigger.removeEventListener('refreshInit', handleResize);
        });
        return {
            wrapper,
            movieHelpers
        }
    }
}
</script>

<style lang="scss" scoped>
.infinite-slider {
    display: flex;
    overflow: visible;
    width: 100%;
    position: relative;
    height: 100%;
}
.card {
    position: absolute;
    width: auto;
    margin-right: 30px;
    height: 100%;
    overflow: hidden;
}
.size-helper {
    height: 100%;
    display: flex;
    justify-content: center;
}
img {
    display: block;
    width: auto;
    height: 100%;
    position: absolute;
    &.ghost {
        filter: blur(5px);
        object-fit: cover;
        width: 100%;
        z-index: -1;
    }
}
.details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40px;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
    )
}
h3 {
    font-size: 24px;
    font-weight: bold;
}
.date {
    font-size: 16px;
    font-weight: 300;
}
</style>
