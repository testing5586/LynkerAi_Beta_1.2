
        

        
import { MOCK_MASTERS, MasterSummaryModel } from "./user";
import { ServiceOfferedModel, MOCK_SERVICES_OFFERED } from "./service";
import { IconName } from "../types";

// 可选时间段
export interface TimeSlotModel {
  date: string; // YYYY-MM-DD
  slots: {
    time: string; // HH:MM
    isAvailable: boolean;
  }[];
}

// 预约活动模型
export interface AppointmentModel {
  appointmentId: string;
  master: MasterSummaryModel;
  service: ServiceOfferedModel;
  selectedDateTime: string; // YYYY-MM-DD HH:MM
  price: number;
  status: "PendingPayment" | "Confirmed" | "Completed" | "Cancelled";
}

// 预约链接模型 (用于命理师创建)
export interface AppointmentLinkModel {
    linkId: string;
    linkName: string;
    service: ServiceOfferedModel;
    durationMinutes: number;
    price: number;
    availableDays: string[]; // e.g., ["Mon", "Wed", "Fri"]
    isActive: boolean;
}

// 咨询会议信息 (用于进入Jitsi)
export interface ConsultationInfoModel {
  consultationId: string;
  appointment: AppointmentModel;
  jitsiMeetingUrl: string; // Fictional Jitsi link
  aiAssistantEnabled: boolean;
}

export const MOCK_TIME_SLOTS: TimeSlotModel[] = [
  {
    date: "2025-11-15",
    slots: [
      { time: "10:00", isAvailable: true },
      { time: "11:30", isAvailable: false },
      { time: "14:00", isAvailable: true },
      { time: "16:30", isAvailable: true },
    ],
  },
  {
    date: "2025-11-16",
    slots: [
      { time: "09:00", isAvailable: true },
      { time: "11:00", isAvailable: false },
      { time: "15:00", isAvailable: true },
    ],
  },
];

const mockAppointment: AppointmentModel = {
  appointmentId: "apt_001",
  master: MOCK_MASTERS[0],
  service: MOCK_SERVICES_OFFERED[0],
  selectedDateTime: "2025-11-15 14:00",
  price: MOCK_SERVICES_OFFERED[0].priceMin,
  status: "Confirmed",
};

export const MOCK_APPOINTMENT_LIST: AppointmentModel[] = [
    mockAppointment,
    {
        appointmentId: "apt_002",
        master: MOCK_MASTERS[1],
        service: MOCK_SERVICES_OFFERED[2],
        selectedDateTime: "2025-11-20 10:00",
        price: MOCK_SERVICES_OFFERED[2].priceMin,
        status: "Confirmed",
    },
    {
        appointmentId: "apt_003",
        master: MOCK_MASTERS[2],
        service: MOCK_SERVICES_OFFERED[1],
        selectedDateTime: "2025-11-10 16:00",
        price: MOCK_SERVICES_OFFERED[1].priceMin,
        status: "Completed",
    }
];

export const MOCK_CONSULTATION_INFO: ConsultationInfoModel = {
  consultationId: "cons_001",
  appointment: mockAppointment,
  jitsiMeetingUrl: "https://meet.jit.si/LynkerAI_Master001_UserA", // 模拟的Jitsi链接
  aiAssistantEnabled: true,
};

export const MOCK_APPOINTMENT_LINK: AppointmentLinkModel = {
    linkId: "link_001",
    linkName: "八字深度分析专属预约",
    service: MOCK_SERVICES_OFFERED[0],
    durationMinutes: 90,
    price: 800,
    availableDays: ["周一", "周三", "周五"],
    isActive: true,
};

export const MOCK_APPOINTMENT_LINKS = [
  {
    linkId: 'link_001',
    title: '八字深度分析专属预约',
    serviceType: '八字',
    duration: 90,
    price: 800,
    description: '深度解读您的八字命盘，揭示人生运势',
    availableSlots: ['2025-11-15 10:00', '2025-11-15 14:00', '2025-11-16 09:00'],
    createdDate: '2025-11-01',
    linkUrl: 'https://lynkerai.com/book/master001/link_001',
    isActive: true,
    bookingCount: 3,
  },
  {
    linkId: 'link_002',
    title: '紫微斗数命运指南',
    serviceType: '紫微',
    duration: 60,
    price: 600,
    description: '紫微星系诠解，掌握命宫大秘密',
    availableSlots: ['2025-11-15 11:00', '2025-11-16 15:00'],
    createdDate: '2025-11-02',
    linkUrl: 'https://lynkerai.com/book/master001/link_002',
    isActive: true,
    bookingCount: 5,
  },
  {
    linkId: 'link_003',
    title: '占星学年度运势预测',
    serviceType: '占星',
    duration: 45,
    price: 500,
    description: '通过星象运行，预测全年运势发展',
    availableSlots: ['2025-11-15 16:30', '2025-11-17 10:00'],
    createdDate: '2025-11-03',
    linkUrl: 'https://lynkerai.com/book/master001/link_003',
    isActive: false,
    bookingCount: 2,
  },
  {
    linkId: 'link_004',
    title: '八字婚姻配对分析',
    serviceType: '八字',
    duration: 75,
    price: 700,
    description: '从八字角度分析两人是否相辅相成',
    availableSlots: ['2025-11-18 10:00', '2025-11-18 14:00', '2025-11-19 09:00'],
    createdDate: '2025-11-04',
    linkUrl: 'https://lynkerai.com/book/master001/link_004',
    isActive: true,
    bookingCount: 7,
  },
  {
    linkId: 'link_005',
    title: '紫微财运密码解读',
    serviceType: '紫微',
    duration: 60,
    price: 550,
    description: '紫微命盘中的财富信号揭秘',
    availableSlots: ['2025-11-16 11:00', '2025-11-17 14:00'],
    createdDate: '2025-11-05',
    linkUrl: 'https://lynkerai.com/book/master001/link_005',
    isActive: true,
    bookingCount: 1,
  },
];
        
      
    
    