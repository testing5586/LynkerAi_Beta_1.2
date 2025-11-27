/**
 * 语言切换器组件
 * 在页面右上角显示语言选择下拉菜单
 */

function createLanguageSwitcher() {
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'zh', name: '简体中文', flag: '🇨🇳' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'th', name: 'ภาษาไทย', flag: '🇹🇭' },
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' }
    ];

    const currentLang = i18n.getCurrentLanguage();
    const currentLanguage = languages.find(l => l.code === currentLang) || languages[1]; // 默认中文

    const switcherHTML = `
        <div class="language-switcher">
            <button class="lang-btn" id="langBtn">
                <span class="lang-flag">${currentLanguage.flag}</span>
                <span class="lang-name">${currentLanguage.name}</span>
                <span class="lang-arrow">▼</span>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                ${languages.map(lang => `
                    <div class="lang-option ${lang.code === currentLang ? 'active' : ''}" 
                         data-lang="${lang.code}">
                        <span class="lang-flag">${lang.flag}</span>
                        <span>${lang.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    return switcherHTML;
}

// 初始化语言切换器
function initLanguageSwitcher() {
    // 先删除所有已存在的语言切换器，避免重复
    document.querySelectorAll('.language-switcher').forEach(el => el.remove());
    
    // 查找目标容器（例如 header 的右侧）
    const targetContainer = document.querySelector('.guru-nav') || document.querySelector('header');
    
    if (targetContainer) {
        // 创建语言切换器元素
        const switcherDiv = document.createElement('div');
        switcherDiv.innerHTML = createLanguageSwitcher();
        
        // 插入到容器的开头
        targetContainer.insertBefore(switcherDiv.firstElementChild, targetContainer.firstChild);
        
        // 绑定事件
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        
        // 切换下拉菜单
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        
        // 点击外部关闭下拉菜单
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });
        
        // 选择语言
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', async () => {
                const lang = option.getAttribute('data-lang');
                await i18n.switchLanguage(lang);
                
                // 重新渲染切换器以更新当前语言显示
                const newSwitcherHTML = createLanguageSwitcher();
                document.querySelector('.language-switcher').outerHTML = newSwitcherHTML;
                
                // 重新初始化
                setTimeout(() => initLanguageSwitcher(), 100);
            });
        });
    }
}

// 添加语言切换器样式
function injectLanguageSwitcherStyles() {
    const styles = `
        <style>
            .language-switcher {
                position: relative;
                display: inline-block;
                margin-right: 12px;
            }
            
            .lang-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 6px;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
                font-family: inherit;
            }
            
            .lang-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .lang-flag {
                font-size: 18px;
                line-height: 1;
            }
            
            .lang-name {
                font-size: 13px;
            }
            
            .lang-arrow {
                font-size: 10px;
                opacity: 0.7;
                transition: transform 0.3s;
            }
            
            .lang-btn:hover .lang-arrow {
                transform: translateY(2px);
            }
            
            .lang-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                margin-top: 8px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                min-width: 160px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s;
                z-index: 1000;
                overflow: hidden;
            }
            
            .lang-dropdown.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .lang-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 16px;
                color: #333;
                font-size: 14px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .lang-option:hover {
                background: #f5f5f5;
            }
            
            .lang-option.active {
                background: #e8f5ff;
                color: #667eea;
                font-weight: 600;
            }
            
            .lang-option .lang-flag {
                font-size: 20px;
            }
            
            @media (max-width: 768px) {
                .lang-name {
                    display: none;
                }
                
                .lang-btn {
                    padding: 8px 10px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectLanguageSwitcherStyles();
        setTimeout(() => initLanguageSwitcher(), 200); // 延迟确保 i18n 已加载
    });
} else {
    injectLanguageSwitcherStyles();
    setTimeout(() => initLanguageSwitcher(), 200);
}
