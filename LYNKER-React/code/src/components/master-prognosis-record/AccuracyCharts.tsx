import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AccuracyChartsProps {
  variant?: 'historical' | 'predicted';
}

// Mock data for historical accuracy with year dimension
const allHistoricalData = [
  // 2023 年
  { year: 2023, month: '1月', accuracy: 72, total: 10, verified: 7 },
  { year: 2023, month: '2月', accuracy: 75, total: 11, verified: 8 },
  { year: 2023, month: '3月', accuracy: 68, total: 9, verified: 6 },
  { year: 2023, month: '4月', accuracy: 80, total: 12, verified: 10 },
  { year: 2023, month: '5月', accuracy: 82, total: 13, verified: 11 },
  { year: 2023, month: '6月', accuracy: 76, total: 14, verified: 11 },
  { year: 2023, month: '7月', accuracy: 81, total: 11, verified: 9 },
  { year: 2023, month: '8月', accuracy: 84, total: 13, verified: 11 },
  { year: 2023, month: '9月', accuracy: 79, total: 14, verified: 11 },
  { year: 2023, month: '10月', accuracy: 83, total: 12, verified: 10 },
  { year: 2023, month: '11月', accuracy: 85, total: 10, verified: 9 },
  { year: 2023, month: '12月', accuracy: 80, total: 8, verified: 6 },
  // 2024 年
  { year: 2024, month: '1月', accuracy: 78, total: 12, verified: 9 },
  { year: 2024, month: '2月', accuracy: 82, total: 14, verified: 11 },
  { year: 2024, month: '3月', accuracy: 75, total: 16, verified: 12 },
  { year: 2024, month: '4月', accuracy: 85, total: 13, verified: 11 },
  { year: 2024, month: '5月', accuracy: 88, total: 15, verified: 13 },
  { year: 2024, month: '6月', accuracy: 80, total: 18, verified: 14 },
  { year: 2024, month: '7月', accuracy: 86, total: 14, verified: 12 },
  { year: 2024, month: '8月', accuracy: 89, total: 16, verified: 14 },
  { year: 2024, month: '9月', accuracy: 84, total: 17, verified: 14 },
  { year: 2024, month: '10月', accuracy: 87, total: 15, verified: 13 },
  { year: 2024, month: '11月', accuracy: 90, total: 12, verified: 11 },
  { year: 2024, month: '12月', accuracy: 85, total: 10, verified: 8 },
  // 2025 年
  { year: 2025, month: '1月', accuracy: 86, total: 13, verified: 11 },
  { year: 2025, month: '2月', accuracy: 89, total: 15, verified: 13 },
  { year: 2025, month: '3月', accuracy: 87, total: 17, verified: 15 },
  { year: 2025, month: '4月', accuracy: 91, total: 14, verified: 13 },
  { year: 2025, month: '5月', accuracy: 93, total: 16, verified: 15 },
  { year: 2025, month: '6月', accuracy: 88, total: 19, verified: 16 },
];

// Mock data for predicted accuracy with year dimension
const allPredictedData = [
  // 2024 年预测
  { year: 2024, month: '1月', predicted: 86, confidence: 92 },
  { year: 2024, month: '2月', predicted: 87, confidence: 90 },
  { year: 2024, month: '3月', predicted: 88, confidence: 88 },
  { year: 2024, month: '4月', predicted: 89, confidence: 85 },
  { year: 2024, month: '5月', predicted: 88, confidence: 83 },
  { year: 2024, month: '6月', predicted: 87, confidence: 80 },
  // 2025 年预测
  { year: 2025, month: '1月', predicted: 91, confidence: 88 },
  { year: 2025, month: '2月', predicted: 92, confidence: 87 },
  { year: 2025, month: '3月', predicted: 90, confidence: 85 },
  { year: 2025, month: '4月', predicted: 93, confidence: 83 },
  { year: 2025, month: '5月', predicted: 91, confidence: 80 },
  { year: 2025, month: '6月', predicted: 89, confidence: 78 },
];

// Get available years
const availableYears = Array.from(new Set(allHistoricalData.map(d => d.year))).sort((a, b) => b - a);
const availablePredictionYears = Array.from(new Set(allPredictedData.map(d => d.year))).sort((a, b) => b - a);

export default function AccuracyCharts({ variant = 'historical' }: AccuracyChartsProps) {
  const [selectedYear, setSelectedYear] = useState<string>(
    variant === 'historical' ? String(availableYears[0]) : String(availablePredictionYears[0])
  );

  // Filter data by selected year
  const getFilteredData = () => {
    if (variant === 'historical') {
      return allHistoricalData.filter(d => d.year === parseInt(selectedYear));
    } else {
      return allPredictedData.filter(d => d.year === parseInt(selectedYear));
    }
  };

  const filteredData = getFilteredData();

if (variant === 'historical') {
    return (
      <div className="space-y-3">
        {/* Year Selector */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">选择年份:</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts Grid - Left/Right Layout */}
        <div className="grid grid-cols-2 gap-2">
          {/* Line Chart - Accuracy Trend */}
          <div className="bg-background/50 rounded-lg p-2">
            <h3 className="text-xs font-semibold mb-2">命中率趋势</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
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
                  dataKey="accuracy"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="命中率 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Records Count */}
          <div className="bg-background/50 rounded-lg p-2">
            <h3 className="text-xs font-semibold mb-2">批命记录统计</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Bar dataKey="total" fill="hsl(var(--secondary))" name="总记录数" />
                <Bar dataKey="verified" fill="hsl(var(--accent))" name="已验证数" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-background/50 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground mb-1">平均命中率</p>
            <p className="text-lg font-bold text-gradient-mystical">
              {Math.round(filteredData.reduce((sum, d) => sum + d.accuracy, 0) / filteredData.length)}%
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground mb-1">总批命次数</p>
            <p className="text-lg font-bold text-accent">
              {filteredData.reduce((sum, d) => sum + d.total, 0)}
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground mb-1">已验证次数</p>
            <p className="text-lg font-bold text-green-400">
              {filteredData.reduce((sum, d) => sum + d.verified, 0)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Predicted variant
  return (
    <div className="space-y-3">
      {/* Year Selector */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">选择年份:</label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availablePredictionYears.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Predicted Line Chart */}
      <div className="bg-background/50 rounded-lg p-2">
        <h3 className="text-xs font-semibold mb-2">预测命中率与置信度</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
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
              dataKey="predicted"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              name="预测命中率 (%)"
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', r: 4 }}
              name="置信度 (%)"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-xs text-muted-foreground mb-1">预测平均命中率</p>
          <p className="text-lg font-bold text-gradient-mystical">
            {Math.round(filteredData.reduce((sum, d) => sum + d.predicted, 0) / filteredData.length)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">基于历史数据AI预测</p>
        </div>
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-xs text-muted-foreground mb-1">平均置信度</p>
          <p className="text-lg font-bold text-accent">
            {Math.round(filteredData.reduce((sum, d) => sum + d.confidence, 0) / filteredData.length)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">预测可靠性指标</p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
        <p className="text-xs font-semibold text-primary mb-1">📊 AI洞察</p>
        <p className="text-xs text-muted-foreground">
          根据{selectedYear}年的数据分析，您的批命准确率呈上升趋势。预计未来的平均命中率将保持在87%以上，这表明您的命理分析能力在不断提升。建议继续关注应验情况反馈，以进一步优化预测模型。
        </p>
      </div>
    </div>
  );
}