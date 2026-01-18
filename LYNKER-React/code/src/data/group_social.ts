import { IconName } from "../types";
import { MOCK_USER_ALIASES, UserSummaryModel } from "./base-mock";
import { ForumPostSummaryModel, CommentModel } from "./forum";
import type { VoterInfo } from "@/components/page-944545/VoterCard";

// 社交群组模型 (群组页)
export interface GroupModel {
  groupId: string;
  name: string;
  imageUrl: string;
  creatorAlias: string;
  memberCount: number;
  description: string;
  isJoined: boolean;
  groupPost: Omit<ForumPostSummaryModel, "description"> & { totalComments: number; contentPreview: string; tags: string[] }; // 简化以适应群组中心的摘要
}

// 在线灵友模型 (用于群组/聊天室右侧栏)
export interface OnlineFriendModel extends UserSummaryModel {
    isHomologyMatch: boolean; // 是否是同命匹配用户
}

// 炼丹房（外部内容验证）帖子模型
export interface AlchemyPostModel {
  alchemyPostId: string;
  title: string;
  externalAuthor: string;
  platform: string;
  originalUrl: string;
  thumbnailUrl: string;
  dateImported: string;
  totalVotes: number;
  votes: { [key: string]: number }; // 使用 VotingOptionModel ID作为键，存储票数
  comments: CommentModel[];
  voters?: {
    perfect: VoterInfo[];
    accurate: VoterInfo[];
    reserved: VoterInfo[];
    inaccurate: VoterInfo[];
    nonsense: VoterInfo[];
  };
}

// 灵客官方邀请函模型
export interface InviteCardModel {
  inviteId: string;
  targetContentTitle: string;
  originalPlatform: string;
  shortUrl: string;
  qrCodeUrl: string;
  inviteMessage: string;
}

export const MOCK_GROUP: GroupModel = {
  groupId: "g001",
  name: "丁火身强群 | 探索火性力量",
  imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/d37c7429-e1d6-4ad6-95d5-534d8b5a107b.png",
  creatorAlias: MOCK_USER_ALIASES[4],
  memberCount: 235,
  description: "汇聚丁火日主身强、喜用土金的同命灵友，交流火性命格的优势与挑战。",
  isJoined: true,
  groupPost: {
    postId: "gp001",
    title: "【群组交流】丁火如何在职场中发挥最大的创造力？",
    authorAlias: MOCK_USER_ALIASES[4],
    isMasterPost: false,
    accurateVotes: 78,
    inaccurateVotes: 5,
    date: "2025-11-12",
    totalComments: 34,
    contentPreview: "我认为丁火的创造力来自其敏感和内在的温暖，但需要避免情绪化决策...",
    tags: ["丁火", "命格分析", "职场发展"],
  },
};

export const MOCK_ONLINE_FRIENDS: OnlineFriendModel[] = [
    {
        userId: "online_u001",
        alias: MOCK_USER_ALIASES[1],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/253f126f-b695-4211-9a9d-e7a8ada74321.png",
        geoTag: { country: "中国", region: "上海", flagIcon: "CN" },
        isHomologyMatch: true,
    },
    {
        userId: "online_u002",
        alias: MOCK_USER_ALIASES[3],
        avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/05725283-a5ea-4b9d-bfbd-fffe38ee5b15.png",
        geoTag: { country: "加拿大", region: "多伦多", flagIcon: "CA" },
        isHomologyMatch: false,
    },
];

