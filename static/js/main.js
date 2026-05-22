document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('nav');
  
  if (burger && navMenu) {
    burger.addEventListener('click', function() {
      navMenu.classList.toggle('nav-active');
      burger.classList.toggle('toggle-burger');
      document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle-burger');
        document.body.classList.remove('no-scroll');
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Spacing untuk sticky navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('nav ul li a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      // Deteksi jika posisi scroll sudah melewati bagian atas section
      if (pageYOffset >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
  
  // Back to top button behavior
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Efek klik
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
  
  // Animasi scroll menggunakan data-animate
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const animationPoint = windowHeight - 150;
      
      if (elementPosition < animationPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Tambahkan atribut data-animate ke elemen yang perlu dianimasikan
  const animatableElements = document.querySelectorAll('.service, .portfolio, .experience-item, .education-item, .contact-item');
  
  animatableElements.forEach((el, i) => {
    el.setAttribute('data-animate', '');
    // Tambahkan transisi delay agar animasi muncul bergantian
    el.style.transitionDelay = `${(i % 3) * 0.15}s`;
  });
  
  // Inisialisasi animasi
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});