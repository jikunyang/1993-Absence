
import gsap from "gsap";

const trackPopupOpen = () => {
    gsap.set(".tracks", { opacity: 0, x: "2vw" });

    $(".open-popup").on("click", () => {
        const tracks = $(".tracks");
        gsap.to(
            tracks,
    
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5, 
                ease: "power2.inOut"

            }
        );
    });

    // Handle ".close-popup" click
    $(".close-popup").on("click", () => {
        const tracks = $(".tracks");
        gsap.to(tracks, {
            opacity: 0,
            x: "2vw", // Shift right while fading out
            duration: 0.3, // Animation duration for each
            stagger:  0.1 , // Stagger each element by 0.2s
            ease: "power2.out",
        });
    });
}

export default trackPopupOpen;