
        

        
import { IconName } from "../types";
import { MOCK_MASTERS, MOCK_USER_ALIASES } from "./user";

// 知识库主页 Tab 菜单项
export interface KBCategoryModel {
    id: string;
    name: string;
    iconName: IconName;
    colorHex: string;
}

// 知识库设置外部链接
export interface KBSetupLinkModel {
    id: string;
    title: string;
    description: string;
    iconName: IconName;
    targetUrl: string;
}

// 知识库主页导航条目
export interface KnowledgeEntryModel {
  id: string;
  title: string;
  iconName: IconName;
  description: string;
  totalRecords: number;
}

// 研究主题模型 (用于知识库主页左侧栏) 或 自定义笔记
export interface ResearchTopicModel {
  topicId: string;
  title: string;
  currentStage: "Draft" | "Researching" | "Completed";
  lastUpdated: string;
  category: "bazi" | "ziwei" | string;
}

// 知识库自定义笔记
export interface KBNoteModel {
    noteId: string;
    title: string;
    contentMarkdown: string;
    dateCreated: string;
    sourceUrl?: string; // 导入的文章 URL 链接
}

// 命盘分析摘要 (用于详情页)
export interface PrognosisAnalysisModel {
  type: "八字" | "紫微" | "占星";
  keyPoints: { key: string; value: string; }[];
  detailedReport: string; // Markdown 格式
}

// 知识库记录摘要 (适用于用户和命理师列表视图)
export interface KnowledgeRecordSummaryModel {
  recordId: string;
  title: string;
  date: string;
  type: string;
  masterAlias: string;
  videoLink: string;
  thumbnailUrl: string;
  userNotesPreview: string;
}

// 用户预测记录详情
export interface UserPrognosisDetailModel {
  recordId: string;
  consultationId: string;
  title: string;
  masterId: string;
  date: string;
  aiSummaryMarkdown: string;
  videoLink: string;
  analysisDetails: PrognosisAnalysisModel[];
  customUserNotes: string;
}

// 命理师批命记录摘要
export interface MasterRecordSummaryModel {
  recordId: string;
  clientId: string; // 客户假名
  clientAvatarUrl: string;
  date: string;
  prognosisStatus: "待验证" | "应验中" | "已验证";
  aiNotePreview: string; // AI自动生成的笔记摘要
}

// 命理师批命详情
export interface MasterPrognosisDetailModel {
  recordId: string;
  clientId: string;
  consultationId: string;
  date: string;
  fullAIMarkdown: string; // 完整的AI转录和笔记
  prophecyValidationMarkers: {
    prophecy: string;
    expectedDate: string;
    validationStatus: "已应验" | "未应验" | "部分应验" | "待验证";
  }[];
  videoLink: string;
}

// 预言应验记录项 (用户端)
export interface ProphecyRecordModel {
  prophecyId: string;
  prophecySummary: string;
  sourceMaster: string;
  dateRecorded: string;
  dateExpected: string;
  fulfillmentStatus: "已应验" | "未应验" | "应验中";
  userReflection: string;
}

export const MOCK_KB_CATEGORIES: KBCategoryModel[] = [
    { id: "bazi_tab", name: "八字记录", iconName: "BarChart3", colorHex: "#D97706" },
    { id: "ziwei_tab", name: "紫微档案", iconName: "Star", colorHex: "#5B21B6" },
    { id: "astrology_tab", name: "占星分析", iconName: "Compass", colorHex: "#3B82F6" },
];

export const MOCK_KB_SETUP_LINKS: KBSetupLinkModel[] = [
    {
        id: "api_setting",
        title: "AI API 配置",
        description: "设置您的专属AI模型密钥",
        iconName: "ServerCog",
        targetUrl: "/settings/ai-api",
    },
    {
        id: "google_drive",
        title: "Google Drive 绑定",
        description: "绑定云盘存储命盘数据和批命视频。",
        iconName: "Cloud",
        targetUrl: "/settings/google-drive",
    },
];

