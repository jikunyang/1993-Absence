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
        return 16.0 / 255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 92.0 / 255.0;
        } else if (x <= 0.66) {
            return 16.0 / 255.0;
        } else {
            return 60.0 / 255.0;
        }
    } else {
        return 219.0 / 255.0;
    }
}

float colormap_green(float x) {
    if (x < 0.0) {
        return 183.0 / 255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 196.0 / 255.0;
        } else if (x <= 0.66) {
            return 183.0 / 255.0;
        } else {
            return 60.0 / 255.0;
        }
    } else {
        return 109.0 / 255.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 202.0 / 255.0;
    } else if (x <= 1.0) {
        if (x <= 0.33) {
            return 140.0 / 255.0;
        } else if (x <= 0.66) {
            return 202.0 / 255.0;
        } else {
            return 60.0 / 255.0;
        }
    } else {
        return 157.0 / 255.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(0.5, 78))) * 4375.0);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y);
    return res;
}


float fbm(vec2 p) {
    float f = -0.8;
    float amp = 1.0;
    for (int i = 0; i < 10; i++) {
        f += amp * noise(p);
        p *= 1.5;
        amp *= 0.5;
    }
    return f/0.87;
}

float pattern(vec2 p) {
    // Moving effect using time
    return fbm(p + fbm(p + vec2(u_time * 0.1, u_time * 0.1)));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Animated pattern
    float shade = pattern(uv * 5.5);

    // Generate grain noise texture
    float grain = rand(uv * u_time) * 0.07; // Grain intensity (adjust 0.05 as needed)

    // Combine shade and grain, ensuring black background
    float finalShade = shade + grain;

    // Ensure final output is between 0 (black) and 1 (white)
    finalShade = clamp(finalShade, 0.0, 1.0);

    // Output the final color with black background
    gl_FragColor = vec4(vec3(finalShade), 1.0);
}



`;
export default frag;

