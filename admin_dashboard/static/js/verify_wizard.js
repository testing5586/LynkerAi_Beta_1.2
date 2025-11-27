/**
 * 真命盘验证中心 - 前端逻辑
 * 1个 AI 对话框 + 2个上传框 + 2个只读结果展示区
 * 支持3组命盘数据切换
 */

// 🧩 诊断模式：追踪紫微上传和粘贴路径
console.log("%c[Ziwei DEBUG] Diagnostic mode active — start tracing upload + paste paths.","color:#4af");

// ========== 控制引擎可见性（未来可切换）==========
const engineEnabled = false; // 设为 true 可启用 Lynker 统一命理引擎

// 全局状态管理
const state = {
    userId: null,
    currentGroupIndex: 0, // 当前显示的组：0/1/2
    chartGroups: [
        // 组1 - 可能出生的时辰1
        {
            baziText: "",
            ziweiText: "",
            baziResult: null,
            ziweiResult: null,
            baziUploaded: false,
            ziweiUploaded: false,
            baziImageUrl: null, // 存储上传的图片URL
            ziweiImageUrl: null
        },
        // 组2 - 可能出生的时辰2
        {
            baziText: "",
            ziweiText: "",
            baziResult: null,
            ziweiResult: null,
            baziUploaded: false,
            ziweiUploaded: false,
            baziImageUrl: null,
            ziweiImageUrl: null
        },
        // 组3 - 可能出生的时辰3
        {
            baziText: "",
            ziweiText: "",
            baziResult: null,
            ziweiResult: null,
            baziUploaded: false,
            ziweiUploaded: false,
            baziImageUrl: null,
            ziweiImageUrl: null
        }
    ],
    conversationState: 'waiting_bazi', // waiting_bazi | waiting_ziwei | ready_to_save | saved
    conversationHistory: [], // 对话历史记录
    lifeEvents: "" // 用户讲述的人生事件
};

// 获取当前组的数据
function getCurrentGroup() {
    return state.chartGroups[state.currentGroupIndex];
}

// ========== 格式转换函数（Mode B 数据准备）==========
// 将八字 JSON 数据转换为后端期望的文本格式
function formatBaziForAPI(baziData) {
    if (!baziData) return "";
    if (typeof baziData === "string") return baziData; // 已经是文本格式
    
    // 如果是 JSON 对象，提取字段
    const y = baziData.year_pillar || "";
    const m = baziData.month_pillar || "";
    const d = baziData.day_pillar || "";
    const h = baziData.hour_pillar || "";
    return `年柱:${y} 月柱:${m} 日柱:${d} 时柱:${h}`;
}

// 将紫微 JSON 数据转换为后端期望的格式
function formatZiweiForAPI(ziweiData) {
    if (!ziweiData) return "";
    if (typeof ziweiData === "string") return ziweiData; // 已经是文本格式
    
    // 紫微数据可以原样发送 JSON 字符串
    return JSON.stringify(ziweiData, null, 2);
}

// ========== 初始化 ==========
document.addEventListener("DOMContentLoaded", () => {
    // 获取 user_id
    state.userId = document.querySelector("body").dataset.userId;
    
    if (!state.userId) {
        console.error("❌ 未找到 user_id");
        return;
    }
    
    // 控制 Lynker 引擎显示/隐藏
    const birthInfo = document.getElementById("birth-info");
    const divider = document.getElementById("lynker-divider");
    
    if (!engineEnabled) {
        if (birthInfo) birthInfo.style.display = "none";
        if (divider) divider.style.display = "block";
        console.log("📋 Lynker 统一命理引擎已收起（未来功能）");
    } else {
        if (birthInfo) birthInfo.style.display = "block";
        if (divider) divider.style.display = "none";
        console.log("✨ Lynker 统一命理引擎已启用");
    }
    
    initSidebar();
    initGroupSwitcher(); // 初始化组切换功能
    initDragDrop();
    initFileInputs();
    initTextInputs();
    initChatbox();
    if (engineEnabled) {
        initUnifiedGeneration(); // 只在启用时初始化统一命理生成
    }
    
    // 加载初始数据（组1）
    renderCurrentGroup();
    
    console.log("✅ 真命盘验证中心已初始化，user_id:", state.userId);
});

// ========== 侧边栏展开/收起 ==========
function initSidebar() {
    document.querySelectorAll('.nav-item.expandable').forEach(item => {
        item.addEventListener('click', () => {
            const menuName = item.dataset.menu;
            const submenu = document.querySelector(`.nav-submenu[data-parent="${menuName}"]`);
            
            if (submenu) {
                const isHidden = submenu.classList.contains('hidden');
                submenu.classList.toggle('hidden');
                item.classList.toggle('expanded', isHidden);
            }
        });
    });
}

// ========== 组切换功能 ==========
function initGroupSwitcher() {
    document.querySelectorAll('.group-switch').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const groupIndex = parseInt(item.dataset.groupIndex);
            switchGroup(groupIndex);
        });
    });
}

