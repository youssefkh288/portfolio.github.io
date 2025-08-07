// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check saved theme preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  icon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');

  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('show');
});

// Close menu when clicking links
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('show');
  });
});

// Copy to Clipboard Function
function copyToClipboard(text, type) {
  const card = event.currentTarget;
  const cleanText = type === 'Phone'
    ? card.dataset.copyValue || text.replace(/[^\d+]/g, '')
    : text;

  navigator.clipboard.writeText(cleanText).then(() => {
    card.classList.add('copied');
    setTimeout(() => card.classList.remove('copied'), 2000);
  }).catch(err => {
    console.error('Copy failed:', err);
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = cleanText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    card.classList.add('copied');
    setTimeout(() => card.classList.remove('copied'), 2000);
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Project link interactions
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    setTimeout(() => {
      console.log('Project link clicked:', this.href);
    }, 150);
  });
});

// Contact Form Handling for Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Validate form
  if (!name || !email || !subject || !message) {
    showFormStatus('Please fill in all fields.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  try {
    // Submit to Formspree
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    });
    
    if (response.ok) {
      showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
  } finally {
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }
}
