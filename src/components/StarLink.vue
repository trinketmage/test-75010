<template>
    <a class="star-link" @click="handleClick" ref="link">
        ⭐️ <span class="label">{{ $t('context.pickOfTheMonth') }}</span>
    </a>
</template>

<script>
import gsap from "@gsap/shockingly";
import { ref } from "vue";

export default {
    props: {
        label: {
            type: String
        }
    },
    setup() {
        const link = ref(null);
        const handleClick = () => {
            const stars = [];
            for (var i = 0; i < 10; i++) {
                const star = document.createElement("div");
                star.setAttribute("class", "star");
                star.innerHTML = "⭐️";
                link.value.appendChild(star);
                stars.push(star);
            }
            gsap.set(stars, {
                scale: "random(0.4, 1)",
            });
            gsap.timeline({
                onComplete: () => {
                    if (link.value) {
                        stars.forEach(star => {
                            link.value.removeChild(star);
                        });
                    }
                }
            })
                .to(stars, {
                    duration: 1.5,
                    physics2D: {
                        velocity: "random(200, 450)",
                        angle: "random(250, 290)",
                        gravity: 500
                    },
                    delay: "random(0, 1.0)"
                }, 'a')
                .to(stars, {
                    alpha: 0,
                    duration: 0.3
                }, '-=0.3');

        }

        return {
            link,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>
.star-link {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    display: inline-block;
    perspective: 800px;
    user-select: none;

    .label {
        display: inline-block;
        transition: transform .3s ease;
    }

    &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        right: 0;
        bottom: 0px;
        left: 30px;
        background-color: var(--midnight);
        z-index: -1;
        transform: scaleX(0) rotate(0deg);
        transform-origin: 25% 50%;
        transition: transform .3s ease;
    }

    &:deep(.star) {
        display: block;
        position: absolute;
        left: 0;
        top: 0px;
        z-index: -1;
    }

    &:hover {
        &:before {
            transform: scaleX(1) rotate(2deg);
        }
        .label {
            transform: translateZ(50px) rotateY(-12.5deg);
        }
    }
}
</style>