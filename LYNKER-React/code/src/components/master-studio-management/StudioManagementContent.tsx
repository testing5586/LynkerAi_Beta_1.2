
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import StudioInfoForm from './StudioInfoForm';
import ServiceManagement from './ServiceManagement';
import ScheduleManagement from './ScheduleManagement';
import { MOCK_MASTER_PROFILE } from '@/data/user';

export default function StudioManagementContent() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="flex-1 flex flex-col">
{/* Header */}
       <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
         <div className="container max-w-6xl mx-auto px-6 py-6">
           <div className="flex items-center justify-between mb-4">
             <Button
               variant="ghost"
               onClick={() => window.location.href = './master-backend-overview.html'}
               className="gap-2"
             >
               <SafeIcon name="ArrowLeft" className="h-4 w-4" />
               返回后台概览
             </Button>
           </div>
           <div className="flex items-center justify-between">
             <div>
               <h1 className="text-3xl font-bold text-gradient-mystical mb-2">
                 工作室管理
               </h1>
               <p className="text-muted-foreground">
                 管理您的工作室信息、服务项目和日程安排
               </p>
             </div>
<div className="flex items-center space-x-3">
                <Button
                  onClick={() => window.location.href = './master-profile.html'}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  <SafeIcon name="Eye" className="mr-2 h-4 w-4" />
                  查看公开档案
                </Button>
              </div>
           </div>
         </div>
       </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto px-6 py-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="info" className="flex items-center space-x-2">
                <SafeIcon name="Info" className="h-4 w-4" />
                <span>工作室信息</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center space-x-2">
                <SafeIcon name="Package" className="h-4 w-4" />
                <span>服务项目</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center space-x-2">
                <SafeIcon name="Calendar" className="h-4 w-4" />
                <span>日程安排</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <StudioInfoForm masterProfile={MOCK_MASTER_PROFILE} onSave={handleSave} />
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <ServiceManagement masterProfile={MOCK_MASTER_PROFILE} onSave={handleSave} />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <ScheduleManagement onSave={handleSave} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
