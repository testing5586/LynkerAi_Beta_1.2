
        
          
import { IconName } from "../types";

// 用户后台导航模型
export interface UserBackendNavModel {
  id: string;
  title: string;
  iconName: IconName;
  description: string;
  targetPageId: string;
}

export const MOCK_USER_BACKEND_NAV: UserBackendNavModel[] = [
  {
    id: "prognosis_records",
    title: "我的批命记录",
    iconName: "ScrollText",
    description: "查看和对比所有命理师的历史咨询记录。",
    targetPageId: "page_944726", // 批命记录视图
  },
  {
    id: "homology_match",
    title: "同命匹配设置",
    iconName: "Users",
    description: "管理同命筛选偏好和查看总览。",
    targetPageId: "homology_match_discovery",
  },
  {
    id: "social_feed",
    title: "灵友圈动态",
    iconName: "Rss",
    description: "查看朋友和群组的最新动态。",
    targetPageId: "page_944865", // 灵友圈
  },
  {
    id: "knowledge_base",
    title: "知识库与笔记",
    iconName: "BookOpen",
    description: "我的研究笔记和AI自动整理的咨询摘要。",
    targetPageId: "knowledge_base_main",
  },
];
          
        
      