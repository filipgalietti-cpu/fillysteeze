// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const intakeForm = document.getElementById('intakeForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError(name, 'Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate role
        const role = document.getElementById('role');
        if (role.value === '') {
            showError(role, 'Please select your role');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

if (intakeForm) {
    intakeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError(name, 'Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate role
        const role = document.getElementById('role');
        if (role.value === '') {
            showError(role, 'Please select your role');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage();
            intakeForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    input.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error').trim();
}

function showSuccessMessage() {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '✓ Message Sent! We\'ll be in touch soon.';
    submitButton.style.background = getComputedStyle(document.documentElement).getPropertyValue('--success').trim();
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.disabled = false;
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.solution-card, .step, .stat-card, .testimonial-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== CLEAR INPUT BORDER COLOR ON FOCUS =====
const formInputs = document.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });
});

// ===== CONDITIONAL NUMBER OF STUDENTS FIELD =====
const roleSelect = document.getElementById('role');
const studentsInput = document.getElementById('students');
const learningDisabilitiesGroup = document.getElementById('learning-disabilities-group');

if (roleSelect && studentsInput) {
    roleSelect.addEventListener('change', function() {
        if (this.value === 'teacher') {
            // Enable the number of students field for teachers/administrators
            studentsInput.disabled = false;
            studentsInput.required = true;
            studentsInput.parentElement.querySelector('label').textContent = 'Number of Students *';
            
            // Show learning disabilities question
            if (learningDisabilitiesGroup) {
                learningDisabilitiesGroup.style.display = 'block';
                learningDisabilitiesGroup.querySelector('label').textContent = 'Does your classroom have children with learning disabilities or special needs?';
            }
        } else if (this.value === 'parent') {
            // Disable number of students for parents
            studentsInput.disabled = true;
            studentsInput.required = false;
            studentsInput.value = '';
            studentsInput.parentElement.querySelector('label').textContent = 'Number of Students';
            
            // Show learning disabilities question for parents
            if (learningDisabilitiesGroup) {
                learningDisabilitiesGroup.style.display = 'block';
                learningDisabilitiesGroup.querySelector('label').textContent = 'Does your child have a learning disability or special needs?';
            }
        } else {
            // Disable and clear for other roles
            studentsInput.disabled = true;
            studentsInput.required = false;
            studentsInput.value = '';
            studentsInput.parentElement.querySelector('label').textContent = 'Number of Students';
            
            // Hide learning disabilities question
            if (learningDisabilitiesGroup) {
                learningDisabilitiesGroup.style.display = 'none';
            }
        }
    });
}

// ===== LOAD SCHOOL NAMES FROM CSV =====
const schoolList = document.getElementById('school-list');

if (schoolList) {
    fetch('pa_public_prek_counts_locations_by_zip.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load school data');
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            const schools = new Set();
            
            // CSV Structure: Program,county,lead_agency,partner_name,location_name,street_address,city,zip_code
            // We're extracting the location_name field (index 4)
            
            // Skip header row and extract location names (5th column, index 4)
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    // Parse CSV with basic quoted field handling
                    const columns = parseCSVLine(line);
                    if (columns.length >= 5) {
                        const schoolName = columns[4].trim();
                        // Filter out empty values and quoted remnants
                        if (schoolName && schoolName !== '""') {
                            schools.add(schoolName);
                        }
                    }
                }
            }
            
            // Sort schools alphabetically and add to datalist
            const sortedSchools = Array.from(schools).sort();
            sortedSchools.forEach(school => {
                const option = document.createElement('option');
                option.value = school;
                schoolList.appendChild(option);
            });
            
            console.log(`Loaded ${schools.size} schools from CSV`);
        })
        .catch(error => {
            console.error('Error loading school names:', error);
            // Provide fallback message to user
            const schoolInput = document.getElementById('school');
            if (schoolInput) {
                schoolInput.placeholder = 'Type your school name (autocomplete unavailable)';
            }
        });
}

// Simple CSV parser that handles quoted fields
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current);
    return result;
}

// ===== INITIALIZE =====
console.log('BrightSteps Learning Platform Loaded ✓');
