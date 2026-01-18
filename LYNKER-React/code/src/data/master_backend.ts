
        
        
import { IconName } from "../types";

// 后台概览卡片模型
export interface BackendCardModel {
  id: string;
  title: string;
  iconName: IconName;
  description: string;
  targetPageId: string;
  colorHex: string; // 颜色模拟
}

export const MOCK_MASTER_BACKEND_NAV: BackendCardModel[] = [
{
    id: "studio",
    title: "工作室管理",
    iconName: "PanelLeft",
    description: "设置服务、管理日程与预约链接。",
    targetPageId: "master_studio_management",
    colorHex: "#5B21B6", // 紫色
  },
  {
    id: "records",
    title: "客户批命记录",
    iconName: "Archive",
    description: "查看和管理所有历史咨询记录与AI笔记。",
    targetPageId: "customer_prognosis_records_view",
    colorHex: "#D97706", // 金色
  },
  {
    id: "finance",
    title: "财务与结算",
    iconName: "Wallet",
    description: "查询收入、待结款项和交易流水。",
    targetPageId: "finance_center", // Fictional page
    colorHex: "#059669", // 绿色
  },
];
        
        
      