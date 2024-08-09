function removeInlineStyles() {
    const elements = document.querySelectorAll('[style]');
    elements.forEach(element => {
        element.removeAttribute('style');
    });
}

function addGlobalStyles() {
    const styles = `
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'manegangfont', sans-serif;
            background-color: #0a0a0a;
            background-image: url('assets/bg.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
            color: #cccccc;
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            scrollbar-width: none;
            user-select: none;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .container {
            max-width: 1200px;
            width: 90%;
            padding: 20px;
            background: rgba(0, 0, 0, 0.22);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(6.9px);
            -webkit-backdrop-filter: blur(6.9px);
            border: 1px solid rgba(0, 0, 0, 0.14);
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.1s ease-out;
            will-change: transform;
            position: relative;
            height: 80vh;
            overflow-y: auto;
            margin-top: 1.8vh;
            margin-bottom: 20px;
        }
        .container::-webkit-scrollbar {
            display: none;
        }
        header {
            text-align: center;
            padding: 10px 0;
        }
        .logo {
            max-width: 50%;
            height: auto;
            margin-top: -80px;
            margin-bottom: -140px;
        }
        .nav-links {
            display: flex;
            justify-content: center;
            margin: 15px 0;
        }
        .nav-links a {
            color: #ffffff;
            text-transform: lowercase;
            font-size: 14px;
            letter-spacing: 1px;
            margin: 0 15px;
            transition: color 0.3s;
            text-decoration: none;
            filter: antialiased;
        }
        .nav-links a:hover {
            color: #cccccc;
            filter: blur(1px);
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        .album-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 20px;
            width: 100%;
        }
        .album-cover {
            position: relative;
            width: 100%;
            height: 130px;
            border-radius: 12px;
            overflow: hidden;
            transition: filter 0.3s cubic-bezier(.04,.95,0,.95);
        }
        .album-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: filter 0.3s ease;
        }
        .album-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffffff;
            font-size: 18px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.089);
            opacity: 0;
            transition: opacity 0.3s ease-out;
            text-align: center;
        }
        .album-cover:hover img {
            filter: blur(2.3px) brightness(0.8);
        }
        .album-cover:hover .album-title {
            opacity: 1;
        }
        .discord-button {
            display: inline-block;
            background-image: linear-gradient(to right, #6a76f0 0%, #505ce0 51%, rgb(87, 99, 231) 100%);
            padding: 10px 20px;
            background-color: #5865F2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .discord-button:hover {
            background-color: #4b56ce;
        }
        .gform-button {
            display: inline-block;
            background-image: linear-gradient(to right, #6941b4 0%, #663db4 51%, #663BB8 100%);
            padding: 10px 20px;
            background-color: #5865F2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .gform-button:hover {
            background-color: #5832a0;
        }
        footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #e0e0e0;
        }
        footer a {
            color: #ffffff;
            text-decoration: none;
        }
        footer a:hover {
            color: #e4e4e4;
        }
        h2 {
            margin-top: -5px;
            margin-bottom: 0px;
            font-size: 24px;
        }
        .hidden-button {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            background: transparent;
            border: none;
            cursor: pointer;
            opacity: 0;
        }
        @media (max-width: 768px) {
            .album-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .logo {
                max-width: 80%;
            }
            .nav-links a {
                font-size: 12px;
                margin: 0 10px;
            }
            .album-title {
                font-size: 16px;
            }
            h2 {
                font-size: 20px;
            }
        }
        @media (max-width: 480px) {
            .album-grid {
                grid-template-columns: 1fr;
            }
            .logo {
                max-width: 90%;
            }
            .nav-links {
                flex-direction: column;
                margin: 10px 0;
            }
            .nav-links a {
                margin: 5px 0;
            }
            .album-title {
                font-size: 14px;
            }
            h2 {
                font-size: 18px;
            }
            .discord-button {
                padding: 8px 16px;
                font-size: 14px;
            }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', function () {
    // Remove all inline styles
    removeInlineStyles();

    // Apply global styles
    addGlobalStyles();

    // Additional functionalities like smooth scrolling, mobile detection, etc.
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
        message.innerText = 'mobile support is not yet implemented, it is planned';
        document.body.appendChild(message);
    }
});