// 切换到指定组
function switchGroup(groupIndex) {
    if (groupIndex < 0 || groupIndex > 2) return;
    
    // 保存当前组的数据到state
    saveCurrentGroupState();
    
    // 更新当前组索引
    state.currentGroupIndex = groupIndex;
    
    // 更新菜单高亮
    document.querySelectorAll('.group-switch').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.group-switch[data-group-index="${groupIndex}"]`).classList.add('active');
    
    // 渲染新组的数据
    renderCurrentGroup();
    
    console.log(`✅ 已切换到组 ${groupIndex + 1}`);
}

// 保存当前组的UI状态到state
function saveCurrentGroupState() {
    const currentGroup = getCurrentGroup();
    const baziText = document.getElementById('baziText');
    const ziweiText = document.getElementById('ziweiText');
    
    if (baziText) currentGroup.baziText = baziText.value;
    if (ziweiText) currentGroup.ziweiText = ziweiText.value;
}

// 渲染当前组的数据到UI
function renderCurrentGroup() {
    const currentGroup = getCurrentGroup();
    const groupIndex = state.currentGroupIndex;

    // 更新时辰标题
    const shichenTitle = document.querySelector('.shichen-title h2');
    if (shichenTitle) {
        shichenTitle.textContent = `可能出生的时辰${groupIndex + 1}`;
    }

    // 恢复文本输入框内容
    const baziText = document.getElementById('baziText');
    const ziweiText = document.getElementById('ziweiText');
    if (baziText) baziText.value = currentGroup.baziText || '';
    if (ziweiText) ziweiText.value = currentGroup.ziweiText || '';

    // 恢复图片预览
    if (currentGroup.baziImageUrl) {
        displayImagePreview('bazi', currentGroup.baziImageUrl);
    } else {
        resetDropzone('bazi');
    }

    if (currentGroup.ziweiImageUrl) {
        displayImagePreview('ziwei', currentGroup.ziweiImageUrl);
    } else {
        resetDropzone('ziwei');
    }

    // 恢复结果展示区
    renderResult('bazi', currentGroup.baziResult, currentGroup.baziUploaded);
    renderResult('ziwei', currentGroup.ziweiResult, currentGroup.ziweiUploaded);
}

// 显示图片预览在上传区域
function displayImagePreview(type, imageUrl) {
    const dropzoneId = type === 'bazi' ? 'baziDropzone' : 'ziweiDropzone';
    const dropzone = document.getElementById(dropzoneId);
    if (!dropzone) return;

    // 添加已有图片的样式类
    dropzone.classList.add('has-image');

    // 清空原有内容并显示图片预览
    dropzone.innerHTML = `
        <div class="dropzone-content">
            <img src="${imageUrl}" class="dropzone-image-preview" alt="命盘图片" onclick="window.open('${imageUrl}', '_blank')" title="点击查看大图">
            <div class="dropzone-upload-prompt">
                <p class="dropzone-text">图片已加载。可拖拽新图片或</p>
                <button class="btn-upload" onclick="event.stopPropagation(); document.getElementById('${type}File').click()">重新选择文件</button>
            </div>
        </div>
        <input type="file" id="${type}File" accept="image/*,.txt" style="display:none;">
    `;

    // 保持拖拽功能
    setupDropzone(dropzone, type);
}

// 重置上传区域到初始状态
function resetDropzone(type) {
    const dropzoneId = type === 'bazi' ? 'baziDropzone' : 'ziweiDropzone';
    const dropzone = document.getElementById(dropzoneId);
    if (!dropzone) return;

    // 移除已有图片的样式类
    dropzone.classList.remove('has-image');

    // 恢复原始上传提示
    dropzone.innerHTML = `
        <div class="dropzone-icon">☁️</div>
        <p class="dropzone-text">拖拽图片到这里 或</p>
        <button class="btn-upload" onclick="event.stopPropagation(); document.getElementById('${type}File').click()">选择文件</button>
        <input type="file" id="${type}File" accept="image/*,.txt" style="display:none;">
        <p class="dropzone-hint">也可以直接粘贴命盘文本</p>
    `;

    // 重新初始化拖拽功能
    setupDropzone(dropzone, type);
}

// 渲染单个结果框
function renderResult(type, result, uploaded) {
    const resultBox = document.getElementById(`${type}Result`);
    const statusElem = document.getElementById(`${type}Status`);
    const contentElem = document.getElementById(`${type}ResultContent`);

    if (!resultBox || !statusElem || !contentElem) return;

    if (result) {
        // 显示验证结果 - Use displayResult for proper formatting
        statusElem.textContent = '验证完成';
        statusElem.className = 'result-status completed';
        displayResult(result, type); // Use displayResult instead of formatResultContent
    } else if (uploaded) {
        // 已上传但未验证
        statusElem.textContent = '已上传';
        statusElem.className = 'result-status processing';
        contentElem.innerHTML = '<p class="empty-state">等待验证...</p>';
    } else {
        // 未上传
        statusElem.textContent = '等待上传...';
        statusElem.className = 'result-status';
        const typeName = type === 'bazi' ? '八字' : '紫微';
        contentElem.innerHTML = `<p class="empty-state">上传${typeName}命盘后，验证结果将显示在这里</p>`;
    }
}

// 格式化结果内容（已废弃，使用 displayResult 代替）
function formatResultContent(result) {
    if (!result) return '<p class="empty-state">⏳ 等待用户完成七步问卷以生成初步验证结果</p>';
    
    let html = '';
    if (result.parsed) {
        html += `<pre style="font-size: 12px;">${JSON.stringify(result.parsed, null, 2)}</pre>`;
    }
    if (result.message) {
        html += `<p>${result.message}</p>`;
    }
    return html || '<p class="empty-state">⏳ 等待用户完成七步问卷以生成初步验证结果</p>';
}

// ========== Drag & Drop 上传 ==========
function initDragDrop() {
    const baziDropzone = document.getElementById('baziDropzone');
    const ziweiDropzone = document.getElementById('ziweiDropzone');
    
    setupDropzone(baziDropzone, 'bazi');
    setupDropzone(ziweiDropzone, 'ziwei');
}

function setupDropzone(dropzone, type) {
    // 阻止默认行为
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    // 拖拽时高亮
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.remove('dragover');
        }, false);
    });
    
    // 处理拖拽文件
    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0], type);
        }
    }, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// ========== 文件输入处理 ==========
function initFileInputs() {
    // Use event delegation on document to handle dynamically created file inputs
    document.addEventListener('change', (e) => {
        if (e.target.id === 'baziFile' && e.target.files[0]) {
            handleFileUpload(e.target.files[0], 'bazi');
        } else if (e.target.id === 'ziweiFile' && e.target.files[0]) {
            handleFileUpload(e.target.files[0], 'ziwei');
        }
    });
}

async function handleFileUpload(file, type) {
    console.log("[Ziwei DEBUG] handleFileUpload triggered, file type =", file?.type, "name =", file?.name);
    
    const textarea = document.getElementById(`${type}Text`);
    const statusSpan = document.getElementById(`${type}Status`);
    const currentGroup = getCurrentGroup();

    statusSpan.textContent = "读取文件中...";
    statusSpan.className = "result-status processing";

    try {
        // 🧠 使用智能检测函数识别文件类型
        const detection = await detectWenMoFormat(file);
        console.log('[Ziwei DEBUG] 文件检测结果:', detection.format);

        // 🚫 图片文件：仅显示预览，不做任何 AI 识别
        if (detection.format === 'image_only') {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'bazi') {
                    currentGroup.baziImageUrl = e.target.result;
                } else {
                    currentGroup.ziweiImageUrl = e.target.result;
                }
                displayImagePreview(type, e.target.result);
            };
            reader.readAsDataURL(file);

            // 八字图片：仍然调用 Agent Workflow（GPT-4o Vision）
            if (type === 'bazi') {
                callAgentWorkflow(file);
                return;
            }

            // 紫微图片：仅存底，不识别
            if (type === 'ziwei') {
                statusSpan.textContent = "图片已上传（仅存底）";
                statusSpan.className = "result-status success";
                addAIMessage(`
                    <div style="padding: 16px; background: #2a1a1a; border-left: 4px solid #ff9d00; border-radius: 8px; margin: 12px 0;">
                        <strong style="color: #ff9d00;">🚫 紫微命盘图片仅作存底，不会触发任何识别</strong><br>
                        <p style="margin: 8px 0; color: #ccc; font-size: 13px;">
                            请从文墨天机 App 导出 <strong>AI分析版文件（.json 或 .txt）</strong>，然后上传解析。
                        </p>
                    </div>
                `);
                return;
            }
        }

        // ✅ 紫微 JSON/TXT 文件：调用三层 Agent 系统
        if (type === 'ziwei' && (detection.format === 'wenmo_json_file' || detection.format === 'wenmo_txt_file')) {
            console.log(`[Ziwei DEBUG] 🚀 检测到 ${detection.format}，调用三层 Agent 系统`);
            await callZiweiPipeline(file);
            return;
        }

        // 🔹 其他文本文件：读取内容后调用旧逻辑
        if (!file.type.startsWith('image/')) {
            const text = await file.text();
            textarea.value = text;
            statusSpan.textContent = "文件已加载";
            statusSpan.className = "result-status success";
            await processChartText(text, type);
            return;
        }

        // ⚙️ 未知格式：提示用户
        addAIMessage(`⚠️ 无法识别文件格式 "${file.name}"，请上传 .json 或 .txt 文件。`);
        statusSpan.textContent = "格式不支持";
        statusSpan.className = "result-status error";

    } catch (error) {
        console.error("文件读取失败:", error);
        addAIMessage(`抱歉，读取文件 "${file.name}" 时出错了。<br>错误信息：${error.message}`);
        statusSpan.textContent = "读取失败";
        statusSpan.className = "result-status error";
    }
}

// ========== 文本输入处理 ==========
function initTextInputs() {
    const baziText = document.getElementById('baziText');
    const ziweiText = document.getElementById('ziweiText');
    
    // 失焦时自动验证
    baziText.addEventListener('blur', async () => {
        const text = baziText.value.trim();
        const currentGroup = getCurrentGroup();
        if (text && !currentGroup.baziUploaded) {
            await processChartText(text, 'bazi');
        }
    });
    
    ziweiText.addEventListener('blur', async () => {
        const text = ziweiText.value.trim();
        const currentGroup = getCurrentGroup();
        if (text && !currentGroup.ziweiUploaded) {
            await processChartText(text, 'ziwei');
        }
    });
    
    // 粘贴时提示
    [baziText, ziweiText].forEach(textarea => {
        textarea.addEventListener('paste', () => {
            addAIMessage("检测到粘贴内容，请确保完整后点击输入框外部，我会自动为你验证。");
        });
    });
}

// ========== 智能检测紫微命盘格式 ==========
/**
 * detectWenMoFormat(textOrFile)
 * 识别支持的文墨天机数据格式：
 * ✅ JSON / TXT 文件或文本粘贴
 * 🚫 图片文件（仅显示，不识别）
 */
async function detectWenMoFormat(input) {
    // 🔹 如果是文件
    if (input instanceof File) {
        const name = input.name.toLowerCase();
        if (name.endsWith('.json')) {
            console.log('[Ziwei DEBUG] ✅ 检测到文墨天机 JSON 文件');
            return { format: 'wenmo_json_file', data: input };
        }
        if (name.endsWith('.txt')) {
            console.log('[Ziwei DEBUG] ✅ 检测到文墨天机 TXT 文件');
            return { format: 'wenmo_txt_file', data: input };
        }
        if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
            console.log('[Ziwei DEBUG] 🖼 检测到命盘图片文件 — 不做 OCR 识别，仅显示图像');
            return { format: 'image_only', data: input };
        }
    }

    // 🔹 如果是纯文本输入
    const text = typeof input === 'string' ? input.trim() : '';
    try {
        const parsed = JSON.parse(text);
        if (parsed && (parsed.命主 || parsed.身主 || parsed.命局 || parsed.basic_info)) {
            console.log('[Ziwei DEBUG] ✅ 检测到标准 JSON 格式文本');
            return { format: 'wenmo_json_text', data: parsed };
        }
    } catch (e) {
        // 忽略JSON解析错误
    }

    if (text.includes('命主') && text.includes('身主')) {
        console.log('[Ziwei DEBUG] ✅ 检测到 TXT 格式文本');
        return { format: 'wenmo_txt_text', data: text };
    }

    console.log('[Ziwei DEBUG] ⚙️ 未检测到已知格式 — 使用旧逻辑');
    return { format: 'unknown', data: text };
}

// ========== 处理命盘文本 ==========
async function processChartText(text, type) {
    console.log("[Ziwei DEBUG] processChartText triggered, type =", type);
    
    if (!text.trim()) return;
    
    const statusSpan = document.getElementById(`${type}Status`);
    const resultContent = document.getElementById(`${type}ResultContent`);
    
    statusSpan.textContent = "验证中...";
    statusSpan.className = "result-status processing";
    
    try {
        // ✅ 紫微命盘：使用智能检测函数识别格式
        if (type === 'ziwei') {
            const detection = await detectWenMoFormat(text);
            
            if (detection.format !== 'unknown') {
                console.log(`[Ziwei DEBUG] 🚀 检测到 ${detection.format} 格式，调用三层Agent系统`);
                
                // 创建一个Blob对象模拟文件上传
                const textContent = typeof detection.data === 'string' ? detection.data : text;
                const blob = new Blob([textContent], { type: 'application/json' });
                const file = new File([blob], `pasted_${detection.format}.txt`, { type: 'application/json' });
                await callZiweiPipeline(file);
                return; // 直接返回，不继续执行旧逻辑
            } else {
                console.log('[Ziwei DEBUG] ⚙️ 未检测到紫微格式，使用旧路由 /verify/api/preview');
            }
        }
        
        // 如果有人生事件描述，使用AI验证
        const useAI = state.lifeEvents.trim().length > 0;
        
        const response = await fetch('/verify/api/preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                raw_text: text,
                wizard: {},
                notes: "",
                manual: {},
                use_ai: useAI,
                chart_type: type,
                life_events: state.lifeEvents,
                user_id: state.userId,
                group_index: state.currentGroupIndex
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            const currentGroup = getCurrentGroup();
            
            // 检测是否为自动AI验证（同时返回八字和紫微结果）
            if (data.auto_verified && data.bazi_verification && data.ziwei_verification) {
                // 自动验证：只标记当前上传的命盘，不预填另一个命盘
                if (type === 'bazi') {
                    currentGroup.baziUploaded = true;
                    currentGroup.baziText = text;
                    state.conversationState = 'waiting_ziwei';
                } else {
                    currentGroup.ziweiUploaded = true;
                    currentGroup.ziweiText = text;
                    state.conversationState = 'waiting_bazi';
                }
                
                // 存储AI验证结果（两个都存）
                currentGroup.baziResult = {
                    ...data,
                    ai_verification: data.bazi_verification
                };
                currentGroup.ziweiResult = {
                    ...data,
                    ai_verification: data.ziwei_verification
                };
                
                // 显示八字结果到 Secondary Box #1
                displayResult(currentGroup.baziResult, 'bazi');
                document.getElementById('baziStatus').textContent = "AI预测验证";
                document.getElementById('baziStatus').className = "result-status success";
                
                // 显示紫微结果到 Secondary Box #2
                displayResult(currentGroup.ziweiResult, 'ziwei');
                document.getElementById('ziweiStatus').textContent = "AI预测验证";
                document.getElementById('ziweiStatus').className = "result-status success";
                
                // 格式化置信度显示
                const formatConfidence = (verification) => {
                    const confidence = verification.birth_time_confidence || verification.score;
                    if (typeof confidence === 'string') return confidence;
                    // 兼容旧格式：数值转文字
                    if (confidence >= 0.8) return '高';
                    if (confidence >= 0.65) return '中高';
                    if (confidence >= 0.4) return '中';
                    if (confidence >= 0.2) return '偏低';
                    return '低';
                };
                
                addAIMessage(`太棒了！基于你的人生经历，我已经推测出你的命盘特征：<br>
                    八字出生时辰可信度：<strong>${formatConfidence(data.bazi_verification)}</strong><br>
                    紫微出生时辰可信度：<strong>${formatConfidence(data.ziwei_verification)}</strong><br><br>
                    💡 这是基于你的人生经历的AI推测。你现在可以上传${type === 'bazi' ? '紫微' : '八字'}命盘进行实际验证。`);

                // ⚠️ Mode B Integration: Check if both charts are ready (auto-verified case)
                checkModeBActivation();
                checkModeBReadiness();
            } else {
                // 单个验证：只更新当前类型的结果
                if (type === 'bazi') {
                    currentGroup.baziUploaded = true;
                    currentGroup.baziResult = data;
                    currentGroup.baziText = text;
                    state.conversationState = 'waiting_ziwei';
                } else {
                    currentGroup.ziweiUploaded = true;
                    currentGroup.ziweiResult = data;
                    currentGroup.ziweiText = text;
                    state.conversationState = 'ready_to_save';
                }
                
                // 显示结果
                displayResult(data, type);
                statusSpan.textContent = "验证完成";
                statusSpan.className = "result-status success";

                // AI 引导
                updateAIGuidance();

                // 自动触发 Primary AI 问卷
                triggerQuestionnaireStart();

                // ⚠️ Mode B Integration: Check if both charts are ready
                checkModeBActivation();
                checkModeBReadiness();
            }
        } else {
            throw new Error(data.toast || "验证失败");
        }
    } catch (error) {
        console.error("验证失败:", error);
        statusSpan.textContent = "验证失败";
        statusSpan.className = "result-status error";
        resultContent.innerHTML = `<p class="empty-state" style="color: #721c24;">验证失败：${error.message}</p>`;
        addAIMessage(`抱歉，${type === 'bazi' ? '八字' : '紫微'}命盘验证失败了。错误信息：${error.message}`);
    }
}

// ========== 显示验证结果 ==========
function displayResult(data, type) {
    const resultContent = document.getElementById(`${type}ResultContent`);

    // 保存现有的图片预览（如果有）
    const existingImagePreview = resultContent.querySelector('.image-preview-container');
    const imagePreviewHTML = existingImagePreview ? existingImagePreview.outerHTML : '';

    let html = '';
    
    // 如果有AI验证结果，优先显示AI结果
    if (data.ai_verification) {
        const aiResult = data.ai_verification;
        const confidence = aiResult.birth_time_confidence || aiResult.score; // 兼容旧字段
        
        // 如果是旧的数值格式，转换为置信度等级
        let confidenceLevel = confidence;
        let confidenceColor = '#6c757d';
        
        if (typeof confidence === 'number') {
            // 旧格式：数值转为文字
            if (confidence >= 0.8) {
                confidenceLevel = '高';
                confidenceColor = '#28a745';
            } else if (confidence >= 0.65) {
                confidenceLevel = '中高';
                confidenceColor = '#5cb85c';
            } else if (confidence >= 0.4) {
                confidenceLevel = '中';
                confidenceColor = '#ffc107';
            } else if (confidence >= 0.2) {
                confidenceLevel = '偏低';
                confidenceColor = '#ff8c00';
            } else {
                confidenceLevel = '低';
                confidenceColor = '#dc3545';
            }
        } else {
            // 新格式：直接使用置信度等级
            if (confidence === '高') confidenceColor = '#28a745';
            else if (confidence === '中高') confidenceColor = '#5cb85c';
            else if (confidence === '中') confidenceColor = '#ffc107';
            else if (confidence === '偏低') confidenceColor = '#ff8c00';
            else confidenceColor = '#dc3545';
        }
        
        // 检查是否有人生事件数据（判断是否完成问卷）
        const hasLifeEvents = state.lifeEvents && state.lifeEvents.trim().length > 0;
        
        html = `
            <div class="ai-verification-result">
                ${!hasLifeEvents ? `
                <div class="detail-section" style="padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 12px;">
                    <p style="margin: 0; font-size: 13px; color: #856404;">
                        ⏳ 等待用户完成问卷以生成完整初步批命结果
                    </p>
                </div>
                ` : ''}
                
                <div class="score-display" style="color: ${confidenceColor}; font-weight: 600; font-size: 16px;">
                    出生时辰可信度：<span style="font-size: 20px;">${confidenceLevel}</span>
                </div>
                
                ${(aiResult.key_supporting_evidence || aiResult.key_matches)?.length > 0 ? `
                <div class="detail-section" style="margin-top: 12px;">
                    <strong style="color: #28a745;">✓ 关键吻合点：</strong>
                    <ul style="margin: 8px 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                        ${(aiResult.key_supporting_evidence || aiResult.key_matches).map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${(aiResult.key_conflicts || aiResult.key_mismatches)?.length > 0 ? `
                <div class="detail-section" style="margin-top: 12px;">
                    <strong style="color: #dc3545;">✗ 关键冲突点：</strong>
                    <ul style="margin: 8px 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                        ${(aiResult.key_conflicts || aiResult.key_mismatches).map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${(aiResult.summary || aiResult.notes) ? `
                <div class="detail-section" style="margin-top: 12px; padding: 10px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #667eea;">
                    <strong style="color: #495057;">AI 总结：</strong>
                    <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.6; color: #212529;">${aiResult.summary || aiResult.notes}</p>
                </div>
                ` : ''}
                
                ${aiResult.fallback ? `
                <p style="font-size: 12px; color: #6c757d; margin-top: 8px;">（使用规则验证）</p>
                ` : ''}
            </div>
        `;
    } else {
        // 降级到传统显示（无AI验证结果时）
        const typeName = type === 'bazi' ? '八字' : '紫微';
        html = `
            <div class="detail-section" style="padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 12px;">
                <p style="margin: 0; font-size: 13px; color: #856404;">
                    ⏳ 等待用户完成七步问卷以生成${typeName}初步验证结果
                </p>
            </div>
        `;
        
        // ⚠️ BAZI vs ZIWEI: Display different fields based on chart type
        if (type === 'bazi') {
            // 八字命盘：显示四柱
            html += `
                ${data.parsed?.year_pillar ? `
                <div class="detail-item">
                    <span class="detail-label">年柱：</span>
                    <span style="font-weight: 600; color: #495057;">${data.parsed.year_pillar}</span>
                </div>
                ` : ''}
                
                ${data.parsed?.month_pillar ? `
                <div class="detail-item">
                    <span class="detail-label">月柱：</span>
                    <span style="font-weight: 600; color: #495057;">${data.parsed.month_pillar}</span>
                </div>
                ` : ''}
                
                ${data.parsed?.day_pillar ? `
                <div class="detail-item">
                    <span class="detail-label">日柱：</span>
                    <span style="font-weight: 600; color: #495057;">${data.parsed.day_pillar}</span>
                </div>
                ` : ''}
                
                ${data.parsed?.hour_pillar ? `
                <div class="detail-item">
                    <span class="detail-label">时柱：</span>
                    <span style="font-weight: 600; color: #495057;">${data.parsed.hour_pillar}</span>
                </div>
                ` : ''}
                
                ${data.parsed?.birth_date ? `
                <div class="detail-item">
                    <span class="detail-label">出生日期：</span>
                    <span>${data.parsed.birth_date}</span>
                </div>
                ` : ''}
            `;
        } else {
            // 紫微命盘：显示传统字段
            html += `
                ${data.parsed?.name ? `
                <div class="detail-item">
                    <span class="detail-label">姓名：</span>
                    <span>${data.parsed.name}</span>
                </div>
                ` : ''}
                
                ${data.parsed?.gender ? `
                <div class="detail-item">
                    <span class="detail-label">性别：</span>
                    <span>${data.parsed.gender}</span>
                </div>
                ` : ''}
                
                <div class="detail-item">
                    <span class="detail-label">出生时间：</span>
                    <span>${data.parsed?.birth_time || '未识别'}</span>
                </div>
                
                ${data.parsed?.main_star ? `
                <div class="detail-item">
                    <span class="detail-label">主星：</span>
                    <span>${data.parsed.main_star}</span>
                </div>
                ` : ''}
            `;
        }
    }
    
    // 合并 Agent 识别数据（如果存在）
    const currentGroup = getCurrentGroup();
    let jsonToDisplay = data.parsed;
    
    // ✅ 紫微命盘：优先使用完整的三层 Agent 数据
    if (type === 'ziwei' && currentGroup.ziweiFull) {
        jsonToDisplay = currentGroup.ziweiFull;
        console.log('[displayResult] ✅ 使用完整三层 Agent 数据（ziweiFull）');
        console.log('[displayResult] 完整数据包含字段:', Object.keys(jsonToDisplay));
    } else if (type === 'bazi' && currentGroup.agentFullData) {
        // 八字命盘：合并 Agent 的完整数据（包括 environment, wuxing, ai_verifier）
        jsonToDisplay = {
            ...data.parsed,
            agent_recognition: {
                bazi: currentGroup.agentFullData.bazi,
                full_table: currentGroup.agentFullData.full_table,
                wuxing: currentGroup.agentFullData.wuxing
            },
            environment: currentGroup.agentFullData.environment,
            ai_verifier: currentGroup.agentFullData.ai_verifier,
            gender: currentGroup.agentFullData.gender,
            birth_time: currentGroup.agentFullData.birth_time
        };
        console.log(`[displayResult] 合并 Agent 数据到 JSON 输出（包含 environment）`);
    }
    
    html += `
        <details style="margin-top: 16px;">
            <summary style="cursor: pointer; font-weight: 600;">查看完整 JSON</summary>
            <pre style="margin-top: 8px; max-height: 400px; overflow-y: auto;">${JSON.stringify(jsonToDisplay, null, 2)}</pre>
        </details>
    `;

    // 先设置HTML内容，然后在前面插入图片预览
    resultContent.innerHTML = html;

    // 如果之前有图片预览，重新插入到顶部
    if (imagePreviewHTML) {
        resultContent.insertAdjacentHTML('afterbegin', imagePreviewHTML);
    } else {
        // 检查是否有新的图片需要显示
        const currentGroup = getCurrentGroup();
        const imageUrl = type === 'bazi' ? currentGroup.baziImageUrl : currentGroup.ziweiImageUrl;
        if (imageUrl) {
            displayImagePreview(type, imageUrl);
        }
    }
}

