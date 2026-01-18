export interface AIAssistantModel {
  id: string;
  name: string;
  description: string;
  iconName: string;
  keySetupLinkUrl: string;
  keySetupLinkTitle: string;
}

export interface AIChatMessageModel {
  messageId: string;
  sender: 'user' | 'ai';
  content: string;
  isContextual: boolean;
  timestamp: string;
}

export interface AINoteDetailModel {
  id: string;
  title: string;
  timestamp: string;
  fullMarkdownContent: string;
  consultationRefId: string;
  aiModel: string;
  keyInsights: Array<{
    type: 'core' | 'warning' | 'suggestion';
    title: string;
    description: string;
  }>;
}

export interface AIAssistantSettingsModel {
  selectedModelId: string;
  reminderTone: string;
  enableRealtimeSubtitles: boolean;
  autoSaveNotes: boolean;
  tokenLimitAlertThreshold: number;
}

export const MOCK_AI_CHAT_HISTORY: AIChatMessageModel[] = [
  {
    messageId: 'msg_1',
    sender: 'ai',
    content: '你好！我是您的AI命理助手。我已准备好分析您的命盘，回答任何命理相关的问题。请告诉我您的出生日期和时间。',
    isContextual: false,
    timestamp: '14:30',
  },
  {
    messageId: 'msg_2',
    sender: 'user',
    content: '我的出生日期是1990年3月15日，上午9点30分。',
    isContextual: false,
    timestamp: '14:31',
  },
  {
    messageId: 'msg_3',
    sender: 'ai',
    content: '感谢您提供的信息。根据您的出生数据，我已生成您的八字和紫微斗数命盘。您是庚午年、丙寅月、戊申日、人士。您的八字显示您具有强大的意志力和进取心。',
    isContextual: false,
    timestamp: '14:32',
  },
];

export const MOCK_AI_NOTE_DETAIL: AINoteDetailModel = {
  id: 'note_ai_001',
  title: '2025年春季事业发展分析 - AI生成笔记',
  timestamp: '2025-01-15T14:30:00Z',
  fullMarkdownContent: `# 咨询记录分析

## 命盘概述
根据您的出生信息（1990年3月15日上午9:30），生成如下命盘分析：

### 八字信息
- **年干支**：庚午
- **月干支**：丙寅
- **日干支**：戊申
- **时干支**：甲巳

### 命格特点
您的八字显示具有以下特征：
- 强大的意志力和进取心
- 在事业上有较强的竞争意识
- 与他人合作时可能出现摩擦

## 2025年春季预测

### 整体运势
春季（1月-3月）为新一年的开始阶段，您将面临重要的事业变动机会。

### 关键时间节点
- **1月-2月**：适合启动新项目，重点投资时期
- **3月**：需谨慎，可能出现合作分歧

### 注意事项
丙火和申金的冲突在此阶段显现，可能导致：
1. 合作关系出现不和
2. 财务上的起伏
3. 的需要灵活调整策略

## 建议

### 短期行动（3月前）
- 避免签订长期合同
- 保持财务灵活性
- 加强与关键合作者的沟通

### 中期规划（3-6月）
- 观察形势发展
- 审视现有合作关系
- 准备调整策略

### 长期建议
关注丙火在农历四月后的变化，该时期运势将有明显改善。

## 参考资料
更多详细分析请参考完整的八字和紫微斗数命盘。`,
  consultationRefId: 'https://example.com/video/consultation_001',
  aiModel: 'ChatGPT',
  keyInsights: [
    {
      type: 'core',
      title: '本次咨询的核心主题',
      description: '分析命主在2025年春季的事业变动及其稳定性。',
    },
    {
      type: 'warning',
      title: 'AI断语提醒',
      description: '注意丙火和申金的冲突，可能会导致合作关系破裂。',
    },
    {
      type: 'suggestion',
      title: '建议行动',
      description: '在农历三月前，避免签订长期合同，灵活调整策略。',
    },
  ],
};

export const MOCK_AI_ASSISTANTS: AIAssistantModel[] = [
  {
    id: 'chatgpt5',
    name: 'ChatGPT5',
    description: '由OpenAI开发的先进语言模型，擅长自然对话和命理知识综合分析',
    iconName: 'MessageSquare',
    keySetupLinkUrl: 'https://platform.openai.com/api-keys',
    keySetupLinkTitle: '获取OpenAI API密钥',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'DeepSeek开发的深度推理AI模型，擅长逻辑分析和深层次思考，适合复杂命理推算',
    iconName: 'Brain',
    keySetupLinkUrl: 'https://platform.deepseek.com/api-keys',
    keySetupLinkTitle: '获取DeepSeek API密钥',
  },
  {
    id: 'gemini3',
    name: 'Gemini3',
    description: 'Google开发的多模态AI模型，支持图像分析，可用于八字卡片识别',
    iconName: 'Sparkles',
    keySetupLinkUrl: 'https://makersuite.google.com/app/apikey',
    keySetupLinkTitle: '获取Gemini API密钥',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: '阿里云开发的通义千问AI模型，擅长中文理解和生成，特别适合命理知识应用',
    iconName: 'Cloud',
    keySetupLinkUrl: 'https://dashscope.aliyun.com/api-key',
    keySetupLinkTitle: '获取Qwen API密钥',
  },
];

export const MOCK_AI_ASSISTANT_SETTINGS: AIAssistantSettingsModel = {
  selectedModelId: 'chatgpt5',
  reminderTone: 'Professional',
  enableRealtimeSubtitles: true,
  autoSaveNotes: true,
  tokenLimitAlertThreshold: 80,
};