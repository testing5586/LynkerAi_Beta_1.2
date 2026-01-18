
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import EmptyState from '@/components/common/EmptyState';
import FriendRequestCard from './FriendRequestCard';
import RequestDetailPanel from './RequestDetailPanel';

interface FriendRequest {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  country: string;
  region: string;
  isPro: boolean;
  bio: string;
  constellation: string;
  bazi: string;
  ziwei: string;
  matchScore: number;
  requestTime: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// Mock data
const mockRequests: FriendRequest[] = [
  {
    id: '1',
    userId: 'user_001',
    userName: '星辰漫步者',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    region: '北京',
    isPro: false,
    bio: '热爱占星学和八字研究，寻找志同道合的朋友',
    constellation: '双子座',
    bazi: '甲子年 丙寅月 戊午日 癸卯时',
    ziwei: '命宫：紫微 破军',
    matchScore: 92,
    requestTime: '2024-01-15 14:30',
    status: 'pending',
  },
  {
    id: '2',
    userId: 'user_002',
    userName: '紫微探秘者',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    region: '上海',
    isPro: true,
    bio: 'Pro命理师，专注紫微斗数研究',
    constellation: '狮子座',
    bazi: '乙丑年 戊辰月 己未日 甲午时',
    ziwei: '命宫：天府 七杀',
    matchScore: 88,
    requestTime: '2024-01-14 10:15',
    status: 'pending',
  },
  {
    id: '3',
    userId: 'user_003',
    userName: '八字命理家',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'US',
    region: '纽约',
    isPro: false,
    bio: '在美华人，研究八字与现代生活的结合',
    constellation: '处女座',
    bazi: '丙寅年 己巳月 庚申日 丁未时',
    ziwei: '命宫：武曲 贪狼',
    matchScore: 85,
    requestTime: '2024-01-13 16:45',
    status: 'pending',
  },
];

const mockAcceptedRequests: FriendRequest[] = [
  {
    id: '4',
    userId: 'user_004',
    userName: '同命知己',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    region: '深圳',
    isPro: false,
    bio: '已成为好友',
    constellation: '天秤座',
    bazi: '丁卯年 庚午月 辛酉日 戊寅时',
    ziwei: '命宫：廉贞 天相',
    matchScore: 95,
    requestTime: '2024-01-10 09:20',
    status: 'accepted',
  },
];

export default function FriendRequestPage() {
  const [isClient, setIsClient] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<FriendRequest | null>(mockRequests[0]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>(mockRequests);
  const [acceptedRequests, setAcceptedRequests] = useState<FriendRequest[]>(mockAcceptedRequests);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    setIsClient(false);
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (requestId: string) => {
    const request = pendingRequests.find((r) => r.id === requestId);
    if (request) {
      setPendingRequests(pendingRequests.filter((r) => r.id !== requestId));
      setAcceptedRequests([...acceptedRequests, { ...request, status: 'accepted' }]);
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(pendingRequests.find((r) => r.id !== requestId) || null);
      }
    }
  };

  const handleReject = (requestId: string) => {
    setPendingRequests(pendingRequests.filter((r) => r.id !== requestId));
    if (selectedRequest?.id === requestId) {
      setSelectedRequest(pendingRequests.find((r) => r.id !== requestId) || null);
    }
  };

  const handleViewProfile = (userId: string) => {
    window.location.href = `./profile-detail.html?id=${userId}`;
  };

return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <SafeIcon name="Users" className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">好友请求</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
            title="返回上一页"
            className="h-10 w-10"
          >
            <SafeIcon name="ArrowLeft" className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-muted-foreground">
          管理您的好友请求，发现更多同命知己
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <SafeIcon name="Clock" className="h-4 w-4" />
            <span>待处理 ({pendingRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center space-x-2">
            <SafeIcon name="CheckCircle" className="h-4 w-4" />
            <span>已接受 ({acceptedRequests.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Pending Requests Tab */}
        <TabsContent value="pending" className="space-y-6">
          {pendingRequests.length === 0 ? (
            <EmptyState
              variant="no-messages"
              title="暂无待处理请求"
              description="您没有待处理的好友请求，去发现更多同命人吧"
              actionLabel="发现同命"
              actionHref="./homology-match-discovery.html"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Requests List */}
              <div className="lg:col-span-1 space-y-3">
                <h2 className="text-lg font-semibold mb-4">请求列表</h2>
                {pendingRequests.map((request) => (
                  <FriendRequestCard
                    key={request.id}
                    request={request}
                    isSelected={selectedRequest?.id === request.id}
                    onSelect={() => setSelectedRequest(request)}
                  />
                ))}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-2">
                {selectedRequest && (
                  <RequestDetailPanel
                    request={selectedRequest}
                    onAccept={() => handleAccept(selectedRequest.id)}
                    onReject={() => handleReject(selectedRequest.id)}
                    onViewProfile={() => handleViewProfile(selectedRequest.userId)}
                  />
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Accepted Requests Tab */}
        <TabsContent value="accepted" className="space-y-6">
          {acceptedRequests.length === 0 ? (
            <EmptyState
              variant="no-matches"
              title="暂无已接受的好友"
              description="您还没有接受任何好友请求"
              actionLabel="查看待处理"
              actionHref="./page-1060063.html"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acceptedRequests.map((request) => (
                <Card key={request.id} className="glass-card hover:shadow-card transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <UserAvatar
                          user={{
                            name: request.userName,
                            avatar: request.avatar,
                            country: request.country,
                            isPro: request.isPro,
                          }}
                          size="default"
                          showHoverCard={false}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold truncate">{request.userName}</h3>
                            {request.isPro && (
                              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                                Pro
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{request.region}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        <SafeIcon name="Zap" className="h-3 w-3 mr-1" />
                        匹配度 {request.matchScore}%
                      </Badge>
                    </div>
                    <RegionBadge country={request.country} region={request.region} size="small" />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewProfile(request.userId)}
                    >
                      <SafeIcon name="Eye" className="h-4 w-4 mr-2" />
                      查看资料
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
