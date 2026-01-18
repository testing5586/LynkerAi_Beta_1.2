'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';

interface FriendRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  region: string;
  mutualFriends: number;
  requestTime: string;
}

const mockFriendRequests: FriendRequest[] = [
  {
    id: '1',
    userId: 'user_001',
    userName: '灵客用户A',
    userAvatar: '灵',
    region: '北京',
    mutualFriends: 3,
    requestTime: '2小时前'
  },
  {
    id: '2',
    userId: 'user_002',
    userName: '灵客用户B',
    userAvatar: '灵',
    region: '上海',
    mutualFriends: 1,
    requestTime: '6小时前'
  },
  {
    id: '3',
    userId: 'user_003',
    userName: '灵客用户C',
    userAvatar: '灵',
    region: '深圳',
    mutualFriends: 0,
    requestTime: '1天前'
  },
];

export default function UserFriendRequestPage() {
  const [requests, setRequests] = useState(mockFriendRequests);
  const [activeTab, setActiveTab] = useState('pending');

  const handleAccept = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleNavigateBack = () => {
    window.location.href = './page-944865.html';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNavigateBack}
            >
              <SafeIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">好友请求</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {requests.length} 条待处理
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 max-w-xs bg-muted/50">
              <TabsTrigger value="pending">待处理</TabsTrigger>
              <TabsTrigger value="sent">已发送</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Friend Requests List */}
        <div className="space-y-3">
          {activeTab === 'pending' && (
            <>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <Card
                    key={request.id}
                    className="p-4 glass-card border-border/50 transition-all hover:border-primary/50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* User Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative inline-block flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {request.userAvatar}
                            </span>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background bg-green-500"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate text-foreground">
                            {request.userName}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <SafeIcon name="MapPin" className="w-3 h-3" />
                            <span>{request.region}</span>
                            {request.mutualFriends > 0 && (
                              <>
                                <span>•</span>
                                <span>{request.mutualFriends} 个共同好友</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{request.requestTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                          className="text-xs"
                        >
                          拒绝
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs bg-mystical-gradient hover:opacity-90"
                          onClick={() => handleAccept(request.id)}
                        >
                          接受
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center glass-card border-border/50">
                  <SafeIcon name="Users" className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">暂无好友请求</p>
                  <p className="text-sm text-muted-foreground/70">您的好友请求已全部处理</p>
                </Card>
              )}
            </>
          )}

          {activeTab === 'sent' && (
            <Card className="p-12 text-center glass-card border-border/50">
              <SafeIcon name="Send" className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">已发送的好友请求列表</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}