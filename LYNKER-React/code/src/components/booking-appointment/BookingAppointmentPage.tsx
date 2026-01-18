
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import BookingHeader from './BookingHeader';
import DateTimeSelector from './DateTimeSelector';
import ServiceSummary from './ServiceSummary';
import { MOCK_MASTERS } from '@/data/user';
import { MOCK_SERVICES_OFFERED } from '@/data/service';
import { MOCK_TIME_SLOTS } from '@/data/appointment';

export default function BookingAppointmentPage() {
  // Mock data - in real app, would come from URL params or context
  const selectedMaster = MOCK_MASTERS[0];
  const selectedService = MOCK_SERVICES_OFFERED[0];
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'datetime' | 'confirm' | 'payment'>('datetime');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setStep('confirm');
    }
  };

  const handleProceedToPayment = () => {
    // Navigate to payment gateway
    window.location.href = './payment-gateway.html';
  };

  const handleCancel = () => {
    window.location.href = './master-profile.html';
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step === 'datetime' || step === 'confirm' || step === 'payment'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className="text-sm font-medium">选择时间</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${
            step === 'confirm' || step === 'payment' ? 'bg-primary' : 'bg-muted'
          }`} />
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step === 'confirm' || step === 'payment'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">确认预约</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${
            step === 'payment' ? 'bg-primary' : 'bg-muted'
          }`} />
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step === 'payment'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
            <span className="text-sm font-medium">支付</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Master Info */}
          <BookingHeader master={selectedMaster} service={selectedService} />

          {/* Step Content */}
          {step === 'datetime' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Calendar" className="w-5 h-5" />
                  <span>选择咨询时间</span>
                </CardTitle>
                <CardDescription>
                  请选择您方便的日期和时间，命理师将在该时间与您进行视频咨询
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DateTimeSelector
                  timeSlots={MOCK_TIME_SLOTS}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              </CardContent>
            </Card>
          )}

          {step === 'confirm' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="CheckCircle" className="w-5 h-5 text-green-500" />
                  <span>确认预约信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">命理师</span>
                    <span className="font-semibold">{selectedMaster.alias}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">服务项目</span>
                    <span className="font-semibold">{selectedService.name}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">咨询时长</span>
                    <span className="font-semibold">{selectedService.durationMinutes}分钟</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">预约时间</span>
                    <span className="font-semibold">{selectedDate} {selectedTime}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">咨询费用</span>
                    <span className="font-semibold text-lg text-accent">¥{selectedService.priceMin}</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start space-x-3">
                  <SafeIcon name="Info" className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground/80">
                    <p className="font-semibold mb-1">预约须知</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 预约成功后，您将收到确认邮件和视频链接</li>
                      <li>• 请在预约时间前5分钟进入咨询室</li>
                      <li>• 如需取消，请在24小时前通知命理师</li>
                      <li>• 咨询内容将自动保存到您的知识库</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Service Summary & Actions */}
        <div className="space-y-6">
          <ServiceSummary
            master={selectedMaster}
            service={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />

          {/* Action Buttons */}
          <Card className="glass-card">
            <CardContent className="pt-6 space-y-3">
              {step === 'datetime' && (
                <>
                  <Button
                    className="w-full bg-mystical-gradient hover:opacity-90"
                    size="lg"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleConfirmBooking}
                  >
                    <SafeIcon name="ArrowRight" className="mr-2 h-4 w-4" />
                    下一步：确认预约
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleCancel}
                  >
                    返回命理师档案
                  </Button>
                </>
              )}

              {step === 'confirm' && (
                <>
                  <Button
                    className="w-full bg-mystical-gradient hover:opacity-90"
                    size="lg"
                    onClick={handleProceedToPayment}
                  >
                    <SafeIcon name="CreditCard" className="mr-2 h-4 w-4" />
                    前往支付
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => setStep('datetime')}
                  >
                    <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
                    返回修改时间
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <Card className="glass-card">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <SafeIcon name="Shield" className="w-4 h-4 text-green-500" />
                <span>安全支付保障</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <SafeIcon name="Lock" className="w-4 h-4 text-green-500" />
                <span>隐私信息加密</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <SafeIcon name="CheckCircle" className="w-4 h-4 text-green-500" />
                <span>预约确认保证</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
