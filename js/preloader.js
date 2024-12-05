import SplitType from "split-type";
import gsap from "gsap";

function LoaderTitleSplit(){
    new SplitType(".loader-title", {
        types: "words, chars",
        tagName: "span",
      });
      const chars = $(".loader-title").find(".char");
      gsap.set(chars, { opacity: 0 }); // Set initial state
      const titleLine = $(".preloder-title-line");
      gsap.set(titleLine, { scaleY: 0 }); // Set initial state

}

function showTitle() {
    const chars = $(".loader-title").find(".char");
    const titleLine = $(".preloder-title-line");

    gsap.to(titleLine, {
        scaleY: 1,
        duration: 1.5,
        ease: "power1.inOut"
      });
    gsap.to(
      chars,
      
      { 
        opacity: 1,
        duration: 0.6,
        stagger: { each: 0.1, from: "random" }, 
        ease: "power1.out",
        onComplete: showLoadTrigger 
      }
    );
  }
  


function showLoadTrigger() {
    const loadTrigger = document.querySelector("#load-trigger");
    let tl = gsap.timeline();
    tl.to(loadTrigger, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
    });
}

const loader = () => {
    const preloaderLine = document.querySelector(".preloader-line");
    // Preloader animation
    let tl = gsap.timeline();
    tl.to(preloaderLine, {
        scaleX: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "power1.inOut",
        onComplete: showTitle
    });
}



export {LoaderTitleSplit,loader};