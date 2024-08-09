function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easing = 0.5 - Math.cos(progress * Math.PI) / 2;

        window.scrollTo(0, startPosition + distance * easing);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

function initSmoothScrolling() {
    document.querySelectorAll('.content a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target, 2000);
            }
        });
    });
}

function rearrangeForMobile() {
    const container = document.querySelector('.container');
    const navLinks = document.querySelector('.nav-links');
    const albumCovers = document.querySelectorAll('.album-cover');

    // Adjust styles for mobile devices
    if (isMobileDevice()) {
        container.style.padding = '10px'; // Adjust padding for mobile
        container.style.height = 'auto'; // Allow height to be determined by content

        // Stack nav links vertically
        navLinks.style.flexDirection = 'column'; 
        navLinks.style.alignItems = 'center'; 

        // Adjust album cover layout
        albumCovers.forEach(cover => {
            cover.style.width = '90%'; // Adjust width for mobile
            cover.style.margin = '10px auto'; // Center album covers
        });
    }
}

function displayMobileMessage() {
    if (isMobileDevice()) {
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.backgroundColor = 'red';
        message.style.color = '#fff';
        message.style.padding = '20px';
        message.style.borderRadius = '8px';
        message.style.zIndex = '9999';
        message.innerText = 'Mobile support is being implemented. Layout adjustments are in place.';
        document.body.appendChild(message);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log(navigator.userAgent); // Log user agent
    initSmoothScrolling();
    rearrangeForMobile(); // Adjust layout for mobile
    displayMobileMessage(); // Show message for mobile users
});