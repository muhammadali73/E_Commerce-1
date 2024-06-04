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
    document.addEventListener("DOMContentLoaded", function () {
        const specificCards = document.querySelectorAll('.specific-card');
  
        specificCards.forEach(card => {
          const colorBalls = card.querySelectorAll('.fa-circle');
  
          colorBalls.forEach(ball => {
            ball.addEventListener('click', function () {
              const newImage = this.getAttribute('data-image');
              const cardBody = this.closest('.card-body');
              const imgElement = cardBody.querySelector('.card-img-top');
              imgElement.src = newImage;
            });
          });
        });
      });
      document.addEventListener('DOMContentLoaded', function () {
        const cartAmountElement = document.querySelector('.add-amount');
        let totalAmount = 0.00;
  
        document.querySelectorAll('.bags').forEach(icon => {
          icon.addEventListener('click', function () {
            const price = parseFloat(this.getAttribute('data-price'));
            totalAmount += price;
            cartAmountElement.innerHTML = `$${totalAmount.toFixed(2)}`;
            cartAmountElement.classList.add('added');
  
            setTimeout(() => {
              cartAmountElement.classList.remove('added');
            }, 2000);
  
            // Get the position of the clicked bag icon
            const iconRect = this.getBoundingClientRect();
            const iconStyle = getComputedStyle(this);
  
            // Create ball element
            const ball = document.createElement('div');
            ball.classList.add('scale-ball');
            ball.style.top = iconRect.top + 'px';
            ball.style.left = iconRect.left + 'px';
            ball.style.width = iconStyle.width;
            ball.style.height = iconStyle.height;
  
            document.body.appendChild(ball);
  
            // Add animation classes
            setTimeout(() => {
              ball.classList.add('ball-scale-up');
            }, 0);
  
            setTimeout(() => {
              ball.classList.remove('ball-scale-up');
              ball.classList.add('ball-scale-up');
            }, 200);
  
            setTimeout(() => {
              ball.remove();
              this.style.display = 'inline';
            }, 800);
  
            // Hide bag icon
            this.style.display = 'none';
          });
        });
      });
});
