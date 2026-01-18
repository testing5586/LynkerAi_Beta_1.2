
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import SecurityBanner from '@/components/common/SecurityBanner';
import { MOCK_BLACKBOX_DATA } from '@/data/blackbox';

export default function BlackboxContent() {
  const [isProtected, setIsProtected] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    // Security measures
    
    // 1. Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable keyboard shortcuts for copy/screenshot
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Cmd+C - Copy
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        showSecurityAlert('复制功能已禁用');
        return false;
      }
      // Ctrl+X - Cut
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault();
        return false;
      }
      // Ctrl+A - Select All
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        return false;
      }
      // Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        showSecurityAlert('截图功能已禁用');
        return false;
      }
      // F12 - Developer Tools
      if (e.key === 'F12') {
        e.preventDefault();
        showSecurityAlert('开发者工具已禁用');
        return false;
      }
      // Ctrl+Shift+I - Developer Tools
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C - Inspect Element
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 4. Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu, false);
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('selectstart', handleSelectStart, false);
    document.addEventListener('dragstart', handleDragStart, false);

    // Simulate access verification
    const timer = setTimeout(() => {
      setAccessGranted(true);
    }, 1500);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      clearTimeout(timer);
    };
  }, []);

  const showSecurityAlert = (message: string) => {
    // In a real app, this would show a toast notification
    console.warn(message);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="blackbox-container container px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="hover:bg-muted"
          >
            <SafeIcon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical">核心AI隐秘分析</h1>
            <p className="text-sm text-muted-foreground mt-1">
              高权限分析结果 • 加密保护 • 仅授权用户可见
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">访问已授权</span>
          </div>
        </div>
      </div>

      {/* Security Banner */}
      <SecurityBanner variant="default" className="mb-8" />

      {/* Access Verification Status */}
      {!accessGranted && (
        <Card className="glass-card p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-mystical-gradient flex items-center justify-center animate-pulse">
              <SafeIcon name="Lock" className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">验证访问权限中...</h3>
          <p className="text-muted-foreground mb-4">
            系统正在验证您的访问权限，请稍候
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </Card>
      )}

      {/* Content */}
      {accessGranted && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Analysis Header */}
          <Card className="glass-card p-6 border-accent/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                  <span>分析ID: {MOCK_BLACKBOX_DATA.analysisId}</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  来源: {getSourceTypeLabel(MOCK_BLACKBOX_DATA.sourceType)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-2">安全等级</p>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-6 rounded-sm ${
                        i <= 5 ? 'bg-accent' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/80">
              {MOCK_BLACKBOX_DATA.contextDescription}
            </p>
          </Card>

          {/* Encrypted Content */}
          <Card className="glass-card p-8 border-2 border-dashed border-accent/50 bg-gradient-to-br from-background to-primary/5">
            <div className="mb-6 flex items-center space-x-2">
              <SafeIcon name="Shield" className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-accent">加密分析内容</h3>
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                RSA-4096
              </span>
            </div>

            <div className="blackbox-content space-y-4 select-none">
              {/* Render encrypted content with special styling */}
              <div className="prose prose-invert max-w-none text-sm">
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50 font-mono text-xs leading-relaxed text-foreground/70">
                  <div className="mb-4">
                    <span className="text-accent font-semibold">## 核心命理规律验证</span>
                    <span className="text-muted-foreground"> (受保护分析)</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-primary">数据块 A92X:</span>
                      <span className="text-foreground/60">
                        {' '}发现金木交战在特定纬度人群中，对肝功能影响系数高于平均值 1.5。模型预测此规律的准确度为 98.2%。
                      </span>
                    </div>

                    <div className="text-muted-foreground italic">
                      [...更多高权限分析数据已加密]
                    </div>

                    <div>
                      <span className="text-primary">数据块 C33V:</span>
                      <span className="text-foreground/60">
                        {' '}(此内容已通过RSA-4096加密，无法显示原始文本)
                      </span>
                    </div>

                    <div className="text-muted-foreground italic mt-4">
                      [系统自动加密 • 防止数据泄露 • 仅授权用户可见]
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="text-center text-xs text-muted-foreground/50 mt-6 pointer-events-none">
                <p>此内容受到严格保护 • 禁止复制 • 禁止截图 • 禁止爬虫</p>
                <p className="mt-1">用户ID: {generateUserHash()} • 访问时间: {new Date().toLocaleString('zh-CN')}</p>
              </div>
            </div>
          </Card>

          {/* Security Measures Info */}
          <Card className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <SafeIcon name="Lock" className="h-5 w-5 text-accent" />
              <span>启用的安全措施</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_BLACKBOX_DATA.securityMeasures.map((measure, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{measure}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Access Info */}
          <Alert className="border-accent/30 bg-accent/5">
            <SafeIcon name="Info" className="h-4 w-4 text-accent" />
            <AlertTitle>访问信息</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
              <p>
                您已获得授权查看此高权限分析结果。此内容仅供个人研究和参考之用，严禁转发、分享或商业使用。
              </p>
              <p className="text-xs text-muted-foreground">
                访问记录已被记录。任何违规行为将导致账户被永久封禁。
              </p>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center space-x-2"
            >
              <SafeIcon name="ArrowLeft" className="h-4 w-4" />
              <span>返回帖子详情</span>
            </Button>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <SafeIcon name="Eye" className="h-4 w-4" />
              <span>此页面已启用完整保护</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSourceTypeLabel(sourceType: string): string {
  const labels: Record<string, string> = {
    Forum: '论坛讨论',
    Consultation: '咨询会话',
    Research: '研究数据',
  };
  return labels[sourceType] || sourceType;
}

function generateUserHash(): string {
  // Generate a pseudo-random user hash for display
  return 'USR_' + Math.random().toString(36).substring(2, 10).toUpperCase();
}
