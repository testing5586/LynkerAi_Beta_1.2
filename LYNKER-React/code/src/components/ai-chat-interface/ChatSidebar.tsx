
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

export default function ChatSidebar() {
  const quickLinks = [
    {
      icon: 'FileText',
      label: 'AI生成笔记',
      href: './ai-generated-note-view.html',
      description: '查看自动生成的Markdown笔记',
    },
    {
      icon: 'CheckCircle',
      label: '预言应验记录',
      href: './prophecy-verification-record.html',
      description: '管理预言应验情况',
    },
    {
      icon: 'BookOpen',
      label: '知识库',
      href: './knowledge-base.html',
      description: '查看完整知识库',
    },
    {
      icon: 'Settings',
      label: 'AI助手设置',
      href: './ai-assistant-settings.html',
      description: '配置AI助手参数',
    },
  ];

  const recentNotes = [
    {
      id: 'n1',
      title: '2025年冬季财运分析',
      date: '今天 11:30',
      preview: '关于子女教育和未来居住地选择...',
    },
    {
      id: 'n2',
      title: '本命盘解读与情感匹配',
      date: '昨天 14:20',
      preview: '重点在金星相位，找到了同命匹配的线索...',
    },
  ];

  return (
    <div className="hidden lg:flex w-80 border-l bg-card/30 backdrop-blur-sm flex-col">
      {/* Quick Links */}
      <div className="p-4 space-y-2 overflow-y-auto flex-1">
        <h3 className="text-sm font-semibold text-foreground mb-3">快速导航</h3>
        {quickLinks.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            className="w-full justify-start h-auto py-2 px-3 hover:bg-muted"
            asChild
          >
            <a href={link.href}>
              <SafeIcon name={link.icon} className="h-4 w-4 mr-2 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-medium">{link.label}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {link.description}
                </p>
              </div>
            </a>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Recent Notes */}
      <div className="p-4 space-y-2 overflow-y-auto flex-1">
        <h3 className="text-sm font-semibold text-foreground mb-3">最近笔记</h3>
        {recentNotes.map((note) => (
          <Card key={note.id} className="glass-card p-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <p className="text-xs font-medium text-foreground line-clamp-1">
              {note.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {note.preview}
            </p>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <a href="./knowledge-base-main.html">
            <SafeIcon name="Home" className="h-4 w-4 mr-2" />
            返回知识库
          </a>
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          asChild
        >
          <a href="./home-page.html">
            <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            返回首页
          </a>
        </Button>
      </div>
    </div>
  );
}
