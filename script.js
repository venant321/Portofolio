document.addEventListener('DOMContentLoaded', function() {

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.innerHTML = newTheme === 'light' 
      ? '<i class="fas fa-moon"></i>' 
      : '<i class="fas fa-sun"></i>';
  });


  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.innerHTML = savedTheme === 'light' 
    ? '<i class="fas fa-moon"></i>' 
    : '<i class="fas fa-sun"></i>';


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {

        const targetPosition = targetElement.offsetTop - 80; 
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; 
        let startTime = null;
        

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        

        function ease(t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t*t + b;
          t -= 2;
          return c/2*(t*t*t + 2) + b;
        }
        
        requestAnimationFrame(animation);
      }
    });
  });


  function animateSkills() {
    document.querySelectorAll('.skill').forEach(skill => {
      const skillPosition = skill.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (skillPosition < screenPosition) {
        const level = skill.getAttribute('data-level');
        skill.querySelector('.skill-progress').style.width = level + '%';
      }
    });
  }

  window.addEventListener('scroll', animateSkills);
  animateSkills();


  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    

    console.log('Form submitted:', formData);
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    
    const statusElement = document.getElementById('form-status');
    statusElement.textContent = "Thank you! Your message has been received.";
    statusElement.style.color = "var(--primary)";
    

    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'contact_message.json');
    linkElement.textContent = " Download your message";
    linkElement.style.marginLeft = "10px";
    linkElement.style.color = "var(--primary)";
    
    statusElement.appendChild(linkElement);
    

    contactForm.reset();
  });

  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  }


  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});