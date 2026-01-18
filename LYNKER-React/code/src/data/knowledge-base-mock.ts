
export const mockArticles = [
  {
    id: '1',
    title: '八字命理基础：五行相生相克',
    content: `八字命理中，五行相生相克是最基础的理论。相生关系为：木生火、火生土、土生金、金生水、水生木。相克关系为：木克土、土克水、水克火、火克金、金克木。

在实际应用中，我们需要根据命盘中各五行的强弱来判断吉凶。如果某个五行过强，则需要用相克的五行来制约；如果某个五行过弱，则需要用相生的五行来补助。

这是理解八字命理的基础，也是进行命理分析的重要工具。`,
    source: 'manual',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['八字', '基础理论'],
  },
  {
    id: '2',
    title: '紫微斗数：命宫主星解读',
    content: `紫微斗数中，命宫主星决定了一个人的基本性格和人生方向。紫微星代表帝王之气，具有领导力和权威性。天机星代表聪慧和变化，适合从事需要思考的工作。

不同的命宫主星组合会产生不同的性格特征和人生轨迹。通过分析命宫主星及其周围的星曜，我们可以更深入地了解一个人的性格、才能和潜力。`,
    source: 'manual',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['紫微', '命宫'],
  },
  {
    id: '3',
    title: '占星学入门：十二星座性格分析',
    content: `占星学中，太阳星座代表一个人的核心性格和自我认知。白羊座热情勇敢，金牛座稳重务实，双子座聪慧灵活...

每个星座都有其独特的性格特征和优缺点。通过了解自己的太阳星座、月亮星座和上升星座，我们可以更全面地认识自己。`,
    source: 'forum',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['占星', '星座'],
  },
  {
    id: '4',
    title: '我的命理研究笔记 - 2024年流年分析',
    content: `根据我的八字和紫微命盘，2024年是一个转变的年份。流年大运显示...

这一年我需要特别关注事业发展和人际关系。根据AI的分析，我应该...`,
    source: 'manual',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['笔记', '流年'],
  },
  {
    id: '5',
    title: '灵友分享：如何通过命理改善人生',
    content: `一位资深命理师分享了他的经验。他认为命理不仅是预测，更是一种自我认识和改善的工具。

通过了解自己的命盘，我们可以发现自己的优势和劣势，从而做出更好的人生选择...`,
    source: 'friend',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['分享', '人生'],
  },
];

export const mockAIProviders = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: 'Zap',
    description: '强大的通用AI模型',
    status: 'connected',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: 'Sparkles',
    description: '多模态AI助手',
    status: 'available',
  },
  {
    id: 'qwen',
    name: '阿里通义千问',
    icon: 'Zap',
    description: '中文优化的AI模型',
    status: 'available',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: 'Brain',
    description: '深度推理AI',
    status: 'available',
  },
];

export const mockChatHistory = [
  {
    id: '1',
    role: 'assistant' as const,
    content: '你好！我是您的命理研究助手。我可以帮助您分析命盘、解读命理知识，以及讨论您的研究笔记。请告诉我您想了解什么？',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    role: 'user' as const,
    content: '我想了解一下我的八字中五行的平衡情况。',
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    role: 'assistant' as const,
    content: `根据您的八字信息，您的五行分布如下：
- 木：2个（偏弱）
- 火：3个（适中）
- 土：1个（较弱）
- 金：2个（适中）
- 水：2个（适中）

您的命盘中土元素较弱，这可能影响您的稳定性和执行力。建议在生活中加强土元素的补充，比如穿着黄色衣物、佩戴黄水晶等。`,
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    relatedArticles: ['1'],
  },
];
