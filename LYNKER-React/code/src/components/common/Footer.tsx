
import SafeIcon from '@/components/common/SafeIcon';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  variant?: 'full' | 'simple';
}

export default function Footer({ variant = 'full' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'simple') {
    return (
<footer id="ibj2jr" className="border-t bg-background/50 backdrop-blur-sm mt-auto" style={{ backgroundImage: 'linear-gradient(#0c0c0c 0%, #0c0c0c 100%)' }}>
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} 灵客AI. 同命相知。</p>
            <div className="flex items-center gap-4">
              <a href="./placeholder.html" className="hover:text-foreground transition-colors">
                隐私政策
              </a>
              <a href="./placeholder.html" className="hover:text-foreground transition-colors">
                服务条款
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const footerLinks = {
    platform: [
      { name: '关于我们', href: './placeholder.html' },
      { name: '命理服务', href: './prognosis-service-entry.html' },
      { name: '同命匹配', href: './homology-match-discovery.html' },
      { name: '知识库', href: './knowledge-base-main.html' },
    ],
    support: [
      { name: '帮助中心', href: './placeholder.html' },
      { name: '联系我们', href: './placeholder.html' },
      { name: '命理师入驻', href: './master-registration-form.html' },
      { name: 'API文档', href: './placeholder.html' },
    ],
    legal: [
      { name: '隐私政策', href: './placeholder.html' },
      { name: '服务条款', href: './placeholder.html' },
      { name: '用户协议', href: './placeholder.html' },
      { name: '安全中心', href: './placeholder.html' },
    ],
  };

  const socialLinks = [
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Instagram', href: '#', label: 'Instagram' },
    { icon: 'Youtube', href: '#', label: 'YouTube' },
  ];

  return (
<footer id="ibj2jr" className="border-t bg-background/50 backdrop-blur-sm mt-auto" style={{ backgroundImage: 'linear-gradient(#0c0c0c 0%, #0c0c0c 100%)' }}>
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary">
                <SafeIcon name="Sparkles" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-mystical">灵客AI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              命理 + AI + 社交的创新平台，让您找到真正理解自己的同命人。同命相知，灵魂共鸣。
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  <SafeIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">平台</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">支持</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">法律</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} 灵客AI (LynkerAI). 保留所有权利。</p>
          <p className="flex items-center gap-1">
            <SafeIcon name="Heart" className="h-4 w-4 text-accent" />
            <span>同命相知</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
