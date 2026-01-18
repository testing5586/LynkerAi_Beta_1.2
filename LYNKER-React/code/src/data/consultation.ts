
        
export interface ConsultationRoomVisualModel {
    id: string;
    title: string;
    jitsiBackgroundUrl: string; // 视频会议背景图
}

export const MOCK_CONSULTATION_ROOM_VISUAL: ConsultationRoomVisualModel = {
    id: "cr_001",
    title: "玄真子大师 命理咨询室",
    jitsiBackgroundUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/20/123db655-e294-4083-b607-5dc794b1d1d0.png",
};
        
      