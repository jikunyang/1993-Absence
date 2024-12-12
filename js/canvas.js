//import frag from '/js/homeShader.js';
import GlslCanvas from 'glslCanvas';

const loadCanvas = () => {
    // Ensure the DOM is fully loaded before executing the script
    // Select the canvas element
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create a new GlslCanvas instance
    const sandbox = new GlslCanvas(canvas);

    // GLSL fragment shader code
    const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 spectrum;


varying vec3 v_normal;
varying vec2 v_texcoord;

void main(void)
{

    vec2 uv =  v_texcoord;
    gl_FragColor = vec4(
        sin(cos(u_time + 3.0 * spectrum.x) * 1.0 * uv.x + u_time),
        abs(cos(sin(u_time+ 2.0 * spectrum.y) * 7.0 * uv.x + u_time)),
        spectrum.x,
        1.0);
            

          
}
`;
    // Load the shader code
    sandbox.load(frag);
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
    console.log(frag);
    console.log("canvas");



};
export default loadCanvas;