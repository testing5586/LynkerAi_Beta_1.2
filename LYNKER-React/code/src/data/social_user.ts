
        
import { GeoTagModel, UserSummaryModel } from "./user";
import { VotingOptionModel } from "./voting";

// 论坛/炼丹房投票者信息 (用于展示用户画像)
export interface VoterInfoModel {
  voterId: string;
  alias: string;
  avatarUrl: string;
  country: string;
  region: string;
  birthplace: string;
  culturalBackground: string;
  religion: string;
  bloodType: string;
  occupation: string;
  voteType: VotingOptionModel["id"]; // 投票类型
  flagIcon: string;
  timestamp: string;
}
        
      