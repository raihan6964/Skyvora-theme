// theme.js for Skyvora-theme assets folder

// Functionality for cart count update
async function updateCartCount() {
    const response = await fetch('/cart.json');
    const data = await response.json();
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = data.item_count;
}

// Product image gallery thumbnail click handlers
const initImageGallery = () => {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            mainImage.src = event.target.src;
        });
    });
};

// Quantity selector button functionality
const initQuantitySelectors = () => {
    const quantityInputs = document.querySelectorAll('.quantity-selector');
    quantityInputs.forEach(input => {
        const incrementButton = input.querySelector('.increment');
        const decrementButton = input.querySelector('.decrement');

        incrementButton.addEventListener('click', () => {
            input.value = parseInt(input.value) + 1;
        });

        decrementButton.addEventListener('click', () => {
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
};

// Mobile menu toggle for hamburger navigation
const initMobileMenuToggle = () => {
    const menuButton = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
};

// Smooth scroll to section anchors
const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"];');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

// Add to cart form submission with AJAX fetch
const initAddToCartForm = () => {
    const form = document.getElementById('add-to-cart-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });

        const result = await response.json();
        displayNotification('Item added to cart!', 'success');
        updateCartCount();
    });
};

// Notification display function with success and error states
const displayNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Lazy loading image observer
const initLazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');

    const lazyLoad = (image) => {
        const src = image.getAttribute('data-src');
        if (src) {
            image.src = src;
            image.removeAttribute('data-src');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(image => {
        observer.observe(image);
    });
};

// AOS animation trigger on scroll
const initAOS = () => {
    AOS.init();
};

// Initialize all functionalities when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initImageGallery();
    initQuantitySelectors();
    initMobileMenuToggle();
    initSmoothScroll();
    initAddToCartForm();
    initLazyLoad();
    initAOS();
});
