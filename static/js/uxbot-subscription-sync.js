/**
 * UXBot Subscription Sync
 * 共用訂閱數據同步腳本 - 確保所有頁面顯示一致的訂閱狀態
 * 所有內部函數使用 _ 前綴避免與頁面現有函數衝突
 */
(function() {
    'use strict';

    // ===== 內部工具函數 (使用 _ 前綴避免衝突) =====
    function _safeLocalStorageGet(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }
    
    function _safeLocalStorageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
    }

    function _getGuruIdInternal() {
        const params = new URLSearchParams(window.location.search);
        const urlGuruId = params.get('guru_id') || params.get('id');
        if (urlGuruId) {
            _safeLocalStorageSet('current_guru_id', urlGuruId);
            _safeLocalStorageSet('guru_id', urlGuruId);
            return urlGuruId;
        }
        return (
            _safeLocalStorageGet('current_guru_id')
            || _safeLocalStorageGet('guru_id')
            || _safeLocalStorageGet('currentGuruId')
            || _safeLocalStorageGet('current_guru')
        );
    }

    // ===== 從 API 刷新訂閱數據並更新 localStorage =====
    async function _refreshSubscriptionFromAPI(guruId) {
        if (!guruId) {
            guruId = _getGuruIdInternal();
        }
        if (!guruId) return null;
        
        try {
            const resp = await fetch('/api/subscription/' + encodeURIComponent(guruId));
            const result = await resp.json();
            if (result.success && result.data) {
                const d = result.data;
                // 更新 localStorage
                _safeLocalStorageSet('subscription_plan', d.plan || 'free');
                _safeLocalStorageSet('subscription_name', d.plan === 'pro' ? '專業版' : '免費版');
                _safeLocalStorageSet('subscription_plan_name', d.plan === 'pro' ? '專業版' : '免費版');
                _safeLocalStorageSet('token_used', String(d.token_used || 0));
                // Some pages/components use token_limit as the quota key
                _safeLocalStorageSet('token_limit', String(d.token_quota || 100));
                _safeLocalStorageSet('token_total', String(d.token_quota || 100));
                _safeLocalStorageSet('tokens_used', String(d.token_used || 0));
                _safeLocalStorageSet('tokens_total', String(d.token_quota || 100));
                
                // 格式化到期日期
                if (d.period_end) {
                    try {
                        const dt = new Date(d.period_end);
                        const formatted = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
                        _safeLocalStorageSet('subscription_expiry', formatted);
                        _safeLocalStorageSet('subscription_expire', formatted);
                    } catch (e) {
                        _safeLocalStorageSet('subscription_expiry', d.period_end);
                    }
                }
                
                console.log('[UXBot Subscription Sync] Refreshed:', d.plan, 'tokens:', d.token_remaining);
                
                // 觸發自定義事件，讓其他組件可以監聯
                window.dispatchEvent(new CustomEvent('uxbot:subscription-updated', { detail: d }));
                
                return d;
            }
        } catch (e) {
            console.warn('[UXBot Subscription Sync] Failed:', e);
        }
        return null;
    }

    // ===== 獲取當前訂閱狀態（從 localStorage）=====
    function _getSubscriptionState() {
        const planRaw = _safeLocalStorageGet('subscription_plan') || 'free';
        const planName = _safeLocalStorageGet('subscription_name')
            || _safeLocalStorageGet('subscription_plan_name')
            || (planRaw === 'pro' ? '專業版' : '免費版');
        const expire = _safeLocalStorageGet('subscription_expiry')
            || _safeLocalStorageGet('subscription_expire')
            || '—';

        const usedRaw = _safeLocalStorageGet('token_used')
            || _safeLocalStorageGet('tokens_used')
            || '';
        const totalRaw = _safeLocalStorageGet('token_total')
            || _safeLocalStorageGet('tokens_total')
            || '';

        const used = Number(usedRaw) || 0;
        const total = Number(totalRaw) || 0;
        const remain = total > 0 ? Math.max(0, total - used) : null;
        
        return {
            plan: planRaw,
            planName: planName,
            isPro: planRaw === 'pro',
            expire: expire,
            used: used,
            total: total,
            remain: remain
        };
    }

    // ===== 自動刷新（頁面載入時）=====
    async function _autoRefresh() {
        const guruId = _getGuruIdInternal();
        if (guruId) {
            await _refreshSubscriptionFromAPI(guruId);
        }
    }

    // ===== 導出到全局 window.UXBotSubscription =====
    window.UXBotSubscription = {
        refresh: _refreshSubscriptionFromAPI,
        getState: _getSubscriptionState,
        getGuruId: _getGuruIdInternal
    };

    // 頁面載入時自動刷新
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _autoRefresh);
    } else {
        _autoRefresh();
    }
})();
