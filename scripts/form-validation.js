/**
 * FitGear Pro - Form Validation JavaScript
 * Comprehensive form validation for the contact/enquiry form
 * Client-side validation with real-time feedback
 */

// ===== FORM VALIDATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiry-form');
    
    if (!enquiryForm) {
        console.log('Enquiry form not found on this page');
        return;
    }
    
    console.log('Form validation initialized');
    initializeFormValidation();
});

// ===== FORM VALIDATION SETUP =====
/**
 * Initialize form validation with real-time feedback
 */
function initializeFormValidation() {
    const form = document.getElementById('enquiry-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Form fields
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        interest: document.getElementById('interest'),
        budget: document.getElementById('budget'),
        message: document.getElementById('message'),
        newsletter: document.getElementById('newsletter')
    };
    
    // Add real-time validation listeners
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field && field.type !== 'checkbox') {
            // Validate on blur (when user leaves field)
            field.addEventListener('blur', function() {
                validateField(fieldName, field.value.trim());
            });
            
            // Clear errors on input (when user starts typing)
            field.addEventListener('input', function() {
                clearFieldError(fieldName);
            });
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submission attempted');
        handleFormSubmission(form, fields);
    });
    
    // Add loading state management
    let isSubmitting = false;
    
    function setSubmissionState(submitting) {
        isSubmitting = submitting;
        submitButton.disabled = submitting;
        submitButton.textContent = submitting ? 'Sending Message...' : 'Send Message';
        
        if (submitting) {
            submitButton.style.opacity = '0.7';
            submitButton.style.cursor = 'not-allowed';
        } else {
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        }
    }
    
    // Expose function for form submission handling
    window.setFormSubmissionState = setSubmissionState;
}

// ===== INDIVIDUAL FIELD VALIDATION =====
/**
 * Validate individual form field
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(fieldName, value) {
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                isValid = false;
                errorMessage = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email address is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (!value) {
                isValid = false;
                errorMessage = 'Phone number is required';
            } else if (!isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number (10-11 digits)';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'Message must be less than 1000 characters';
            }
            break;
    }
    
    // Display error or clear it
    if (!isValid) {
        showFieldError(fieldName, errorMessage);
    } else {
        clearFieldError(fieldName);
    }
    
    console.log(`Field validation - ${fieldName}: ${isValid ? 'valid' : 'invalid'}`);
    return isValid;
}

// ===== ERROR DISPLAY FUNCTIONS =====
/**
 * Show error message for a specific field
 * @param {string} fieldName - Name of the field
 * @param {string} message - Error message to display
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        // Add error styling to field
        field.classList.add('error');
        
        // Show error message
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add red border animation
        field.style.borderColor = 'var(--error-color)';
        field.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
    }
}

/**
 * Clear error message for a specific field
 * @param {string} fieldName - Name of the field
 */
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        // Remove error styling from field
        field.classList.remove('error');
        
        // Hide error message
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        
        // Reset border styling
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
    const errorFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    
    errorFields.forEach(fieldName => {
        clearFieldError(fieldName);
    });
    
    console.log('All form errors cleared');
}

// ===== FORM SUBMISSION HANDLING =====
/**
 * Handle complete form submission with validation
 * @param {HTMLFormElement} form - The form element
 * @param {Object} fields - Object containing all form fields
 */
function handleFormSubmission(form, fields) {
    console.log('Processing form submission...');
    
    // Clear any existing errors
    clearAllErrors();
    
    // Validate all required fields
    let isFormValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    
    // Collect form data
    const formData = {};
    
    requiredFields.forEach(fieldName => {
        const field = fields[fieldName];
        const value = field.value.trim();
        
        formData[fieldName] = value;
        
        if (!validateField(fieldName, value)) {
            isFormValid = false;
        }
    });
    
    // Collect optional fields
    formData.interest = fields.interest.value;
    formData.budget = fields.budget.value;
    formData.newsletter = fields.newsletter.checked;
    
    // Log form data for debugging
    console.log('Form data collected:', formData);
    
    if (!isFormValid) {
        console.log('Form validation failed');
        showToast('Please correct the errors above', 'error');
        
        // Focus on first error field
        const firstErrorField = form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        
        return;
    }
    
    // Form is valid, proceed with submission
    console.log('Form validation passed, submitting...');
    submitForm(formData);
}

/**
 * Submit the validated form data
 * @param {Object} formData - Validated form data
 */
