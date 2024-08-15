let posX = 0;
let posY = 0;
const smoothFactor = 0.1; // Adjusted for potentially smoother animation
let targetX = 0;
let targetY = 0;
const container = document.querySelector('.container');

// Update targetX and targetY on mouse move
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
    // Smoothly interpolate the position using a different approach
    posX = posX + (targetX - posX) * smoothFactor;
    posY = posY + (targetY - posY) * smoothFactor;

    // Apply the transformation
    container.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;

    // Continue updating the position
    requestAnimationFrame(updatePosition);
}

// Start the animation loop
function initializeAnimation() {
    // Ensure initial values are properly set
    posX = targetX;
    posY = targetY;

    requestAnimationFrame(updatePosition);
}

// Start the animation on page load
window.addEventListener('load', initializeAnimation);

// im l0xd8 and i made this sick javascript function