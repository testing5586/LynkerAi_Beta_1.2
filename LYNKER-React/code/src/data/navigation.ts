
        
import { IconName } from "../types";

// 顶部导航栏和侧边栏模型
export interface NavLinkModel {
  id: string;
  name: string;
  iconName: IconName;
  targetPageId: string;
}

// 首页核心功能卡片模型
export interface NavFeatureModel {
    id: string;
    title: string;
    description: string;
    iconName: IconName;
    imageUrl: string;
}

// 首页顶部英雄区数据
export interface HomeHeroModel {
    slogan: string;
    description: string;
    imageUrl: string;
}

export const MOCK_HOME_HERO: HomeHeroModel = {
    slogan: "同命相知。",
    description: "灵客AI：命理服务、AI验证与同命社交的未来平台。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/99909b28-6acf-4556-82b2-2bf445faab94.png",
}

export const MOCK_CORE_FEATURES: NavFeatureModel[] = [
    {
        id: "service",
        title: "命理服务预约",
        description: "连接全球Pro命理师，开启您的专属咨询。",
        iconName: "Calendar",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/c9279bbd-45da-4f61-8df1-86ceda4aca30.png"
    },
    {
        id: "match",
        title: "同命匹配社交",
        description: "用命盘找到灵魂同频者，建立深度连接。",
        iconName: "Users",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/aff1b44d-44ed-4bbf-ac8c-038d749cc2cb.png"
    },
    {
        id: "ai_kb",
        title: "AI知识库与验证",
        description: "自动生成咨询笔记，验证预言应验情况。",
        iconName: "Zap",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/e90e656e-f118-47bb-8357-96d3199d4e06.png"
    },
];

export const MOCK_MAIN_NAVIGATION: NavLinkModel[] = [
    { id: "home", name: "首页", iconName: "Home", targetPageId: "home_page" },
    { id: "service", name: "命理服务", iconName: "Wand2", targetPageId: "prognosis_service_entry" },
    { id: "match", name: "同命匹配", iconName: "Users", targetPageId: "homology_match_discovery" },
    { id: "forum", name: "论坛", iconName: "MessageCircle", targetPageId: "forum_homepage" },
    { id: "kb", name: "知识库", iconName: "BookOpen", targetPageId: "knowledge_base_main" },
];
        
      