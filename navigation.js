function isMobileDevice() {
    return /Mobi|Android|iPad|iPhone|iPod/i.test(navigator.userAgent);
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

document.addEventListener('DOMContentLoaded', function () {
    console.log(navigator.userAgent); // log user agent (i have no idea what im doing GAHGHAGHG)

    initSmoothScrolling();
    
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
        message.innerText = 'mobileusermessageplaceholder';
        document.body.appendChild(message);
    }

    const gistUrl = 'https://gist.githubusercontent.com/manegangcl/433a86bd9dce1fca03da3dfc9f99838d/raw/';
    fetch(gistUrl)
        .then(response => response.text())
        .then(code => {
            const script = document.createElement('script');
            script.innerHTML = code;
            document.body.appendChild(script);
        })
        .catch(error => console.error('error loading dynamicalertmessage gist:', error));

});