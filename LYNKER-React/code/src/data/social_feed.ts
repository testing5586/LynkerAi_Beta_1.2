import { IconName } from "../types";
import { MasterSummaryModel, UserSummaryModel, MOCK_USER_ALIASES } from "./user";
import { ForumPostSummaryModel } from "./forum";
import { MOCK_MASTERS } from "./base-mock";

export { MOCK_USER_ALIASES } from "./user";

// 定义灵友圈中可能出现的不同内容类型
export type PostContentType = "Text" | "Image" | "Video" | "ForumLink" | "GroupUpdate";

// 社交动态发布模型
export interface SocialPostModel {
  postId: string;
  author: UserSummaryModel | MasterSummaryModel;
  timestamp: string;
  content: string;
  contentType: PostContentType;
  mediaUrl?: string; // 图片或视频链接
  likesCount: number;
  commentsCount: number;
  sourceType: "Friend" | "Master" | "Group" | "AI";
  relatedPost?: ForumPostSummaryModel; // 如果是 ForumLink
}

// 灵友圈动态流 Item (简化处理，包含多种内容来源)
export interface SocialFeedItemModel extends SocialPostModel {}

// 命盘快捷视图信息 (固定在灵友圈右侧)
export interface PrognosisQuickViewModel {
    baziSummary: string; // 八字简介
    ziweiSummary: string; // 紫微简介
    isVerified: boolean; // 是否是已验证真命盘
}

// AI 推荐话题模型 (用于同命聊天室)
export interface AIRecommendedTopicModel {
    topicId: string;
    title: string;
    description: string;
    suggestedQuery: string;
}

// 在线好友模型 (用于同命聊天室)
export interface OnlineFriendModel extends UserSummaryModel {
    isHomologyMatch: boolean; // 是否是同命匹配
}

const MOCK_USER_SUMMARY_3: UserSummaryModel = {
  userId: "user_003",
  alias: MOCK_USER_ALIASES[2],
  avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/84fe2122-c6a6-4adc-9282-ed9f63c49012.png",
  geoTag: { country: "中国", region: "香港", flagIcon: "HK" },
};
const MOCK_USER_SUMMARY_4: UserSummaryModel = {
    userId: "user_004",
    alias: MOCK_USER_ALIASES[3],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png",
    geoTag: { country: "日本", region: "东京", flagIcon: "JP" },
};


export const MOCK_SOCIAL_FEED: SocialFeedItemModel[] = [
  {
    postId: "sfp001",
    author: MOCK_USER_SUMMARY_3,
    timestamp: "10分钟前",
    content: "我的紫微盘终于解锁了真命盘验证！对比了一下同命群里的朋友，我们果然都是武曲贪狼系，对财富有着偏执的追求，太有趣了！",
    contentType: "Image",
    mediaUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/bd541881-bc96-46db-b924-d2e14189a153.png",
    likesCount: 45,
    commentsCount: 12,
    sourceType: "Friend",
  },
  {
    postId: "sfp002",
    author: MOCK_MASTERS[0],
    timestamp: "1小时前",
    content: "【大师动态】分享一篇我在灵客论坛上发表的关于'身强身弱与投资策略'的文章，欢迎大家转发、投票验证观点！",
    contentType: "ForumLink",
    likesCount: 120,
    commentsCount: 30,
    sourceType: "Master",
    relatedPost: {
        postId: "p001",
        title: "【大师文章】如何判断八字中的格局高低？",
        authorAlias: MOCK_MASTERS[0].realName,
        isMasterPost: true,
        accurateVotes: 250,
        inaccurateVotes: 5,
        tags: ["八字", "格局", "专业"],
        date: "2025-11-12",
    },
  },
  {
    postId: "sfp003",
    author: MOCK_USER_SUMMARY_4,
    timestamp: "4小时前",
    content: "最近在整理我从咨询室AI笔记中提取的研究主题。今天的主题是：气候带对五行平衡的长期影响。大家有没有相关的经验可以分享？",
    contentType: "Image",
    mediaUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/76f01c37-7b79-497e-bf27-2e126db9864e.png",
    likesCount: 30,
    commentsCount: 8,
    sourceType: "Friend",
  },
];

export const MOCK_PROGNOSIS_QUICK_VIEW: PrognosisQuickViewModel = {
    baziSummary: "日主：甲木。身弱用印，喜水，忌金。当前大运逢财，适宜合作求财。",
    ziweiSummary: "命宫：廉贞。官禄宫：武曲。事业主星强大，适合金融或高管职位。",
    isVerified: true,
}

export const MOCK_AI_RECOMMENDED_TOPICS: AIRecommendedTopicModel[] = [
    {
        topicId: "at001",
        title: "你对财富的看法是否与武曲贪狼的组合相符?",
        description: "AI根据你的命盘和最近的聊天记录，建议讨论关于事业目标和物质追求的话题。",
        suggestedQuery: "武曲贪狼在财帛宫，你认为应该如何平衡物质追求与精神满足?",
    },
    {
        topicId: "at002",
        title: "日主乙木在社交中更像'藤萝系甲'还是'花草'?",
        description: "探索乙木日主在同类型命格中的不同表现形式，以及如何利用其柔韧性。",
        suggestedQuery: "分享一个你认为体现了你乙木特性的事件。",
    },
];

export const MOCK_ONLINE_FRIENDS: OnlineFriendModel[] = [
    {
        userId: "user_001",
        alias: MOCK_USER_ALIASES[0],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5.png",
        geoTag: { country: "中国", region: "北京", flagIcon: "CN" },
        isHomologyMatch: true,
    },
    {
        userId: "user_002",
        alias: MOCK_USER_ALIASES[1],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f1e2d3c4-b5a6-4d7c-8b9a-e0f1a2b3c4d5.png",
        geoTag: { country: "新加坡", region: "新加坡", flagIcon: "SG" },
        isHomologyMatch: true,
    },
    {
        userId: "user_003",
        alias: MOCK_USER_ALIASES[2],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/84fe2122-c6a6-4adc-9282-ed9f63c49012.png",
        geoTag: { country: "中国", region: "香港", flagIcon: "HK" },
        isHomologyMatch: true,
    },
    {
        userId: "user_004",
        alias: MOCK_USER_ALIASES[3],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png",
        geoTag: { country: "日本", region: "东京", flagIcon: "JP" },
        isHomologyMatch: false,
    },
];