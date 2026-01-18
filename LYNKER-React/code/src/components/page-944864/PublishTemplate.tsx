export interface PublishTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
  previewClass: string;
}

export const PUBLISH_TEMPLATES: PublishTemplate[] = [
  {
    id: 'cute',
    name: '可爱的',
    displayName: '可爱风',
    description: '温暖可爱的风格',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    textColor: 'text-pink-900 dark:text-pink-100',
    borderColor: 'border-pink-300 dark:border-pink-700',
    icon: 'Heart',
    previewClass: 'bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950'
  },
  {
    id: 'mysterious',
    name: '神秘的',
    displayName: '神秘风',
    description: '深邃神秘的风格',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    textColor: 'text-purple-900 dark:text-purple-100',
    borderColor: 'border-purple-300 dark:border-purple-700',
    icon: 'Moon',
    previewClass: 'bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900'
  },
  {
    id: 'love',
    name: '爱情的',
    displayName: '爱情风',
    description: '浪漫爱情的风格',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    textColor: 'text-red-900 dark:text-red-100',
    borderColor: 'border-red-300 dark:border-red-700',
    icon: 'Zap',
    previewClass: 'bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-950 dark:to-pink-950'
  },
  {
    id: 'serious',
    name: '严肃的',
    displayName: '严肃风',
    description: '庄重严肃的风格',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    textColor: 'text-slate-900 dark:text-slate-100',
    borderColor: 'border-slate-300 dark:border-slate-700',
    icon: 'AlertCircle',
    previewClass: 'bg-gradient-to-br from-slate-200 to-gray-200 dark:from-slate-800 dark:to-gray-800'
  },
  {
    id: 'funny',
    name: '搞笑的',
    displayName: '搞笑风',
    description: '幽默有趣的风格',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    textColor: 'text-yellow-900 dark:text-yellow-100',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    icon: 'Smile',
    previewClass: 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900'
  },
  {
    id: 'business',
    name: '商业的',
    displayName: '商业风',
    description: '专业商业的风格',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-900 dark:text-blue-100',
    borderColor: 'border-blue-300 dark:border-blue-700',
    icon: 'Briefcase',
    previewClass: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900'
  },
  {
    id: 'complaint',
    name: '诉苦的',
    displayName: '诉苦风',
    description: '倾诉抱怨的风格',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    textColor: 'text-orange-900 dark:text-orange-100',
    borderColor: 'border-orange-300 dark:border-orange-700',
    icon: 'Cloud',
    previewClass: 'bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900'
  }
];

export const PRESET_TAGS = [
  { id: 'miserable', label: '有谁比我惨', value: '有谁比我惨' },
  { id: 'advice', label: '求助建议', value: '求助建议' },
  { id: 'sharing', label: '经验分享', value: '经验分享' },
  { id: 'discovery', label: '命理发现', value: '命理发现' },
  { id: 'astrology', label: '占星解读', value: '占星解读' },
  { id: 'bazi', label: '八字命理', value: '八字命理' },
  { id: 'ziwei', label: '紫微斗数', value: '紫微斗数' },
  { id: 'qimen', label: '奇门遁甲', value: '奇门遁甲' },
  { id: 'fengshui', label: '风水堪舆', value: '风水堪舆' },
  { id: 'tarot', label: '塔罗占卜', value: '塔罗占卜' },
];