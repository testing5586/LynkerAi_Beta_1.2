
import { useMemo } from 'react';
import type { MultiMasterCurveDataModel } from '@/data/prognosis_chart';

interface UserBatchRecordChartProps {
  data: MultiMasterCurveDataModel;
}

export default function UserBatchRecordChart({ data }: UserBatchRecordChartProps) {
  const chartDimensions = useMemo(() => {
    const width = 800;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate scales
    const yearRange = data.endDate - data.startDate;
    const xScale = chartWidth / yearRange;

    // Find min and max values across all curves
    let minValue = 100;
    let maxValue = 0;
    data.curves.forEach((curve) => {
      curve.data.forEach((point) => {
        minValue = Math.min(minValue, point.value);
        maxValue = Math.max(maxValue, point.value);
      });
    });

    const valueRange = maxValue - minValue || 1;
    const yScale = chartHeight / valueRange;

    return {
      width,
      height,
      padding,
      chartWidth,
      chartHeight,
      xScale,
      yScale,
      minValue,
      maxValue,
      valueRange,
    };
  }, [data]);

  const generatePath = (points: Array<{ year: number; value: number }>) => {
    const { padding, xScale, yScale, minValue, startDate } = chartDimensions;

    return points
      .map((point, index) => {
        const x = padding.left + (point.year - startDate) * xScale;
        const y = padding.top + (chartDimensions.chartHeight - (point.value - minValue) * yScale);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const getYAxisLabel = (value: number) => {
    return Math.round(value);
  };

  const getXAxisLabel = (year: number) => {
    return year.toString();
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={chartDimensions.width}
        height={chartDimensions.height}
        className="mx-auto"
        viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
      >
        {/* Grid Lines */}
        {/* Horizontal Grid Lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const value = chartDimensions.minValue + (chartDimensions.valueRange / 4) * i;
          const y =
            chartDimensions.padding.top +
            (chartDimensions.chartHeight - (value - chartDimensions.minValue) * chartDimensions.yScale);
          return (
            <g key={`h-grid-${i}`}>
              <line
                x1={chartDimensions.padding.left}
                y1={y}
                x2={chartDimensions.width - chartDimensions.padding.right}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeDasharray="4,4"
              />
              <text
                x={chartDimensions.padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                opacity="0.6"
              >
                {getYAxisLabel(value)}
              </text>
            </g>
          );
        })}

        {/* Vertical Grid Lines */}
        {Array.from({ length: data.endDate - data.startDate + 1 }).map((_, i) => {
          const year = data.startDate + i;
          const x = chartDimensions.padding.left + i * chartDimensions.xScale;
          return (
            <g key={`v-grid-${i}`}>
              <line
                x1={x}
                y1={chartDimensions.padding.top}
                x2={x}
                y2={chartDimensions.height - chartDimensions.padding.bottom}
                stroke="currentColor"
                strokeOpacity="0.05"
              />
              <text
                x={x}
                y={chartDimensions.height - chartDimensions.padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
                opacity="0.6"
              >
                {getXAxisLabel(year)}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={chartDimensions.padding.left}
          y1={chartDimensions.padding.top}
          x2={chartDimensions.padding.left}
          y2={chartDimensions.height - chartDimensions.padding.bottom}
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />
        <line
          x1={chartDimensions.padding.left}
          y1={chartDimensions.height - chartDimensions.padding.bottom}
          x2={chartDimensions.width - chartDimensions.padding.right}
          y2={chartDimensions.height - chartDimensions.padding.bottom}
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Y-Axis Label */}
        <text
          x={-chartDimensions.height / 2}
          y={15}
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
          opacity="0.6"
          transform="rotate(-90)"
        >
          运势得分
        </text>

        {/* X-Axis Label */}
        <text
          x={chartDimensions.padding.left + chartDimensions.chartWidth / 2}
          y={chartDimensions.height - 10}
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
          opacity="0.6"
        >
          年份
        </text>

        {/* Data Lines */}
        {data.curves.map((curve) => (
          <g key={curve.sourceId}>
            {/* Line */}
            <path
              d={generatePath(curve.data)}
              fill="none"
              stroke={curve.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Data Points */}
            {curve.data.map((point, index) => {
              const x =
                chartDimensions.padding.left +
                (point.year - data.startDate) * chartDimensions.xScale;
              const y =
                chartDimensions.padding.top +
                (chartDimensions.chartHeight -
                  (point.value - chartDimensions.minValue) * chartDimensions.yScale);

              return (
                <circle
                  key={`${curve.sourceId}-point-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={curve.color}
                  opacity="0.8"
                  className="hover:r-6 transition-all cursor-pointer"
                >
                  <title>{`${curve.sourceName} - ${point.year}年: ${point.value}分`}</title>
                </circle>
              );
            })}
          </g>
        ))}
      </svg>

      {/* Chart Info */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>说明：</strong>
          此图表展示了您在{data.startDate}年至{data.endDate}
          年期间，不同命理师对您运势的预测对比。每条曲线代表一位命理师的预测结果，您可以通过对比来了解不同命理师的预测风格和准确度。
        </p>
      </div>
    </div>
  );
}
