
        

        

        
import { IconName } from "../types";
import { MOCK_MASTERS, MOCK_USER_ALIASES, GeoTagModel } from "./base-mock"; // Assuming GeoTagModel moved to base-mock or user.ts

// 论坛首页英雄区内容
export interface ForumHeroModel {
    title: string;
    description: string;
    imageUrl: string;
}

// 论坛分类
export interface ForumCategoryModel {
  categoryId: string;
  name: string;
  iconName: IconName;
  description: string;
  postCount: number;
}

// 帖子/文章摘要模型
export interface ForumPostSummaryModel {
  postId: string;
  title: string;
  authorAlias: string;
  isMasterPost: boolean;
  accurateVotes: number; // 准
  inaccurateVotes: number; // 不准
  tags: string[];
  date: string;
}

// 评论附件 (紫微/八字简介)
export interface CommentAppendixModel {
  baziSummary?: string;
  ziweiSummary?: string;
}

// 评论模型
export interface CommentModel {
  commentId: string;
  authorAlias: string;
  authorAvatarUrl: string;
  content: string;
  date: string;
  geoTag?: GeoTagModel; // 国籍/区域标签
  appendix?: CommentAppendixModel; // 附加的命理简介
  replies?: CommentModel[];
  userVote?: 'perfect' | 'accurate' | 'reserved' | 'inaccurate' | 'nonsense'; // 评论者的投票
}

// 帖子/文章详情模型
export interface ForumPostDetailModel extends ForumPostSummaryModel {
  authorAvatarUrl: string;
  authorId: string;
  fullContent: string;
  comments: CommentModel[];
  blackboxAnalysisId?: string; // 关联到 Blackbox 页面
}

// 待审核内容模型
export interface ModerationItemModel {
  itemId: string;
  title: string;
  authorAlias: string;
  type: "Post" | "Article";
  submissionDate: string;
  status: "Pending" | "Reviewing";
}

// AI生成话题文章
export interface AIArticleModel {
  articleId: string;
  title: string;
  headerImageUrl: string;
  contentMarkdown: string;
  generationDate: string;
  relatedForumPostId: string;
  relatedBlackboxId?: string;
}

const MOCK_USER_GEO_TAG = { country: "中国", region: "上海", flagIcon: "CN" };

export const MOCK_FORUM_HERO: ForumHeroModel = {
    title: "灵客论坛",
    description: "命理智慧与AI验证的交流社区，同命相知。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/91847608-f47e-44f0-8e26-b8c89c8f5690.png",
}

export const MOCK_FORUM_CATEGORIES: ForumCategoryModel[] = [
  {
    categoryId: "cat_bazi",
    name: "八字交流",
    iconName: "SquareGanttChart",
    description: "四柱预测与命盘分析讨论。",
    postCount: 1543,
  },
  {
    categoryId: "cat_ziwei",
    name: "紫微专区",
    iconName: "Star",
    description: "紫微斗数、星曜、宫位深入探讨。",
    postCount: 987,
  },
  {
    categoryId: "cat_social",
    name: "同命相知社交",
    iconName: "Sparkles",
    description: "同命匹配经验分享与交友。",
    postCount: 321,
  },
];

export const MOCK_FORUM_POSTS: ForumPostSummaryModel[] = [
  {
    postId: "p001",
    title: "【大师文章】如何判断八字中的格局高低？",
    authorAlias: MOCK_MASTERS[0].realName,
    isMasterPost: true,
    accurateVotes: 250,
    inaccurateVotes: 5,
    tags: ["八字", "格局", "专业"],
    date: "2025-11-12",
  },
  {
    postId: "p002",
    title: "七杀坐命的人在现代社会如何发挥优势？",
    authorAlias: MOCK_USER_ALIASES[0],
    isMasterPost: false,
    accurateVotes: 85,
    inaccurateVotes: 10,
    tags: ["紫微斗数", "七杀", "命理社交"],
    date: "2025-11-11",
  },
  {
    postId: "p003",
    title: "求助：关于本命盘中火星逆行的影响!",
    authorAlias: MOCK_USER_ALIASES[2],
    isMasterPost: false,
    accurateVotes: 15,
    inaccurateVotes: 0,
    tags: ["西方占星", "火星", "求助"],
    date: "2025-11-10",
  },
];

export const MOCK_POST_COMMENTS: CommentModel[] = [
  {
    commentId: "c001",
    authorAlias: MOCK_USER_ALIASES[1],
    authorAvatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/037f4122-b11c-4b06-b481-45cd28e1ef44.png",
    content: "张大师的文章总是深入浅出，受益匪浅！我试着把这个方法应用到我的命盘分析中。",
    date: "2025-11-12 10:30",
    geoTag: MOCK_USER_GEO_TAG,
    appendix: {
        baziSummary: "身旺用财"
    },
    userVote: "accurate"
  },
  {
    commentId: "c002",
    authorAlias: MOCK_MASTERS[2].realName,
    authorAvatarUrl: MOCK_MASTERS[2].avatarUrl,
    content: "（回复 c001）是的，关键在于区分真假格局。如果能结合五行气势分析会更全面。",
    date: "2025-11-12 11:00",
    geoTag: { country: "中国", region: "香港", flagIcon: "HK" },
    appendix: {
        ziweiSummary: "命宫天机"
    },
    userVote: "perfect"
  },
];

export const MOCK_FORUM_POST_DETAIL: ForumPostDetailModel = {
  ...MOCK_FORUM_POSTS[0],
  authorAvatarUrl: MOCK_MASTERS[0].avatarUrl,
  authorId: MOCK_MASTERS[0].masterId,
  fullContent: `## 浅谈八字格局的深度判断\n\n很多人在学习八字时，常常困于简单的“身强身弱”判断。然而，真正决定命运层次的，是格局的纯粹与运行的通畅。本文将深入探讨几个关键的判断维度：\n\n1.  **清 vs 浊**：格局清者，用神得力，闲神不乱。浊者则用显而无力，忌神交战。\n2.  **真 vs 假**：真格局能够经受流年大运的冲击，假格局则容易在大运变换时功败垂成。\n\n...（此处省略长文内容）\n\nAI关联分析结果：[点击访问 Blackbox 分析页](blackboxId=BB001)\n`,
  comments: MOCK_POST_COMMENTS,
  blackboxAnalysisId: "BB001",
};

export const MOCK_MODERATION_ITEMS: ModerationItemModel[] = [
  {
    itemId: "m001",
    title: "测试AI对易经卦象的理解",
    authorAlias: MOCK_USER_ALIASES[4],
    type: "Post",
    submissionDate: "2025-11-12 09:00",
    status: "Pending",
  },
  {
    itemId: "m002",
    title: "命理师入驻资质审核",
    authorAlias: MOCK_MASTERS[1].realName,
    type: "Article",
    submissionDate: "2025-11-11 15:30",
    status: "Reviewing",
  },
];

export const MOCK_AI_ARTICLE: AIArticleModel = {
  articleId: "AIA001",
  title: "AI洞察：全球气候变暖对命理环境因子的影响研究",
  headerImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/72ae27d4-0877-42e8-9309-b6e3ae858fcf.png",
  contentMarkdown: `# AI 研究报告：环境因子与命运规律\n\n总AI权限分析发现，出生地环境因子（如湿度、纬度）对五行平衡的影响远超传统认知。报告详细分析了...\n\n(主体内容省略)\n\n相关数据 Blackbox ID: [BB020]\n`,
  generationDate: "2025-11-12",
  relatedForumPostId: MOCK_FORUM_POSTS[1].postId,
  relatedBlackboxId: "BB020",
};
        
      
    
    
      