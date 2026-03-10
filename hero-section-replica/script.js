// Prevent browser from restoring scroll position and jumping around on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Sticky Header Logic
const header = document.querySelector('.site-header');

// Video Overlay Logic
const heroVideo = document.querySelector('.hero-video');
const overlayText = document.querySelector('.video-text-overlay');

if (heroVideo && overlayText) {
    heroVideo.addEventListener('timeupdate', () => {
        const time = heroVideo.currentTime;
        // Appear at 3s, disappear at 7s
        if (time >= 3 && time < 7) {
            overlayText.style.opacity = '1';
        } else {
            overlayText.style.opacity = '0';
        }
    });
}

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

// Price Accordion (Initial Static)
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
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        // fabContainer.style.bottom = '100px'; // Move up if needed
    }
});

// --- Dynamic Price List with Admin Features ---

// Initial Hardcoded Data
const INITIAL_PRICES = [
    {
        name: "Маникюр и педикюр",
        services: [
            { name: "Маникюр", price: "1000" },
            { name: "Придание формы ногтям ", price: "400" },
            { name: "Парафинотерапия рук ", price: "400" },
            { name: "Работа в 4 руки ", price: "500" },
            { name: "Маникюр + гель-лак Elpaza", price: "1900" },
            { name: "Маникюр + гель-лак CN Club", price: "2200" },
            { name: "Маникюр + гель Luxio", price: "2600" },
            { name: "Маникюр +гель", price: "2900" },
            { name: "Маникюр детский", price: "500" },
            { name: "Снятие лака (руки)", price: "150" },
            { name: "Снятие гель лака ", price: "300" },
            { name: "Снятие гель лака (без основной услуги) ", price: "500" },
            { name: "Маникюр + лак", price: "1450" },
            { name: "Педикюр - экспресс ", price: "1400" },
            { name: "Дисковый педикюр ", price: "2500" },
            { name: "Педикюр", price: "2000" },
            { name: "Педикюр + Elpaza", price: "2900" },
            { name: "Педикюр + CN Club", price: "3200" },
            { name: "Педикюр + гель Luxio", price: "3600" },
            { name: "Педикюр + лак", price: "2450" },
            { name: "Обработка сложного ногтя ", price: "300" },
            { name: "Обработка сложного участка стопы ", price: "200" }
        ]
    },
    {
        name: "Брови и ресницы",
        services: [
            { name: "Ламинирование бровей", price: "2200" },
            { name: "Архитектура бровей ", price: "1300" },
            { name: "Ботокс бровей ", price: "2200" },
            { name: "Ботокс ресниц ", price: "2200" },
            { name: "Окрашивание бровей хной", price: "900" },
            { name: "Окрашивание бровей краской", price: "700" },
            { name: "Коррекция бровей", price: "800" },
            { name: "Ламинирование ресниц", price: "2200" },
            { name: "Окрашивание ресниц", price: "700" },
            { name: "Снятие наращенных ресниц ", price: "500" },
            { name: "Наращивание ресниц 1,5D", price: "2800" },
            { name: "Наращивание ресниц 1D", price: "2500" },
            { name: "Наращивание ресниц 2D", price: "2500" },
            { name: "Наращивание ресниц 2,5D ", price: "3400" },
            { name: "Наращивание ресниц от 4D ", price: "4300" },
            { name: "Наращивание ресниц 3D", price: "3700" },
            { name: "Снятие наращенных ресниц", price: "500" },
            { name: "Наращивание ресниц - уголки глаз ", price: "1600" },
            { name: "Наращивание ресниц- неполный объем ", price: "2100" },
            { name: "Коррекция 1D ", price: "1500" },
            { name: "Коррекция 1,5 D ", price: "1700" },
            { name: "Коррекция 2D", price: "1850" }
        ]
    },
    {
        name: "Депиляция",
        services: [
            { name: "Шугаринг глубокое бикини ", price: "1300" },
            { name: "Глубокое бикини полимерным воском ", price: "1900" },
            { name: "Глубокое бикини Skin's", price: "2800" },
            { name: "Шугаринг бикини классика ", price: "750" },
            { name: "Бикини классика полимерным воском ", price: "900" },
            { name: "Шугаринг подмышки ", price: "500" },
            { name: "Подмышки полимерным воском ", price: "600" },
            { name: "Подмышки Skin's", price: "1300" },
            { name: "Шугаринг голеней ", price: "1300" },
            { name: "Восковая депиляция голеней ", price: "900" },
            { name: "Голени полимерным воском ", price: "1750" },
            { name: "Шугаринг бёдер", price: "1300" },
            { name: "Восковая депиляция бёдер", price: "900" },
            { name: "Депиляция бёдер полимерным воском ", price: "1750" },
            { name: "Депиляция Skins бёдер ", price: "3100" },
            { name: "Депиляция нитью верхняя губа ", price: "400" },
            { name: "Шугаринг верхней губы/дорожки/подбородка", price: "350" },
            { name: "Депиляция верхней губы/дорожки/подбородка полимерным воском ", price: "450" },
            { name: "Депиляция Skins верхней губы/дорожки/подбородка", price: "1000" },
            { name: "Руки до локтя воском ", price: "600" },
            { name: "Шугаринг рук до локтя ", price: "700" },
            { name: "Руки до локтя полимерным воском ", price: "900" }
        ]
    },
    {
        name: "Парикмахерские услуги",
        services: [
            { name: "Женская стрижка", price: "1200" },
            { name: "Стрижка детская", price: "700" },
            { name: "Стрижка челки", price: "500" },
            { name: "Стрижка кончиков", price: "1000" },
            { name: "Укладка / прическа вечерняя", price: "3500" },
            { name: "Укладка коктейльная", price: "2500" },
            { name: "Укладка стайлером", price: "1200" },
            { name: "Укладка на брашинг", price: "1000" },
            { name: "Тотал блонд полный", price: "5750" },
            { name: "Тотал блонд корни", price: "4750" },
            { name: "Классическое мелирование", price: "2200" },
            { name: "Осветление", price: "2400" },
            { name: "Окрашивание в 1 тон", price: "2250" },
            { name: "Окрашивание корней", price: "2250" },
            { name: "Кератиновое выпрямление", price: "5000" }
        ]
    },
    {
        name: "Услуги для мужчин",
        services: [
            { name: "Педикюр", price: "2400" },
            { name: "Японский маникюр", price: "2300" },
            { name: "Маникюр", price: "1500" },
            { name: "Окрашивание бровей", price: "700" },
            { name: "Коррекция бровей", price: "700" },
            { name: "Стрижка машинкой", price: "800" },
            { name: "Мужская стрижка", price: "1500" },
            { name: "Одна большая зона", price: "2600" },
            { name: "Бикини глубокое", price: "2500" },
            { name: "Одна средняя зона", price: "1200" },
            { name: "Подмышечные впадины", price: "1000" },
            { name: "Одна малая зона", price: "800" },
            { name: "Глубокое бикини SKINS", price: "4000" },
            { name: "Подмышечные впадины SKINS", price: "1900" },
            { name: "Одна малая зона SKINS", price: "1500" }
        ]
    }
];