// ========== AI 引导对话 ==========
function updateAIGuidance() {
    if (state.conversationState === 'waiting_ziwei') {
        addAIMessage("很好！八字命盘已经验证完成。接下来，请上传你的<strong>紫微斗数命盘</strong>。");
    } else if (state.conversationState === 'ready_to_save') {
        // 不再自动提示保存，改为由问卷完成后触发
        console.log('两份命盘已验证完成，等待问卷触发');
    }
}

// ========== 自动触发问卷 ==========
async function triggerQuestionnaireStart() {
    try {
        const response = await fetch('/verify/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: state.userId,
                message: "__SYSTEM_TRIGGER_START_QUESTIONNAIRE__",
                history: state.conversationHistory,
                chart_uploaded: true,
                group_index: state.currentGroupIndex,
                life_events: state.lifeEvents,
                parsed_chart: {}
            })
        });
        
        const data = await response.json();
        
        if (data.ok && data.message) {
            // 显示 Primary AI 的问卷第一句话
            addAIMessage(`<p>${data.message}</p>`);
            
            // 更新对话历史
            state.conversationHistory.push({
                role: 'system',
                content: 'Questionnaire started'
            });
            state.conversationHistory.push({
                role: 'assistant',
                content: data.message
            });
        }
    } catch (error) {
        console.error('触发问卷失败:', error);
    }
}

