
        
        
import { IconName } from "../types";

// 模拟运势曲线数据点
export interface PrognosisCurveDataItem {
  year: number;
  value: number; // 运势得分 (0-100)
}

// 运势曲线图模型
export interface PrognosisCurveDataModel {
  title: string;
  description: string;
  data: PrognosisCurveDataItem[];
}

// 用户仪表板快捷功能
export interface DashboardQuickLinkModel {
  id: string;
  title: string;
  iconName: IconName;
  targetPageId: string;
}

export const MOCK_YEARLY_PROGNOSIS_CURVE: PrognosisCurveDataModel = {
  title: "未来五年流年运势概览",
  description: "命主身弱，印星为用。流年运势波动主要受金木水五行影响。",
  data: [
    { year: 2024, value: 65 },
    { year: 2025, value: 80 },
    { year: 2026, value: 55 },
    { year: 2027, value: 70 },
    { year: 2028, value: 90 },
  ],
};

export const MOCK_DASHBOARD_QUICK_LINKS: DashboardQuickLinkModel[] = [
  {
    id: "match_settings",
    title: "同命筛选设置",
    iconName: "sliders",
    targetPageId: "homology_match_discovery",
  },
  {
    id: "chat_room",
    title: "同命聊天室",
    iconName: "message-circle-code",
    targetPageId: "message_center",
  },
  {
    id: "alchemy_room",
    title: "炼丹房",
    iconName: "flask-conical",
    targetPageId: "forum_homepage", // Simulate as a sub-section of forum/lab
  },
];

export const MOCK_USER_DASHBOARD_INFO = {
    uid: "LXAI706040",
    subscriptionPlan: "至尊会员",
    apiTokenBalance: "12,500 tokens",
    // 更多信息如头像和昵称应从 user.ts 导入
}
        
        
      