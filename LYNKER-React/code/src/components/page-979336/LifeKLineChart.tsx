import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface LifeCategory {
  name: string;
  score: number;
  icon: string;
  color: string;
}

const LIFE_CATEGORIES: LifeCategory[] = [
  { name: '财运', score: 78, icon: 'Wallet', color: '#10B981' },
  { name: '事业', score: 65, icon: 'Briefcase', color: '#3B82F6' },
  { name: '婚姻', score: 82, icon: 'Heart', color: '#F43F5E' },
  { name: '健康', score: 70, icon: 'Activity', color: '#F59E0B' },
];

// Mock data for lifetime fortune curve
const LIFE_FORTUNE_DATA = Array.from({ length: 100 }, (_, i) => {
  const age = i + 1;
  // Create a realistic fortune curve with ups and downs
  const baseScore = 50 + Math.sin((age / 100) * Math.PI) * 30;
  const cycle = Math.sin((age / 10) * Math.PI) * 15;
  const noise = (Math.random() - 0.5) * 8;
  const score = Math.max(20, Math.min(95, Math.round(baseScore + cycle + noise)));
  return { age, score };
});

export default function LifeKLineChart() {
  const totalScore = Math.round(
    LIFE_CATEGORIES.reduce((sum, cat) => sum + cat.score, 0) / LIFE_CATEGORIES.length
  );

  // Data for pie chart
  const pieData = [
    { name: '达成', value: totalScore },
    { name: '目标', value: 100 - totalScore },
  ];

  const COLORS = ['#8B5CF6', '#27272A'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <SafeIcon name="TrendingUp" className="h-6 w-6 text-accent" />
          <span>人生K线图</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          基于您的出生命盘分析，这是您在各个生活领域的运势评分
        </p>
      </div>

      {/* Main Grid - Score Overview + Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {LIFE_CATEGORIES.map((category) => (
            <Card 
              key={category.name}
              className="glass-card hover:shadow-card transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Circle */}
              <div 
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: category.color }}
              />
              
              <CardContent className="pt-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <SafeIcon 
                      name={category.icon} 
                      className="h-6 w-6 text-accent"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold">{category.name}</p>
                  </div>
                  
                  {/* Score Display */}
                  <div className="space-y-2 w-full">
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mystical-gradient transition-all duration-500"
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-lg font-bold text-primary">
                        {category.score}
                      </span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Score Circle Chart */}
        <Card className="glass-card flex items-center justify-center">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Title */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">综合运势评分</p>
              </div>

              {/* Pie Chart */}
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Score Text */}
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-gradient-mystical">
                  {totalScore}
                </div>
                <p className="text-sm text-muted-foreground">
                  整体运势评分
                </p>
              </div>

              {/* Status Badge */}
              <Badge className="bg-accent text-accent-foreground">
                <SafeIcon name="Star" className="h-3 w-3 mr-1" />
                {totalScore >= 80 ? '高运势' : totalScore >= 60 ? '中运势' : '待提升'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

{/* Lifetime Fortune Curve Chart */}
       <Card className="glass-card">
         <CardHeader>
           <CardTitle className="text-base flex items-center space-x-2">
             <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
             <span>人生运势曲线（1-100岁）</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="w-full h-96">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={LIFE_FORTUNE_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                 <XAxis
                   dataKey="age"
                   stroke="rgba(255,255,255,0.5)"
                   style={{ fontSize: '12px' }}
                   interval={9}
                 />
                 <YAxis
                   stroke="rgba(255,255,255,0.5)"
                   style={{ fontSize: '12px' }}
                   domain={[0, 100]}
                 />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: 'rgba(20, 20, 30, 0.9)',
                     border: '1px solid rgba(139, 92, 246, 0.3)',
                     borderRadius: '8px',
                     color: '#fff',
                   }}
                   formatter={(value) => `${value}/100`}
                   labelStyle={{ color: '#fff' }}
                 />
                 <Line
                   type="monotone"
                   dataKey="score"
                   stroke="#D97706"
                   strokeWidth={2}
                   dot={false}
                   activeDot={{ r: 6 }}
                   isAnimationActive={true}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <p className="text-sm text-muted-foreground mt-4">
             上图展示了您从1岁到100岁的运势变化趋势。运势曲线综合考虑了八字、紫微等多个命理维度的影响。
           </p>
         </CardContent>
       </Card>

       {/* Insights Section */}
       <Card className="glass-card">
         <CardHeader>
           <CardTitle className="text-base flex items-center space-x-2">
             <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent" />
             <span>运势解读</span>
           </CardTitle>
         </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <p className="text-foreground/80">
              财运运势较佳，宜把握投资理财机会，但需谨慎风险管理。
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <p className="text-foreground/80">
              事业方面需要积极进取，抓住升迁机会，同时注意工作与生活的平衡。
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <p className="text-foreground/80">
              感情运势向好，宜加强沟通交流，维护亲密关系的稳定发展。
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <p className="text-foreground/80">
              健康方面需加强运动和调理，保持乐观心态，定期体检。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}