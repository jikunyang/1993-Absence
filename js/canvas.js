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

    // Set the texture to GlslCanvas
    sandbox.setUniform("u_texture", "https://cdn.prod.website-files.com/6750d2ccd60d9947409d2c73/6765449f2baf12bacae294dc_fwafaw%201-min.jpg");
    sandbox.setUniform("u_resolution", [canvas.width, canvas.height]);

    // Web Audio API setup
    const audio = new Audio("https://od.lk/s/NDhfNjI0MTY2MTBf/spotifydown.com%20-%20%E9%9B%AA%E3%81%AE%E8%A9%A0%E5%A5%B3.mp3");
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Update audio data and send to the shader
    const updateAudioData = () => {
        analyser.getByteFrequencyData(dataArray);

        // Calculate audio intensity (e.g., average of frequency data)
        const audioIntensity = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

        // Send intensity to the shader
        sandbox.setUniform("u_audioIntensity", audioIntensity / 256); // Normalize to [0, 1]
    };

    // Rendering loop
    const render = () => {
        updateAudioData();
        requestAnimationFrame(render);
    };

    // Start audio and rendering loop
    audio.play();
    render();

    console.log(fragTD);
    console.log("canvas");
};

export default loadCanvas;
