
        
        
import { IconName } from "../types";

// 地区选择项
export interface GeoOptionModel {
  code: string; // ISO Code e.g., CN, US
  name: string; // 地区名称
  type: "Country" | "Region";
}

// 文化宗教选项
export interface CultureOptionModel {
  id: string;
  name: string;
}

export const MOCK_GEO_OPTIONS: GeoOptionModel[] = [
  { code: "CN", name: "中国", type: "Country" },
  { code: "US", name: "美国", type: "Country" },
  { code: "SG", name: "新加坡", type: "Country" },
  { code: "JP", name: "日本", type: "Country" },
  
  { code: "SC", name: "四川省", type: "Region" },
  { code: "CA", name: "加利福尼亚州", type: "Region" },
];

export const MOCK_CULTURE_OPTIONS: CultureOptionModel[] = [
  { id: "buddhism", name: "佛教" },
  { id: "daoism", name: "道家文化" },
  { id: "christianity", name: "基督教" },
  { id: "secular", name: "无宗教信仰" },
];

// 注册身份选择卡片
export interface RegistrationTypeCardModel {
    typeId: "user" | "master";
    title: string;
    description: string;
    iconName: IconName;
    imageUrl: string;
}

export const MOCK_REGISTRATION_TYPES: RegistrationTypeCardModel[] = [
    {
        typeId: "user",
        title: "普通用户 (探索者)",
        description: "使用假名注册，探索命理，寻找同命人。",
        iconName: "User",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/15/27b5f9b1-c49b-49b4-85eb-de52041efa8c.png",
    },
    {
        typeId: "master",
        title: "专业命理师 (专家)",
        description: "实名认证，提供专业咨询服务，建立个人工作室。",
        iconName: "GraduationCap",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/15/daeb343e-59f6-4ac6-9689-008242b0d215.png",
    },
];

export const MOCK_REGISTRATION_BACKGROUND: string = "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/15/aa22111d-7738-45c8-8d3b-5a5901f4f3ab.png";
        
      
      