function submitForm(formData) {
    // Set loading state
    if (window.setFormSubmissionState) {
        window.setFormSubmissionState(true);
    }
    
    // Simulate form submission delay (in real application, this would be an API call)
    setTimeout(() => {
        try {
            // Log successful submission
            console.log('Form submitted successfully:', formData);
            
            // Create submission summary
            const submissionSummary = {
                timestamp: new Date().toISOString(),
                customerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                interest: formData.interest || 'Not specified',
                budget: formData.budget || 'Not specified',
                message: formData.message,
                newsletter: formData.newsletter,
                submissionId: generateSubmissionId()
            };
            
            console.log('Submission Summary:', submissionSummary);
            
            // Store submission in localStorage for demo purposes
            storeSubmission(submissionSummary);
            
            // Show success message
            showSuccessMessage(submissionSummary);
            
            // Reset form
            document.getElementById('enquiry-form').reset();
            
            // Show success toast
            showToast('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
            
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Clear loading state
            if (window.setFormSubmissionState) {
                window.setFormSubmissionState(false);
            }
        }
    }, 2000); // 2 second delay to simulate network request
}

// ===== SUCCESS MESSAGE HANDLING =====
/**
 * Display success message after form submission
 * @param {Object} submissionData - Data about the submission
 */
function showSuccessMessage(submissionData) {
    const form = document.getElementById('enquiry-form');
    const successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Update success message content with personalized info
        const successContent = successMessage.querySelector('p');
        if (successContent) {
            successContent.innerHTML = `
                Thank you <strong>${submissionData.customerName}</strong> for your enquiry! 
                We'll get back to you at <strong>${submissionData.email}</strong> within 24 hours 
                with personalized equipment recommendations.
                <br><br>
                <small>Reference ID: ${submissionData.submissionId}</small>
            `;
        }
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add option to submit another enquiry
        setTimeout(() => {
            const newEnquiryButton = document.createElement('button');
            newEnquiryButton.textContent = 'Submit Another Enquiry';
            newEnquiryButton.className = 'btn btn-secondary';
            newEnquiryButton.style.marginTop = 'var(--spacing-md)';
            
            newEnquiryButton.addEventListener('click', function() {
                form.style.display = 'block';
                successMessage.style.display = 'none';
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            if (!successMessage.querySelector('.btn-secondary')) {
                successMessage.appendChild(newEnquiryButton);
            }
        }, 3000);
    }
}

// ===== UTILITY FUNCTIONS =====
/**
 * Generate unique submission ID
 * @returns {string} - Unique submission ID
 */
function generateSubmissionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `FGP-${timestamp}-${random}`;
}

/**
 * Store submission in localStorage for demo purposes
 * @param {Object} submission - Submission data to store
 */
function storeSubmission(submission) {
    try {
        const existingSubmissions = JSON.parse(localStorage.getItem('fitgear-submissions') || '[]');
        existingSubmissions.push(submission);
        
        // Keep only last 10 submissions
        if (existingSubmissions.length > 10) {
            existingSubmissions.splice(0, existingSubmissions.length - 10);
        }
        
        localStorage.setItem('fitgear-submissions', JSON.stringify(existingSubmissions));
        console.log('Submission stored locally');
    } catch (error) {
        console.error('Error storing submission:', error);
    }
}

/**
 * Enhanced email validation
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
    // More comprehensive email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Additional checks
    if (email.length > 254) return false; // Email too long
    if (email.startsWith('.') || email.endsWith('.')) return false; // Can't start or end with period
    if (email.includes('..')) return false; // Can't have consecutive periods
    
    return emailRegex.test(email);
}

/**
 * Enhanced phone validation
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone number
 */
function isValidPhone(phone) {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check various valid formats
    if (cleanPhone.length === 10) {
        // 10 digit US number
        return true;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
        // 11 digit number starting with 1 (US country code)
        return true;
    }
    
    return false;
}

/**
 * Show toast notification (uses function from main.js if available)
 * @param {string} message - Message to show
 * @param {string} type - Type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    // Use main.js function if available, otherwise create simple alert
    if (typeof window.FitGearPro !== 'undefined' && window.FitGearPro.showToast) {
        window.FitGearPro.showToast(message, type);
    } else {
        // Fallback to console log and alert for debugging
        console.log(`Toast ${type}: ${message}`);
        if (type === 'error') {
            alert(`Error: ${message}`);
        }
    }
}

// ===== FORM ANALYTICS (FOR DEBUGGING) =====
/**
 * Track form interaction analytics
 */
function trackFormAnalytics() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;
    
    let formStartTime = null;
    let fieldInteractions = {};
    
    // Track when user starts interacting with form
    form.addEventListener('focusin', function(event) {
        if (!formStartTime) {
            formStartTime = Date.now();
            console.log('User started interacting with form');
        }
        
        const fieldName = event.target.id || event.target.name;
        if (fieldName && !fieldInteractions[fieldName]) {
            fieldInteractions[fieldName] = {
                firstInteraction: Date.now(),
                interactionCount: 1
            };
        } else if (fieldName) {
            fieldInteractions[fieldName].interactionCount++;
        }
    });
    
    // Log analytics on form submission
    form.addEventListener('submit', function() {
        const totalTime = Date.now() - formStartTime;
        console.log('Form Analytics:', {
            totalTimeSpent: `${(totalTime / 1000).toFixed(2)} seconds`,
            fieldInteractions: fieldInteractions,
            timestamp: new Date().toISOString()
        });
    });
}

// Initialize analytics tracking
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(trackFormAnalytics, 1000);
});

// ===== EXPORT FOR TESTING =====
window.FormValidation = {
    validateField,
    isValidEmail,
    isValidPhone,
    clearAllErrors,
    generateSubmissionId
};

console.log('Form validation script loaded successfully');