export const MOCK_KB_ENTRIES: KnowledgeEntryModel[] = [
  {
    id: "user_records",
    title: "我的预测记录",
    iconName: "User",
    description: "回顾您的历史咨询笔记和视频片段。",
    totalRecords: 4,
  },
  {
    id: "master_records",
    title: "我的批命记录",
    iconName: "GraduationCap",
    description: "Pro命理师专属。管理您的客户批命记录和AI验证标记。",
    totalRecords: 3,
  },
];

export const MOCK_RESEARCH_TOPIC: ResearchTopicModel[] = [
    {
        topicId: "rt001",
        title: "现代社会婚姻模式对紫微夫妻宫的影响调研",
        currentStage: "Researching",
        lastUpdated: "2025-12-05",
        category: "ziwei",
    },
    {
        topicId: "rt002",
        title: "高纬度出生人群八字五行平衡的特殊性",
        currentStage: "Draft",
        lastUpdated: "2025-11-20",
        category: "bazi",
    },
    {
        topicId: "rt003",
        title: "紫微十四主星与现代职业匹配度分析",
        currentStage: "Researching",
        lastUpdated: "2025-12-01",
        category: "ziwei",
    },
    {
        topicId: "rt004",
        title: "八字纳音五行在婚配中的应用研究",
        currentStage: "Completed",
        lastUpdated: "2025-11-15",
        category: "bazi",
    },
];

export const MOCK_KB_NOTES: KBNoteModel[] = [
    {
        noteId: "note_a01",
        title: "RAG导入：论《滴天髓》中的十神心性",
        contentMarkdown: "导入自外部文章，分析十神的现代应用。**日主强弱与十神关系:** 财官印食伤...",
        dateCreated: "2025-12-01",
        sourceUrl: "https://www.baidu.com/article/dts.html",
    },
    {
        noteId: "note_a02",
        title: "自定义研究：紫微星曜与MBTI人格对比",
        contentMarkdown: "武曲/七杀星对应INTJ和ESTJ人格，天机/天梁星对应INTP。这对我寻找同命人很有帮助。",
        dateCreated: "2025-11-25",
    },
];

export const MOCK_USER_RECORDS: KnowledgeRecordSummaryModel[] = [
  {
    recordId: "ur001",
    title: "2025年事业转型风险分析",
    date: "2025-10-28",
    type: "八字",
    masterAlias: MOCK_MASTERS[0].realName,
    videoLink: "https://video.consultation-001.mp4",
    thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/57f9d48a-1d17-42a8-8377-20f2000fd1de.png",
    userNotesPreview: "大师提到明年三月有变化，需要提前准备简历...",
  },
  {
    recordId: "ur002",
    title: "本命盘解读与情感匹配",
    date: "2025-09-01",
    type: "占星",
    masterAlias: MOCK_MASTERS[1].realName,
    videoLink: "https://video.consultation-002.mp4",
    thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/ee50c4cc-db74-4710-b256-c3916b113801.png",
    userNotesPreview: "重点在金星相位，找到了同命匹配的线索。",
  },
  {
      recordId: "ur003",
      title: "流年运势对比 (AI vs 玄真子)",
      date: "2025-11-10",
      type: "多维分析",
      masterAlias: MOCK_MASTERS[0].realName,
      videoLink: "https://video.consultation-003.mp4",
      thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/a43ae1ac-afb9-46cf-a278-1a906aea5612.png",
      userNotesPreview: "玄真子大师对我的2026年判断偏保守，AI认为会有低开高走的趋势。",
  }
];

