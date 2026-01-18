
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

export default function QuickLinksSection() {
  const quickLinks = [
    {
      icon: 'Wand2',
      title: '命理服务',
      description: '预约专业命理师进行一对一咨询',
      href: './prognosis-service-entry.html',
      color: 'from-purple-500/20 to-blue-500/20',
    },
    {
      icon: 'Users',
      title: '同命匹配',
      description: '发现与您命盘相匹配的灵魂同频者',
      href: './homology-match-discovery.html',
      color: 'from-pink-500/20 to-purple-500/20',
    },
    {
      icon: 'BookOpen',
      title: '知识库',
      description: '查看您的预测记录和AI生成的笔记',
      href: './knowledge-base-main.html',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: 'MessageSquare',
      title: '论坛',
      description: '与全球命理爱好者交流讨论',
      href: './forum-homepage.html',
      color: 'from-yellow-500/20 to-orange-500/20',
    },
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            快速导航
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            一键进入灵客AI的各大功能模块
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`group relative p-6 rounded-xl border border-accent/20 hover:border-accent/50 transition-all duration-300 overflow-hidden`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-mystical-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SafeIcon name={link.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {link.description}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <SafeIcon name="ArrowUpRight" className="h-5 w-5 text-accent" />
              </div>
            </a>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 hover:bg-accent/10"
            asChild
          >
<a href="./registration-type-selection.html">
              <SafeIcon name="UserPlus" className="mr-2 h-5 w-5" />
              新用户注册
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 hover:bg-accent/10"
            asChild
          >
            <a href="./master-registration-form.html">
              <SafeIcon name="Crown" className="mr-2 h-5 w-5" />
              命理师入驻
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
