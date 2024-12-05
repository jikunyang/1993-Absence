
import SplitType from "split-type";
import gsap from "gsap";

const fadeHover = () => {
  new SplitType(".char-split", {
    types: "words, chars",
    tagName: "span",
  });

  gsap.matchMedia().add("(min-width: 992px)", () => {
    $(".nav-link").hover(
        function () {
          // Hover in
          let chars = $(this).find(".char-split .char");
          gsap.set(chars, { opacity: 0.5 }); // Set initial state
          gsap.fromTo(chars, 
            { opacity: 0.35 }, 
            { 
              opacity: 1, 
              duration: 0.25, 
              stagger: { each: 0.1, from: "random" }, 
              ease: "power1.out" 
            }
          );
        },
        function () {
          // Hover out
          let chars = $(this).find(".char-split .char");
          gsap.to(chars, { opacity: 1, duration: 0.3 });
        }
      );
  });
};

export default fadeHover;