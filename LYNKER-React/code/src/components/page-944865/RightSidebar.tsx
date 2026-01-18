import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
}

interface BaziChart {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
}

interface ZiWeiChart {
  mainStar: string;
  secondaryStar: string;
  palace: string;
  luckyStars: string[];
}

interface RightSidebarProps {
  onlineUsers: OnlineUser[];
  baziChart: BaziChart;
  ziWeiChart: ZiWeiChart;
}

export default function RightSidebar({
  onlineUsers,
  baziChart,
  ziWeiChart,
}: RightSidebarProps) {
  const [isChartUnlocked, setIsChartUnlocked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [savedPassword, setSavedPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [isDraggingDialog, setIsDraggingDialog] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

  // Load saved password on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chartPassword') || '';
      setSavedPassword(saved);
    }
  }, []);

  const handleUnlockClick = () => {
    if (savedPassword) {
      // If password is already saved, unlock directly
      setIsChartUnlocked(true);
    } else {
      // Show password dialog
      setIsPasswordDialogOpen(true);
      setPasswordError('');
      setInputPassword('');
    }
  };

const handlePasswordSubmit = () => {
     if (!inputPassword.trim()) {
       setPasswordError('请输入密码');
       return;
     }

     // Verify password (default password: '1234')
     const correctPassword = '1234';
     if (inputPassword !== correctPassword) {
       setPasswordError('密码错误');
       return;
     }

     // Save password if checkbox is checked
     if (rememberPassword) {
       localStorage.setItem('chartPassword', inputPassword);
       setSavedPassword(inputPassword);
     }

     setIsChartUnlocked(true);
     setIsPasswordDialogOpen(false);
     setInputPassword('');
     setRememberPassword(false);
     setPasswordError('');
   };

  const handleLockClick = () => {
    setIsChartUnlocked(false);
    // Clear saved password on manual lock
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chartPassword');
      setSavedPassword('');
    }
  };

  const handleDialogMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-draggable-handle]')) {
      setIsDraggingDialog(true);
      setDragStart({ x: e.clientX - dialogPosition.x, y: e.clientY - dialogPosition.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingDialog && dialogRef.current) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setDialogPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingDialog(false);
    };

    if (isDraggingDialog) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingDialog, dragStart]);

  const elementColors = {
    wood: 'text-green-500',
    fire: 'text-red-500',
    earth: 'text-yellow-600',
    metal: 'text-gray-400',
    water: 'text-blue-500',
  };

  const elementLabels = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水',
  };

  return (
    <div className="w-80 border-l border-border bg-background/50 overflow-y-auto hidden xl:block">
      <div className="p-4 space-y-6">
        {/* My Chart Section */}
        <Card className="glass-card border-border/50 overflow-hidden">
<div id="ize30n" className="p-4 space-y-4 h-96 w-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">我的命盤</h3>
              <div className="flex gap-2">
<Dialog open={isZoomed} onOpenChange={setIsZoomed}>
                   <DialogTrigger asChild>
                     <Button
                       variant="ghost"
                       size="sm"
                       className="text-xs"
                       disabled={!isChartUnlocked}
                       title="放大2倍查看命盤"
                     >
                       <SafeIcon name="Maximize2" className="w-3 h-3" />
                     </Button>
                   </DialogTrigger>
<DialogContent 
                        ref={dialogRef}
                        showOverlay={false}
                        className="w-[400px] h-[800px] md:w-[500px] md:h-[900px] lg:w-[600px] lg:h-[950px] overflow-y-auto"
                        style={{
                          position: 'fixed',
                          left: `${dialogPosition.x}px`,
                          top: `${dialogPosition.y}px`,
                          cursor: isDraggingDialog ? 'grabbing' : 'grab',
                          zIndex: 9999,
                        }}
                      >
                     <div 
                       data-draggable-handle
                       className="p-6 space-y-6 cursor-grab active:cursor-grabbing"
                       onMouseDown={handleDialogMouseDown}
                     >
                       <h2 className="text-2xl font-semibold text-foreground">我的命盤</h2>
                      <Tabs defaultValue="bazi" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                          <TabsTrigger value="bazi" className="text-sm">八字</TabsTrigger>
                          <TabsTrigger value="ziwel" className="text-sm">紫薇</TabsTrigger>
                        </TabsList>

                        {/* Zoomed Bazi Chart */}
                        <TabsContent value="bazi" className="space-y-4 mt-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="p-4 rounded bg-muted/50 text-center">
                              <p className="text-sm text-muted-foreground mb-2">年</p>
                              <p className="text-2xl font-semibold">{baziChart.year}</p>
                            </div>
                            <div className="p-4 rounded bg-muted/50 text-center">
                              <p className="text-sm text-muted-foreground mb-2">月</p>
                              <p className="text-2xl font-semibold">{baziChart.month}</p>
                            </div>
                            <div className="p-4 rounded bg-muted/50 text-center">
                              <p className="text-sm text-muted-foreground mb-2">日</p>
                              <p className="text-2xl font-semibold">{baziChart.day}</p>
                            </div>
                            <div className="p-4 rounded bg-muted/50 text-center">
                              <p className="text-sm text-muted-foreground mb-2">时</p>
                              <p className="text-2xl font-semibold">{baziChart.hour}</p>
                            </div>
                          </div>

                          {/* Elements */}
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground">五行分布</p>
                            <div className="space-y-3">
                              {Object.entries(baziChart.elements).map(([element, count]) => (
                                <div key={element} className="flex items-center justify-between">
                                  <span className={`${elementColors[element as keyof typeof elementColors]} text-lg font-medium`}>
                                    {elementLabels[element as keyof typeof elementLabels]}
                                  </span>
                                  <div className="flex items-center gap-2 flex-1 ml-6">
                                    <div className="w-64 h-3 rounded-full bg-muted/50 overflow-hidden">
                                      <div
                                        className="h-full bg-mystical-gradient"
                                        style={{ width: `${(count / 5) * 100}%` }}
                                      />
                                    </div>
                                    <span className="w-8 text-right font-semibold text-lg">{count}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Zoomed Ziwel Chart */}
                        <TabsContent value="ziwel" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="p-4 rounded bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-2">主星</p>
                              <p className="text-2xl font-semibold text-accent">{ziWeiChart.mainStar}</p>
                            </div>
                            <div className="p-4 rounded bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-2">副星</p>
                              <p className="text-2xl font-semibold">{ziWeiChart.secondaryStar}</p>
                            </div>
                            <div className="p-4 rounded bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-2">宮位</p>
                              <p className="text-2xl font-semibold">{ziWeiChart.palace}</p>
                            </div>
                          </div>

                          {/* Lucky Stars */}
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground">吉星</p>
                            <div className="flex flex-wrap gap-3">
                              {ziWeiChart.luckyStars.map((star) => (
                                <Badge key={star} variant="secondary" className="text-base px-3 py-2">
                                  {star}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
</Tabs>
                     </div>
                   </DialogContent>
                 </Dialog>

                 {/* Password Dialog */}
                 <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                   <DialogContent className="sm:max-w-md">
                     <div className="space-y-4">
                       <div>
                         <h2 className="text-lg font-semibold text-foreground">输入密码解锁命盤</h2>
                         <p className="text-xs text-muted-foreground mt-1">请输入密码以查看您的完整命盤</p>
                       </div>
                       
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-foreground">密码</label>
                         <Input
                           type="password"
                           placeholder="请输入密码"
                           value={inputPassword}
                           onChange={(e) => {
                             setInputPassword(e.target.value);
                             setPasswordError('');
                           }}
                           onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                               handlePasswordSubmit();
                             }
                           }}
                           className="text-sm"
                         />
                         {passwordError && (
                           <p className="text-xs text-destructive">{passwordError}</p>
                         )}
                       </div>

                       <div className="flex items-center space-x-2">
                         <input
                           type="checkbox"
                           id="remember-password"
                           checked={rememberPassword}
                           onChange={(e) => setRememberPassword(e.target.checked)}
                           className="w-4 h-4 rounded border border-input cursor-pointer"
                         />
                         <label htmlFor="remember-password" className="text-xs text-foreground cursor-pointer">
                           保存密码
                         </label>
                       </div>

                       <div className="flex gap-2 pt-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="flex-1"
                           onClick={() => {
                             setIsPasswordDialogOpen(false);
                             setInputPassword('');
                             setPasswordError('');
                           }}
                         >
                           取消
                         </Button>
                         <Button
                           size="sm"
                           className="flex-1 bg-mystical-gradient hover:opacity-90"
                           onClick={handlePasswordSubmit}
                         >
                           解锁
                         </Button>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>

                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={isChartUnlocked ? handleLockClick : handleUnlockClick}
                   className="text-xs"
                 >
                   {isChartUnlocked ? (
                     <>
                       <SafeIcon name="Lock" className="w-3 h-3 mr-1" />
                       锁定
                     </>
                   ) : (
                     <>
                       <SafeIcon name="Unlock" className="w-3 h-3 mr-1" />
                       解锁
                     </>
                   )}
                 </Button>
              </div>
            </div>

            {isChartUnlocked ? (
              <Tabs defaultValue="bazi" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="bazi" className="text-xs">八字</TabsTrigger>
                  <TabsTrigger value="ziwel" className="text-xs">紫薇</TabsTrigger>
                </TabsList>

                {/* Bazi Chart */}
                <TabsContent value="bazi" className="space-y-3 mt-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 rounded bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">年</p>
                      <p className="text-sm font-semibold">{baziChart.year}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">月</p>
                      <p className="text-sm font-semibold">{baziChart.month}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">日</p>
                      <p className="text-sm font-semibold">{baziChart.day}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">时</p>
                      <p className="text-sm font-semibold">{baziChart.hour}</p>
                    </div>
                  </div>

                  {/* Elements */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">五行分布</p>
                    <div className="space-y-1">
                      {Object.entries(baziChart.elements).map(([element, count]) => (
                        <div key={element} className="flex items-center justify-between text-xs">
                          <span className={elementColors[element as keyof typeof elementColors]}>
                            {elementLabels[element as keyof typeof elementLabels]}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-16 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                              <div
                                className="h-full bg-mystical-gradient"
                                style={{ width: `${(count / 5) * 100}%` }}
                              />
                            </div>
                            <span className="w-4 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Ziwel Chart */}
                <TabsContent value="ziwel" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">主星</p>
                      <p className="text-sm font-semibold text-accent">{ziWeiChart.mainStar}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">副星</p>
                      <p className="text-sm font-semibold">{ziWeiChart.secondaryStar}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">宫位</p>
                      <p className="text-sm font-semibold">{ziWeiChart.palace}</p>
                    </div>
                  </div>

                  {/* Lucky Stars */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">吉星</p>
                    <div className="flex flex-wrap gap-1">
                      {ziWeiChart.luckyStars.map((star) => (
                        <Badge key={star} variant="secondary" className="text-xs">
                          {star}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div id="i5d4tm" className="py-8 text-center flex flex-col items-center justify-center h-72">
                <SafeIcon id="izml9j" name="Lock" className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p id="idg9bf" className="text-xs text-muted-foreground">点击解锁查看命盤</p>
              </div>
            )}
          </div>
        </Card>

        {/* Online Users */}
        <Card className="glass-card border-border/50">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">在线朋友</h3>
              <Badge variant="secondary" className="text-xs">
                {onlineUsers.filter((u) => u.status === 'online').length} 在线
              </Badge>
            </div>

<div className="space-y-2">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors group"
                >
                  <div className="relative">
                    <UserAvatar user={{ name: user.name, avatar: user.avatar }} size="small" showHoverCard={false} />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                        user.status === 'online'
                          ? 'bg-green-500'
                          : user.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user.name}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        // Say Hi action
                        if (typeof window !== 'undefined') {
                          alert(`向 ${user.name} 打招呼！`);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-primary/20 transition-colors"
                      title="打招呼"
                    >
                      <SafeIcon name="Heart" className="w-3.5 h-3.5 text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        // Invite to chat room - navigate to page_945207
                        if (typeof window !== 'undefined') {
                          window.location.href = './page-945207.html';
                        }
                      }}
                      className="p-1.5 rounded hover:bg-accent/20 transition-colors"
                      title="邀请进入聊天室"
                    >
                      <SafeIcon name="MessageSquare" className="w-3.5 h-3.5 text-accent" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button className="w-full bg-mystical-gradient hover:opacity-90" asChild>
            <a href="./page-944864.html">
              <SafeIcon name="Edit" className="w-4 h-4 mr-2" />
              发布动态
            </a>
          </Button>
<Button variant="outline" className="w-full" asChild>
            <a href="./page-1060398.html" id="ioylnk">
              <SafeIcon name="Users" className="w-4 h-4 mr-2" />
              全部已加灵友
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}