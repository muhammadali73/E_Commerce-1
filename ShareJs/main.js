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

    // Email validation
    document.getElementById("subscribeForm").addEventListener("submit", function (event) {
        var emailInput = document.getElementById("email");
        var email = emailInput.value.trim();
        var emailPattern = /^[^\s@]+@gmail\.com$/;

        if (!emailPattern.test(email)) {
            emailInput.setCustomValidity("Please enter a valid email address ending with @gmail.com");
            event.preventDefault();
        } else {
            emailInput.setCustomValidity("");
        }
    });

    // Cart functionality
    const cartTotalElems = document.querySelectorAll('.cart-total');
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    function updateCartTotal(newTotal) {
        cartTotal = newTotal;
        localStorage.setItem('cartTotal', cartTotal.toFixed(2));
        cartTotalElems.forEach(elem => elem.textContent = cartTotal.toFixed(2));
    }

    updateCartTotal(cartTotal);

    function openOffCanvas() {
        offCanvas.classList.add('open');
        document.querySelector('.overlay').classList.add('show');
    }

    document.querySelector('.fa-bag-shopping').addEventListener('click', openOffCanvas);
    document.querySelector('.cart-total').addEventListener('click', openOffCanvas);

    // Update cart total when items are added (this part will be unique for each page)
    const addToCartButton = document.getElementById('btnn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const quantityInput = document.getElementById('quantity');
            const selectedPrice = parseFloat(document.querySelector('.selected-price').textContent) || 0;
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(quantity) && quantity > 0 && selectedPrice > 0) {
                cartTotal += quantity * selectedPrice;
                updateCartTotal(cartTotal);
                location.reload();
            }
        });
    }
});