// ========== 聊天框逻辑 ==========
function initChatbox() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// ========== Lynker 统一命理生成 ==========
function initUnifiedGeneration() {
    const generateBtn = document.getElementById('generateUnifiedBtn');
    if (!generateBtn) return;
    
    generateBtn.addEventListener('click', async () => {
        const birthDate = document.getElementById('unifiedBirthDate')?.value;
        const birthTime = document.getElementById('unifiedBirthTime')?.value;
        const gender = document.getElementById('unifiedGender')?.value || '男';
        const timezone = document.getElementById('unifiedTimezone')?.value || '+08:00';
        const citySelect = document.getElementById('citySelect');
        const selectedCity = citySelect?.options[citySelect.selectedIndex]?.text || '';
        const countrySelect = document.getElementById('countrySelect');
        const selectedCountry = countrySelect?.value || 'CN';
        
        const statusDiv = document.getElementById('unifiedGenStatus');
        
        if (!birthDate || !birthTime) {
            statusDiv.textContent = '❌ 请填写完整的出生日期和时间';
            statusDiv.style.color = '#ff4444';
            return;
        }
        
        statusDiv.textContent = '🧮 正在生成八字+紫微命盘...';
        statusDiv.style.color = '#00b4d8';
        
        try {
            const payload = {
                user_id: state.userId,
                birth_date: birthDate,
                birth_time: birthTime,
                gender: gender,
                timezone: timezone,
                location: {
                    city: selectedCity,
                    country: selectedCountry
                },
                source: 'user_input_unified'
            };
            
            console.log('[Unified Generation] 发送请求:', payload);
            
            const response = await fetch('/verify/api/lynker/birthdata/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            
            if (result.success) {
                statusDiv.textContent = '✅ 命盘生成成功！';
                statusDiv.style.color = '#00ff9d';
                
                console.log('[Unified Generation] 生成成功:', result);
                
                // 显示生成结果
                handleUnifiedGenerationResult(result);
            } else {
                statusDiv.textContent = `❌ 生成失败: ${result.error || '未知错误'}`;
                statusDiv.style.color = '#ff4444';
            }
        } catch (error) {
            console.error('[Unified Generation] 错误:', error);
            statusDiv.textContent = `❌ 生成失败: ${error.message}`;
            statusDiv.style.color = '#ff4444';
        }
    });
}

// 处理统一生成的结果
function handleUnifiedGenerationResult(result) {
    const currentGroup = getCurrentGroup();
    
    // 存储八字结果
    if (result.bazi) {
        currentGroup.bazi = result.bazi;
        currentGroup.baziUploaded = true;
        
        // 更新八字文本框
        const baziText = document.getElementById('baziText');
        if (baziText) {
            baziText.value = formatBaziFromAgent(result.bazi);
        }
        
        // 显示八字结果
        document.getElementById('baziStatus').textContent = "已生成";
        document.getElementById('baziStatus').className = "result-status success";
        document.getElementById('selectBaziBtn').style.display = 'inline-block';
    }
    
    // 存储紫微结果
    if (result.ziwei) {
        const safeData = safeNormalizeResult({ standardized: result.ziwei });
        currentGroup.ziwei = safeData;
        currentGroup.ziweiUploaded = true;
        
        // 更新紫微文本框
        const ziweiText = document.getElementById('ziweiText');
        if (ziweiText) {
            ziweiText.value = JSON.stringify(result.ziwei, null, 2).substring(0, 500) + '...';
        }
        
        // 显示紫微结果
        document.getElementById('ziweiStatus').textContent = "已生成";
        document.getElementById('ziweiStatus').className = "result-status success";
        document.getElementById('selectZiweiBtn').style.display = 'inline-block';
        
        // 渲染紫微摘要卡片
        const resultContent = document.getElementById('ziweiResultContent');
        if (resultContent && typeof renderZiweiSummary === 'function') {
            resultContent.innerHTML = '<div id="unifiedZiweiCard"></div>';
            setTimeout(() => {
                renderZiweiSummary(safeData, 'unifiedZiweiCard');
            }, 100);
        }
    }
    
    // 显示元数据信息
    addAIMessage(`
        <div style="padding: 12px; background: #1c1c1c; border-left: 3px solid #00ff9d; border-radius: 6px; margin: 8px 0;">
            <strong style="color: #00ff9d;">📊 Lynker Unified Birth Engine v1.0</strong><br>
            <span style="color: #aaa; font-size: 12px;">生成时间: ${result.meta?.created_at || new Date().toISOString()}</span><br>
            <span style="color: #aaa; font-size: 12px;">数据库ID: ${result.meta?.record_id || 'N/A'}</span><br>
            <span style="color: #aaa; font-size: 12px;">外部API: ${result.meta?.external_providers?.join(', ') || '本地生成'}</span>
        </div>
    `);
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // 显示用户消息
    addUserMessage(message);
    chatInput.value = '';
    
    // 记录用户人生事件描述（累积）
    state.lifeEvents += message + "\n";
    
    // 调用Primary AI聊天API
    try {
        addAIMessage('<p class="thinking">正在思考...</p>');
        
        // 检查是否已上传命盘
        const currentGroup = getCurrentGroup();
        const chartUploaded = currentGroup.baziUploaded || currentGroup.ziweiUploaded;
        const parsedChart = currentGroup.baziResult?.parsed || currentGroup.ziweiResult?.parsed || {};
        
        const response = await fetch('/verify/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: state.userId,
                message: message,
                history: state.conversationHistory,
                chart_uploaded: chartUploaded,
                group_index: state.currentGroupIndex,
                life_events: state.lifeEvents,
                parsed_chart: parsedChart
            })
        });
        
        const data = await response.json();
        
        // 移除"正在思考"消息
        const messagesContainer = document.getElementById('chatMessages');
        const thinkingMsg = messagesContainer.querySelector('.thinking');
        if (thinkingMsg) {
            thinkingMsg.closest('.message').remove();
        }
        
        if (data.ok) {
            // 显示AI回复
            addAIMessage(`<p>${data.message}</p>`);
            
            // 更新对话历史
            state.conversationHistory.push({role: 'user', content: message});
            state.conversationHistory.push({role: 'assistant', content: data.message});
            
            // 保持历史在合理长度（最近20条）
            if (state.conversationHistory.length > 20) {
                state.conversationHistory = state.conversationHistory.slice(-20);
            }
            
            // 检测是否触发了验证
            if (data.verification_triggered && data.bazi_verification && data.ziwei_verification) {
                const currentGroup = getCurrentGroup();
                
                // 保留每个命盘自己的parsed数据，只添加AI验证结果
                // 如果之前没有result，则创建新的
                if (!currentGroup.baziResult) {
                    currentGroup.baziResult = { parsed: {} };
                }
                if (!currentGroup.ziweiResult) {
                    currentGroup.ziweiResult = { parsed: {} };
                }
                
                // 添加AI验证结果，保留原有parsed数据
                currentGroup.baziResult = {
                    ...currentGroup.baziResult,
                    ai_verification: data.bazi_verification
                };
                currentGroup.ziweiResult = {
                    ...currentGroup.ziweiResult,
                    ai_verification: data.ziwei_verification
                };
                
                // 显示八字结果
                displayResult(currentGroup.baziResult, 'bazi');
                document.getElementById('baziStatus').textContent = "AI验证完成";
                document.getElementById('baziStatus').className = "result-status success";
                
                // 显示紫微结果
                displayResult(currentGroup.ziweiResult, 'ziwei');
                document.getElementById('ziweiStatus').textContent = "AI验证完成";
                document.getElementById('ziweiStatus').className = "result-status success";
                
                // 格式化置信度显示
                const formatConfidence = (verification) => {
                    const confidence = verification.birth_time_confidence || verification.score;
                    if (typeof confidence === 'string') return confidence;
                    // 兼容旧格式：数值转文字
                    if (confidence >= 0.8) return '高';
                    if (confidence >= 0.65) return '中高';
                    if (confidence >= 0.4) return '中';
                    if (confidence >= 0.2) return '偏低';
                    return '低';
                };
                
                const baziConfidence = formatConfidence(data.bazi_verification);
                const ziweiConfidence = formatConfidence(data.ziwei_verification);
                
                // 根据置信度设置颜色
                const getConfidenceColor = (conf) => {
                    if (conf === '高') return '#a8e6cf';
                    if (conf === '中高') return '#dcedc1';
                    if (conf === '中') return '#ffd3b6';
                    if (conf === '偏低') return '#ffaaa5';
                    return '#ff8b94';
                };
                
                // 显示验证结果摘要
                addAIMessage(`
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px; color: white; margin-top: 10px;">
                        <h4 style="margin: 0 0 10px 0; font-size: 16px;">✨ 验证完成</h4>
                        <p style="margin: 5px 0;"><strong>八字出生时辰可信度：</strong><span style="background: ${getConfidenceColor(baziConfidence)}; color: #333; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${baziConfidence}</span></p>
                        <p style="margin: 5px 0;"><strong>紫微出生时辰可信度：</strong><span style="background: ${getConfidenceColor(ziweiConfidence)}; color: #333; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${ziweiConfidence}</span></p>
                    </div>
                `);
                
                console.log('✅ 验证结果已更新到UI');
            }
        } else {
            addAIMessage(`<p style="color: #721c24;">抱歉，我现在有些不舒服。${data.message || ''}</p>`);
        }
    } catch (error) {
        console.error("聊天失败:", error);
        addAIMessage('<p style="color: #721c24;">抱歉，连接出现了问题，请稍后再试。</p>');
    }
}

