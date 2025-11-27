/* =====================================================
 * ZiweiSummary v2.1.9 - 十二宫格布局 + 四化上标增强版
 * =====================================================
 * 🎨 特点：
 * - 保留原 12 宫格 UI 排版
 * - 自动嵌入禄权科忌上标（含彩色标识）
 * - 紫色为尊，红色为吉，黑色为祸
 * - 兼容繁简体星曜
 * ===================================================== */

function getStarColor(state) {
  switch (state) {
    case "廟": return "purple";
    case "旺": return "red";
    case "得": return "orange";
    case "平": return "gray";
    case "陷": return "black";
    default: return "gray";
  }
}

const fourhuaColors = {
  "禄": "gold",
  "权": "dodgerblue",
  "科": "mediumseagreen",
  "忌": "crimson"
};

function renderStar(star) {
  if (!star || !star.名) return "";
  const baseColor = getStarColor(star.状态);
  let html = `<span style="color:${baseColor};font-weight:400;">${star.名}</span>`;
  const tags = star.标签 || [];
  for (const tag of tags) {
    const tagColor = fourhuaColors[tag] || baseColor;
    html += `<span style="color:${tagColor};font-size:0.85em;font-weight:400;">[${tag}]</span>`;
  }
  return html + " ";
}

function renderPalace(name, data) {
  if (!data) return "";
  let html = `<div class="palace-box"><b>${name}</b><br>`;
  for (const k of ["主星", "辅星", "小星"]) {
    const stars = data[k];
    if (!stars || stars === "无") continue;
    
    // 兼容数组和非数组格式
    if (!Array.isArray(stars)) {
      // 如果是字符串或其他格式，跳过
      continue;
    }
    
    const line = stars.map(renderStar).join("");
    html += `${k}: ${line}<br>`;
  }
  html += "</div>";
  return html;
}

function renderZiweiSummary(data) {
  if (!data || typeof data !== "object") return;
  const container = document.getElementById("ziweiSummaryCard");
  if (!container) return;

  const starMap = data.star_map || {};
  const basicInfo = data.basic_info || {};
  
  // 处理 tags：可能是数组或对象
  let geju = "未识别";
  if (Array.isArray(data.tags)) {
    geju = data.tags.join("、") || "未识别";
  } else if (data.tags && typeof data.tags === "object") {
    const patterns = data.tags["格局"] || data.tags.格局 || [];
    geju = Array.isArray(patterns) ? patterns.join("、") || "未识别" : "未识别";
  }
  
  const minggong = (starMap["命宫"]?.主星 || []).map(renderStar).join("") || "未识别";

  let html = `
  <div class="summary-top">
    <b>命宫:</b> ${minggong}<br>
    <b>命主:</b> ${basicInfo.命主 || ""}; <b>身主:</b> ${basicInfo.身主 || ""}<br>
    <b>格局:</b> ${geju}
  </div>
  <div class="grid-container">
  `;

  const palaceOrder = [
    "交友宫","兄弟宫","命宫","夫妻宫",
    "子女宫","官禄宫","父母宫","田宅宫",
    "疾厄宫","福德宫","财帛宫","迁移宫"
  ];

  for (const p of palaceOrder) {
    const info = starMap[p] || starMap[p.replace("宫","宮")];
    if (info) html += renderPalace(p, info);
  }

  html += "</div>";
  container.innerHTML = html;
  console.log("[ZiweiSummary v2.1.9] ✅ 十二宫格 + 四化上标渲染完成");
}

const css = `
.summary-top {
  background: #111;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 0 4px #333;
  line-height: 1.8em;
  color: #f3f3f3;
  font-size: 13px;
  font-weight: 400;
}
.summary-top b {
  font-weight: 500;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.palace-box {
  background: #0b0b0b;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  line-height: 1.8em;
  color: #eee;
  box-shadow: 0 0 3px #222;
  font-weight: 400;
}
.palace-box b { 
  color: #a0a0a0;
  font-weight: 500;
}
`;
const styleTag = document.createElement("style");
styleTag.innerHTML = css;
document.head.appendChild(styleTag);
