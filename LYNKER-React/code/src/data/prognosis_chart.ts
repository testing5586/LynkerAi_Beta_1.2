
        

        
          
// 运势曲线图数据点
export interface CurveDataItem {
  year: number;
  value: number; // 运势得分 (0-100)
}

// 包含预测来源信息的曲线
export interface PrognosisCurveSource {
  sourceId: string; // Master ID or AI System
  sourceName: string; // 命理师/AI系统名称
  color: string; // 曲线颜色 (e.g., #5B21B6)
  data: CurveDataItem[];
}

// 多线运势曲线模型 (用于用户对比不同命理师的预测)
export interface MultiMasterCurveDataModel {
  title: string;
  startDate: number;
  endDate: number;
  curves: PrognosisCurveSource[];
}

// 流年运势预警模型
export interface PrognosisWarningModel {
  year: number;
  type: "Health" | "Disaster" | "Finance"; // 健康, 祸福, 财务
  severity: "High" | "Medium" | "Low";
  description: string;
}

export const MOCK_MULTI_MASTER_CURVES: MultiMasterCurveDataModel = {
  title: "我的批命对比曲线图 (2024-2028)",
  startDate: 2024,
  endDate: 2028,
  curves: [
    {
      sourceId: "master_001",
      sourceName: "玄真子 (八字)",
      color: "#D97706", // 金色
      data: [
        { year: 2024, value: 65 },
        { year: 2025, value: 80 },
        { year: 2026, value: 50 },
        { year: 2027, value: 75 },
        { year: 2028, value: 90 },
      ],
    },
    {
      sourceId: "master_002",
      sourceName: "星辰引路人 (占星)",
      color: "#5B21B6", // 紫色
      data: [
        { year: 2024, value: 72 },
        { year: 2025, value: 65 },
        { year: 2026, value: 85 },
        { year: 2027, value: 60 },
        { year: 2028, value: 70 },
      ],
    },
    {
      sourceId: "ai_system",
      sourceName: "总AI系统 (平均预测)",
      color: "#3B82F6", // 蓝色
      data: [
        { year: 2024, value: 68 },
        { year: 2025, value: 73 },
        { year: 2026, value: 68 },
        { year: 2027, value: 69 },
        { year: 2028, value: 80 },
      ],
    },
  ],
};

export const MOCK_PROGNOSIS_WARNINGS: PrognosisWarningModel[] = [
    {
        year: 2026,
        type: "Health",
        severity: "High",
        description: "2026年逢金克木，需重点关注肝肾健康，避免过度劳累。"
    },
    {
        year: 2027,
        type: "Finance",
        severity: "Medium",
        description: "七杀流年，投资策略偏向保守，避免大额投机。"
    },
];
          
        
      
    