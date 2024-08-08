const isLocal = window.location.protocol === 'file:';

function loadContent(url, container) {
    if (isLocal) {
        container.innerHTML = '<p>Cannot load content locally. Please run on a web server.</p>';
    } else {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;

                // Reapply CSS if necessary
                reapplyStyles();
            })
            .catch(error => {
                console.error('Error loading page:', error);
                container.innerHTML = '<p>Error loading content.</p>';
            });
    }
}

function reapplyStyles() {
    // This can be used to re-trigger CSS or JS initialization if needed
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(sheet => {
        sheet.href = sheet.href; // Re-triggering the stylesheet
    });

    // Optionally reinitialize any JS logic if your content has dynamic components
    // initializeComponents();
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const contentContainer = document.querySelector('.content');

        loadContent(url, contentContainer);
        history.pushState(null, null, url);
    });
});