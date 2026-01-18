
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import AppointmentLinkForm from './AppointmentLinkForm';
import LinkPreview from './LinkPreview';
import LinkManagementTable from './LinkManagementTable';
import { MOCK_SERVICES_OFFERED } from '@/data/service';
import { MOCK_TIME_SLOTS } from '@/data/appointment';

interface AppointmentLink {
  linkId: string;
  title: string;
  serviceType: string;
  duration: number;
  price: number;
  description: string;
  availableSlots: string[];
  createdDate: string;
  linkUrl: string;
  isActive: boolean;
  bookingCount: number;
}

const MOCK_APPOINTMENT_LINKS: AppointmentLink[] = [
  {
    linkId: 'link_001',
    title: '八字终身运势精批',
    serviceType: '八字',
    duration: 90,
    price: 800,
    description: '深入分析大运流年，涵盖事业、财运、婚姻、健康。',
    availableSlots: ['周一-周五 10:00-18:00', '周末 14:00-20:00'],
    createdDate: '2025-11-01',
    linkUrl: 'https://lynkerai.com/book/master001/link001',
    isActive: true,
    bookingCount: 24,
  },
  {
    linkId: 'link_002',
    title: '紫微星盘婚姻详论',
    serviceType: '紫微',
    duration: 60,
    price: 650,
    description: '重点解读夫妻宫、子女宫，提供情感指导。',
    availableSlots: ['周二、周四 15:00-19:00'],
    createdDate: '2025-10-15',
    linkUrl: 'https://lynkerai.com/book/master001/link002',
    isActive: true,
    bookingCount: 18,
  },
  {
    linkId: 'link_003',
    title: '西方本命盘深度解读',
    serviceType: '占星术',
    duration: 45,
    price: 480,
    description: '针对出生盘的相位和宫位进行天赋和挑战分析。',
    availableSlots: ['周一、周三 14:00-18:00'],
    createdDate: '2025-10-20',
    linkUrl: 'https://lynkerai.com/book/master001/link003',
    isActive: true,
    bookingCount: 12,
  },
  {
    linkId: 'link_004',
    title: '八字婚姻匹配分析',
    serviceType: '八字',
    duration: 60,
    price: 599,
    description: '专门针对婚恋问题的八字配对详解与建议指导。',
    availableSlots: ['周二、周五 10:00-17:00'],
    createdDate: '2025-10-10',
    linkUrl: 'https://lynkerai.com/book/master001/link004',
    isActive: true,
    bookingCount: 15,
  },
  {
    linkId: 'link_005',
    title: '紫微事业宫专项分析',
    serviceType: '紫微',
    duration: 75,
    price: 720,
    description: '深入解读事业宫、官禄宫及福德宫，规划职业发展道路。',
    availableSlots: ['周三、周六 13:00-19:00'],
    createdDate: '2025-09-28',
    linkUrl: 'https://lynkerai.com/book/master001/link005',
    isActive: false,
    bookingCount: 8,
  },
  {
    linkId: 'link_006',
    title: '占星流年运势展望',
    serviceType: '占星术',
    duration: 50,
    price: 520,
    description: '分析当年行星运行与个人命盘的相互影响，预测全年运势。',
    availableSlots: ['周四、周日 15:00-20:00'],
    createdDate: '2025-09-15',
    linkUrl: 'https://lynkerai.com/book/master001/link006',
    isActive: true,
    bookingCount: 10,
  },
];

export default function AppointmentLinkCreation() {
  const [links, setLinks] = useState<AppointmentLink[]>(MOCK_APPOINTMENT_LINKS);
  const [showForm, setShowForm] = useState(false);
  const [previewLink, setPreviewLink] = useState<AppointmentLink | null>(null);

  const handleCreateLink = (formData: any) => {
    const newLink: AppointmentLink = {
      linkId: `link_${Date.now()}`,
      title: formData.title,
      serviceType: formData.serviceType,
      duration: formData.duration,
      price: formData.price,
      description: formData.description,
      availableSlots: formData.availableSlots,
      createdDate: new Date().toISOString().split('T')[0],
      linkUrl: `https://lynkerai.com/book/master001/link_${Date.now()}`,
      isActive: true,
      bookingCount: 0,
    };
    setLinks([newLink, ...links]);
    setShowForm(false);
  };

  const handleDeleteLink = (linkId: string) => {
    setLinks(links.filter(link => link.linkId !== linkId));
  };

  const handleToggleActive = (linkId: string) => {
    setLinks(links.map(link =>
      link.linkId === linkId ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const activeLinksCount = links.filter(l => l.isActive).length;
  const totalBookings = links.reduce((sum, l) => sum + l.bookingCount, 0);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
<Button 
        variant="ghost" 
        className="mb-4" 
        asChild
      >
<a href="./master-backend-overview.html" id="ivwezt" className="flex items-center gap-2">
          <SafeIcon name="ArrowLeft" className="h-4 w-4" />
          退出
        </a>
      </Button>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">预约链接管理</h1>
          <p className="text-muted-foreground mt-1">创建和管理您的预约链接，让客户轻松预约咨询</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-mystical-gradient hover:opacity-90"
        >
          <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
          创建新链接
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活跃链接</p>
                <p className="text-3xl font-bold">{activeLinksCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Link" className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总预约数</p>
                <p className="text-3xl font-bold">{totalBookings}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <SafeIcon name="Calendar" className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均预约率</p>
                <p className="text-3xl font-bold">
                  {links.length > 0 ? Math.round((totalBookings / (links.length * 10)) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <SafeIcon name="TrendingUp" className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      {showForm && (
        <Card className="glass-card border-primary/50">
          <CardHeader>
            <CardTitle>创建新预约链接</CardTitle>
            <CardDescription>
              定制您的预约链接，设置服务类型、时间和价格
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentLinkForm
              services={MOCK_SERVICES_OFFERED}
              timeSlots={MOCK_TIME_SLOTS}
              onSubmit={handleCreateLink}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Tabs Section */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            全部链接 ({links.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            活跃 ({activeLinksCount})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            已停用 ({links.length - activeLinksCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {links.length > 0 ? (
            <LinkManagementTable
              links={links}
              onDelete={handleDeleteLink}
              onToggleActive={handleToggleActive}
              onPreview={setPreviewLink}
            />
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <SafeIcon name="Link" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">还没有创建任何预约链接</p>
                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="mt-4"
                >
                  创建第一个链接
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {links.filter(l => l.isActive).length > 0 ? (
            <LinkManagementTable
              links={links.filter(l => l.isActive)}
              onDelete={handleDeleteLink}
              onToggleActive={handleToggleActive}
              onPreview={setPreviewLink}
            />
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-muted-foreground">没有活跃的预约链接</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {links.filter(l => !l.isActive).length > 0 ? (
            <LinkManagementTable
              links={links.filter(l => !l.isActive)}
              onDelete={handleDeleteLink}
              onToggleActive={handleToggleActive}
              onPreview={setPreviewLink}
            />
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-muted-foreground">没有已停用的预约链接</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {previewLink && (
        <LinkPreview
          link={previewLink}
          onClose={() => setPreviewLink(null)}
        />
      )}
    </div>
  );
}
