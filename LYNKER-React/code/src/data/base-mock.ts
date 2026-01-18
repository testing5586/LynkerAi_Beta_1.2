import type { MasterSummaryModel } from "./user";

// 假名列表 (至少5个字)
export const MOCK_USER_ALIASES: string[] = [
  "星空下的观测者Q",
  "太乙神数研究员",
  "紫微命盘探索家",
  "风水奇门爱好者",
  "命运轨迹追寻者W",
];

export const MOCK_MASTERS: MasterSummaryModel[] = [
  {
    masterId: "master_001",
    realName: "张三丰 (道号: 玄真子)",
    alias: "玄真子",
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5d8a6ed2-2973-41b9-a0ca-01cee48773d8.png",
    geoTag: { country: "中国", region: "四川成都", flagIcon: "CN" },
    expertise: "八字, 纳音五行",
    rating: 4.9,
    serviceCount: 1540,
    priceMin: 800,
  },
  {
    masterId: "master_002",
    realName: "李明娜 (英文名: Luna Lee)",
    alias: "星辰引路人",
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f9938d73-c92b-4a30-80a2-b333552f20d9.png",
    geoTag: { country: "美国", region: "加利福尼亚州", flagIcon: "US" },
    expertise: "西方占星术, 心理占星",
    rating: 4.8,
    serviceCount: 980,
    priceMin: 950,
  },
  {
    masterId: "master_003",
    realName: "王道一",
    alias: "紫微天机",
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/1ca11d36-3115-4b29-90bd-95a9c7adfdf3.png",
    geoTag: { country: "中国", region: "香港", flagIcon: "HK" },
    expertise: "紫微斗数, 奇门遁甲",
    rating: 5.0,
    serviceCount: 2300,
    priceMin: 1200,
  },
  {
    masterId: "master_004",
    realName: "Ayako Sato (佐藤彩子)",
    alias: "未来之眼",
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/a038e486-ebb8-4f85-8972-dc309daa9819.png",
    geoTag: { country: "日本", region: "东京", flagIcon: "JP" },
    expertise: "日本占术, 易学",
    rating: 4.7,
    serviceCount: 650,
    priceMin: 600,
  },
  {
    masterId: "master_005",
    realName: "Kiran Singh",
    alias: "吠陀之光",
    avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/c7a2e7de-e44c-4a5f-9c56-2d7f54d72e56.png",
    geoTag: { country: "印度", region: "孟买", flagIcon: "IN" },
    expertise: "吠陀占星术",
    rating: 4.9,
    serviceCount: 1120,
    priceMin: 700,
  },
];