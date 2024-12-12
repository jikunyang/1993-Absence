// GLSL fragment shader code
const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 spectrum;
uniform sampler2D bgImage;


varying vec3 v_normal;
varying vec2 v_texcoord;

float colormap_red(float x) {
    if (x < 0.0) {
        return 16.0/255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 92.0 / 255.0;
        }else if (x <= 0.66) {
            return 16.0 / 255.0;
        }else {
            return 60.0 / 255.0;
        }
    } else {
        return 219.0 / 255.0;
    }
}

 
float colormap_green(float x) {
    if (x < 0.0) {
        return 183.0 /255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 196.0 / 255.0;
        }else if (x <= 0.66) {
            return 183.0 / 255.0;
        }else {
            return 60.0 / 255.0;
        }
    } else {
        return 207.0 / 255.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 202.0/255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 140.0 / 255.0;
        }else if (x <= 0.66) {
            return 202.0 / 255.0;
        }else {
            return 60.0 / 255.0;
        }
    } else {
        return 157.0 / 255.0;
    }
}

// blue : (16.0, 183.0, 202.0)
// green : (92.0, 196.0, 140.0)
// tan : (219.0, 207.0, 157.0)

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

//


float sin_wave(float value, float frequence, float amplitude,vec2 offset) {
    return amplitude*sin((value+offset.x/frequence)* frequence)+offset.y;
}

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p + 2.0);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

const mat2 mtx = mat2( 0.10,  1.50, -0.60,  0.30 );

float fbm( vec2 p )
{
    
    float f = -0.5;
    float slowed =  0.9 * u_time;
 
    
    float frequence = 0.01;
    float amplitude = 10.0;
    vec2 offset = vec2(0.0,0.0);
    float loop = amplitude*sin((slowed+offset.x/frequence)* frequence)+offset.y;
    
    f += 1.2*noise( p +   loop  ); p = mtx*p*3.02;
   
    f += 0.9*noise( p ); p = mtx*p*0.7;

   f += 0.1*noise( p ); p = mtx*p*2.0;
    f += 0.09*noise( p + loop );

    return f/0.98;
}

float grayscale(float x) {
    return x; // Directly use the shade for grayscale
}


float pattern( in vec2 p )
{
    return fbm( p + fbm( p + fbm( p ) ) );
}

void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Generate the shade using your existing pattern function
    float shade = pattern(uv);

    // Output the grayscale color
    gl_FragColor = vec4(vec3(grayscale(shade)), 1.0);
}
`;
export default frag;

