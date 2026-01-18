
        
import { MOCK_AI_ASSISTANTS, AIAssistantModel } from "./ai_settings";

// 命盘输入参数
export interface PrognosisInputModel {
  birthDate: string; // YYYY-MM-DD
  birthTimeHour: number; // 0-23
  birthTimeMinute: number; // 0-59
  birthLocation: string;
}

// AI Agent 分析结果模型
export interface PrognosisAgentResultModel {
  agent: AIAssistantModel;
  analysisTitle: string;
  interpretationMarkdown: string;
  confidenceScore: number; // 0-100
}

export const MOCK_PROGNOSIS_INPUT: PrognosisInputModel = {
    birthDate: "1988-08-08",
    birthTimeHour: 7,
    birthTimeMinute: 30,
    birthLocation: "中国 湖北 武汉",
};

export const MOCK_PROGNOSIS_AGENT_RESULTS: PrognosisAgentResultModel[] = [
    {
        agent: MOCK_AI_ASSISTANTS[0], // ChatGPT
        analysisTitle: "八字格局倾向：正官格，身强需抑制。",
        interpretationMarkdown: "ChatGPT分析认为命主日主偏强，需以官杀制身，适宜从事公职或管理岗位。建议出生时间微调至 7:25 以增强官星力量。",
        confidenceScore: 85,
    },
    {
        agent: MOCK_AI_ASSISTANTS[1], // Qwen
        analysisTitle: "紫微盘断：命宫天府，财富与领导力并存。",
        interpretationMarkdown: "通义千问侧重紫微，分析天府在命宫，但受到陀罗干扰，建议避免创业初期过于激进的扩张策略。认为 7:30 出生盘面最为合理。",
        confidenceScore: 92,
    },
    {
        agent: MOCK_AI_ASSISTANTS[2], // Gemini
        analysisTitle: "西方占星：群星集中在事业宫。",
        interpretationMarkdown: "Gemini结合出生地环境因子分析，指出群星集中在第十宫，工作狂倾向明显。建议平衡工作与家庭。对时间精确度要求较高。",
        confidenceScore: 78,
    },
];
        
      