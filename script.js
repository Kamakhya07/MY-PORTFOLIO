// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add fade-in class styles
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Skills list hover effect
const skillsList = document.querySelectorAll('.skills-list li');
skillsList.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.05)';
        skill.style.backgroundColor = '#3d3d3d';
    });
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
        skill.style.backgroundColor = '#2d2d2d';
    });
});

// Education cards hover effect
const educationItems = document.querySelectorAll('.education-item');
educationItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
});

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
    });
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-content h1');
const heroTagline = document.querySelector('.tagline');

const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Start typing animation when page loads
window.addEventListener('load', () => {
    const titleText = heroTitle.textContent;
    const taglineText = heroTagline.textContent;
    
    heroTitle.textContent = '';
    heroTagline.textContent = '';
    
    // Ensure hero content is visible
    heroTitle.style.opacity = '1';
    heroTagline.style.opacity = '1';
    
    setTimeout(() => {
        typeWriter(heroTitle, titleText, 50);
    }, 100);
    
    setTimeout(() => {
        typeWriter(heroTagline, taglineText, 30);
    }, 800);
});

// Scroll-based text animations (excluding hero section)
const textElements = document.querySelectorAll('section:not(.hero) h2, section:not(.hero) h3, section:not(.hero) p, section:not(.hero) li');
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
        }
    });
}, {
    threshold: 0.1
});

textElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    textObserver.observe(element);
});

// Add glow effect to section headings on scroll (excluding hero section)
const sectionHeadings = document.querySelectorAll('section:not(.hero) h2');
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.textShadow = '0 0 20px rgba(187, 134, 252, 0.5)';
        } else {
            entry.target.style.textShadow = '0 0 15px rgba(187, 134, 252, 0.3)';
        }
    });
}, {
    threshold: 0.5
});

sectionHeadings.forEach(heading => {
    headingObserver.observe(heading);
});

// Certificate modal functionality
const certModal = document.getElementById('cert-modal');
const certImage = document.getElementById('cert-image');
const closeModal = document.querySelector('.close-modal');
const certLinks = document.querySelectorAll('.cert-link');

// Certificate data
const certificateData = {
    'oracle': {
        title: 'Oracle SQL Certificate',
        issuer: 'Great Learning Academy',
        date: 'December 2024'
    },
    'python': {
        title: 'Python (Basic) Certificate',
        issuer: 'HackerRank Skill Certification',
        date: 'April 2025'
    }
};

// Open modal when clicking on certificate links
certLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const certType = link.getAttribute('data-cert');
        
        if (certificateData[certType]) {
            // Hide the image
            certImage.style.display = 'none';
            
            // Create text-based certificate
            const textCert = document.createElement('div');
            textCert.className = 'text-certificate';
            textCert.innerHTML = `
                <h2>${certificateData[certType].title}</h2>
                <p>Issued by: ${certificateData[certType].issuer}</p>
                <p>Date: ${certificateData[certType].date}</p>
                <div class="cert-badge">
                    <i class="fas fa-certificate"></i>
                </div>
                <p class="cert-message">Certificate of completion awarded to Kamakhya Kanzade</p>
            `;
            
            // Check if a text certificate already exists
            const existingCert = document.querySelector('.text-certificate');
            if (existingCert) {
                existingCert.remove();
            }
            
            // Add the text certificate to the modal
            document.querySelector('.modal-content').appendChild(textCert);
            
            // Show the modal
            certModal.classList.add('show');
            
            // Add animation timing
            setTimeout(() => {
                document.querySelector('.modal-content').style.opacity = '1';
                document.querySelector('.modal-content').style.transform = 'scale(1)';
            }, 10);
        }
    });
});

// Close modal when clicking on X
closeModal.addEventListener('click', () => {
    document.querySelector('.modal-content').style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        certModal.classList.remove('show');
        
        // Remove text certificate after modal is closed
        setTimeout(() => {
            const textCert = document.querySelector('.text-certificate');
            if (textCert) {
                textCert.remove();
            }
        }, 300);
    }, 300);
});

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === certModal) {
        document.querySelector('.modal-content').style.opacity = '0';
        document.querySelector('.modal-content').style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            certModal.classList.remove('show');
            
            // Remove text certificate after modal is closed
            setTimeout(() => {
                const textCert = document.querySelector('.text-certificate');
                if (textCert) {
                    textCert.remove();
                }
            }, 300);
        }, 300);
    }
}); 