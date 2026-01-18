
        

        
import { MOCK_SERVICES_OFFERED, ServiceOfferedModel } from "./service";
import { ReviewModel } from "./review";
import { ForumPostSummaryModel } from "./forum";
import { MOCK_MASTERS, MOCK_USER_ALIASES } from "./base-mock";

export { MOCK_MASTERS, MOCK_USER_ALIASES } from "./base-mock";

// 国籍/区域标签
export interface GeoTagModel {
  country: string; // 国籍
  region: string; // 区域 (省/州/城市)
  flagIcon: string; // 国旗图标 (e.g., CN, US)
}

// 普通用户摘要模型 (用于社交动态)
export interface UserSummaryModel {
  userId: string;
  alias: string; // 假名
  avatarUrl: string;
  geoTag?: GeoTagModel;
}

export const MOCK_REVIEWS: ReviewModel[] = [
  {
    reviewId: "r001",
    masterId: "master_001",
    userNameAlias: MOCK_USER_ALIASES[0],
    rating: 5.0,
    serviceType: "八字",
    content:
      "张大师的批断非常准确，关于我明年事业上的变动预测完全命中。分析逻辑清晰，提供了实用的建议。",
    date: "2025-10-20",
  },
  {
    reviewId: "r002",
    masterId: "master_001",
    userNameAlias: MOCK_USER_ALIASES[1],
    rating: 4.5,
    serviceType: "紫微",
    content:
      "服务态度很好，紫微星盘解读详细，但关于感情方面的指导略显笼统，总体还是值得推荐。",
    date: "2025-09-15",
  },
  {
    reviewId: "r003",
    masterId: "master_002",
    userNameAlias: MOCK_USER_ALIASES[2],
    rating: 5.0,
    serviceType: "占星术",
    content: "占星分析非常专业，特别是对本命盘的解读让我深刻理解了自己的天赋和局限。",
    date: "2025-11-01",
  },
];

// 命理师摘要模型 (用于列表和卡片展示)
export interface MasterSummaryModel {
  masterId: string;
  realName: string; // 必须实名
  alias: string;
  avatarUrl: string;
  geoTag?: GeoTagModel;
  expertise?: string; // 专长领域
  rating?: number; // 评分 (5分制)
  serviceCount?: number; // 累计服务次数
  priceMin?: number;
}

// 命理师详细档案
export interface MasterProfileModel extends MasterSummaryModel {
  bannerUrl: string; // 个人工作室背景图
  studioName: string; // 工作室名称
  longDescription: string;
  services: ServiceOfferedModel[];
  reviews: ReviewModel[];
  isAvailableToday: boolean;
  baziPillars: string[];
  styleTags: string[]; // 风格标签
  primaryLanguage?: string; // 第一擅长语言
  servesInternational?: boolean; // 是否服务外国顾客
  professionalFields?: string[]; // 专业领域
  serviceTypes?: string[]; // 服务类型
  yearsOfExperience?: number; // 从业年限
  personalIntroduction?: string; // 个人介绍
  secondaryLanguage?: string; // 第二支持的语言
}

// 普通用户完整档案 (公开部分)
export interface UserProfileDetailModel {
  userId: string;
  alias: string; // 假名
  avatarUrl: string;
  geoTag: GeoTagModel;
  joinDate: string;
  selfIntroduction: string;
  resonanceTags: string[]; // 同行命格标签
  publicPrognosisSummary: string; // 命理分析摘要
  recentPosts?: ForumPostSummaryModel[];
}


// 论坛用户资料摘要 (包含论坛统计数据)
export interface ForumUserDetailModel {
  userId: string;
  alias: string;
  avatarUrl: string;
  totalPosts: number;
  totalAccurateVotes: number; // 获得的"准"票数
  recentPostsSummary: ForumPostSummaryModel[];
}



export const MOCK_MASTER_PROFILE: MasterProfileModel = {
  ...MOCK_MASTERS[0],
  bannerUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fbd56883-df63-43b6-aa84-e6f6e5fbdb95.png",
  studioName: "玄真子命理工作室",
  longDescription: `从事命理研究三十载，我专注于八字四柱的精细剖析和危机预防。我的目标是结合传统智慧与现代社会环境因子，为客户提供最贴合实际的命运规划。我尤其擅长处理事业转型、重大决策前的运势推算。我致力于用数据和验证来提升命理学的科学性，欢迎同命者交流。`,
  services: MOCK_SERVICES_OFFERED.filter(s => s.type === "八字" || s.type === "紫微"),
  reviews: MOCK_REVIEWS.filter(r => r.masterId === "master_001"),
  isAvailableToday: true,
  baziPillars: ["甲子", "乙丑", "丙寅", "丁卯"],
  styleTags: ["经验丰富", "断语精简", "逻辑严密", "传统派"],
  professionalFields: ["八字命理", "紫微斗数", "五行论衡"],
  serviceTypes: ["初级批命", "全面分析", "咨询指导"],
  yearsOfExperience: 30,
  personalIntroduction: "修行三十年，致力于将古老的命理学与现代科学相结合，为每一位求来者提供最真诚和深刻的指导。相信命可以改，运也可以造，欢迎有缘人共同探讨人生的奥秘。",
  secondaryLanguage: "英文",
};

export const MOCK_USER_PROFILE_DETAIL: UserProfileDetailModel = {
  userId: "user_001",
  alias: MOCK_USER_ALIASES[0],
  avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png",
  geoTag: { country: "中国", region: "广东深圳", flagIcon: "CN" },
  joinDate: "2025-08-15",
  selfIntroduction: "一个热爱探索自己命运轨迹的普通人。正在努力实现自我价值，期望通过命理找到人生的最优解。",
  resonanceTags: ["七杀坐命", "木火通明", "北方气候带"],
  publicPrognosisSummary: "命主身弱，印星为用，需注意身体健康和情绪管理。当前大运走食伤生财，适宜从事技术研发或艺术创作。",
  recentPosts: [
    {
      postId: "p005",
      title: "关于紫微斗数中贪狼坐命的看法",
      authorAlias: MOCK_USER_ALIASES[0],
      isMasterPost: false,
      accurateVotes: 12,
      inaccurateVotes: 2,
      tags: ["紫微斗数", "贪狼"],
      date: "2025-11-10",
    } as ForumPostSummaryModel,
  ],
};

export const MOCK_FORUM_USER_DETAIL: ForumUserDetailModel = {
    userId: "user_001",
    alias: MOCK_USER_ALIASES[0],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png",
    totalPosts: 15,
    totalAccurateVotes: 345, // "准" + "准!我就是" 的总数
    recentPostsSummary: [
        {
            postId: "p005",
            title: "关于紫微斗数中贪狼坐命的看法",
            authorAlias: MOCK_USER_ALIASES[0],
            isMasterPost: false,
            accurateVotes: 12,
            inaccurateVotes: 2,
            tags: ["紫微斗数", "贪狼"],
            date: "2025-11-10",
        } as ForumPostSummaryModel,
    ],
};
        
      
    
      