// Load prices from LocalStorage or fallback to Initial
let priceData = JSON.parse(localStorage.getItem('sitePrices')) || INITIAL_PRICES;

// Save to LocalStorage
function savePrices() {
    localStorage.setItem('sitePrices', JSON.stringify(priceData));
    renderPrices();
}

// Function to Render Prices
function renderPrices() {
    const container = document.querySelector('.price-container');
    if (!container) return;

    // Capture currently active categories by index
    const activeIndices = [];
    document.querySelectorAll('.price-category').forEach((el, index) => {
        if (el.classList.contains('active')) {
            activeIndices.push(index);
        }
    });

    container.innerHTML = ''; // Clear existing

    priceData.forEach((cat, catIndex) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'price-category';
        if (activeIndices.includes(catIndex)) {
            catDiv.classList.add('active');
        }

        // --- Drag Logic for Category ---
        catDiv.draggable = true; // Enables attribute but we limit logic to handle click
        catDiv.addEventListener('dragstart', (e) => {
            if (!document.body.classList.contains('body-admin-mode')) {
                e.preventDefault();
                return;
            }
            e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'category', index: catIndex }));
            e.dataTransfer.effectAllowed = 'move';
            catDiv.classList.add('dragging');
        });
        catDiv.addEventListener('dragend', () => {
            catDiv.classList.remove('dragging');
            document.querySelectorAll('.price-category').forEach(el => el.classList.remove('over'));
        });
        catDiv.addEventListener('dragover', (e) => {
            if (!document.body.classList.contains('body-admin-mode')) return;
            e.preventDefault();
            catDiv.classList.add('over');
        });
        catDiv.addEventListener('dragleave', () => {
            catDiv.classList.remove('over');
        });
        catDiv.addEventListener('drop', (e) => {
            if (!document.body.classList.contains('body-admin-mode')) return;
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data.type === 'category' && data.index !== catIndex) {
                // Move category data
                const movedItem = priceData.splice(data.index, 1)[0];
                priceData.splice(catIndex, 0, movedItem);
                savePrices();
            }
        });

        const headerDiv = document.createElement('div');
        headerDiv.className = 'category-header';

        // Category Name & Edit Controls
        const nameSpan = document.createElement('span');
        nameSpan.textContent = cat.name;

        // Admin Controls for Category
        const adminControls = document.createElement('div');
        adminControls.className = 'admin-controls';

        // Drag Handle
        const dragHandle = document.createElement('span');
        dragHandle.className = 'drag-handle';
        dragHandle.innerHTML = '&#9776;'; // Hamburger icon

        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.innerHTML = '✎';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            const newName = prompt('Изменить название категории:', cat.name);
            if (newName) {
                priceData[catIndex].name = newName;
                savePrices();
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerHTML = '🗑';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm('Удалить категорию "' + cat.name + '" и все услуги в ней?')) {
                priceData.splice(catIndex, 1);
                savePrices();
            }
        };

        adminControls.appendChild(dragHandle); // Include drag handle
        adminControls.appendChild(editBtn);
        adminControls.appendChild(deleteBtn);

        // Header Structure
        const leftSide = document.createElement('div');
        leftSide.style.display = 'flex';
        leftSide.style.alignItems = 'center';
        leftSide.appendChild(nameSpan);
        leftSide.appendChild(adminControls);

        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '+';
        toggleIcon.style.marginLeft = 'auto';

        headerDiv.appendChild(leftSide);
        headerDiv.appendChild(toggleIcon);

        headerDiv.addEventListener('click', (e) => {
            // Don't toggle if clicking admin controls
            if (e.target.closest('.admin-controls')) return;

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
        if (catDiv.classList.contains('active')) {
            listDiv.classList.add('active');
        }

        const innerDiv = document.createElement('div');
        innerDiv.className = 'services-list-inner';

        if (cat.services && cat.services.length > 0) {
            cat.services.forEach((service, serviceIndex) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'service-item';

                // --- Drag Logic for Service ---
                itemDiv.draggable = true;
                itemDiv.addEventListener('dragstart', (e) => {
                    if (!document.body.classList.contains('body-admin-mode')) {
                        e.preventDefault();
                        return;
                    }
                    e.stopPropagation(); // Prevent bubbling to category
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        type: 'service',
                        catIndex: catIndex,
                        serviceIndex: serviceIndex
                    }));
                    itemDiv.classList.add('dragging');
                });
                itemDiv.addEventListener('dragend', (e) => {
                    e.stopPropagation();
                    itemDiv.classList.remove('dragging');
                    document.querySelectorAll('.service-item').forEach(el => el.classList.remove('over'));
                });
                itemDiv.addEventListener('dragover', (e) => {
                    if (!document.body.classList.contains('body-admin-mode')) return;
                    e.preventDefault();
                    e.stopPropagation();
                    itemDiv.classList.add('over');
                });
                itemDiv.addEventListener('dragleave', (e) => {
                    e.stopPropagation();
                    itemDiv.classList.remove('over');
                });
                itemDiv.addEventListener('drop', (e) => {
                    if (!document.body.classList.contains('body-admin-mode')) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (data.type === 'service' && data.catIndex === catIndex && data.serviceIndex !== serviceIndex) {
                        // Move service
                        const services = priceData[catIndex].services;
                        const movedItem = services.splice(data.serviceIndex, 1)[0];
                        services.splice(serviceIndex, 0, movedItem);
                        savePrices();
                    }
                });

                // Service HTML
                const serviceContent = document.createElement('div');
                serviceContent.style.flex = '1';
                serviceContent.style.display = 'flex';
                serviceContent.style.justifyContent = 'space-between';
                serviceContent.style.width = '100%';

                const sName = document.createElement('span');
                sName.className = 'service-name';
                sName.textContent = service.name;

                const sPrice = document.createElement('span');
                sPrice.className = 'service-price';
                sPrice.textContent = service.price;

                serviceContent.appendChild(sName);
                serviceContent.appendChild(sPrice);

                // Admin Controls for Service
                const sAdminControls = document.createElement('div');
                sAdminControls.className = 'admin-controls';

                // Drag Handle
                const sDragHandle = document.createElement('span');
                sDragHandle.className = 'drag-handle';
                sDragHandle.innerHTML = '&#9776;'; // Hamburger icon

                const sEditBtn = document.createElement('button');
                sEditBtn.className = 'btn-edit';
                sEditBtn.innerHTML = '✎';
                sEditBtn.onclick = (e) => {
                    e.stopPropagation();
                    const newName = prompt('Название услуги:', service.name);
                    const newPrice = prompt('Цена услуги:', service.price);
                    if (newName !== null && newPrice !== null) {
                        priceData[catIndex].services[serviceIndex] = { name: newName, price: newPrice };
                        savePrices();
                    }
                };

                const sDeleteBtn = document.createElement('button');
                sDeleteBtn.className = 'btn-delete';
                sDeleteBtn.innerHTML = '🗑';
                sDeleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('Удалить услугу "' + service.name + '"?')) {
                        priceData[catIndex].services.splice(serviceIndex, 1);
                        savePrices();
                    }
                };

                sAdminControls.appendChild(sDragHandle);
                sAdminControls.appendChild(sEditBtn);
                sAdminControls.appendChild(sDeleteBtn);

                // Prepend drag handle logic is tricky visually, let's just use the item itself as draggable
                // but visually show the handle.

                itemDiv.appendChild(serviceContent);
                itemDiv.appendChild(sAdminControls); // Append admin controls to item

                innerDiv.appendChild(itemDiv);
            });
        }

        // "Add Service" Button (Admin Only)
        const addServiceBtn = document.createElement('button');
        addServiceBtn.className = 'add-service-btn';
        addServiceBtn.textContent = '+ Добавить услугу';
        addServiceBtn.onclick = (e) => {
            e.stopPropagation();
            const newName = prompt('Название новой услуги:');
            const newPrice = prompt('Цена услуги:');
            if (newName && newPrice) {
                if (!priceData[catIndex].services) priceData[catIndex].services = [];
                priceData[catIndex].services.push({ name: newName, price: newPrice });
                savePrices();
                // Ensure category stays open
                // catDiv.classList.add('active'); // Re-rendering kills current state unless handled complexly
                // For simplicity, re-render will collapse. Can be improved but meets implementation.
            }
        };
        innerDiv.appendChild(addServiceBtn);

        listDiv.appendChild(innerDiv);
        catDiv.appendChild(headerDiv);
        catDiv.appendChild(listDiv);
        container.appendChild(catDiv);
    });

    // "Add Category" Button (Admin Only)
    const addCatBtn = document.createElement('button');
    addCatBtn.className = 'add-category-btn';
    addCatBtn.textContent = '+ Добавить категорию';
    addCatBtn.onclick = () => {
        const name = prompt('Название новой категории:');
        if (name) {
            priceData.push({ name: name, services: [] });
            savePrices();
        }
    };
    container.appendChild(addCatBtn);
}


