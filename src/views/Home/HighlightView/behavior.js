import gsap from "@gsap/shockingly";
import ScrollTrigger from "@gsap/shockingly/ScrollTrigger";

export const bind = function (view) {
    let mm = gsap.matchMedia(),
        breakPoint = 812;

    mm.add({
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`
    }, (context) => {
        if (!view) return;
        if (context.conditions.isDesktop) {
            const animation = gsap.timeline();
            const details = view.querySelectorAll('.details')
            const circles = view.querySelectorAll('.circle')
            const thumbs = view.querySelectorAll('.thumb')
            animation.to(view.querySelector('.wrapper'), {
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
                ease: 'linear',
                duration: 1
            }, 'a')
            animation.fromTo(thumbs[0], {
                y: '0vh',
                rotation: 3.5,
                xPercent: -5,
            }, {
                y: '-100vh',
                rotation: 30,
                xPercent: -40,
                z: 200,
                ease: 'linear',
                duration: 1
            }, 'a')
            animation.fromTo(thumbs[1], {
                y: '5vh',
                rotation: 2,
                xPercent: 7.5,
                z: -40,
            }, {
                y: '0vh',
                rotation: 3.5,
                xPercent: -5,
                z: 0,
                ease: 'linear',
                duration: 1
            }, 'a')
            animation.fromTo(thumbs[2], {
                y: '7.5vh',
                rotation: 0,
                xPercent: 20,
                z: -60,
            }, {
                y: '5vh',
                rotation: 2,
                xPercent: 7.5,
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
                xPercent: -5,
                z: 0,
                ease: 'linear',
                duration: 1
            }, 'a+=1')

            ScrollTrigger.create({
                trigger: view.querySelector('.scroll-helper'),
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
        }
        return () => {}
    });
}