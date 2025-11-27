// NewChat 多话题聊天系统 - 前端逻辑

let currentTopicId = null;
let topics = [];
let isAIResponding = false;

// ==================== 页面加载初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTopics();
    
    // 输入框自动调整高度
    const chatInput = document.getElementById('chatInput');
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
    });
    
    // Enter 发送，Shift+Enter 换行
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// ==================== 话题管理 ====================
async function loadTopics() {
    try {
        const response = await fetch('/newchat/api/topics');
        const data = await response.json();
        
        if (data.success) {
            topics = data.topics;
            renderTopics();
        } else {
            console.error('加载话题失败:', data.error);
        }
    } catch (error) {
        console.error('加载话题出错:', error);
    }
}

function renderTopics() {
    const topicsList = document.getElementById('topicsList');
    
    if (topics.length === 0) {
        topicsList.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #808080; font-size: 13px;">
                暂无对话<br>点击上方按钮新建
            </div>
        `;
        return;
    }
    
    topicsList.innerHTML = topics.map(topic => `
        <div class="topic-item ${topic.id === currentTopicId ? 'active' : ''}" 
             onclick="switchTopic(${topic.id})"
             data-topic-id="${topic.id}">
            <div style="flex: 1;">
                <div class="topic-title">${escapeHtml(topic.title)}</div>
                <div class="topic-time">${formatTime(topic.updated_at)}</div>
            </div>
            <div class="topic-actions">
                <button class="topic-action-btn" onclick="event.stopPropagation(); renameTopicById(${topic.id})">✏️</button>
                <button class="topic-action-btn delete" onclick="event.stopPropagation(); deleteTopicById(${topic.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

async function createNewTopic() {
    const title = prompt('请输入新对话的标题：', '新对话 ' + (topics.length + 1));
    if (!title) return;
    
    try {
        const response = await fetch('/newchat/api/topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        const data = await response.json();
        
        if (data.success) {
            topics.unshift(data.topic);
            renderTopics();
            switchTopic(data.topic.id);
        } else {
            alert('创建话题失败: ' + data.error);
        }
    } catch (error) {
        console.error('创建话题出错:', error);
        alert('创建话题失败');
    }
}

async function renameTopicById(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    const newTitle = prompt('请输入新的标题：', topic.title);
    if (!newTitle || newTitle === topic.title) return;
    
    try {
        const response = await fetch(`/newchat/api/topics/${topicId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        });
        
        const data = await response.json();
        
        if (data.success) {
            topic.title = newTitle;
            renderTopics();
            if (currentTopicId === topicId) {
                document.getElementById('currentTopicTitle').textContent = newTitle;
            }
        } else {
            alert('重命名失败: ' + data.error);
        }
    } catch (error) {
        console.error('重命名出错:', error);
        alert('重命名失败');
    }
}

function renameTopic() {
    if (!currentTopicId) return;
    renameTopicById(currentTopicId);
}

async function deleteTopicById(topicId) {
    if (!confirm('确定要删除这个话题吗？所有聊天记录将被删除。')) return;
    
    try {
        const response = await fetch(`/newchat/api/topics/${topicId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            topics = topics.filter(t => t.id !== topicId);
            renderTopics();
            
            if (currentTopicId === topicId) {
                currentTopicId = null;
                showEmptyState();
            }
        } else {
            alert('删除失败: ' + data.error);
        }
    } catch (error) {
        console.error('删除出错:', error);
        alert('删除失败');
    }
}

function deleteTopic() {
    if (!currentTopicId) return;
    deleteTopicById(currentTopicId);
}

async function switchTopic(topicId) {
    currentTopicId = topicId;
    renderTopics();
    
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
        document.getElementById('currentTopicTitle').textContent = topic.title;
        document.getElementById('renameBtn').style.display = 'block';
        document.getElementById('deleteBtn').style.display = 'block';
    }
    
    // 启用输入框
    document.getElementById('chatInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
    
    // 加载消息历史
    await loadMessages(topicId);
}

// ==================== 消息管理 ====================
async function loadMessages(topicId) {
    try {
        const response = await fetch(`/newchat/api/topics/${topicId}/messages`);
        const data = await response.json();
        
        if (data.success) {
            renderMessages(data.messages);
        } else {
            console.error('加载消息失败:', data.error);
        }
    } catch (error) {
        console.error('加载消息出错:', error);
    }
}

function renderMessages(messages) {
    const chatMessages = document.getElementById('chatMessages');
    const emptyState = document.getElementById('emptyState');
    
    emptyState.style.display = 'none';
    
    if (messages.length === 0) {
        chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-content">
                    <p>你好！我是灵客 AI，有什么可以帮您的吗？</p>
                </div>
            </div>
        `;
    } else {
        chatMessages.innerHTML = messages.map(msg => {
            const isUser = msg.role === 'user';
            return `
                <div class="message ${isUser ? 'user-message' : 'ai-message'}">
                    <div class="message-content">
                        ${formatMessageContent(msg.content)}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    scrollToBottom();
}

function addMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const emptyState = document.getElementById('emptyState');
    
    emptyState.style.display = 'none';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${formatMessageContent(content)}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    return messageDiv;
}

async function sendMessage() {
    if (!currentTopicId || isAIResponding) return;
    
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // 显示用户消息
    addMessage('user', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // 禁用输入
    isAIResponding = true;
    chatInput.disabled = true;
    document.getElementById('sendBtn').disabled = true;
    
    // 创建 AI 消息占位符
    const aiMessageDiv = addMessage('assistant', '正在思考...');
    const aiMessageContent = aiMessageDiv.querySelector('.message-content');
    
    try {
        const response = await fetch(`/newchat/api/topics/${currentTopicId}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error('请求失败');
        }
        
        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.substring(6));
                        
                        if (data.content) {
                            fullResponse += data.content;
                            aiMessageContent.innerHTML = formatMessageContent(fullResponse);
                            scrollToBottom();
                        }
                        
                        if (data.done) {
                            console.log('AI 响应完成');
                        }
                        
                        if (data.error) {
                            aiMessageContent.innerHTML = `<p style="color: #ff4444;">错误: ${data.error}</p>`;
                        }
                    } catch (e) {
                        console.error('解析响应出错:', e);
                    }
                }
            }
        }
        
    } catch (error) {
        console.error('发送消息出错:', error);
        aiMessageContent.innerHTML = '<p style="color: #ff4444;">发送失败，请重试</p>';
    } finally {
        // 恢复输入
        isAIResponding = false;
        chatInput.disabled = false;
        document.getElementById('sendBtn').disabled = false;
        chatInput.focus();
    }
}

// ==================== 工具函数 ====================
function showEmptyState() {
    const chatMessages = document.getElementById('chatMessages');
    const emptyState = document.getElementById('emptyState');
    
    chatMessages.innerHTML = '';
    emptyState.style.display = 'flex';
    
    document.getElementById('currentTopicTitle').textContent = '选择或新建一个话题开始聊天';
    document.getElementById('renameBtn').style.display = 'none';
    document.getElementById('deleteBtn').style.display = 'none';
    document.getElementById('chatInput').disabled = true;
    document.getElementById('sendBtn').disabled = true;
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessageContent(content) {
    // 简单的 Markdown 转换
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    if (days < 7) return `${days} 天前`;
    
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}