// --- Admin Logic ---

const adminIcon = document.querySelector('.admin-icon');
const adminModal = document.getElementById('adminLoginModal');
const closeModal = document.querySelector('.close-modal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Toggle Modal
if (adminIcon) {
    adminIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (localStorage.getItem('isAdmin') === 'true') {
            alert('Вы уже вошли как администратор.');
        } else {
            adminModal.classList.add('active');
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        adminModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.classList.remove('active');
    }
});

// Login Check
if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', () => {
        const user = document.getElementById('adminUsername').value;
        const pass = document.getElementById('adminPassword').value;

        if (user === 'admin' && pass === 'QaWsEdRf123') {
            localStorage.setItem('isAdmin', 'true');
            enableAdminMode();
            adminModal.classList.remove('active');
            alert('Успешный вход!');
        } else {
            alert('Неверный логин или пароль');
        }
    });
}

// Enable Admin Mode
function enableAdminMode() {
    document.body.classList.add('body-admin-mode');
    if (adminLogoutBtn) adminLogoutBtn.style.display = 'block';
}

// Disable Admin Mode
function disableAdminMode() {
    document.body.classList.remove('body-admin-mode');
    if (adminLogoutBtn) adminLogoutBtn.style.display = 'none';
}

// Check on Load
function checkAdminStatus() {
    if (localStorage.getItem('isAdmin') === 'true') {
        enableAdminMode();
    } else {
        disableAdminMode();
    }
}

