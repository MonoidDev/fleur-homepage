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
    
    // 首页增强功能初始化
    enhanceHeroSection();
    enhanceParallaxEffects();
    addDynamicStyles();
    
    // 初始化性能优化器和交互反馈系统
    new PerformanceOptimizer();
    new InteractionFeedback();
    
    // ホームページ強化機能を初期化
    enhanceHeroSection();
});

// 桜の花びらを動的に生成（高性能版）
function createSakuraAnimation() {
    const sakuraContainer = document.querySelector('.sakura-container');
    let lastTime = 0;
    const throttleDelay = 2000; // 2秒间隔，进一步降低频率
    let activeElements = 0;
    const maxElements = 12; // 最大同时存在的元素数量
    
    function addSakura() {
        const now = Date.now();
        if (now - lastTime < throttleDelay || activeElements >= maxElements) return;
        lastTime = now;
        
        if (Math.random() > 0.85) { // 降低生成频率到15%
            const sakura = document.createElement('div');
            sakura.className = 'sakura';
            sakura.style.left = Math.random() * 100 + '%';
            sakura.style.animationDuration = (Math.random() * 3 + 10) + 's'; // 更长的动画时长
            sakura.style.opacity = Math.random() * 0.4 + 0.2;
            sakura.style.willChange = 'transform, opacity';
            
            sakuraContainer.appendChild(sakura);
            activeElements++;
            
            // 使用 setTimeout 替代 animationend 事件
            setTimeout(() => {
                if (sakura.parentNode) {
                    sakura.parentNode.removeChild(sakura);
                    activeElements--;
                }
            }, 13000);
        }
    }
    
    // 使用 requestAnimationFrame 优化，但降低调用频率
    let frameCount = 0;
    function animate() {
        frameCount++;
        if (frameCount % 120 === 0) { // 每2秒左右调用一次（60fps下）
            addSakura();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// 追加的花びらアニメーション（高性能版）
function createFloatingPetals() {
    const petalsContainer = document.querySelector('.floating-petals');
    if (!petalsContainer) return;
    
    let lastTime = 0;
    const throttleDelay = 3000; // 3秒间隔
    let activePetals = 0;
    const maxPetals = 8; // 最大花瓣数量
    
    function addPetal() {
        const now = Date.now();
        if (now - lastTime < throttleDelay || activePetals >= maxPetals) return;
        lastTime = now;
        
        if (Math.random() > 0.92) { // 降低到8%概率
            const petal = document.createElement('div');
            petal.className = 'petal dynamic-petal';
            petal.style.left = (Math.random() * 60 - 30) + 'px';
            petal.style.animationDuration = (Math.random() * 4 + 12) + 's';
            petal.style.animationDelay = Math.random() * 0.5 + 's';
            petal.style.willChange = 'transform';
            
            const colors = ['#ffb6c1', '#ffe4e1', '#ff69b4', '#ffc0cb'];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            petalsContainer.appendChild(petal);
            activePetals++;
            
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                    activePetals--;
                }
            }, 16000);
        }
    }
    
    // 优化动画循环
    let frameCount = 0;
    function animate() {
        frameCount++;
        if (frameCount % 180 === 0) { // 每3秒左右调用一次
            addPetal();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// SVG花のインタラクティブアニメーション（优化版）
function initFlowerInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const svg = item.querySelector('svg');
        if (!svg) return;
        
        let isAnimating = false;
        
        item.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            const petals = svg.querySelectorAll('.petal, .rose-bloom, .tulip-bloom');
            petals.forEach((petal, index) => {
                setTimeout(() => {
                    petal.style.transition = 'all 0.3s ease';
                    petal.style.filter = 'brightness(1.3) saturate(1.2)';
                    petal.style.transform = 'scale(1.1)';
                }, index * 50);
            });
            
            setTimeout(() => { isAnimating = false; }, 300);
        });
        
        item.addEventListener('mouseleave', () => {
            const petals = svg.querySelectorAll('.petal, .rose-bloom, .tulip-bloom');
            petals.forEach(petal => {
                petal.style.filter = '';
                petal.style.transform = '';
            });
        });
        
        // 优化点击效果
        item.addEventListener('click', (e) => {
            e.preventDefault();
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

// 动态な背景花びら（高性能版）
function createBackgroundFlowers() {
    let lastTime = 0;
    const throttleDelay = 8000; // 8秒间隔，大幅降低频率
    let activeFlowers = 0;
    const maxFlowers = 5; // 最大同时存在的花朵数量
    
    function addFlower() {
        const now = Date.now();
        if (now - lastTime < throttleDelay || activeFlowers >= maxFlowers) return;
        lastTime = now;
        
        if (Math.random() > 0.95) { // 降低到5%概率
            const flower = document.createElement('div');
            flower.style.cssText = `
                position: fixed;
                font-size: 1.5rem;
                color: rgba(255, 182, 193, 0.3);
                left: ${Math.random() * 100}vw;
                top: -50px;
                pointer-events: none;
                z-index: 1;
                will-change: transform;
            `;
            flower.innerHTML = ['🌸', '🌺', '🌻'][Math.floor(Math.random() * 3)];
            
            document.body.appendChild(flower);
            activeFlowers++;
            
            // 使用更高效的动画
            let y = -50;
            let rotation = 0;
            const speed = 0.2 + Math.random() * 0.2; // 降低速度
            const rotationSpeed = 0.5 + Math.random() * 0.5;
            
            function animateFlower() {
                y += speed;
                rotation += rotationSpeed;
                
                flower.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotation}deg)`;
                
                if (y < window.innerHeight + 100) {
                    requestAnimationFrame(animateFlower);
                } else {
                    document.body.removeChild(flower);
                    activeFlowers--;
                }
            }
            
            requestAnimationFrame(animateFlower);
        }
    }
    
    // 优化动画循环
    let frameCount = 0;
    function animate() {
        frameCount++;
        if (frameCount % 480 === 0) { // 每8秒左右调用一次
            addFlower();
        }
        requestAnimationFrame(animate);
    }
    animate();
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

// 首页增强功能
function enhanceHeroSection() {
    // // 动态文字打字效果
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //     const originalText = heroSubtitle.textContent;
    //     heroSubtitle.textContent = '';
    //     typeWriter(heroSubtitle, originalText, 80);
    // }
    
    // 数字递增动画
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.match(/\d+/)[0]);
        
        stat.textContent = '0' + (isPercentage ? '%' : '+');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(stat, 0, numericValue, isPercentage ? '%' : '+', 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
    
    // 粒子背景效果
    createParticleBackground();
    
    // 鼠标跟随效果
    createMouseFollowEffect();
    
    // 悬浮按钮效果增强
    enhanceButtonEffects();
}

// 数字递增动画
function animateNumber(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// 粒子背景效果
function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // 创建静态粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 105, 180, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// 鼠标跟随效果
function createMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.5) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });
    
    // 平滑跟随效果
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // 隐藏鼠标离开页面时的光标
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
}

// 增强按钮效果
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // 添加涟漪效果
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // 磁力效果
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// 滚动视差效果增强
function enhanceParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .floating-flower');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
        
        // 导航栏模糊效果
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            navbar.style.backdropFilter = 'none';
            navbar.style.webkitBackdropFilter = 'none';
        }
    });
}

// 添加CSS动画关键帧
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes float-up {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(-10px); opacity: 1; }
        }
        
        @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 105, 180, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.6), 0 0 30px rgba(255, 105, 180, 0.3); }
        }
        
        .btn {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .btn:hover {
            animation: glow-pulse 2s infinite;
        }
        
        .custom-cursor {
            animation: cursor-glow 2s infinite ease-in-out;
        }
        
        @keyframes cursor-glow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.5); opacity: 0.8; }
        }
    `;
    
    document.head.appendChild(style);
}

// 动态粒子背景（简化版）
function createDynamicParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'dynamic-particle-background';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // 创建动态粒子
    function addDynamicParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(255, 105, 180, 0.7);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 5}s infinite ease-in-out;
            opacity: 0.7;
        `;
        
        particleContainer.appendChild(particle);
        
        // 随机漂浮动画
        const floatKeyframes = `
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        `;
        particle.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 5000 + Math.random() * 5000,
            easing: 'ease-in-out',
            iterations: Infinity
        });
        
        // 设置粒子消失延迟
        setTimeout(() => {
            particle.style.opacity = '0';
        }, 4000);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }
    
    // 循环添加粒子
    setInterval(addDynamicParticle, 300);
}

// 初始调用
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    createDynamicParticleBackground();
});

// 性能监控和自适应优化系统
class PerformanceOptimizer {
    constructor() {
        this.isLowPerformance = false;
        this.frameDropCount = 0;
        this.lastFrameTime = performance.now();
        this.frameInterval = 1000 / 60; // 60 FPS target
        this.checkInterval = 5000; // 每5秒检查一次
        
        this.init();
    }
    
    init() {
        // 检测设备性能
        this.detectDeviceCapability();
        
        // 监控帧率
        this.monitorFrameRate();
        
        // 定期性能检查
        setInterval(() => this.performanceCheck(), this.checkInterval);
        
        // 监听页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseHeavyAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    detectDeviceCapability() {
        // 检测设备硬件信息
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                // 简单的GPU性能检测
                if (renderer.includes('Intel') || renderer.includes('Mali')) {
                    this.isLowPerformance = true;
                }
            }
        }
        
        // 检测连接类型
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                this.isLowPerformance = true;
            }
        }
        
        // 检测内存限制
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            this.isLowPerformance = true;
        }
        
        // 如果检测到低性能设备，立即优化
        if (this.isLowPerformance) {
            this.applyLowPerformanceMode();
        }
    }
    
    monitorFrameRate() {
        const checkFrame = () => {
            const currentTime = performance.now();
            const deltaTime = currentTime - this.lastFrameTime;
            
            if (deltaTime > this.frameInterval + 5) { // 允许5ms误差
                this.frameDropCount++;
            }
            
            this.lastFrameTime = currentTime;
            requestAnimationFrame(checkFrame);
        };
        
        requestAnimationFrame(checkFrame);
    }
    
    performanceCheck() {
        const dropRate = this.frameDropCount / (this.checkInterval / this.frameInterval);
        
        if (dropRate > 0.1 && !this.isLowPerformance) { // 10%以上掉帧
            console.log('Performance issue detected, switching to low performance mode');
            this.isLowPerformance = true;
            this.applyLowPerformanceMode();
        }
        
        // 重置计数器
        this.frameDropCount = 0;
    }
    
    applyLowPerformanceMode() {
        // 减少动画元素
        const sakuraContainer = document.querySelector('.sakura-container');
        if (sakuraContainer) {
            const sakuras = sakuraContainer.querySelectorAll('.sakura');
            sakuras.forEach((sakura, index) => {
                if (index % 2 === 0) sakura.remove(); // 移除一半元素
            });
        }
        
        // 禁用某些视觉效果
        const gradientOrbs = document.querySelectorAll('.gradient-orb');
        gradientOrbs.forEach(orb => {
            orb.style.display = 'none';
        });
        
        // 简化背景动画
        document.body.style.backgroundSize = '200% 200%';
        document.body.style.animationDuration = '40s'; // 减慢背景动画
        
        // 添加低性能模式指示
        document.documentElement.setAttribute('data-performance', 'low');
    }
    
    pauseHeavyAnimations() {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
}

// 交互反馈系统
class InteractionFeedback {
    constructor() {
        this.init();
    }
    
    init() {
        // 触摸反馈
        this.addTouchFeedback();
        
        // 键盘导航支持
        this.addKeyboardNavigation();
        
        // 鼠标悬停声音效果（可选）
        this.addAudioFeedback();
    }
    
    addTouchFeedback() {
        const touchElements = document.querySelectorAll('a, button, .gallery-item, .business-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'scale(0.95)';
                element.style.transition = 'transform 0.1s ease';
                
                // 添加触觉反馈（如果支持）
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
                element.style.transition = 'transform 0.3s ease';
            });
        });
    }
    
    addKeyboardNavigation() {
        let currentFocusIndex = -1;
        const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Tab键导航增强视觉反馈
                setTimeout(() => {
                    const activeElement = document.activeElement;
                    if (activeElement && activeElement !== document.body) {
                        activeElement.style.outline = '3px solid var(--primary-pink)';
                        activeElement.style.outlineOffset = '2px';
                    }
                }, 10);
            }
            
            // 自定义快捷键
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('home').scrollIntoView({behavior: 'smooth'});
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('about').scrollIntoView({behavior: 'smooth'});
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('business').scrollIntoView({behavior: 'smooth'});
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
                        break;
                }
            }
        });
        
        // 移除焦点时清除样式
        document.addEventListener('focusout', (e) => {
            if (e.target) {
                e.target.style.outline = '';
                e.target.style.outlineOffset = '';
            }
        });
    }
    
    addAudioFeedback() {
        // 仅在用户明确交互后才启用音频
        let audioEnabled = false;
        
        document.addEventListener('click', () => {
            if (!audioEnabled) {
                audioEnabled = true;
                this.createAudioContext();
            }
        }, { once: true });
    }
    
    createAudioContext() {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const playSound = (frequency, duration = 100, volume = 0.1) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        };
        
        // 为不同元素添加不同音调
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => playSound(800, 50));
            btn.addEventListener('click', () => playSound(1000, 100));
        });
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => playSound(600, 80));
        });
    }
}

//# sourceMappingURL=main.js.map
