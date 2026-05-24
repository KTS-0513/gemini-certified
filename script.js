document.addEventListener('DOMContentLoaded', () => {
    // ダークモードの切り替え
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // 初期テーマの設定
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.querySelector('.material-symbols-outlined').textContent = "light_mode";
    } else if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggleBtn.querySelector('.material-symbols-outlined').textContent = "dark_mode";
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.querySelector('.material-symbols-outlined').textContent = "light_mode";
    }

    // ボタンクリック時の処理
    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme == "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.querySelector('.material-symbols-outlined').textContent = "dark_mode";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.querySelector('.material-symbols-outlined').textContent = "light_mode";
        }
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // ヘッダー分オフセット
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observerによるスクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // 一度発火したら監視を解除
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in');
    fadeElements.forEach(el => observer.observe(el));
});
