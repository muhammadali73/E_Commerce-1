const products = [
    {
        name: "Anchor Bracelet",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-300x300.jpg",
        category: "Accessories",
        price: "$150.00 - $180.00",
        colors: {
            "black": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-300x300.jpg",
            "Brown": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory2-b-300x300.jpg",
            "orange": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory2-c-300x300.jpg"
        },
        rating: 5,
        date:"2024-05-15"
    },{
        name: "Black Over-the-shoulder Handbag",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag2-300x300.jpg",
        category: "Accessories",
        price: "$150.00",
        rating: 3,
        date:"2024-06-29"
    },{
        name: "Baho Bangle Bracelet",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory1-300x300.jpg",
        category: "Accessories",
        price: "$150.00",
        colors: {
            "aqua": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory1-300x300.jpg",
            "green": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory1-c-300x300.jpg",
            "red": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory1-b-300x300.jpg"
        },
        rating: 3,
        date:"2024-05-18"
    }, {
        name: "Bright Gold Purse With Chain",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag4-300x300.jpg",
        category: "Accessories",
        price: "$150.00",
        rating: 4,
        date:"2024-07-09"
    }, {
        name: "Bright Red Bag",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3-300x300.jpg",
        category: "Accessories",
        price: "$100.00",
        colors: {
            "blue": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-bag3-c-300x300.jpg",
            "orange": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-bag3-d-300x300.jpg",
            "purple": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-bag3-b-300x300.jpg",
            "red": "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3-300x300.jpg"
        },
        rating: 5,
        date:"2024-02-13"
    }, {
        name: "Buddha Bracelet",
        imgurl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory3-300x300.jpg",
        category: "Accessories",
        price: "$150.00",
        rating: 2,
        date:"2024-11-01"
    },
];


