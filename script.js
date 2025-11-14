/* ============================================
   SmileCare Dental Clinic - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // Initialize when DOM is ready
  function init() {
    // Navigation toggle
    initNavigation();
    
    // Form handlers
    initContactForm();
    initAppointmentForm();
    
    // Gallery
    initGallery();
    
    // FAQ
    initFAQ();
    
    // Statistics counter
    initStatistics();
    
    // Smooth scroll
    initSmoothScroll();
    
    // Set current year
    setCurrentYear();
    
    // Set minimum date for appointment
    setMinAppointmentDate();
  }

  // Navigation Toggle
  function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('open');
      });
      
      // Close nav when clicking outside
      document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
          mainNav.classList.remove('open');
        }
      });
    }
  }

  // Contact Form Handler
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };
        
        // Validate form
        if (validateContactForm(formData)) {
          // Simulate form submission
          showMessage('success', 'धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे।');
          contactForm.reset();
        }
      });
    }
  }

  // Validate Contact Form
  function validateContactForm(data) {
    if (!data.name || data.name.trim().length < 2) {
      showMessage('error', 'कृपया अपना पूरा नाम दर्ज करें।');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showMessage('error', 'कृपया एक वैध ईमेल पता दर्ज करें।');
      return false;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\s+/g, ''))) {
      showMessage('error', 'कृपया एक वैध 10 अंकों का फोन नंबर दर्ज करें।');
      return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
      showMessage('error', 'कृपया कम से कम 10 वर्णों का संदेश दर्ज करें।');
      return false;
    }
    
    return true;
  }

  // Appointment Form Handler
  function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
          patientName: document.getElementById('patientName').value,
          patientAge: document.getElementById('patientAge').value,
          patientEmail: document.getElementById('patientEmail').value,
          patientPhone: document.getElementById('patientPhone').value,
          appointmentDate: document.getElementById('appointmentDate').value,
          appointmentTime: document.getElementById('appointmentTime').value,
          doctor: document.getElementById('doctor').value,
          service: document.getElementById('service').value,
          previousVisit: document.querySelector('input[name="previousVisit"]:checked').value,
          message: document.getElementById('message').value,
          terms: document.getElementById('terms').checked
        };
        
        // Validate form
        if (validateAppointmentForm(formData)) {
          // Simulate form submission
          showMessage('success', 'धन्यवाद! आपका अपॉइंटमेंट सफलतापूर्वक बुक हो गया है। हम जल्द ही आपसे संपर्क करेंगे।');
          appointmentForm.reset();
          setMinAppointmentDate();
        }
      });
    }
  }

  // Validate Appointment Form
  function validateAppointmentForm(data) {
    if (!data.patientName || data.patientName.trim().length < 2) {
      showMessage('error', 'कृपया अपना पूरा नाम दर्ज करें।');
      return false;
    }
    
    if (!data.patientAge || data.patientAge < 1 || data.patientAge > 120) {
      showMessage('error', 'कृपया एक वैध उम्र दर्ज करें।');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.patientEmail || !emailRegex.test(data.patientEmail)) {
      showMessage('error', 'कृपया एक वैध ईमेल पता दर्ज करें।');
      return false;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!data.patientPhone || !phoneRegex.test(data.patientPhone.replace(/\s+/g, ''))) {
      showMessage('error', 'कृपया एक वैध 10 अंकों का फोन नंबर दर्ज करें।');
      return false;
    }
    
    if (!data.appointmentDate) {
      showMessage('error', 'कृपया अपॉइंटमेंट की तारीख चुनें।');
      return false;
    }
    
    if (!data.appointmentTime) {
      showMessage('error', 'कृपया समय चुनें।');
      return false;
    }
    
    if (!data.service) {
      showMessage('error', 'कृपया एक सेवा चुनें।');
      return false;
    }
    
    if (!data.terms) {
      showMessage('error', 'कृपया नियम और शर्तें स्वीकार करें।');
      return false;
    }
    
    return true;
  }

  // Gallery Filter and Lightbox
  function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter functionality
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Filter items
          galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Lightbox functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    const visibleImages = Array.from(galleryItems).filter(item => 
      item.style.display !== 'none'
    );
    
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const caption = this.querySelector('.gallery-overlay h4')?.textContent || '';
        
        currentImageIndex = visibleImages.indexOf(this);
        openLightbox(img.src, caption);
      });
    });
    
    function openLightbox(src, caption) {
      if (lightboxModal && lightboxImage && lightboxCaption) {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
    
    function closeLightbox() {
      if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
    
    function showNextImage() {
      if (visibleImages.length === 0) return;
      currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
      const item = visibleImages[currentImageIndex];
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay h4')?.textContent || '';
      openLightbox(img.src, caption);
    }
    
    function showPrevImage() {
      if (visibleImages.length === 0) return;
      currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
      const item = visibleImages[currentImageIndex];
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay h4')?.textContent || '';
      openLightbox(img.src, caption);
    }
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
      lightboxNext.addEventListener('click', showNextImage);
    }
    
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxModal) {
      lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'ArrowLeft') {
          showPrevImage();
        }
      }
    });
  }

  // FAQ Toggle
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all items
          faqItems.forEach(faq => faq.classList.remove('active'));
          
          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // Statistics Counter Animation
  function initStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
      };
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      statNumbers.forEach(stat => {
        observer.observe(stat);
      });
    }
  }

  // Animate Counter
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  // Smooth Scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Set Current Year
  function setCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear, .current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  // Set Minimum Date for Appointment
  function setMinAppointmentDate() {
    const appointmentDateInput = document.getElementById('appointmentDate');
    
    if (appointmentDateInput) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      
      appointmentDateInput.min = `${year}-${month}-${day}`;
    }
  }

  // Show Message (Success/Error)
  function showMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Append to body
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(function() {
      messageDiv.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(function() {
        messageDiv.remove();
      }, 300);
    }, 5000);
  }

  // Phone number formatting
  function formatPhoneNumber(input) {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        e.target.value = value;
      });
    });
  }

  // Initialize phone formatting
  formatPhoneNumber();

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

