
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';
import SafeIcon from '@/components/common/SafeIcon';

interface UserDashboardSidebarProps {
  currentSection?: string;
}

export default function UserDashboardSidebar({ currentSection = 'profile' }: UserDashboardSidebarProps) {
const sectionMap: Record<string, string> = {
    profile: 'page_979337',
    true_chart: 'page_979145',
    yearly_fortune: 'page_979336',
    knowledge_base: 'page_979401',
    appointments: 'page_979400',
    ai_settings: 'page_979411',
    payment: 'page_979468',
  };

  return (
    <aside className="w-64 border-r border-primary/20 bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-6 space-y-2">
        <h2 className="text-lg font-bold text-gradient-mystical mb-6">用户后台</h2>
        
        <nav className="space-y-1">
{MOCK_USER_SETTINGS_NAV.map((item) => {
             const isActive = currentSection === item.id;
             const pageRoute = sectionMap[item.id] || item.targetPageId;
             const routePath = `./page_${pageRoute.replace('page_', '')}.html`;
             
 const elementId = item.id === 'profile' ? 'iitcp' : item.id === 'true_chart' ? 'i09ce' : item.id === 'yearly_fortune' ? 'i4gxs' : item.id === 'ai_settings' ? 'ifi2g' : item.id === 'payment' ? 'ig3nk' : undefined;
             return (
               <a
                 key={item.id}
                 id={elementId}
                 href={routePath}
                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                   isActive
                     ? 'bg-primary text-primary-foreground shadow-lg glow-primary'
                     : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                 }`}
               >
                 <SafeIcon name={item.iconName} className="w-5 h-5 flex-shrink-0" />
                 <span id={item.id === 'yearly_fortune' ? 'i4gxs' : undefined} className="text-sm font-medium">{item.id === 'yearly_fortune' ? '运势图' : item.title}</span>
               </a>
             );
           })}
        </nav>

        <div className="pt-6 mt-6 border-t border-primary/20">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
            <SafeIcon name="LogOut" className="w-5 h-5" />
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
