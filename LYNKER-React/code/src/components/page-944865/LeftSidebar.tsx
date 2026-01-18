
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import SettingsCustomizationDialog from './SettingsCustomizationDialog';
import FavoritesDialog from './FavoritesDialog';

export default function LeftSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
const menuItems = [
{ icon: 'Users', label: '同命匹配', href: './homology-match-discovery.html' },
     { icon: 'MessageSquare', label: '群组', href: './page-944544.html' },
     { icon: 'BookOpen', label: '知识库', href: './knowledge-base-main.html' },
     { icon: 'Sparkles', label: '命理服务', href: './prognosis-service-entry.html' },
   ];

const quickLinks = [
     { icon: 'Bell', label: '好友请求', badge: 3, id: 'idbeg', href: './page-1060063.html' },
     { icon: 'Heart', label: '我的收藏', badge: 0, href: '#', onClick: () => setIsFavoritesOpen(true) },
     { icon: 'Settings', label: '设置', badge: 0, href: '#', onClick: () => setIsSettingsOpen(true) },
    ];

  return (
    <div className="w-64 border-r border-border bg-background/50 overflow-y-auto hidden lg:block">
      <div className="p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            导航
          </h3>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-primary/10"
              asChild
            >
              <a href={item.href}>
                <SafeIcon name={item.icon} className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </a>
            </Button>
          ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            快捷
          </h3>
{quickLinks.map((item) => (
             <Button
               key={item.label}
               variant="ghost"
               className="w-full justify-between text-foreground hover:bg-primary/10"
               asChild={!!item.href && item.href !== '#' && !item.onClick}
               onClick={item.onClick}
             >
 {item.href && item.href !== '#' && !item.onClick ? (
                  <a href={item.href} id={item.id} className="w-full flex items-center justify-between">
                   <div className="flex items-center">
                     <SafeIcon name={item.icon} className="w-5 h-5 mr-3" />
                     <span>{item.label}</span>
                   </div>
                   {item.badge > 0 && (
                     <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                       {item.badge}
                     </span>
                   )}
                 </a>
               ) : (
                 <>
                   <div className="flex items-center">
                     <SafeIcon name={item.icon} className="w-5 h-5 mr-3" />
                     <span>{item.label}</span>
                   </div>
                   {item.badge > 0 && (
                     <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                       {item.badge}
                     </span>
                   )}
                 </>
               )}
             </Button>
           ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Suggested Groups */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            推荐群组
          </h3>
          <Card className="p-3 glass-card border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="Users" className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">丁火身强群</p>
                <p className="text-xs text-muted-foreground">234 成员</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 glass-card border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="Users" className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">紫薇爱好者</p>
                <p className="text-xs text-muted-foreground">567 成员</p>
              </div>
            </div>
          </Card>
        </div>

        <Separator className="bg-border/50" />

{/* Create Group Button */}
         <Button className="w-full bg-mystical-gradient hover:opacity-90" asChild>
           <a href="./page-944544.html">
             <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
             创建群组
           </a>
         </Button>
       </div>

{/* Settings Customization Dialog */}
        <SettingsCustomizationDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
        />

        {/* Favorites Dialog */}
        <FavoritesDialog
          open={isFavoritesOpen}
          onOpenChange={setIsFavoritesOpen}
        />
      </div>
    );
  }
