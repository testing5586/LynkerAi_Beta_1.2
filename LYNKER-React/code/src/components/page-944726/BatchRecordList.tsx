
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { MasterRecordSummaryModel } from '@/data/knowledge';
import { MOCK_MASTERS } from '@/data/user';

interface BatchRecordListProps {
  records: MasterRecordSummaryModel[];
}

export default function BatchRecordList({ records }: BatchRecordListProps) {
  if (records.length === 0) {
    return (
      <Card className="glass-card border-primary/20">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无批命记录</h3>
            <p className="text-muted-foreground mb-6">
              您还没有被命理师批命的记录，去预约一次咨询吧。
            </p>
            <Button asChild className="bg-mystical-gradient">
              <a href="./prognosis-service-entry.html">
                <SafeIcon name="Sparkles" className="mr-2 h-4 w-4" />
                预约命理师
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已验证':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '应验中':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case '待验证':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已验证':
        return 'CheckCircle';
      case '应验中':
        return 'Clock';
      case '待验证':
        return 'HelpCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-4">
      {records.map((record) => {
        const master = MOCK_MASTERS.find((m) => m.masterId === record.recordId.split('_')[0]);

        return (
          <Card
            key={record.recordId}
            className="glass-card border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
            onClick={() => window.location.href = './page-944740.html'}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Left Section - Master Info */}
                <div className="flex items-start gap-4 flex-1">
                  <UserAvatar
                    user={{
                      name: master?.realName || '未知命理师',
                      avatar: master?.avatarUrl,
                      country: master?.geoTag.country,
                      isPro: true,
                    }}
                    size="default"
                    showHoverCard={false}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {master?.realName || '未知命理师'}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {master?.expertise || '命理'}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      批命日期：{record.date}
                    </p>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {record.aiNotePreview}
                    </p>
                  </div>
                </div>

                {/* Right Section - Status & Action */}
                <div className="flex flex-col items-end gap-3">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(record.prognosisStatus)} border`}
                  >
                    <SafeIcon name={getStatusIcon(record.prognosisStatus)} className="mr-1 h-3 w-3" />
                    {record.prognosisStatus}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = './page-944740.html';
                    }}
                  >
                    查看详情
                    <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bottom Section - Stats */}
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>记录ID: {record.recordId}</span>
                  <span>客户: {record.clientId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SafeIcon name="Eye" className="h-3 w-3" />
                  <span>点击查看完整记录</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
