// Login Form Validation and Handling

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const submitButton = loginForm ? loginForm.querySelector('.login-button') : null;

// Form submission handler
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Validate username/email
        const usernameValue = usernameInput.value.trim();
        if (usernameValue.length === 0) {
            showError(usernameInput, usernameError, 'Please enter your email or username');
            isValid = false;
        }
        
        // Validate password (don't trim - preserve exact input)
        const passwordValue = passwordInput.value;
        if (passwordValue.length === 0) {
            showError(passwordInput, passwordError, 'Please enter your password');
            isValid = false;
        }
        
        // If form is valid, attempt login
        if (isValid) {
            handleLogin(usernameValue, passwordValue);
        }
    });
}

// Clear all error messages
function clearErrors() {
    usernameError.textContent = '';
    passwordError.textContent = '';
    usernameInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
}

// Show error message for a specific field
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.style.borderColor = '#EF4444';
}

// Handle login (placeholder - would connect to backend in production)
function handleLogin(username, password) {
    if (!submitButton) return;
    
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Signing in...';
    submitButton.disabled = true;
    
    // Simulate API call (replace with actual authentication in production)
    setTimeout(() => {
        // In a real application, you would:
        // 1. Send credentials to your backend API
        // 2. Receive authentication token
        // 3. Store token securely
        // 4. Redirect to dashboard or main application
        
        // For demonstration, show success message
        submitButton.textContent = '✓ Success! Redirecting...';
        submitButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        // Redirect after short delay
        setTimeout(() => {
            // In production, redirect to authenticated page
            // window.location.href = 'dashboard.html';
            
            // For demo, redirect to main page
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// SSO Button Handlers
const ssoButtons = document.querySelectorAll('.sso-button');

ssoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.getAttribute('data-provider');
        const originalText = this.textContent.trim();
        
        // Show loading state
        this.textContent = 'Redirecting...';
        this.disabled = true;
        
        // In production, these would redirect to respective SSO providers
        setTimeout(() => {
            if (provider === 'google') {
                // window.location.href = '/auth/google';
                console.log('Google SSO clicked');
            } else if (provider === 'clever') {
                // window.location.href = '/auth/clever';
                console.log('Clever SSO clicked');
            } else if (provider === 'classlink') {
                // window.location.href = '/auth/classlink';
                console.log('ClassLink SSO clicked');
            }
            
            // Reset button (remove this in production)
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Clear error on input focus
if (usernameInput) {
    usernameInput.addEventListener('focus', () => {
        usernameError.textContent = '';
        usernameInput.style.borderColor = '';
    });
}

if (passwordInput) {
    passwordInput.addEventListener('focus', () => {
        passwordError.textContent = '';
        passwordInput.style.borderColor = '';
    });
}

// Handle "Forgot password" link
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        // In production, navigate to password reset page
        // window.location.href = 'forgot-password.html';
        alert('Password reset functionality would be implemented here.');
    });
}

// Handle "Create an account" link
const createAccountLink = document.querySelector('.create-account');
if (createAccountLink) {
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        // In production, navigate to registration page
        // window.location.href = 'register.html';
        alert('Account creation would redirect to a registration page.');
    });
}

console.log('READEE Login Page Loaded ✓');
