/**
 * UXBot User Profile Card Component
 * 统一的用户 Profile Card 下拉菜单组件
 * 在 header 右上角头像按钮点击时显示
 * 
 * 使用方法：在页面中引入此脚本即可
 * <script src="/static/js/uxbot-user-profile-card.js"></script>
 */
(function() {
  'use strict';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAvatarUrl() {
    var role = localStorage.getItem('user_role') || 'user';
    var isGuru = role === 'guru';
    // Try multiple keys for avatar URL
    var url = localStorage.getItem(isGuru ? 'guru_avatar_url' : 'user_avatar_url')
      || localStorage.getItem('avatar_url')
      || localStorage.getItem('user_avatar_url')
      || '';
    return url.trim();
  }

  function getUserName() {
    var role = localStorage.getItem('user_role') || 'user';
    var isGuru = role === 'guru';
    // 优先使用pseudonym（假名），其次user_name
    return localStorage.getItem(isGuru ? 'guru_pseudonym' : 'user_pseudonym')
      || localStorage.getItem('user_pseudonym')
      || localStorage.getItem(isGuru ? 'guru_name' : 'user_name')
      || localStorage.getItem('user_name')
      || '用户';
  }

  function getUserId() {
    var role = localStorage.getItem('user_role') || 'user';
    var isGuru = role === 'guru';
    return localStorage.getItem(isGuru ? 'guru_id' : 'user_id') || '';
  }

  // Update the header avatar button with correct user info
  function updateHeaderAvatar() {
    var avatarBtn = document.querySelector('header button[aria-haspopup="dialog"]');
    if (!avatarBtn) return;

    var userName = getUserName();
    var avatarUrl = getAvatarUrl();
    var safeName = escapeHtml(userName);

    // Clone button to remove all React event handlers
    var parent = avatarBtn.parentNode;
    var newBtn = avatarBtn.cloneNode(false);
    newBtn.removeAttribute('aria-haspopup');
    newBtn.removeAttribute('aria-expanded');
    newBtn.removeAttribute('aria-controls');
    newBtn.removeAttribute('data-state');
    newBtn.className = avatarBtn.className;
    newBtn.type = 'button';

    if (avatarUrl) {
      newBtn.innerHTML = '<span class="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">' +
        '<img class="aspect-square h-full w-full" alt="' + safeName + '" src="' + escapeHtml(avatarUrl) + '" />' +
        '</span>';
    } else if (userName) {
      newBtn.innerHTML = '<span class="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">' +
        '<span class="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">' + escapeHtml(userName.slice(0, 2)) + '</span>' +
        '</span>';
    }

    newBtn.addEventListener('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      showUserMenu(ev);
    }, true);

    parent.replaceChild(newBtn, avatarBtn);
  }

  // Custom user menu (matching index.html style)
  function showUserMenu(e) {
    // Remove existing menu
    var existingMenu = document.getElementById('userDropdownMenu');
    if (existingMenu) existingMenu.remove();

    var role = localStorage.getItem('user_role') || 'user';
    var isGuru = role === 'guru';
    var idValue = getUserId();
    var userName = getUserName();
    var safeName = escapeHtml(userName);
    var avatarUrl = getAvatarUrl();
    var uidText = idValue ? 'UID-' + String(idValue).split('-')[0].toUpperCase() : 'UID-—';
    var region = localStorage.getItem(isGuru ? 'guru_region' : 'user_region') || localStorage.getItem('region') || '';

    // Subscription info
    var subscriptionName = isGuru
      ? (localStorage.getItem('guru_subscription_name') || localStorage.getItem('subscription_name') || '免費版')
      : (localStorage.getItem('user_subscription_name') || '免費版');
    var subscriptionExpiry = isGuru
      ? (localStorage.getItem('guru_subscription_expiry') || localStorage.getItem('subscription_expiry') || '—')
      : (localStorage.getItem('user_subscription_expiry') || '—');

    // Token usage info
    var usedRaw = isGuru
      ? (localStorage.getItem('guru_token_used') || localStorage.getItem('token_used') || localStorage.getItem('tokens_used'))
      : localStorage.getItem('user_token_used');
    var limitRaw = isGuru
      ? (localStorage.getItem('guru_token_limit') || localStorage.getItem('token_limit') || localStorage.getItem('token_total') || localStorage.getItem('tokens_total'))
      : (localStorage.getItem('user_token_limit') || localStorage.getItem('user_token_total'));
    var used = Number(usedRaw);
    var limit = Number(limitRaw);
    var hasTokenData = Number.isFinite(used) && Number.isFinite(limit) && limit > 0;
    var remaining = hasTokenData ? Math.max(0, limit - used) : null;
    var pct = hasTokenData ? Math.max(0, Math.min(100, Math.round((remaining / limit) * 100))) : 0;

    var menu = document.createElement('div');
    menu.id = 'userDropdownMenu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('tabindex', '-1');
    menu.dataset.state = 'open';
    menu.dataset.side = 'bottom';
    menu.dataset.align = 'end';
    menu.className = 'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin] w-80 glass-card';
    menu.style.position = 'fixed';
    menu.style.zIndex = '9999';
    menu.style.maxWidth = 'calc(100vw - 24px)';

    var btn = e && e.target ? e.target.closest('button') : null;
    var rect = btn ? btn.getBoundingClientRect() : { bottom: 60, right: window.innerWidth - 12 };
    menu.style.top = (rect.bottom + 10) + 'px';
    menu.style.right = Math.max(12, (window.innerWidth - rect.right)) + 'px';

    var avatarHtml = avatarUrl
      ? '<img class="aspect-square h-full w-full" alt="' + safeName + '" src="' + escapeHtml(avatarUrl) + '" />'
      : '<span class="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">' + escapeHtml(userName.slice(0, 2)) + '</span>';

    menu.innerHTML = '<div class="flex items-start gap-4 mb-4">' +
      '<span class="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">' + avatarHtml + '</span>' +
      '<div class="flex-1">' +
        '<h3 class="font-semibold text-lg">' + safeName + '</h3>' +
        '<p class="text-xs text-muted-foreground">' + escapeHtml(uidText) + '</p>' +
        (region ? '<div class="mt-2"><div class="inline-flex items-center rounded-md border font-semibold text-foreground text-xs px-2 py-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-3 h-3 mr-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>' + escapeHtml(region) + '</div></div>' : '') +
      '</div>' +
    '</div>' +

    '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>' +

    // Subscription section
    '<div class="space-y-2 mb-4">' +
      '<div class="flex items-center justify-between">' +
        '<span class="text-sm text-muted-foreground">订阅套餐</span>' +
        '<div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent shadow hover:bg-primary/80 bg-accent text-accent-foreground">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown h-3 w-3 mr-1"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>' +
          escapeHtml(subscriptionName) +
        '</div>' +
      '</div>' +
      '<div class="flex items-center justify-between text-xs text-muted-foreground">' +
        '<span>有效期至</span>' +
        '<span>' + escapeHtml(subscriptionExpiry) + '</span>' +
      '</div>' +
    '</div>' +

    '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>' +

    // API Token section
    '<div class="space-y-2 mb-4">' +
      '<div class="flex items-center justify-between">' +
        '<span class="text-sm text-muted-foreground">API Token使用</span>' +
        '<span class="text-sm font-semibold" style="color:#22c55e; font-variant-numeric: tabular-nums;">' + (hasTokenData ? remaining + ' Token' : '— Token') + '</span>' +
      '</div>' +
      '<div class="w-full bg-muted rounded-full h-2">' +
        '<div class="bg-mystical-gradient h-2 rounded-full transition-all" style="width: ' + pct + '%;"></div>' +
      '</div>' +
      '<p class="text-xs text-muted-foreground">' + (hasTokenData ? '剩余 ' + remaining + ' tokens（总额 ' + limit + '）' : '剩余 — tokens') + '</p>' +
    '</div>' +

    '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>' +

    '<div class="space-y-2">' +
      '<a href="/uxbot/user-dashb-main.html?user_id=' + encodeURIComponent(idValue) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-4 w-4 mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>编辑个人资料</a>' +
      '<a href="/uxbot/user-dashb-knowledge.html?user_id=' + encodeURIComponent(idValue) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open h-4 w-4 mr-2"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>我的知识库</a>' +
      '<a href="/uxbot/user-dashb-aisetting.html?user_id=' + encodeURIComponent(idValue) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings h-4 w-4 mr-2"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>AI助手设置</a>' +
      '<a href="/uxbot/user-subscription.html?user_id=' + encodeURIComponent(idValue) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card h-4 w-4 mr-2"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>充值Token</a>' +
      '<button id="logoutBtn" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent h-9 px-4 py-2 w-full justify-start text-destructive hover:text-destructive" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out h-4 w-4 mr-2"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>退出登录</button>' +
    '</div>';

    document.body.appendChild(menu);

    // Logout handler
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        try {
          localStorage.removeItem('uxbot_logged_in');
          localStorage.removeItem('user_role');
          localStorage.removeItem('user_id');
          localStorage.removeItem('guru_id');
          localStorage.removeItem('user_name');
          localStorage.removeItem('guru_name');
          localStorage.removeItem('current_guru_id');
          localStorage.removeItem('user_avatar_url');
          localStorage.removeItem('guru_avatar_url');
          localStorage.removeItem('avatar_url');
        } catch (e) {}
        window.location.href = '/uxbot/index.html';
      });
    }

    // Close menu when clicking outside
    function closeMenu(ev) {
      if (!menu.contains(ev.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu, true);
      }
    }
    setTimeout(function() {
      document.addEventListener('click', closeMenu, true);
    }, 100);
  }

  // Run after hydration
  function init() {
    // First sync profile from server if needed
    var userId = '';
    try {
      var urlParams = new URLSearchParams(window.location.search);
      userId = urlParams.get('user_id') || localStorage.getItem('user_id') || '';
    } catch (e) {
      userId = localStorage.getItem('user_id') || '';
    }

    // Validate UUID format before making API call
    var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    var isValidUuid = userId && uuidRegex.test(userId);

    if (isValidUuid) {
      // Fetch profile and update localStorage
      fetch('/api/user/profile/' + encodeURIComponent(userId))
        .then(function(res) { 
          if (!res.ok) throw new Error('API error');
          return res.json(); 
        })
        .then(function(data) {
          if (data && data.success && data.data) {
            var pData = data.data;
            // 优先使用pseudonym（假名），如果没有则用name
            if (pData.pseudonym) {
              localStorage.setItem('user_pseudonym', pData.pseudonym);
              localStorage.setItem('user_name', pData.pseudonym);
            } else if (pData.name) {
              localStorage.setItem('user_name', pData.name);
            }
            if (pData.avatar_url) localStorage.setItem('user_avatar_url', pData.avatar_url);

            // Notify other components (e.g., dashboard avatar section) to re-render.
            try {
              window.dispatchEvent(new CustomEvent('userProfileUpdated', {
                detail: {
                  name: pData.pseudonym || pData.name || getUserName(),
                  avatar_url: pData.avatar_url || getAvatarUrl()
                }
              }));
            } catch (e) {}
          }
          updateHeaderAvatar();
        })
        .catch(function(err) {
          console.warn('Profile fetch failed:', err);
          updateHeaderAvatar();
        });
    } else {
      // Invalid or missing user ID, just update header from localStorage
      updateHeaderAvatar();
    }
  }

  // Wait for React hydration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 800);
    });
  } else {
    setTimeout(init, 800);
  }

  // Listen for profile updates from other scripts
  window.addEventListener('userProfileUpdated', function(event) {
    console.log('[ProfileCard] User profile updated event received');
    updateHeaderAvatar();
  });

  // Listen for avatar updates (e.g., avatar uploader) and refresh header avatar.
  window.addEventListener('avatarUpdated', function(event) {
    try {
      var nextUrl = event && event.detail && event.detail.avatar_url;
      if (nextUrl) {
        localStorage.setItem('user_avatar_url', nextUrl);
        localStorage.setItem('avatar_url', nextUrl);
      }
    } catch (e) {}
    updateHeaderAvatar();
  });

  // Export for external use
  window.UXBotProfileCard = {
    init: init,
    updateHeaderAvatar: updateHeaderAvatar,
    showUserMenu: showUserMenu
  };
})();
