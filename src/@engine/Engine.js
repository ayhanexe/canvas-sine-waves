import dat from "dat.gui";
import { createNoise2D } from "simplex-noise";
const noise2d = createNoise2D();

/** @type { HTMLCanvasElement } */
const canvas = document.querySelector("canvas#workspace");
const context = canvas.getContext("2d");

const gui = new dat.GUI();

let startTime = Date.now();
let elapsedTime = 0;
let currentTime = 0;
let deltaTime = 0;

let waveOptions = {
    y: window.innerHeight / 2,
    length: 0.1,
    amplitude: 100,
    frequency: 5
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

animate();

function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);

    elapsedTime = (Date.now() - startTime);
    deltaTime = elapsedTime - currentTime;
    context.fillStyle = `rgba(0, 0, 0, 0.01)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const sineY = window.innerHeight / 2;

    context.beginPath();
    context.moveTo(0, window.innerHeight / 2);

    for (let i = 0; i < window.innerWidth; i++) {
        context.lineTo(i + Math.sin(i) * 0.1, Math.sin(i * 0.01 + (elapsedTime / 1000)) * Math.cos((noise2d(elapsedTime / 1000, elapsedTime / 1000))) * 100 * Math.sin(elapsedTime / 1000) + window.innerHeight / 2);
    }

    context.strokeStyle = "hsl(59, 100%, 53%)";
    context.stroke();
    context.closePath();


    currentTime = elapsedTime;
    window.requestAnimationFrame(animate);
}