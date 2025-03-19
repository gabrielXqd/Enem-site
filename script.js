// Smooth scrolling para os links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress bar
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// Animação dos números nas estatísticas
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observador para elementos animados
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
            }
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observar todos os elementos com classe animate e stat-number
document.querySelectorAll('.animate, .stat-number').forEach(element => {
    observer.observe(element);
});

// Efeito hover nos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Toggle do botão "Saiba Mais"
const saibaMaisBtn = document.getElementById('saibaMaisBtn');
const saibaMaisContent = document.getElementById('saibaMaisContent');

if (saibaMaisBtn && saibaMaisContent) {
    saibaMaisBtn.addEventListener('click', () => {
        const isHidden = saibaMaisContent.style.display === 'none';
        saibaMaisContent.style.display = isHidden ? 'block' : 'none';
        saibaMaisBtn.innerHTML = isHidden ? 
            '<i class="fas fa-minus-circle"></i> Mostrar Menos' : 
            '<i class="fas fa-plus-circle"></i> Saiba Mais';
        
        if (isHidden) {
            saibaMaisContent.style.opacity = '0';
            setTimeout(() => {
                saibaMaisContent.style.opacity = '1';
            }, 10);
        }
    });
}

// Adicionar classe ativa ao link da navegação quando a seção estiver visível
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--neon)' : 'var(--text-primary)';
            });
        }
    });
});
