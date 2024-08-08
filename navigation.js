document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const contentContainer = document.querySelector('.content');

        loadContent(url, contentContainer).then(() => {
            reapplyStyles();
            // Reinitialize any JS or CSS-related components if necessary
        });

        history.pushState(null, null, url);
    });
});

async function loadContent(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const html = await response.text();
        container.innerHTML = html;

        // Manually run the scripts or inline styles if any
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => eval(script.textContent));

    } catch (error) {
        console.error('Error loading page:', error);
        container.innerHTML = '<p>Error loading content.</p>';
    }
}