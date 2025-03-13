/**
 * Portfolio - Angel Colberg
 * Using modern web standards
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Custom cursor implementation
  const cursorOuter = document.querySelector('.cursor-outer');
  const cursorInner = document.querySelector('.cursor-inner');
  
  if (cursorOuter && cursorInner) {
    const moveCursor = (e) => {
      cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .article-card, .social-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
      });
    });
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
    });
  }
  
  // Track active section for navigation
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  // Create an Intersection Observer for section tracking
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navLinks.forEach(link => {
          const linkHref = link.getAttribute('href');
          if (linkHref && linkHref.includes('#')) {
            link.classList.toggle('active', linkHref === `#${activeId}` || linkHref.endsWith(`#${activeId}`));
          }
        });
      }
    });
  }, { 
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0.1
  });
  
  // Observe all sections
  sections.forEach(section => {
    navObserver.observe(section);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      const targetId = href.split('#')[1];
      const target = document.getElementById(targetId);
      
      if (target) {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
        
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Project modal functionality using dialog element
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.querySelector('.modal-content');
  const modalBody = document.getElementById('modal-content');
  const closeModal = document.querySelector('.close-modal');
  
  if (projectCards.length && projectModal && modalContent && modalBody) {
    // Set up each project card to open the modal
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        
        // Load project content from template if available
        const templateId = `project-${projectId}`;
        const template = document.getElementById(templateId);
        
        if (template) {
          // Clone the template content
          const content = template.content.cloneNode(true);
          modalBody.innerHTML = '';
          modalBody.appendChild(content);
        } else {
          // Fallback to dynamic content creation
          loadFallbackProjectContent(projectId);
        }
        
        // Open the dialog with animation classes
        projectModal.showModal();
        setTimeout(() => {
          projectModal.classList.add('active');
          modalContent.classList.add('active');
        }, 50);
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close modal when clicking the close button
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        closeProjectModal();
      });
    }
    
    // Close modal when clicking on backdrop (outside the dialog content)
    projectModal.addEventListener('click', (e) => {
      const dialogDimensions = projectModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        closeProjectModal();
      }
    });
    
    // Close modal with escape key (handled natively by dialog)
    projectModal.addEventListener('close', () => {
      modalContent.classList.remove('active');
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Function to close project modal with animation
  function closeProjectModal() {
    modalContent.classList.remove('active');
    projectModal.classList.remove('active');
    
    setTimeout(() => {
      document.body.style.overflow = '';
      projectModal.close();
    }, 300);
  }
  
  // Function to load fallback project content when template is not available
  function loadFallbackProjectContent(projectId) {
    // Project details for visible projects in the UI
    const projectDetails = {
      'servicenow': {
        title: 'ServiceNow',
        subtitle: 'Artificial Intelligence & Design Systems',
        description: 'Led AI research and design teams to build new AI-powered solutions. Created design patterns, research methodologies, and generative AI experiences. Working with the AI product team, I created a framework for designing conversational experiences and helped define the future direction for AI-powered experiences across ServiceNow.',
        role: 'UX Design Director | AI/ML Research',
        methods: 'User Research | Wireframes | Prototypes | Design Systems',
        tools: 'Figma | Miro | Optimal Workshop | Sketch',
        images: [
          'images/logo/servicenow-full-2.png',
          'images/projects/servicenow/sb/skillbuilder-landing.png',
          'images/projects/servicenow/sb/prompt-design-full.png',
          'images/projects/servicenow/sb/prompt run time.png'
        ]
      },
      'splunk': {
        title: 'Splunk',
        subtitle: 'Observability Platform',
        description: 'Directed Observability product design across Splunk. Managed frontend teams, led research efforts, and created experiences for monitoring, APM, and RUM. I helped unify the design system and created a more cohesive experience across different Splunk products, significantly improving user satisfaction and reducing learning curves.',
        role: 'Principal Designer | Design Director',
        methods: 'User Research | Wireframes | Prototypes | Visual Design',
        tools: 'Sketch | Figma | React | HTML/CSS',
        images: ['images/projects/splunk/rum-0.png', 'images/projects/splunk/rum-1.png']
      },
      'gigamon': {
        title: 'Gigamon',
        subtitle: 'Network Visibility Platform',
        description: 'Designed network visibility and monitoring tools. Developed interactive dashboards for network analysis and security. I created a new visualization system for complex network topologies that helped administrators quickly identify problems and threats, reducing mean time to resolution by 40%.',
        role: 'Design Lead | UX Designer',
        methods: 'User Research | Wireframes | Prototypes | Visual Design',
        tools: 'Sketch | Figma | HTML/CSS | JavaScript',
        images: [
          'images/projects/gigamon/giga-topology-v0-hero-3.png',
          'images/projects/gigamon/3-giga-screens.png',
          'images/projects/gigamon/2-Screens-gigamon-1.png',
          'images/projects/gigamon/2-Screens-gigamon-3.png'
        ]
      },
      'unity': {
        title: 'Unity',
        subtitle: 'Design Practice & Pattern Library',
        description: 'Built a design foundation and tactical processes for research and design while also building out teams. Created a pattern library for Ads and Analytics teams. I established design processes that brought engineers into the process earlier, leading to better alignment and more feasible solutions from the start.',
        role: 'Director | UX Research and Design | Front-End Development',
        methods: 'User Research | Wireframes | Flows | Mockups | Prototypes',
        tools: 'Sketch | Optimal Workshop | Angular | HTML5 | JS | CSS3',
        images: ['images/projects/unity/unity-full.png', 'images/projects/unity/1.png']
      },
      'mozilla': {
        title: 'The Coral Project',
        subtitle: 'Community Building in Journalism',
        description: 'Building better communities in journalism through open-source tools that help publishers build and maintain relationships with their audiences. I designed moderation tools that reduced the workload for community managers while maintaining high quality standards for discourse.',
        role: 'Lead Designer',
        methods: 'User Research | Information Architecture | Visual Design',
        tools: 'Sketch | React | HTML/CSS',
        images: ['images/projects/mozilla/coral-full.png', 'images/projects/mozilla/1.png']
      },
      'vevo': {
        title: 'Vevo',
        subtitle: 'Content Discovery & Retention',
        description: 'IA refactor around retention and recommendations to improve user engagement and content discovery. By restructuring the content hierarchy and improving the recommendation algorithm, we increased average session duration by 22% and improved content discovery metrics significantly.',
        role: 'Information Architect | UX Designer',
        methods: 'Information Architecture | User Research | A/B Testing',
        tools: 'Sketch | HTML/CSS | JavaScript',
        images: [
          'images/projects/vevo/vevo-full-2.png',
          'images/projects/vevo/6.png',
          'images/projects/vevo/5.png',
          'images/projects/vevo/10.png',
          'images/projects/vevo/2.jpg'
        ]
      },
      'fi': {
        title: 'Fantasy Interactive',
        subtitle: 'Google Partner Services',
        description: 'Early Material Design implementation for Google Partner Services, showcasing innovative design patterns and interactions. This project was one of the first commercial implementations of Material Design principles, requiring close collaboration with Google\'s design team to ensure adherence to new standards while pushing boundaries.',
        role: 'Senior Designer',
        methods: 'Interaction Design | Visual Design | Prototyping',
        tools: 'Photoshop | Illustrator | HTML/CSS | JavaScript',
        images: ['images/projects/fi/gps-full-2.png', 'images/projects/fi/1.png']
      },
      'msw': {
        title: 'MSW Redesign',
        subtitle: 'Internal Platform Redesign',
        description: 'Redesign of Microsoft\'s internal web platform to improve usability, accessibility, and visual consistency. This extensive redesign included creating a new design system that aligned with Microsoft\'s evolving brand while significantly improving workflows for thousands of employees.',
        role: 'Design Director',
        methods: 'Information Architecture | User Research | Visual Design',
        tools: 'Sketch | Photoshop | HTML/CSS',
        images: ['images/projects/msw/msw-full-2.png', 'images/projects/msw/1.png']
      }
    };
    
    if (projectDetails[projectId]) {
      const details = projectDetails[projectId];
      
      // Create image gallery HTML
      let imagesHTML = '';
      details.images.forEach(image => {
        imagesHTML += `<div class="project-image-full"><img src="${image}" alt="${details.title}"></div>`;
      });
      
      // Create the project content
      const projectDetailsElement = document.createElement('div');
      projectDetailsElement.className = 'project-details';
      projectDetailsElement.innerHTML = `
        <div class="project-header">
          <h2>${details.title}</h2>
          <span class="subtitle">${details.subtitle}</span>
        </div>
        <div class="project-gallery">
          ${imagesHTML}
        </div>
        <div class="project-content">
          <div class="project-description">
            <p>${details.description}</p>
          </div>
          <ul class="project-meta">
            <li>
              <strong>Role</strong>
              <span>${details.role}</span>
            </li>
            <li>
              <strong>Methods</strong>
              <span>${details.methods}</span>
            </li>
            <li>
              <strong>Tools</strong>
              <span>${details.tools}</span>
            </li>
          </ul>
        </div>
      `;
      
      modalBody.innerHTML = '';
      modalBody.appendChild(projectDetailsElement);
    } else {
      modalBody.innerHTML = '<div class="error-message"><h3>Project Not Found</h3><p>Sorry, this project\'s details are not available.</p></div>';
    }
  }
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Create Intersection Observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Delay the animation slightly for a more natural feel
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
        
        // Once the animation is applied, we can stop observing this element
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -80px 0px', // Elements will animate when they're 80px into the viewport
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  });
  
  // Special observer for hero section elements with staggered animations
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Use a short timeout to ensure CSS transitions work properly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 50);
        
        // Once the animation is applied, we can stop observing this element
        heroObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0 // Trigger as soon as any part of the element is visible
  });
  
  // Observe all elements with animate class
  document.querySelectorAll('.animate:not(.hero .animate)').forEach(element => {
    animationObserver.observe(element);
  });
  
  // Observe hero elements separately for staggered animations
  document.querySelectorAll('.hero .animate').forEach(element => {
    heroObserver.observe(element);
  });
  
  // CSS update for dialog element - add styles programmatically if needed
  // This adds a small enhancement to ensure dialog backdrop works properly in all browsers
  if (!CSS.supports('selector(:has(dialog))')) {
    const style = document.createElement('style');
    style.textContent = `
      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
      }
    `;
    document.head.appendChild(style);
  }
});