
import SafeIcon from '@/components/common/SafeIcon';

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEPS = [
  { number: 1, title: '账户信息', icon: 'User' },
  { number: 2, title: '地理信息', icon: 'MapPin' },
  { number: 3, title: '文化背景', icon: 'Globe' },
];

export default function RegistrationProgress({
  currentStep,
  totalSteps,
}: RegistrationProgressProps) {
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-mystical-gradient transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                    ? 'bg-mystical-gradient text-white glow-primary'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number < currentStep ? (
                <SafeIcon name="Check" className="h-5 w-5" />
              ) : (
                <SafeIcon name={step.icon} className="h-5 w-5" />
              )}
            </div>

            {/* Step Title */}
            <p
              className={`text-xs font-medium text-center ${
                step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.title}
            </p>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={`absolute w-12 h-0.5 top-5 left-1/2 transition-all ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-muted'
                }`}
                style={{ marginLeft: '2rem' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Counter */}
      <div className="text-center text-sm text-muted-foreground">
        第 {currentStep} / {totalSteps} 步
      </div>
    </div>
  );
}
