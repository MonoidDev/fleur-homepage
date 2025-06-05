// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロール時のナビゲーションバー効果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// インtersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // 事業内容カードのstaggered animation
            if (entry.target.classList.contains('business-card')) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        }
    });
}, observerOptions);

// 観察対象の要素を設定
document.addEventListener('DOMContentLoaded', () => {
    // アニメーション要素の初期化
    const animateElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 事業内容カードのアニメーション初期化
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.dataset.delay = index * 100;
        observer.observe(card);
    });

    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            
            // 送信ボタンの変更
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // 簡単なバリデーション
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = 'var(--light-pink)';
                }
            });
            
            if (isValid) {
                // 実際の送信処理をここに実装
                setTimeout(() => {
                    alert('お問い合わせを受け付けました。ありがとうございます！');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            } else {
                alert('必須項目を入力してください。');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 追加の桜の花びらアニメーション
    createSakuraAnimation();
    
    // 新しい花アニメーション機能を初期化
    createFloatingPetals();
    initFlowerInteractions();
    createBackgroundFlowers();
});

// 桜の花びらを動的に生成
function createSakuraAnimation() {
    const sakuraContainer = document.querySelector('.sakura-container');
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30%の確率で新しい花びらを生成
            const sakura = document.createElement('div');
            sakura.className = 'sakura';
            sakura.style.left = Math.random() * 100 + '%';
            sakura.style.animationDuration = (Math.random() * 3 + 5) + 's';
            sakura.style.opacity = Math.random() * 0.7 + 0.3;
            
            sakuraContainer.appendChild(sakura);
            
            // アニメーション終了後に要素を削除
            setTimeout(() => {
                if (sakura.parentNode) {
                    sakura.parentNode.removeChild(sakura);
                }
            }, 8000);
        }
    }, 500);
}

// 追加の花びらアニメーション
function createFloatingPetals() {
    const petalsContainer = document.querySelector('.floating-petals');
    if (!petalsContainer) return;
    
    setInterval(() => {
        if (Math.random() > 0.8) { // 20%の確率で花びらを生成
            const petal = document.createElement('div');
            petal.className = 'petal dynamic-petal';
            petal.style.left = (Math.random() * 60 - 30) + 'px';
            petal.style.animationDuration = (Math.random() * 4 + 8) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            
            // ランダムな色
            const colors = ['#ffb6c1', '#ffe4e1', '#ff69b4', '#ffc0cb'];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            petalsContainer.appendChild(petal);
            
            // アニメーション終了後に削除
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 12000);
        }
    }, 1000);
}

// SVG花のインタラクティブアニメーション
function initFlowerInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const svg = item.querySelector('svg');
        
        item.addEventListener('mouseenter', () => {
            // 花びらをランダムに光らせる
            const petals = svg.querySelectorAll('.petal, .rose-bloom, .tulip-bloom');
            petals.forEach((petal, index) => {
                setTimeout(() => {
                    petal.style.filter = 'brightness(1.3) saturate(1.2)';
                    petal.style.transform = 'scale(1.1)';
                }, index * 100);
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const petals = svg.querySelectorAll('.petal, .rose-bloom, .tulip-bloom');
            petals.forEach(petal => {
                petal.style.filter = '';
                petal.style.transform = '';
            });
        });
        
        // クリック時のパーティクル効果
        item.addEventListener('click', (e) => {
            createParticleEffect(e.currentTarget);
        });
    });
}

// パーティクル効果
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = '#ff69b4';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        // アニメーション
        let x = 0, y = 0, gravity = 0.5, life = 1;
        
        function animateParticle() {
            x += vx * 0.016;
            y += vy * 0.016;
            vy += gravity;
            life -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                document.body.removeChild(particle);
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// 動的な背景花びら
function createBackgroundFlowers() {
    const body = document.body;
    
    setInterval(() => {
        if (Math.random() > 0.85) { // 15%の確率
            const flower = document.createElement('div');
            flower.style.position = 'fixed';
            flower.style.fontSize = '1.5rem';
            flower.style.color = 'rgba(255, 182, 193, 0.3)';
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.top = '-50px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '1';
            flower.innerHTML = ['🌸', '🌺', '🌻', '🌷', '🌹'][Math.floor(Math.random() * 5)];
            
            body.appendChild(flower);
            
            // アニメーション
            let y = -50;
            let rotation = 0;
            const speed = 0.5 + Math.random() * 0.5;
            const rotationSpeed = 2 + Math.random() * 2;
            
            function animateFlower() {
                y += speed;
                rotation += rotationSpeed;
                
                flower.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
                
                if (y < window.innerHeight + 100) {
                    requestAnimationFrame(animateFlower);
                } else {
                    body.removeChild(flower);
                }
            }
            
            requestAnimationFrame(animateFlower);
        }
    }, 2000);
}

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const floatingFlower = document.querySelector('.floating-flower');
    if (floatingFlower) {
        floatingFlower.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// カードホバー効果の強化
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.business-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transformOrigin = `${x}px ${y}px`;
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// タイピング効果
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ページロード時のアニメーション
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.company-name');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.3}s`;
        });
    }
});

// Mobile menu toggle (for responsive design)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // モバイルメニューボタンの作成
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.color = 'var(--primary-pink)';
    mobileMenuBtn.style.cursor = 'pointer';
    
    navbar.querySelector('.nav-container').appendChild(mobileMenuBtn);
    
    // レスポンシブ対応
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    // モバイルメニューの切り替え
    mobileMenuBtn.addEventListener('click', () => {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'white';
        navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navMenu.style.padding = '1rem';
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// 初期化
document.addEventListener('DOMContentLoaded', createMobileMenu);
