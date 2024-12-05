import fadeHover from '/js/randomFadeHover.js';
import  {LoaderTitleSplit,loader} from '/js/preloader.js';

const parceled = true
const onReady = () => {
    fadeHover();
    
}
const onLoading = () => {
    LoaderTitleSplit();
    loader();
 


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