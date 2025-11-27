/**
 * 紫微命盘摘要卡片渲染器
 * ZiweiAI v1.1
 */

/**
 * 渲染紫微命盘摘要卡片（黑底设计）
 * @param {Object} data - ZiweiAI v1.1 标准化数据
 * @param {string} containerId - 容器元素 ID
 */
function renderZiweiSummary(data, containerId = 'ziweiSummaryCard') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`[ZiweiSummary] 容器元素 #${containerId} 不存在`);
        return;
    }

    // 提取数据
    const basicInfo = data.basic_info || {};
    const starMap = data.star_map || {};
    const transformations = data.transformations || {};
    const tags = data.tags || {};
    const astroFingerprint = data.astro_fingerprint || {};
    const relationshipVector = data.relationship_vector || {};

    // ✅ 修正：正确访问对象结构的 star_map
    const mingGong = starMap['命宫'] || {};
const mingGong = starMap["命宫"] || {};
const mingGongStars = [
    mingGong["主星"],
    mingGong["辅星"],
    mingGong["小星"]
].filter(s => s && s.trim()).join("、") || "未识别";
        mingGong['小星']
    ].filter(s => s && s.trim()).join('、') || '未识别';
    
    const mingZhu = basicInfo['命主'] || '未识别';
    const shenZhu = basicInfo['身主'] || '未识别';
    const mingJu = basicInfo['命局'] || '未识别';
    const gender = basicInfo['性别'] || '未知';
    
    // 提取格局标签
    const gejuTags = tags['格局'] || [];
    const gejuText = gejuTags.length > 0 ? gejuTags.join('、') : '未识别';
    
    // 生成生年四化摘要
    const shengNianSiHua = transformations['生年四化'] || {};
    const siHuaText = `禄: ${shengNianSiHua['禄'] || '?'} | 权: ${shengNianSiHua['权'] || '?'} | 科: ${shengNianSiHua['科'] || '?'} | 忌: ${shengNianSiHua['忌'] || '?'}`;

    // 构建 HTML
    const cardHTML = `
        <div class="ziwei-card">
            <div class="ziwei-card-header">
                <h3>🌟 紫微命盘摘要</h3>
            </div>

            <div class="ziwei-card-body">
                <div class="ziwei-info-row">
                    <div class="ziwei-info-item">
                        <b>命宫:</b><span>${mingGongStars}</span>
                    </div>
                    <div class="ziwei-info-item">
                        <b>命局:</b><span>${mingJu}</span>
                    </div>
                    <div class="ziwei-info-item">
                        <b>性别:</b><span>${gender}</span>
                    </div>
                </div>

                <div class="ziwei-info-row">
                    <div class="ziwei-info-item">
                        <b>命主:</b><span>${mingZhu}</span>
                    </div>
                    <div class="ziwei-info-item">
                        <b>身主:</b><span>${shenZhu}</span>
                    </div>
                </div>

                <p><b>格局:</b><span>${gejuText}</span></p>
                <p><b>生年四化:</b><span style="font-size: 13px;">${siHuaText}</span></p>

                ${renderTagsSection(tags)}
                ${renderRelationshipVector(relationshipVector)}

                <button class="btn-ziwei-toggle" onclick="toggleZiweiDetail()">
                    展开星曜详情 ⬇
                </button>

                <div id="ziwei-detail" class="ziwei-detail-section collapsed">
                    <h4 style="color: #80e8ff; margin: 0 0 10px 0; font-size: 14px;">📋 十二宫星曜分布</h4>
                    <div class="ziwei-json-display">${JSON.stringify(starMap, null, 2)}</div>
                    
                    ${astroFingerprint.主星组合编码 ? `
                    <h4 style="color: #80e8ff; margin: 14px 0 10px 0; font-size: 14px;">🔖 星盘指纹</h4>
                    <div class="ziwei-json-display">${JSON.stringify(astroFingerprint, null, 2)}</div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = cardHTML;
}

/**
 * 渲染标签区块
 */
function renderTagsSection(tags) {
    if (!tags || Object.keys(tags).length === 0) {
        return '';
    }

    let html = '<div class="ziwei-tag-group">';
    
    for (const [category, tagList] of Object.entries(tags)) {
        if (Array.isArray(tagList) && tagList.length > 0) {
            tagList.forEach(tag => {
                html += `<span class="ziwei-tag">${tag}</span>`;
            });
        }
    }
    
    html += '</div>';
    return html;
}

/**
 * 渲染关系向量（四维评分）
 */
function renderRelationshipVector(vector) {
    if (!vector || Object.keys(vector).length === 0) {
        return '';
    }

    const dimensions = [
        { key: '婚姻', label: '婚姻', icon: '💑' },
        { key: '事业', label: '事业', icon: '💼' },
        { key: '健康', label: '健康', icon: '💪' },
        { key: '人际', label: '人际', icon: '🤝' }
    ];

    let html = '<div style="margin-top: 14px;">';
    html += '<p style="margin-bottom: 8px;"><b>关系向量评分:</b></p>';
    
    dimensions.forEach(dim => {
        const score = vector[dim.key] || 0;
        const percentage = Math.round(score * 100);
        const color = score >= 0.8 ? '#4ade80' : score >= 0.6 ? '#80e8ff' : '#fbbf24';
        
        html += `
            <div class="ziwei-vector-bar">
                <span class="ziwei-vector-label">${dim.icon} ${dim.label}</span>
                <div class="ziwei-vector-progress">
                    <div class="ziwei-vector-fill" style="width: ${percentage}%; background: ${color};">
                        ${percentage}%
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

/**
 * 切换详情区域的展开/收起状态
 */
function toggleZiweiDetail() {
    const detailSection = document.getElementById('ziwei-detail');
    const btn = document.querySelector('.btn-ziwei-toggle');
    
    if (!detailSection || !btn) return;
    
    if (detailSection.classList.contains('collapsed')) {
        detailSection.classList.remove('collapsed');
        detailSection.classList.add('expanded');
        btn.textContent = '收起详情 ⬆';
    } else {
        detailSection.classList.remove('expanded');
        detailSection.classList.add('collapsed');
        btn.textContent = '展开星曜详情 ⬇';
    }
}

/**
 * 显示空状态（等待识别）
 */
function renderZiweiEmptyState(containerId = 'ziweiSummaryCard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="ziwei-card">
            <div class="ziwei-card-header">
                <h3>🌟 紫微命盘摘要</h3>
            </div>
            <div class="ziwei-card-body">
                <div class="ziwei-empty-state">
                    ⏳ 等待 AI 识别完成...
                </div>
            </div>
        </div>
    `;
}

// 导出函数（如果需要模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderZiweiSummary,
        renderZiweiEmptyState,
        toggleZiweiDetail
    };
}
