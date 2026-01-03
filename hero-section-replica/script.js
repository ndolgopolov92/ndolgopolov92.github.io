
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

const mobileAddressLink = document.querySelector('.mobile-address-link');
if (mobileAddressLink) {
    mobileAddressLink.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

// FAB Scroll Interaction (Hide/Show on footer)
const fabContainer = document.querySelector('.fab-container');
const footer = document.querySelector('footer'); // Note: Footer might not exist in provided HTML but good practice.
// If no footer, just keep it visible or hide at very bottom.

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        // fabContainer.style.bottom = '100px'; // Move up if needed
    }
});

// Dynamic Price List Integration
// Using CORS proxy to avoid browser restrictions if running locally or if blocked by Sheets
const GOOGLE_SHEET_CSV_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://docs.google.com/spreadsheets/d/e/2PACX-1vSbGIKdMEYpKPpti2e4A3eQvpfVKa4xtPj_PfBwxh_sH9p12oCkfTPUBnIr-RxGnyh63hPy98WoEC54/pub?output=csv');

async function fetchAndRenderPrices() {
    const priceContainer = document.querySelector('.price-container');
    if (!priceContainer) return;

    const loadingMsg = priceContainer.querySelector('.loading-message');

    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Network error');
        const data = await response.text();
        const categories = parseCSV(data);
        renderPrices(priceContainer, categories);
    } catch (error) {
        console.error('Error fetching prices:', error);
        if (loadingMsg) {
            loadingMsg.textContent = 'Ошибка загрузки прайса. Пожалуйста, проверьте интернет или попробуйте позже.';
            loadingMsg.style.color = 'red';
        }
    }
}

function parseCSV(csvText) {
    const lines = csvText.split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const categories = [];

    // Identify categories from headers (every 2nd column)
    for (let i = 0; i < headers.length; i += 2) {
        if (headers[i]) {
            categories.push({
                name: headers[i],
                colIndex: i,
                services: []
            });
        }
    }

    // Parse rows
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = parseCSVLine(lines[i]);

        categories.forEach(cat => {
            const serviceName = row[cat.colIndex];
            const price = row[cat.colIndex + 1];

            if (serviceName && serviceName.trim() !== '') {
                cat.services.push({
                    name: serviceName.trim(),
                    price: price ? price.trim() : ''
                });
            }
        });
    }

    return categories;
}

// Helper to handle CSV quote parsing
function parseCSVLine(text) {
    const result = [];
    let start = 0;
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '"') {
            inQuotes = !inQuotes;
        } else if (text[i] === ',' && !inQuotes) {
            let field = text.substring(start, i);
            field = field.replace(/^"|"$/g, '').replace(/""/g, '"'); // Unquote and unescape
            result.push(field);
            start = i + 1;
        }
    }
    // Last field
    let field = text.substring(start);
    field = field.replace(/^"|"$/g, '').replace(/""/g, '"');
    result.push(field);

    return result;
}

function renderPrices(container, categories) {
    container.innerHTML = ''; // Clear static content

    categories.forEach(cat => {
        if (cat.services.length === 0) return;

        const catDiv = document.createElement('div');
        catDiv.className = 'price-category';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'category-header';
        headerDiv.innerHTML = `
            <span>${cat.name}</span>
            <span class="toggle-icon">+</span>
        `;

        // Accordion toggle logic for new elements
        headerDiv.addEventListener('click', () => {
            catDiv.classList.toggle('active');
            const list = catDiv.querySelector('.services-list');
            if (catDiv.classList.contains('active')) {
                list.classList.add('active');
            } else {
                list.classList.remove('active');
            }
        });

        const listDiv = document.createElement('div');
        listDiv.className = 'services-list';

        const innerDiv = document.createElement('div');
        innerDiv.className = 'services-list-inner';

        cat.services.forEach(service => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'service-item';
            itemDiv.innerHTML = `
                <span class="service-name">${service.name}</span>
                <span class="service-price">${service.price}</span>
            `;
            innerDiv.appendChild(itemDiv);
        });

        listDiv.appendChild(innerDiv);
        catDiv.appendChild(headerDiv);
        catDiv.appendChild(listDiv);
        container.appendChild(catDiv);
    });
}

// Load prices on start
document.addEventListener('DOMContentLoaded', fetchAndRenderPrices);
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

// Portfolio Scroll Effect (Mobile)
function highlightCenterPortfolioItem() {
    if (window.innerWidth > 768) return; // Only for mobile

    const items = document.querySelectorAll('.portfolio-item');
    const viewportCenter = window.innerHeight / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }
    });

    items.forEach(item => {
        if (item === closestItem) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightCenterPortfolioItem);
window.addEventListener('resize', highlightCenterPortfolioItem); // Handle resize
// Initial call
highlightCenterPortfolioItem();
