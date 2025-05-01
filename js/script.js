document.addEventListener('DOMContentLoaded', function() {
    // Инициализация подсветки синтаксиса
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // ========== Переключение темы ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    
    // Проверяем сохраненную тему или используем темную по умолчанию
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
    themeLabel.textContent = savedTheme.toUpperCase();
    
    themeToggle.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        themeLabel.textContent = theme.toUpperCase();
        localStorage.setItem('theme', theme);
    });

    // ========== Табы навигации ==========
    function switchTab(tabId) {
        // Скрываем все табы
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Убираем активные состояния у кнопок
        document.querySelectorAll('.terminal-nav .retro-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Показываем выбранный таб
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Активируем соответствующую кнопку
        const activeBtn = document.querySelector(`.terminal-nav .retro-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Вешаем обработчики на кнопки табов
    document.querySelectorAll('.terminal-nav .retro-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // ========== Вкладки примеров кода ==========
    function switchExample(exampleType) {
        // Скрываем все примеры
        document.querySelectorAll('.example-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Убираем активные состояния у кнопок
        document.querySelectorAll('.retro-tabs .retro-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Показываем выбранный пример
        const activeExample = document.getElementById(`${exampleType}-example`);
        if (activeExample) {
            activeExample.style.display = 'block';
        }
        
        // Активируем соответствующую кнопку
        const activeTabBtn = document.querySelector(`.retro-tabs .retro-tab-btn[data-example="${exampleType}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }
    }

    // Вешаем обработчики на кнопки примеров
    document.querySelectorAll('.retro-tabs .retro-tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            const exampleType = this.getAttribute('data-example');
            switchExample(exampleType);
        });
    });

    // ========== Модальное окно ==========
    const modal = document.getElementById('install-modal');
    const installBtn = document.querySelector('.install-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    if (installBtn && modal && closeBtn) {
        installBtn.addEventListener('click', function(e) {
            e.preventDefault();
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
    }

    // ========== Раскрывающиеся блоки ==========
    document.querySelectorAll('.retro-box-grid .retro-box').forEach(box => {
        box.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // ========== Инициализация начального состояния ==========
    // Активируем первую вкладку
    const defaultTab = document.querySelector('.terminal-nav .retro-btn[data-tab]');
    if (defaultTab) {
        const defaultTabId = defaultTab.getAttribute('data-tab');
        switchTab(defaultTabId);
    }
    
    // Активируем первый пример кода
    const defaultExample = document.querySelector('.retro-tabs .retro-tab-btn[data-example]');
    if (defaultExample) {
        const defaultExampleType = defaultExample.getAttribute('data-example');
        switchExample(defaultExampleType);
    }
});
