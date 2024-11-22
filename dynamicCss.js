// Function to check if the device is mobile
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

// Apply mobile-specific styles if it's a mobile device
if (isMobileDevice()) {
    const style = document.createElement("style");
    style.type = "text/css";

    const mobileCSS = `
        @media (max-width: 480px) {
            /* Make the container invisible but preserve its children */
            .container {
                display: contents; /* Removes container's box but keeps children visible */
            }

            /* Navigation links */
            .nav-links {
                flex-direction: column; /* Stack links vertically */
                align-items: center;
                margin: 0px !important; /* Remove unnecessary margins */
                padding: 0px !important; /* Remove unnecessary padding */
            }

            /* Buttons */
            .discord-button, .gform-button {
                padding: 15px 20px; /* Increase padding */
                font-size: 16px; /* Larger text */
                width: 100%; /* Full width on mobile */
                margin-bottom: 10px; /* Space between buttons */
            }

            .button-container {
                flex-direction: column; /* Stack buttons vertically */
                gap: 15px; /* Increase gap */
            }

            /* Album grid */
            .album-grid {
                grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile */
                gap: 10px; /* Smaller gaps */
            }

            .album-cover {
                height: 100px; /* Adjust height for smaller screens */
                border-radius: 10px; /* Slightly smaller corners */
            }

            .album-title {
                font-size: 14px; /* Adjust font size */
            }
        }
    `;

    // Append the new CSS rules to the style element
    style.innerHTML = mobileCSS;

    // Append the style element to the head of the document
    document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
    const styleTag = document.createElement('style');
    styleTag.textContent = mobileCSS;
    document.head.appendChild(styleTag);
});