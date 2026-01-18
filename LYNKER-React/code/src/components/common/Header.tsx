import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';

interface HeaderProps {
  variant?: 'default' | 'minimal';
  currentPath?: string;
}

export default function Header({ variant = 'default', currentPath = '/' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: '灵客用户',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    isPro: false,
  };

// Conditionally set navigation items based on current page
const getNavItems = () => {
const baseItems = [
      { name: '首页', href: 'page-969102.html', icon: 'Home' },
      { name: '命理服务', href: './prognosis-service-entry.html', icon: 'Sparkles' },
      { name: '同命匹配', href: './homology-match-discovery.html', icon: 'Users' },
      { name: '知识库', href: './knowledge-base-main.html', icon: 'BookOpen' },
      { name: '论坛', href: './forum-homepage.html', icon: 'MessageSquare' },
    ];
    
    // Customize for ai_generated_note_view page
    if (currentPath === '/ai-generated-note-view') {
      return [
        { name: '同命发现', href: './index.html', icon: 'Home' },
        { name: 'lynkermates灵友圈', href: './prognosis-service-entry.html', icon: 'Sparkles', customStyle: { color: 'rgb(255, 255, 255)', fontSize: '14px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.1)' } },
        { name: '同命匹配', href: './homology-match-discovery.html', icon: 'Users' },
        { name: '知识库', href: './knowledge-base-main.html', icon: 'BookOpen' },
        { name: '论坛', href: './forum-homepage.html', icon: 'MessageSquare' },
      ];
    }
    
// Customize for homology_match_discovery page
      if (currentPath === '/homology-match-discovery') {
        return [
          { name: 'same-destiny同命发现', href: './index.html', icon: 'Home', customStyle: { color: 'rgb(255, 255, 255)', fontSize: '14px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.1)' } },
          { name: 'lynkermates灵友圈', href: './prognosis-service-entry.html', icon: 'Sparkles', customStyle: { color: 'rgb(255, 255, 255)', fontSize: '14px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.1)' } },
          { name: 'lynkergroup灵客群', href: './homology-match-discovery.html', icon: 'Users', customStyle: { color: 'rgb(255, 255, 255)', fontSize: '14px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.1)' } },
        ];
      }
    
// Customize for page_944865 (灵友圈) page
if (currentPath === '/page-944865') {
      return [
        { name: '首页', href: './969102.html', icon: 'Home' },
        { name: '命理服务', href: './prognosis-service-entry.html', icon: 'Sparkles' },
        { name: '同命匹配', href: './homology-match-discovery.html', icon: 'Users' },
        { name: '灵客群组', href: './page-944544.html', icon: 'BookOpen' },
        { name: '论坛', href: './forum-homepage.html', icon: 'MessageSquare' },
      ];
    }
    
// Customize for prognosis_service_entry page
 if (currentPath === '/prognosis-service-entry') {
         return [
   { name: 'index', href: './969102.html', icon: 'Users', title: 'index' },
           { name: 'lynkerforum', href: './forum-homepage.html', icon: 'MessageSquare' },
         ];
       }
    
// Customize for page_979337
    if (currentPath === '/page-979337') {
      return [
        { name: '首页', href: 'page-969102.html', icon: 'Home' },
        { name: '命理服务', href: './prognosis-service-entry.html', icon: 'Sparkles' },
        { name: '同命匹配', href: './homology-match-discovery.html', icon: 'Users' },
        { name: '灵友圈', href: './knowledge-base-main.html', icon: 'BookOpen' },
        { name: '灵客群组', href: './page-944544.html', icon: 'BookOpen' },
        { name: '炼丹房', href: './page-944545.html', icon: 'MessageSquare' },
        { name: '论坛', href: './forum-homepage.html', icon: 'MessageSquare' },
      ];
    }
    
// Customize for page_990256
     if (currentPath === '/page-990256') {
       return [];
     }
     
     return baseItems;
  };

  const navItems = getNavItems();

if (variant === 'minimal') {
    const hideUserMenu = ['/user-registration-form', '/master-registration-form', '/profile-setup-user', '/profile-setup-master'].includes(currentPath);
    return (
<header id="iojh" className={`sticky top-0 z-50 w-full border-b transition-all ${isScrolled ? 'glass' : 'bg-background/80 backdrop-blur-sm'}`}>
          <div className="container flex h-16 items-center justify-between px-4">
             <a href="./969102.html" className="flex items-center space-x-2">
               <span id="ipzk" style={{ fontSize: '30px' }} className="font-bold text-gradient-mystical">灵客AI</span>
             </a>
            {!hideUserMenu && <UserMenu user={user} />}
          </div>
        </header>
      );
    }

return (
       <header id="iojh" className={`sticky top-0 z-50 w-full border-b transition-all ${isScrolled ? 'glass' : 'bg-background/80 backdrop-blur-sm'}`} style={currentPath === '/ai-generated-note-view' || currentPath === '/homology-match-discovery' || currentPath === '/page-944865' ? { backgroundImage: 'linear-gradient(#1c1c1c 0%, #1c1c1c 100%)', backgroundSize: 'auto', backgroundAttachment: 'scroll', backgroundRepeat: 'repeat', backgroundPosition: 'left top' } : undefined}>
<div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <a href="./969102.html" className="flex items-center space-x-2" title="index">
            <span id="ipzk" style={{ fontSize: '30px' }} className="font-bold text-gradient-mystical hidden sm:inline">灵客AI</span>
          </a>

{/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-1">
{currentPath !== '/page-706040' && navItems.map((item, index) => {
let linkId = '';
                 let spanId = '';
                 
   if (currentPath === '/ai-generated-note-view' && index === 1) {
                    linkId = 'iwasn';
                    spanId = 'icy63v';
                  } else if (currentPath === '/homology-match-discovery' && index === 0) {
                    linkId = 'ii7rn';
                    spanId = 'iyf9ru';
                  } else if (currentPath === '/homology-match-discovery' && index === 1) {
                    linkId = 'itaj8';
                    spanId = 'i4hftl';
   } else if (currentPath === '/homology-match-discovery' && index === 2) {
                     linkId = 'ivs1i';
                     spanId = 'i1bq16';
                   } else if (currentPath === '/prognosis-service-entry' && index === 0) {
                     spanId = 'ih6a3r';
                   }
              
return (
                 <a
                   key={item.name}
                   href={item.href}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                     currentPath === item.href
                       ? 'bg-primary text-primary-foreground'
                       : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                   }`}
                   style={item.customStyle}
                   id={linkId}
                   {...(item.title && { title: item.title })}
                 >
{(currentPath === '/ai-generated-note-view' && index === 1) || (currentPath === '/homology-match-discovery' && (index === 0 || index === 1 || index === 2 || index === 3)) || (currentPath === '/prognosis-service-entry' && index === 0) ? (
                         <span id={spanId} style={item.customStyle}>{item.name}</span>
                       ) : (
                         item.name
                       )}
                 </a>
              );
            })}
          </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <UserMenu user={user} />
          
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <SafeIcon name="Menu" className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-2 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <SafeIcon name={item.icon} className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function UserMenu({ user }: { user: any }) {
  // Mock subscription and API data
  const subscription = {
    type: '高级会员',
    expiryDate: '2026-01-15',
  };

  const apiUsage = {
    used: 8500,
    total: 10000,
  };

  const uid = 'UID-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {user.isPro && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent glow-accent flex items-center justify-center">
              <SafeIcon name="Crown" className="w-3 h-3 text-accent-foreground" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-card" align="end">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{uid}</p>
            <div className="mt-2">
              <RegionBadge country={user.country} size="small" />
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Subscription Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">订阅套餐</span>
            <Badge className="bg-accent text-accent-foreground">
              <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
              {subscription.type}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>有效期至</span>
            <span>{subscription.expiryDate}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* API Usage */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">API Token使用</span>
            <span className="text-sm font-semibold">
              {apiUsage.used} / {apiUsage.total}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-mystical-gradient h-2 rounded-full transition-all"
              style={{ width: `${(apiUsage.used / apiUsage.total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            剩余 {apiUsage.total - apiUsage.used} tokens
          </p>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
<a href="./page-979337.html">
              <SafeIcon name="User" className="h-4 w-4 mr-2" />
              编辑个人资料
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              我的知识库
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./ai-assistant-settings.html">
              <SafeIcon name="Settings" className="h-4 w-4 mr-2" />
              AI助手设置
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
            充值Token
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}