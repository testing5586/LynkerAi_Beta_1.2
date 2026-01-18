
        
import { IconName } from "../types";

// 命理服务类型 (用于入口页和服务筛选)
export interface ServiceTypeModel {
  id: string;
  name: string;
  iconName: IconName;
  description: string;
  imageUrl: string;
}

// 命理师提供的具体服务项目
export interface ServiceOfferedModel {
  serviceId: string;
  type: string; // 八字 / 紫微 / 占星
  name: string;
  durationMinutes: number;
  priceMin: number; // 最低价格 (RMB)
  isPopular: boolean;
  description: string;
}

export const MOCK_SERVICE_TYPES: ServiceTypeModel[] = [
  {
    id: "bazi",
    name: "八字命理",
    iconName: "BarChart3",
    description: "通过年、月、日、时四柱推算一生运势与性格特质。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/b647c599-41c8-44e2-b005-34215822c0db.png",
  },
  {
    id: "ziwei",
    name: "紫微斗数",
    iconName: "Star",
    description: "以星曜落宫排布推测个人福分、事业、婚姻及健康状况。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/ff7a71c9-25cb-4d32-a69a-2c6902cd560a.png",
  },
  {
    id: "astrology",
    name: "西方占星术",
    iconName: "Compass",
    description: "基于行星位置和星座宫位解析个人天赋和生命周期挑战。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/e3a27e4b-06d3-4f68-b9de-0853e4e3e0a8.png",
  },
];

export const MOCK_SERVICES_OFFERED: ServiceOfferedModel[] = [
  {
    serviceId: "sv001",
    type: "八字",
    name: "八字终身运势精批",
    durationMinutes: 90,
    priceMin: 800,
    isPopular: true,
    description: "深入分析大运流年，涵盖事业、财运、婚姻、健康。",
  },
  {
    serviceId: "sv002",
    type: "紫微",
    name: "紫微星盘婚姻详论",
    durationMinutes: 60,
    priceMin: 650,
    isPopular: false,
    description: "重点解读夫妻宫、子女宫，提供情感指导。",
  },
  {
    serviceId: "sv003",
    type: "占星术",
    name: "西方本命盘解读与指导",
    durationMinutes: 45,
    priceMin: 480,
    isPopular: true,
    description: "针对出生盘的相位和宫位进行天赋和挑战分析。",
  },
];
        
      