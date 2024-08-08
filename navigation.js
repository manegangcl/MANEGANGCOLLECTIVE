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

            // Get the new CSS links
            const newStyles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
            const head = document.head;

            // Remove old styles (if necessary) and add new ones
            head.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());
            newStyles.forEach(link => {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = link.href;
                head.appendChild(newLink);
            });

            // Replace content with new page
            const content = document.querySelector('.content');
            content.innerHTML = tempDiv.querySelector('.content').innerHTML;

            // Reapply styles if necessary
            applyStyles();
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}