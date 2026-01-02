
// Sticky Header Logic
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    header.style.left = -window.scrollX + 'px';
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parallax Effect (Existing)
document.addEventListener('mousemove', (e) => {
    const tomato = document.querySelector('.tomato');
    const scribble = document.querySelector('.scribble');

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (tomato) {
        tomato.style.transform = `translate(-${x * 30}px, -${y * 30}px) rotate(${5 + (x * 10)}deg)`;
    }
    if (scribble) {
        scribble.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
});

// Price Accordion
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
        const category = header.parentElement;
        category.classList.toggle('active');
        const list = category.querySelector('.services-list');
        if (category.classList.contains('active')) {
            list.classList.add('active');
        } else {
            list.classList.remove('active');
        }
    });
});

// Mobile Interaction Logic
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

const mobileClose = document.querySelector('.mobile-menu-close');
if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// FAB Interaction
const fabMain = document.querySelector('.fab-main');
const fabOptions = document.querySelector('.fab-options');

if (fabMain) {
    fabMain.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing immediately
        fabOptions.classList.toggle('active');
    });
}

// Close FAB and Menu when clicking outside
document.addEventListener('click', (e) => {
    if (fabOptions && fabOptions.classList.contains('active')) {
        if (!fabMain.contains(e.target) && !fabOptions.contains(e.target)) {
            fabOptions.classList.remove('active');
        }
    }
});
