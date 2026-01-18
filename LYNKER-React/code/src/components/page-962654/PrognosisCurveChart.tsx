
import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MultiMasterCurveDataModel } from '@/data/prognosis_chart';

interface PrognosisCurveChartProps {
  data: MultiMasterCurveDataModel;
  selectedYear: number;
}

export default function PrognosisCurveChart({
  data,
  selectedYear,
}: PrognosisCurveChartProps) {
  const chartData = useMemo(() => {
    return data.curves[0].data.map((item) => {
      const dataPoint: any = { year: item.year };
      data.curves.forEach((curve) => {
        const value = curve.data.find((d) => d.year === item.year)?.value || 0;
        dataPoint[curve.sourceName] = value;
      });
      return dataPoint;
    });
  }, [data]);

  const colors = data.curves.map((curve) => curve.color);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="year"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 30, 0.95)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
            }}
            labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
            formatter={(value) => [Math.round(value as number), '']}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          {data.curves.map((curve, index) => (
            <Line
              key={curve.sourceId}
              type="monotone"
              dataKey={curve.sourceName}
              stroke={colors[index]}
              strokeWidth={2}
              dot={{ fill: colors[index], r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Chart Legend */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.curves.map((curve) => (
          <div key={curve.sourceId} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: curve.color }}
            />
            <div className="text-sm">
              <p className="font-medium">{curve.sourceName}</p>
              <p className="text-xs text-muted-foreground">
                {selectedYear}年预测值: {curve.data.find((d) => d.year === selectedYear)?.value || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
