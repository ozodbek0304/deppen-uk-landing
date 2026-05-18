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

function switchAppTab(btn, panelId) {
    document.querySelectorAll('.app-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.app-tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
}

const DEMO_API_URL = 'https://app.deepen.uz/api/book-demo/';

function setFieldError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
    const input = el.previousElementSibling;
    if (input) input.classList.toggle('input-error', !!msg);
}

function clearFieldError(inputId, errId) {
    const input = document.getElementById(inputId);
    if (input) input.addEventListener('input', () => setFieldError(errId, ''), { once: true });
}

function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function handleSubmit(e) {
    e.preventDefault();

    const firstName  = document.getElementById('fieldFirstName').value.trim();
    const lastName   = document.getElementById('fieldLastName').value.trim();
    const email      = document.getElementById('fieldEmail').value.trim();
    const studioName = document.getElementById('fieldStudioName').value.trim();
    const studioType = document.getElementById('fieldStudioType').value;
    const phone      = document.getElementById('fieldPhone').value.trim();
    const errorEl    = document.getElementById('formError');
    const btn        = document.getElementById('formSubmitBtn');

    // Clear previous errors
    ['errFirstName','errLastName','errEmail','errStudioName','errStudioType'].forEach(id => setFieldError(id, ''));
    errorEl.style.display = 'none';

    let hasError = false;
    if (!firstName) { setFieldError('errFirstName', 'First name is required'); clearFieldError('fieldFirstName','errFirstName'); hasError = true; }
    if (!lastName)  { setFieldError('errLastName',  'Last name is required');  clearFieldError('fieldLastName','errLastName');   hasError = true; }
    if (!email)     { setFieldError('errEmail', 'Email is required');           clearFieldError('fieldEmail','errEmail');         hasError = true; }
    else if (!isValidEmail(email)) { setFieldError('errEmail', 'Please enter a valid email address'); clearFieldError('fieldEmail','errEmail'); hasError = true; }
    if (!studioName) { setFieldError('errStudioName', 'Studio name is required'); clearFieldError('fieldStudioName','errStudioName'); hasError = true; }
    if (!studioType) { setFieldError('errStudioType', 'Please select a studio type'); document.getElementById('fieldStudioType').addEventListener('change', () => setFieldError('errStudioType', ''), { once: true }); hasError = true; }

    if (hasError) return;

    btn.disabled = true;
    btn.textContent = 'Sending…';

    const payload = { first_name: firstName, last_name: lastName, email, studio_name: studioName, studio_type: studioType };
    if (phone) payload.phone = phone;

    try {
        const res = await fetch(DEMO_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            let msg = 'Something went wrong. Please try again.';
            try { const data = await res.json(); msg = data.detail || data.message || msg; } catch (_) {}
            throw new Error(msg);
        }

        document.getElementById('demoForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
    } catch (err) {
        errorEl.textContent = err.message || 'Something went wrong. Please try again.';
        errorEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Book My Free Demo ↗';
    }
}

function switchTab(btn,panelId){
  document.querySelectorAll('.feat-tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.feat-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
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
