function toggleNav() {
    const drawer = document.getElementById('mobDrawer');
    const overlay = document.getElementById('navOverlay');
    const navMob = document.getElementById('navMob');
    const isOpen = drawer.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    if (navMob) navMob.textContent = isOpen ? '✕' : '☰';
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
    // Close drawer on link click
    document.querySelectorAll('.mob-drawer-links a, .mob-drawer-cta a').forEach(l => {
        l.addEventListener('click', () => {
            document.getElementById('mobDrawer').classList.remove('open');
            document.getElementById('navOverlay').classList.remove('open');
            const navMob = document.getElementById('navMob');
            if (navMob) navMob.textContent = '☰';
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
