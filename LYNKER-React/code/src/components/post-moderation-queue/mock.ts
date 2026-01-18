
export interface ModerationItem {
  id: string;
  type: 'post' | 'article';
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  tags?: string[];
  reason?: string;
}

export const moderationQueueMock: ModerationItem[] = [
  {
    id: '1',
    type: 'post',
    title: '请问八字中的天干地支如何理解？',
    content:
      '我最近开始学习八字命理，对于天干地支的含义还不太清楚。能否有人为我详细解释一下十天干和十二地支分别代表什么含义？以及它们之间的相生相克关系？这对于理解命盘有什么重要意义？',
    authorName: '灵客用户001',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/9ee60da0-7aaf-4fd7-90d7-dc5b12f3083c.png',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'pending',
    tags: ['八字', '初学者', '天干地支'],
  },
  {
    id: '2',
    type: 'article',
    title: '紫微斗数中的十四主星详解',
    content:
      '紫微斗数是中国古代最重要的命理学派之一。本文将详细介绍紫微斗数中的十四主星，包括紫微星、天机星、太阳星、武曲星、天同星、廉贞星、天府星、太阴星、贪狼星、巨门星、天相星、天梁星、七杀星和破军星。每颗星都有其独特的性质和含义，对命盘的解读至关重要。',
    authorName: '命理师李明',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/aa5254a1-0190-4025-b9e9-e48f1a2cbb42.png',
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'pending',
    tags: ['紫微斗数', '主星', '命理师文章'],
  },
  {
    id: '3',
    type: 'post',
    title: '我的命盘显示今年有大变化，应该如何应对？',
    content:
      '根据我的八字和紫微命盘，今年似乎会有重大的人生变化。我感到有些焦虑和不安。请问有经验的命理师能否为我分析一下，这些变化可能是什么？我应该如何积极应对？',
    authorName: '灵客用户002',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/54c8043e-46b4-4b60-b0c3-8cd3503ac0f8.png',
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'pending',
    tags: ['命盘分析', '人生变化', '求助'],
  },
  {
    id: '4',
    type: 'article',
    title: '占星学中的行星逆行现象解读',
    content:
      '在占星学中，行星逆行是一个重要的现象。当我们从地球上观察时，某些行星似乎在向后运动，这就是所谓的逆行。水星逆行、金星逆行、火星逆行等都会对人的运势产生不同的影响。本文将深入探讨各大行星逆行的含义和影响。',
    authorName: '占星师王芳',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/e6e93f88-ff6e-4b4a-b6c7-f2eb35e4bbc6.png',
    submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'approved',
    tags: ['占星学', '行星逆行', '运势'],
  },
  {
    id: '5',
    type: 'post',
    title: '同命人真的存在吗？',
    content:
      '我一直对"同命人"的概念很感兴趣。根据灵客AI的理论，同命人应该有相似的命盘和人生轨迹。但我想知道，这是否真的有科学依据？或者这只是一种心理暗示？有人能分享他们与同命人的真实经历吗？',
    authorName: '灵客用户003',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/0f4e7358-2806-447e-860a-2af05bc18dae.png',
    submittedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    status: 'approved',
    tags: ['同命人', '命理学', '讨论'],
  },
  {
    id: '6',
    type: 'post',
    title: '这个帖子包含不当内容',
    content:
      '这是一个测试帖子，包含一些不适合社区的内容。这个帖子应该被拒绝。',
    authorName: '灵客用户004',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/6d19a6d1-f0de-48e7-af82-6cacaaf76fd6.png',
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'rejected',
    tags: ['测试'],
    reason: '内容不符合社区规范，包含不当言论',
  },
  {
    id: '7',
    type: 'article',
    title: '如何通过面相学判断一个人的性格特征',
    content:
      '面相学是中国传统命理学的重要分支。通过观察一个人的面部特征，我们可以推断出他们的性格、运势和人生轨迹。本文将介绍面相学的基本原理，包括五官的含义、脸型的分类、以及如何综合分析一个人的面相。',
    authorName: '面相师张三',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/fbf903df-b923-443e-84f8-6e0b3a290e0c.png',
    submittedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    status: 'pending',
    tags: ['面相学', '性格分析', '命理师文章'],
  },
  {
    id: '8',
    type: 'post',
    title: '我的命盘中有很多凶星，这意味着什么？',
    content:
      '我刚刚得到了我的紫微命盘分析，发现我的命盘中有很多所谓的"凶星"，比如七杀星、破军星等。这让我感到很担心。请问这是否意味着我的人生会很困难？还是说这些星曜也有积极的一面？',
    authorName: '灵客用户005',
    authorAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/c0e1c689-f976-4dd3-825a-cfb31d76afd0.png',
    submittedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
    status: 'pending',
    tags: ['紫微斗数', '凶星', '命盘解读'],
  },
];
