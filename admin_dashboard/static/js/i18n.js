/**
 * LynkerAI 多语言国际化系统
 * 支持语言: 中文, English, 日本語, ภาษาไทย, Tiếng Việt, 한국어
 */

class I18n {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'zh';
        this.translations = {};
        this.loadTranslations();
    }

    // 从 localStorage 获取保存的语言偏好
    getSavedLanguage() {
        return localStorage.getItem('lynkerAI_language');
    }

    // 保存语言偏好到 localStorage
    saveLanguage(lang) {
        localStorage.setItem('lynkerAI_language', lang);
        this.currentLang = lang;
    }

    // 加载翻译文件
    async loadTranslations() {
        try {
            const response = await fetch('/static/i18n/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    // 获取翻译文本
    t(key, lang = null) {
        const targetLang = lang || this.currentLang;
        const keys = key.split('.');
        let value = this.translations[targetLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // 返回 key 如果找不到翻译
            }
        }
        
        return value || key;
    }

    // 切换语言
    async switchLanguage(lang) {
        if (!['en', 'zh', 'ja', 'th', 'vi', 'ko'].includes(lang)) {
            console.error('Unsupported language:', lang);
            return;
        }
        
        this.saveLanguage(lang);
        this.updatePageContent();
        
        // 触发语言切换事件
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    // 更新页面所有带 data-i18n 属性的元素
    updatePageContent() {
        // 更新文本内容
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });

        // 更新 HTML 内容（用于包含标签的翻译，如隐私提示）
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const html = this.t(key);
            element.innerHTML = html;
        });

        // 更新 placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // 更新 value
        document.querySelectorAll('[data-i18n-value]').forEach(element => {
            const key = element.getAttribute('data-i18n-value');
            element.value = this.t(key);
        });
    }

    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// 创建全局 i18n 实例
const i18n = new I18n();

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await i18n.loadTranslations();
        i18n.updatePageContent();
    });
} else {
    // DOMContentLoaded 已经触发
    (async () => {
        await i18n.loadTranslations();
        i18n.updatePageContent();
    })();
}
