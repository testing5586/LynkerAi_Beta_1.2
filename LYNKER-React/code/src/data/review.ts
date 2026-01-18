
        
export interface ReviewModel {
  reviewId: string;
  masterId: string;
  userNameAlias: string; // 假名
  rating: number; // 1-5 星
  content: string;
  serviceType: string;
  date: string; // YYYY-MM-DD
}
        
      