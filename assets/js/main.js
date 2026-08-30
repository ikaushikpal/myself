/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });

        tab.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollProgressBar = document.getElementById('scroll-progress');

function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');

    // Progress bar
    if (scrollProgressBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        scrollProgressBar.style.width = pct + '%';
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

/*--- leetcard theme helper ---*/
function updateLeetcardTheme(theme) {
    const heatmap = document.getElementById('lc-heatmap');
    const contest = document.getElementById('lc-contest');
    if (heatmap) heatmap.src = `https://leetcard.jacoblin.cool/KaushikPal?theme=${theme}&font=Poppins&ext=heatmap`;
    if (contest) contest.src = `https://leetcard.jacoblin.cool/KaushikPal?theme=${theme}&font=Poppins&ext=contest`;
}

/* Apply stored theme on load */
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    updateLeetcardTheme(selectedTheme === 'dark' ? 'dark' : 'light');
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    const t = getCurrentTheme();
    localStorage.setItem('selected-theme', t);
    localStorage.setItem('selected-icon', getCurrentIcon());
    updateLeetcardTheme(t === 'dark' ? 'dark' : 'light');
});

/*==================== LEETCODE BADGES (static) ====================*/
(function renderLeetCodeBadges() {
    const container = document.getElementById('lc-badges');
    if (!container) return;

    const badges = [
        { name: 'Guardian', date: 'May 2026', img: 'https://leetcode.com/static/images/badges/guardian.png' },
        { name: 'Aug Badge', date: 'Aug 2026', img: 'https://leetcode.com/static/images/badges/dcc-2026-8.png' },
        { name: 'Jul Badge', date: 'Jul 2026', img: 'https://leetcode.com/static/images/badges/dcc-2026-7.png' },
        { name: 'Jun Badge', date: 'Jun 2026', img: 'https://leetcode.com/static/images/badges/dcc-2026-6.png' },
        { name: '500 Days', date: 'Jul 2025', img: 'https://assets.leetcode.com/static_assets/marketing/500_new.gif' },
        { name: '365 Days', date: 'Dec 2024', img: 'https://assets.leetcode.com/static_assets/marketing/365_new.gif' },
    ];

    container.innerHTML = badges.map(b => `
        <div class="lc-badge" title="${b.name} · ${b.date}">
            <div class="lc-badge__img-wrap">
                <img src="${b.img}" alt="${b.name}" class="lc-badge__img" loading="lazy">
            </div>
            <span class="lc-badge__name">${b.name}</span>
            <span class="lc-badge__date">${b.date}</span>
        </div>`).join('');
})();

/*==================== HACKERRANK (static) ====================*/
(function renderHackerRank() {
    /*--- Badges (Gold level = 6 stars) ---*/
    const badgeContainer = document.getElementById('hr-badges');
    if (badgeContainer) {
        const GOLD = '#FFD700';
        const badges = [
            { name: 'Problem Solving', stars: 6, color: GOLD },
            { name: 'C++', stars: 6, color: GOLD },
            { name: 'Java', stars: 6, color: GOLD },
            { name: 'Python', stars: 6, color: GOLD },
            { name: '30 Days of Code', stars: 6, color: GOLD },
            { name: 'SQL', stars: 6, color: GOLD },
            { name: 'C', stars: 6, color: GOLD },
        ];
        const stars = (n, max = 6) => '★'.repeat(Math.min(n, max)) + '☆'.repeat(Math.max(0, max - n));
        badgeContainer.innerHTML = badges.map(b => `
            <div class="hr-badge hr-badge--gold">
                <div class="hr-badge__circle hr-badge__circle--gold">
                    <i class="uil uil-code-branch hr-badge__icon"></i>
                </div>
                <div class="hr-badge__info">
                    <span class="hr-badge__name">${b.name}</span>
                    <span class="hr-badge__stars hr-badge__stars--gold">${stars(b.stars)}</span>
                </div>
            </div>`).join('');
    }

    /*--- Certificates ---*/
    const certContainer = document.getElementById('hr-certs');
    if (certContainer) {
        const certs = [
            { name: 'SQL (Advanced)', color: '#c0392b', url: 'https://www.hackerrank.com/certificates/39adb9563d5c' },
            { name: 'Software Engineer', color: '#6366f1', url: 'https://www.hackerrank.com/certificates/5a548f2b896d' },
            { name: 'Problem Solving (Intermediate)', color: '#5cb85c', url: 'https://www.hackerrank.com/certificates/80aeef2db17b' },
            { name: 'Rest API (Intermediate)', color: '#e67e22', url: 'https://www.hackerrank.com/certificates/359ef5bbb437' },
        ];
        certContainer.innerHTML = certs.map(c => `
            <div class="hr-cert">
                <div class="hr-cert__icon" style="background:${c.color}">
                    <i class="uil uil-award hr-cert__i"></i>
                </div>
                <div class="hr-cert__info">
                    <span class="hr-cert__name">${c.name}</span>
                    <span class="hr-cert__type">HackerRank Skill Certificate</span>
                </div>
                <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="hr-cert__link" title="View certificate">
                    <i class="uil uil-external-link-alt"></i>
                </a>
            </div>`).join('');
    }
})();

/*==================== CONTACT FORM HANDLER ====================*/
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactSubmitBtn = document.getElementById('contact-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim() || `Portfolio Contact from ${name}`;
        const message = document.getElementById('contact-message').value.trim();
        const accessKey = document.getElementById('web3forms-key')?.value.trim();

        if (!name || !email || !message) {
            if (contactStatus) {
                contactStatus.style.display = 'block';
                contactStatus.className = 'contact__status contact__status--error';
                contactStatus.textContent = 'Please fill in all required fields (Name, Email, Message).';
            }
            return;
        }

        // If Web3Forms Access Key is provided, submit via API directly
        if (accessKey && accessKey !== '') {
            try {
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = true;
                    contactSubmitBtn.innerHTML = 'Sending... <i class="uil uil-spinner-alt button__icon"></i>';
                }

                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    contactStatus.style.display = 'block';
                    contactStatus.className = 'contact__status contact__status--success';
                    contactStatus.innerHTML = '<i class="uil uil-check-circle"></i> Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                contactStatus.style.display = 'block';
                contactStatus.className = 'contact__status contact__status--error';
                contactStatus.innerHTML = '<i class="uil uil-exclamation-triangle"></i> Failed to send via API. Please use the direct email link below.';
            } finally {
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = false;
                    contactSubmitBtn.innerHTML = 'Send Message <i class="uil uil-message button__icon"></i>';
                }
            }
            return;
        }

        // Fallback: Direct Web Gmail and Default Mail App links
        const bodyContent = `Hi Kaushik,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=iamkaushik2014@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
        const mailtoUrl = `mailto:iamkaushik2014@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

        // Open Gmail Web composer directly in new tab or default mail app
        window.open(gmailUrl, '_blank') || (window.location.href = mailtoUrl);

        if (contactStatus) {
            contactStatus.style.display = 'block';
            contactStatus.className = 'contact__status contact__status--success';
            contactStatus.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:.5rem;">
                    <div><i class="uil uil-check-circle"></i> Opening message in your email app / Gmail...</div>
                    <div style="font-size:var(--smaller-font-size); color:var(--text-color);">
                        Didn't open? Click here to:
                        <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--first-color); font-weight:600; text-decoration:underline; margin: 0 .25rem;">Open in Gmail (Web)</a> or
                        <a href="${mailtoUrl}" style="color:var(--first-color); font-weight:600; text-decoration:underline; margin-left:.25rem;">Default Mail App</a>
                    </div>
                </div>
            `;
        }
    });
}



