                        // Fast falling elements effect - Grey Bubbles
                        function createBubbles() {
                            const bubbleContainer = document.getElementById('bubbleContainer');
                            const bubbleCount = 20;
                            for (let i = 0; i < bubbleCount; i++) {
                                const bubble = document.createElement('div');
                                bubble.classList.add('bubble');
                                const size = Math.random() * 7 + 3;
                                bubble.style.width = `${size}px`;
                                bubble.style.height = `${size}px`;
                                bubble.style.left = `${Math.random() * 100}vw`;
                                bubble.style.top = `-${size}px`;
                                const duration = Math.random() * 12 + 10;
                                bubble.style.animationDuration = `${duration}s`;
                                bubble.style.animationDelay = `${Math.random() * 2}s`;
                                bubble.style.backgroundColor = '#948979';
                                bubble.style.opacity = Math.random() * 0.5 + 0.3;
                                bubbleContainer.appendChild(bubble);
                            }
                        }
                
                        // Initialize bubble effect
                        createBubbles();
                        
                        // Smooth scrolling for anchor links
                        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                            anchor.addEventListener('click', function (e) {
                                e.preventDefault();
                                
                                document.querySelector(this.getAttribute('href')).scrollIntoView({
                                    behavior: 'smooth'
                                });
                                
                                // Close mobile menu if open
                                if (document.querySelector('nav ul').classList.contains('active')) {
                                    document.querySelector('nav ul').classList.remove('active');
                                    document.querySelector('.menu-toggle').classList.remove('active');
                                }
                            });
                        });
                
                        // Form submission - Formspree + optional WhatsApp integration
                        (function() {
                            const waNumber = '37744877682';

                            const contactForm = document.getElementById('contactForm');
                            if (!contactForm) return;

                            const whatsappUIText = {
                                sq: {
                                    successTitle: 'Faleminderit për mesazhin tuaj!',
                                    successText: 'Ekipi ynë do t\'ju kontaktojë së shpejti. Po ju hap WhatsApp-in për të dërguar mesazhin.',
                                    error: 'Ka ndodhur një gabim. Ju lutem provoni përsëri më vonë.'
                                },
                                en: {
                                    successTitle: 'Thank you for your message!',
                                    successText: 'Our team will contact you soon. Opening WhatsApp to send the message.',
                                    error: 'An error occurred. Please try again later.'
                                },
                                fr: {
                                    successTitle: 'Merci pour votre message!',
                                    successText: 'Notre équipe vous contactera bientôt. Ouverture de WhatsApp pour envoyer le message.',
                                    error: 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
                                },
                                de: {
                                    successTitle: 'Vielen Dank für Ihre Nachricht!',
                                    successText: 'Unser Team wird Sie bald kontaktieren. Wir öffnen WhatsApp, um die Nachricht zu senden.',
                                    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
                                }
                            };

                            function getLang() {
                                return (typeof currentLanguage !== 'undefined' && whatsappUIText[currentLanguage]) ? currentLanguage : 'sq';
                            }

                            function buildWhatsAppLink(name, phone, email, service, messageText) {
                                const text = `Pershendetje, keni nje kontakt te ri nga website:\n\nEmri: ${name}\nTelefoni: ${phone}\nEmail: ${email}\nSherbimi: ${service}\nMesazhi: ${messageText}`;
                                const encoded = encodeURIComponent(text);
                                return `https://wa.me/${waNumber}?text=${encoded}`;
                            }

                            function showWhatsAppNotice() {
                                const ui = whatsappUIText[getLang()];
                                const existing = document.getElementById('whatsappSuccessModal');
                                if (existing) existing.remove();

                                const overlay = document.createElement('div');
                                overlay.id = 'whatsappSuccessModal';
                                overlay.className = 'wa-modal-overlay';
                                overlay.innerHTML = `
                                    <div class="wa-modal" role="dialog" aria-modal="true">
                                        <div class="wa-modal-icon"><i class="fab fa-whatsapp"></i></div>
                                        <h3 class="wa-modal-title">${ui.successTitle}</h3>
                                        <p class="wa-modal-text">${ui.successText}</p>
                                    </div>
                                `;
                                document.body.appendChild(overlay);
                                setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 3000);
                                overlay.addEventListener('click', () => overlay.remove());
                            }

                            contactForm.addEventListener('submit', function(e) {
                                e.preventDefault();
                                const form = e.target;
                                const formData = new FormData(form);

                                // Capture form values for WhatsApp message
                                const name = (form.querySelector('#name') || {}).value || '';
                                const phone = (form.querySelector('#phone') || {}).value || '';
                                const email = (form.querySelector('#email') || {}).value || '';
                                const service = (form.querySelector('#service') || {}).value || (form.querySelector('[name="Sherbimi"]') || {}).value || '-';
                                const messageText = (form.querySelector('#message') || {}).value || '';

                                fetch(form.action, {
                                    method: 'POST',
                                    body: formData,
                                    headers: { 'Accept': 'application/json' }
                                })
                                .then(response => {
                                    if (response.ok) {
                                        form.reset();
                                        try {
                                            const link = buildWhatsAppLink(name, phone, email, service, messageText);
                                            // Open WhatsApp in same tab so the user lands directly
                                            // in WhatsApp with the pre-filled message ready to send.
                                            window.location.href = link;
                                        } catch (err) {
                                            console.error('WhatsApp open error:', err);
                                        }
                                    } else {
                                        throw new Error('Network response was not ok');
                                    }
                                })
                                .catch(error => {
                                    const ui = whatsappUIText[getLang()];
                                    alert(ui.error);
                                    console.error('Error:', error);
                                });
                            });
                        })();
                
                        // Custom Cursor - Only for desktop (screen width > 768px)
                        let cursor = null;
                        let mouseX = 0, mouseY = 0;
                        let cursorX = 0, cursorY = 0;
                        
                        function initCustomCursor() {
                            // Only create cursor on desktop
                            if (window.innerWidth > 768 && !cursor) {
                                cursor = document.createElement('div');
                                cursor.className = 'custom-cursor';
                                document.body.appendChild(cursor);
                                
                                document.addEventListener('mousemove', (e) => {
                                    mouseX = e.clientX;
                                    mouseY = e.clientY;
                                });
                                
                                function animateCursor() {
                                    if (cursor && window.innerWidth > 768) {
                                        cursorX += (mouseX - cursorX) * 0.1;
                                        cursorY += (mouseY - cursorY) * 0.1;
                                        cursor.style.left = cursorX + 'px';
                                        cursor.style.top = cursorY + 'px';
                                        requestAnimationFrame(animateCursor);
                                    }
                                }
                                animateCursor();
                                
                                // Cursor hover effects
                                const hoverElements = document.querySelectorAll('a, button, .btn, .catalog-item, .social-link, .webmakers-credit a');
                                hoverElements.forEach(el => {
                                    el.addEventListener('mouseenter', () => {
                                        if (cursor) cursor.classList.add('hover');
                                    });
                                    el.addEventListener('mouseleave', () => {
                                        if (cursor) cursor.classList.remove('hover');
                                    });
                                });
                                
                                // Change cursor color based on section
                                const sections = {
                                    'home': { border: '#FFFFFF', bg: 'rgba(0, 0, 0, 0.3)' },
                                    'services': { border: '#B8A896', bg: 'rgba(184, 168, 150, 0.2)' },
                                    'catalog': { border: '#E8DDD0', bg: 'rgba(232, 221, 208, 0.2)' },
                                    'video': { border: '#FFFFFF', bg: 'rgba(0, 0, 0, 0.3)' },
                                    'gallery': { border: '#B8A896', bg: 'rgba(184, 168, 150, 0.2)' },
                                    'developments': { border: '#E8DDD0', bg: 'rgba(232, 221, 208, 0.2)' },
                                    'partners': { border: '#FFFFFF', bg: 'rgba(0, 0, 0, 0.3)' },
                                    'contact': { border: '#B8A896', bg: 'rgba(184, 168, 150, 0.2)' }
                                };
                                
                                function updateCursorForSection() {
                                    if (!cursor || window.innerWidth <= 768) return;
                                    
                                    const scrollPos = window.scrollY + window.innerHeight / 2;
                                    const allSections = document.querySelectorAll('section[id]');
                                    
                                    allSections.forEach(section => {
                                        const rect = section.getBoundingClientRect();
                                        const sectionTop = rect.top + window.scrollY;
                                        const sectionBottom = sectionTop + rect.height;
                                        const sectionId = section.id;
                                        
                                        if (scrollPos >= sectionTop && scrollPos <= sectionBottom && sections[sectionId]) {
                                            const colors = sections[sectionId];
                                            cursor.style.setProperty('--cursor-color', colors.border);
                                            cursor.style.setProperty('--cursor-bg', colors.bg);
                                            cursor.style.borderColor = colors.border;
                                            cursor.style.background = colors.bg;
                                        }
                                    });
                                }
                                
                                window.addEventListener('scroll', updateCursorForSection);
                                updateCursorForSection();
                            } else if (cursor && window.innerWidth <= 768) {
                                // Remove cursor on mobile
                                cursor.remove();
                                cursor = null;
                            }
                        }
                        
                        // Initialize cursor
                        initCustomCursor();
                        
                        // Re-initialize on resize
                        let resizeTimer;
                        window.addEventListener('resize', () => {
                            clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(() => {
                                if (cursor && window.innerWidth <= 768) {
                                    cursor.remove();
                                    cursor = null;
                                } else if (!cursor && window.innerWidth > 768) {
                                    initCustomCursor();
                                }
                            }, 250);
                        });
                        
                        // Header effect on scroll
                        window.addEventListener('scroll', function() {
                            const header = document.querySelector('header');
                            if (window.scrollY > 50) {
                                header.style.background = 'var(--nav-bg)';
                                header.style.padding = '0.5rem 0';
                                header.style.boxShadow = '0 10px 30px var(--shadow)';
                            } else {
                                header.style.background = 'var(--nav-bg)';
                                header.style.padding = '1rem 0';
                                header.style.boxShadow = '0 5px 30px var(--shadow)';
                            }
                            updateCursorForSection();
                
                            // Show/hide scroll to top button
                            const scrollTopBtn = document.getElementById('scrollTop');
                            if (window.pageYOffset > 300) {
                                scrollTopBtn.classList.add('active');
                            } else {
                                scrollTopBtn.classList.remove('active');
                            }
                        });
                
                        // Services animation: animate from scratch when section enters viewport
                        document.addEventListener('DOMContentLoaded', function() {
                            const serviceItems = document.querySelectorAll('.service-item');
                            const observer = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        // Remove animation classes and opacity for all
                                        serviceItems.forEach(item => {
                                            item.classList.remove('animated');
                                            item.style.opacity = 0;
                                            item.style.transform = 'translateY(50px)';
                                        });
                                        // Animate one by one
                                        serviceItems.forEach((item, index) => {
                                            setTimeout(() => {
                                                item.classList.add('animated');
                                                item.style.opacity = 1;
                                                item.style.transform = 'translateY(0)';
                                            }, index * 300);
                                        });
                                        observer.unobserve(entry.target);
                                    }
                                });
                            }, { threshold: 0.1 });
                            const servicesSection = document.querySelector('.services');
                            if (servicesSection) {
                                observer.observe(servicesSection);
                            }
                        });
                
                        // Initialize floating elements
                        document.addEventListener('DOMContentLoaded', () => {
                            // Initialize window animation
                            const windowFrame = document.querySelector('.window-frame');
                            const windowShutters = document.querySelectorAll('.window-shutter');
                            
                            // Animate window frame building
                            windowFrame.style.animation = 'windowBuild 2s ease-out forwards';
                            
                            // Animate window panes
                            const windowPanes = document.querySelectorAll('.window-pane');
                            windowPanes.forEach((pane, index) => {
                                pane.style.animation = `fadeInUp 0.5s ease-out ${1.5 + index * 0.2}s forwards`;
                                pane.style.opacity = '0';
                            });
                            
                            // Animate window shutters
                            windowShutters.forEach(shutter => {
                                shutter.style.animation = `fadeInUp 0.5s ease-out 2.5s forwards`;
                                shutter.style.opacity = '0';
                            });
                        });
                
                
                        // 3D tilt effect for catalog items
                        document.querySelectorAll('.catalog-item').forEach(item => {
                            item.addEventListener('mousemove', (e) => {
                                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                                item.style.transform = `translateY(-20px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
                            });
                            
                            item.addEventListener('mouseleave', () => {
                                item.style.transform = 'translateY(-20px) rotateX(5deg)';
                            });
                        });

                
                        // Parallax effect for hero section
                        window.addEventListener('scroll', function() {
                            const scrollPosition = window.pageYOffset;
                            const hero = document.querySelector('.hero');
                            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
                        });
                
                        // Dynamic year in footer
                        document.getElementById('currentYear').textContent = new Date().getFullYear();
                
                        // Scroll to top button
                        document.getElementById('scrollTop').addEventListener('click', () => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        });
                
                        // Image lazy loading
                        const lazyImages = document.querySelectorAll('img[data-src]');
                        const imageObserver = new IntersectionObserver((entries, observer) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const img = entry.target;
                                    img.src = img.dataset.src;
                                    img.removeAttribute('data-src');
                                    observer.unobserve(img);
                                }
                            });
                        });
                
                        lazyImages.forEach(img => {
                            imageObserver.observe(img);
                        });
                
                        // Form validation
                        const form = document.querySelector('.contact-form form');
                        form.addEventListener('submit', function(e) {
                            const email = this.querySelector('#email');
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            
                            if (!emailRegex.test(email.value)) {
                                e.preventDefault();
                                email.style.borderColor = 'red';
                                email.nextElementSibling?.remove();
                                const errorMsg = document.createElement('small');
                                errorMsg.textContent = 'Ju lutem shkruani një email valid';
                                errorMsg.style.color = 'red';
                                errorMsg.style.display = 'block';
                                errorMsg.style.marginTop = '5px';
                                email.parentNode.insertBefore(errorMsg, email.nextSibling);
                            }
                        });
                
                        // Mobile menu toggle
                        const menuToggle = document.querySelector('.menu-toggle');
                        const nav = document.querySelector('nav ul');
                        
                        menuToggle.addEventListener('click', () => {
                            nav.classList.toggle('active');
                            menuToggle.classList.toggle('active');
                        });
                
                                // Language toggle functionality
        const languageToggle = document.getElementById('languageToggle');
        let currentLanguage = 'sq'; // Default Albanian

        // Restore the user's previously chosen language (if any) so a reload
        // keeps the same language and the toggle button reflects it.
        try {
            const savedLang = localStorage.getItem('language');
            if (savedLang && ['sq', 'en', 'fr', 'de'].indexOf(savedLang) !== -1) {
                currentLanguage = savedLang;
                document.documentElement.setAttribute('lang', currentLanguage);
                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle) {
                    pageTitle.textContent = currentLanguage === 'sq'
                        ? 'MS Doors&Windows | Zgjidhje Arkitekturore Premium'
                        : currentLanguage === 'en'
                        ? 'MS Doors&Windows | Premium Architectural Solutions'
                        : currentLanguage === 'fr'
                        ? 'MS Doors&Windows | Solutions Architecturales Premium'
                        : 'MS Doors&Windows | Premium Architekturlösungen';
                }
                if (languageToggle) {
                    languageToggle.textContent = currentLanguage === 'sq' ? '🇦🇱'
                        : currentLanguage === 'en' ? '🇺🇸'
                        : currentLanguage === 'fr' ? '🇫🇷'
                        : '🇩🇪';
                }
                // Apply the saved language to all UI text right after the page is parsed
                if (currentLanguage === 'en') translateToEnglish();
                else if (currentLanguage === 'fr') translateToFrench();
                else if (currentLanguage === 'de') translateToGerman();
                // sq is the default markup, so no translateToAlbanian() needed
            }
        } catch (_) { /* localStorage may be unavailable; ignore */ }

        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                if (currentLanguage === 'sq') {
                    // Switch to English
                    currentLanguage = 'en';
                    languageToggle.textContent = '🇺🇸';
                    translateToEnglish();
                } else if (currentLanguage === 'en') {
                    // Switch to French
                    currentLanguage = 'fr';
                    languageToggle.textContent = '🇫🇷';
                    translateToFrench();
                } else if (currentLanguage === 'fr') {
                    // Switch to German
                    currentLanguage = 'de';
                    languageToggle.textContent = '🇩🇪';
                    translateToGerman();
                } else {
                    // Switch to Albanian
                    currentLanguage = 'sq';
                    languageToggle.textContent = '🇦🇱';
                    translateToAlbanian();
                }
                // Update the document language attribute for accessibility/SEO
                document.documentElement.setAttribute('lang', currentLanguage);
                // Persist the choice so a reload keeps the same language
                try { localStorage.setItem('language', currentLanguage); } catch (_) {}
                // Update the page title to the active language
                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle) {
                    pageTitle.textContent = currentLanguage === 'sq'
                        ? 'MS Doors&Windows | Zgjidhje Arkitekturore Premium'
                        : currentLanguage === 'en'
                        ? 'MS Doors&Windows | Premium Architectural Solutions'
                        : currentLanguage === 'fr'
                        ? 'MS Doors&Windows | Solutions Architecturales Premium'
                        : 'MS Doors&Windows | Premium Architekturlösungen';
                }
                updateChatbotLanguage();
                // If modal is open, update its language
                setTimeout(() => {
                    const doorModal = document.querySelector('.door-modal');
                    if (doorModal) {
                        if (currentLanguage === 'en') {
                            // Update modal to English
                            const orderFormLabels = document.querySelectorAll('.door-order-form label');
                            const englishOrderLabels = ['Your Name *', 'Email *', 'Phone *', 'Address', 'Additional Notes'];
                            const englishOrderPlaceholder = 'Describe your specific requirements...';
                            const englishOrderButton = 'Submit Order';
                            orderFormLabels.forEach((label, index) => {
                                if (index < englishOrderLabels.length) {
                                    label.textContent = englishOrderLabels[index];
                                }
                            });
                            const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                            if (orderTextarea) {
                                orderTextarea.placeholder = englishOrderPlaceholder;
                            }
                            const orderButton = document.querySelector('.door-order-btn');
                            if (orderButton) {
                                orderButton.textContent = englishOrderButton;
                            }
                            // Modal section titles
                            const descTitle = doorModal.querySelector('.door-description h3');
                            if (descTitle) descTitle.textContent = 'Description';
                            const featuresTitle = doorModal.querySelector('.door-features h3');
                            if (featuresTitle) featuresTitle.textContent = 'Features';
                            const orderTitle = doorModal.querySelector('.door-order h3');
                            if (orderTitle) orderTitle.textContent = 'Place Order';
                        } else if (currentLanguage === 'fr') {
                            // Update modal to French
                            const orderFormLabels = document.querySelectorAll('.door-order-form label');
                            const frenchOrderLabels = ['Votre Nom *', 'Email *', 'Téléphone *', 'Adresse', 'Notes Supplémentaires'];
                            const frenchOrderPlaceholder = 'Décrivez vos exigences spécifiques...';
                            const frenchOrderButton = 'Soumettre la Commande';
                            orderFormLabels.forEach((label, index) => {
                                if (index < frenchOrderLabels.length) {
                                    label.textContent = frenchOrderLabels[index];
                                }
                            });
                            const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                            if (orderTextarea) {
                                orderTextarea.placeholder = frenchOrderPlaceholder;
                            }
                            const orderButton = document.querySelector('.door-order-btn');
                            if (orderButton) {
                                orderButton.textContent = frenchOrderButton;
                            }
                            // Modal section titles
                            const descTitle = doorModal.querySelector('.door-description h3');
                            if (descTitle) descTitle.textContent = 'Description';
                            const featuresTitle = doorModal.querySelector('.door-features h3');
                            if (featuresTitle) featuresTitle.textContent = 'Caractéristiques';
                            const orderTitle = doorModal.querySelector('.door-order h3');
                            if (orderTitle) orderTitle.textContent = 'Passer la Commande';
                        } else if (currentLanguage === 'de') {
                            // Update modal to German
                            const orderFormLabels = document.querySelectorAll('.door-order-form label');
                            const germanOrderLabels = ['Ihr Name *', 'E-Mail *', 'Telefon *', 'Adresse', 'Zusätzliche Notizen'];
                            const germanOrderPlaceholder = 'Beschreiben Sie Ihre spezifischen Anforderungen...';
                            const germanOrderButton = 'Bestellung Absenden';
                            orderFormLabels.forEach((label, index) => {
                                if (index < germanOrderLabels.length) {
                                    label.textContent = germanOrderLabels[index];
                                }
                            });
                            const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                            if (orderTextarea) {
                                orderTextarea.placeholder = germanOrderPlaceholder;
                            }
                            const orderButton = document.querySelector('.door-order-btn');
                            if (orderButton) {
                                orderButton.textContent = germanOrderButton;
                            }
                            // Modal section titles
                            const descTitle = doorModal.querySelector('.door-description h3');
                            if (descTitle) descTitle.textContent = 'Beschreibung';
                            const featuresTitle = doorModal.querySelector('.door-features h3');
                            if (featuresTitle) featuresTitle.textContent = 'Eigenschaften';
                            const orderTitle = doorModal.querySelector('.door-order h3');
                            if (orderTitle) orderTitle.textContent = 'Bestellung Aufgeben';
                        } else {
                            // Update modal to Albanian
                            const orderFormLabels = document.querySelectorAll('.door-order-form label');
                            const albanianOrderLabels = ['Emri Juaj *', 'Email *', 'Telefoni *', 'Adresa', 'Shënime Shtesë'];
                            const albanianOrderPlaceholder = 'Përshkruani kërkesat tuaja specifike...';
                            const albanianOrderButton = 'Dërgo Porosinë';
                            orderFormLabels.forEach((label, index) => {
                                if (index < albanianOrderLabels.length) {
                                    label.textContent = albanianOrderLabels[index];
                                }
                            });
                            const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                            if (orderTextarea) {
                                orderTextarea.placeholder = albanianOrderPlaceholder;
                            }
                            const orderButton = document.querySelector('.door-order-btn');
                            if (orderButton) {
                                orderButton.textContent = albanianOrderButton;
                            }
                            // Modal section titles
                            const descTitle = doorModal.querySelector('.door-description h3');
                            if (descTitle) descTitle.textContent = 'Përshkrimi';
                            const featuresTitle = doorModal.querySelector('.door-features h3');
                            if (featuresTitle) featuresTitle.textContent = 'Karakteristikat';
                            const orderTitle = doorModal.querySelector('.door-order h3');
                            if (orderTitle) orderTitle.textContent = 'Bëj Porosinë';
                        }
                    }
                }, 100);
            });
        } else {
            console.error('Language toggle button not found');
        }

                        // Hero video behavior:
                        //   - Desktop (>768px): autoplay muted/looping. Play
                        //     button stays hidden (CSS display:none).
                        //   - Mobile (≤768px): do NOT autoplay (mobile OSes
                        //     block autoplay anyway and would just freeze on
                        //     frame 1). Show a custom centered play button.
                        //     Tapping it starts the video and hides the button.
                        document.addEventListener('DOMContentLoaded', () => {
                            const heroVideo = document.getElementById('heroVideo');
                            const playBtn = document.getElementById('heroPlayBtn');
                            if (!heroVideo) return;

                            heroVideo.muted = true;
                            heroVideo.playsInline = true;
                            heroVideo.setAttribute('playsinline', '');
                            heroVideo.setAttribute('webkit-playsinline', '');
                            heroVideo.removeAttribute('controls');

                            const isMobile = window.innerWidth <= 768;

                            const startPlayback = () => {
                                const p = heroVideo.play();
                                if (p && typeof p.then === 'function') {
                                    return p.catch(() => {});
                                }
                            };

                            const hidePlayBtn = () => {
                                if (playBtn) playBtn.classList.add('hidden');
                            };

                            // Hide the play button as soon as the video
                            // actually starts playing (covers desktop autoplay,
                            // and ensures mobile button vanishes the moment the
                            // user taps it).
                            heroVideo.addEventListener('playing', hidePlayBtn, { once: false });

                            if (isMobile) {
                                // On mobile: do NOT try to autoplay. Wait for
                                // user tap on the custom play button.
                                if (playBtn) {
                                    playBtn.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        startPlayback();
                                    }, { passive: false });
                                }
                            } else {
                                // On desktop: try autoplay (muted). If it
                                // works, the 'playing' event hides the button
                                // (no-op because it's display:none anyway).
                                // If it doesn't work for any reason, the button
                                // also serves as a manual fallback.
                                if (playBtn) {
                                    playBtn.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        startPlayback();
                                    }, { passive: false });
                                }
                                startPlayback();
                            }
                        });
                
                        // Translation functions
                        function translateToEnglish() {
                            // Navigation
                            document.querySelector('a[href="#home"]').textContent = 'Home';
                            document.querySelector('a[href="#services"]').textContent = 'Services';
                            document.querySelector('a[href="#catalog"]').textContent = 'Catalog';
                            document.querySelector('a[href="#video"]').textContent = 'Exhibition';
                            document.querySelector('a[href="#gallery"]').textContent = 'Projects';
                            document.querySelector('a[href="#developments"]').textContent = 'Developments';
                            document.querySelector('a[href="#contact"]').textContent = 'Contact';
                            
                            // Hero section
                            document.querySelector('.hero h1').textContent = 'MS DOORS & WINDOWS';
                            document.querySelector('.hero p').textContent = 'Premium solutions for customized doors and windows, crafted with mastery for your dream homes';
                            document.querySelector('.hero .btn').textContent = 'Explore Collections';
                            
                            // Services section
                            document.querySelector('.services .section-title').textContent = 'OUR SERVICES';
                            document.querySelectorAll('.service-title')[0].textContent = 'Customized Doors';
                            document.querySelectorAll('.service-title')[1].textContent = 'Window Systems';
                            document.querySelectorAll('.service-title')[2].textContent = 'Professional Installation';
                            
                            // Service descriptions
                            document.querySelectorAll('.service-desc')[0].textContent = 'Unique designs created according to your specific needs and style preferences';
                            document.querySelectorAll('.service-desc')[1].textContent = 'Advanced solutions for windows with high energy efficiency';
                            document.querySelectorAll('.service-desc')[2].textContent = 'Perfect installation by our technicians with years of experience';
                            
                            // Catalog section
                            document.querySelector('.catalog .section-title').textContent = 'OUR EXCLUSIVE COLLECTIONS';
                            document.getElementById('showMoreCatalog').textContent = 'Show More';
                            
                            // Catalog items
                            const catalogTitles = document.querySelectorAll('.catalog-info h3');
                            const catalogDescriptions = document.querySelectorAll('.catalog-info p');
                            const catalogOrderButtons = document.querySelectorAll('.catalog-order-btn');
                            
                            const englishTitles = [
                                'Aurora',
                                'Elegance',
                                'Privata',
                                'Polaris',
                                'Verticalis',
                                'Architectura',
                                'Crystal',
                                'Minimalis'
                            ];
                            
                            const englishDescriptions = [
                                'Modern doors designed with aluminum/metal materials with side windows (sidelight)',
                                'Elegant doors with full panel and horizontal inox decor for a sophisticated look',
                                'Doors with viewing stripes that provide privacy while maintaining natural lighting',
                                'Doors with polar design that combines elegance and functionality',
                                'Doors with vertical lines that add height and elegance to your space',
                                'Arched doors that bring a unique architectural touch to your home',
                                'Crystal view doors that shine in light and add sparkle to your space',
                                'Doors with simple and elegant look, perfect for minimal style'
                            ];
                            
                            catalogTitles.forEach((title, index) => {
                                if (index < englishTitles.length) {
                                    title.textContent = englishTitles[index];
                                }
                            });
                            
                            catalogDescriptions.forEach((desc, index) => {
                                if (index < englishDescriptions.length) {
                                    desc.textContent = englishDescriptions[index];
                                }
                            });
                            
                            // Update order button text
                            catalogOrderButtons.forEach(button => {
                                button.textContent = 'Place Order';
                            });
                            
                            // Also update any hidden buttons that might not be selected
                            const allCatalogButtons = document.querySelectorAll('.catalog-order-btn');
                            allCatalogButtons.forEach(button => {
                                button.textContent = 'Place Order';
                            });
                            
                            // Video section
                            document.querySelector('.video-section .section-title').textContent = 'ARTISANAL MASTERY';
                            document.querySelector('.video-section p').textContent = 'Watch the detailed process behind our premium architectural elements';
                            
                            
                            // Gallery section
                            document.querySelector('.gallery .section-title').textContent = 'OUR PROJECTS';
                            document.getElementById('showMoreGallery').textContent = 'Show More';
                            
                            // Partners section
                            const partnersSection = document.querySelector('#partners');
                            if (partnersSection) {
                                partnersSection.querySelector('.section-title').textContent = 'OUR PARTNERS';
                            }
                            
                            // Gallery captions
                            const galleryCaptions = document.querySelectorAll('.gallery-caption');
                            const englishCaptions = [
                                'Project 1 - (Completed project in Rothrist-Switzerland)',
                                'Project 2 ',
                                'Project 3 ',
                                'Project 4 ',
                                'Project 5 ',
                                'Project 6',
                                'Project 7 ',
                                'Project 8 ',
                                'Project 9 ',
                                'Project 10 ',
                                'Project 11 ',
                                'Project 12 '
                            ];
                            
                            galleryCaptions.forEach((caption, index) => {
                                if (index < englishCaptions.length) {
                                    caption.textContent = englishCaptions[index];
                                }
                            });
                            
                            // Developments section
                            document.querySelector('.developments .section-title').textContent = 'OUR DEVELOPMENTS';
                            document.querySelector('.developments p').textContent = 'Growth and expansion of our business through import-export and new developments';
                            
                            // Development items
                            const developmentTitles = document.querySelectorAll('.development-item h3');
                            const developmentDescriptions = document.querySelectorAll('.development-item p');
                            
                            const englishDevTitles = [
                                'Completed Projects',
                                'Export Countries',
                                'New Factory',
                                'Employed Workers',
                                'Exports',
                                'Exports'
                            ];
                            
                            const englishDevDescriptions = [
                                'Successful projects throughout Kosovo',
                                'Export to 25 different countries worldwide',
                                'Factory built for expanded production',
                                'Expanded team with qualified specialists',
                                'Over 100,000 exports worldwide',
                                'Over 100,000 exports worldwide'
                            ];
                            
                            developmentTitles.forEach((title, index) => {
                                if (index < englishDevTitles.length) {
                                    title.textContent = englishDevTitles[index];
                                }
                            });
                            
                            developmentDescriptions.forEach((desc, index) => {
                                if (index < englishDevDescriptions.length) {
                                    desc.textContent = englishDevDescriptions[index];
                                }
                            });
                            
                            // Contact section
                            document.querySelector('.contact .section-title').textContent = 'CONSULT WITH OUR EXPERTS';
                            document.querySelector('.contact-info h3').textContent = 'Start Your Architectural Journey';
                            document.querySelector('.contact-info p').textContent = 'Our team of specialists is ready to guide you through the process of choosing the perfect doors and windows for your project. Whether you are building new or renovating, we offer tailored solutions to meet your exact requirements.';
                            document.querySelector('.submit-btn').textContent = 'Request Consultation';
                            
                            // Contact details
                            const contactDetails = document.querySelectorAll('.contact-detail p');
                            if (contactDetails.length >= 3) {
                                contactDetails[0].innerHTML = '<strong>Address:</strong> Skifteraj, 61000, Kosovo';
                                contactDetails[1].innerHTML = '<strong>Phone:</strong> +377 44 877 682';
                                contactDetails[2].innerHTML = '<strong>Email:</strong> halitisebastian1@gmail.com';
                            }
                            
                            // Contact form labels
                            document.querySelector('label[for="name"]').textContent = 'Your Name';
                            document.querySelector('label[for="email"]').textContent = 'Email Address';
                            document.querySelector('label[for="phone"]').textContent = 'Phone Number';
                            document.querySelector('label[for="message"]').textContent = 'Project Details';
                            
                            // Footer links
                            const footerLinks = document.querySelectorAll('.footer-links a');
                            const englishFooterLinks = [
                                'Home', 'Services', 'Catalog', 'Exhibition', 'Projects', 
                                'Developments', 'Contact', 'Privacy Policy', 'Terms of Service'
                            ];
                            
                            footerLinks.forEach((link, index) => {
                                if (index < englishFooterLinks.length) {
                                    link.textContent = englishFooterLinks[index];
                                }
                            });

                            // Copyright + "Created by" credit
                            const copyrightTextEl = document.getElementById('copyrightText');
                            const webmakersCreditTextEl = document.getElementById('webmakersCreditText');
                            if (copyrightTextEl) copyrightTextEl.textContent = 'All rights reserved.';
                            if (webmakersCreditTextEl) webmakersCreditTextEl.textContent = 'Created by';

                            // Translate door modal if open
                            const doorModal = document.querySelector('.door-modal');
                            if (doorModal) {
                                const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                const englishOrderLabels = ['Your Name *', 'Email *', 'Phone *', 'Address', 'Additional Notes'];
                                const englishOrderPlaceholder = 'Describe your specific requirements...';
                                const englishOrderButton = 'Submit Order';
                
                                if (orderFormLabels.length > 0) {
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < englishOrderLabels.length) {
                                            label.textContent = englishOrderLabels[index];
                                        }
                                    });
                                    
                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = englishOrderPlaceholder;
                                    }
                                    
                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = englishOrderButton;
                                    }
                                }
                            }
                                                }

                        function translateToFrench() {
                            // Navigation
                            document.querySelector('a[href="#home"]').textContent = 'Accueil';
                            document.querySelector('a[href="#services"]').textContent = 'Services';
                            document.querySelector('a[href="#catalog"]').textContent = 'Catalogue';
                            document.querySelector('a[href="#video"]').textContent = 'Exposition';
                            document.querySelector('a[href="#gallery"]').textContent = 'Projets';
                            document.querySelector('a[href="#developments"]').textContent = 'Développements';
                            document.querySelector('a[href="#contact"]').textContent = 'Contact';
                            
                            // Hero section
                            document.querySelector('.hero h1').textContent = 'MS DOORS & WINDOWS';
                            document.querySelector('.hero p').textContent = 'Solutions premium pour des portes et fenêtres personnalisées, créées avec maîtrise pour vos maisons de rêve';
                            document.querySelector('.hero .btn').textContent = 'Explorer les Collections';
                            
                            // Services section
                            document.querySelector('.services .section-title').textContent = 'NOS SERVICES';
                            document.querySelectorAll('.service-title')[0].textContent = 'Portes Personnalisées';
                            document.querySelectorAll('.service-title')[1].textContent = 'Systèmes de Fenêtres';
                            document.querySelectorAll('.service-title')[2].textContent = 'Installation Professionnelle';
                            
                            // Service descriptions
                            document.querySelectorAll('.service-desc')[0].textContent = 'Designs uniques créés selon vos besoins spécifiques et préférences de style';
                            document.querySelectorAll('.service-desc')[1].textContent = 'Solutions avancées pour fenêtres à haute efficacité énergétique';
                            document.querySelectorAll('.service-desc')[2].textContent = 'Installation parfaite par nos techniciens avec des années d\'expérience';
                            
                            // Catalog section
                            document.querySelector('.catalog .section-title').textContent = 'NOS COLLECTIONS EXCLUSIVES';
                            document.getElementById('showMoreCatalog').textContent = 'Afficher Plus';
                            
                            // Catalog items
                            const catalogTitles = document.querySelectorAll('.catalog-info h3');
                            const catalogDescriptions = document.querySelectorAll('.catalog-info p');
                            const catalogOrderButtons = document.querySelectorAll('.catalog-order-btn');
                            
                            const frenchTitles = [
                                'Aurora',
                                'Elegance',
                                'Privata',
                                'Polaris',
                                'Verticalis',
                                'Architectura',
                                'Crystal',
                                'Minimalis'
                            ];
                            
                            const frenchDescriptions = [
                                'Portes modernes conçues avec des matériaux aluminium/métal avec fenêtres latérales (sidelight)',
                                'Portes élégantes avec panneau complet et décor inox horizontal pour un look sophistiqué',
                                'Portes avec rayures de vision qui offrent l\'intimité tout en conservant l\'éclairage naturel',
                                'Portes avec design polaire qui combine élégance et fonctionnalité',
                                'Portes avec lignes verticales qui ajoutent hauteur et élégance à votre espace',
                                'Portes arquées qui apportent une touche architecturale unique à votre maison',
                                'Portes à vue cristal qui brillent dans la lumière et ajoutent de l\'éclat à votre espace',
                                'Portes avec look simple et élégant, parfaites pour le style minimal'
                            ];
                            
                            catalogTitles.forEach((title, index) => {
                                if (index < frenchTitles.length) {
                                    title.textContent = frenchTitles[index];
                                }
                            });
                            
                            catalogDescriptions.forEach((desc, index) => {
                                if (index < frenchDescriptions.length) {
                                    desc.textContent = frenchDescriptions[index];
                                }
                            });
                            
                            // Update order button text
                            catalogOrderButtons.forEach(button => {
                                button.textContent = 'Passer la Commande';
                            });
                            
                            // Also update any hidden buttons that might not be selected
                            const allCatalogButtons = document.querySelectorAll('.catalog-order-btn');
                            allCatalogButtons.forEach(button => {
                                button.textContent = 'Passer la Commande';
                            });
                            
                            // Video section
                            document.querySelector('.video-section .section-title').textContent = 'MAÎTRISE ARTISANALE';
                            document.querySelector('.video-section p').textContent = 'Regardez le processus détaillé derrière nos éléments architecturaux premium';
                            
                            
                            // Gallery section
                            document.querySelector('.gallery .section-title').textContent = 'NOS PROJETS';
                            document.getElementById('showMoreGallery').textContent = 'Afficher Plus';
                            
                            // Partners section
                            const partnersSection = document.querySelector('#partners');
                            if (partnersSection) {
                                partnersSection.querySelector('.section-title').textContent = 'NOS PARTENAIRES';
                            }
                            
                            // Gallery captions
                            const galleryCaptions = document.querySelectorAll('.gallery-caption');
                            const frenchCaptions = [
                                'Projet 1 - (Projet realisé à Rothrist-Suisse)',
                                'Projet 2 ',
                                'Projet 3 ',
                                'Projet 4 ',
                                'Projet 5 ',
                                'Projet 6 ',
                                'Projet 7 ',
                                'Projet 8 ',
                                'Projet 9 ',
                                'Projet 10',
                                'Projet 11 ',
                                'Projet 12 '
                            ];
                            
                            galleryCaptions.forEach((caption, index) => {
                                if (index < frenchCaptions.length) {
                                    caption.textContent = frenchCaptions[index];
                                }
                            });
                            
                            // Developments section
                            document.querySelector('.developments .section-title').textContent = 'NOS DÉVELOPPEMENTS';
                            document.querySelector('.developments p').textContent = 'Croissance et expansion de notre entreprise à travers l\'import-export et de nouveaux développements';
                            
                            // Development items
                            const developmentTitles = document.querySelectorAll('.development-item h3');
                            const developmentDescriptions = document.querySelectorAll('.development-item p');
                            
                            const frenchDevTitles = [
                                'Projets Terminés',
                                'Pays d\'Exportation',
                                'Nouvelle Usine',
                                'Travailleurs Employés',
                                'Exportations',
                                'Exportations'
                            ];
                            
                            const frenchDevDescriptions = [
                                'Projets réussis dans tout le Kosovo',
                                'Export vers 25 pays différents dans le monde',
                                'Usine construite pour une production élargie',
                                'Équipe élargie avec des spécialistes qualifiés',
                                'Plus de 100 000 exportations dans le monde',
                                'Plus de 100 000 exportations dans le monde'
                            ];
                            
                            developmentTitles.forEach((title, index) => {
                                if (index < frenchDevTitles.length) {
                                    title.textContent = frenchDevTitles[index];
                                }
                            });
                            
                            developmentDescriptions.forEach((desc, index) => {
                                if (index < frenchDevDescriptions.length) {
                                    desc.textContent = frenchDevDescriptions[index];
                                }
                            });
                            
                            // Contact section
                            document.querySelector('.contact .section-title').textContent = 'CONSULTEZ NOS EXPERTS';
                            document.querySelector('.contact-info h3').textContent = 'Commencez Votre Voyage Architectural';
                            document.querySelector('.contact-info p').textContent = 'Notre équipe de spécialistes est prête à vous guider dans le processus de choix des portes et fenêtres parfaites pour votre projet. Que vous construisiez du neuf ou rénoviez, nous offrons des solutions sur mesure pour répondre à vos exigences exactes.';
                            document.querySelector('.submit-btn').textContent = 'Demander Consultation';
                            
                            // Contact details
                            const contactDetails = document.querySelectorAll('.contact-detail p');
                            if (contactDetails.length >= 3) {
                                contactDetails[0].innerHTML = '<strong>Adresse:</strong> Skifteraj, 61000, Kosovo';
                                contactDetails[1].innerHTML = '<strong>Téléphone:</strong> +377 44 877 682';
                                contactDetails[2].innerHTML = '<strong>Email:</strong> halitisebastian1@gmail.com';
                            }
                            
                            // Contact form labels
                            document.querySelector('label[for="name"]').textContent = 'Votre Nom';
                            document.querySelector('label[for="email"]').textContent = 'Adresse Email';
                            document.querySelector('label[for="phone"]').textContent = 'Numéro de Téléphone';
                            document.querySelector('label[for="message"]').textContent = 'Détails du Projet';
                            
                            // Footer links
                            const footerLinks = document.querySelectorAll('.footer-links a');
                            const frenchFooterLinks = [
                                'Accueil', 'Services', 'Catalogue', 'Exposition', 'Projets', 
                                'Développements', 'Contact', 'Politique de Confidentialité', 'Conditions de Service'
                            ];
                            
                            footerLinks.forEach((link, index) => {
                                if (index < frenchFooterLinks.length) {
                                    link.textContent = frenchFooterLinks[index];
                                }
                            });

                            // Copyright + "Created by" credit
                            const copyrightTextEl = document.getElementById('copyrightText');
                            const webmakersCreditTextEl = document.getElementById('webmakersCreditText');
                            if (copyrightTextEl) copyrightTextEl.textContent = 'Tous droits réservés.';
                            if (webmakersCreditTextEl) webmakersCreditTextEl.textContent = 'Conçu par';

                            // Translate door modal if open
                            const doorModal = document.querySelector('.door-modal');
                            if (doorModal) {
                                const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                const frenchOrderLabels = ['Votre Nom *', 'Email *', 'Téléphone *', 'Adresse', 'Notes Supplémentaires'];
                                const frenchOrderPlaceholder = 'Décrivez vos exigences spécifiques...';
                                const frenchOrderButton = 'Soumettre la Commande';

                                if (orderFormLabels.length > 0) {
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < frenchOrderLabels.length) {
                                            label.textContent = frenchOrderLabels[index];
                                        }
                                    });

                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = frenchOrderPlaceholder;
                                    }

                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = frenchOrderButton;
                                    }
                                }
                            }
                        }

                        function translateToGerman() {
                            // Navigation
                            document.querySelector('a[href="#home"]').textContent = 'Startseite';
                            document.querySelector('a[href="#services"]').textContent = 'Dienstleistungen';
                            document.querySelector('a[href="#catalog"]').textContent = 'Katalog';
                            document.querySelector('a[href="#video"]').textContent = 'Ausstellung';
                            document.querySelector('a[href="#gallery"]').textContent = 'Projekte';
                            document.querySelector('a[href="#developments"]').textContent = 'Entwicklungen';
                            document.querySelector('a[href="#contact"]').textContent = 'Kontakt';

                            // Hero section
                            document.querySelector('.hero h1').textContent = 'MS DOORS & WINDOWS';
                            document.querySelector('.hero p').textContent = 'Premium-Lösungen für maßgeschneiderte Türen und Fenster, mit Meisterhand für Ihre Traumhäuser gefertigt';
                            document.querySelector('.hero .btn').textContent = 'Kollektionen Entdecken';

                            // Services section
                            document.querySelector('.services .section-title').textContent = 'UNSERE DIENSTLEISTUNGEN';
                            document.querySelectorAll('.service-title')[0].textContent = 'Maßgefertigte Türen';
                            document.querySelectorAll('.service-title')[1].textContent = 'Fenstersysteme';
                            document.querySelectorAll('.service-title')[2].textContent = 'Professionelle Montage';

                            // Service descriptions
                            document.querySelectorAll('.service-desc')[0].textContent = 'Einzigartige Designs, die nach Ihren spezifischen Bedürfnissen und Stilvorlieben erstellt werden';
                            document.querySelectorAll('.service-desc')[1].textContent = 'Fortschrittliche Lösungen für Fenster mit hoher Energieeffizienz';
                            document.querySelectorAll('.service-desc')[2].textContent = 'Perfekte Montage durch unsere Techniker mit langjähriger Erfahrung';

                            // Catalog section
                            document.querySelector('.catalog .section-title').textContent = 'UNSERE EXKLUSIVEN KOLLEKTIONEN';
                            document.getElementById('showMoreCatalog').textContent = 'Mehr Anzeigen';

                            // Catalog items
                            const catalogTitles = document.querySelectorAll('.catalog-info h3');
                            const catalogDescriptions = document.querySelectorAll('.catalog-info p');
                            const catalogOrderButtons = document.querySelectorAll('.catalog-order-btn');

                            const germanTitles = [
                                'Aurora',
                                'Elegance',
                                'Privata',
                                'Polaris',
                                'Verticalis',
                                'Architectura',
                                'Crystal',
                                'Minimalis'
                            ];

                            const germanDescriptions = [
                                'Moderne Türen aus Aluminium-/Metallmaterialien mit Seitenfenstern (Sidelight).',
                                'Elegante Türen mit voller Platte und horizontalem Inox-Dekor für einen raffinierten Look.',
                                'Türen mit Sichtstreifen, die Privatsphäre bieten und gleichzeitig natürliches Licht erhalten.',
                                'Türen mit polar-Design, das Eleganz und Funktionalität vereint.',
                                'Türen mit vertikalen Linien, die Ihrem Raum Höhe und Eleganz verleihen.',
                                'Gewölbte Türen, die Ihrem Zuhause eine einzigartige architektonische Note verleihen.',
                                'Kristallblick-Türen, die im Licht glänzen und Ihrem Raum Glanz verleihen.',
                                'Türen mit einfachem und elegantem Look, perfekt für den minimalistischen Stil.'
                            ];

                            catalogTitles.forEach((title, index) => {
                                if (index < germanTitles.length) {
                                    title.textContent = germanTitles[index];
                                }
                            });

                            catalogDescriptions.forEach((desc, index) => {
                                if (index < germanDescriptions.length) {
                                    desc.textContent = germanDescriptions[index];
                                }
                            });

                            // Update order button text
                            catalogOrderButtons.forEach(button => {
                                button.textContent = 'Bestellung Aufgeben';
                            });

                            // Also update any hidden buttons that might not be selected
                            const allCatalogButtons = document.querySelectorAll('.catalog-order-btn');
                            allCatalogButtons.forEach(button => {
                                button.textContent = 'Bestellung Aufgeben';
                            });

                            // Video section
                            document.querySelector('.video-section .section-title').textContent = 'HANDWERKLICHE MEISTERLEISTUNG';
                            document.querySelector('.video-section p').textContent = 'Sehen Sie den detaillierten Prozess hinter unseren Premium-Architekturelementen';

                            // Gallery section
                            document.querySelector('.gallery .section-title').textContent = 'UNSERE PROJEKTE';
                            document.getElementById('showMoreGallery').textContent = 'Mehr Anzeigen';

                            // Partners section
                            const partnersSection = document.querySelector('#partners');
                            if (partnersSection) {
                                partnersSection.querySelector('.section-title').textContent = 'UNSERE PARTNER';
                            }

                            // Gallery captions
                            const galleryCaptions = document.querySelectorAll('.gallery-caption');
                            const germanCaptions = [
                                'Projekt 1 - (Realisiertes Projekt in Rothrist-Schweiz)',
                                'Projekt 2 ',
                                'Projekt 3 ',
                                'Projekt 4 ',
                                'Projekt 5 ',
                                'Projekt 6',
                                'Projekt 7 ',
                                'Projekt 8 ',
                                'Projekt 9 ',
                                'Projekt 10 ',
                                'Projekt 11 ',
                                'Projekt 12 '
                            ];

                            galleryCaptions.forEach((caption, index) => {
                                if (index < germanCaptions.length) {
                                    caption.textContent = germanCaptions[index];
                                }
                            });

                            // Developments section
                            document.querySelector('.developments .section-title').textContent = 'UNSERE ENTWICKLUNGEN';
                            document.querySelector('.developments p').textContent = 'Wachstum und Expansion unseres Unternehmens durch Import-Export und neue Entwicklungen';

                            // Development items
                            const developmentTitles = document.querySelectorAll('.development-item h3');
                            const developmentDescriptions = document.querySelectorAll('.development-item p');

                            const germanDevTitles = [
                                'Abgeschlossene Projekte',
                                'Exportländer',
                                'Neue Fabrik',
                                'Beschäftigte Mitarbeiter',
                                'Exporte',
                                'Exporte'
                            ];

                            const germanDevDescriptions = [
                                'Erfolgreiche Projekte im gesamten Kosovo',
                                'Export in 25 verschiedene Länder weltweit',
                                'Fabrik für erweiterte Produktion gebaut',
                                'Erweitertes Team mit qualifizierten Spezialisten',
                                'Über 100.000 Exporte weltweit',
                                'Über 100.000 Exporte weltweit'
                            ];

                            developmentTitles.forEach((title, index) => {
                                if (index < germanDevTitles.length) {
                                    title.textContent = germanDevTitles[index];
                                }
                            });

                            developmentDescriptions.forEach((desc, index) => {
                                if (index < germanDevDescriptions.length) {
                                    desc.textContent = germanDevDescriptions[index];
                                }
                            });

                            // Contact section
                            document.querySelector('.contact .section-title').textContent = 'BERATEN SIE SICH MIT UNSEREN EXPERTEN';
                            document.querySelector('.contact-info h3').textContent = 'Beginnen Sie Ihre Architektonische Reise';
                            document.querySelector('.contact-info p').textContent = 'Unser Team von Spezialisten ist bereit, Sie durch den Prozess der Auswahl der perfekten Türen und Fenster für Ihr Projekt zu führen. Ob Sie neu bauen oder renovieren, wir bieten maßgeschneiderte Lösungen, die genau Ihren Anforderungen entsprechen.';
                            document.querySelector('.submit-btn').textContent = 'Beratung Anfragen';

                            // Contact details
                            const contactDetails = document.querySelectorAll('.contact-detail p');
                            if (contactDetails.length >= 3) {
                                contactDetails[0].innerHTML = '<strong>Adresse:</strong> Skifteraj, 61000, Kosovo';
                                contactDetails[1].innerHTML = '<strong>Telefon:</strong> +377 44 877 682';
                                contactDetails[2].innerHTML = '<strong>E-Mail:</strong> halitisebastian1@gmail.com';
                            }

                            // Contact form labels
                            document.querySelector('label[for="name"]').textContent = 'Ihr Name';
                            document.querySelector('label[for="email"]').textContent = 'E-Mail-Adresse';
                            document.querySelector('label[for="phone"]').textContent = 'Telefonnummer';
                            document.querySelector('label[for="message"]').textContent = 'Projektdetails';

                            // Footer links
                            const footerLinks = document.querySelectorAll('.footer-links a');
                            const germanFooterLinks = [
                                'Startseite', 'Dienstleistungen', 'Katalog', 'Ausstellung', 'Projekte',
                                'Entwicklungen', 'Kontakt', 'Datenschutzrichtlinie', 'Nutzungsbedingungen'
                            ];

                            footerLinks.forEach((link, index) => {
                                if (index < germanFooterLinks.length) {
                                    link.textContent = germanFooterLinks[index];
                                }
                            });

                            // Copyright + "Created by" credit
                            const copyrightTextEl = document.getElementById('copyrightText');
                            const webmakersCreditTextEl = document.getElementById('webmakersCreditText');
                            if (copyrightTextEl) copyrightTextEl.textContent = 'Alle Rechte vorbehalten.';
                            if (webmakersCreditTextEl) webmakersCreditTextEl.textContent = 'Erstellt von';

                            // Translate door modal if open
                            const doorModal = document.querySelector('.door-modal');
                            if (doorModal) {
                                const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                const germanOrderLabels = ['Ihr Name *', 'E-Mail *', 'Telefon *', 'Adresse', 'Zusätzliche Notizen'];
                                const germanOrderPlaceholder = 'Beschreiben Sie Ihre spezifischen Anforderungen...';
                                const germanOrderButton = 'Bestellung Absenden';

                                if (orderFormLabels.length > 0) {
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < germanOrderLabels.length) {
                                            label.textContent = germanOrderLabels[index];
                                        }
                                    });

                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = germanOrderPlaceholder;
                                    }

                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = germanOrderButton;
                                    }
                                }
                            }
                        }

                        function translateToAlbanian() {
                            // Navigation
                            document.querySelector('a[href="#home"]').textContent = 'Kryefaqja';
                            document.querySelector('a[href="#services"]').textContent = 'Shërbimet';
                            document.querySelector('a[href="#catalog"]').textContent = 'Katalogu';
                            document.querySelector('a[href="#video"]').textContent = 'Ekspozita';
                            document.querySelector('a[href="#gallery"]').textContent = 'Projektet';
                            document.querySelector('a[href="#developments"]').textContent = 'Zhvillimet';
                            document.querySelector('a[href="#contact"]').textContent = 'Kontakti';
                            
                            // Hero section
                            document.querySelector('.hero h1').textContent = 'MS DOORS & WINDOWS';
                            document.querySelector('.hero p').textContent = 'Zgjidhje premium për dyer dhe dritare të personalizuara, të krijuara me mjeshtëri për shtëpitë tuaja të ëndrrave';
                            document.querySelector('.hero .btn').textContent = 'Eksploro Koleksionet';
                            
                            // Services section
                            document.querySelector('.services .section-title').textContent = 'SHËRBIMET TONA';
                            document.querySelectorAll('.service-title')[0].textContent = 'Dyer të Personalizuara';
                            document.querySelectorAll('.service-title')[1].textContent = 'Sisteme Dritaresh';
                            document.querySelectorAll('.service-title')[2].textContent = 'Instalim Profesional';
                            
                            // Service descriptions
                            document.querySelectorAll('.service-desc')[0].textContent = 'Dizajne unike të krijuara sipas nevojave tuaja specifike dhe preferencave të stilit';
                            document.querySelectorAll('.service-desc')[1].textContent = 'Zgjidhje të avancuara për dritare me efikasitet të lartë energjetik';
                            document.querySelectorAll('.service-desc')[2].textContent = 'Instalim i përsosur nga teknikët tanë me vite eksperiencë';
                            
                            // Catalog section
                            document.querySelector('.catalog .section-title').textContent = 'KOLEKSIONET TONA EKSKLUZIVE';
                            document.getElementById('showMoreCatalog').textContent = 'Shfaq Më Shumë';
                            
                            // Catalog items
                            const catalogTitles = document.querySelectorAll('.catalog-info h3');
                            const catalogDescriptions = document.querySelectorAll('.catalog-info p');
                            const catalogOrderButtons = document.querySelectorAll('.catalog-order-btn');
                            
                            const albanianTitles = [
                                'Aurora',
                                'Elegance',
                                'Privata',
                                'Polaris',
                                'Verticalis',
                                'Architectura',
                                'Crystal',
                                'Minimalis'
                            ];
                            
                            const albanianDescriptions = [
                                'Dyer moderne të dizajnuara me materiale alumini/metalike me dritare anësore (sidelight)',
                                'Dyer elegante me panel të plotë dhe dekor inox horizontal për një pamje sofistikuar',
                                'Dyer me vija  që ofrojnë privatësi duke ruajtur ndriçimin natyror',
                                'Dyer me dizajn polar që kombinon elegancën dhe funksionalitetin',
                                'Dyer me vija vertikale që shtojnë lartësi dhe elegancë në hapësirën tuaj',
                                'Dyer  që sjellin një prekje arkitekturore unike në shtëpinë tuaj',
                                'Dyer me pamje kristal që shkëlqejnë në dritë dhe shtojnë shkëlqim në hapësirën tuaj',
                                'Dyer me pamje të thjeshtë dhe elegante, perfekte për stil minimal'
                            ];
                            
                            catalogTitles.forEach((title, index) => {
                                if (index < albanianTitles.length) {
                                    title.textContent = albanianTitles[index];
                                }
                            });
                            
                            catalogDescriptions.forEach((desc, index) => {
                                if (index < albanianDescriptions.length) {
                                    desc.textContent = albanianDescriptions[index];
                                }
                            });
                            
                            // Update order button text
                            catalogOrderButtons.forEach(button => {
                                button.textContent = 'Bëj Porosinë';
                            });
                            
                            // Also update any hidden buttons that might not be selected
                            const allCatalogButtons = document.querySelectorAll('.catalog-order-btn');
                            allCatalogButtons.forEach(button => {
                                button.textContent = 'Bëj Porosinë';
                            });
                            
                            // Video section
                            document.querySelector('.video-section .section-title').textContent = 'MJESHTËRIA ARTIZANALE';
                            document.querySelector('.video-section p').textContent = 'Shikoni procesin e hollësishëm pas elementeve tona arkitekturore premium';
                            
                            
                            // Gallery section
                            document.querySelector('.gallery .section-title').textContent = 'PROJEKTET TONA';
                            document.getElementById('showMoreGallery').textContent = 'Shfaq Më Shumë';
                            
                            // Partners section
                            const partnersSection = document.querySelector('#partners');
                            if (partnersSection) {
                                partnersSection.querySelector('.section-title').textContent = 'PARTNERËT TANË';
                            }
                            
                            // Gallery captions
                            const galleryCaptions = document.querySelectorAll('.gallery-caption');
                            const albanianCaptions = [
                                'Projekti 1 - (I realizuar ne Rothrist-Zvicerr)',
                                'Projekti 2',
                                'Projekti 3',
                                'Projekti 4 ',
                                'Projekti 5 ',
                                'Projekti 6 ',
                                'Projekti 7 ',
                                'Projekti 8 ',
                                'Projekti 9',
                                'Projekti 10 ',
                                'Projekti 11 ',
                                'Projekti 12 '
                            ];
                            
                            galleryCaptions.forEach((caption, index) => {
                                if (index < albanianCaptions.length) {
                                    caption.textContent = albanianCaptions[index];
                                }
                            });
                            
                            // Developments section
                            document.querySelector('.developments .section-title').textContent = 'ZHVILLIMET TONA';
                            document.querySelector('.developments p').textContent = 'Rritja dhe ekspansioni i biznesit tonë nëpërmjet import-export dhe zhvillimeve të reja';
                            
                            // Development items
                            const developmentTitles = document.querySelectorAll('.development-item h3');
                            const developmentDescriptions = document.querySelectorAll('.development-item p');
                            
                            const albanianDevTitles = [
                                'Projekte të Përfunduara',
                                'Vende të Eksportit',
                                'Fabrikë e Re',
                                'Punëtorë të Punësuar',
                                'Eksporte',
                                'Eksporte'
                            ];
                            
                            const albanianDevDescriptions = [
                                'Projekte të suksesshme në të gjithë Kosovën',
                                'Eksport në 25 vende të ndryshme në botë',
                                'Fabrikë e ndërtuar për prodhim të zgjeruar',
                                'Ekip i zgjeruar me specialistë të kualifikuar',
                                'Mbi 100,000 eksporte në të gjithë botën',
                                'Mbi 100,000 eksporte në të gjithë botën'
                            ];
                            
                            developmentTitles.forEach((title, index) => {
                                if (index < albanianDevTitles.length) {
                                    title.textContent = albanianDevTitles[index];
                                }
                            });
                            
                            developmentDescriptions.forEach((desc, index) => {
                                if (index < albanianDevDescriptions.length) {
                                    desc.textContent = albanianDevDescriptions[index];
                                }
                            });
                            
                            // Contact section
                            document.querySelector('.contact .section-title').textContent = 'KONSULTOHU ME EKSPERTËT TONË';
                            document.querySelector('.contact-info h3').textContent = 'Fillo Udhetimin Tënd Arkitektural';
                            document.querySelector('.contact-info p').textContent = 'Ekipi ynë i specialistëve është gati t\'ju udhëheqë nëpër procesin e zgjedhjes së dyerve dhe dritareve perfekte për projektin tuaj. Pavarësisht nëse po ndërtoni të reja apo po rinovoni, ne ofrojmë zgjidhje të përshtatura për të përmbushur kërkesat tuaja të sakta.';
                            document.querySelector('.submit-btn').textContent = 'Kërko Konsultim';
                            
                            // Contact details
                            const contactDetails = document.querySelectorAll('.contact-detail p');
                            if (contactDetails.length >= 3) {
                                contactDetails[0].innerHTML = '<strong>Adresa:</strong> Skifteraj, 61000, Kosovë';
                                contactDetails[1].innerHTML = '<strong>Telefoni:</strong> +377 44 877 682';
                                contactDetails[2].innerHTML = '<strong>Email:</strong> halitisebastian1@gmail.com';
                            }
                            
                            // Contact form labels
                            document.querySelector('label[for="name"]').textContent = 'Emri Juaj';
                            document.querySelector('label[for="email"]').textContent = 'Adresa Email';
                            document.querySelector('label[for="phone"]').textContent = 'Numri i Telefonit';
                            document.querySelector('label[for="message"]').textContent = 'Detajet e Projektit';
                            
                            // Footer links
                            const footerLinks = document.querySelectorAll('.footer-links a');
                            const albanianFooterLinks = [
                                'Kryefaqja', 'Shërbimet', 'Katalogu', 'Ekspozita', 'Projektet', 
                                'Zhvillimet', 'Kontakti', 'Politika e Privatësisë', 'Kushtet e Shërbimit'
                            ];
                            
                            footerLinks.forEach((link, index) => {
                                if (index < albanianFooterLinks.length) {
                                    link.textContent = albanianFooterLinks[index];
                                }
                            });

                            // Copyright + "Created by" credit
                            const copyrightTextEl = document.getElementById('copyrightText');
                            const webmakersCreditTextEl = document.getElementById('webmakersCreditText');
                            if (copyrightTextEl) copyrightTextEl.textContent = 'Të gjitha të drejtat e rezervuara.';
                            if (webmakersCreditTextEl) webmakersCreditTextEl.textContent = 'E krijuar nga';

                            // Translate door modal if open
                            const doorModal = document.querySelector('.door-modal');
                            if (doorModal) {
                                const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                const albanianOrderLabels = ['Emri Juaj *', 'Email *', 'Telefoni *', 'Adresa', 'Shënime Shtesë'];
                                const albanianOrderPlaceholder = 'Përshkruani kërkesat tuaja specifike...';
                                const albanianOrderButton = 'Dërgo Porosinë';
                
                                if (orderFormLabels.length > 0) {
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < albanianOrderLabels.length) {
                                            label.textContent = albanianOrderLabels[index];
                                        }
                                    });
                                    
                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = albanianOrderPlaceholder;
                                    }
                                    
                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = albanianOrderButton;
                                    }
                                }
                            }
                        }
                
                        // Theme toggle functionality
                        const themeToggle = document.getElementById('themeToggle');
                        const themeIcon = themeToggle.querySelector('i');
                        
// Set light mode by default
                        document.documentElement.setAttribute('data-theme', 'light');
                        themeIcon.classList.remove('fa-moon');
                        themeIcon.classList.add('fa-sun');
                        localStorage.setItem('theme', 'light');
                        
                        themeToggle.addEventListener('click', () => {
                            const currentTheme = document.documentElement.getAttribute('data-theme');
                            if (currentTheme === 'light') {
                                document.documentElement.setAttribute('data-theme', 'dark');
                                themeIcon.classList.remove('fa-sun');
                                themeIcon.classList.add('fa-moon');
                                localStorage.setItem('theme', 'dark');
                            } else {
                                document.documentElement.setAttribute('data-theme', 'light');
                                themeIcon.classList.remove('fa-moon');
                                themeIcon.classList.add('fa-sun');
                                localStorage.setItem('theme', 'light');
                            }
                        });
                
                        // Add hover animations to elements
                        document.querySelectorAll('.btn, .social-link, .footer-links a, .gallery-item').forEach(el => {
                            el.classList.add('hover-grow');
                        });
                
                        // Add rotation animation to service icons
                        document.querySelectorAll('.service-icon').forEach(icon => {
                            icon.addEventListener('mouseenter', () => {
                                icon.style.transform = 'rotate(15deg)';
                            });
                            icon.addEventListener('mouseleave', () => {
                                icon.style.transform = 'rotate(0deg)';
                            });
                        });
                
                        // Add pulse animation to gallery items on hover
                        document.querySelectorAll('.gallery-item').forEach(item => {
                            item.addEventListener('mouseenter', () => {
                                item.style.animation = 'pulse 1.5s infinite';
                            });
                            item.addEventListener('mouseleave', () => {
                                item.style.animation = '';
                            });
                        });
                
                        // Add animation to section titles
                        document.querySelectorAll('.section-title').forEach(title => {
                            title.addEventListener('mouseenter', () => {
                                title.style.animation = 'floatHorizontal 3s infinite';
                            });
                            title.addEventListener('mouseleave', () => {
                                title.style.animation = '';
                            });
                        });
                
                        // Show more buttons functionality
                        document.getElementById('showMoreCatalog').addEventListener('click', function() {
                            const catalogGrid = document.querySelector('.catalog-grid');
                            const button = this;
                            
                            console.log('Catalog button clicked');
                            console.log('Current catalog items:', catalogGrid.querySelectorAll('.catalog-item').length);
                            console.log('Show all class:', catalogGrid.classList.contains('show-all'));
                            
                            if (catalogGrid.classList.contains('show-all')) {
                                catalogGrid.classList.remove('show-all');
                                button.textContent = currentLanguage === 'sq' ? 'Shfaq Më Shumë' : currentLanguage === 'fr' ? 'Afficher Plus' : currentLanguage === 'de' ? 'Mehr Anzeigen' : 'Show More';
                                // Smooth scroll to top of catalog section
                                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
                            } else {
                                catalogGrid.classList.add('show-all');
                                button.textContent = currentLanguage === 'sq' ? 'Shfaq Më Pak' : currentLanguage === 'fr' ? 'Afficher Moins' : currentLanguage === 'de' ? 'Weniger Anzeigen' : 'Show Less';
                                // Smooth scroll to show the new items
                                setTimeout(() => {
                                    const firstHiddenItem = catalogGrid.querySelector('.catalog-item:nth-child(3)');
                                    console.log('First hidden item:', firstHiddenItem);
                                    if (firstHiddenItem) {
                                        firstHiddenItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }, 100);
                            }
                        });
                
                        document.getElementById('showMoreGallery').addEventListener('click', function() {
                            const galleryGrid = document.querySelector('.gallery-grid');
                            const button = this;
                            
                            if (galleryGrid.classList.contains('show-all')) {
                                galleryGrid.classList.remove('show-all');
                                button.textContent = currentLanguage === 'sq' ? 'Shfaq Më Shumë' : currentLanguage === 'fr' ? 'Afficher Plus' : currentLanguage === 'de' ? 'Mehr Anzeigen' : 'Show More';
                                // Smooth scroll to top of gallery section
                                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                            } else {
                                galleryGrid.classList.add('show-all');
                                button.textContent = currentLanguage === 'sq' ? 'Shfaq Më Pak' : currentLanguage === 'fr' ? 'Afficher Moins' : currentLanguage === 'de' ? 'Weniger Anzeigen' : 'Show Less';
                                // Smooth scroll to show the new items
                                setTimeout(() => {
                                    const firstHiddenItem = galleryGrid.querySelector('.gallery-item:nth-child(7)');
                                    if (firstHiddenItem) {
                                        firstHiddenItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }, 100);
                            }
                        });
                
                        // Door details functionality
                        function openDoorDetails(doorId) {
                            const doorData = {
                                door1: {
                                    title: 'Aurora',
                                    image: 'assets/foto16.png',
                                    description: {
                                        sq: 'Dyer moderne të dizajnuara me materiale alumini/metalike me dritare anësore (sidelight). Perfekt për hyrjen kryesore të shtëpisë suaj.',
                                        en: 'Modern doors designed with aluminum/metal materials with side windows (sidelight). Perfect for your main entrance.',
                                        fr: 'Portes modernes conçues avec des matériaux aluminium/métal avec fenêtres latérales (sidelight). Parfait pour l\'entrée principale de votre maison.',
                                        de: 'Moderne Türen aus Aluminium-/Metallmaterialien mit Seitenfenstern (Sidelight). Perfekt für Ihren Haupteingang.'
                                    },
                                    features: {
                                        sq: [
                                            'Dizajne moderne dhe elegante',
                                            'Materiale alumini/metalike të cilësisë së lartë',
                                            'Dritare anësore (sidelight) për ndriçim natyror',
                                            'Siguri e lartë',
                                            'Instalim profesional',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Modern and elegant designs',
                                            'High quality aluminum/metal materials',
                                            'Side window (sidelight) for natural lighting',
                                            'High security',
                                            'Professional installation',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Designs modernes et élégants',
                                            'Matériaux aluminium/métal de haute qualité',
                                            'Fenêtre latérale (sidelight) pour éclairage naturel',
                                            'Sécurité élevée',
                                            'Installation professionnelle',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Moderne und elegante Designs',
                                            'Hochwertige Aluminium-/Metallmaterialien',
                                            'Seitenfenster (Sidelight) für natürliche Beleuchtung',
                                            'Hohe Sicherheit',
                                            'Professionelle Montage',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Për një shtëpi moderne dhe elegante, Aurora është zgjedhja perfekte. Me dizajnin e saj të sofistikuar dhe cilësinë e lartë, ajo do të bëjë të ndiheni krenar çdo herë që hyni në shtëpinë tuaj.",
                                        en: "For a modern and elegant home, Aurora is the perfect choice. With its sophisticated design and high quality, it will make you feel proud every time you enter your home.",
                                        fr: "Pour une maison moderne et élégante, Aurora est le choix parfait. Avec son design sophistiqué et sa haute qualité, elle vous fera sentir fier chaque fois que vous entrez dans votre maison.",
                                        de: "Für ein modernes und elegantes Zuhause ist Aurora die perfekte Wahl. Mit ihrem raffinierten Design und der hohen Qualität werden Sie sich jedes Mal stolz fühlen, wenn Sie Ihr Zuhause betreten."
                                    }
                                },
                                door2: {
                                    title: 'Elegance',
                                    image: 'assets/foto18.png',
                                    description: {
                                        sq: 'Dyer elegante me panel të plotë dhe dekor inox horizontal për një pamje sofistikuar.',
                                        en: 'Elegant doors with full panel and horizontal inox decor for a sophisticated look.',
                                        fr: 'Portes élégantes avec panneau complet et décor inox horizontal pour un look sophistiqué.',
                                        de: 'Elegante Türen mit voller Platte und horizontalem Inox-Dekor für einen raffinierten Look.'
                                    },
                                    features: {
                                        sq: [
                                            'Panel i plotë për pamje elegante',
                                            'Dekor inox horizontal',
                                            'Rezistencë ndaj motit',
                                            'Izolim termik i avancuar',
                                            'Materiale të qëndrueshme',
                                            'Garancion 10 vjet'
                                        ],
                                        en: [
                                            'Full panel for elegant look',
                                            'Horizontal inox decor',
                                            'Weather resistance',
                                            'Advanced thermal insulation',
                                            'Durable materials',
                                            '10-year warranty'
                                        ],
                                        fr: [
                                            'Panneau complet pour un look élégant',
                                            'Décor inox horizontal',
                                            'Résistance aux intempéries',
                                            'Isolation thermique avancée',
                                            'Matériaux durables',
                                            'Garantie 10 ans'
                                        ],
                                        de: [
                                            'Volle Platte für eleganten Look',
                                            'Horizontaler Inox-Dekor',
                                            'Wetterbeständigkeit',
                                            'Fortschrittliche Wärmedämmung',
                                            'Langlebige Materialien',
                                            '10 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Elegance kombinon elegancën dhe funksionalitetin në një dizajn të përsosur. Është zgjedhja ideale për ata që duan të shprehin stil dhe klasë në çdo detaj të shtëpisë së tyre.",
                                        en: "Elegance combines elegance and functionality in a perfect design. It is the ideal choice for those who want to express style and class in every detail of their home.",
                                        fr: "Elegance combine élégance et fonctionnalité dans un design parfait. C'est le choix idéal pour ceux qui veulent exprimer style et classe dans chaque détail de leur maison.",
                                        de: "Elegance kombiniert Eleganz und Funktionalität in einem perfekten Design. Es ist die ideale Wahl für diejenigen, die in jedem Detail ihres Zuhauses Stil und Klasse ausdrücken möchten."
                                    }
                                },
                                door3: {
                                    title: 'Privata',
                                    image: 'assets/foto7.png',
                                    description: {
                                        sq: 'Dyer me vija që ofrojnë privatësi duke ruajtur ndriçimin natyror.',
                                        en: 'Doors with stripes that provide privacy while maintaining natural lighting.',
                                        fr: 'Portes avec rayures qui offrent l\'intimité tout en conservant l\'éclairage naturel.',
                                        de: 'Türen mit Sichtstreifen, die Privatsphäre bieten und gleichzeitig natürliches Licht erhalten.'
                                    },
                                    features: {
                                        sq: [
                                            'Vija për privatësi',
                                            'Ruajtja e ndriçimit natyror',
                                            'Dizajne moderne',
                                            'Materiale të qëndrueshme',
                                            'Funksionalitet i lartë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Stripes for privacy',
                                            'Maintains natural lighting',
                                            'Modern designs',
                                            'Durable materials',
                                            'High functionality',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Rayures pour l\'intimité',
                                            'Conserve l\'éclairage naturel',
                                            'Designs modernes',
                                            'Matériaux durables',
                                            'Fonctionnalité élevée',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Streifen für Privatsphäre',
                                            'Erhält natürliche Beleuchtung',
                                            'Moderne Designs',
                                            'Langlebige Materialien',
                                            'Hohe Funktionalität',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Për një kombinim të përsosur të privatësisë dhe ndriçimit natyror, Privata është zgjedhja juaj. Lejo dritën të hyjë ndërsa ruan intimitetin e shtëpisë suaj.",
                                        en: "For a perfect combination of privacy and natural lighting, Privata is your choice. Let the light in while maintaining your home's intimacy.",
                                        fr: "Pour une combinaison parfaite d\'intimité et d\'éclairage naturel, Privata est votre choix. Laissez la lumière entrer tout en maintenant l\'intimité de votre maison.",
                                        de: "Für eine perfekte Kombination aus Privatsphäre und natürlichem Licht ist Privata Ihre Wahl. Lassen Sie das Licht herein und bewahren Sie gleichzeitig die Intimität Ihres Zuhauses."
                                    }
                                },
                                door4: {
                                    title: 'Polaris',
                                    image: 'assets/foto9.png',
                                    description: {
                                        sq: 'Dyer me dizajn polar që kombinon elegancën dhe funksionalitetin.',
                                        en: 'Doors with polar design that combines elegance and functionality.',
                                        fr: 'Portes avec design polaire qui combine élégance et fonctionnalité.',
                                        de: 'Türen mit polar-Design, das Eleganz und Funktionalität vereint.'
                                    },
                                    features: {
                                        sq: [
                                            'Dizajn polar unik',
                                            'Kombinim i elegancës dhe funksionalitetit',
                                            'Materiale të qëndrueshme',
                                            'Izolim termik',
                                            'Instalim i lehtë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Unique polar design',
                                            'Combination of elegance and functionality',
                                            'Durable materials',
                                            'Thermal insulation',
                                            'Easy installation',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Design polaire unique',
                                            'Combinaison d\'élégance et de fonctionnalité',
                                            'Matériaux durables',
                                            'Isolation thermique',
                                            'Installation facile',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Einzigartiges Polar-Design',
                                            'Kombination aus Eleganz und Funktionalität',
                                            'Langlebige Materialien',
                                            'Wärmedämmung',
                                            'Einfache Montage',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Polaris sjell një frymë të freskët në dizajnin e shtëpisë suaj. Me dizajnin e saj unik dhe karakteristikat e avancuara, ajo është zgjedhja perfekte për një stil të përkryer.",
                                        en: "Polaris brings a fresh spirit to your home's design. With its unique design and advanced features, it is the perfect choice for a flawless style.",
                                        fr: "Polaris apporte un esprit frais au design de votre maison. Avec son design unique et ses fonctionnalités avancées, c\'est le choix parfait pour un style impeccable.",
                                        de: "Polaris bringt frischen Geist in das Design Ihres Zuhauses. Mit ihrem einzigartigen Design und den fortschrittlichen Funktionen ist sie die perfekte Wahl für einen makellosen Stil."
                                    }
                                },
                                door5: {
                                    title: 'Verticalis',
                                    image: 'assets/foto10.png',
                                    description: {
                                        sq: 'Dyer me vija vertikale që shtojnë lartësi dhe elegancë në hapësirën tuaj.',
                                        en: 'Doors with vertical lines that add height and elegance to your space.',
                                        fr: 'Portes avec lignes verticales qui ajoutent hauteur et élégance à votre espace.',
                                        de: 'Türen mit vertikalen Linien, die Ihrem Raum Höhe und Eleganz verleihen.'
                                    },
                                    features: {
                                        sq: [
                                            'Vija vertikale për efekt vizual',
                                            'Shton lartësi dhe elegancë',
                                            'Materiale të qëndrueshme',
                                            'Dizajne moderne',
                                            'Funksionalitet i lartë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Vertical lines for visual effect',
                                            'Adds height and elegance',
                                            'Durable materials',
                                            'Modern designs',
                                            'High functionality',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Lignes verticales pour effet visuel',
                                            'Ajoute hauteur et élégance',
                                            'Matériaux durables',
                                            'Designs modernes',
                                            'Fonctionnalité élevée',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Vertikale Linien für visuellen Effekt',
                                            'Verleiht Höhe und Eleganz',
                                            'Langlebige Materialien',
                                            'Moderne Designs',
                                            'Hohe Funktionalität',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Verticalis është zgjedhja ideale për ata që duan të shtojnë një ndjesi lartësie dhe elegancë në hapësirën e tyre. Me linjat e saj vertikale, ajo krijon një efekt vizual të mahnitshëm.",
                                        en: "Verticalis is the ideal choice for those who want to add a sense of height and elegance to their space. With its vertical lines, it creates a stunning visual effect.",
                                        fr: "Verticalis est le choix idéal pour ceux qui veulent ajouter un sentiment de hauteur et d\'élégance à leur espace. Avec ses lignes verticales, elle crée un effet visuel époustouflant.",
                                        de: "Verticalis ist die ideale Wahl für diejenigen, die ihrem Raum ein Gefühl von Höhe und Eleganz verleihen möchten. Mit ihren vertikalen Linien erzeugt sie einen atemberaubenden visuellen Effekt."
                                    }
                                },
                                door6: {
                                    title: 'Architectura',
                                    image: 'assets/foto15.png',
                                    description: {
                                        sq: 'Dyer moderne që sjellin një prekje arkitekturore unike në shtëpinë tuaj.',
                                        en: 'Modern doors that bring a unique architectural touch to your home.',
                                        fr: 'Portes modernes qui apportent une touche architecturale unique à votre maison.',
                                        de: 'Moderne Türen, die Ihrem Zuhause eine einzigartige architektonische Note verleihen.'
                                    },
                                    features: {
                                        sq: [
                                            'Dizajn unik',
                                            'Prekje arkitekturore elegante',
                                            'Materiale të qëndrueshme',
                                            'Instalim profesional',
                                            'Funksionalitet i lartë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Unique design',
                                            'Elegant architectural touch',
                                            'Durable materials',
                                            'Professional installation',
                                            'High functionality',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Design unique',
                                            'Touche architecturale élégante',
                                            'Matériaux durables',
                                            'Installation professionnelle',
                                            'Fonctionnalité élevée',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Einzigartiges Design',
                                            'Elegante architektonische Note',
                                            'Langlebige Materialien',
                                            'Professionelle Montage',
                                            'Hohe Funktionalität',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Për një prekje arkitekturore unike, Architectura është zgjedhja juaj. Me dizajnin e saj të sofistikuar, ajo sjell një karakter të veçantë në shtëpinë tuaj.",
                                        en: "For a unique architectural touch, Architectura is your choice. With its sophisticated design, it brings a special character to your home.",
                                        fr: "Pour une touche architecturale unique, Architectura est votre choix. Avec son design sophistiqué, elle apporte un caractère spécial à votre maison.",
                                        de: "Für eine einzigartige architektonische Note ist Architectura Ihre Wahl. Mit ihrem raffinierten Design verleiht sie Ihrem Zuhause einen besonderen Charakter."
                                    }
                                },
                                door7: {
                                    title: 'Crystal',
                                    image: 'assets/foto21.png',
                                    description: {
                                        sq: 'Dyer me pamje kristal që shkëlqejnë në dritë dhe shtojnë shkëlqim në hapësirën tuaj.',
                                        en: 'Crystal view doors that shine in light and add sparkle to your space.',
                                        fr: 'Portes à vue cristal qui brillent dans la lumière et ajoutent de l\'éclat à votre espace.',
                                        de: 'Kristallblick-Türen, die im Licht glänzen und Ihrem Raum Glanz verleihen.'
                                    },
                                    features: {
                                        sq: [
                                            'Pamje kristal elegante',
                                            'Shkëlqim në dritë',
                                            'Materiale të qëndrueshme',
                                            'Dizajne moderne',
                                            'Funksionalitet i lartë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Elegant crystal look',
                                            'Shines in light',
                                            'Durable materials',
                                            'Modern designs',
                                            'High functionality',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Look cristal élégant',
                                            'Brille dans la lumière',
                                            'Matériaux durables',
                                            'Designs modernes',
                                            'Fonctionnalité élevée',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Eleganter Kristall-Look',
                                            'Glänzt im Licht',
                                            'Langlebige Materialien',
                                            'Moderne Designs',
                                            'Hohe Funktionalität',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Crystal është për ata që duan të shkëlqejnë. Me pamjen e saj kristal, ajo sjell dritë dhe shkëlqim në çdo hapësirë, duke e bërë shtëpinë tuaj të duket si nga ëndrrat.",
                                        en: "Crystal is for those who want to shine. With its crystal look, it brings light and sparkle to any space, making your home look like a dream.",
                                        fr: "Crystal est pour ceux qui veulent briller. Avec son look cristal, elle apporte lumière et éclat à tout espace, rendant votre maison comme un rêve.",
                                        de: "Crystal ist für diejenigen, die glänzen wollen. Mit ihrem Kristall-Look bringt sie Licht und Glanz in jeden Raum und lässt Ihr Zuhause wie ein Traum aussehen."
                                    }
                                },
                                door8: {
                                    title: 'Minimalis',
                                    image: 'assets/foto14.png',
                                    description: {
                                        sq: 'Dyer me pamje të thjeshtë dhe elegante, perfekte për stil minimal.',
                                        en: 'Doors with simple and elegant look, perfect for minimal style.',
                                        fr: 'Portes avec look simple et élégant, parfaites pour le style minimal.',
                                        de: 'Türen mit einfachem und elegantem Look, perfekt für den minimalistischen Stil.'
                                    },
                                    features: {
                                        sq: [
                                            'Dizajn minimal dhe elegant',
                                            'Pamje e thjeshtë dhe moderne',
                                            'Materiale të qëndrueshme',
                                            'Instalim i lehtë',
                                            'Funksionalitet i lartë',
                                            'Garancion 5 vjet'
                                        ],
                                        en: [
                                            'Minimal and elegant design',
                                            'Simple and modern look',
                                            'Durable materials',
                                            'Easy installation',
                                            'High functionality',
                                            '5-year warranty'
                                        ],
                                        fr: [
                                            'Design minimal et élégant',
                                            'Look simple et moderne',
                                            'Matériaux durables',
                                            'Installation facile',
                                            'Fonctionnalité élevée',
                                            'Garantie 5 ans'
                                        ],
                                        de: [
                                            'Minimales und elegantes Design',
                                            'Einfacher und moderner Look',
                                            'Langlebige Materialien',
                                            'Einfache Montage',
                                            'Hohe Funktionalität',
                                            '5 Jahre Garantie'
                                        ]
                                    },
                                    motivation: {
                                        sq: "Për një stil minimal dhe të pastër, Minimalis është zgjedhja perfekte. Me thjeshtësinë e saj elegante, ajo sjell një ndjesi të qetësisë dhe rendi në shtëpinë tuaj.",
                                        en: "For a minimal and clean style, Minimalis is the perfect choice. With its elegant simplicity, it brings a sense of calm and order to your home.",
                                        fr: "Pour un style minimal et épuré, Minimalis est le choix parfait. Avec sa simplicité élégante, elle apporte un sentiment de calme et d\'ordre à votre maison.",
                                        de: "Für einen minimalistischen und sauberen Stil ist Minimalis die perfekte Wahl. Mit ihrer eleganten Einfachheit bringt sie ein Gefühl von Ruhe und Ordnung in Ihr Zuhause."
                                    }
                                }
                            };
                
                            const door = doorData[doorId];
                            if (!door) return;
                
                            // Create modal content
                            const modalContent = `
                                <div class="door-modal" id="doorModal">
                                    <div class="door-modal-content">
                                        <span class="door-modal-close" onclick="closeDoorModal()">&times;</span>
                                        <div class="door-modal-header">
                                            <h2>${door.title}</h2>
                                        </div>
                                        <div class="door-modal-body">
                                            <div class="door-modal-image">
                                                <img src="${door.image}" alt="${door.title}">
                                            </div>
                                            <div class="door-modal-info">
                                                <div class="door-description">
                                                    <h3>${currentLanguage === 'en' ? 'Description' : currentLanguage === 'fr' ? 'Description' : currentLanguage === 'de' ? 'Beschreibung' : 'Përshkrimi'}</h3>
                                                    <p>${door.description[currentLanguage]}</p>
                                                    <p style="font-style: italic; color: rgb(104, 104, 104); margin-top: 1rem;">${door.motivation[currentLanguage]}</p>
                                                </div>
                                                <div class="door-features">
                                                    <h3>${currentLanguage === 'en' ? 'Features' : currentLanguage === 'fr' ? 'Caractéristiques' : currentLanguage === 'de' ? 'Eigenschaften' : 'Karakteristikat'}</h3>
                                                    <ul>
                                                        ${door.features[currentLanguage].map(feature => `<li>${feature}</li>`).join('')}
                                                    </ul>
                                                </div>
                                                <div class="door-order">
                                                    <h3>${currentLanguage === 'en' ? 'Place Order' : currentLanguage === 'fr' ? 'Passer la Commande' : currentLanguage === 'de' ? 'Bestellung Aufgeben' : 'Bëj Porosinë'}</h3>
                                                    <form action="https://formspree.io/f/xpwlnaqw" method="POST" class="door-order-form">
                                                        <input type="hidden" name="Lloji i derës" value="${door.title}">
                                                        <div class="form-group">
                                                            <label for="customer_name">${currentLanguage === 'en' ? 'Your Name *' : currentLanguage === 'fr' ? 'Votre Nom *' : currentLanguage === 'de' ? 'Ihr Name *' : 'Emri Juaj *'}</label>
                                                            <input type="text" id="customer_name" name="Emri" required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="customer_email">${currentLanguage === 'en' ? 'Email *' : currentLanguage === 'fr' ? 'Email *' : currentLanguage === 'de' ? 'E-Mail *' : 'Email *'}</label>
                                                            <input type="email" id="customer_email" name="Email" required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="customer_phone">${currentLanguage === 'en' ? 'Phone *' : currentLanguage === 'fr' ? 'Téléphone *' : currentLanguage === 'de' ? 'Telefon *' : 'Telefoni *'}</label>
                                                            <input type="tel" id="customer_phone" name="Numri i telefonit" required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="customer_address">${currentLanguage === 'en' ? 'Address' : currentLanguage === 'fr' ? 'Adresse' : currentLanguage === 'de' ? 'Adresse' : 'Adresa'}</label>
                                                            <textarea id="customer_address" name="Adresa" rows="2"></textarea>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="order_notes">${currentLanguage === 'en' ? 'Additional Notes' : currentLanguage === 'fr' ? 'Notes Supplémentaires' : currentLanguage === 'de' ? 'Zusätzliche Notizen' : 'Shënime Shtesë'}</label>
                                                            <textarea id="order_notes" name="Shënimet" rows="3" placeholder="${currentLanguage === 'en' ? 'Describe your specific requirements...' : currentLanguage === 'fr' ? 'Décrivez vos exigences spécifiques...' : currentLanguage === 'de' ? 'Beschreiben Sie Ihre spezifischen Anforderungen...' : 'Përshkruani kërkesat tuaja specifike...'}"></textarea>
                                                        </div>
                                                        <button type="submit" class="door-order-btn">${currentLanguage === 'en' ? 'Submit Order' : currentLanguage === 'fr' ? 'Soumettre la Commande' : currentLanguage === 'de' ? 'Bestellung Absenden' : 'Dërgo Porosinë'}</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

                            // Add modal to page
                            document.body.insertAdjacentHTML('beforeend', modalContent);

                            // Close modal when clicking outside
                            const modal = document.getElementById('doorModal');
                            modal.addEventListener('click', function(e) {
                                if (e.target === modal) {
                                    closeDoorModal();
                                }
                            });

                            // Close modal with Escape key
                            document.addEventListener('keydown', function(e) {
                                if (e.key === 'Escape') {
                                    closeDoorModal();
                                }
                            });

                            // Handle form submission
                            const form = document.querySelector('.door-order-form');
                            form.addEventListener('submit', function(e) {
                                e.preventDefault();
                                const formData = new FormData(form);
                                
                                fetch(form.action, {
                                    method: 'POST',
                                    body: formData,
                                    headers: {
                                        'Accept': 'application/json'
                                    }
                                })
                                .then(response => {
                                    if (response.ok) {
                                        alert(currentLanguage === 'sq' ? 'Faleminderit për porosinë tuaj! Do t\'ju kontaktojmë së shpejti për detajet.' : currentLanguage === 'fr' ? 'Merci pour votre commande ! Nous vous contacterons bientôt avec les détails.' : currentLanguage === 'de' ? 'Vielen Dank für Ihre Bestellung! Wir werden uns bald mit den Details bei Ihnen melden.' : 'Thank you for your order! We will contact you soon with details.');
                                        closeDoorModal();
                                    } else {
                                        throw new Error('Network response was not ok');
                                    }
                                })
                                .catch(error => {
                                    alert(currentLanguage === 'sq' ? 'Ka ndodhur një gabim. Ju lutem provoni përsëri më vonë.' : currentLanguage === 'fr' ? 'Une erreur s\'est produite. Veuillez réessayer plus tard.' : currentLanguage === 'de' ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' : 'An error occurred. Please try again later.');
                                    console.error('Error:', error);
                                });
                            });
                        // After modal is added, ensure language is correct if user toggles language while modal is open
                        setTimeout(() => {
                            const doorModal = document.querySelector('.door-modal');
                            if (doorModal) {
                                if (currentLanguage === 'en') {
                                    const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                    const englishOrderLabels = ['Your Name *', 'Email *', 'Phone *', 'Address', 'Additional Notes'];
                                    const englishOrderPlaceholder = 'Describe your specific requirements...';
                                    const englishOrderButton = 'Submit Order';
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < englishOrderLabels.length) {
                                            label.textContent = englishOrderLabels[index];
                                        }
                                    });

                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = englishOrderPlaceholder;
                                    }
                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = englishOrderButton;
                                    }
                                    // Modal section titles
                                    const descTitle = doorModal.querySelector('.door-description h3');
                                    if (descTitle) descTitle.textContent = 'Description';
                                    const featuresTitle = doorModal.querySelector('.door-features h3');
                                    if (featuresTitle) featuresTitle.textContent = 'Features';
                                    const orderTitle = doorModal.querySelector('.door-order h3');
                                    if (orderTitle) orderTitle.textContent = 'Place Order';
                                } else if (currentLanguage === 'fr') {
                                    const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                    const frenchOrderLabels = ['Votre Nom *', 'Email *', 'Téléphone *', 'Adresse', 'Notes Supplémentaires'];
                                    const frenchOrderPlaceholder = 'Décrivez vos exigences spécifiques...';
                                    const frenchOrderButton = 'Soumettre la Commande';
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < frenchOrderLabels.length) {
                                            label.textContent = frenchOrderLabels[index];
                                        }
                                    });
                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = frenchOrderPlaceholder;
                                    }
                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = frenchOrderButton;
                                    }
                                    // Modal section titles
                                    const descTitle = doorModal.querySelector('.door-description h3');
                                    if (descTitle) descTitle.textContent = 'Description';
                                    const featuresTitle = doorModal.querySelector('.door-features h3');
                                    if (featuresTitle) featuresTitle.textContent = 'Caractéristiques';
                                    const orderTitle = doorModal.querySelector('.door-order h3');
                                    if (orderTitle) orderTitle.textContent = 'Passer la Commande';
                                } else {
                                    const orderFormLabels = document.querySelectorAll('.door-order-form label');
                                    const albanianOrderLabels = ['Emri Juaj *', 'Email *', 'Telefoni *', 'Adresa', 'Shënime Shtesë'];
                                    const albanianOrderPlaceholder = 'Përshkruani kërkesat tuaja specifike...';
                                    const albanianOrderButton = 'Dërgo Porosinë';
                                    orderFormLabels.forEach((label, index) => {
                                        if (index < albanianOrderLabels.length) {
                                            label.textContent = albanianOrderLabels[index];
                                        }
                                    });
                                    const orderTextarea = document.querySelector('.door-order-form textarea[placeholder]');
                                    if (orderTextarea) {
                                        orderTextarea.placeholder = albanianOrderPlaceholder;
                                    }
                                    const orderButton = document.querySelector('.door-order-btn');
                                    if (orderButton) {
                                        orderButton.textContent = albanianOrderButton;
                                    }
                                    // Modal section titles
                                    const descTitle = doorModal.querySelector('.door-description h3');
                                    if (descTitle) descTitle.textContent = 'Përshkrimi';
                                    const featuresTitle = doorModal.querySelector('.door-features h3');
                                    if (featuresTitle) featuresTitle.textContent = 'Karakteristikat';
                                    const orderTitle = doorModal.querySelector('.door-order h3');
                                    if (orderTitle) orderTitle.textContent = 'Bëj Porosinë';
                                }
                            }
                        }, 100);
                        }



                
                        function closeDoorModal() {
                            const modal = document.getElementById('doorModal');
                            if (modal) {
                                modal.remove();
                            }
                        }
                
                        // Animated numbers for developments section (animate only when visible)
                        function animateNumbers() {
                            const numbers = document.querySelectorAll('.development-number');
                            numbers.forEach(number => {
                                const target = parseInt(number.getAttribute('data-target'));
                                const duration = 2000; // 2 seconds
                                const increment = target / (duration / 16); // 60fps
                                let current = 0;
                                clearInterval(number._timer);
                                number._timer = setInterval(() => {
                                    current += increment;
                                    if (current >= target) {
                                        current = target;
                                        clearInterval(number._timer);
                                    }
                                    number.textContent = Math.floor(current).toLocaleString();
                                }, 16);
                            });
                        }
                        // Animate only when developments section enters viewport
                        const developmentsSection = document.querySelector('.developments');
                        if (developmentsSection) {
                            const devObserver = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        animateNumbers();
                                        devObserver.unobserve(entry.target);
                                    }
                                });
                            }, { threshold: 0.2 });
                            devObserver.observe(developmentsSection);
                        }

                        
