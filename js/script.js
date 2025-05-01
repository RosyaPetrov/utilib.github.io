document.addEventListener('DOMContentLoaded', function() {
    // Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeLabel.textContent = 'LIGHT';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeLabel.textContent = 'DARK';
        }
    });

    // Табы навигации
    const tabButtons = document.querySelectorAll('.retro-btn[data-tab]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Добавляем активный класс к текущей кнопке и соответствующему контенту
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Примеры с вкладками
    const exampleTabs = document.querySelectorAll('.retro-tab-btn');
    exampleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            exampleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const exampleType = this.getAttribute('data-example');
            document.querySelectorAll('.example-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`${exampleType}-example`).style.display = 'block';
        });
    });

    // Модальное окно установки
    const modal = document.getElementById('install-modal');
    const installBtn = document.querySelector('.install-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    installBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Эффект печати для заголовка
    const title = document.querySelector('h1.retro-text');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
});
