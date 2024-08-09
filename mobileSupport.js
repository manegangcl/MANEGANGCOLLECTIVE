function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function () {
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
        message.innerText = 'Mobile support is not yet implemented.';
        document.body.appendChild(message);
    }
});
