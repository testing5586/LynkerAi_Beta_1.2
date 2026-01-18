
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface ArticleContentProps {}

export default function ArticleContent({}: ArticleContentProps) {
  const article = {
    id: 'AI_ARTICLE_001',
    sections: [
      {
        id: 'intro',
        title: '研究背景',
        content: `在传统八字命理中，"金木交战"是一个重要的格局概念，通常被认为会对个人的性格、事业和人际关系产生显著影响。然而，这一理论的科学验证一直缺乏大规模的数据支持。

本研究通过灵客AI平台收集的超过50,000份真实命盘数据，结合用户的生活事件记录和反馈，对金木交战格局进行了深入的统计分析。`,
      },
      {
        id: 'methodology',
        title: '研究方法',
        content: `我们采用了以下方法论：

1. **数据收集**：从灵客AI平台的用户库中随机抽取50,000份完整的八字命盘数据
2. **特征提取**：识别金木交战的各种表现形式（天干、地支、纳音等）
3. **事件映射**：将用户报告的生活事件与命盘特征进行关联分析
4. **统计验证**：使用卡方检验和相关性分析验证假设
5. **模式识别**：通过机器学习算法识别隐藏的规律`,
      },
      {
        id: 'findings',
        title: '主要发现',
        content: `研究发现了以下关键规律：

**发现1：地域差异显著**
- 在北方地区（纬度>35°），金木交战对肝功能的影响系数为1.52
- 在南方地区（纬度<25°），该系数降低至0.89
- 这可能与气候、湿度等环境因素有关

**发现2：性别差异**
- 女性用户中，金木交战与情绪波动的相关性为0.68
- 男性用户中，该相关性为0.42
- 提示性激素水平可能是调节因素

**发现3：时代效应**
- 在现代都市环境中，金木交战的传统负面影响被显著削弱
- 这可能反映了现代医疗、心理咨询等因素的干预作用`,
      },
      {
        id: 'implications',
        title: '理论意义',
        content: `这项研究对命理学的发展具有重要意义：

1. **科学化验证**：首次用大数据方法验证了传统命理概念
2. **环境因子理论**：提出了"环境因子调节假说"，认为地理、气候、社会因素会影响命理规律的表现
3. **个性化预测**：为更精准的个性化命理分析提供了科学基础`,
      },
    ],
    author: {
      name: '灵客AI研究团队',
      role: '数据科学与命理研究',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/f1a9e973-b40f-4b0a-83a4-65f8ae5d40a1.png',
    },
  };

  return (
    <div className="space-y-8">
      {/* Author Info */}
      <Card className="glass-card border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{article.author.name}</h3>
              <p className="text-sm text-muted-foreground">{article.author.role}</p>
              <p className="text-xs text-muted-foreground mt-2">
                本文由灵客AI自动生成，基于平台数据和先进的自然语言处理技术。内容旨在启发讨论和收集用户反馈。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="space-y-8">
        {article.sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-8 bg-mystical-gradient rounded-full" />
              {section.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Data Disclaimer */}
      <Alert className="border-accent/50 bg-accent/5">
        <SafeIcon name="Info" className="h-4 w-4 text-accent" />
        <AlertDescription className="text-sm">
          <strong>数据说明：</strong>本文基于灵客AI平台的真实用户数据生成。所有个人信息已完全匿名化处理，符合隐私保护规范。研究结果仅供学术讨论和验证之用。
        </AlertDescription>
      </Alert>

      {/* Key Takeaways */}
      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <SafeIcon name="Lightbulb" className="w-5 h-5 text-accent" />
            核心要点
          </h3>
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm">
              <span className="text-accent font-bold">•</span>
              <span>金木交战的影响存在显著的地域和性别差异</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-accent font-bold">•</span>
              <span>现代社会因素能够显著调节传统命理规律的表现</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-accent font-bold">•</span>
              <span>环境因子（气候、纬度、湿度等）是重要的调节变量</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-accent font-bold">•</span>
              <span>这项研究为个性化命理分析提供了科学基础</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
