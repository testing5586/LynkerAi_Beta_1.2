

import { UserSummaryModel, MOCK_USER_ALIASES } from "./user";

export interface FriendRequestModel {
  requestId: string;
  requester: UserSummaryModel;
  message: string;
  timestamp: string;
}

export const MOCK_FRIEND_REQUESTS: FriendRequestModel[] = [
    {
        requestId: "fr001",
        requester: {
            userId: "user_req_001",
            alias: MOCK_USER_ALIASES[4],
            avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/9bb9095f-990c-4219-bc29-637b448baa18.png",
            geoTag: { country: "英国", region: "伦敦", flagIcon: "GB" },
        },
        message: "你好，AI匹配显示我们的八字同频度高达75%，希望能认识你！",
        timestamp: "2025-12-23T10:00:00Z",
    },
    {
        requestId: "fr002",
        requester: {
            userId: "user_req_002",
            alias: MOCK_USER_ALIASES[3],
            avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png",
            geoTag: { country: "加拿大", region: "多伦多", flagIcon: "CA" },
        },
        message: "我在炼丹房看到你对'五行火局'帖子的评论，观点犀利，想加你交流。",
        timestamp: "2025-12-22T15:30:00Z",
    },
];

      