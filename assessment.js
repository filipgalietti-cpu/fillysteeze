// Assessment Logic for READEE

let currentUserType = '';
let currentQuestionIndex = {
    adult: 1,
    child: 1
};

const totalQuestions = {
    adult: 6,
    child: 4
};

// Select user type (adult or child)
function selectUserType(type) {
    currentUserType = type;
    
    // Hide user type selection
    document.getElementById('step-user-type').classList.remove('active');
    
    // Show appropriate question set
    if (type === 'adult') {
        document.getElementById('step-adult-questions').classList.add('active');
        updateProgress('adult');
    } else {
        document.getElementById('step-child-questions').classList.add('active');
        updateProgress('child');
    }
}

// Navigate to next question
function nextQuestion(type) {
    const form = document.getElementById(`${type}-form`);
    const currentSlide = form.querySelector(`.question-slide[data-question="${currentQuestionIndex[type]}"]`);
    const input = currentSlide.querySelector('input[type="radio"]:checked');
    
    // Validate that an option is selected
    if (!input) {
        alert('Please select an option before continuing.');
        return;
    }
    
    // If this is the last question, calculate results
    if (currentQuestionIndex[type] === totalQuestions[type]) {
        calculateRecommendation(type);
        return;
    }
    
    // Hide current question
    currentSlide.classList.remove('active');
    
    // Show next question
    currentQuestionIndex[type]++;
    const nextSlide = form.querySelector(`.question-slide[data-question="${currentQuestionIndex[type]}"]`);
    nextSlide.classList.add('active');
    
    // Update navigation buttons
    updateNavigationButtons(type);
    updateProgress(type);
}

// Navigate to previous question
function prevQuestion(type) {
    const form = document.getElementById(`${type}-form`);
    const currentSlide = form.querySelector(`.question-slide[data-question="${currentQuestionIndex[type]}"]`);
    
    // Hide current question
    currentSlide.classList.remove('active');
    
    // Show previous question
    currentQuestionIndex[type]--;
    const prevSlide = form.querySelector(`.question-slide[data-question="${currentQuestionIndex[type]}"]`);
    prevSlide.classList.add('active');
    
    // Update navigation buttons
    updateNavigationButtons(type);
    updateProgress(type);
}

// Update navigation button visibility
function updateNavigationButtons(type) {
    const form = document.getElementById(`${type}-form`);
    const backBtn = form.querySelector('.back-btn');
    const nextBtn = form.querySelector('.next-btn');
    
    // Show/hide back button
    if (currentQuestionIndex[type] === 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'inline-block';
    }
    
    // Update next button text for last question
    if (currentQuestionIndex[type] === totalQuestions[type]) {
        nextBtn.textContent = 'See Results →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Update progress bar
function updateProgress(type) {
    const progressFill = document.getElementById(`${type}-progress`);
    const currentSpan = document.getElementById(`${type}-current`);
    
    const percentage = (currentQuestionIndex[type] / totalQuestions[type]) * 100;
    progressFill.style.width = percentage + '%';
    currentSpan.textContent = currentQuestionIndex[type];
}

// Calculate recommendation based on answers
function calculateRecommendation(type) {
    let recommendedPlan = 'recommended'; // Default to recommended plan
    let score = {
        lite: 0,
        recommended: 0,
        premium: 0
    };
    
    if (type === 'adult') {
        const formData = new FormData(document.getElementById('adult-form'));
        
        // Analyze role
        const role = formData.get('role');
        if (role === 'administrator') {
            score.premium += 2;
        }
        
        // Analyze number of students
        const students = formData.get('students');
        if (students === '1-3') {
            score.lite += 2;
        } else if (students === '4-10') {
            score.recommended += 2;
        } else {
            score.premium += 2;
        }
        
        // Analyze goal
        const goal = formData.get('goal');
        if (goal === 'basics') {
            score.lite += 1;
        } else if (goal === 'advanced' || goal === 'support') {
            score.premium += 2;
        } else {
            score.recommended += 1;
        }
        
        // Analyze support level
        const support = formData.get('support');
        if (support === 'self-paced') {
            score.lite += 2;
        } else if (support === 'premium') {
            score.premium += 3;
        } else {
            score.recommended += 2;
        }
        
        // Analyze accommodations
        const accommodations = formData.get('accommodations');
        if (accommodations === 'special-needs' || accommodations === 'both') {
            score.premium += 2;
        } else if (accommodations === 'ell') {
            score.recommended += 1;
        }
        
        // Analyze budget
        const budget = formData.get('budget');
        if (budget === 'cost-effective') {
            score.lite += 2;
        } else if (budget === 'premium') {
            score.premium += 3;
        } else {
            score.recommended += 2;
        }
        
    } else if (type === 'child') {
        const formData = new FormData(document.getElementById('child-form'));
        
        // Analyze grade
        const grade = formData.get('grade');
        if (grade === 'pre-k' || grade === 'k') {
            score.lite += 1;
        }
        
        // Analyze feeling about reading
        const feeling = formData.get('feeling');
        if (feeling === 'love') {
            score.recommended += 2;
        } else if (feeling === 'hard') {
            score.premium += 2;
        } else {
            score.recommended += 1;
        }
        
        // Analyze what makes reading fun
        const fun = formData.get('fun');
        if (fun === 'games') {
            score.recommended += 1;
        } else if (fun === 'rewards') {
            score.premium += 1;
        }
        
        // Analyze frequency
        const frequency = formData.get('frequency');
        if (frequency === 'daily') {
            score.recommended += 2;
        } else if (frequency === 'flexible') {
            score.lite += 1;
        }
    }
    
    // Determine recommended plan based on highest score
    let maxScore = Math.max(score.lite, score.recommended, score.premium);
    
    if (score.premium === maxScore) {
        recommendedPlan = 'premium';
    } else if (score.lite === maxScore) {
        recommendedPlan = 'lite';
    } else {
        recommendedPlan = 'recommended';
    }
    
    // Store recommendation in sessionStorage and redirect
    sessionStorage.setItem('recommendedPlan', recommendedPlan);
    sessionStorage.setItem('userType', type);
    window.location.href = 'results.html';
}

// Auto-advance on option selection
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all radio options
    const allOptions = document.querySelectorAll('.option-card input[type="radio"]');
    
    allOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Add visual feedback
            const card = this.closest('.option-card');
            const allCards = card.parentElement.querySelectorAll('.option-card');
            
            allCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });
});
