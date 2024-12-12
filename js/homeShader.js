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

    vec2 uv = -1 + 2.0 * v_texcoord;
    gl_FragColor = vec4(
        sin(cos(u_time+3.0*spectrum.x*1)*1.0*uv.x+u_time),
        abs(cos(sin(u_time+2.0*spectrum.y)*7.0*uv.x+u_time)),
        spectrum.x,
        1.0);
            

          
}
`;
export default frag;

