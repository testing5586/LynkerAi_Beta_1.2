/*
  Lynkermates - Real user feed renderer

  This file is intentionally pure JavaScript (no <script>/<style> tags).
  It is loaded via:
    <script src="/static/templates/uxbot/scripts/lynkermates-real-users.js"></script>

  Data source:
    GET /api/users/profiles?limit=10
*/

(function () {
  'use strict';

  var LOG_PREFIX = '[LynkermatesIntegration]';

  function safeText(value, fallback) {
    if (value === null || value === undefined) return fallback || '';
    var s = String(value);
    return s ? s : (fallback || '');
  }

  function ensureStyles() {
    // Add minimal CSS needed for the loading spinner.
    // Safe to call multiple times.
    var id = 'lynkermates-real-users-style';
    if (document.getElementById(id)) return;

    var style = document.createElement('style');
    style.id = id;
    style.type = 'text/css';
    style.textContent = "@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}";
    document.head.appendChild(style);
  }

  function formatTimeAgo(isoDateString) {
    if (!isoDateString) return '刚刚';

    try {
      var date = new Date(isoDateString);
      var now = new Date();
      var diff = now - date;

      var minutes = Math.floor(diff / 60000);
      if (minutes < 1) return '刚刚';
      if (minutes < 60) return minutes + '分钟前';

      var hours = Math.floor(minutes / 60);
      if (hours < 24) return hours + '小时前';

      var days = Math.floor(hours / 24);
      if (days < 7) return days + '天前';

      var weeks = Math.floor(days / 7);
      if (weeks < 4) return weeks + '周前';

      var months = Math.floor(days / 30);
      return months + '个月前';
    } catch (e) {
      return '最近';
    }
  }

  function getNationalityFlag(nationality) {
    var flagMap = {
      '中国': '🇨🇳',
      'China': '🇨🇳',
      '美国': '🇺🇸',
      'USA': '🇺🇸',
      'United States': '🇺🇸',
      '日本': '🇯🇵',
      'Japan': '🇯🇵',
      '韩国': '🇰🇷',
      'Korea': '🇰🇷',
      '英国': '🇬🇧',
      'UK': '🇬🇧',
      '法国': '🇫🇷',
      'France': '🇫🇷',
      '德国': '🇩🇪',
      'Germany': '🇩🇪',
      '加拿大': '🇨🇦',
      'Canada': '🇨🇦',
      '澳大利亚': '🇦🇺',
      'Australia': '🇦🇺'
    };

    return flagMap[nationality] || '🌍';
  }

  function shuffleInPlace(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function createUserCardHTML(profile, index) {
    var pseudonym = safeText(profile && profile.pseudonym, '灵客用户');
    var bio = safeText(profile && profile.bio, '这个人很神秘，什么都没留下');
    var avatarUrl = safeText(profile && profile.avatar_url, '/static/uxbot/assets/optimized_images/default-avatar.png');
    var flag = getNationalityFlag(profile && profile.nationality);
    var timeAgo = formatTimeAgo(profile && profile.created_at);

    // Fake interaction data (until posts are wired up)
    var likes = Math.floor(Math.random() * 200) + 20;
    var comments = Math.floor(Math.random() * 50) + 5;
    var shares = Math.floor(Math.random() * 30) + 1;

    // Fake tags
    var tags = ['#八字', '#命理', '#人生规划', '#紫薇', '#转运', '#同命', '#论坛', '#知识分享'];
    shuffleInPlace(tags);
    var tagCount = Math.floor(Math.random() * 3) + 1;
    var selectedTags = tags.slice(0, tagCount);

    var tagsHTML = '';
    for (var t = 0; t < selectedTags.length; t++) {
      var tag = selectedTags[t];
      tagsHTML += '<div class="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground text-xs cursor-pointer hover:bg-primary/10">' + tag + '</div>';
    }

    // Build card
    var html = '';
    html += '<div class="rounded-xl border bg-card text-card-foreground shadow glass-card border-border/50 overflow-hidden hover:border-primary/30 transition-colors">';

    html += '<div class="p-4 border-b border-border/30">';
    html += '<div class="flex items-start justify-between">';
    html += '<div class="flex items-center gap-3">';

    html += '<button class="cursor-pointer" type="button">';
    html += '<div class="relative inline-block">';
    html += '<span class="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">';

    // If avatar is not default-ish, show it.
    if (avatarUrl && avatarUrl.indexOf('default') === -1) {
      html += '<img src="' + avatarUrl + '" alt="' + pseudonym + '" class="h-full w-full object-cover" />';
    } else {
      html += '<span class="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">';
      html += pseudonym.substring(0, 2);
      html += '</span>';
    }

    html += '</span>';

    if (flag) {
      html += '<div class="absolute -bottom-1 -right-1 text-lg">' + flag + '</div>';
    }

    html += '</div></button>';

    html += '<div class="flex-1"><div class="flex items-center gap-2">';
    html += '<h4 class="font-semibold text-foreground">' + pseudonym + '</h4>';
    html += '</div>';
    html += '<p class="text-xs text-muted-foreground">' + timeAgo + '</p>';
    html += '</div></div>';

    html += '<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8" type="button" aria-label="more">';
    html += '<svg class="lucide lucide-ellipsis w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';
    html += '</button>';

    html += '</div></div>';

    html += '<div class="p-4 space-y-3">';
    html += '<p class="text-foreground leading-relaxed">' + bio + '</p>';
    if (tagsHTML) {
      html += '<div class="flex flex-wrap gap-2">' + tagsHTML + '</div>';
    }
    html += '</div>';

    html += '<div class="px-4 py-2 border-t border-border/30 text-xs text-muted-foreground flex justify-between">';
    html += '<span>' + likes + ' 人赞</span>';
    html += '<div class="space-x-3">';
    html += '<span>' + comments + ' 条评论</span>';
    html += '<span>' + shares + ' 次分享</span>';
    html += '</div></div>';

    html += '<div class="px-4 py-3 border-t border-border/30 flex items-center gap-2">';

    html += '<button class="inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 rounded-md px-3 text-xs flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10" type="button">';
    html += '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>';
    html += '<span class="text-xs">赞</span></button>';

    html += '<button class="inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 rounded-md px-3 text-xs flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10" type="button">';
    html += '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>';
    html += '<span class="text-xs">评论</span></button>';

    html += '<button class="inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 rounded-md px-3 text-xs flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10" type="button">';
    html += '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>';
    html += '<span class="text-xs">分享</span></button>';

    html += '</div>';
    html += '</div>';

    return html;
  }

  function loadRealUserProfiles() {
    ensureStyles();

    try {
      // This selector matches the main feed container in the Astro-generated page.
      var feedContainer = document.querySelector('.space-y-4.px-4.pb-8');
      if (!feedContainer) {
        console.error(LOG_PREFIX + ' 未找到动态列表容器');
        return;
      }

      var loadingHTML = '';
      loadingHTML += '<div class="text-center py-8">';
      loadingHTML += '<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>';
      loadingHTML += '<p class="mt-2 text-sm text-muted-foreground">加载真实用户档案...</p>';
      loadingHTML += '</div>';
      feedContainer.innerHTML = loadingHTML;

      fetch('/api/users/profiles?limit=10')
        .then(function (response) {
          if (!response.ok) {
            throw new Error('API 请求失败: ' + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          if (!data || !data.success || !data.profiles || !data.profiles.length) {
            var emptyHTML = '';
            emptyHTML += '<div class="text-center py-12">';
            emptyHTML += '<svg class="mx-auto h-16 w-16 text-muted-foreground opacity-50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
            emptyHTML += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>';
            emptyHTML += '<p class="text-lg font-medium mb-2">暂无用户动态</p>';
            emptyHTML += '<p class="text-sm text-muted-foreground mb-4">成为第一个完善档案并分享动态的灵客吧！</p>';
            emptyHTML += '<a href="/uxbot/user-profile-setup.html" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">立即完善档案</a>';
            emptyHTML += '</div>';
            feedContainer.innerHTML = emptyHTML;
            return;
          }

          var cardsHTML = '';
          for (var i = 0; i < data.profiles.length; i++) {
            cardsHTML += createUserCardHTML(data.profiles[i], i);
          }

          feedContainer.innerHTML = cardsHTML;
          console.log(LOG_PREFIX + ' 成功渲染 ' + data.profiles.length + ' 个用户档案');
        })
        .catch(function (error) {
          console.error(LOG_PREFIX + ' 加载失败:', error);

          var errorHTML = '';
          errorHTML += '<div class="text-center py-12">';
          errorHTML += '<svg class="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
          errorHTML += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>';
          errorHTML += '<p class="text-lg font-medium mb-2">加载失败</p>';
          errorHTML += '<p class="text-sm text-muted-foreground mb-4">无法获取用户档案数据: ' + safeText(error && error.message, 'unknown') + '</p>';
          errorHTML += '<button type="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2" id="lynkermates-retry">重试</button>';
          errorHTML += '</div>';
          feedContainer.innerHTML = errorHTML;

          var btn = document.getElementById('lynkermates-retry');
          if (btn) {
            btn.addEventListener('click', function () {
              loadRealUserProfiles();
            });
          }
        });
    } catch (err) {
      console.error(LOG_PREFIX + ' 渲染脚本崩溃:', err);
    }
  }

  // Run after DOM is ready; delay slightly to allow Astro/React hydration.
  function start() {
    setTimeout(loadRealUserProfiles, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
