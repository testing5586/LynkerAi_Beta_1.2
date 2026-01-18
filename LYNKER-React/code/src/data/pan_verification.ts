
        
export interface VerificationChartVisualModel {
    chartId: string;
    type: "Bazi" | "Ziwei" | "Astrology";
    title: string;
    description: string;
    stickerImageUrl: string; // 模拟用户导入或AI生成的排盘贴图
}

export const MOCK_VERIFICATION_CHARTS: VerificationChartVisualModel[] = [
    {
        chartId: "v_chart_1",
        type: "Bazi",
        title: "八字命盘推算 (时辰A - 7:25)",
        description: "由AI Agent 1 基于 7:25 估算的八字盘面。",
        stickerImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/caf8c473-cdfa-4750-a1cd-58004429f9d3.png",
    },
    {
        chartId: "v_chart_2",
        type: "Ziwei",
        title: "紫微斗数排盘 (时辰B - 7:35)",
        description: "由AI Agent 2 基于 7:35 估算的紫微斗数盘面。",
        stickerImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/09e6148b-ad90-42f3-bcbe-8ec3926d8a99.png",
    },
    {
        chartId: "v_chart_3",
        type: "Bazi",
        title: "八字命盘推算 (时辰C - 7:30)",
        description: "由AI Agent 3 基于 7:30 估算的八字盘面。",
        stickerImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/b4cd71dc-69b4-47d5-b470-764df69dc5fc.png",
    },
];
        
      