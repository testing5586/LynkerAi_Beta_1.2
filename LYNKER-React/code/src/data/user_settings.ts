
        
import { IconName } from "../types";

export interface UserSettingsNavItemModel {
    id: string;
    title: string;
    iconName: IconName;
    targetPageId: string;
}

export const MOCK_USER_SETTINGS_NAV: UserSettingsNavItemModel[] = [
    { id: "profile", title: "个人资料", iconName: "User", targetPageId: "page_979337" },
    { id: "true_chart", title: "我的真命盘", iconName: "Star", targetPageId: "page_979145" },
    { id: "yearly_fortune", title: "流年运势", iconName: "LineChart", targetPageId: "page_979336" },
    { id: "knowledge_base", title: "知识库", iconName: "BookOpen", targetPageId: "page_962652" },
    { id: "appointments", title: "预约记录", iconName: "Calendar", targetPageId: "page_962651" },
    { id: "ai_settings", title: "AI设置", iconName: "Bot", targetPageId: "page_979411" },
    { id: "payment", title: "付款设置", iconName: "Wallet", targetPageId: "page_962649" },
];
        
      