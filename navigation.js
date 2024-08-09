function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Smooth easing function for a more gradual scroll
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
                smoothScroll(target, 2000); // Increase duration here
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initSmoothScrolling);