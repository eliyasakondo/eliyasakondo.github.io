// Modern Portfolio SPA Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const dots = document.querySelectorAll('.dot');

  // Current page tracking
  let currentPage = 'home';

  // Function to show specific page
  function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update navigation active states
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Set active nav link
    const activeNavLink = document.querySelector(`[href="#${pageId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }

    // Set active dot
    const activeDot = document.querySelector(`[data-page="${pageId}"]`);
    if (activeDot) {
      activeDot.classList.add('active');
    }

    currentPage = pageId;
  }

  // Navigation click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('href').substring(1);
      showPage(pageId);
    });
  });

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const pageId = dot.getAttribute('data-page');
      showPage(pageId);
    });
  });

  // Keyboard navigation (arrow keys)
  document.addEventListener('keydown', (e) => {
    const pageOrder = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const currentIndex = pageOrder.indexOf(currentPage);

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % pageOrder.length;
      showPage(pageOrder[nextIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? pageOrder.length - 1 : currentIndex - 1;
      showPage(pageOrder[prevIndex]);
    }
  });

  // Scroll wheel navigation
  let isScrolling = false;
  document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    setTimeout(() => isScrolling = false, 1000);

    const pageOrder = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const currentIndex = pageOrder.indexOf(currentPage);

    if (e.deltaY > 0) {
      // Scroll down
      const nextIndex = (currentIndex + 1) % pageOrder.length;
      showPage(pageOrder[nextIndex]);
    } else {
      // Scroll up
      const prevIndex = currentIndex === 0 ? pageOrder.length - 1 : currentIndex - 1;
      showPage(pageOrder[prevIndex]);
    }
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });

  // Animated counter for stats
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + '+';
      }, 30);
    });
  };

  // Trigger stats animation when home page is active
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && currentPage === 'home') {
        animateStats();
      }
    });
  });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Smooth scrolling for buttons
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('href').substring(1);
      showPage(pageId);
    });
  });

  // Add typing effect to tagline on home page
  const addTypingEffect = () => {
    const tagline = document.querySelector('.tagline');
    if (tagline && currentPage === 'home') {
      const text = tagline.textContent;
      tagline.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          tagline.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(typeWriter, 1000);
    }
  };

  // Initialize typing effect
  addTypingEffect();

  // Form submission handler
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  // Initialize with home page
  showPage('home');
  
  // Add some initial animations
  setTimeout(animateStats, 1500);
});