export const MOCK_USER_RECORD_DETAIL: UserPrognosisDetailModel = {
  recordId: "ur001",
  consultationId: "cons_001",
  title: "2025年事业转型风险分析",
  masterId: MOCK_MASTERS[0].masterId,
  date: "2025-10-28",
  aiSummaryMarkdown: `# 本次咨询摘要\n\n- **核心主题**：分析命主在2025年春季的事业变动及其稳定性。\n- **AI断语提醒**：注意丙火和申金的冲突，可能会导致合作关系破裂。\n- **建议行动**：在农历三月前，避免签订长期合同，灵活调整策略。\n- **视频片段链接**：[关键分析片段](https://video.consultation-001.mp4?t=150s)\n`,
  videoLink: "https://video.consultation-001.mp4",
  analysisDetails: [
    {
      type: "八字",
      keyPoints: [
        { key: "日主", value: "甲木" },
        { key: "用神", value: "水" },
        { key: "忌神", value: "金" },
      ],
      detailedReport: "命主甲木生于亥月，略显寒湿，喜火暖局。明年流年逢土金旺地，金克木，事业压力较大，需谨慎应对人事纷争。",
    },
  ],
  customUserNotes: "我已按照张大师的建议，正在准备副业方案，以应对春季可能的裁员风险。",
};

export const MOCK_MASTER_RECORDS: MasterRecordSummaryModel[] = [
  {
    recordId: "mr001",
    clientId: MOCK_USER_ALIASES[3],
    clientAvatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f8235e88-0267-4a5c-93ad-98adb68069c3.png",
    date: "2025-09-10",
    prognosisStatus: "已验证",
    aiNotePreview: "客户反馈：预测的购房时机完全应验，成功避开银行利率高点。",
  },
  {
    recordId: "mr004",
    clientId: MOCK_USER_ALIASES[4],
    clientAvatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/7a7cf2fb-b01c-4cff-955d-7cd4b17d128a.png",
    date: "2025-11-05",
    prognosisStatus: "应验中",
    aiNotePreview: "预测客户感情波动期集中在冬季，需持续关注反馈。",
  }
];

export const MOCK_MASTER_RECORD_DETAIL: MasterPrognosisDetailModel = {
  recordId: "mr001",
  clientId: MOCK_USER_ALIASES[3],
  consultationId: "cons_002",
  date: "2025-09-10",
  fullAIMarkdown: `# 客户 ${MOCK_USER_ALIASES[3]} 批命记录\n\n--- AI GPT-4 Transcript & Analysis ---\n\n(略去Jitsi会议实时字幕，此处为整理后的Markdown笔记)\n\n## 预测总结\n\n命主在2025年秋季有明显的财星入门，适宜投资不动产。最佳购房时间点：农历八月至九月。\n\n## 风险提醒\n\n提防因家人干预导致的决策失误。避免过度杠杆。\n`,
  prophecyValidationMarkers: [
    {
      prophecy: "2025年秋季财运亨通，利于购房。",
      expectedDate: "2025-10-01",
      validationStatus: "已应验",
    },
    {
      prophecy: "需避免与生肖为兔的人合作创业。",
      expectedDate: "N/A",
      validationStatus: "待验证",
    },
  ],
  videoLink: "https://video.consultation-002-full.mp4",
};

export const MOCK_PROPHECY_RECORDS: ProphecyRecordModel[] = [
  {
    prophecyId: "pvs001",
    prophecySummary: "2025年3月会遇到贵人，带来新的工作机会。",
    sourceMaster: MOCK_MASTERS[0].realName,
    dateRecorded: "2025-01-01",
    dateExpected: "2025-03-30",
    fulfillmentStatus: "已应验",
    userReflection: "新工作机会比预期提前了两周到来，是老同事介绍的，确实是贵人。",
  },
  {
    prophecyId: "pvs002",
    prophecySummary: "年底需注意防范水患，避免去北方城市旅行。",
    sourceMaster: MOCK_MASTERS[2].realName,
    dateRecorded: "2025-07-01",
    dateExpected: "2025-12-31",
    fulfillmentStatus: "应验中",
    userReflection: "计划不变，但会谨慎关注天气预报。",
  },
];
        
      
    
    