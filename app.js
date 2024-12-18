import fadeHover from '/js/randomFadeHover.js';
import  {LoaderTitleSplit,loader} from '/js/preloader.js';
import  playEffect from '/js/playEffect.js';
import gsap from "gsap";
import  trackPopupOpen from '/js/trackPopupOpen.js';
import  pageTransition from '/js/pageTransition.js';
import  killPreloader from '/js/killPreloader.js';
import loadCanvas from '/js/canvas.js';



const parceled = true
const onReady = () => {
    fadeHover();
    playEffect();
    trackPopupOpen();
    pageTransition();
}
const onLoading = () => {
    LoaderTitleSplit();
    loader();
    gsap.set(".preloader", { display: "flex" });
    killPreloader();
    loadCanvas();
}

if (document.readyState !== 'loading') {
    onLoading()
    onReady()
    console.log('readystate')
} else {
    console.log('load')
    window.addEventListener('load', onReady)
    document.addEventListener('DOMContentLoaded', onLoading)
}