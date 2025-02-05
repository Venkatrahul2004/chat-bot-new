// State
let currentMode = 'chat';
let isProcessing = false;
let chatHistory = [];
let isDarkTheme = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupTextarea();
    setupTheme();
    loadChatHistory();
    showWelcomeMessage();
    setMode('chat');
}

// Chat history functions
function loadChatHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        // Display saved messages
        chatHistory.forEach(msg => {
            if (msg.role === 'user') {
                displayMessage(msg.content, 'user');
            } else if (msg.role === 'assistant') {
                processResponse(msg.content);
            }
        });
    }
}

function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Setup functions
function setupTextarea() {
    const textarea = document.getElementById('userInput');
    
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    textarea.addEventListener('input', () => {
        autoResize(textarea);
    });
}

function setupTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        isDarkTheme = savedTheme === 'dark';
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// Message handling
async function handleSendMessage() {
    if (isProcessing) return;

    const textarea = document.getElementById('userInput');
    const message = textarea.value.trim();

    if (!message) return;

    try {
        isProcessing = true;
        showToast('Processing your message...');

        // Add user message to chat history
        chatHistory.push({ role: 'user', content: message });
        
        // Display user message
        displayMessage(message, 'user');
        textarea.value = '';
        autoResize(textarea);

        // Make API call
        const response = await sendToAPI(message);
        
        // Process and display response
        if (response) {
            // Add assistant response to chat history
            chatHistory.push({ role: 'assistant', content: response });
            processResponse(response);
            
            // Save updated chat history
            saveChatHistory();
        }

    } catch (error) {
        console.error('Error:', error);
        showToast('Error processing message', 'error');
    } finally {
        isProcessing = false;
    }
}

async function sendToAPI(message) {
    try {
        // Create messages array with context from chat history
        const messages = [...chatHistory]; // Include all previous messages
        
        const response = await fetch('/api/chat', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: document.getElementById('modelSelect').value,
                messages: messages, // Send full chat history for context
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            throw new Error("Invalid API response format");
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error(`API request failed: ${error.message}`);
        return "Error processing request";
    }
}

function processResponse(response) {
    if (response.includes('```')) {
        const parts = response.split('```');
        parts.forEach((part, index) => {
            if (index % 2 === 0) {
                if (part.trim()) {
                    displayMessage(part.trim(), 'bot');
                }
            } else {
                const lines = part.split('\n');
                const language = lines[0].trim();
                const code = lines.slice(1).join('\n').trim();
                displayCodeBlock(code, language);
            }
        });
    } else {
        displayMessage(response, 'bot');
    }
}

// Display functions
function displayMessage(text, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => copyToClipboard(text, copyButton);

    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(copyButton);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function displayCodeBlock(code, language) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';

    // Create code block
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'code-block';
    codeBlock.textContent = code;

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-btn';
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => copyToClipboard(code, copyButton);

    // Add elements to message
    messageDiv.appendChild(codeBlock);
    messageDiv.appendChild(copyButton);
    
    // Add message to chatbox
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Utility functions
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        showToast('Copied to clipboard!');
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Copy failed:', error);
        showToast('Failed to copy to clipboard', 'error');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// Mode and theme functions
function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(mode));
    });

    updateSuggestions(mode);
}

function updateSuggestions(mode) {
    const suggestions = {
        chat: [
            'Explain how to improve code performance',
            'What are the best practices for React?',
            'Help me understand async/await'
        ],
        code: [
            'Create a function to sort an array',
            'Write a React component for a modal',
            'Generate an API endpoint in Express'
        ]
    };

    const container = document.getElementById('suggestions');
    container.innerHTML = '';

    suggestions[mode].forEach(text => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = text;
        div.onclick = () => {
            document.getElementById('userInput').value = text;
            document.getElementById('userInput').focus();
        };
        container.appendChild(div);
    });
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    showToast(`Switched to ${theme} theme`);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
}

function clearChat() {
    document.getElementById('chatbox').innerHTML = '';
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    showToast('Chat cleared');
}

// File upload
function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.js,.py,.html,.css,.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('userInput').value = event.target.result;
            autoResize(document.getElementById('userInput'));
        };

        reader.onerror = () => {
            showToast('Error reading file', 'error');
        };

        reader.readAsText(file);
    };

    input.click();
}

// Welcome message
function showWelcomeMessage() {
    const messages = [
        "👋 Welcome to AI Chat Assistant!",
        "💡 Try different modes using the sidebar buttons",
        "⌨️ Use Ctrl+Enter to send messages"
    ];

    messages.forEach((msg, i) => {
        setTimeout(() => {
            displayMessage(msg, 'bot');
        }, i * 1000);
    });
}