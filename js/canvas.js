import fragTD from '/js/tdShader.js';
import GlslCanvas from 'glslCanvas';

const loadCanvas = () => {
    // Ensure the DOM is fully loaded before executing the script
    // Select the canvas element
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create a new GlslCanvas instance
    const sandbox = new GlslCanvas(canvas);

    
    // Load the shader code
    sandbox.load(fragTD);
    // Create a WebGL texture with GL_NEAREST filtering

    // Set the texture to GlslCanvas
    sandbox.setUniform("u_texture", "https://cdn.prod.website-files.com/6750d2ccd60d9947409d2c73/6765449f2baf12bacae294dc_fwafaw%201-min.jpg");
    sandbox.setUniform("u_resolution", [canvas.width, canvas.height]);


    // Mouse move event listener
    /**canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        sandbox.setUniform("u_mouse", [mouseX, mouseY]);
    });**/
    console.log(fragTD);
    console.log("canvas");



};
export default loadCanvas;