
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    id: 'service',
    title: '命理服务预约',
    description: '预约全球Pro命理师的专业咨询',
    icon: 'Calendar',
    href: './prognosis-service-entry.html',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'match',
    title: '同命匹配发现',
    description: '找到与您命盘相匹配的灵魂同频者',
    icon: 'Users',
    href: './homology-match-discovery.html',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'forum',
    title: '灵客论坛',
    description: '参与命理讨论，分享预言应验故事',
    icon: 'MessageSquare',
    href: './forum-homepage.html',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'kb',
    title: '知识库笔记',
    description: '管理您的命理学习资料和咨询记录',
    icon: 'BookOpen',
    href: './knowledge-base-main.html',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'ai',
    title: 'AI助手',
    description: '与灵伴AI进行实时对话和笔记生成',
    icon: 'Sparkles',
    href: './ai-chat-interface.html',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'profile',
    title: '个人中心',
    description: '管理您的资料、订阅和API设置',
    icon: 'User',
    href: './page-961642.html',
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function QuickLinks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            快捷入口
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            快速访问平台的各项功能和服务
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUICK_LINKS.map((link, index) => (
            <Card
              key={link.id}
              className="glass-card group hover:shadow-card transition-all duration-300 hover:scale-105 border-accent/10 overflow-hidden cursor-pointer"
              onClick={() => {
                window.location.href = link.href;
              }}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <CardContent className="p-6">
                {/* Icon Background */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 glow-primary group-hover:scale-110 transition-transform`}>
                  <SafeIcon name={link.icon} className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  {link.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">进入</span>
                  <SafeIcon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="glass-card border-accent/20 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">还没有账户？</h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                加入灵客AI社区，开启您的命理探索之旅。无论您是想寻找同命人，还是想学习命理知识，我们都为您准备好了。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-mystical-gradient hover:opacity-90 text-white px-8"
                  asChild
                >
                  <a href="./registration-type-selection.html">
                    <SafeIcon name="UserPlus" className="mr-2 h-5 w-5" />
                    立即注册
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8"
                  asChild
                >
                  <a href="./prognosis-service-entry.html">
                    <SafeIcon name="Wand2" className="mr-2 h-5 w-5" />
                    浏览服务
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
