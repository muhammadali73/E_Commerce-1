document.addEventListener("DOMContentLoaded", function () {
    var menu = document.querySelector(".fa-bars");
    var offCanvas = document.querySelector(".off-canvas");
    var closeButton = document.querySelector(".fa-xmark");

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
        tl.reverse();
    });

    document.addEventListener("click", function (event) {
        if (!offCanvas.contains(event.target) && !menu.contains(event.target)) {
            tl.reverse();
        }
    });
    gsap.from(".hero-text h1", {
        duration: 2,
        opacity: 0,
        x: -5
    })
    document.getElementById("subscribeForm").addEventListener("submit", function(event) {
        var emailInput = document.getElementById("email");
        var email = emailInput.value.trim();
        var emailPattern = /^[^\s@]+@gmail\.com$/;

        if (!emailPattern.test(email)) {
            // Display custom error message
            emailInput.setCustomValidity("Please enter a valid email address ending with @gmail.com");
            event.preventDefault(); // Prevent form submission
        } else {
            emailInput.setCustomValidity("none"); // Reset error message
        }
    });
    var swiperOptions = {
        loop: true,
        freeMode: true,
        spaceBetween: 30, // Adjust space between slides
        grabCursor: true,
        slidesPerView: 5, // Adjust number of slides visible
        autoplay: {
            disableOnInteraction: false
        },
        speed: 1000,
        freeModeMomentum: false,
        breakpoints: {
            // when window width is >= 1024px
            1024: {
                slidesPerView: 5
            },
            991: {
                slidesPerView: 4
            },
            // when window width is >= 767px
            768: {
                slidesPerView: 3
            },
            // when window width is >= 576px
            576: {
                slidesPerView: 2
            },
            // when window width is >= 400px
            400: {
                slidesPerView: 1
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);
});
