/**
 * Dynamic Header and Footer Loader
 * Loads header and footer HTML from external files
 */

(function() {
    'use strict';

    // Function to load HTML content
    function loadHTML(elementId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                    
                    // After header is loaded, highlight active menu
                    if (elementId === 'header-placeholder') {
                        highlightActiveMenu();
                    }
                }
            })
            .catch(error => {
                console.error('Error loading ' + filePath + ':', error);
            });
    }

    // Function to highlight active menu based on current page
    function highlightActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.box-nav-menu .menu-item a');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Load header and footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadHTML('header-placeholder', 'includes/header.html');
            loadHTML('footer-placeholder', 'includes/footer.html');
        });
    } else {
        loadHTML('header-placeholder', 'includes/header.html');
        loadHTML('footer-placeholder', 'includes/footer.html');
    }
})();
