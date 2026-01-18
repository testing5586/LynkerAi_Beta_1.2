
        
          
// 社交动态发布模版模型
export interface SocialPostTemplateModel {
  templateId: string;
  name: string;
  category: "可爱" | "神秘" | "爱情" | "严肃" | "搞笑" | "商业" | "诉苦";
  previewImageUrl: string;
  description: string;
}

export const MOCK_POST_TEMPLATES: SocialPostTemplateModel[] = [
  {
    templateId: "tpl_001",
    name: "星空背景：同命相知",
    category: "神秘",
    previewImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/f9e75705-ced1-4b2e-b459-70f5f731365b.png",
    description: "深邃的星空背景，适合发布命理感悟和同命探索的内容。",
  },
  {
    templateId: "tpl_002",
    name: "古风水墨：八卦流转",
    category: "严肃",
    previewImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/d6630106-f668-4889-acd9-ae5cd64fca11.png",
    description: "经典的东方水墨画风格，适合发布专业、严肃的命理分析或研究笔记。",
  },
    {
    templateId: "tpl_003",
    name: "金色墨迹：流年运势",
    category: "诉苦",
    previewImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/41627647-32a7-4bbf-9490-991c3156e142.png",
    description: "金色墨迹在黑暗中蔓延的背景，适合分享一些挫折或需要安慰的个人经历。",
  },
];
          
        
      