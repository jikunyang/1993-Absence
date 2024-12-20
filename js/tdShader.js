// GLSL fragment shader code
const fragTD = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time; // Animation over time
uniform vec2 u_resolution; // Screen resolution
uniform sampler2D u_texture; // Input image

// Noise function
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

// FBM (Fractal Brownian Motion) for more complex noise
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Point transform effect based on dynamic noise and time
vec2 pointTransform(vec2 uv) {
    // Animate the noise effect horizontally based on time
    float animationSpeed = -0.1; // Control the speed of the animation
    vec2 offset = vec2(fbm(uv * 0.5 + u_time * animationSpeed), fbm(uv * 250.0 - u_time * animationSpeed)) * 0.1;
    return uv - offset * 1.5;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy; // Normalize to range [0, 1]
    uv = uv - 0.5; // Center UV to range [-0.5, 0.5]
    uv.x *= u_resolution.x / u_resolution.y; // Correct aspect ratio

    // Apply the point transform effect to UV coordinates
    vec2 transformedUV = pointTransform(uv);

    // Warp UV coordinates based on FBM noise
    vec2 warpedUV = transformedUV;
    warpedUV.x += fbm(transformedUV * 1.0 + u_time * 0.2) * 0.1;
    warpedUV.y += fbm(transformedUV * 2.0 - u_time * 0.2) * 0.2;

    // Clamp UV coordinates to prevent out-of-bounds sampling
    warpedUV = clamp(warpedUV, -1.0, 1.0); // Ensure the UV coordinates are within [-1, 1]
    warpedUV = (warpedUV + 1.0) * 0.5; // Convert back to [0, 1] range

    // Sample the image texture with warped UV
    vec4 texColor = texture2D(u_texture, warpedUV);

    // Apply noise effect to the texture color
    float value = pow(fbm(warpedUV * 2500.0), 4.0);

    // Adjust contrast for more obvious effect
    float contrast = 6.0; // Increase for stronger contrast
    texColor.rgb = (texColor.rgb - 0.6) * contrast + 0.5;

    // Final output with noise modulation
    gl_FragColor = vec4(texColor.rgb * value, texColor.a);
}

`;
export default fragTD;

