document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default page reload
            const target = this.getAttribute('href'); // Get the href attribute
            
            // Use fetch to load the new page's content
            fetch(target)
                .then(response => response.text())
                .then(data => {
                    // Replace the content of the current page with the new content
                    const parser = new DOMParser();
                    const newDoc = parser.parseFromString(data, 'text/html');
                    document.querySelector('.content').innerHTML = newDoc.querySelector('.content').innerHTML;
                    history.pushState(null, '', target); // Update the browser's URL without reloading the page
                })
                .catch(error => console.error('Error loading page:', error));
        });
    });

    // Handle the back/forward buttons
    window.addEventListener('popstate', function() {
        const target = location.pathname;
        fetch(target)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(data, 'text/html');
                document.querySelector('.content').innerHTML = newDoc.querySelector('.content').innerHTML;
            });
    });
});