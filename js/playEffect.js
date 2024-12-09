import gsap from "gsap";

const playEffect = () => {
    $("[data-playeffect]").each(function () {
        const lines = $(this).find(".play-effect-line");

        // Hover In: Animate lines randomly in a loop
        $(this).on("mouseenter", () => {
            lines.each(function () {
                const randomDuration = Math.random() * 0.5 + 1; // Random duration between 0.5s and 1s
                const randomDelay = Math.random() * 0.3; // Random delay between 0s and 0.3s
                gsap.fromTo(
                    $(this),
                    { scaleY: 0},
                    {
                        scaleY: 1,
                        duration: randomDuration,
                        delay: randomDelay,
                        repeat: -1, // Infinite loop
                        yoyo: true,
                        ease: "power1.inOut",
                    }
                );
            });
        });

        // Hover Out: Reset lines to scaleY: 1
        $(this).on("mouseleave", () => {
            lines.each(function () {
                gsap.killTweensOf($(this)); // Stop the animation
                gsap.to($(this), {
                    scaleY: 1,
                    duration: 0.3, 
                    ease: "power1.out",
                });            });
        });
    });

}
export default playEffect;