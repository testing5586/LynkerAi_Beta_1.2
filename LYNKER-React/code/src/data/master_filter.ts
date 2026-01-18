
        
          
import { IconName } from "../types";

// 命理师筛选维度
export interface MasterFilterOptionModel {
  key: string;
  label: string;
}

// 命理师排序选项
export interface MasterSortOptionModel {
  key: "rating" | "serviceCount" | "price" | "default";
  label: string;
  iconName: IconName;
}

// 专业领域选项 (用于筛选和注册表单)
export interface MasterExpertiseModel {
    id: string;
    name: string;
    iconName: IconName;
}

export const MOCK_MASTER_EXPERTISE: MasterExpertiseModel[] = [
    { id: "bazi", name: "八字命理", iconName: "BarChart3" },
    { id: "ziwei", name: "紫微斗数", iconName: "Star" },
    { id: "astrology", name: "西方占星", iconName: "Compass" },
    { id: "qimen", name: "奇门遁甲", iconName: "Sword" },
    { id: "fengshui", name: "风水堪舆", iconName: "Home" },
];

export const MOCK_MASTER_FILTERS: MasterFilterOptionModel[] = [
  { key: "top_rated", label: "高分推荐" },
  { key: "bazi_only", label: "只看八字" },
  { key: "available_now", label: "实时在线" },
];

export const MOCK_MASTER_SORT_OPTIONS: MasterSortOptionModel[] = [
  { key: "default", label: "默认排序", iconName: "ListStart" },
  { key: "rating", label: "评分最高", iconName: "Star" },
  { key: "serviceCount", label: "服务量最多", iconName: "Users" },
  { key: "price", label: "价格最低", iconName: "DollarSign" },
];

          
        
      