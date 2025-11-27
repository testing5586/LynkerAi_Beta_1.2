/**
 * 用户头像组件 - 生成首字母头像
 * User Avatar Component - Generates initial-based avatars
 */

function generateAvatarColor(name) {
  // 根据昵称生成一致的颜色
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',  // Purple (default)
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',  // Pink
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',  // Blue
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',  // Green
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',  // Orange
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',  // Teal
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
  if (!name) return '?';
  
  // 处理中文和英文昵称
  const trimmed = name.trim();
  
  // 如果是中文，取前两个字
  if (/[\u4e00-\u9fa5]/.test(trimmed)) {
    return trimmed.substring(0, 2);
  }
  
  // 如果是英文，取前两个字母或者首字母
  const parts = trimmed.split(/[\s_-]+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  
  return trimmed.substring(0, 2).toUpperCase();
}

function createUserAvatar(nickname, options = {}) {
  const {
    size = 60,
    fontSize = 24,
    showName = true,
    subtitle = null
  } = options;
  
  const initials = getInitials(nickname);
  const bgColor = generateAvatarColor(nickname);
  
  let html = `
    <div class="user-profile-header">
      <div class="user-avatar" style="
        width: ${size}px;
        height: ${size}px;
        background: ${bgColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${fontSize}px;
        font-weight: 600;
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        flex-shrink: 0;
      ">
        ${initials}
      </div>
  `;
  
  if (showName) {
    html += `
      <div class="user-info">
        <div class="user-nickname">${nickname}</div>
        ${subtitle ? `<div class="user-subtitle">${subtitle}</div>` : ''}
      </div>
    `;
  }
  
  html += `</div>`;
  
  return html;
}

// 注入全局样式
function injectUserAvatarStyles() {
  if (document.getElementById('user-avatar-styles')) return;
  
  const styles = `
    .user-profile-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border-radius: 12px;
      margin-bottom: 24px;
      border: 1px solid rgba(102, 126, 234, 0.1);
    }
    
    .user-info {
      flex: 1;
    }
    
    .user-nickname {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    
    .user-subtitle {
      font-size: 13px;
      color: #666;
    }
    
    @media (max-width: 480px) {
      .user-profile-header {
        padding: 16px;
      }
      
      .user-avatar {
        width: 50px !important;
        height: 50px !important;
        font-size: 20px !important;
      }
      
      .user-nickname {
        font-size: 16px;
      }
    }
  `;
  
  const styleTag = document.createElement('style');
  styleTag.id = 'user-avatar-styles';
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

// 自动初始化
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', injectUserAvatarStyles);
}
