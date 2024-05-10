document.addEventListener("DOMContentLoaded", function () {
    var menu = document.querySelector(".fa-bars");
    var offCanvas = document.querySelector(".off-canvas");
    var closeButton = document.querySelector(".fa-xmark"); // Select the close button

    var tl = gsap.timeline({ paused: true });

    tl.to(offCanvas, {
        right: 0,
        duration: 0.5,
        ease: "power3.out"
    });

    menu.addEventListener("click", function () {
        tl.play();
    });

    closeButton.addEventListener("click", function () {
        tl.reverse(); // Reverse the animation when close button is clicked
    });

    // Close off-canvas when clicking outside or on the close button
    document.addEventListener("click", function (event) {
        if (!offCanvas.contains(event.target) && !menu.contains(event.target)) {
            tl.reverse();
        }
    });
    gsap.from(".hero-text h1",{
        duration:2,
        opacity:0,
        x:-5
    })
});
