
/**
 * FitGear Pro - Main JavaScript File
 * Handles navigation, greeting messages, and interactive features
 * Client-side functionality for gym equipment website
 */

// ===== DOM CONTENT LOADED EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('FitGear Pro website loaded successfully');
    
    // Initialize all features
    initializeNavigation();
    initializeGreeting();
    initializeScrollEffects();
    
    // Log current page for debugging
    console.log('Current page:', window.location.pathname);
});

// ===== NAVIGATION FUNCTIONALITY =====
/**
 * Initialize responsive navigation with hamburger menu
 * Handles mobile menu toggle and active link highlighting
 */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle active classes
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Log menu state for debugging
            console.log('Mobile menu toggled:', navMenu.classList.contains('active'));
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('Mobile menu closed via nav link click');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('Mobile menu closed via outside click');
        }
    });
    
    // Handle window resize - close mobile menu on larger screens
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('Mobile menu closed due to screen resize');
        }
    });
}

// ===== GREETING MESSAGE FUNCTIONALITY =====
/**
 * Display time-based greeting message
 * Shows different greetings based on current time of day
 */
function initializeGreeting() {
    const greetingElement = document.getElementById('greeting-message');
    
    // Only run on pages that have the greeting element (homepage)
    if (!greetingElement) {
        return;
    }
    
    const currentHour = new Date().getHours();
    let greetingMessage = '';
    let greetingIcon = '';
    
    // Determine greeting based on time of day
    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning!';
        greetingIcon = '🌅';
    } else if (currentHour >= 12 && currentHour < 17) {
        greetingMessage = 'Good Afternoon!';
        greetingIcon = '☀️';
    } else if (currentHour >= 17 && currentHour < 21) {
        greetingMessage = 'Good Evening!';
        greetingIcon = '🌆';
    } else {
        greetingMessage = 'Good Night!';
        greetingIcon = '🌙';
    }
    
    // Display the greeting with icon
    greetingElement.innerHTML = `${greetingIcon} ${greetingMessage}`;
    
    // Log greeting for debugging
    console.log(`Greeting displayed: ${greetingMessage} (Hour: ${currentHour})`);
    
    // Add fade-in animation
    greetingElement.style.opacity = '0';
    greetingElement.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        greetingElement.style.opacity = '1';
    }, 100);
}

// ===== SCROLL EFFECTS =====
/**
 * Add scroll-based effects and animations
 * Includes smooth scrolling and scroll-to-top functionality
 */
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                console.log(`Smooth scroll to: ${targetId}`);
            }
        });
    });
    
    // Add scroll-to-top functionality
    let scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('Scrolled to top');
    });
}

// ===== UTILITY FUNCTIONS =====
/**
 * Utility function to validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Utility function to validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is valid, false otherwise
 */
function isValidPhone(phone) {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's 10 digits (US format) or starts with 1 and has 11 digits
    return cleanPhone.length === 10 || (cleanPhone.length === 11 && cleanPhone.startsWith('1'));
}

/**
 * Utility function to display toast messages
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success', 'error', 'info')
 */
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
    
    console.log(`Toast displayed: ${message} (${type})`);
}

// ===== PERFORMANCE MONITORING =====
/**
 * Monitor page performance and log metrics
 */
function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log navigation timing if available
        if (performance.getEntriesByType) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Navigation timing:', {
                    'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
                    'TCP Connection': navigation.connectEnd - navigation.connectStart,
                    'Server Response': navigation.responseEnd - navigation.requestStart,
                    'DOM Loading': navigation.domContentLoadedEventEnd - navigation.responseEnd,
                    'Total Load Time': navigation.loadEventEnd - navigation.navigationStart
                });
            }
        }
    });
    
    // Monitor viewport changes
    window.addEventListener('resize', function() {
        console.log(`Viewport resized to: ${window.innerWidth}x${window.innerHeight}`);
    });
}

// Initialize performance monitoring
monitorPerformance();

// ===== ERROR HANDLING =====
/**
 * Global error handler for debugging
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error
    });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(event) {
    // Handle Escape key to close mobile menu
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('Mobile menu closed via Escape key');
        }
    }
});

// ===== EXPORT FUNCTIONS FOR TESTING =====
// Make functions available globally for testing purposes
window.FitGearPro = {
    isValidEmail,
    isValidPhone,
    showToast,
    initializeGreeting,
    initializeNavigation
};

console.log('FitGear Pro main.js loaded successfully');
