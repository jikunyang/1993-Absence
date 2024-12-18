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
    sandbox.setUniform("bgImage", "https://cdn.prod.website-files.com/6750d2ccd60d9947409d2c73/675154de17da61ac210d6f5c_seo-min.jpg");
    // Mouse move event listener
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        sandbox.setUniform("u_mouse", [mouseX, mouseY]);
    });
    console.log(fragTD);
    console.log("canvas");



};
export default loadCanvas;