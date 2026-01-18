
        
          
import { IconName } from "../types";

// 投票选项模型 (用于 compact 投票组件)
export interface VotingOptionModel {
  id: "perfect" | "accurate" | "reserved" | "inaccurate" | "not_me" | "nonsense";
  label: string;
  iconName: IconName;
  tooltip: string;
}

export const MOCK_FORUM_VOTING_OPTIONS: VotingOptionModel[] = [
{
    id: "perfect",
    label: "准！我就是",
    iconName: "Target",
    tooltip: "完全吻合我的亲身经历和命盘特点！",
  },
  {
    id: "accurate",
    label: "准",
    iconName: "CheckCircle",
    tooltip: "预测或分析大致准确。",
  },
  {
    id: "reserved",
    label: "有保留",
    iconName: "Tent",
    tooltip: "部分精准，但有需要商榷的地方。",
  },
  {
    id: "inaccurate",
    label: "不准",
    iconName: "XCircle",
    tooltip: "预测与事实不符。",
  },
  {
    id: "not_me",
    label: "不准！我不是",
    iconName: "User",
    tooltip: "预测不符合我的特征和情况。",
  },
  {
    id: "nonsense",
    label: "胡扯",
    iconName: "MessageCircleOff",
    tooltip: "内容完全不可信或逻辑混乱。",
  },
];
          
        
      