import { GeoTagModel, MOCK_USER_ALIASES } from "./user";
import { IconName } from "../types";

// 同命人匹配摘要模型（卡片视图）
export interface HomologyMatchModel {
  matchId: string;
  alias: string; // 假名
  avatarUrl: string;
  geoTag: GeoTagModel;
  matchPercentage: number;
  mainStarOrPillar: string; // 命盘摘要，如：主星 '天府' 或 日主 '甲木'
  interestTags: string[];
}

// 同命人公开资料视图 (Profile View)
export interface HomologyProfileViewModel {
    matchId: string;
    alias: string;
    avatarUrl: string;
    geoTag: GeoTagModel;
    matchPercentage: number;
    baziSummary: string;
    ziweiSummary: string;
    interestTags: string[];
    isOnline: boolean;
}

// 同命筛选器的详细模型 (用于同命发现页)
export interface HomologyFilterModel {
    matchDimension: "Bazi" | "Ziwei" | "Astrology" | "ModernTime";
    timeOptions: { label: string; key: string; isChecked: boolean }[];
    baziOptions: { label: string; key: string; isChecked: boolean }[];
    ziweiOptions: { label: string; key: string; isChecked: boolean }[];
    emptyHouseOptions: { label: string; key: string; isChecked: boolean }[];
    astrologyOptions: { label: string; key: string; isChecked: boolean }[];
    mbtiOptions: { label: string; key: string; isChecked: boolean }[];
    customZiweiStars: string;
}

// 同频排行榜单项
export interface HomologyRankItemModel {
    userId: string;
    alias: string;
    avatarUrl: string;
    matchScore: number;
    rank: number;
}

// 同频排行榜模型
export interface HomologyRankingModel {
    id: "ModernTime" | "Bazi" | "Ziwei";
    title: string;
    rankList: HomologyRankItemModel[];
}

export const MOCK_MATCH_PROFILES: HomologyMatchModel[] = [
  {
    matchId: "hm001",
    alias: MOCK_USER_ALIASES[1],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5d3ae278-248b-4489-9a09-6a5c9eb31912.png",
    geoTag: { country: "中国", region: "上海", flagIcon: "CN" },
    matchPercentage: 92,
    mainStarOrPillar: "日元：乙木",
    interestTags: ["国学", "冥想", "科技"],
  },
  {
    matchId: "hm002",
    alias: MOCK_USER_ALIASES[2],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/84fe2122-c6a6-4adc-9282-ed9f63c49012.png",
    geoTag: { country: "新加坡", region: "新加坡", flagIcon: "SG" },
    matchPercentage: 88,
    mainStarOrPillar: "命宫：紫微",
    interestTags: ["金融", "旅游", "素食"],
  },
  {
    matchId: "hm003",
    alias: MOCK_USER_ALIASES[3],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png",
    geoTag: { country: "加拿大", region: "多伦多", flagIcon: "CA" },
    matchPercentage: 79,
    mainStarOrPillar: "上升星座：天蝎",
    interestTags: ["写作", "电影", "咖啡"],
  },
  {
    matchId: "hm004",
    alias: MOCK_USER_ALIASES[4],
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/9bb9095f-990c-4219-bc29-637b448baa18.png",
    geoTag: { country: "英国", region: "伦敦", flagIcon: "GB" },
    matchPercentage: 75,
    mainStarOrPillar: "日主：丁火",
    interestTags: ["编程", "户外", "哲学"],
  },
];

export const MOCK_HOMOLOGY_PROFILE: HomologyProfileViewModel = {
    ...MOCK_MATCH_PROFILES[0],
    baziSummary: "身弱用印，日坐正官，性格稳重，但需注意健康。",
    ziweiSummary: "命宫武曲化权，事业心强，适宜在管理岗位发展。",
    isOnline: true,
}

const MOCK_RANK_ITEMS: HomologyRankItemModel[] = MOCK_MATCH_PROFILES.slice(0, 3).map((p, index) => ({
    userId: p.matchId,
    alias: p.alias,
    avatarUrl: p.avatarUrl,
    matchScore: p.matchPercentage + (3 - index) * 2,
    rank: index + 1,
}));

export const MOCK_HOMOLOGY_RANKINGS: HomologyRankingModel[] = [
    {
        id: "ModernTime",
        title: "现代时间榜",
        rankList: MOCK_RANK_ITEMS.map(item => ({...item, matchScore: item.matchScore - 5})),
    },
    {
        id: "Bazi",
        title: "八字同频榜",
        rankList: MOCK_RANK_ITEMS,
    },
    {
        id: "Ziwei",
        title: "紫薇同频榜",
        rankList: MOCK_RANK_ITEMS.map(item => ({...item, matchScore: item.matchScore - 2})),
    },
];

export const MOCK_HOMOLOGY_FILTERS: HomologyFilterModel = {
    matchDimension: "Bazi",
    timeOptions: [
        { label: "同年同月同日", key: "year_month_day", isChecked: true },
        { label: "同时辰", key: "shichen", isChecked: false },
        { label: "同小时", key: "hour", isChecked: false },
        { label: "同刻", key: "tonggke", isChecked: false },
        { label: "同分", key: "tongfen", isChecked: false },
    ],
    baziOptions: [
        { label: "同年月日柱", key: "ymd", isChecked: true },
        { label: "同时柱", key: "shichun", isChecked: false },
        { label: "同天干结构", key: "tiangan_struct", isChecked: false },
        { label: "同地支结构", key: "dizhi_struct", isChecked: false },
        { label: "同格局", key: "geju", isChecked: false },
        { label: "同喜用神", key: "xiyongshen", isChecked: false },
    ],
ziweiOptions: [
         { label: "同格局", key: "geju", isChecked: false },
         { label: "相似命盘", key: "similar_chart", isChecked: false },
         { label: "命宫同主星+三方四正同主星", key: "main_star_threeway", isChecked: false },
     ],
    emptyHouseOptions: [
         { label: "财帛", key: "wealth", isChecked: true },
         { label: "官禄", key: "career", isChecked: true },
         { label: "夫妻", key: "spouse", isChecked: true },
         { label: "子女", key: "children", isChecked: true },
         { label: "福德", key: "blessing", isChecked: true },
         { label: "田宅", key: "property", isChecked: true },
     ],
    astrologyOptions: [
        { label: "同太阳星座", key: "sun_sign", isChecked: false },
        { label: "同月亮星座", key: "moon_sign", isChecked: false },
        { label: "同上升星座", key: "rising_sign", isChecked: false },
        { label: "同金星星座", key: "venus_sign", isChecked: false },
    ],
    mbtiOptions: [
        { label: "完全相同", key: "identical", isChecked: false },
        { label: "同内向/外向", key: "ie", isChecked: false },
        { label: "同感知方式", key: "sn", isChecked: false },
        { label: "同决策方式", key: "tf", isChecked: false },
        { label: "同计划方式", key: "jp", isChecked: false },
    ],
    customZiweiStars: "",
};