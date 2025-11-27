window.userProfileCard = (function() {
    let userData = null;
    
    function init(user) {
        userData = user;
        setupEventListeners();
        renderNavbarAvatar();
        renderProfileCard();
    }
    
    function setupEventListeners() {
        const trigger = document.getElementById('userAvatarTrigger');
        const overlay = document.getElementById('profileCardOverlay');
        const closeBtn = document.getElementById('closeProfileCard');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                openProfileCard();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeProfileCard();
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeProfileCard);
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeProfileCard();
            }
        });
    }
    
    function renderNavbarAvatar() {
        if (!userData) return;
        
        const avatarContainer = document.getElementById('navbarUserAvatar');
        const nicknameElement = document.getElementById('navbarUserNickname');
        
        if (avatarContainer) {
            const avatarText = getAvatarText(userData.nickname || userData.email);
            const colorIndex = getColorIndex(userData.nickname || userData.email);
            const colors = [
                'linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)',
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ];
            
            avatarContainer.style.background = colors[colorIndex];
            avatarContainer.textContent = avatarText;
        }
        
        if (nicknameElement) {
            nicknameElement.textContent = userData.nickname || userData.email.split('@')[0];
        }
    }
    
    function renderProfileCard() {
        if (!userData) return;
        
        const avatarLarge = document.getElementById('profileAvatarLarge');
        const nickname = document.getElementById('profileNickname');
        const email = document.getElementById('profileEmail');
        const registeredDate = document.getElementById('profileRegisteredDate');
        const userTypeBadge = document.getElementById('userTypeBadge');
        
        if (avatarLarge) {
            const avatarText = getAvatarText(userData.nickname || userData.email);
            const colorIndex = getColorIndex(userData.nickname || userData.email);
            const colors = [
                'linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)',
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ];
            
            avatarLarge.style.background = colors[colorIndex];
            avatarLarge.textContent = avatarText;
        }
        
        if (nickname) {
            nickname.textContent = userData.nickname || userData.email.split('@')[0];
        }
        
        if (email) {
            email.textContent = userData.email || '';
        }
        
        if (registeredDate && userData.created_at) {
            const date = new Date(userData.created_at);
            registeredDate.textContent = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\//g, '.');
        }
        
        if (userTypeBadge) {
            if (userData.user_type === 'guru') {
                userTypeBadge.classList.add('guru');
            }
        }
        
        // 渲染绑定账号状态
        renderLinkedAccounts();
        
        // 渲染API使用情况
        renderAPIUsage();
    }
    
    function renderLinkedAccounts() {
        const phoneValue = document.getElementById('linkedPhoneValue');
        const wechatValue = document.getElementById('linkedWechatValue');
        
        if (phoneValue) {
            phoneValue.textContent = userData.phone || '未绑定手机';
        }
        
        if (wechatValue) {
            wechatValue.textContent = userData.wechat || '已绑定微信号';
        }
    }
    
    function renderAPIUsage() {
        const dailyUsageValue = document.getElementById('dailyUsageValue');
        const monthlyUsageValue = document.getElementById('monthlyUsageValue');
        const dailyProgressFill = document.getElementById('dailyProgressFill');
        const monthlyProgressFill = document.getElementById('monthlyProgressFill');
        const dailyPercentage = document.getElementById('dailyPercentage');
        const monthlyPercentage = document.getElementById('monthlyPercentage');
        
        // 模拟数据（实际应从后端获取）
        const dailyUsed = userData.api_daily_used || 1250;
        const dailyLimit = userData.api_daily_limit || 10000;
        const monthlyRemaining = userData.api_monthly_remaining || 48750;
        const monthlyLimit = userData.api_monthly_limit || 100000;
        const monthlyUsed = monthlyLimit - monthlyRemaining;
        
        const dailyPercent = Math.min((dailyUsed / dailyLimit) * 100, 100);
        const monthlyPercent = Math.min((monthlyUsed / monthlyLimit) * 100, 100);
        
        if (dailyUsageValue) {
            dailyUsageValue.textContent = `${dailyUsed.toLocaleString()} / ${dailyLimit.toLocaleString()}`;
        }
        
        if (monthlyUsageValue) {
            monthlyUsageValue.textContent = `${monthlyRemaining.toLocaleString()} Token`;
        }
        
        if (dailyProgressFill) {
            dailyProgressFill.style.width = `${dailyPercent}%`;
            if (dailyPercent >= 80) {
                dailyProgressFill.classList.add('high-usage');
            }
        }
        
        if (monthlyProgressFill) {
            monthlyProgressFill.style.width = `${monthlyPercent}%`;
            if (monthlyPercent >= 80) {
                monthlyProgressFill.classList.add('high-usage');
            }
        }
        
        if (dailyPercentage) {
            dailyPercentage.textContent = `${dailyPercent.toFixed(1)}% 已使用`;
        }
        
        if (monthlyPercentage) {
            monthlyPercentage.textContent = `${monthlyPercent.toFixed(1)}% 已使用`;
        }
    }
    
    function getAvatarText(name) {
        if (!name) return '?';
        
        const isChinese = /[\u4e00-\u9fa5]/.test(name);
        
        if (isChinese) {
            return name.substring(0, 2);
        } else {
            const parts = name.split(/[\s@._-]+/).filter(p => p.length > 0);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
            } else if (parts.length === 1) {
                return parts[0].substring(0, 2).toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        }
    }
    
    function getColorIndex(name) {
        if (!name) return 0;
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % 6;
    }
    
    function openProfileCard() {
        const overlay = document.getElementById('profileCardOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeProfileCard() {
        const overlay = document.getElementById('profileCardOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    async function handleLogout() {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert('退出登录失败，请重试');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('退出登录失败，请重试');
        }
    }
    
    return {
        init: init,
        openProfileCard: openProfileCard,
        closeProfileCard: closeProfileCard
    };
})();
