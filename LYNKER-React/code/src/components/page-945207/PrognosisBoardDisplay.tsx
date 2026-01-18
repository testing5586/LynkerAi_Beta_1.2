
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisQuickViewModel } from '@/data/social_feed';

interface PrognosisBoardDisplayProps {
  userPrognosisData: PrognosisQuickViewModel;
  friendPrognosisData: PrognosisQuickViewModel;
  userName: string;
  friendName: string;
}

export default function PrognosisBoardDisplay({
  userPrognosisData,
  friendPrognosisData,
  userName,
  friendName,
}: PrognosisBoardDisplayProps) {
  const [isUserBoardUnlocked, setIsUserBoardUnlocked] = useState(true);
  const [isFriendBoardUnlocked, setIsFriendBoardUnlocked] = useState(false);

  return (
    <Card className="glass-card p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <SafeIcon name="Star" className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-sm">命盘对比</h3>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="user" className="text-xs">
            {userName}
          </TabsTrigger>
          <TabsTrigger value="friend" className="text-xs">
            {friendName}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">八字命盘</p>
              {isUserBoardUnlocked && (
                <SafeIcon name="Lock" className="w-3 h-3 text-accent" />
              )}
            </div>
            <div className="bg-muted/50 rounded-lg p-3 min-h-24 flex items-center justify-center">
              {isUserBoardUnlocked ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary mx-auto mb-2 flex items-center justify-center">
                    <SafeIcon name="Grid3x3" className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground">八字命盘已解锁</p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUserBoardUnlocked(true)}
                  className="text-xs"
                >
                  <SafeIcon name="Lock" className="w-3 h-3 mr-1" />
                  解锁命盘
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">紫微命盘</p>
            <div className="bg-muted/50 rounded-lg p-3 min-h-24 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent to-primary mx-auto mb-2 flex items-center justify-center">
                  <SafeIcon name="Compass" className="w-8 h-8 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">紫微命盘已解锁</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
            <p className="text-xs text-foreground/80 line-clamp-3">
              {userPrognosisData.baziSummary}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="friend" className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">八字命盘</p>
              {!isFriendBoardUnlocked && (
                <SafeIcon name="Lock" className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
            <div className="bg-muted/50 rounded-lg p-3 min-h-24 flex items-center justify-center">
              {isFriendBoardUnlocked ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary mx-auto mb-2 flex items-center justify-center">
                    <SafeIcon name="Grid3x3" className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground">八字命盘已解锁</p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFriendBoardUnlocked(true)}
                  className="text-xs"
                >
                  <SafeIcon name="Lock" className="w-3 h-3 mr-1" />
                  解锁命盘
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">紫微命盘</p>
            <div className="bg-muted/50 rounded-lg p-3 min-h-24 flex items-center justify-center">
              {isFriendBoardUnlocked ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent to-primary mx-auto mb-2 flex items-center justify-center">
                    <SafeIcon name="Compass" className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground">紫微命盘已解锁</p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFriendBoardUnlocked(true)}
                  className="text-xs"
                >
                  <SafeIcon name="Lock" className="w-3 h-3 mr-1" />
                  解锁命盘
                </Button>
              )}
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-2">
            <p className="text-xs text-foreground/80 line-clamp-3">
              {friendPrognosisData.baziSummary}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Comparison Insight */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs font-semibold text-accent mb-2">同频指数</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-primary to-accent" />
          </div>
          <span className="text-xs font-bold text-accent">85%</span>
        </div>
      </div>
    </Card>
  );
}
