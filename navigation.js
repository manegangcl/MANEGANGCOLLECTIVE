function loadPage(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary DOM element to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Replace content with new page
            const content = document.querySelector('.content');
            content.innerHTML = tempDiv.querySelector('.content').innerHTML;

            // Optionally reapply inline styles if needed
            applyStyles();

            // Reinitialize smooth scrolling for anchors in the new content
            initSmoothScrolling();
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function applyStyles() {
    const allElements = document.querySelectorAll('.content *');
    allElements.forEach(element => {
        // Reapply inline styles if needed
        // You can customize this function to handle specific inline styles
        if (element.style.cssText) {
            // For example, logging inline styles to verify
            console.log(element.style.cssText);
        }
    });
}

function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('.content a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Scroll to the specific section smoothly
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Call initSmoothScrolling when the page is loaded for the first time
document.addEventListener('DOMContentLoaded', initSmoothScrolling);