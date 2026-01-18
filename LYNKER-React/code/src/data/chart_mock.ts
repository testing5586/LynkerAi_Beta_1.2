
        
import { PrognosisQuickViewModel } from "./social_feed";

// 命盘图表视觉模型
export interface ChartVisualModel {
    chartId: string;
    type: "Bazi" | "Ziwei" | "Astrology";
    title: string;
    imageUrl: string; // 模拟图表图片
    metadata: PrognosisQuickViewModel;
}

export const MOCK_CHART_VISUALS: ChartVisualModel[] = [
    {
        chartId: "bazi_chart_001",
        type: "Bazi",
        title: "已验证八字命盘",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/a10c0e03-b624-4161-9c08-1f4160dfa32b.png",
        metadata: {
            baziSummary: "日主：甲木。身弱用印，喜水，忌金。当前大运逢财，适宜合作求财。",
            ziweiSummary: "", // Not applicable here
            isVerified: true,
        },
    },
    {
        chartId: "ziwei_chart_001",
        type: "Ziwei",
        title: "已验证紫微命盘",
        imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/08786245-cce0-483d-b841-3e2e038a73e9.png",
        metadata: {
            baziSummary: "", // Not applicable here
            ziweiSummary: "命宫：廉贞。官禄宫：武曲。事业主星强大，适合金融或高管职位。",
            isVerified: true,
        },
    }
];
        
      