
        
import { IconName } from "../types";
import { AppointmentModel } from "./appointment";
import { MOCK_MASTERS } from "./base-mock";
import { MOCK_SERVICES_OFFERED } from "./service";

export interface PaymentMethodModel {
  id: string;
  name: string;
  iconName?: IconName;
  logoUrl?: string;
  description: string;
}

export interface PaymentOrderModel {
  orderId: string;
  appointment: Omit<AppointmentModel, "status">;
  amount: number;
  currency: string;
  status: "Pending" | "Paid" | "Failed";
  creationDate: string;
}

export const MOCK_PAYMENT_METHODS: PaymentMethodModel[] = [
  {
    id: "wechat",
    name: "微信支付",
    logoUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/29ba1155-995c-4e31-9e47-4c9380bca73d.png",
    description: "扫码支付，安全快捷。",
  },
  {
    id: "alipay",
    name: "支付宝",
    logoUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/c746307c-7a95-412f-a5bc-ab6aa764f60f.png",
    description: "推荐中国大陆用户使用。",
  },
{
     id: "visa",
     name: "信用卡/借记卡 (Visa/Master)",
     iconName: "CreditCard",
     description: "支持国际主流卡片。",
   },
];

export const MOCK_PAYMENT_ORDER: PaymentOrderModel = {
  orderId: "ORD-20251112-987654",
  appointment: {
    appointmentId: "apt_001",
    master: MOCK_MASTERS[0],
    service: MOCK_SERVICES_OFFERED[0],
    selectedDateTime: "2025-11-15 14:00",
    price: 800,
  },
  amount: 800,
  currency: "RMB",
  status: "Pending",
  creationDate: "2025-11-12",
};
        
      