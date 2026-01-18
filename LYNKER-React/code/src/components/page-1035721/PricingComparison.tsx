
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import SafeIcon from '@/components/common/SafeIcon';

interface Feature {
  name: string;
  free: boolean | string;
  personal: boolean | string;
  professional: boolean | string;
}

const FEATURES: Feature[] = [
  {
    name: '基础功能',
    free: true,
    personal: true,
    professional: true,
  },
  {
    name: 'AI助手',
    free: '基础版',
    personal: '高级版',
    professional: '企业版',
  },
  {
    name: '月度算力',
    free: '100',
    personal: '1000',
    professional: '2500',
  },
  {
    name: '知识库管理',
    free: true,
    personal: true,
    professional: true,
  },
  {
    name: '客户记录',
    free: false,
    personal: true,
    professional: true,
  },
  {
    name: '预约管理',
    free: false,
    personal: true,
    professional: true,
  },
  {
    name: '工作室页面',
    free: false,
    personal: true,
    professional: true,
  },
  {
    name: '视频会议',
    free: false,
    personal: true,
    professional: true,
  },
  {
    name: '高级分析',
    free: false,
    personal: false,
    professional: true,
  },
  {
    name: '团队管理',
    free: false,
    personal: false,
    professional: true,
  },
  {
    name: 'API接口',
    free: false,
    personal: false,
    professional: true,
  },
  {
    name: '数据导出',
    free: false,
    personal: false,
    professional: true,
  },
  {
    name: '优先支持',
    free: false,
    personal: '工作时间',
    professional: '24/7',
  },
  {
    name: '品牌定制',
    free: false,
    personal: false,
    professional: true,
  },
];

export default function PricingComparison() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(false);
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center items-center">
          <Check className="h-5 w-5 text-accent" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <X className="h-5 w-5 text-muted-foreground/30" />
        </div>
      );
    }
    return (
      <span className="text-sm font-medium text-center block">{value}</span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-semibold">功能</th>
            <th className="text-center py-4 px-4">
              <div className="space-y-1">
                <p className="font-semibold">免费版</p>
                <Badge variant="outline" className="text-xs">$0</Badge>
              </div>
            </th>
            <th className="text-center py-4 px-4">
              <div className="space-y-1">
                <p className="font-semibold">个人版</p>
                <Badge className="bg-accent text-accent-foreground text-xs">$20/月</Badge>
              </div>
            </th>
            <th className="text-center py-4 px-4">
              <div className="space-y-1">
                <p className="font-semibold">专业版</p>
                <Badge className="bg-primary text-primary-foreground text-xs">$40/月</Badge>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feature, index) => (
            <tr
              key={index}
              className={`border-b border-border/50 ${
                index % 2 === 0 ? 'bg-muted/20' : ''
              } hover:bg-muted/40 transition-colors`}
            >
              <td className="py-4 px-4 font-medium text-sm">{feature.name}</td>
              <td className="py-4 px-4 text-center">
                {renderFeatureValue(feature.free)}
              </td>
              <td className="py-4 px-4 text-center">
                {renderFeatureValue(feature.personal)}
              </td>
              <td className="py-4 px-4 text-center">
                {renderFeatureValue(feature.professional)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm font-semibold mb-3">图例说明</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
           <div className="flex items-center gap-2">
             <Check className="h-5 w-5 text-accent" />
             <span>支持此功能</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-sm font-medium">文本</span>
             <span>功能详情或限制说明</span>
           </div>
         </div>
      </div>

      {/* Recommendation */}
      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
          <SafeIcon name="Lightbulb" className="h-4 w-4 text-primary" />
          推荐选择
        </p>
        <p className="text-sm text-muted-foreground">
          对于大多数专业命理师，我们推荐选择<strong>个人版</strong>计划。它提供了充足的算力和完整的功能，性价比最高。如果您需要团队协作或高级分析功能，可以升级到<strong>专业版</strong>。
        </p>
      </div>
    </div>
  );
}
