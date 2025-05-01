document.addEventListener('DOMContentLoaded', function() {
    // Загрузка контента
    loadContent('home');
    
    // Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeLabel) themeLabel.textContent = theme.toUpperCase();
        if (themeToggle) themeToggle.checked = theme === 'light';
    }
    
    // Инициализация темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            applyTheme(this.checked ? 'light' : 'dark');
        });
    }
    
    // Навигация между страницами
    document.querySelectorAll('.terminal-nav .retro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            loadContent(page);
            
            // Обновляем активную кнопку
            document.querySelectorAll('.terminal-nav .retro-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Функция загрузки контента
    async function loadContent(page) {
        try {
            const response = await fetch(`data/content.json`);
            const data = await response.json();
            
            let content = '';
            if (page === 'home') {
                content = data.home;
            } else if (page === 'chat') {
                content = await fetch('chat.html').then(r => r.text());
                initChat();
            } else {
                content = data[page] || `<h2>${page}</h2><p>Страница в разработке</p>`;
            }
            
            document.getElementById('content-area').innerHTML = content;
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
        }
    }
    
    // Инициализация чата
    function initChat() {
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');
        const chatMessages = document.getElementById('chat-messages');
        
        if (sendBtn && messageInput) {
            sendBtn.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        }
        
        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message';
                messageElement.textContent = `> ${message}`;
                chatMessages.appendChild(messageElement);
                messageInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Сохраняем сообщение (можно заменить на запрос к серверу)
                saveMessage(message);
            }
        }
        
        function saveMessage(message) {
            // Здесь можно добавить сохранение в localStorage или отправку на сервер
            console.log('Сообщение сохранено:', message);
        }
    }
});
