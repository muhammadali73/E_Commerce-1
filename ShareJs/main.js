document.addEventListener("DOMContentLoaded", function () {
    // Off-canvas menu functionality
    var menu = document.querySelector(".fa-bars");
    var offCanvas = document.querySelector(".off-canvas");
    var closeButton = document.querySelector(".fa-xmark");
    const canvas = document.getElementById('cartCanvas');
    const togglers = document.querySelectorAll('.togglers');
    const cartItemsContainer = document.getElementById('cartItems');
    const continueShoppingBtn = document.querySelector('.off-btn');
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
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartTotal() {
        const cartTotalElems = document.querySelectorAll('.cart-total');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        localStorage.setItem('cartTotal', cartTotal.toFixed(2));
        cartTotalElems.forEach(elem => elem.textContent = `${cartTotal.toFixed(2)}`);
        const subtotalElem = document.getElementById('subtotalAmount');
        if (subtotalElem) {
            subtotalElem.textContent = "$"+cartTotal.toFixed(2);
        }
    }
    
    function updateCartItemsUI() {
        const cartItemsContainer = document.getElementById('cartItems');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>No products in the cart</p>';
        } else {
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="push-image">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <span class="item-name">${item.name}</span>
                        <span>${item.color || 'basic'}</span>
                        <span>${item.quantity} x</span>
                        <span>$${(item.quantity * item.price).toFixed(2)}</span>
                        <button class="remove-btn" data-index="${index}"><i class="fas fa-times"></i></button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
    
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    removeCartItem(index);
                });
            });
        }
        updateCartTotal();
    }       
    
    function removeCartItem(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartItemsUI();
        updateCartTotal();
    }
    

    // Function to update cart item count
    function updateCartItemCount() {
        let cartItemCountElems = document.querySelectorAll('.cart-item-count');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
        cartItemCountElems.forEach(elem => elem.textContent = totalItems);
    }

    function addToCart(productName, productPrice, quantity, color) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.name === productName && item.color === color);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({
                name: productName,
                quantity: quantity,
                price: productPrice,
                color: color
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartItemsUI();
        updateCartTotal();
        updateCartItemCount();
    }

    function openOffCanvas() {
        offCanvas.classList.add('open');
        document.querySelector('.overlay').classList.add('show');
    }

    document.querySelector('.fa-bag-shopping').addEventListener('click', openOffCanvas);
    document.querySelector('.cart-total').addEventListener('click', openOffCanvas);

    togglers.forEach(toggler => {
        toggler.addEventListener('click', function () {
            canvas.classList.add('cartOpen');
            canvas.classList.remove('cartClosed');
            updateCartItemsUI();
        });
    });

    document.querySelector('.closeIcon').addEventListener('click', function () {
        canvas.classList.add('cartClosed');
        canvas.classList.remove('cartOpen');
    });

    updateCartItemsUI();
    updateCartTotal();

    // Event listener for add-to-cart buttons on other pages
   document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent);
            const quantityInput = productCard.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value);
            const color = productCard.querySelector('.selected-color').textContent;
            
            if (!isNaN(quantity) && quantity > 0) {
                addToCart(productName, productPrice, quantity, color);
            }
        });
    });

    updateCartTotal();
    updateCartItemCount();
    updateCartItemsUI();
});