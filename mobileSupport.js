let posX = 0;
let posY = 0;
const smoothFactor = 0.1; // adjust this
let targetX = 0;
let targetY = 0;
const container = document.querySelector('.container');

// uptade the uhh thingy
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const centerX = 0.5;
    const centerY = 0.5;

    const distanceX = x - centerX;
    const distanceY = y - centerY;

    const sensitivity = 12;
    targetX = distanceX * sensitivity;
    targetY = distanceY * sensitivity;
});

function updatePosition() {
    // smooth interpolate
    posX = posX + (targetX - posX) * smoothFactor;
    posY = posY + (targetY - posY) * smoothFactor;

    // apply transform
    container.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;

    // keep updating
    requestAnimationFrame(updatePosition);
}

// start loop
function initializeAnimation() {
    // make sure initials are uhh good
    posX = targetX;
    posY = targetY;

    requestAnimationFrame(updatePosition);
}

// start on full page load
window.addEventListener('load', initializeAnimation);

// im l0xd8 and i made this sick javascript function