const MOCK_VOTERS: {
  perfect: VoterInfo[];
  accurate: VoterInfo[];
  reserved: VoterInfo[];
  inaccurate: VoterInfo[];
  nonsense: VoterInfo[];
} = {
  perfect: [
    {
      voterId: "voter_p1",
      alias: "星空下的观测者Q",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png",
      country: "中国",
      region: "深圳",
      birthplace: "广东",
      culturalBackground: "汉族传统文化",
      religion: "道教信仰",
      bloodType: "A型",
      voteType: "perfect",
      flagIcon: "CN",
      timestamp: "2025-11-13 14:00",
    },
    {
      voterId: "voter_p2",
      alias: "太乙神数研究员",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/253f126f-b695-4211-9a9d-e7a8ada74321.png",
      country: "中国",
      region: "上海",
      birthplace: "浙江",
      culturalBackground: "汉族传统文化",
      religion: "佛教信仰",
      bloodType: "O型",
      voteType: "perfect",
      flagIcon: "CN",
      timestamp: "2025-11-13 15:30",
    },
    {
      voterId: "voter_p3",
      alias: "紫微命盘探索家",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/05725283-a5ea-4b9d-bfbd-fffe38ee5b15.png",
      country: "新加坡",
      region: "中央区",
      birthplace: "新加坡",
      culturalBackground: "汉族/多元文化融合",
      religion: "道教与佛教结合",
      bloodType: "B型",
      voteType: "perfect",
      flagIcon: "SG",
      timestamp: "2025-11-13 16:45",
    },
    {
      voterId: "voter_p4",
      alias: "风水奇门爱好者",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/71873477-5198-4aac-951c-68342a22c0b9.png",
      country: "美国",
      region: "加州",
      birthplace: "台湾",
      culturalBackground: "汉族跨界文化",
      religion: "无特定信仰",
      bloodType: "AB型",
      voteType: "perfect",
      flagIcon: "US",
      timestamp: "2025-11-13 17:20",
    },
  ],
  accurate: [
    {
      voterId: "voter_a1",
      alias: "命运轨迹追寻者W",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f9938d73-c92b-4a30-80a2-b333552f20d9.png",
      country: "中国",
      region: "北京",
      birthplace: "河北",
      culturalBackground: "汉族传统文化",
      religion: "无特定信仰",
      bloodType: "O型",
      voteType: "accurate",
      flagIcon: "CN",
      timestamp: "2025-11-13 14:15",
    },
    {
      voterId: "voter_a2",
      alias: "西洋占星学研究者",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/d37c7429-e1d6-4ad6-95d5-534d8b5a107b.png",
      country: "英国",
      region: "伦敦",
      birthplace: "伦敦",
      culturalBackground: "欧洲文化传统",
      religion: "基督教",
      bloodType: "A型",
      voteType: "accurate",
      flagIcon: "GB",
      timestamp: "2025-11-13 18:00",
    },
  ],
  reserved: [
    {
      voterId: "voter_r1",
      alias: "中西合璧研究者",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/1ca11d36-3115-4b29-90bd-95a9c7adfdf3.png",
      country: "日本",
      region: "东京",
      birthplace: "京都",
      culturalBackground: "日本神道及汉文化",
      religion: "神道教与佛教",
      bloodType: "B型",
      voteType: "reserved",
      flagIcon: "JP",
      timestamp: "2025-11-13 19:00",
    },
  ],
  inaccurate: [
    {
      voterId: "voter_in1",
      alias: "批判性思维爱好者",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/a038e486-ebb8-4f85-8972-dc309daa9819.png",
      country: "澳大利亚",
      region: "悉尼",
      birthplace: "悉尼",
      culturalBackground: "西方理性主义",
      religion: "无宗教信仰",
      bloodType: "O型",
      voteType: "inaccurate",
      flagIcon: "AU",
      timestamp: "2025-11-13 20:00",
    },
  ],
  nonsense: [
    {
      voterId: "voter_ns1",
      alias: "独立评论家",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/c7a2e7de-e44c-4a5f-9c56-2d7f54d72e56.png",
      country: "印度",
      region: "孟买",
      birthplace: "班加罗尔",
      culturalBackground: "印度教传统",
      religion: "印度教",
      bloodType: "A型",
      voteType: "nonsense",
      flagIcon: "IN",
      timestamp: "2025-11-13 21:00",
    },
  ],
};

export const MOCK_ALCHEMY_POST: AlchemyPostModel = {
  alchemyPostId: "alb001",
  title: "知名命理师预测：2026年经济大趋势与个人机遇",
  externalAuthor: "B站-玄机老道",
  platform: "Bilibili",
  originalUrl: "https://www.bilibili.com/video/BVxxxxx",
  thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/71873477-5198-4aac-951c-68342a22c0b9.png",
  dateImported: "2025-11-13",
  totalVotes: 154,
  votes: {
    perfect: 56, // 准！我就是
    accurate: 80, // 准
    reserved: 10, // 有保留
    inaccurate: 5, // 不准
    nonsense: 3, // 胡扯
  },
  voters: MOCK_VOTERS,
  comments: [
    {
      commentId: "alc001",
      authorAlias: MOCK_USER_ALIASES[0],
      authorAvatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png",
      content: "我听了这一期，关于房地产的预测感觉很到位，已经记录到我的验证库中了。",
      date: "2025-11-13 14:00",
      geoTag: { country: "中国", region: "深圳", flagIcon: "CN" },
      userVote: "perfect",
    },
  ],
};

export const MOCK_INVITE_CARD: InviteCardModel = {
  inviteId: "inv001",
  targetContentTitle: "2026年经济大趋势与个人机遇",
  originalPlatform: "B站-玄机老道",
  shortUrl: "https://lynker.ai/A/XyZ7P",
  qrCodeUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/47b2f4f8-b7c4-4a99-899d-baf37e90306f.png",
  inviteMessage: "灵友邀请：快来灵客AI炼丹房，为这个内容投票验证吧！",
};

export const MOCK_ALCHEMY_HERO_IMAGE: string = "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/58bc077b-7011-459f-816c-6b4d5dba9a29.png";