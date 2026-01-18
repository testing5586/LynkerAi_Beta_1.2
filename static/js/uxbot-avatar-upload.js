/**
 * UXBot Avatar Upload Component
 * 通用的头像上传组件
 * 
 * 使用方法：
 * <script src="/static/js/uxbot-avatar-upload.js"></script>
 * 
 * HTML 结构：
 * <div id="avatarUploadContainer">
 *   <img id="avatarPreview" src="..." alt="Avatar" />
 *   <input type="file" id="avatarInput" accept="image/*" style="display:none" />
 *   <button id="avatarUploadBtn">选择头像</button>
 * </div>
 * 
 * 初始化：
 * UXBotAvatarUpload.init({
 *   userId: 'xxx',
 *   previewElementId: 'avatarPreview',
 *   inputElementId: 'avatarInput',
 *   buttonElementId: 'avatarUploadBtn',
 *   onSuccess: function(avatarUrl) { console.log('上传成功:', avatarUrl); },
 *   onError: function(error) { console.error('上传失败:', error); }
 * });
 */
(function() {
  'use strict';

  function resolveElementByIdOrSelector(id, selector) {
    if (id) {
      var elById = document.getElementById(id);
      if (elById) return elById;
    }
    if (selector) {
      return document.querySelector(selector);
    }
    return null;
  }

  function ensurePreviewImg(previewEl) {
    if (!previewEl) return null;
    if (previewEl.tagName && previewEl.tagName.toLowerCase() === 'img') return previewEl;

    var img = previewEl.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'aspect-square h-full w-full';
      img.alt = 'Avatar';
      // Replace inner content (letters/placeholder) with image.
      previewEl.innerHTML = '';
      previewEl.appendChild(img);
    }
    return img;
  }

  var UXBotAvatarUpload = {
    config: {
      userId: '',
      previewElementId: 'avatarPreview',
      previewElementSelector: '',
      inputElementId: 'avatarInput',
      buttonElementId: 'avatarUploadBtn',
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      uploadUrl: '/api/user/avatar/upload',
      onSuccess: null,
      onUploadSuccess: null,
      onError: null,
      onProgress: null
    },

    init: function(options) {
      // 合并配置
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this.config[key] = options[key];
        }
      }

      if (!this.config.userId) {
        console.error('[AvatarUpload] userId is required');
        return;
      }

      this.setupEventListeners();
      console.log('[AvatarUpload] Initialized for user:', this.config.userId);
    },

    setupEventListeners: function() {
      var self = this;

      var fileInput = document.getElementById(this.config.inputElementId);
      var uploadBtn = this.config.buttonElementId ? document.getElementById(this.config.buttonElementId) : null;
      var preview = resolveElementByIdOrSelector(this.config.previewElementId, this.config.previewElementSelector);

      if (!fileInput || !preview) {
        console.error('[AvatarUpload] Required elements not found');
        return;
      }

      // Prevent duplicate bindings if init() is called multiple times.
      if (fileInput.dataset && fileInput.dataset.uxbotAvatarUploadBound === '1') {
        return;
      }
      if (fileInput.dataset) fileInput.dataset.uxbotAvatarUploadBound = '1';

      // 点击按钮触发文件选择（如果有按钮；否则依赖 label[for] / 原生点击 input）
      if (uploadBtn) {
        uploadBtn.addEventListener('click', function(e) {
          e.preventDefault();
          fileInput.click();
        });
      }

      // 文件选择后自动上传
      fileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
          self.handleFileSelect(file, preview);
        }
      });

      // 拖拽上传（可选）
      if (preview) {
        preview.addEventListener('dragover', function(e) {
          e.preventDefault();
          preview.style.opacity = '0.5';
        });

        preview.addEventListener('dragleave', function(e) {
          e.preventDefault();
          preview.style.opacity = '1';
        });

        preview.addEventListener('drop', function(e) {
          e.preventDefault();
          preview.style.opacity = '1';
          var file = e.dataTransfer.files[0];
          if (file) {
            self.handleFileSelect(file, preview);
          }
        });
      }
    },

    handleFileSelect: function(file, preview) {
      var self = this;

      // 验证文件类型
      if (this.config.allowedTypes.indexOf(file.type) === -1) {
        var error = '不支持的文件类型，只允许: ' + this.config.allowedTypes.join(', ');
        this.showError(error);
        if (this.config.onError) this.config.onError(error);
        return;
      }

      // 验证文件大小
      if (file.size > this.config.maxFileSize) {
        var error = '文件太大，最大允许 ' + (this.config.maxFileSize / 1024 / 1024) + 'MB';
        this.showError(error);
        if (this.config.onError) this.config.onError(error);
        return;
      }

      // 预览图片
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = ensurePreviewImg(preview);
        if (img) img.src = e.target.result;
      };
      reader.readAsDataURL(file);

      // 上传文件
      this.uploadFile(file);
    },

    uploadFile: function(file) {
      var self = this;
      var formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', this.config.userId);

      console.log('[AvatarUpload] Uploading file:', file.name, file.size, 'bytes');

      var xhr = new XMLHttpRequest();

      // 进度监听
      if (xhr.upload && this.config.onProgress) {
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percent = Math.round((e.loaded / e.total) * 100);
            self.config.onProgress(percent);
          }
        });
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var parsed = null;
          try {
            parsed = xhr.responseText ? JSON.parse(xhr.responseText) : null;
          } catch (e) {}

          if (xhr.status === 200 && parsed && parsed.success) {
            console.log('[AvatarUpload] Upload successful:', parsed.avatar_url);
            self.showSuccess('头像上传成功！');

            // 更新 localStorage
            try {
              localStorage.setItem('user_avatar_url', parsed.avatar_url);
              localStorage.setItem('avatar_url', parsed.avatar_url);
            } catch(e) {}

            // 触发成功回调（兼容别名 onUploadSuccess）
            var onOk = self.config.onSuccess || self.config.onUploadSuccess;
            if (onOk) {
              onOk(parsed.avatar_url);
            }

            // 触发全局事件，通知其他组件更新
            window.dispatchEvent(new CustomEvent('avatarUpdated', {
              detail: { avatar_url: parsed.avatar_url }
            }));
            return;
          }

          // Error path: try to show server-provided message
          var serverMsg = parsed && (parsed.error || parsed.message);
          var error = serverMsg || ('上传失败 (HTTP ' + xhr.status + ')');
          self.showError(error);
          if (self.config.onError) self.config.onError(error);
        }
      };

      xhr.open('POST', this.config.uploadUrl, true);
      xhr.send(formData);
    },

    showSuccess: function(message) {
      this.showMessage(message, 'success');
    },

    showError: function(message) {
      this.showMessage(message, 'error');
    },

    showMessage: function(message, type) {
      // 简单的提示消息（可以用更好的UI替换）
      console.log('[AvatarUpload]', type.toUpperCase() + ':', message);
      
      // 如果页面有 alert 功能
      if (type === 'error') {
        alert(message);
      }
    }
  };

  // 导出到全局
  window.UXBotAvatarUpload = UXBotAvatarUpload;

})();