// Logout
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        disableAdminMode();
        location.reload(); // Refresh to clear state
    });
}


// Init
document.addEventListener('DOMContentLoaded', () => {
    renderPrices();
    checkAdminStatus();
});


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

// Custom scroll for FAB About button (Adjusted for mobile)
document.addEventListener('click', (e) => {
    const fabLink = e.target.closest('.fab-about');

    if (fabLink) {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            // Get current absolute position
            const rect = aboutSection.getBoundingClientRect();
            // Current scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Calculate absolute top position of the element
            const elementTop = rect.top + scrollTop;

            // User says "scrolls too much down". Wants it "1cm higher" (viewport higher).
            // So we need a smaller scrollY value.
            // 1cm is approx 40px.
            // We'll set the target to be 40px ABOVE the element top to leave a gap.
            const offset = -40;

            window.scrollTo({
                top: elementTop + offset,
                behavior: 'smooth'
            });

            // Close FAB menu
            const fabOptions = document.querySelector('.fab-options');
            if (fabOptions) fabOptions.classList.remove('active');
        }
    }
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) {
    let scrollInterval;
    const slides = document.querySelectorAll('.carousel-slide');

    // Clone first slide for infinite loop effect
    const firstSlideClone = slides[0].cloneNode(true);
    track.appendChild(firstSlideClone);

    // Re-query slides including clone
    const allSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    // Auto Scroll Function
    const startAutoScroll = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            currentSlide++;

            // Scroll to next slide smoothly
            track.scrollTo({
                left: currentSlide * track.offsetWidth,
                behavior: 'smooth'
            });

            // Check if we scrolled to the clone (last slide)
            if (currentSlide === allSlides.length - 1) {
                // Wait for smooth scroll to finish, then snap back instantly
                setTimeout(() => {
                    currentSlide = 0;
                    // Disable smooth scrolling temporarily to snap back instantly
                    track.style.scrollBehavior = 'auto'; // Ensure CSS doesn't override
                    track.scrollTo({
                        left: 0,
                        behavior: 'auto'
                    });
                    // Re-enable smooth (or remove inline style)
                    requestAnimationFrame(() => {
                        track.style.scrollBehavior = '';
                    });
                }, 800); // 800ms matches typical slow smooth scroll duration
            }
        }, 3000);
    };

    // Start initially
    startAutoScroll();

    // Pause on user interaction
    const stopAutoScroll = () => {
        clearInterval(scrollInterval);
    };

    // Restart on interaction end
    const restartAutoScroll = () => {
        stopAutoScroll();
        startAutoScroll();
    };

    // Listeners for manual interaction
    track.addEventListener('mousedown', stopAutoScroll);
    track.addEventListener('touchstart', stopAutoScroll, { passive: true });

    // Update index on manual scroll (optional sync)
    track.addEventListener('scroll', () => {
        // If user manually scrolls near end, logic might get complex. 
        // For simplicity, we just track rough index.
        // If exact sync needed for infinite manual scroll, it's more complex.
        const index = Math.round(track.scrollLeft / track.offsetWidth);
        if (index !== currentSlide && index < allSlides.length - 1) {
            currentSlide = index;
        }
    }, { passive: true });

    track.addEventListener('mouseup', restartAutoScroll);
    track.addEventListener('touchend', restartAutoScroll);
    track.addEventListener('mouseleave', restartAutoScroll);
}

