// Simple fade-in animation for sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  sections.forEach((section, i) => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(40px)';
    setTimeout(() => {
      section.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.6,1), transform 0.8s cubic-bezier(.4,2,.6,1)';
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });
});