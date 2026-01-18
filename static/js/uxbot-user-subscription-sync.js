/**
 * UXBot User Subscription Sync
 * 普通用戶訂閱/Token 數據同步腳本（不污染 guru 的共用 subscription_* keys）
 */
(function() {
  'use strict';

  function _safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function _safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function _getUserIdInternal() {
    const params = new URLSearchParams(window.location.search);
    const urlUserId = params.get('user_id') || params.get('uid');
    if (urlUserId) {
      _safeSet('user_id', urlUserId);
      return urlUserId;
    }
    return _safeGet('user_id') || _safeGet('current_user_id') || _safeGet('currentUserId');
  }

  async function _refreshUserSubscriptionFromAPI(userId) {
    if (!userId) userId = _getUserIdInternal();
    if (!userId) return null;

    try {
      const resp = await fetch('/api/user/subscription/' + encodeURIComponent(userId));
      const result = await resp.json();
      if (result && result.success && result.data) {
        const d = result.data;
        const plan = d.plan || 'free';

        // 僅寫入 user_* keys，避免把 guru 的 subscription_* 覆蓋/污染
        _safeSet('user_subscription_plan', plan);
        _safeSet('user_subscription_name', plan === 'pro' ? '專業版' : '免費版');
        _safeSet('user_token_used', String(d.token_used || 0));
        _safeSet('user_token_limit', String(d.token_quota || 100));
        _safeSet('user_token_total', String(d.token_quota || 100));

        if (d.period_end) {
          try {
            const dt = new Date(d.period_end);
            const formatted = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
            _safeSet('user_subscription_expiry', formatted);
          } catch (e) {
            _safeSet('user_subscription_expiry', String(d.period_end));
          }
        } else {
          // 明確覆寫，避免用到舊資料
          _safeSet('user_subscription_expiry', '—');
        }

        window.dispatchEvent(new CustomEvent('uxbot:user-subscription-updated', { detail: d }));
        return d;
      }
    } catch (e) {
      console.warn('[UXBot User Subscription Sync] Failed:', e);
    }

    return null;
  }

  function _getUserSubscriptionState() {
    const plan = _safeGet('user_subscription_plan') || 'free';
    const planName = _safeGet('user_subscription_name') || (plan === 'pro' ? '專業版' : '免費版');
    const expire = _safeGet('user_subscription_expiry') || '—';

    const usedRaw = _safeGet('user_token_used') || '';
    const totalRaw = _safeGet('user_token_limit') || _safeGet('user_token_total') || '';

    const used = Number(usedRaw) || 0;
    const total = Number(totalRaw) || 0;
    const remain = total > 0 ? Math.max(0, total - used) : null;

    return { plan, planName, expire, used, total, remain };
  }

  async function _autoRefresh() {
    const userId = _getUserIdInternal();
    if (userId) await _refreshUserSubscriptionFromAPI(userId);
  }

  window.UXBotUserSubscription = {
    refresh: _refreshUserSubscriptionFromAPI,
    getState: _getUserSubscriptionState,
    getUserId: _getUserIdInternal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoRefresh);
  } else {
    _autoRefresh();
  }
})();
