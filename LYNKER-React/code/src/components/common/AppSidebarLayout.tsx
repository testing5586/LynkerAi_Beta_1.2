import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AppSidebarLayoutProps {
  children: ReactNode;
  headerHeight?: string;
}

export default function AppSidebarLayout({
  children,
  headerHeight = '64px',
}: AppSidebarLayoutProps) {
  return (
    <SidebarProvider>
      <div 
        className="flex w-full"
        style={{
          minHeight: `calc(100vh - ${headerHeight})`,
        }}
      >
        <style>{`
          :root {
            --header-height: ${headerHeight};
          }
        `}</style>
        {children}
      </div>
    </SidebarProvider>
  );
}