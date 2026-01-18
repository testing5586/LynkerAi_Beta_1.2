
        
export interface BlackboxDataModel {
  analysisId: string;
  sourceType: "Forum" | "Consultation" | "Research";
  contextDescription: string;
  encryptedContent: string;
  accessStatus: "Granted" | "Denied";
  securityMeasures: string[];
}

export const MOCK_BLACKBOX_DATA: BlackboxDataModel = {
  analysisId: "BB001",
  sourceType: "Forum",
  contextDescription: "关联帖子 P001: 八字格局深度分析的底层AI验证数据。",
  // 模拟加密文本，禁止复制/截图/爬虫
  encryptedContent:
    "## 核心命理规律验证 (Protected Analysis)\n\n数据块 A92X: 发现金木交战在特定纬度人群中，对肝功能影响系数高于平均值 1.5。模型预测此规律的准确度为 98.2%。\n\n[...更多高权限分析数据]\n\n数据块 C33V: (此内容已通过RSA-4096加密，无法显示原始文本)",
  accessStatus: "Granted", // 假设用户通过权限验证
  securityMeasures: ["禁止文本选择", "禁止截图 (JS/CSS level)", "API动态输出"],
};
        
      