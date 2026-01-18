
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface AnnualFortuneChartProps {
  yearData: any;
  selectedMonth: number;
}

export default function AnnualFortuneChart({ yearData, selectedMonth }: AnnualFortuneChartProps) {
  const chartData = yearData.months.map((month: any, index: number) => ({
    month: `${index + 1}月`,
    overall: month.overallScore,
    career: month.careerScore,
    love: month.loveScore,
    wealth: month.wealthScore,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="overall"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
            name="整体运势"
          />
          <Line
            type="monotone"
            dataKey="career"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))', r: 4 }}
            activeDot={{ r: 6 }}
            name="事业运"
          />
          <Line
            type="monotone"
            dataKey="love"
            stroke="hsl(270 60% 50%)"
            strokeWidth={2}
            dot={{ fill: 'hsl(270 60% 50%)', r: 4 }}
            activeDot={{ r: 6 }}
            name="感情运"
          />
          <Line
            type="monotone"
            dataKey="wealth"
            stroke="hsl(200 60% 50%)"
            strokeWidth={2}
            dot={{ fill: 'hsl(200 60% 50%)', r: 4 }}
            activeDot={{ r: 6 }}
            name="财运"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
