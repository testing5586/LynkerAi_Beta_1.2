/**
 * UXBot Profile Edit Modal
 * 用户资料编辑弹窗组件 (Tab分组)
 * @version 1.1
 */
(function() {
  'use strict';

  // ========== 配置 ==========
  var CONFIG = {
    bloodTypes: [
      { value: 'O', label: 'O型' },
      { value: 'A', label: 'A型' },
      { value: 'B', label: 'B型' },
      { value: 'AB', label: 'AB型' },
      { value: 'unknown', label: '不清楚' }
    ],
    genders: [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' },
      { value: 'other', label: '其他' }
    ],
    nationalities: [
      '中国', '中国香港', '中国澳门', '中国台湾',
      '美国', '加拿大', '英国', '澳大利亚', '新西兰',
      '日本', '韩国', '新加坡', '马来西亚', '泰国', '越南', '菲律宾', '印度尼西亚',
      '德国', '法国', '意大利', '西班牙', '荷兰', '瑞士', '瑞典',
      '俄罗斯', '巴西', '阿根廷', '墨西哥',
      '印度', '巴基斯坦', '孟加拉国',
      '阿联酋', '沙特阿拉伯', '以色列',
      '南非', '埃及', '尼日利亚',
      '其他'
    ],
    religions: [
      '无宗教信仰',
      '佛教', '道教', '儒教',
      '基督教', '天主教', '东正教', '新教',
      '伊斯兰教',
      '印度教', '锡克教', '耆那教',
      '犹太教',
      '神道教',
      '萨满教', '原始宗教',
      '其他'
    ],
    occupations: [
      '学生', '教师', '医生', '工程师', '设计师', '市场营销', '销售',
      '金融', '房地产', '自由职业者', '虚拟币投资', '股票投资',
      '网红博主', '内容创作者', '直播主播', '电商运营', '其他'
    ],
    interestTags: [
      '八字', '紫微斗数', '占星术', '塔罗牌', '风水', '手相', '面相',
      '姓名学', '奇门遁甲', '六爻', '梅花易数', '周易'
    ]
  };

  // ========== 工具函数 ==========
  function getUserId() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id') || localStorage.getItem('user_id') || '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ========== 弹窗 HTML 模板 ==========
  function createModalHTML() {
    return `
<div id="profile-edit-modal" class="profile-modal-overlay" style="display:none;">
  <div class="profile-modal-container">
    <div class="profile-modal-header">
      <h2>编辑个人资料</h2>
      <button type="button" class="profile-modal-close" id="profile-modal-close">&times;</button>
    </div>
    
    <div class="profile-modal-tabs">
      <button type="button" class="profile-tab active" data-tab="basic">基本信息</button>
      <button type="button" class="profile-tab" data-tab="birth">出生信息</button>
      <button type="button" class="profile-tab" data-tab="location">居住地区</button>
      <button type="button" class="profile-tab" data-tab="preferences">个人偏好</button>
    </div>
    
    <form id="profile-edit-form" class="profile-modal-body">
      <!-- Tab 1: 基本信息 -->
      <div class="profile-tab-content active" data-tab="basic">
        <div class="profile-form-group">
          <label for="edit-pseudonym">假名 / 昵称</label>
          <input type="text" id="edit-pseudonym" name="pseudonym" maxlength="50" placeholder="请输入您的假名">
        </div>
        <div class="profile-form-group">
          <label>性别</label>
          <div class="profile-radio-group" id="edit-gender-group">
            ${CONFIG.genders.map(function(g) {
              return '<label class="profile-radio-label"><input type="radio" name="gender" value="' + g.value + '"><span>' + g.label + '</span></label>';
            }).join('')}
          </div>
        </div>
        <div class="profile-form-group">
          <label for="edit-bio">个人简介</label>
          <textarea id="edit-bio" name="bio" maxlength="200" rows="3" placeholder="介绍一下自己（最多200字）"></textarea>
          <div class="profile-char-count"><span id="bio-count">0</span>/200</div>
        </div>
      </div>
      
      <!-- Tab 2: 出生信息 -->
      <div class="profile-tab-content" data-tab="birth">
        <div class="profile-form-row">
          <div class="profile-form-group">
            <label for="edit-birth-date">出生日期</label>
            <input type="date" id="edit-birth-date" name="birth_date">
          </div>
          <div class="profile-form-group">
            <label for="edit-birth-time">出生时间</label>
            <input type="time" id="edit-birth-time" name="birth_time">
          </div>
        </div>
        <div class="profile-form-group">
          <label for="edit-birth-location">出生地点</label>
          <input type="text" id="edit-birth-location" name="birth_location" placeholder="例如：北京市海淀区">
        </div>
        <div class="profile-form-group">
          <label>血型</label>
          <div class="profile-radio-group" id="edit-blood-type-group">
            ${CONFIG.bloodTypes.map(function(b) {
              return '<label class="profile-radio-label"><input type="radio" name="blood_type" value="' + b.value + '"><span>' + b.label + '</span></label>';
            }).join('')}
          </div>
        </div>
      </div>
      
      <!-- Tab 3: 居住地区 -->
      <div class="profile-tab-content" data-tab="location">
        <div class="profile-form-group">
          <label for="edit-nationality">国籍</label>
          <select id="edit-nationality" name="nationality">
            <option value="">请选择国籍</option>
            ${CONFIG.nationalities.map(function(n) {
              return '<option value="' + n + '">' + n + '</option>';
            }).join('')}
          </select>
        </div>
        <div class="profile-form-group">
          <label for="edit-current-residence">常驻地</label>
          <input type="text" id="edit-current-residence" name="current_residence" placeholder="例如：深圳市南山区">
        </div>
        <div class="profile-form-group">
          <label for="edit-culture">文化 / 民族</label>
          <input type="text" id="edit-culture" name="culture" placeholder="例如：汉族">
        </div>
        <div class="profile-form-group">
          <label for="edit-religion">宗教信仰</label>
          <select id="edit-religion" name="religion">
            <option value="">请选择宗教信仰</option>
            ${CONFIG.religions.map(function(r) {
              return '<option value="' + r + '">' + r + '</option>';
            }).join('')}
          </select>
        </div>
      </div>
      
      <!-- Tab 4: 个人偏好 -->
      <div class="profile-tab-content" data-tab="preferences">
        <div class="profile-form-group">
          <label for="edit-occupation">职业</label>
          <select id="edit-occupation" name="occupation">
            <option value="">请选择职业</option>
            ${CONFIG.occupations.map(function(o) {
              return '<option value="' + o + '">' + o + '</option>';
            }).join('')}
          </select>
          <input type="text" id="edit-occupation-custom" name="occupation_custom" placeholder="请输入职业" style="display:none;margin-top:8px;">
        </div>
        <div class="profile-form-group">
          <label>兴趣标签</label>
          <div class="profile-checkbox-group" id="edit-interests-group">
            ${CONFIG.interestTags.map(function(tag) {
              return '<label class="profile-checkbox-label"><input type="checkbox" name="interests" value="' + tag + '"><span>' + tag + '</span></label>';
            }).join('')}
          </div>
        </div>
      </div>
    </form>
    
    <div class="profile-modal-footer">
      <button type="button" class="profile-btn profile-btn-secondary" id="profile-modal-cancel">取消</button>
      <button type="button" class="profile-btn profile-btn-primary" id="profile-modal-save">
        <span class="btn-text">保存更改</span>
        <span class="btn-loading" style="display:none;">保存中...</span>
      </button>
    </div>
  </div>
</div>

<style>
/* Profile Edit Modal Styles */
.profile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.profile-modal-container {
  background: hsl(240 8% 12%);
  border: 1px solid hsl(240 8% 20%);
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.profile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
  border-bottom: 1px solid hsl(240 8% 20%);
}

.profile-modal-header h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-modal-close {
  background: none;
  border: none;
  font-size: 32px;
  color: hsl(240 5% 65%);
  cursor: pointer;
  padding: 6px 12px;
  line-height: 1;
  transition: color 0.2s;
}

.profile-modal-close:hover {
  color: hsl(240 5% 96%);
}

/* Tabs */
.profile-modal-tabs {
  display: flex;
  border-bottom: 1px solid hsl(240 8% 20%);
  padding: 0 32px;
  gap: 6px;
  overflow-x: auto;
}

.profile-tab {
  background: none;
  border: none;
  padding: 16px 24px;
  font-size: 16px;
  color: hsl(240 5% 65%);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.profile-tab:hover {
  color: hsl(240 5% 96%);
}

.profile-tab.active {
  color: #a855f7;
  border-bottom-color: #a855f7;
}

/* Body */
.profile-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.profile-tab-content {
  display: none;
}

.profile-tab-content.active {
  display: block;
}

/* Form */
.profile-form-group {
  margin-bottom: 28px;
}

.profile-form-group label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: hsl(240 5% 96%);
  margin-bottom: 12px;
}

.profile-form-group input[type="text"],
.profile-form-group input[type="date"],
.profile-form-group input[type="time"],
.profile-form-group select,
.profile-form-group textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  background: hsl(240 8% 18%);
  border: 1px solid hsl(240 8% 25%);
  border-radius: 10px;
  color: hsl(240 5% 96%);
  transition: border-color 0.2s;
}

.profile-form-group input:focus,
.profile-form-group select:focus,
.profile-form-group textarea:focus {
  outline: none;
  border-color: #a855f7;
}

.profile-form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.profile-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.profile-char-count {
  text-align: right;
  font-size: 14px;
  color: hsl(240 5% 65%);
  margin-top: 6px;
}

/* Radio & Checkbox Groups */
.profile-radio-group,
.profile-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.profile-radio-label,
.profile-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: hsl(240 8% 18%);
  border: 1px solid hsl(240 8% 25%);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: hsl(240 5% 96%);
  transition: all 0.2s;
}

.profile-radio-label:hover,
.profile-checkbox-label:hover {
  border-color: #a855f7;
}

.profile-radio-label input,
.profile-checkbox-label input {
  accent-color: #a855f7;
  width: 18px;
  height: 18px;
}

.profile-radio-label input:checked + span,
.profile-checkbox-label input:checked + span {
  color: #a855f7;
}

/* Footer */
.profile-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px 32px;
  border-top: 1px solid hsl(240 8% 20%);
}

.profile-btn {
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.profile-btn-secondary {
  background: hsl(240 8% 18%);
  color: hsl(240 5% 96%);
  border: 1px solid hsl(240 8% 25%);
}

.profile-btn-secondary:hover {
  background: hsl(240 8% 22%);
}

.profile-btn-primary {
  background: linear-gradient(135deg, #a855f7, #6366f1);
  color: white;
}

.profile-btn-primary:hover {
  opacity: 0.9;
}

.profile-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-modal-container {
    max-width: 95%;
    max-height: 95vh;
  }
  
  .profile-form-row {
    grid-template-columns: 1fr;
  }
  
  .profile-modal-tabs {
    padding: 0 20px;
  }
  
  .profile-tab {
    padding: 14px 16px;
    font-size: 14px;
  }
  
  .profile-modal-header,
  .profile-modal-body,
  .profile-modal-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
`;
  }

  // ========== 密码修改弹窗 HTML ==========
  function createPasswordModalHTML() {
    return `
<div id="password-change-modal" class="profile-modal-overlay" style="display:none;">
  <div class="profile-modal-container" style="max-width:550px;">
    <div class="profile-modal-header">
      <h2>修改密码</h2>
      <button type="button" class="profile-modal-close" id="password-modal-close">&times;</button>
    </div>
    
    <form id="password-change-form" class="profile-modal-body">
      <div class="profile-form-group">
        <label for="current-password">当前密码</label>
        <input type="password" id="current-password" name="current_password" placeholder="请输入当前密码">
        <p class="profile-hint" id="current-password-hint" style="display:none;">如果您尚未设置密码，请留空</p>
      </div>
      <div class="profile-form-group">
        <label for="new-password">新密码</label>
        <input type="password" id="new-password" name="new_password" minlength="8" placeholder="至少8个字符">
      </div>
      <div class="profile-form-group">
        <label for="confirm-password">确认新密码</label>
        <input type="password" id="confirm-password" name="confirm_password" placeholder="再次输入新密码">
      </div>
      <p class="profile-error" id="password-error" style="display:none;"></p>
    </form>
    
    <div class="profile-modal-footer">
      <button type="button" class="profile-btn profile-btn-secondary" id="password-modal-cancel">取消</button>
      <button type="button" class="profile-btn profile-btn-primary" id="password-modal-save">
        <span class="btn-text">确认修改</span>
        <span class="btn-loading" style="display:none;">保存中...</span>
      </button>
    </div>
  </div>
</div>

<style>
.profile-hint {
  font-size: 14px;
  color: hsl(240 5% 65%);
  margin-top: 8px;
}

.profile-error {
  font-size: 15px;
  color: #ef4444;
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
}

/* 密码输入框深色样式 */
#password-change-form input[type="password"] {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  background: hsl(240 8% 18%);
  border: 1px solid hsl(240 8% 25%);
  border-radius: 10px;
  color: hsl(240 5% 96%);
  transition: border-color 0.2s;
}

#password-change-form input[type="password"]:focus {
  outline: none;
  border-color: #a855f7;
}

#password-change-form input[type="password"]::placeholder {
  color: hsl(240 5% 50%);
}
</style>
`;
  }

  // ========== 弹窗控制器 ==========
  var ProfileEditModal = {
    modal: null,
    form: null,
    currentProfileData: null,

    init: function() {
      // 注入弹窗 HTML
      if (!document.getElementById('profile-edit-modal')) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = createModalHTML() + createPasswordModalHTML();
        document.body.appendChild(wrapper);
      }

      this.modal = document.getElementById('profile-edit-modal');
      this.form = document.getElementById('profile-edit-form');

      this.bindEvents();
      this.interceptEditButton();
      this.interceptPasswordButton();
      
      console.log('[ProfileEditModal] Initialized');
    },

    bindEvents: function() {
      var self = this;

      // Tab 切换
      document.querySelectorAll('.profile-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          var targetTab = this.getAttribute('data-tab');
          self.switchTab(targetTab);
        });
      });

      // 关闭弹窗 - 只能通过 X 按钮或取消按钮关闭
      document.getElementById('profile-modal-close').addEventListener('click', function() {
        self.close();
      });
      document.getElementById('profile-modal-cancel').addEventListener('click', function() {
        self.close();
      });
      
      // 不再监听 overlay 点击关闭，避免误触

      // 保存
      document.getElementById('profile-modal-save').addEventListener('click', function() {
        self.save();
      });

      // 职业"其他"选项
      var occSelect = document.getElementById('edit-occupation');
      var occCustom = document.getElementById('edit-occupation-custom');
      if (occSelect && occCustom) {
        occSelect.addEventListener('change', function() {
          if (this.value === '其他') {
            occCustom.style.display = 'block';
            occCustom.focus();
          } else {
            occCustom.style.display = 'none';
            occCustom.value = '';
          }
        });
      }

      // 个人简介字数统计
      var bioInput = document.getElementById('edit-bio');
      var bioCount = document.getElementById('bio-count');
      if (bioInput && bioCount) {
        bioInput.addEventListener('input', function() {
          bioCount.textContent = this.value.length;
        });
      }

      // 密码弹窗事件
      this.bindPasswordEvents();
    },

    bindPasswordEvents: function() {
      var self = this;
      var pwModal = document.getElementById('password-change-modal');
      
      // 关闭密码弹窗的函数
      function closePasswordModal() {
        pwModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复页面滚动
      }
      
      // 只能通过 X 按钮或取消按钮关闭密码弹窗
      document.getElementById('password-modal-close').addEventListener('click', closePasswordModal);
      document.getElementById('password-modal-cancel').addEventListener('click', closePasswordModal);

      document.getElementById('password-modal-save').addEventListener('click', function() {
        self.savePassword();
      });
    },

    switchTab: function(tabName) {
      // 更新 Tab 按钮状态
      document.querySelectorAll('.profile-tab').forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
      });
      // 更新内容区域
      document.querySelectorAll('.profile-tab-content').forEach(function(content) {
        content.classList.toggle('active', content.getAttribute('data-tab') === tabName);
      });
    },

    interceptEditButton: function() {
      var self = this;
      
      function setupEditButton() {
        var editBtn = Array.from(document.querySelectorAll('button')).find(function(btn) {
          return btn.textContent.trim() === '编辑资料';
        });
        
        if (editBtn && !editBtn.dataset.modalHandlerAdded) {
          editBtn.dataset.modalHandlerAdded = 'true';
          editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            self.open();
            return false;
          }, true);
          console.log('[ProfileEditModal] Edit button intercepted');
        }
      }

      // 多次尝试（React hydration）
      setTimeout(setupEditButton, 100);
      setTimeout(setupEditButton, 500);
      setTimeout(setupEditButton, 1000);
      setTimeout(setupEditButton, 2000);
    },

    interceptPasswordButton: function() {
      var self = this;
      
      function setupPasswordButton() {
        var pwBtn = Array.from(document.querySelectorAll('button')).find(function(btn) {
          return btn.textContent.includes('修改密码');
        });
        
        if (pwBtn && !pwBtn.dataset.passwordHandlerAdded) {
          pwBtn.dataset.passwordHandlerAdded = 'true';
          pwBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            self.openPasswordModal();
            return false;
          }, true);
          console.log('[ProfileEditModal] Password button intercepted');
        }
      }

      setTimeout(setupPasswordButton, 100);
      setTimeout(setupPasswordButton, 500);
      setTimeout(setupPasswordButton, 1000);
      setTimeout(setupPasswordButton, 2000);
    },

    open: function() {
      var self = this;
      this.modal.style.display = 'flex';
      this.switchTab('basic');
      this.loadProfileData();
      
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    },

    close: function() {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    },

    loadProfileData: function() {
      var self = this;
      var userId = getUserId();
      
      if (!userId) {
        console.warn('[ProfileEditModal] No user_id found');
        return;
      }

      console.log('[ProfileEditModal] Loading profile for user:', userId);
      
      fetch('/uxbot/api/user/profile/' + encodeURIComponent(userId))
        .then(function(res) { return res.json(); })
        .then(function(data) {
          console.log('[ProfileEditModal] API response:', data);
          if (data && data.success && data.data) {
            self.currentProfileData = data.data;
            self.populateForm(data.data);
          }
        })
        .catch(function(err) {
          console.error('[ProfileEditModal] Failed to load profile:', err);
        });
    },

    populateForm: function(profile) {
      // 基本信息
      this.setInputValue('edit-pseudonym', profile.pseudonym || profile.name || '');
      this.setRadioValue('gender', profile.gender || '');
      this.setInputValue('edit-bio', profile.bio || '');
      document.getElementById('bio-count').textContent = (profile.bio || '').length;

      // 出生信息
      this.setInputValue('edit-birth-date', profile.birth_date || '');
      this.setInputValue('edit-birth-time', profile.birth_time || '');
      this.setInputValue('edit-birth-location', profile.birth_location || '');
      this.setRadioValue('blood_type', profile.blood_type || '');

      // 居住地区
      this.setSelectValue('edit-nationality', profile.nationality || '');
      this.setInputValue('edit-current-residence', profile.current_residence || '');
      this.setInputValue('edit-culture', profile.culture || '');
      this.setSelectValue('edit-religion', profile.religion || '');

      // 个人偏好
      var occ = profile.occupation || '';
      var occSelect = document.getElementById('edit-occupation');
      var occCustom = document.getElementById('edit-occupation-custom');
      
      // 检查职业是否在预设列表中
      var isPreset = CONFIG.occupations.indexOf(occ) !== -1;
      if (isPreset) {
        occSelect.value = occ;
        occCustom.style.display = 'none';
      } else if (occ) {
        occSelect.value = '其他';
        occCustom.value = occ;
        occCustom.style.display = 'block';
      }

      // 兴趣标签
      var interests = profile.interests || [];
      if (typeof interests === 'string') {
        interests = interests.split(',').map(function(t) { return t.trim(); });
      }
      document.querySelectorAll('input[name="interests"]').forEach(function(cb) {
        cb.checked = interests.indexOf(cb.value) !== -1;
      });
    },

    setInputValue: function(id, value) {
      var el = document.getElementById(id);
      if (el) el.value = value || '';
    },

    setSelectValue: function(id, value) {
      var el = document.getElementById(id);
      if (!el) return;
      
      // 先尝试直接匹配
      el.value = value || '';
      
      // 如果没匹配到（值不在选项中），尝试添加一个临时选项
      if (value && el.value !== value) {
        var opt = document.createElement('option');
        opt.value = value;
        opt.textContent = value;
        el.appendChild(opt);
        el.value = value;
      }
    },

    setRadioValue: function(name, value) {
      var radios = document.querySelectorAll('input[name="' + name + '"]');
      radios.forEach(function(radio) {
        radio.checked = radio.value === value;
      });
    },

    save: function() {
      var self = this;
      var saveBtn = document.getElementById('profile-modal-save');
      var btnText = saveBtn.querySelector('.btn-text');
      var btnLoading = saveBtn.querySelector('.btn-loading');

      // 收集表单数据
      var formData = this.collectFormData();
      
      // 显示加载状态
      saveBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';

      fetch('/uxbot/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data.success) {
            // 更新本地存储
            if (formData.pseudonym) {
              localStorage.setItem('user_name', formData.pseudonym);
            }
            
            // 触发页面更新
            window.dispatchEvent(new CustomEvent('userProfileUpdated', {
              detail: formData
            }));
            
            // 刷新页面显示
            self.updatePageDisplay(formData);
            
            alert('资料保存成功！');
            self.close();
          } else {
            alert(data.error || '保存失败，请重试');
          }
        })
        .catch(function(err) {
          console.error('[ProfileEditModal] Save error:', err);
          alert('保存失败：网络错误');
        })
        .finally(function() {
          saveBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
        });
    },

    collectFormData: function() {
      var data = {};
      
      // 添加 user_id
      data.user_id = getUserId();

      // 基本信息
      data.pseudonym = document.getElementById('edit-pseudonym').value.trim();
      var genderRadio = document.querySelector('input[name="gender"]:checked');
      if (genderRadio) data.gender = genderRadio.value;
      data.bio = document.getElementById('edit-bio').value.trim();

      // 出生信息
      data.birth_date = document.getElementById('edit-birth-date').value;
      data.birth_time = document.getElementById('edit-birth-time').value;
      data.birth_location = document.getElementById('edit-birth-location').value.trim();
      var bloodRadio = document.querySelector('input[name="blood_type"]:checked');
      if (bloodRadio) data.blood_type = bloodRadio.value;

      // 居住地区
      data.nationality = document.getElementById('edit-nationality').value.trim();
      data.current_residence = document.getElementById('edit-current-residence').value.trim();
      data.culture = document.getElementById('edit-culture').value.trim();
      data.religion = document.getElementById('edit-religion').value.trim();

      // 职业
      var occSelect = document.getElementById('edit-occupation');
      var occCustom = document.getElementById('edit-occupation-custom');
      if (occSelect.value === '其他' && occCustom.value.trim()) {
        data.occupation = occCustom.value.trim();
      } else if (occSelect.value && occSelect.value !== '其他') {
        data.occupation = occSelect.value;
      }

      // 兴趣标签
      var interests = [];
      document.querySelectorAll('input[name="interests"]:checked').forEach(function(cb) {
        interests.push(cb.value);
      });
      if (interests.length > 0) {
        data.interests = interests;
      }

      return data;
    },

    updatePageDisplay: function(data) {
      // 更新页面上显示的字段值
      // 这些都是静态显示的 div，需要找到并更新
      
      function updateField(label, value) {
        if (!value) return;
        var labels = document.querySelectorAll('label');
        labels.forEach(function(lbl) {
          if (lbl.textContent.trim() === label) {
            var container = lbl.closest('.space-y-2');
            if (container) {
              var valueDiv = container.querySelector('.bg-muted\\/50');
              if (valueDiv && !valueDiv.querySelector('input') && !valueDiv.querySelector('select')) {
                valueDiv.textContent = value;
              }
            }
          }
        });
      }

      updateField('假名', data.pseudonym);
      updateField('出生日期', data.birth_date);
      updateField('出生时间', data.birth_time);
      updateField('出生地', data.birth_location);
      updateField('常驻地', data.current_residence);
      updateField('文化/民族', data.culture);
      updateField('宗教信仰', data.religion);
      updateField('个人简介', data.bio);
      
      // 刷新页面以确保所有数据同步（可选）
      // location.reload();
    },

    openPasswordModal: function() {
      var pwModal = document.getElementById('password-change-modal');
      pwModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // 清空表单
      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
      document.getElementById('password-error').style.display = 'none';
    },

    savePassword: function() {
      var currentPw = document.getElementById('current-password').value;
      var newPw = document.getElementById('new-password').value;
      var confirmPw = document.getElementById('confirm-password').value;
      var errorEl = document.getElementById('password-error');
      var saveBtn = document.getElementById('password-modal-save');
      var btnText = saveBtn.querySelector('.btn-text');
      var btnLoading = saveBtn.querySelector('.btn-loading');

      // 验证
      if (!newPw || newPw.length < 8) {
        errorEl.textContent = '新密码至少需要8个字符';
        errorEl.style.display = 'block';
        return;
      }
      if (newPw !== confirmPw) {
        errorEl.textContent = '两次输入的密码不一致';
        errorEl.style.display = 'block';
        return;
      }

      errorEl.style.display = 'none';

      // 获取用户邮箱
      var email = localStorage.getItem('user_email') || '';
      if (!email) {
        errorEl.textContent = '无法获取用户邮箱，请重新登录';
        errorEl.style.display = 'block';
        return;
      }

      // 显示加载状态
      saveBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';

      var payload = {
        email: email,
        new_password: newPw
      };
      if (currentPw) {
        payload.current_password = currentPw;
      }

      fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data.success) {
            alert('密码修改成功！');
            document.getElementById('password-change-modal').style.display = 'none';
            document.body.style.overflow = '';
          } else {
            errorEl.textContent = data.error || '密码修改失败';
            errorEl.style.display = 'block';
          }
        })
        .catch(function(err) {
          console.error('[Password] Error:', err);
          errorEl.textContent = '网络错误，请重试';
          errorEl.style.display = 'block';
        })
        .finally(function() {
          saveBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
        });
    }
  };

  // ========== 初始化 ==========
  function init() {
    ProfileEditModal.init();
  }

  // 等待 DOM 加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

  // 暴露到全局
  window.UXBotProfileEditModal = ProfileEditModal;

})();
