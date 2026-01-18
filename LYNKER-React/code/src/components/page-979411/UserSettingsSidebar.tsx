
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';
import SafeIcon from '@/components/common/SafeIcon';

interface UserSettingsSidebarProps {
  currentSection?: string;
}

export default function UserSettingsSidebar({ currentSection = 'ai_settings' }: UserSettingsSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <nav className="space-y-1 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2 mb-4">
          用户设置
        </h3>
        
{MOCK_USER_SETTINGS_NAV.map((item) => {
const isActive = item.id === currentSection;
             const isTrueChart = item.id === 'true_chart';
             const isKnowledgeBase = item.id === 'knowledge_base';
             const isAppointments = item.id === 'appointments';
             const isPayment = item.id === 'payment';
             return (
               <a
                 key={item.id}
                 id={isTrueChart ? 'irygr' : isKnowledgeBase ? 'i1oqb' : isAppointments ? 'iqm71' : isPayment ? 'ic1p2' : undefined}
                 href={isKnowledgeBase ? './page_979401.html' : isAppointments ? './page_979400.html' : isPayment ? './page_979468.html' : `./${item.targetPageId}.html`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}
            >
              <SafeIcon name={item.iconName} className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{item.title}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Quick Links */}
      <div className="border-t p-4 mt-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2 mb-3">
          快速链接
        </h3>
        <div className="space-y-2">
          <a
            href="./knowledge-base-main.html"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <SafeIcon name="BookOpen" className="h-4 w-4" />
            知识库
          </a>
          <a
            href="./ai-chat-interface.html"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <SafeIcon name="MessageSquare" className="h-4 w-4" />
            AI聊天
          </a>
          <a
            href="./home-page.html"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <SafeIcon name="Home" className="h-4 w-4" />
            返回首页
          </a>
        </div>
      </div>
    </aside>
  );
}