function addUserMessage(text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    messageEl.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    messagesContainer.appendChild(messageEl);

    // Scroll to bottom with smooth behavior
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function addAIMessage(html) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message ai-message';
    messageEl.innerHTML = `
        <div class="message-content">
            ${html}
        </div>
    `;
    messagesContainer.appendChild(messageEl);

    // Scroll to bottom with smooth behavior
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// ========== 保存到数据库 ==========
async function saveToDatabase() {
    if (!state.baziResult || !state.ziweiResult) {
        addAIMessage("抱歉，需要两份命盘都验证完成后才能保存。");
        return;
    }
    
    addAIMessage("正在保存你的真命盘验证记录...");
    
    try {
        // 合并两份命盘的数据
        const combinedText = `【八字命盘】\n${document.getElementById('baziText').value}\n\n【紫微斗数命盘】\n${document.getElementById('ziweiText').value}`;
        
        // 格式化置信度显示
        const formatConfidence = (result) => {
            const aiResult = result?.ai_verification;
            if (!aiResult) return '未验证';
            const confidence = aiResult.birth_time_confidence || aiResult.score;
            if (typeof confidence === 'string') return confidence;
            // 兼容旧格式：数值转文字
            if (confidence >= 0.8) return '高';
            if (confidence >= 0.65) return '中高';
            if (confidence >= 0.4) return '中';
            if (confidence >= 0.2) return '偏低';
            return '低';
        };
        
        const baziConfidence = formatConfidence(state.baziResult);
        const ziweiConfidence = formatConfidence(state.ziweiResult);
        
        const response = await fetch('/verify/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: state.userId,
                raw_text: combinedText,
                wizard: {},
                notes: `八字出生时辰可信度: ${baziConfidence}, 紫微出生时辰可信度: ${ziweiConfidence}`,
                manual: {
                    name: state.baziResult.parsed?.name || state.ziweiResult.parsed?.name,
                    gender: state.baziResult.parsed?.gender || state.ziweiResult.parsed?.gender
                }
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            state.conversationState = 'saved';
            addAIMessage(`
                <p>✅ <strong>保存成功！</strong></p>
                <p>记录ID：${data.record_id}</p>
                <p>八字可信度：${baziConfidence} | 紫微可信度：${ziweiConfidence}</p>
                <p>你可以随时回到这个页面查看你的真命盘记录。</p>
            `);
        } else {
            throw new Error(data.toast || "保存失败");
        }
    } catch (error) {
        console.error("保存失败:", error);
        addAIMessage(`抱歉，保存时出错了：${error.message}。请稍后重试。`);
    }
}

// ==================== Mode B Integration ====================
// Show Mode B section when both charts are uploaded
// This replaces the one-by-one verification flow with parallel AI analysis

// Mode B state (separate from main wizard state)
const modeBState = {
    sopTemplate: null,
    analysisStarted: false,
    analysisCompleted: false
};

// Check if Mode B should be activated
function checkModeBActivation() {
    const currentGroup = getCurrentGroup();
    const bothChartsUploaded = currentGroup.baziUploaded && currentGroup.ziweiUploaded;

    console.log('[Mode B] Checking activation:', {
        baziUploaded: currentGroup.baziUploaded,
        ziweiUploaded: currentGroup.ziweiUploaded,
        bothReady: bothChartsUploaded
    });

    const modeBSection = document.getElementById('modeBSection');

    if (bothChartsUploaded && modeBSection) {
        // Show Mode B section with fade-in effect
        modeBSection.style.display = 'block';
        modeBSection.style.opacity = '0';
        setTimeout(() => {
            modeBSection.style.transition = 'opacity 0.5s ease-in';
            modeBSection.style.opacity = '1';
        }, 10);

        console.log('[Mode B] ✅ Activated - Both charts uploaded!');

        // Add AI message to guide user
        addAIMessage(`
            <p>🎉 <strong>两份命盘已上传完成！</strong></p>
            <p>现在可以使用 Mode B 进行全盘验证分析。</p>
            <p>请在下方选择 SOP 分析模板，然后点击"开始分析"按钮。</p>
        `);
    } else if (modeBSection) {
        // Hide Mode B section
        modeBSection.style.display = 'none';
    }
}

// Initialize Mode B SOP selector
function initModeBSOPSelector() {
    const sopSelect = document.getElementById('sopTemplate');
    if (sopSelect) {
        sopSelect.addEventListener('change', (e) => {
            modeBState.sopTemplate = e.target.value;
            console.log('[Mode B] SOP selected:', modeBState.sopTemplate);
            checkModeBReadiness();
        });
    }
}

// Check if Mode B analysis can start
function checkModeBReadiness() {
    const btn = document.getElementById('startAnalysisBtn');
    if (!btn) return;

    const currentGroup = getCurrentGroup();
    const hasBothCharts = currentGroup.baziUploaded && currentGroup.ziweiUploaded;
    const hasSOP = !!modeBState.sopTemplate;
    const notStarted = !modeBState.analysisStarted;

    const isReady = hasBothCharts && hasSOP && notStarted;

    btn.disabled = !isReady;

    if (!hasBothCharts) {
        btn.textContent = '请先上传两份命盘';
    } else if (!hasSOP) {
        btn.textContent = '请选择 SOP 分析模板';
    } else if (modeBState.analysisStarted) {
        btn.innerHTML = '<span class="loading-spinner"></span> 分析中...';
    } else {
        btn.textContent = '开始分析';
    }
}

// Upload custom SOP template
function uploadCustomSOP() {
    const input = document.getElementById('sopFileInput');
    if (input) {
        input.click();
    }
}

// Handle SOP file upload
document.addEventListener('DOMContentLoaded', () => {
    const sopInput = document.getElementById('sopFileInput');
    if (sopInput) {
        sopInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/verify/api/upload_sop', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.ok) {
                    // Reload templates and select the new one
                    const sopSelect = document.getElementById('sopTemplate');
                    const option = document.createElement('option');
                    option.value = result.template_id;
                    option.textContent = result.template_id;
                    option.selected = true;
                    sopSelect.appendChild(option);

                    modeBState.sopTemplate = result.template_id;
                    checkModeBReadiness();
                    addAIMessage(`✅ SOP 模板上传成功！`);
                } else {
                    throw new Error(result.toast || '上传失败');
                }
            } catch (error) {
                console.error('[Mode B] SOP upload failed:', error);
                addAIMessage(`❌ SOP 模板上传失败：${error.message}`);
            }
        });
    }

    // Initialize Mode B
    initModeBSOPSelector();
});

// Start full chart analysis (Mode B)
async function startFullChartAnalysis() {
    // ⚠️ Click prevention check
    if (modeBState.analysisStarted) {
        console.warn('[Mode B] Analysis already started');
        return;
    }

    const currentGroup = getCurrentGroup();

    if (!currentGroup.baziResult || !currentGroup.ziweiResult) {
        addAIMessage('请先验证两份命盘后再进行全盘分析');
        return;
    }

    if (!modeBState.sopTemplate) {
        addAIMessage('请选择 SOP 分析模板');
        return;
    }

    // Mark as started immediately
    modeBState.analysisStarted = true;
    console.log('[Mode B] Starting full chart analysis...');

    // Update button
    const btn = document.getElementById('startAnalysisBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading-spinner"></span> 分析中...';

    // Show results section
    const resultsDiv = document.getElementById('analysisResults');
    if (resultsDiv) {
        resultsDiv.classList.add('visible');
    }

    try {
        // 🔧 格式转换：支持 JSON 和文本两种格式
        // 优先使用 baziText/ziweiText，如果为空则从 Result 对象提取
        let baziFormatted = currentGroup.baziText || formatBaziForAPI(currentGroup.baziResult);
        let ziweiFormatted = currentGroup.ziweiText || formatZiweiForAPI(currentGroup.ziweiResult);
        
        const payload = {
            user_id: state.userId,
            bazi_text: baziFormatted,
            ziwei_text: ziweiFormatted,
            sop_template: modeBState.sopTemplate || "standard_v1"
        };
        
        console.log('[Mode B] Sending payload:', payload);
        
        const response = await fetch('/verify/api/run_full_chart_ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.ok) {
            // ========== 🔥 新增：智能分支判断 ==========
            // 如果后端返回 "need_prophecy_feedback" 模式，触发预言验证
            if (result.mode === 'need_prophecy_feedback') {
                console.log('[Mode B] 八字数据不完整，触发预言验证模式');
                
                // 显示预言验证面板
                const prophecySection = document.querySelector('.prophecy-section');
                if (prophecySection) {
                    prophecySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    prophecySection.style.border = '2px solid #667eea';
                    prophecySection.style.padding = '20px';
                    prophecySection.style.borderRadius = '12px';
                    prophecySection.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)';
                }
                
                // 显示需要验证的模块
                showProphecyPanel(result.bazi.required_modules || []);
                
                // 自动触发预言问题生成
                addAIMessage(`
                    <p>⚠️ <strong>检测到八字数据不完整</strong></p>
                    <p>${result.bazi.message}</p>
                    <p>系统将根据紫微命盘自动生成预言问题，请您通过 ✅准/❌不准 的方式反馈，帮助我们综合验证命盘准确性。</p>
                `);
                
                // 自动生成预言问题
                setTimeout(() => {
                    runProphecyAI();
                }, 1000);
                
                // 更新按钮状态
                btn.disabled = true;
                btn.textContent = '已转入预言验证模式';
                btn.style.background = '#667eea';
                
                return;
            }
            
            // ========== 原有逻辑：完整分析模式 ==========
            if (result.mode === 'full_completed' || result.data) {
                console.log('[Mode B] Analysis completed successfully');
                modeBState.analysisCompleted = true;

                // Render results
                renderModeBResults(result.data);

                // Update AI message
                addAIMessage(`
                    <p>✅ <strong>全盘验证分析完成！</strong></p>
                    <p>一致性评分：${result.data.consistency_score}/100</p>
                    <p>请查看下方的详细分析结果。</p>
                `);

                // Update button
                btn.textContent = '分析完成';
                btn.style.background = '#00ff9d';
            }

        } else {
            throw new Error(result.toast || '分析失败');
        }

    } catch (error) {
        console.error('[Mode B] Analysis failed:', error);
        addAIMessage(`❌ 全盘分析失败：${error.message}`);

        // Allow retry
        modeBState.analysisStarted = false;
        btn.disabled = false;
        btn.textContent = '重新分析';
        btn.style.background = 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)';
    }
}

// Render Mode B analysis results
function renderModeBResults(data) {
    const { bazi_analysis, ziwei_analysis, primary_ai_summary, consistency_score } = data;

    // Render Bazi results
    renderAIColumn('baziAnalysisResults', bazi_analysis, '八字');

    // Render Ziwei results
    renderAIColumn('ziweiAnalysisResults', ziwei_analysis, '紫微');

    // Render comparison table
    renderComparisonTable(bazi_analysis, ziwei_analysis);

    // Render AI summary
    renderAISummary(primary_ai_summary, consistency_score);
}

