// Results Page Logic for READEE

document.addEventListener('DOMContentLoaded', function() {
    const recommendedPlan = sessionStorage.getItem('recommendedPlan') || 'recommended';
    const userType = sessionStorage.getItem('userType') || 'adult';
    
    // Highlight the recommended plan
    highlightRecommendedPlan(recommendedPlan);
    
    // Show personalized recommendation message
    showRecommendationMessage(recommendedPlan, userType);
});

function highlightRecommendedPlan(plan) {
    // Remove any existing recommendation highlights
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('recommended-plan');
    });
    
    // Add recommendation highlight to the recommended plan
    const planCard = document.getElementById(`plan-${plan}`);
    if (planCard) {
        planCard.classList.add('recommended-plan');
        
        // Scroll to the recommended plan
        setTimeout(() => {
            planCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}

function showRecommendationMessage(plan, userType) {
    const planNameElement = document.getElementById('recommended-plan-name');
    const reasonElement = document.getElementById('recommendation-reason');
    
    const planNames = {
        lite: 'READEE Lite',
        recommended: 'READEE Recommended',
        premium: 'READEE Premium'
    };
    
    const reasons = {
        lite: {
            adult: 'Perfect for families or small groups who want essential reading support with a budget-friendly approach. Get started with proven methods at an accessible price.',
            child: 'A great way to start your reading journey! This plan has everything you need to practice and improve at your own pace.'
        },
        recommended: {
            adult: 'The ideal balance of features and value. You get comprehensive tracking, adaptive lessons, and dedicated support—everything most families and teachers need to see real results.',
            child: 'This is our most popular plan! You\'ll get fun lessons, cool rewards, and tools to help you become an awesome reader!'
        },
        premium: {
            adult: 'The complete solution for maximum impact. With unlimited accounts, AI-powered personalization, and dedicated coaching, this plan is designed for schools and educators who need advanced tools and support.',
            child: 'The ultimate reading experience! Get special help tailored just for you, plus all the advanced features to help you become the best reader you can be.'
        }
    };
    
    planNameElement.textContent = planNames[plan];
    reasonElement.textContent = reasons[plan][userType];
}

function selectPlan(plan) {
    // Store selected plan
    sessionStorage.setItem('selectedPlan', plan);
    
    // In a real application, this would redirect to a checkout or contact form
    if (plan === 'premium') {
        // For premium, redirect to contact/demo request
        alert('Thank you for your interest in READEE Premium! Our sales team will contact you shortly to discuss your needs and provide a custom quote.');
        window.location.href = 'questionnaire.html';
    } else if (plan === 'trial' || plan === 'recommended') {
        // For trial or recommended plan
        alert('Welcome to READEE! Starting your 14-day free trial...');
        window.location.href = 'questionnaire.html';
    } else {
        // For lite plan
        alert('Great choice! Let\'s get you started with READEE Lite...');
        window.location.href = 'questionnaire.html';
    }
}
