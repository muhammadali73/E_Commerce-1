const textarea = document.getElementById('resizableTextarea');
const resizeHandle = document.getElementById('resizeHandle');
let isResizing = false;

resizeHandle.addEventListener('mousedown', function (e) {
    isResizing = true;
    e.preventDefault();
});

document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;

    const textareaRect = textarea.getBoundingClientRect();
    const newHeight = Math.min(300, e.clientY - textareaRect.top); // Restrict max height to 150px
    if (newHeight >= 50) { // Restrict minimum height to 50px
        textarea.style.height = newHeight + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isResizing = false;
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const button = form.querySelector('button');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const listenRight = document.getElementById('listenRight');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Change button text to "sending...."
        button.textContent = 'SENDING....';

        // Wait for 2 seconds before showing the thank you message
        setTimeout(function () {
            // Hide the form
            form.style.opacity = 0;

            // Ensure the height of listen-right remains the same
            listenRight.style.height = `${listenRight.offsetHeight}px`;

            // Show the thank you message
            thankYouMessage.style.display = 'block';

            // Reset button text
            button.textContent = 'SEND MESSAGE';
        }, 2000);
    });
});