
        
import { IconName } from "../types";

export interface SubscriptionFeatureModel {
    id: string;
    description: string;
    iconName: IconName;
}

export interface SubscriptionPlanModel {
    id: "free" | "personal" | "pro";
    name: string;
    priceUsd: number;
    billingCycle: "Monthly" | "Annual";
    tokenCredit: number; // 算力额度
    features: SubscriptionFeatureModel[];
    isTrial: boolean;
}

const COMMON_FEATURES: SubscriptionFeatureModel[] = [
    { id: "ai_note", description: "AI咨询笔记自动生成", iconName: "Feather" },
    { id: "validation", description: "AI真命盘验证系统接入", iconName: "Fingerprint" },
    { id: "memory", description: "AI长期记忆库空间", iconName: "Brain" },
];

export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlanModel[] = [
    {
        id: "free",
        name: "免费版",
        priceUsd: 0,
        billingCycle: "Monthly",
        tokenCredit: 100,
        features: [
            ...COMMON_FEATURES,
            { id: "limit_video", description: "批命视频记录存储（限时）", iconName: "Video" },
        ],
        isTrial: true,
    },
    {
        id: "personal",
        name: "个人版",
        priceUsd: 20,
        billingCycle: "Monthly",
        tokenCredit: 1000,
        features: [
            ...COMMON_FEATURES,
            { id: "customer_portal", description: "客户记录管理系统", iconName: "Users" },
            { id: "custom_link", description: "自定义预约链接创建", iconName: "Link" },
        ],
        isTrial: false,
    },
    {
        id: "pro",
        name: "专业版",
        priceUsd: 40,
        billingCycle: "Monthly",
        tokenCredit: 2500,
        features: [
            ...COMMON_FEATURES,
            { id: "customer_portal", description: "客户记录管理系统", iconName: "Users" },
            { id: "custom_link", description: "自定义预约链接创建", iconName: "Link" },
            { id: "white_label", description: "去平台水印咨询室", iconName: "Globe" },
            { id: "advanced_rag", description: "高级RAG知识库索引", iconName: "Search" },
        ],
        isTrial: false,
    },
];
        
      