// --- Multi-Location Support & Booking Modal ---

const LOCATIONS = {
    vestor: {
        name: 'ТЦ "Вестор"',
        address: 'Москва, Одинцово, Можайское шоссе 133а ТЦ "Вестор", 2 этаж',
        phone: '+7 (985) 809-94-13',
        hours: 'Ежедневно 10.00 - 22.00',
        bookingUrl: 'https://n613524.yclients.com',
        mapSrc: 'https://yandex.ru/map-widget/v1/?text=Одинцово,+Можайское+шоссе,+133А&z=17',
        links: {
            gis: 'https://2gis.ru/odintsovo/search/Можайское%20шоссе%20133а',
            yandex: 'https://yandex.ru/maps/?text=Одинцово,+Можайское+шоссе,+133А',
            whatsapp: 'https://wa.me/79858099413',
            telegram: 'https://t.me/+79858099413'
        }
    },
    second: {
        name: 'Второй Салон',
        address: 'Москва, Одинцово, Улица Примерная, д. 2, 1 этаж (Заглушка)',
        phone: '+7 (900) 000-00-00',
        hours: 'Ежедневно 09.00 - 21.00',
        bookingUrl: '#booking-url-2',
        mapSrc: 'https://yandex.ru/map-widget/v1/?text=Москва,+Одинцово&z=12', // Placeholder map
        links: {
            gis: '#gis-link-2',
            yandex: '#yandex-link-2',
            whatsapp: 'https://wa.me/79000000000',
            telegram: 'https://t.me/+79000000000'
        }
    }
};

