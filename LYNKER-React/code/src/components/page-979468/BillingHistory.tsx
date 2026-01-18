
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SafeIcon from '@/components/common/SafeIcon';

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  invoiceUrl?: string;
}

const MOCK_BILLING_HISTORY: BillingRecord[] = [
  {
    id: 'bill_001',
    date: '2025-11-12',
    description: '命理师咨询服务 - 张三丰',
    amount: 800,
    status: 'paid',
    paymentMethod: '微信支付',
    invoiceUrl: '#',
  },
  {
    id: 'bill_002',
    date: '2025-11-10',
    description: 'API Token 充值 (10000 tokens)',
    amount: 500,
    status: 'paid',
    paymentMethod: '支付宝',
    invoiceUrl: '#',
  },
  {
    id: 'bill_003',
    date: '2025-11-08',
    description: '高级会员订阅 (1个月)',
    amount: 99,
    status: 'paid',
    paymentMethod: '信用卡',
    invoiceUrl: '#',
  },
  {
    id: 'bill_004',
    date: '2025-11-05',
    description: '命理师咨询服务 - 李明娜',
    amount: 950,
    status: 'paid',
    paymentMethod: '微信支付',
    invoiceUrl: '#',
  },
  {
    id: 'bill_005',
    date: '2025-11-01',
    description: 'API Token 充值 (5000 tokens)',
    amount: 250,
    status: 'pending',
    paymentMethod: '支付宝',
    invoiceUrl: '#',
  },
  {
    id: 'bill_006',
    date: '2025-10-28',
    description: '命理师咨询服务 - 王道一',
    amount: 1200,
    status: 'failed',
    paymentMethod: '信用卡',
    invoiceUrl: '#',
  },
];

export default function BillingHistory() {
  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { label: '已支付', className: 'bg-green-500/20 text-green-600' },
      pending: { label: '待支付', className: 'bg-yellow-500/20 text-yellow-600' },
      failed: { label: '失败', className: 'bg-red-500/20 text-red-600' },
    };
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const totalAmount = MOCK_BILLING_HISTORY.reduce((sum, record) => {
    if (record.status === 'paid') return sum + record.amount;
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总消费金额
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gradient-mystical">¥ {totalAmount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">最近30天</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              待支付账单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">¥ 250.00</p>
            <p className="text-xs text-muted-foreground mt-1">1 笔待支付</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              交易次数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{MOCK_BILLING_HISTORY.length}</p>
            <p className="text-xs text-muted-foreground mt-1">全部交易</p>
          </CardContent>
        </Card>
      </div>

      {/* Billing Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>账单详情</CardTitle>
          <CardDescription>您的所有交易记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日期</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>支付方式</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_BILLING_HISTORY.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {record.description}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ¥ {record.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.paymentMethod}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {record.invoiceUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a href={record.invoiceUrl} title="下载发票">
                            <SafeIcon name="Download" className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {record.status === 'failed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                        >
                          重试
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">导出账单</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2">
            <SafeIcon name="FileText" className="h-4 w-4" />
            导出为 PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <SafeIcon name="Sheet" className="h-4 w-4" />
            导出为 CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <SafeIcon name="Mail" className="h-4 w-4" />
            发送到邮箱
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
