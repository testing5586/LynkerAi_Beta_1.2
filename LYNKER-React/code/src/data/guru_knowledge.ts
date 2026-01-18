
        
import { IconName } from "../types";

// 命理师记忆库中保存的知识片段
export interface SavedMemoryModel {
  memoryId: string;
  content: string; // 提取的文本内容
  sourceContext: string; // 来源（如：'与客户 user_001 的聊天记录' 或 '论坛文章 P001'）
  timestamp: string; // 保存时间
  tag?: string; // 用户自定义标签
}

export const MOCK_SAVED_MEMORIES: SavedMemoryModel[] = [
    {
        memoryId: "mem001",
        content: "客户反馈：预测的购房时机完全应验，成功避开银行利率高点。",
        sourceContext: "批命记录 mr001 的客户反馈",
        timestamp: "2025-11-15T10:00:00Z",
        tag: "应验案例",
    },
    {
        memoryId: "mem002",
        content: "AI断语提醒：注意丙火和申金的冲突，可能会导致合作关系破裂。",
        sourceContext: "AI生成笔记 note_ai_001",
        timestamp: "2025-11-15T11:30:00Z",
        tag: "高风险预警",
    },
    {
        memoryId: "mem003",
        content: "丁火的创造力来自其敏感和内在的温暖，但需要避免情绪化决策...",
        sourceContext: "灵客群组 g001 的群聊精华",
        timestamp: "2025-12-01T09:00:00Z",
        tag: "丁火身强",
    },
];

        
      