document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            const href = this.getAttribute('href');
            loadPage(href);
        });
    });

    function loadPage(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Replace content with new page
                const content = document.querySelector('.content');
                content.innerHTML = html;

                // Reapply styles if necessary
                applyStyles();
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }

    function applyStyles() {
        // Reapply any inline styles if needed
        const newElements = document.querySelectorAll('.album-info');
        newElements.forEach(element => {
            element.style.color = '#cccccc'; // Example style, adjust as needed
            // Apply any other styles you need to ensure they display correctly
        });
    }
});