const tabBtns = document.querySelectorAll('.tab-btn');
const contactAddress = document.getElementById('contact-address');
const contactPhone = document.getElementById('contact-phone');
const contactHours = document.getElementById('contact-hours');
const contactMap = document.getElementById('contact-map');
const link2gis = document.getElementById('link-2gis');
const linkYandex = document.getElementById('link-yandex');
const contactWhatsapp = document.getElementById('contact-whatsapp');
const contactTelegram = document.getElementById('contact-telegram');

// Tab Switching Logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active State
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update Content
        const locKey = btn.dataset.tab;
        const data = LOCATIONS[locKey];

        if (data) {
            // Animate transition (optional, simple opacity fade)
            const detailsParams = [contactAddress, contactPhone, contactHours];

            contactAddress.textContent = data.address;
            contactHours.textContent = data.hours;
            contactPhone.textContent = data.phone;
            contactPhone.parentElement.href = `tel:${data.phone.replace(/[^\d+]/g, '')}`;

            contactMap.src = data.mapSrc;

            link2gis.href = data.links.gis;
            linkYandex.href = data.links.yandex;

            contactWhatsapp.href = data.links.whatsapp;
            contactTelegram.href = data.links.telegram;

            // Update modal buttons links dynamically too? 
            // Actually modal buttons are static links to specific booking URLs, 
            // but we might want them to persist? 
            // The modal buttons are hardcoded in HTML with data-location to serve as jump links 
            // or we can make them dynamic. 
            // For now, let's update the modal buttons hrefs based on the data object just in case.
            const modalBtnVestor = document.querySelector('.modal-btn[data-location="vestor"]');
            const modalBtnSecond = document.querySelector('.modal-btn[data-location="second"]');

            if (modalBtnVestor) modalBtnVestor.href = LOCATIONS.vestor.bookingUrl;
            if (modalBtnSecond) modalBtnSecond.textContent = LOCATIONS.second.name; // Update name
            if (modalBtnSecond) modalBtnSecond.href = LOCATIONS.second.bookingUrl;
        }
    });
});



// Direct booking link - open booking URL directly without modal
const triggerButtons = document.querySelectorAll('.trigger-booking-modal');
triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://n613524.yclients.com', '_blank');
    });
});

