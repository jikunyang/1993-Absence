// GLSL fragment shader code
const fragTD = `
#ifdef GL_ES
precision highp float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

// Noise Function
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y
    );
    return res;
}

// Blur Function (Simple Box Blur)
vec3 blur(sampler2D tex, vec2 uv, float radius) {
    vec3 color = vec3(0.0);
    float total = 0.0;

    // Use constant bounds for GLSL ES compatibility
    for (int x = -3; x <= 3; x++) {
        for (int y = -3; y <= 3; y++) {
            vec2 offset = vec2(float(x), float(y)) / u_resolution;
            color += texture2D(tex, uv + offset).rgb;
            total += 1.0;
        }
    }
    return color / total;
}

// Slope Function (Derivative Approximation)
float slope(vec2 p) {
    float dx = dFdx(p.x);
    float dy = dFdy(p.y);
    return abs(dx) + abs(dy);
}

// Remap Function
float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    return mix(outMin, outMax, (value - inMin) / (inMax - inMin));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Noise Operation
    float n = noise(uv * 10.0 + u_time);

    // Blur Operation
    vec3 baseColor = texture2D(u_texture, uv).rgb;
    vec3 blurred = blur(u_texture, uv, 3.0);

    // Slope Operation
    float s = slope(uv);

    // Add Operation
    vec3 finalColor = baseColor + vec3(n) * 0.5;

    // Remap Operation
    float remapped = remap(n, 0.0, 1.0, 0.2, 1.0);
    finalColor *= remapped;

    // Combine everything
    gl_FragColor = vec4(finalColor + vec3(s), 1.0);
}

`;
export default fragTD;

