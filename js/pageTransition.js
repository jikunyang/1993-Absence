import gsap from "gsap";

const pageTransition = () => {

    $(".page-link").on("click", function (e) {
        e.preventDefault(); // Prevent default navigation
        const link = $(this).attr("href"); // Get the href attribute of the clicked link
        const currentLink = window.location.pathname; // Get the current page's path
    
        // If the clicked link's href is the same as the current page, do nothing
        if (link === currentLink) return;
    
        // Create a fade-out animation for the current page
        const tl = gsap.timeline({
          onComplete: () => {
            // Navigate to the new page after animation completes
            window.location.href = link;
          }
        });
    
        // Fade out effect
        tl.to("body", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      
}
export default pageTransition;