
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_USER_ALIASES, MOCK_MASTERS } from '@/data/base-mock';

interface Friend {
  userId: string;
  alias: string;
  avatar: string;
  country: string;
  region: string;
  isMaster: boolean;
  isFollowing: boolean;
  isHomologyMatch: boolean;
  addedDate: string;
}

// Mock friends data
const MOCK_FRIENDS: Friend[] = [
{
    userId: 'user_001',
    alias: MOCK_USER_ALIASES[0],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5.png',
    country: '中国',
    region: '北京',
    isMaster: false,
    isFollowing: true,
    isHomologyMatch: false,
    addedDate: '2025-10-15',
  },
  {
    userId: 'user_002',
    alias: MOCK_USER_ALIASES[1],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f1e2d3c4-b5a6-4d7c-8b9a-e0f1a2b3c4d5.png',
    country: '新加坡',
    region: '新加坡',
    isMaster: false,
    isFollowing: true,
    isHomologyMatch: true,
    addedDate: '2025-10-20',
  },
  {
    userId: 'user_003',
    alias: MOCK_USER_ALIASES[2],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/84fe2122-c6a6-4adc-9282-ed9f63c49012.png',
    country: '中国',
    region: '香港',
    isMaster: false,
    isFollowing: false,
    isHomologyMatch: true,
    addedDate: '2025-11-01',
  },
  {
    userId: 'master_001',
    alias: MOCK_MASTERS[0].realName,
    avatar: MOCK_MASTERS[0].avatarUrl,
    country: '中国',
    region: '四川成都',
    isMaster: true,
    isFollowing: true,
    isHomologyMatch: false,
    addedDate: '2025-09-10',
  },
  {
    userId: 'user_004',
    alias: MOCK_USER_ALIASES[3],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png',
    country: '日本',
    region: '东京',
    isMaster: false,
    isFollowing: true,
    isHomologyMatch: false,
    addedDate: '2025-11-05',
  },
  {
    userId: 'master_002',
    alias: MOCK_MASTERS[1].realName,
    avatar: MOCK_MASTERS[1].avatarUrl,
    country: '美国',
    region: '加利福尼亚州',
    isMaster: true,
    isFollowing: false,
    isHomologyMatch: false,
    addedDate: '2025-08-20',
  },
];

export default function FriendsOverviewPage() {
  const [isClient, setIsClient] = useState(false);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);

  useEffect(() => {
    setIsClient(false);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.alias.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'following') {
      return matchesSearch && friend.isFollowing;
    } else if (activeTab === 'masters') {
      return matchesSearch && friend.isMaster;
    } else if (activeTab === 'lynkermates') {
      return matchesSearch && !friend.isMaster && !friend.isHomologyMatch;
    } else if (activeTab === 'homologyMatches') {
      return matchesSearch && !friend.isMaster && friend.isHomologyMatch;
    }
    
    return matchesSearch;
  });

  const totalFriends = friends.length;
  const followingCount = friends.filter(f => f.isFollowing).length;
  const mastersCount = friends.filter(f => f.isMaster).length;
  const lynkermateCount = friends.filter(f => !f.isMaster && !f.isHomologyMatch).length;
  const homologyMatchCount = friends.filter(f => !f.isMaster && f.isHomologyMatch).length;

  const handleDeleteFriend = () => {
    if (selectedFriend) {
      setFriends(friends.filter(f => f.userId !== selectedFriend.userId));
      setShowDeleteDialog(false);
      setSelectedFriend(null);
    }
  };

  const handleBlockFriend = () => {
    if (selectedFriend) {
      setFriends(friends.filter(f => f.userId !== selectedFriend.userId));
      setShowBlockDialog(false);
      setSelectedFriend(null);
    }
  };

  const handleUnfollow = (friend: Friend) => {
    setFriends(friends.map(f => 
      f.userId === friend.userId ? { ...f, isFollowing: false } : f
    ));
  };

  const handleFollow = (friend: Friend) => {
    setFriends(friends.map(f => 
      f.userId === friend.userId ? { ...f, isFollowing: true } : f
    ));
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">灵友总览</h1>
            <p className="text-muted-foreground">管理您的好友和关注列表</p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            返回上一页
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-mystical">{totalFriends}</div>
                <p className="text-sm text-muted-foreground mt-1">总好友数</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{followingCount}</div>
                <p className="text-sm text-muted-foreground mt-1">已关注</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{mastersCount}</div>
                <p className="text-sm text-muted-foreground mt-1">命理师</p>
              </div>
            </CardContent>
          </Card>
<Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{lynkermateCount}</div>
                <p className="text-sm text-muted-foreground mt-1">灵友</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{homologyMatchCount}</div>
                <p className="text-sm text-muted-foreground mt-1">同命友</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索好友名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

{/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">全部 ({totalFriends})</TabsTrigger>
          <TabsTrigger value="following">已关注 ({followingCount})</TabsTrigger>
          <TabsTrigger value="masters">命理师 ({mastersCount})</TabsTrigger>
          <TabsTrigger value="lynkermates">灵友 ({lynkermateCount})</TabsTrigger>
          <TabsTrigger value="homologyMatches">同命友 ({homologyMatchCount})</TabsTrigger>
        </TabsList>

        {/* Friends List */}
        <TabsContent value={activeTab} className="space-y-4">
          {filteredFriends.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <SafeIcon name="Users" className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">暂无好友</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredFriends.map((friend) => (
                <Card key={friend.userId} className={`glass-card transition-all ${isClient ? 'opacity-100' : 'opacity-75'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      {/* Friend Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <UserAvatar
                          user={{
                            name: friend.alias,
                            avatar: friend.avatar,
                            country: friend.country,
                            isPro: friend.isMaster,
                          }}
                          size="default"
                          showHoverCard={isClient}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{friend.alias}</h3>
                            {friend.isMaster && (
                              <Badge className="bg-accent text-accent-foreground shrink-0">
                                <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                                命理师
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <RegionBadge country={friend.country} region={friend.region} size="small" />
                            <span className="text-xs text-muted-foreground">
                              加好友于 {friend.addedDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {friend.isFollowing ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnfollow(friend)}
                            className={isClient ? 'opacity-100' : 'opacity-50'}
                          >
                            <SafeIcon name="Heart" className="h-4 w-4 mr-1 fill-current" />
                            已关注
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollow(friend)}
                            className={isClient ? 'opacity-100' : 'opacity-50'}
                          >
                            <SafeIcon name="Heart" className="h-4 w-4 mr-1" />
                            关注
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={isClient ? 'opacity-100' : 'opacity-50'}
                            >
                              <SafeIcon name="MoreVertical" className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedFriend(friend);
                                setShowDeleteDialog(true);
                              }}
                              className="text-destructive"
                            >
                              <SafeIcon name="Trash2" className="h-4 w-4 mr-2" />
                              删除好友
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedFriend(friend);
                                setShowBlockDialog(true);
                              }}
                              className="text-destructive"
                            >
                              <SafeIcon name="Ban" className="h-4 w-4 mr-2" />
                              拉黑用户
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>删除好友</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除 <span className="font-semibold text-foreground">{selectedFriend?.alias}</span> 吗？删除后将无法看到对方的动态。
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFriend}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block Confirmation Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>拉黑用户</AlertDialogTitle>
          <AlertDialogDescription>
            确定要拉黑 <span className="font-semibold text-foreground">{selectedFriend?.alias}</span> 吗？拉黑后将无法互相看到对方的内容和消息。
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlockFriend}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              拉黑
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