document.addEventListener('DOMContentLoaded', function() {
    const productsPerPage = 12;
    let currentPage = 1;
    let filteredProducts = [...products]; // Use this to store the currently filtered products
    let sortedProducts = [...filteredProducts];
    let totalPrice = 0; // Initialize totalPrice outside

    const pagination = document.getElementById('pagination');
    const resultsSummary = document.getElementById('results-summary');

    const minPriceInput = document.querySelector('input[type="range"]:first-of-type');
    const maxPriceInput = document.querySelector('input[type="range"]:last-of-type');

    let cartButtonsInitialized = false;

    function initializeCartButtons() {
        if (cartButtonsInitialized) return; // Check if buttons are already initialized
        const cartButtons = document.querySelectorAll('.shopping-bag');
        const totalPriceElement = document.querySelector('.bold');

        cartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.card');
                const priceText = card.querySelector('.card-text p').textContent;
                const price = parseFloat(priceText.replace(/[^0-9.-]+/g, '')); // Use regular expression to extract numbers

                if (!isNaN(price)) { // Check if price is a valid number
                    totalPrice += price;
                    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
                } else {
                    console.error('Invalid price:', priceText); // Log an error if price is invalid
                }
            });
        });

        cartButtonsInitialized = true;
    }

    function createPagination() {
        const numPages = Math.ceil(sortedProducts.length / productsPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
    
        const prevButton = createPageButton('←', () => {
            if (currentPage > 1) {
                displayProducts(currentPage - 1);
            }
        });
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        prevLi.appendChild(prevButton);
        pagination.appendChild(prevLi);
    
        for (let i = 1; i <= numPages; i++) {
            const pageButton = createPageButton(i, () => {
                displayProducts(i);
            });
    
            const pageLi = document.createElement('li');
            pageLi.classList.add('page-item');
            if (i === currentPage) {
                pageLi.classList.add('active');
            }
            pageLi.appendChild(pageButton);
            pagination.appendChild(pageLi);
        }
    }
    
    function createPageButton(text, onClick) {
        const button = document.createElement('button');
        button.classList.add('page-link');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    
    function displayProducts(page) {
        currentPage = page;
        // Logic to display products for the given page
        createPagination(); // Update pagination after changing the page
    }
    
    // Initialize the pagination on page load or after setting sortedProducts and productsPerPage
    createPagination();
    
    function sortProducts(type) {
        sortedProducts = [...filteredProducts]; // Reset to currently filtered products

        if (type === 'rating') {
            sortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (type === 'latest') {
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (type === 'high-low') {
            sortedProducts.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.price.replace(/[^0-9.-]+/g,"")));
        } else if (type === 'low-high') {
            sortedProducts.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,"")));
        }
    }

    function displayProducts(page) {
        currentPage = page;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = sortedProducts.slice(startIndex, endIndex);

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        if (productsToShow.length === 0) {
            // Hide pagination, results summary, and product container
            resultsSummary.textContent = ''; // Clear previous results summary
            productContainer.innerHTML = '<div class="no-results">No products were found matching your selection.</div>';
            pagination.style.display = 'none';      
            return; // Exit the function
        }

        // If there are products to display, show the pagination and product container
        resultsSummary.textContent = `Showing ${startIndex + 1}–${Math.min(endIndex, sortedProducts.length)} of ${sortedProducts.length} results`;

        productsToShow.forEach(product => {
            const cardCol = document.createElement('div');
            cardCol.classList.add('col-lg-4', 'col-md-4', 'col-12');
    
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
    
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
    
            const img = document.createElement('img');
            if (product.colors) {
                img.src = product.colors[Object.keys(product.colors)[0]]; // Set default image if colors are available
            } else {
                img.src = product.imgurl; // Use default image url if colors are not available
            }
            img.alt = product.name;
            img.classList.add('card-img-top');
            imgContainer.appendChild(img);
    
            const shoppingBag = document.createElement('div');
            shoppingBag.classList.add('shopping-bag');
            shoppingBag.setAttribute('data-after-text', product.colors ? 'Select Option' : 'Add to Cart');
            shoppingBag.innerHTML = '<i class="fas fa-shopping-bag"></i>';
            imgContainer.appendChild(shoppingBag);
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            const name = document.createElement('h6');
            name.classList.add('card-title');
            name.textContent = product.name;
            cardBody.appendChild(name);
    
            const category = document.createElement('a');
            category.classList.add('card-text');
            category.textContent = product.category;
            cardBody.appendChild(category);
    
            const price = document.createElement('p');
            price.classList.add('card-text');
            price.textContent = `${product.price}`;
            cardBody.appendChild(price);
    
            const colorButtons = document.createElement('div');
            colorButtons.classList.add('color-buttons');
    
            if (product.colors) {
                for (const colorOption in product.colors) {
                    const btn = document.createElement('i');
                    btn.classList.add('fa-solid', 'fa-circle');
                    btn.style.color = colorOption;
                    btn.title = colorOption; // Set the title attribute to show the color name on hover
                    btn.addEventListener('click', function() {
                        img.src = product.colors[colorOption];
                    });
                    colorButtons.appendChild(btn);
                }
            }
    
            cardBody.appendChild(colorButtons);
    
            if (product.rating) {
                const rating = document.createElement('div');
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('i');
                    star.classList.add('fas');
                    star.classList.add('fa-star');
                    if (i >= product.rating) {
                        star.classList.remove('fas');
                        star.classList.add('far'); 
                    }
                    rating.appendChild(star);
                }
                cardBody.appendChild(rating);
            }
    
            card.appendChild(imgContainer);
            card.appendChild(cardBody);
            cardCol.appendChild(card);
            productContainer.appendChild(cardCol);
        });

        window.scrollTo(0, 0); // Scroll to top of the page after displaying products

        initializeCartButtons(); // Initialize cart buttons after rendering products
    }

    // Other functions remain unchanged...

    displayProducts(currentPage); // Display the first page of products on page load
    createPagination();
    initializeCartButtons(); // Initialize cart buttons on page load

    document.getElementById('sort-dropdown').addEventListener('change', function() {
        const sortType = this.value;
        sortProducts(sortType);
        displayProducts(1);
        createPagination();
        initializeCartButtons(); // Reinitialize cart buttons after sorting
    });

    document.getElementById('filter-button').addEventListener('click', function() {
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);
        filterProductsByPrice(minPrice, maxPrice);
    });

    document.getElementById('search-button').addEventListener('click', function() {
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        searchProductsByName(searchQuery);
    });

    document.getElementById('search-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
            searchProductsByName(searchQuery);
        }
    });

    function filterProductsByPrice(minPrice, maxPrice) {
        filteredProducts = products.filter(product => {
            const price = parseFloat(product.price.replace(/[^0-9.-]+/g,""));
            return price >= minPrice && price <= maxPrice;
        });
        sortProducts(document.getElementById('sort-dropdown').value);
        displayProducts(1);
        createPagination();
    }

    function searchProductsByName(query) {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        sortProducts(document.getElementById('sort-dropdown').value);
        displayProducts(1);
        createPagination();
    }
});
