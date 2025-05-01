<!-- В head добавить перед закрывающим тегом -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>

<!-- В конец body перед закрывающим тегом -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализация подсветки синтаксиса
        hljs.highlightAll();
        
        // Переключение темы
        const themeToggle = document.getElementById('theme-toggle');
        const themeLabel = document.querySelector('.theme-label');
        
        // Проверяем сохраненную тему
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

        // Табы навигации
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.terminal-nav .retro-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.terminal-nav .retro-btn[data-tab="${tabId}"]`).classList.add('active');
        }

        document.querySelectorAll('.terminal-nav .retro-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // Примеры с вкладками
        function switchExample(exampleId) {
            document.querySelectorAll('.example-content').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('.retro-tabs .retro-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(exampleId).style.display = 'block';
            document.querySelector(`.retro-tabs .retro-tab-btn[data-example="${exampleId.split('-')[0]}"]`).classList.add('active');
        }

        document.querySelectorAll('.retro-tabs .retro-tab-btn').forEach(tab => {
            tab.addEventListener('click', function() {
                const exampleType = this.getAttribute('data-example');
                switchExample(`${exampleType}-example`);
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

        // Раскрывающиеся блоки функций
        document.querySelectorAll('.retro-box-grid .retro-box').forEach(box => {
            box.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });

        // Инициализация первого таба
        switchTab('about');
        switchExample('string-example');
    });
</script>
