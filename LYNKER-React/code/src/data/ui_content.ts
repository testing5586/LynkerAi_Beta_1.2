
        
        
        
// 定义首页 SVGs 内容
export interface HomePageAnimationModel {
  id: string;
  title: string;
  description: string;
  svgContent: string; // Base64 encoded or minimized SVG (Mocked here)
}

// 首页同命匹配动画 (SVG/Lottie) Placeholder
export const MOCK_HOMEPAGE_ANIMATIONS: HomePageAnimationModel[] = [
  {
    id: "bazi_match",
    title: "八字命盘共振",
    description: "实时搜索全球与您八字格局相似的灵魂。",
    svgContent: "SVG_BAZI_MATCH_PLACEHOLDER...",
  },
  {
    id: "ziwei_match",
    title: "紫微星盘同频",
    description: "紫微斗数主星相似度高，发现您的人生同行者。",
    svgContent: "SVG_ZIWEI_MATCH_PLACEHOLDER...",
  },
];

// 特定页面英雄区模型 (例如 page_969102)
export interface PageHeroModel {
    title: string;
    description: string;
    imageUrl: string;
}

export const MOCK_PAGE_969102_HERO: PageHeroModel = {
    title: "探索命运轨迹，同命相知",
    description: "平台汇聚东方古典与西方玄学，以AI科技辅助验证，开启您的灵魂旅程。",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/a4fa7911-6b1f-4e49-b937-860214c41cfe.png",
};
        
      
      
    
      