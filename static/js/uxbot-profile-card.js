/**
 * UXBot Profile Card Component
 * 統一的用戶資料卡片組件，用於所有 guru 頁面的右上角 avatar 下拉菜單
 * 
 * Usage:
 *   <script src="/static/js/uxbot-profile-card.js"></script>
 *   Then call: UXBotProfileCard.init()
 */
(function(global) {
  'use strict';

  const COUNTRY_NAME_MAP = {
    'CN': '中国', 'TW': '台湾', 'HK': '香港', 'MO': '澳门', 'SG': '新加坡',
    'MY': '马来西亚', 'US': '美国', 'CA': '加拿大', 'GB': '英国', 'AU': '澳大利亚',
    'JP': '日本', 'KR': '韩国', 'TH': '泰国', 'VN': '越南', 'PH': '菲律宾',
    'ID': '印尼', 'IN': '印度', 'DE': '德国', 'FR': '法国', 'IT': '意大利',
    'ES': '西班牙', 'NL': '荷兰', 'BE': '比利时', 'CH': '瑞士', 'AT': '奥地利',
    'NZ': '新西兰', 'BR': '巴西', 'MX': '墨西哥', 'AR': '阿根廷', 'CL': '智利',
    'RU': '俄罗斯', 'UA': '乌克兰', 'PL': '波兰', 'SE': '瑞典', 'NO': '挪威',
    'DK': '丹麦', 'FI': '芬兰', 'PT': '葡萄牙', 'GR': '希腊', 'TR': '土耳其',
    'AE': '阿联酋', 'SA': '沙特', 'EG': '埃及', 'ZA': '南非', 'NG': '尼日利亚',
    'IL': '以色列', 'IE': '爱尔兰', 'CZ': '捷克', 'HU': '匈牙利', 'RO': '罗马尼亚'
  };

  // ─────────────────────────────────────────────────────────────────
  // Utilities
  // ─────────────────────────────────────────────────────────────────
  function safeLocalStorageGet(key, fallback = '') {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  function safeLocalStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getGuruId() {
    const params = new URLSearchParams(window.location.search);
    const urlGuruId = params.get('guru_id') || params.get('id');
    if (urlGuruId) {
      safeLocalStorageSet('current_guru_id', urlGuruId);
      safeLocalStorageSet('guru_id', urlGuruId);
      return urlGuruId;
    }
    return safeLocalStorageGet('current_guru_id') || safeLocalStorageGet('guru_id') || null;
  }

  function getCountryName(countryCode) {
    if (!countryCode) return '';
    const code = String(countryCode).toUpperCase().trim();
    return COUNTRY_NAME_MAP[code] || countryCode;
  }

  // ─────────────────────────────────────────────────────────────────
  // Profile Fetching
  // ─────────────────────────────────────────────────────────────────
  let cachedProfile = null;
  let profilePromise = null;
  let cachedSubscription = null;

  async function fetchSubscription(guruId) {
    if (!guruId) return null;
    try {
      const res = await fetch(`/api/subscription/${encodeURIComponent(guruId)}`, {
        credentials: 'include',
        cache: 'no-store'
      });
      if (!res.ok) return null;
      const json = await res.json();
      
      // API returns { success: true, data: { has_subscription: true, ... } }
      const data = (json && json.success && json.data) ? json.data : json;
      
      if (data && data.has_subscription) {
        const planNames = { 'free': '免费版', 'pro': '专业版' };
        const subscription = {
          plan: data.plan || 'free',
          planName: planNames[data.plan] || data.plan || '—',
          tokenQuota: data.token_quota || 0,
          tokenUsed: data.token_used || 0,
          tokenRemaining: data.token_remaining || 0,
          status: data.status || 'active',
          expiresAt: data.period_end || null
        };

        // Cache to localStorage for profile card display
        safeLocalStorageSet('subscription_plan', subscription.plan);
        safeLocalStorageSet('subscription_name', subscription.planName);
        safeLocalStorageSet('token_used', String(subscription.tokenUsed));
        safeLocalStorageSet('token_limit', String(subscription.tokenQuota));
        
        if (subscription.expiresAt) {
          try {
            const expDate = new Date(subscription.expiresAt);
            safeLocalStorageSet('subscription_expiry', expDate.toLocaleDateString('zh-CN'));
          } catch (e) {
            safeLocalStorageSet('subscription_expiry', subscription.expiresAt);
          }
        } else {
          safeLocalStorageSet('subscription_expiry', '—');
        }

        cachedSubscription = subscription;
        return subscription;
      } else {
        // No subscription
        safeLocalStorageSet('subscription_plan', 'free');
        safeLocalStorageSet('subscription_name', '—');
        safeLocalStorageSet('token_used', '0');
        safeLocalStorageSet('token_limit', '0');
        safeLocalStorageSet('subscription_expiry', '—');
        return null;
      }
    } catch (e) {
      console.error('[UXBotProfileCard] Subscription fetch error:', e);
      return null;
    }
  }

  async function fetchProfile(guruId) {
    if (!guruId) return null;
    if (profilePromise) return profilePromise;

    profilePromise = (async () => {
      try {
        // Fetch profile and subscription in parallel
        const [profileRes, subscription] = await Promise.all([
          fetch(`/api/guru/profile/${encodeURIComponent(guruId)}`, { 
            credentials: 'include',
            cache: 'no-store'
          }),
          fetchSubscription(guruId)
        ]);
        
        if (!profileRes.ok) return null;
        const json = await profileRes.json();
        
        // API returns { success: true, data: {...} }
        const data = (json && json.success && json.data) ? json.data : json;
        
        const profile = {
          name: data.name || data.display_name || '',
          avatar: data.avatar || data.profile_image_url || data.avatar_url || '',
          country: data.country || '',
          shortId: guruId ? String(guruId).split('-')[0].toUpperCase() : ''
        };

        // Cache to localStorage
        if (profile.name) safeLocalStorageSet('guru_name', profile.name);
        if (profile.avatar) safeLocalStorageSet('guru_avatar_url', profile.avatar);
        if (profile.country) safeLocalStorageSet('guru_country', profile.country);

        cachedProfile = profile;
        return profile;
      } catch (e) {
        console.error('[UXBotProfileCard] Fetch error:', e);
        return null;
      } finally {
        profilePromise = null;
      }
    })();

    return profilePromise;
  }

  function getCachedProfile() {
    if (cachedProfile) return cachedProfile;
    return {
      name: safeLocalStorageGet('guru_name') || safeLocalStorageGet('user_name') || '',
      avatar: safeLocalStorageGet('guru_avatar_url') || safeLocalStorageGet('avatar_url') || '',
      country: safeLocalStorageGet('guru_country') || safeLocalStorageGet('region') || '',
      shortId: ''
    };
  }

  // ─────────────────────────────────────────────────────────────────
  // Build Profile Card HTML
  // ─────────────────────────────────────────────────────────────────
  function buildProfileCardHtml(profile, guruId) {
    const qp = guruId ? ('?guru_id=' + encodeURIComponent(guruId)) : '';

    const name = profile?.name || '灵客用户';
    const shortId = profile?.shortId || (guruId ? String(guruId).split('-')[0].toUpperCase() : '');
    const uidText = shortId ? ('UID-' + shortId) : 'UID-';

    const avatarUrl = profile?.avatar || '';
    const initials = escapeHtml(String(name || '灵客').trim().slice(0, 2));
    const avatarHtml = avatarUrl
      ? '<img src="' + escapeHtml(avatarUrl) + (String(avatarUrl).includes('?') ? '&' : '?') + 'cb=' + Date.now() + '" alt="' + escapeHtml(name) + '" class="h-full w-full object-cover rounded-full">'
      : '<span class="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">' + initials + '</span>';

    const countryCode = profile?.country || '';
    const countryText = getCountryName(countryCode) || countryCode;

    const subscriptionName = safeLocalStorageGet('subscription_name') || '—';
    const subscriptionExpiry = safeLocalStorageGet('subscription_expiry') || '—';
    const subscriptionPlan = safeLocalStorageGet('subscription_plan') || 'free';

    const used = parseInt(safeLocalStorageGet('token_used') || '0', 10);
    const limit = parseInt(safeLocalStorageGet('token_limit') || '0', 10);
    const hasTokenData = Number.isFinite(used) && Number.isFinite(limit) && limit > 0;
    const pct = hasTokenData ? Math.min(100, Math.max(0, Math.round((used / limit) * 100))) : 0;
    const remaining = hasTokenData ? Math.max(0, limit - used) : 0;

    // Subscription badge styles
    const isPro = subscriptionPlan === 'pro';
    const badgeBg = isPro ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)';
    const badgeIcon = isPro 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

    // Token warning thresholds
    const TOKEN_WARNING_THRESHOLD = 10;
    const TOKEN_CRITICAL_THRESHOLD = 3;
    
    // Determine token color and warning
    let tokenColor = '#22c55e'; // green
    let tokenWarningHtml = '';
    const hrefSubscription = '/uxbot/guru-subscription.html' + qp;
    
    if (remaining <= 0) {
      tokenColor = '#ef4444'; // red
      tokenWarningHtml = '<div style="margin-top:8px;padding:8px 12px;border-radius:8px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);">'
        + '<div style="display:flex;align-items:center;gap:6px;">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
        + '<span style="font-size:12px;color:#ef4444;font-weight:500;">Token 已用完，使用基础模型</span>'
        + '</div>'
        + '<a href="' + escapeHtml(hrefSubscription) + '" style="display:block;margin-top:6px;font-size:11px;color:#ef4444;text-decoration:underline;">立即升级 →</a>'
        + '</div>';
    } else if (remaining <= TOKEN_CRITICAL_THRESHOLD) {
      tokenColor = '#ef4444'; // red
      tokenWarningHtml = '<div style="margin-top:8px;padding:8px 12px;border-radius:8px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);">'
        + '<div style="display:flex;align-items:center;gap:6px;">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
        + '<span style="font-size:12px;color:#ef4444;font-weight:500;">仅剩 ' + remaining + ' Token！</span>'
        + '</div>'
        + '<a href="' + escapeHtml(hrefSubscription) + '" style="display:block;margin-top:6px;font-size:11px;color:#ef4444;text-decoration:underline;">立即升级 →</a>'
        + '</div>';
    } else if (remaining <= TOKEN_WARNING_THRESHOLD) {
      tokenColor = '#eab308'; // yellow
      tokenWarningHtml = '<div style="margin-top:8px;padding:8px 12px;border-radius:8px;background:rgba(234,179,8,0.15);border:1px solid rgba(234,179,8,0.3);">'
        + '<div style="display:flex;align-items:center;gap:6px;">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
        + '<span style="font-size:12px;color:#eab308;font-weight:500;">Token 即将用尽</span>'
        + '</div>'
        + '<a href="' + escapeHtml(hrefSubscription) + '" style="display:block;margin-top:6px;font-size:11px;color:#eab308;text-decoration:underline;">升级订阅 →</a>'
        + '</div>';
    }

    // Links
    const hrefAdminCenter = '/uxbot/guru-dashboard-main.html' + qp;
    const hrefEditProfile = '/uxbot/guru-profile-setup.html' + qp;
    const hrefKnowledge = '/uxbot/guru-db-knowledge.html' + qp;
    const hrefAISetting = '/uxbot/guru-aisetup.html' + qp;

    return (
      '<div data-uxbot-profile-card="1" class="w-full" style="box-sizing:border-box;padding:16px;">'
      + '<div class="flex items-start gap-4 mb-4">'
          + '<span class="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">' + avatarHtml + '</span>'
          + '<div class="flex-1">'
              + '<h3 class="font-semibold text-lg">' + escapeHtml(name) + '</h3>'
              + '<p class="text-xs text-muted-foreground">' + escapeHtml(uidText) + '</p>'
              + '<div class="mt-2">'
                  + '<div class="flex flex-wrap items-center gap-1.5">'
                      + '<div class="inline-flex items-center rounded-md border font-semibold transition-colors text-foreground text-xs px-2 py-0.5">'
                          + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-3 h-3 mr-1" aria-hidden="true">'
                              + '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>'
                              + '<circle cx="12" cy="10" r="3"></circle>'
                          + '</svg>'
                          + escapeHtml(countryText || '—')
                      + '</div>'
                  + '</div>'
              + '</div>'
          + '</div>'
      + '</div>'

      + '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>'

      + '<div class="space-y-2 mb-4">'
          + '<div class="flex items-center justify-between gap-3">'
              + '<span class="text-sm text-muted-foreground">订阅套餐</span>'
              + '<div style="display:inline-flex;align-items:center;padding:4px 10px;border-radius:9999px;font-size:12px;font-weight:600;color:#fff;background:' + badgeBg + ';box-shadow:0 2px 4px rgba(0,0,0,0.2);">'
                  + badgeIcon
                  + escapeHtml(subscriptionName)
              + '</div>'
          + '</div>'
          + '<div class="flex items-center justify-between gap-3 text-xs text-muted-foreground">'
              + '<span>有效期至</span>'
              + '<span style="text-align:right;">' + escapeHtml(subscriptionExpiry) + '</span>'
          + '</div>'
      + '</div>'

      + '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>'

      + '<div class="space-y-2 mb-4">'
          + '<div style="display:flex;align-items:center;gap:12px;">'
              + '<span class="text-sm text-muted-foreground">API Token使用</span>'
              + '<span class="text-sm font-semibold" style="margin-left:auto;text-align:right;font-variant-numeric:tabular-nums;color:' + tokenColor + ';">' + (hasTokenData ? (remaining + ' Token') : '— Token') + '</span>'
          + '</div>'
          + '<div class="w-full bg-muted rounded-full h-2">'
              + '<div class="h-2 rounded-full transition-all" style="width: ' + (100 - pct) + '%;background:' + tokenColor + ';"></div>'
          + '</div>'
          + '<p class="text-xs text-muted-foreground">' + (hasTokenData ? ('剩余 ' + remaining + ' tokens') : '剩余 — tokens') + '</p>'
          + tokenWarningHtml
      + '</div>'

      + '<div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full my-4"></div>'

      + '<div class="space-y-2">'
          + '<a data-uxbot-action="dashboard" href="' + escapeHtml(hrefAdminCenter) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">'
              + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard h-4 w-4 mr-2" aria-hidden="true">'
                  + '<rect width="7" height="9" x="3" y="3" rx="1"></rect>'
                  + '<rect width="7" height="5" x="14" y="3" rx="1"></rect>'
                  + '<rect width="7" height="9" x="14" y="12" rx="1"></rect>'
                  + '<rect width="7" height="5" x="3" y="16" rx="1"></rect>'
              + '</svg>'
              + '后台管理中心'
          + '</a>'

          + '<a data-uxbot-action="edit-profile" href="' + escapeHtml(hrefEditProfile) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">'
              + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-4 w-4 mr-2" aria-hidden="true">'
                  + '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>'
                  + '<circle cx="12" cy="7" r="4"></circle>'
              + '</svg>'
              + '编辑个人资料'
          + '</a>'

          + '<a data-uxbot-action="ai-settings" href="' + escapeHtml(hrefAISetting) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">'
              + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-4 w-4 mr-2" aria-hidden="true">'
                  + '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>'
                  + '<path d="M20 2v4"></path>'
                  + '<path d="M22 4h-4"></path>'
                  + '<circle cx="4" cy="20" r="2"></circle>'
              + '</svg>'
              + 'AI助手设置'
          + '</a>'

          + '<a data-uxbot-action="my-kb" href="' + escapeHtml(hrefKnowledge) + '" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">'
              + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open h-4 w-4 mr-2" aria-hidden="true">'
                  + '<path d="M12 7v14"></path>'
                  + '<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>'
              + '</svg>'
              + '我的知识库'
          + '</a>'

          + '<button data-uxbot-action="logout" id="logoutBtn" class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 px-4 py-2 w-full justify-start text-destructive hover:text-destructive" type="button">'
              + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out h-4 w-4 mr-2" aria-hidden="true">'
                  + '<path d="m16 17 5-5-5-5"></path>'
                  + '<path d="M21 12H9"></path>'
                  + '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>'
              + '</svg>'
              + '退出登录'
          + '</button>'
      + '</div>'
      + '</div>'
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // Overlay Menu
  // ─────────────────────────────────────────────────────────────────
  function ensureOverlayStyles() {
    if (document.getElementById('uxbotProfileCardStyles')) return;
    const style = document.createElement('style');
    style.id = 'uxbotProfileCardStyles';
    style.textContent = `
      #uxbotProfileOverlay {
        position: fixed;
        inset: 0;
        z-index: 99998;
        background: transparent;
        display: none;
        pointer-events: none;
      }
      #uxbotProfileOverlay[data-open="1"] {
        display: block;
        pointer-events: auto;
      }
      #uxbotProfileMenu {
        position: fixed;
        z-index: 99999;
        display: none;
        min-width: 320px;
        max-width: min(90vw, 360px);
        background: rgba(18, 18, 22, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 16px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      }
      #uxbotProfileOverlay[data-open="1"] #uxbotProfileMenu {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureOverlay() {
    ensureOverlayStyles();
    let overlay = document.getElementById('uxbotProfileOverlay');
    let menu = document.getElementById('uxbotProfileMenu');
    if (overlay && menu) return { overlay, menu };

    overlay = document.createElement('div');
    overlay.id = 'uxbotProfileOverlay';

    menu = document.createElement('div');
    menu.id = 'uxbotProfileMenu';

    overlay.appendChild(menu);
    document.body.appendChild(overlay);

    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    }, true);

    return { overlay, menu };
  }

  async function openMenu(anchorEl) {
    const { overlay, menu } = ensureOverlay();
    const guruId = getGuruId();
    
    // Clear cache to force fresh fetch
    cachedProfile = null;
    profilePromise = null;
    
    // Fetch fresh profile and subscription
    let profile = await fetchProfile(guruId);
    if (!profile) profile = getCachedProfile();
    profile.shortId = guruId ? String(guruId).split('-')[0].toUpperCase() : '';

    menu.innerHTML = buildProfileCardHtml(profile, guruId);

    // Position menu below anchor
    try {
      const r = anchorEl.getBoundingClientRect();
      const top = Math.min(window.innerHeight - 16, r.bottom + 8);
      const right = Math.max(16, window.innerWidth - r.right);
      menu.style.top = top + 'px';
      menu.style.right = right + 'px';
    } catch (e) {
      menu.style.top = '72px';
      menu.style.right = '16px';
    }

    overlay.setAttribute('data-open', '1');

    // Bind logout handler
    const logoutBtn = menu.querySelector('#logoutBtn');
    if (logoutBtn && !logoutBtn.dataset.bound) {
      logoutBtn.dataset.bound = 'true';
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doLogout();
      });
    }
  }

  function closeMenu() {
    const overlay = document.getElementById('uxbotProfileOverlay');
    if (overlay) overlay.removeAttribute('data-open');
  }

  function toggleMenu(anchorEl) {
    const overlay = document.getElementById('uxbotProfileOverlay');
    const isOpen = overlay && overlay.getAttribute('data-open') === '1';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu(anchorEl);
    }
  }

  function doLogout() {
    const keys = [
      'current_guru_id', 'guru_id', 'guru_name', 'guru_avatar_url', 'guru_country',
      'user_role', 'user_id', 'user_name', 'avatar_url', 'user_avatar_url',
      'region', 'region_name', 'guru_region', 'user_region',
      'subscription_name', 'subscription_expiry', 'token_used', 'token_limit'
    ];
    keys.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    window.location.href = '/uxbot/index.html';
  }

  // ─────────────────────────────────────────────────────────────────
  // Avatar Button Detection
  // ─────────────────────────────────────────────────────────────────
  function findHeaderAvatarButton() {
    const header = document.querySelector('header#iojh') || document.querySelector('header');
    if (!header) return null;
    
    // Find the round avatar button in header
    const btns = Array.from(header.querySelectorAll('button'));
    for (const btn of btns) {
      const cls = String(btn.className || '');
      const hasRoundClass = cls.includes('rounded-full');
      const hasAvatarSpan = !!btn.querySelector('span.rounded-full');
      const isMobileMenu = cls.includes('md:hidden');
      
      if ((hasRoundClass || hasAvatarSpan) && !isMobileMenu) {
        return btn;
      }
    }
    return null;
  }

  function findHeaderAvatarButtonFromEvent(ev) {
    try {
      const path = (typeof ev.composedPath === 'function') ? ev.composedPath() : [ev.target];
      for (const n of path) {
        if (!(n instanceof Element)) continue;
        const btn = n.closest && n.closest('button');
        if (!btn) continue;
        
        const header = btn.closest('header#iojh') || btn.closest('header');
        if (!header) continue;

        const cls = String(btn.className || '');
        const looksRound = cls.includes('rounded-full') || !!btn.querySelector('span.rounded-full');
        const isMobileMenu = cls.includes('md:hidden') && cls.includes('h-9') && cls.includes('w-9');

        if (looksRound && !isMobileMenu) return btn;
      }
    } catch (e) {}
    return null;
  }

  // ─────────────────────────────────────────────────────────────────
  // Update Header Avatar
  // ─────────────────────────────────────────────────────────────────
  let lastAvatarUrl = null;

  function updateHeaderAvatar(profile) {
    if (!profile || !profile.avatar) return;
    
    const avatarBtn = findHeaderAvatarButton();
    if (!avatarBtn) return;

    // Find the avatar span inside the button
    const avatarSpan = avatarBtn.querySelector('span.rounded-full');
    if (!avatarSpan) return;

    // Check if already has correct image (avoid infinite loop)
    const existingImg = avatarSpan.querySelector('img');
    if (existingImg && existingImg.src && existingImg.src.includes(profile.avatar.split('?')[0])) {
      return; // Already correct
    }

    // Create image element
    const avatarUrl = profile.avatar;
    const name = profile.name || '灵客';
    const initials = String(name).trim().slice(0, 2);

    // Replace content with actual avatar image
    const img = document.createElement('img');
    img.src = avatarUrl + (avatarUrl.includes('?') ? '&' : '?') + 'cb=' + Date.now();
    img.alt = name;
    img.className = 'h-full w-full object-cover rounded-full';
    img.onerror = function() {
      // Fallback to initials on error
      this.style.display = 'none';
      const fallback = document.createElement('span');
      fallback.className = 'flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground';
      fallback.textContent = initials;
      avatarSpan.appendChild(fallback);
    };

    // Clear existing content and add image
    avatarSpan.innerHTML = '';
    avatarSpan.appendChild(img);
    lastAvatarUrl = avatarUrl;
  }

  // ─────────────────────────────────────────────────────────────────
  // Fallback Avatar Entry Point (FAB)
  // Some pages (or hydration failures) may not render a header avatar button.
  // We provide an additive-only floating button that opens the same profile menu.
  // ─────────────────────────────────────────────────────────────────
  function computeInitials(name) {
    const s = String(name || '').trim();
    if (!s) return '灵客';
    // Prefer first 2 Chinese characters if name starts with CJK
    if (/^[\u4e00-\u9fff]/.test(s)) return s.slice(0, 2);
    const parts = s.split(/\s+/).filter(Boolean);
    const letters = parts.slice(0, 2).map(p => p[0]).join('');
    return (letters || s.slice(0, 2)).toUpperCase();
  }

  function isElementVisible(el) {
    if (!el) return false;
    try {
      const cs = window.getComputedStyle(el);
      if (!cs) return false;
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      if (Number(cs.opacity || '1') === 0) return false;
      const r = el.getBoundingClientRect();
      return !!(r && r.width > 0 && r.height > 0);
    } catch (e) {
      return false;
    }
  }

  function ensureAvatarFab() {
    let fab = document.getElementById('uxbotAvatarFab');
    if (fab) return fab;

    fab = document.createElement('button');
    fab.id = 'uxbotAvatarFab';
    fab.type = 'button';
    fab.setAttribute('aria-label', '打开个人菜单');
    fab.style.cssText = [
      'position:fixed',
      'top:12px',
      'right:12px',
      'z-index:99997',
      'width:40px',
      'height:40px',
      'border-radius:9999px',
      'border:1px solid rgba(255,255,255,0.12)',
      'background:rgba(99,102,241,0.92)',
      'color:white',
      'display:none',
      'align-items:center',
      'justify-content:center',
      'box-shadow:0 10px 24px rgba(0,0,0,0.25)',
      'cursor:pointer',
      'user-select:none',
      '-webkit-tap-highlight-color:transparent'
    ].join(';');

    const label = document.createElement('span');
    label.id = 'uxbotAvatarFabLabel';
    label.style.cssText = 'display:flex;width:100%;height:100%;align-items:center;justify-content:center;font-size:14px;font-weight:700;line-height:1;';
    label.textContent = computeInitials(safeLocalStorageGet('guru_name') || safeLocalStorageGet('user_name') || '灵客');
    fab.appendChild(label);

    document.body.appendChild(fab);

    fab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleMenu(fab);
    }, true);

    return fab;
  }

  function updateAvatarFab(profile) {
    const fab = ensureAvatarFab();
    const label = fab.querySelector('#uxbotAvatarFabLabel');

    const name = (profile && (profile.name || profile.real_name))
      || safeLocalStorageGet('guru_name')
      || safeLocalStorageGet('user_name')
      || '';
    const avatarUrl = (profile && (profile.avatar || profile.profile_image_url || profile.avatar_url))
      || safeLocalStorageGet('guru_avatar_url')
      || safeLocalStorageGet('avatar_url')
      || '';

    if (avatarUrl) {
      fab.style.backgroundImage = 'url(' + avatarUrl + ')';
      fab.style.backgroundSize = 'cover';
      fab.style.backgroundPosition = 'center';
      fab.style.backgroundRepeat = 'no-repeat';
      if (label) label.style.opacity = '0';
    } else {
      fab.style.backgroundImage = '';
      if (label) {
        label.textContent = computeInitials(name);
        label.style.opacity = '1';
      }
    }
  }

  function syncAvatarFabVisibility(profile) {
    const fab = ensureAvatarFab();
    updateAvatarFab(profile);
    const headerBtn = findHeaderAvatarButton();
    fab.style.display = isElementVisible(headerBtn) ? 'none' : 'flex';
  }

  // ─────────────────────────────────────────────────────────────────
  // Initialization
  // ─────────────────────────────────────────────────────────────────
  let initialized = false;
  let cachedProfileForAvatar = null;

  function init() {
    if (initialized) return;
    initialized = true;

    // Close menu at init to ensure clean state
    closeMenu();

    // Bind delegated click handler for avatar button
    document.addEventListener('click', (e) => {
      const avatarBtn = findHeaderAvatarButtonFromEvent(e);
      if (avatarBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleMenu(avatarBtn);
        return;
      }
    }, true);

    // Function to update avatar (called multiple times due to hydration)
    function doUpdateAvatar(profile) {
      if (profile) {
        cachedProfileForAvatar = profile;
        updateHeaderAvatar(profile);
        syncAvatarFabVisibility(profile);
      }
    }

    // Pre-fetch profile and update header avatar
    const guruId = getGuruId();
    if (guruId) {
      fetchProfile(guruId).then(doUpdateAvatar);
    } else {
      const cached = getCachedProfile();
      if (cached && cached.avatar) doUpdateAvatar(cached);
    }

    // Listen for Astro hydration events - React islands may override our DOM changes
    document.addEventListener('astro:hydrate', () => {
      if (cachedProfileForAvatar) {
        // Small delay to let React finish its DOM updates
        setTimeout(() => {
          updateHeaderAvatar(cachedProfileForAvatar);
          syncAvatarFabVisibility(cachedProfileForAvatar);
        }, 50);
      }
    });

    // Simple retry approach: check and update avatar a few times after page load
    // This handles React hydration that may reset our DOM changes
    const retryTimes = [500, 1000, 2000, 4000];
    retryTimes.forEach(delay => {
      setTimeout(() => {
        if (cachedProfileForAvatar) {
          updateHeaderAvatar(cachedProfileForAvatar);
          syncAvatarFabVisibility(cachedProfileForAvatar);
        } else {
          // Still ensure there's an entry point even before profile fetch finishes
          syncAvatarFabVisibility(getCachedProfile());
        }
      }, delay);
    });

    // Ensure FAB is created early (but hidden when header avatar is present)
    try {
      setTimeout(() => syncAvatarFabVisibility(cachedProfileForAvatar || getCachedProfile()), 50);
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────────
  // Export
  // ─────────────────────────────────────────────────────────────────
  global.UXBotProfileCard = {
    init,
    openMenu,
    closeMenu,
    toggleMenu,
    fetchProfile,
    fetchSubscription,
    getCachedProfile,
    buildProfileCardHtml,
    updateHeaderAvatar,
    getGuruId,
    COUNTRY_NAME_MAP
  };

})(window);