// Render AI column (Bazi or Ziwei)
function renderAIColumn(elementId, analysis, typeName) {
    const column = document.getElementById(elementId);
    if (!column) return;

    let html = `<h3>${typeName} AI 分析</h3>`;

    if (analysis.modules && analysis.modules.length > 0) {
        analysis.modules.forEach(module => {
            const confidenceClass = module.confidence === '高' ? 'confidence-high' :
                                   module.confidence === '中' ? 'confidence-medium' :
                                   'confidence-low';

            html += `
                <div class="module-result">
                    <h4>${module.module_name}</h4>
                    <div class="summary">${module.summary || '无分析内容'}</div>
                    <span class="confidence-badge ${confidenceClass}">${module.confidence}</span>
                    ${module.supporting_evidence && module.supporting_evidence.length > 0 ? `
                        <ul class="evidence-list">
                            ${module.supporting_evidence.map(e => `<li>✓ ${e}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${module.conflicts && module.conflicts.length > 0 ? `
                        <ul class="evidence-list">
                            ${module.conflicts.map(c => `<li>✗ ${c}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        });
    } else {
        html += '<p style="color: #888; text-align: center; padding: 40px;">暂无分析结果</p>';
    }

    column.innerHTML = html;
}

// Render comparison table
function renderComparisonTable(baziAnalysis, ziweiAnalysis) {
    const tbody = document.getElementById('comparisonBody');
    if (!tbody) return;

    let html = '';

    const baziModules = baziAnalysis.modules || [];
    const ziweiModules = ziweiAnalysis.modules || [];

    // Match modules by module_id
    const moduleMap = {};
    baziModules.forEach(m => {
        moduleMap[m.module_id] = { bazi: m };
    });
    ziweiModules.forEach(m => {
        if (moduleMap[m.module_id]) {
            moduleMap[m.module_id].ziwei = m;
        } else {
            moduleMap[m.module_id] = { ziwei: m };
        }
    });

    Object.values(moduleMap).forEach(pair => {
        const moduleName = pair.bazi?.module_name || pair.ziwei?.module_name;
        const baziSummary = pair.bazi?.summary || '无';
        const ziweiSummary = pair.ziwei?.summary || '无';

        // Simple consistency check (could be enhanced)
        const consistency = (pair.bazi && pair.ziwei) ? '75%' : '50%';

        html += `
            <tr>
                <td><strong>${moduleName}</strong></td>
                <td>${baziSummary.substring(0, 100)}${baziSummary.length > 100 ? '...' : ''}</td>
                <td>${ziweiSummary.substring(0, 100)}${ziweiSummary.length > 100 ? '...' : ''}</td>
                <td>${consistency}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Render AI summary
function renderAISummary(summary, consistencyScore) {
    const summarySection = document.getElementById('aiSummarySection');
    const summaryContent = document.getElementById('summaryContent');

    if (!summarySection || !summaryContent) return;

    let html = `
        <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 12px;">一致性评分</h4>
            <div style="font-size: 32px; font-weight: bold; color: #fff;">
                ${consistencyScore}/100
            </div>
        </div>
    `;

    if (summary.consistent_points && summary.consistent_points.length > 0) {
        html += `
            <div style="margin-bottom: 16px;">
                <h4 style="margin-bottom: 8px;">✓ 核心一致点</h4>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                    ${summary.consistent_points.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (summary.divergent_points && summary.divergent_points.length > 0) {
        html += `
            <div style="margin-bottom: 16px;">
                <h4 style="margin-bottom: 8px;">⚠️ 主要分歧点</h4>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                    ${summary.divergent_points.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (summary.summary_text) {
        html += `
            <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <h4 style="margin-bottom: 8px;">综合评述</h4>
                <p style="margin: 0; line-height: 1.8;">${summary.summary_text}</p>
            </div>
        `;
    }

    summaryContent.innerHTML = html;
    summarySection.style.display = 'block';
}

// Mode B integration is triggered directly from processChartText()
// No need for hooks - activation happens automatically after charts are verified

// ========== 文墨天机 OCR 自动识别 ==========
// ⛔ 已废弃：旧版文墨 OCR 监听器已移除
// 现在使用：
//   - 八字：Bazi Vision Agent (callAgentWorkflow)
//   - 紫微：严格解析器 v0.9 (callZiweiPipeline → /verify/api/ziwei/upload_json)

// ========== Prophecy Validation Center ==========
// 预言验证中心 - 自动命盘预言生成与反馈

// 显示预言验证面板（八字不完整时触发）
function showProphecyPanel(modules) {
    const prophecyZone = document.getElementById("prophecy_zone");
    if (!prophecyZone) {
        console.error("❌ 未找到预言展示区");
        return;
    }
    
    // 清空现有内容
    prophecyZone.innerHTML = "";
    
    // 添加提示标题
    const header = document.createElement("div");
    header.style.cssText = "margin-bottom: 20px; padding: 15px; background: rgba(102,126,234,0.2); border-radius: 8px;";
    header.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #667eea;">📋 待验证的命理模块</h4>
        <p style="margin: 0; opacity: 0.9; font-size: 14px;">
            八字命盘只有四柱信息，缺少可验证的细节。系统将根据紫微命盘生成预言问题，请您如实反馈 ✅准/❌不准。
        </p>
    `;
    prophecyZone.appendChild(header);
    
    // 显示模块列表
    if (modules && modules.length > 0) {
        const moduleList = document.createElement("div");
        moduleList.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px;";
        
        modules.forEach((moduleName, idx) => {
            const moduleCard = document.createElement("div");
            moduleCard.className = "prophecy-module-card";
            moduleCard.style.cssText = `
                padding: 12px;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                border: 1px solid rgba(102,126,234,0.3);
                text-align: center;
                font-size: 14px;
            `;
            moduleCard.innerHTML = `<strong>${idx + 1}. ${moduleName}</strong>`;
            moduleList.appendChild(moduleCard);
        });
        
        prophecyZone.appendChild(moduleList);
    }
    
    // 添加状态提示
    const status = document.createElement("p");
    status.className = "loading";
    status.style.cssText = "text-align: center; color: #667eea; margin-top: 15px;";
    status.textContent = "⏳ 正在根据紫微命盘生成预言问题，请稍候...";
    prophecyZone.appendChild(status);
    
    console.log(`[Prophecy Panel] 显示 ${modules.length} 个待验证模块`);
}

async function runProphecyAI() {
    const currentGroup = getCurrentGroup();
    const ziweiText = currentGroup.ziweiText || "";
    const baziText = currentGroup.baziText || "";
    
    if (!ziweiText) {
        alert("⚠️ 请先粘贴或识别紫微命盘文本");
        return;
    }
    
    const prophecyZone = document.getElementById("prophecy_zone");
    if (!prophecyZone) {
        console.error("❌ 未找到预言展示区");
        return;
    }
    
    prophecyZone.innerHTML = "<p class='loading'>🔮 正在生成预言问题...</p>";
    
    try {
        const response = await fetch("/verify/api/run_prophecy_ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                user_id: state.userId, 
                ziwei_text: ziweiText,
                bazi_text: baziText
            })
        });
        
        const data = await response.json();
        
        if (!data.ok) {
            throw new Error(data.error || "生成失败");
        }
        
        console.log(`[Prophecy] 生成 ${data.count} 个预言问题`);
        
        // 渲染预言问题卡片
        prophecyZone.innerHTML = "";
        data.prophecies.forEach((p, idx) => {
            const card = document.createElement("div");
            card.className = "prophecy-card";
            card.dataset.id = idx;
            card.dataset.palace = p.palace;
            card.dataset.pattern = p.pattern;
            card.innerHTML = `
                <div class="prophecy-header">
                    <span class="prophecy-palace">${p.palace}</span>
                    <span class="prophecy-pattern">${p.pattern}</span>
                </div>
                <p class="prophecy-question">${p.question}</p>
                <div class="prophecy-buttons">
                    <button class="btn-prophecy-yes" onclick="recordProphecyFeedback(${idx}, true)">✅ 准</button>
                    <button class="btn-prophecy-no" onclick="recordProphecyFeedback(${idx}, false)">❌ 不准</button>
                </div>
            `;
            prophecyZone.appendChild(card);
        });
        
        // 显示统计信息
        loadProphecyStats();
        
    } catch (err) {
        console.error("[Prophecy] 生成失败:", err);
        prophecyZone.innerHTML = `<p class='error'>❌ 生成失败：${err.message}</p>`;
    }
}

async function recordProphecyFeedback(qid, result) {
    const card = document.querySelector(`[data-id='${qid}']`);
    if (!card) return;
    
    const palace = card.dataset.palace;
    const pattern = card.dataset.pattern;
    const questionText = card.querySelector(".prophecy-question").innerText;
    
    const payload = {
        user_id: state.userId,
        question: questionText,
        palace: palace,
        pattern: pattern,
        result: result ? "准" : "不准"
    };
    
    try {
        const response = await fetch("/verify/api/record_prophecy_feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.ok) {
            // 更新卡片样式
            card.classList.add(result ? "prophecy-yes" : "prophecy-no");
            card.classList.add("prophecy-answered");
            
            // 禁用按钮
            card.querySelectorAll("button").forEach(btn => btn.disabled = true);
            
            console.log(`[Prophecy] 反馈已记录: ${palace} - ${result ? "准" : "不准"}`);
            
            // 刷新统计信息
            loadProphecyStats();
        }
    } catch (err) {
        console.error("[Prophecy] 记录失败:", err);
        alert("反馈记录失败");
    }
}

async function loadProphecyStats() {
    try {
        const response = await fetch("/verify/api/prophecy_stats");
        const data = await response.json();
        
        if (data.ok) {
            const statsDiv = document.getElementById("prophecy_stats");
            if (statsDiv) {
                statsDiv.innerHTML = `
                    <div class="stats-summary">
                        <div class="stat-item">
                            <span class="stat-label">总预言数</span>
                            <span class="stat-value">${data.total}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">准确数</span>
                            <span class="stat-value">${data.correct}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">准确率</span>
                            <span class="stat-value highlight">${data.accuracy}%</span>
                        </div>
                    </div>
                `;
            }
            console.log(`[Prophecy] 统计: ${data.total} 条记录, ${data.accuracy}% 准确率`);
        }
    } catch (err) {
        console.error("[Prophecy] 加载统计失败:", err);
    }
}

// 全局暴露函数
window.runProphecyAI = runProphecyAI;
window.recordProphecyFeedback = recordProphecyFeedback;
window.loadProphecyStats = loadProphecyStats;

// ========== 环境数据收集函数 ==========
function collectEnvironmentData() {
    const countryCode = document.getElementById('countrySelect')?.value;
    const city = document.getElementById('citySelect')?.value;
    const latitude = document.getElementById('latitude')?.value;
    const climateZone = document.getElementById('climate_zone')?.value;
    const humidityType = document.getElementById('humidity_type')?.value;
    const terrainType = document.getElementById('terrain_type')?.value;
    
    // 如果没有选择国家和城市，返回 null
    if (!countryCode || !city) {
        return null;
    }
    
    return {
        country_code: countryCode,
        city: city,
        latitude: parseFloat(latitude) || null,
        climate_zone: climateZone || null,
        humidity_type: humidityType || null,
        terrain_type: terrainType || null
    };
}

// ========== Python Agent Workflow Integration (AJAX) ==========

async function callAgentWorkflow(imageFile) {
    try {
        addAIMessage('🚀 启动三层智能识别工作流...');
        
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64Data = reader.result;
                
                // 收集环境数据
                const environmentData = collectEnvironmentData();
                if (environmentData) {
                    console.log('[Bazi Agent] 环境数据:', environmentData);
                    addAIMessage(`🌍 出生地: ${environmentData.city}, ${environmentData.climate_zone || ''}`);
                }
                
                const requestBody = {
                    imageData: base64Data
                };
                
                // 如果有环境数据，添加到请求中
                if (environmentData) {
                    requestBody.environment = environmentData;
                }
                
                const response = await fetch('/verify/api/run_agent_workflow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                const result = await response.json();
                
                if (result.messages && Array.isArray(result.messages)) {
                    result.messages.forEach(msg => {
                        addAIMessage(msg);
                    });
                }
                
                if (result.success && result.bazi) {
                    handleAgentResult(result);
                } else {
                    addAIMessage(`❌ 识别失败: ${result.error || '未知错误'}`);
                }
                
            } catch (error) {
                console.error('Agent Workflow API error:', error);
                addAIMessage(`❌ API调用失败: ${error.message}`);
            }
        };
        
        reader.readAsDataURL(imageFile);
        
    } catch (error) {
        console.error('Failed to call Agent Workflow:', error);
        addAIMessage(`❌ 调用Agent失败: ${error.message}`);
    }
}

function handleAgentResult(result) {
    try {
        addAIMessage(`✅ <strong>三层识别完成！</strong>`);
        
        if (result.bazi) {
            const bazi = result.bazi;
            let displayText = '识别结果：\n';
            
            // 兼容不同的字段名
            const year = bazi.year_pillar || bazi.year || '';
            const month = bazi.month_pillar || bazi.month || '';
            const day = bazi.day_pillar || bazi.day || '';
            const hour = bazi.hour_pillar || bazi.hour || '';
            
            if (year) displayText += `年柱: ${year}\n`;
            if (month) displayText += `月柱: ${month}\n`;
            if (day) displayText += `日柱: ${day}\n`;
            if (hour) displayText += `时柱: ${hour}\n`;
            
            if (result.gender) displayText += `\n性别: ${result.gender}`;
            if (result.birth_time) displayText += `\n出生时间: ${result.birth_time}`;
            
            if (result.wuxing) {
                const wuxingStr = Object.entries(result.wuxing)
                    .map(([element, count]) => `${element}:${count}`)
                    .join(' ');
                displayText += `\n五行：${wuxingStr}`;
            }
            
            addAIMessage(`<pre style="background: #1a1a1a; padding: 12px; border-radius: 8px; font-size: 13px;">${displayText}</pre>`);
            
            // 处理完整的 10 行数据表格
            if (result.full_table && result.full_table.rows) {
                console.log(`[FullTable] 已加载 full_table 共 ${Object.keys(result.full_table.rows).length} 行`);
                displayFullTable(result.full_table);
            }
            
            // 保存完整的 Agent 数据到当前组（用于 JSON 输出）
            const currentGroup = getCurrentGroup();
            const completeAgentData = {
                bazi: bazi,
                full_table: result.full_table || null,
                wuxing: result.wuxing || null,
                gender: result.gender || null,
                birth_time: result.birth_time || null,
                environment: result.environment || null,
                ai_verifier: result.ai_verifier || null,
                timestamp: result.timestamp || new Date().toISOString()
            };
            
            // 保存到当前组的 agentFullData
            currentGroup.agentFullData = completeAgentData;
            
            // 输出环境数据日志
            if (result.environment) {
                console.log(`[Agent Data] environment 字段已保存:`, result.environment);
            }
            if (result.ai_verifier) {
                console.log(`[Agent Data] ai_verifier 字段已保存:`, result.ai_verifier);
            }
            
            // 输出 JSON 合并日志
            if (result.full_table && result.full_table.rows) {
                console.log(`[JSON Merge] 已合并 full_table 数据 (${Object.keys(result.full_table.rows).length} 行)`);
            }
            
            const formattedText = formatBaziFromAgent(bazi);
            const baziText = document.getElementById('baziText');
            if (baziText && formattedText) {
                baziText.value = formattedText;
                processChartText(formattedText, 'bazi');
            }
        }
        
    } catch (error) {
        console.error('Failed to handle Agent result:', error);
        addAIMessage(`❌ 处理Agent结果失败: ${error.message}`);
    }
}

// ========== 紫微 JSON 文件上传 ==========
async function callZiweiPipeline(file) {
    console.log("[Ziwei DEBUG] callZiweiPipeline triggered — expected to activate 3-layer Agent");
    
    try {
        // 检查文件类型
        const fileName = file.name.toLowerCase();
        const isImageFile = file.type.startsWith('image/') || fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg');
        const isJsonFile = fileName.endsWith('.json') || fileName.endsWith('.txt');
        
        // 如果是图片文件，显示提示信息
        if (isImageFile) {
            addAIMessage(`
                <div style="padding: 16px; background: #2a1a1a; border-left: 4px solid #ff9d00; border-radius: 8px; margin: 12px 0;">
                    <strong style="color: #ff9d00;">⚠️ 紫微命盘不再支持图片OCR识别</strong><br>
                    <p style="margin: 8px 0; color: #ccc; font-size: 13px;">
                        请使用以下两种方式之一：<br>
                        1️⃣ <strong>推荐</strong>：从文墨天机 App 导出 AI分析版文件（.json 或 .txt），然后上传<br>
                        2️⃣ 使用上方的 "Lynker 统一命理引擎" 输入出生资料，一键生成八字+紫微命盘
                    </p>
                </div>
            `);
            document.getElementById('ziweiStatus').textContent = "请上传JSON文件";
            document.getElementById('ziweiStatus').className = "result-status error";
            return;
        }
        
        // 处理 JSON/TXT 文件
        if (!isJsonFile) {
            addAIMessage(`❌ 不支持的文件格式，请上传 .json 或 .txt 文件`);
            document.getElementById('ziweiStatus').textContent = "格式错误";
            document.getElementById('ziweiStatus').className = "result-status error";
            return;
        }
        
        addAIMessage('📄 上传文墨天机 AI分析版文件（使用严格解析器 v0.9）...');
        
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                // 直接上传到服务器，让后端严格解析器处理
                // 后端会自动识别 JSON 或纯文本格式
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await fetch('/verify/api/ziwei/upload_json', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    const version = result.data?.meta?.parser_version || 'v1.1';
                    addAIMessage(`✅ 文墨天机命盘解析成功（${version}）<br><small style="color: #888;">使用严格规则解析器 v0.9，无 AI 推断</small>`);
                    
                    // 显示命盘数据（传入完整的 result，让函数内部解析 result.data）
                    handleZiweiJsonData(result);
                    
                    document.getElementById('ziweiStatus').textContent = "解析成功";
                    document.getElementById('ziweiStatus').className = "result-status success";
                } else {
                    addAIMessage(`❌ 解析失败: ${result.error || '未知错误'}`);
                    document.getElementById('ziweiStatus').textContent = "解析失败";
                    document.getElementById('ziweiStatus').className = "result-status error";
                }
                
            } catch (error) {
                console.error('Ziwei upload error:', error);
                addAIMessage(`❌ 上传失败: ${error.message}`);
                document.getElementById('ziweiStatus').textContent = "上传失败";
                document.getElementById('ziweiStatus').className = "result-status error";
            }
        };
        
        reader.readAsText(file);
        
    } catch (error) {
        console.error('Failed to upload Ziwei JSON:', error);
        addAIMessage(`❌ 上传失败: ${error.message}`);
    }
}

// 处理上传的紫微 JSON 数据
function handleZiweiJsonData(result) {
    console.log("[Ziwei DEBUG] handleZiweiJsonData triggered —", result);

    // ✅ 修正关键点：确保解析到正确层级
    const data = result.data ? result.data : result;  // 有 data 层就取 data，否则取本身

    // ✅ 保存完整结果
    const currentGroup = getCurrentGroup();
    currentGroup.ziweiFull = data;

    // ✅ 记录日志
    console.log("[ZiweiJSON] ✅ 完整三层 Agent 数据已保存到 currentGroup.ziweiFull");
    console.log("[ZiweiJSON] 完整数据包含字段:", Object.keys(data));

    try {
        console.log('[ZiweiJSON] 接收到文墨天机数据:', data);
        
        // 验证完整的 ZiweiAI_v1.1 结构
        console.log('[ZiweiResult v1.1] meta:', data.meta);
        console.log('[ZiweiResult v1.1] basic_info:', data.basic_info);
        console.log('[ZiweiResult v1.1] star_map:', data.star_map);
        console.log('[ZiweiResult v1.1] transformations:', data.transformations);
        console.log('[ZiweiResult v1.1] tags:', data.tags);
        console.log('[ZiweiResult v1.1] 完整 JSON 结构:', JSON.stringify(data, null, 2));
        
        // 🧠 使用安全标准化函数统一数据结构
        const safeData = safeNormalizeResult({ standardized: data });
        
        // ✨ 使用黑底摘要卡片组件显示
        addAIMessage(`<div id="ziweiSummaryCard"></div>`);
        
        // 延迟渲染确保 DOM 已挂载
        setTimeout(() => {
            if (typeof renderZiweiSummary === 'function') {
                renderZiweiSummary(safeData, 'ziweiSummaryCard');
                console.log('[ZiweiJSON] ✅ 黑底摘要卡片已渲染');
            } else {
                console.error('[ZiweiJSON] ❌ renderZiweiSummary 函数未加载');
                addAIMessage('⚠️ 摘要卡片渲染失败，请刷新页面');
            }
        }, 100);
        
        // 更新当前组数据
        currentGroup.ziwei = safeData;
        
        // 显示选择按钮
        document.getElementById('selectZiweiBtn').style.display = 'inline-block';
        
    } catch (error) {
        console.error('处理紫微JSON数据失败:', error);
        addAIMessage(`❌ 处理数据失败: ${error.message}`);
    }
}

/**
 * 🛡️ 安全结构检测与标准化函数
 * 支持 ZiweiAI_v1.1 与 BaziAI_v2.1 双系统
 * 自动补全缺失字段，防止 undefined 报错
 */
function safeNormalizeResult(result) {
    // 安全兜底
    if (!result || typeof result !== "object") {
        console.warn("[SafeParser] Invalid result type, resetting to empty object");
        return {
            meta: {},
            basic_info: {},
            star_map: {},
            transformations: {},
            tags: {},
            environment: {},
            risk: {},
        };
    }

    // 如果包含 standardized 层，则取内部数据
    const data = result.standardized || result;

    // --- 统一结构骨架 ---
    const normalized = {
        meta: data.meta || {},
        basic_info: data.basic_info || {},
        star_map: data.star_map || {},
        transformations: data.transformations || {},
        tags: data.tags || {},
        environment: data.environment || {},
        risk: data.risk || {},
        astro_fingerprint: data.astro_fingerprint || {},
        relationship_vector: data.relationship_vector || {},
        success: data.success !== undefined ? data.success : true
    };

    // --- 自动补全关键字段 ---
    normalized.basic_info["性别"] = normalized.basic_info["性别"] || "";
    normalized.basic_info["命主"] = normalized.basic_info["命主"] || "";
    normalized.basic_info["身主"] = normalized.basic_info["身主"] || "";
    normalized.basic_info["命局"] = normalized.basic_info["命局"] || "";

    normalized.tags["格局"] = normalized.tags["格局"] || [];
    normalized.tags["性格"] = normalized.tags["性格"] || [];
    normalized.tags["优势"] = normalized.tags["优势"] || [];
    normalized.tags["风险因子"] = normalized.tags["风险因子"] || [];

    normalized.environment = Object.assign(
        {
            city: "",
            country: "",
            climate_zone: "",
            humidity_type: "",
            terrain_type: "",
        },
        normalized.environment
    );

    normalized.relationship_vector = Object.assign(
        { 婚姻: 0, 事业: 0, 健康: 0, 人际: 0 },
        normalized.relationship_vector
    );

    return normalized;
}

function handleZiweiResult(result) {
    try {
        addAIMessage(`✅ <strong>紫微命盘三层识别完成！</strong>`);
        
        console.log('[ZiweiResult v1.1] 原始数据:', result);
        
        // 🧠 使用安全标准化函数统一数据结构
        const safeData = safeNormalizeResult(result);
        const basicInfo = safeData.basic_info;
        const starMap = safeData.star_map;
        const transformations = safeData.transformations;
        const tags = safeData.tags;
        
        const currentGroup = getCurrentGroup();
        const analysis = result.analysis;
        
        if (!safeData.success) {
            addAIMessage('⚠️ 数据标准化失败');
            return;
        }
        
        console.log('[ZiweiResult v1.1] 标准化数据结构:', safeData);
        console.log('[ZiweiResult v1.1] 版本:', safeData.meta.parser_version || "未标明");
        
        // 显示OCR模式标签
        const ocrMode = safeData.meta.ocr_mode || result.ocr_mode || "intelligent";
        const modeIcon = ocrMode === "strict" ? "🔍" : "🧠";
        const modeLabel = ocrMode === "strict" ? "严格识别（纯OCR）" : "智能识别（带分析）";
        addAIMessage(`<div style="display: inline-block; padding: 6px 12px; background: #2a2a2a; border: 1px solid #555; border-radius: 6px; color: #80e8ff; font-size: 13px; margin-bottom: 12px;">
            ${modeIcon} <strong>模式:</strong> ${modeLabel}
        </div>`);
        
        // ✨ 使用黑底摘要卡片组件显示（替代原有的文本显示）
        addAIMessage(`<div id="ziweiSummaryCard"></div>`);
        
        // 延迟渲染确保 DOM 已挂载
        setTimeout(() => {
            if (typeof renderZiweiSummary === 'function') {
                renderZiweiSummary(safeData, 'ziweiSummaryCard');
                console.log('[ZiweiResult v1.1] ✅ 黑底摘要卡片已渲染');
            } else {
                console.error('[ZiweiResult v1.1] ❌ renderZiweiSummary 函数未加载');
                addAIMessage('⚠️ 摘要卡片渲染失败，请刷新页面');
            }
        }, 100);
        
        // 显示 AI 分析摘要（独立于卡片之外）
        if (analysis && analysis.summary) {
            addAIMessage(`<div style="color: #fff; padding: 8px 0; margin: 8px 0;">
                🧠 <strong>AI 分析:</strong><br>
                <div style="margin-top: 6px; line-height: 1.6;">${analysis.summary}</div>
            </div>`);
        }
        
        // 保存完整数据到当前组
        currentGroup.ziweiFullData = {
            standardized: safeData,
            analysis: analysis,
            raw: result.raw,
            timestamp: new Date().toISOString()
        };
        
        // 创建简化的文本表示用于后续处理
        let ziweiTextSummary = '';
        if (basicInfo["性别"]) ziweiTextSummary += `性别: ${basicInfo["性别"]}\n`;
        if (basicInfo["命局"]) ziweiTextSummary += `命局: ${basicInfo["命局"]}\n`;
        if (starMap && starMap['命宫']) {
            ziweiTextSummary += `命宫: ${starMap['命宫'].join('、')}\n`;
        }
        
        // 更新文本框和状态
        const ziweiText = document.getElementById('ziweiText');
        if (ziweiText && ziweiTextSummary) {
            ziweiText.value = ziweiTextSummary;
        }
        
        // 更新状态
        currentGroup.ziweiUploaded = true;
        currentGroup.ziweiText = ziweiTextSummary;
        document.getElementById('ziweiStatus').textContent = "AI识别完成";
        document.getElementById('ziweiStatus').className = "result-status success";
        
        // ✅ 直接显示完整的 ZiweiAI_v1.1 JSON 结构
        console.log('[ZiweiPipeline] 完整识别结果:', result);
        console.log('[ZiweiPipeline] 标准化数据字段:', Object.keys(safeData));
        
        const resultContent = document.getElementById('ziweiResultContent');
        if (resultContent) {
            // 显示完整的 JSON 结构
            const prettyJSON = JSON.stringify(safeData, null, 2);
            const jsonDisplay = `
                <details open style="margin-top: 16px; padding: 12px 0;">
                    <summary style="cursor: pointer; font-weight: 600; color: #fff; margin-bottom: 8px;">
                        📋 完整 ZiweiAI_v1.1 JSON 结构
                    </summary>
                    <pre style="margin: 8px 0 0 0; max-height: 500px; overflow-y: auto; background: transparent; padding: 12px; border-radius: 4px; border: 1px solid #555; font-size: 12px; line-height: 1.5; color: #fff;">${prettyJSON}</pre>
                </details>
            `;
            
            // 保留图片预览，添加 JSON 显示
            const existingImagePreview = resultContent.querySelector('.image-preview-container');
            if (existingImagePreview) {
                existingImagePreview.insertAdjacentHTML('afterend', jsonDisplay);
            } else {
                resultContent.innerHTML = jsonDisplay + resultContent.innerHTML;
            }
        }
        
        // ⚠️ 不再调用 processChartText()，避免旧 API 覆盖数据
        // if (ziweiTextSummary) {
        //     processChartText(ziweiTextSummary, 'ziwei');
        // }
        
        addAIMessage('✅ 紫微命盘处理完成！你可以继续上传其他时辰的命盘，或开始问卷验证。');
        
    } catch (error) {
        console.error('Failed to handle Ziwei result:', error);
        addAIMessage(`❌ 处理紫微结果失败: ${error.message}`);
    }
}

function displayFullTable(fullTable) {
    try {
        const rows = fullTable.rows;
        const columns = fullTable.columns || ['年柱', '月柱', '日柱', '时柱'];
        
        // 定义 10 行的顺序
        const rowNames = ['主星', '天干', '地支', '藏干', '副星', '星运', '自坐', '空亡', '纳音', '神煞'];
        
        // 生成 HTML 表格
        let tableHTML = `
            <div style="margin-top: 16px; overflow-x: auto;">
                <div style="color: #3b82f6; font-weight: 600; margin-bottom: 8px; font-size: 14px;">
                    📋 完整命盘数据（10行）
                </div>
                <table style="width: 100%; border-collapse: collapse; background: #1a1a1a; border-radius: 8px; overflow: hidden; font-size: 12px;">
                    <thead>
                        <tr style="background: #2d2d2d;">
                            <th style="padding: 10px; text-align: left; color: #fbbf24; border-bottom: 2px solid #3b82f6; font-weight: 600;">项目</th>
                            <th style="padding: 10px; text-align: center; color: #fbbf24; border-bottom: 2px solid #3b82f6; font-weight: 600;">${columns[0]}</th>
                            <th style="padding: 10px; text-align: center; color: #fbbf24; border-bottom: 2px solid #3b82f6; font-weight: 600;">${columns[1]}</th>
                            <th style="padding: 10px; text-align: center; color: #fbbf24; border-bottom: 2px solid #3b82f6; font-weight: 600;">${columns[2]}</th>
                            <th style="padding: 10px; text-align: center; color: #fbbf24; border-bottom: 2px solid #3b82f6; font-weight: 600;">${columns[3]}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // 添加每一行数据
        rowNames.forEach((rowName, index) => {
            const rowData = rows[rowName] || ['', '', '', ''];
            const bgColor = index % 2 === 0 ? '#1a1a1a' : '#242424';
            
            tableHTML += `
                <tr style="background: ${bgColor};">
                    <td style="padding: 8px; color: #60a5fa; font-weight: 500; border-bottom: 1px solid #333;">${rowName}</td>
                    <td style="padding: 8px; text-align: center; color: #e5e7eb; border-bottom: 1px solid #333;">${rowData[0] || '-'}</td>
                    <td style="padding: 8px; text-align: center; color: #e5e7eb; border-bottom: 1px solid #333;">${rowData[1] || '-'}</td>
                    <td style="padding: 8px; text-align: center; color: #e5e7eb; border-bottom: 1px solid #333;">${rowData[2] || '-'}</td>
                    <td style="padding: 8px; text-align: center; color: #e5e7eb; border-bottom: 1px solid #333;">${rowData[3] || '-'}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        addAIMessage(tableHTML);
        
    } catch (error) {
        console.error('Failed to display full table:', error);
        addAIMessage(`❌ 无法显示完整表格: ${error.message}`);
    }
}

function formatBaziFromAgent(bazi) {
    if (!bazi) return '';
    
    // 兼容不同的字段名
    const year = bazi.year_pillar || bazi.year || '';
    const month = bazi.month_pillar || bazi.month || '';
    const day = bazi.day_pillar || bazi.day || '';
    const hour = bazi.hour_pillar || bazi.hour || '';
    
    const parts = [];
    if (year) parts.push(`年柱:${year}`);
    if (month) parts.push(`月柱:${month}`);
    if (day) parts.push(`日柱:${day}`);
    if (hour) parts.push(`时柱:${hour}`);
    
    return parts.join(' ');
}

// ========== 聊天框展开功能 ==========
let isChatExpanded = false;

function toggleChatExpand() {
    const expandIcon = document.getElementById('expandIcon');
    const chatPanel = document.querySelector('.chatbox-panel');
    
    isChatExpanded = !isChatExpanded;
    
    if (isChatExpanded) {
        chatPanel.classList.add('expanded');
        expandIcon.textContent = '✕';
    } else {
        chatPanel.classList.remove('expanded');
        expandIcon.textContent = '⛶';
    }
}
