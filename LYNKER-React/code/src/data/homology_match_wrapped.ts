
        
import { HomologyMatchModel } from "./homology_match";

// 同命匹配报告概览模型
export interface HomologyWrappedReportModel {
  reportId: string;
  title: string;
  summarySentence: string;
  themeImageUrl: string;
  matchStatistics: {
    totalMatchesFound: number;
    highestMatchPercentage: number;
    dominantPillar: string; // 优势命柱或主星
    topMatchDetails: HomologyMatchModel;
  };
}

export const MOCK_HOMOLOGY_WRAPPED_REPORT: HomologyWrappedReportModel = {
  reportId: "wrap_2025_01",
  title: "您的灵魂同频报告：2025 第一季",
  summarySentence: "您是全球 42,000 名'木火通明'格的探索者之一。",
  themeImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/15/bb02b57c-db3d-40f6-9ec9-fc86589941b9.png",
  matchStatistics: {
    totalMatchesFound: 1547,
    highestMatchPercentage: 92,
    dominantPillar: "月柱：甲午",
    topMatchDetails: {
      matchId: "hm001",
      alias: "太乙神数研究员",
      avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5d3ae278-248b-4489-9a09-6a5c9eb31912.png",
      geoTag: { country: "中国", region: "上海", flagIcon: "CN" },
      matchPercentage: 92,
      mainStarOrPillar: "日元：乙木",
      interestTags: ["国学", "冥想", "科技"],
    },
  },
};
        
      