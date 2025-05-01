// Конфигурация (замените на свои данные)
const GITHUB_USER = 'ваш_логин';
const REPO_NAME = 'ваш_репозиторий';
const TOKEN = 'ваш_github_token'; // Создайте в Settings > Developer settings > Personal access tokens

let chatIssueNumber = null;

async function initChat() {
    // 1. Создаем issue для чата (если еще нет)
    const issues = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/issues?labels=chat`)
        .then(r => r.json());
    
    if (issues.length === 0) {
        const newIssue = await createGitHubIssue('Общий чат', 'Чат создан автоматически', ['chat']);
        chatIssueNumber = newIssue.number;
    } else {
        chatIssueNumber = issues[0].number;
    }
    
    // 2. Загружаем сообщения
    loadMessages();
    
    // 3. Настраиваем отправку
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

async function createGitHubIssue(title, body, labels) {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, labels })
    });
    return await response.json();
}

async function loadMessages() {
    const comments = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/issues/${chatIssueNumber}/comments`)
        .then(r => r.json());
    
    const chat = document.getElementById('chat-messages');
    chat.innerHTML = '';
    
    comments.forEach(comment => {
        const message = document.createElement('div');
        message.className = 'chat-message';
        message.innerHTML = `
            <strong>${comment.user.login}:</strong>
            <span>${comment.body}</span>
            <small>${new Date(comment.created_at).toLocaleString()}</small>
        `;
        chat.appendChild(message);
    });
    
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message && chatIssueNumber) {
        await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/issues/${chatIssueNumber}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: message })
        });
        
        input.value = '';
        loadMessages();
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initChat);
