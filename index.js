function toggleNav() { 
    const navLinks = document.getElementById('navLinks');
    const navMob = document.querySelector('.nav-mob');
    navLinks.classList.toggle('open');
    navMob.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
}

function scrollToDemo() { 
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('demoForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(l => {
        l.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('open');
        });
    });

    // Reveal animations on scroll
    const obs = new IntersectionObserver((entries) => { 
        entries.forEach(e => { 
            if (e.isIntersecting) { 
                e.target.classList.add('visible'); 
                obs.unobserve(e.target);
            } 
        }); 
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
