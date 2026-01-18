
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MultiMasterCurveDataModel } from '@/data/prognosis_chart';

interface YearlyFortuneChartProps {
  data: MultiMasterCurveDataModel;
  selectedYear: number;
}

export default function YearlyFortuneChart({ data, selectedYear }: YearlyFortuneChartProps) {
  // Transform data for recharts
  const chartData = data.curves[0]?.data.map((item, index) => {
    const point: Record<string, any> = { year: item.year };
    data.curves.forEach((curve) => {
      point[curve.sourceName] = curve.data[index]?.value || 0;
    });
    return point;
  }) || [];

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
              backgroundColor: 'rgba(20, 20, 30, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => `${value}`}
            labelStyle={{ color: '#fff' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          {data.curves.map((curve, index) => (
            <Line
              key={curve.sourceId}
              type="monotone"
              dataKey={curve.sourceName}
              stroke={curve.color}
              strokeWidth={2}
              dot={{ fill: curve.color, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
