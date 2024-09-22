let posX = 0;
let posY = 0;
const smoothFactor = 0.1;
let targetX = 0;
let targetY = 0;
const container = document.querySelector('.container');
const submissionButton = document.getElementById('submission-button');
const loginButton = document.getElementById('login-button');

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
    posX = posX + (targetX - posX) * smoothFactor;
    posY = posY + (targetY - posY) * smoothFactor;

    container.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;

    requestAnimationFrame(updatePosition);
}

function initializeAnimation() {
    posX = targetX;
    posY = targetY;

    requestAnimationFrame(updatePosition);
}

window.addEventListener('load', initializeAnimation);

firebase.auth().onAuthStateChanged(user => {
    const submissionButton = document.getElementById('submission-button');
    const loginButton = document.getElementById('login-button');

    if (user) {
        loginButton.style.display = 'none';
        submissionButton.style.display = 'inline-block';
        submissionButton.textContent = 'submit';
        submissionButton.onclick = () => {
            window.location.href = 'dash/submission.html';
        };
    } else {
        submissionButton.style.display = 'none';
        loginButton.style.display = 'inline-block';
    }
});

// im l0xd8 and i made this sick javascript function