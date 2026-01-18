
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import BirthTimeInputPanel from './BirthTimeInputPanel';
import TimeManagementSidebar from './TimeManagementSidebar';
import AIAgentAnalysisGrid from './AIAgentAnalysisGrid';
import AIAssistantDebatePanel from './AIAssistantDebatePanel';
import { MOCK_PROGNOSIS_INPUT, MOCK_PROGNOSIS_AGENT_RESULTS, type PrognosisInputModel } from '@/data/prognosis_pan';

interface TimeSlot {
  id: string;
  label: string;
  input: PrognosisInputModel;
  isSelected: boolean;
}

export default function VerifyTrueChartPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 'slot_1',
      label: '时间方案 1',
      input: MOCK_PROGNOSIS_INPUT,
      isSelected: true,
    },
    {
      id: 'slot_2',
      label: '时间方案 2',
      input: {
        ...MOCK_PROGNOSIS_INPUT,
        birthTimeHour: 8,
        birthTimeMinute: 15,
      },
      isSelected: false,
    },
    {
      id: 'slot_3',
      label: '时间方案 3',
      input: {
        ...MOCK_PROGNOSIS_INPUT,
        birthTimeHour: 9,
        birthTimeMinute: 0,
      },
      isSelected: false,
    },
  ]);

  const [selectedSlotId, setSelectedSlotId] = useState('slot_1');
  const [showDebatePanel, setShowDebatePanel] = useState(false);

  const selectedSlot = timeSlots.find((slot) => slot.id === selectedSlotId);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        isSelected: slot.id === slotId,
      }))
    );
  };

  const handleUpdateSlot = (slotId: string, updates: Partial<TimeSlot>) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === slotId ? { ...slot, ...updates } : slot
      )
    );
  };

  const handleAddSlot = () => {
    if (timeSlots.length < 3) {
      const newSlot: TimeSlot = {
        id: `slot_${Date.now()}`,
        label: `时间方案 ${timeSlots.length + 1}`,
        input: MOCK_PROGNOSIS_INPUT,
        isSelected: false,
      };
      setTimeSlots([...timeSlots, newSlot]);
    }
  };

  const handleConfirmTrueChart = () => {
    if (selectedSlot) {
      // Save to localStorage or send to backend
      localStorage.setItem(
        'trueBirthChart',
        JSON.stringify({
          ...selectedSlot.input,
          confirmedAt: new Date().toISOString(),
        })
      );
      // Redirect to true chart page
      window.location.href = './page-979144.html';
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      {/* Top Section - Birth Time Input */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container px-4 py-6">
          <BirthTimeInputPanel
            selectedSlot={selectedSlot}
            onSlotChange={handleUpdateSlot}
          />
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Time Management */}
          <div className="lg:col-span-1">
            <TimeManagementSidebar
              timeSlots={timeSlots}
              selectedSlotId={selectedSlotId}
              onSelectSlot={handleSelectSlot}
              onAddSlot={handleAddSlot}
              onUpdateSlot={handleUpdateSlot}
            />
          </div>

          {/* Middle - AI Agent Analysis Grid */}
          <div className="lg:col-span-2">
            {selectedSlot && (
              <AIAgentAnalysisGrid
                birthInput={selectedSlot.input}
                agentResults={MOCK_PROGNOSIS_AGENT_RESULTS}
              />
            )}
          </div>

          {/* Right - AI Assistant Debate Panel */}
          <div className="lg:col-span-1">
            <AIAssistantDebatePanel
              selectedSlot={selectedSlot}
              timeSlots={timeSlots}
              onConfirmTrueChart={handleConfirmTrueChart}
              onToggleDebate={() => setShowDebatePanel(!showDebatePanel)}
            />
          </div>
        </div>
      </div>

      {/* Debate Panel Modal */}
      {showDebatePanel && selectedSlot && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>AI Agent 辩论室</CardTitle>
                <CardDescription>
                  三个AI agent就您的出生时辰进行深度分析和辩论
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDebatePanel(false)}
              >
                <SafeIcon name="X" className="h-4 w-4" />
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              {MOCK_PROGNOSIS_AGENT_RESULTS.map((result, index) => (
                <div key={result.agent.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      {result.agent.name}
                    </Badge>
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mystical-gradient"
                        style={{ width: `${result.confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {result.confidenceScore}%
                    </span>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                    <p className="font-semibold text-foreground">
                      {result.analysisTitle}
                    </p>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {result.interpretationMarkdown}
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <SafeIcon name="Lightbulb" className="h-4 w-4 text-accent" />
                  灵伴AI建议
                </h4>
                <p className="text-sm text-muted-foreground">
                  根据三个AI agent的分析，您的出生时辰最可能是 <span className="font-semibold text-foreground">7:30</span>。
                  这个时间在通义千问的分析中获得最高置信度（92%），且与其他两个agent的分析相符。
                </p>
                <p className="text-sm text-muted-foreground">
                  建议您确认这个时间，或继续调整并观察AI的反馈。
                </p>
              </div>

              <Button
                onClick={handleConfirmTrueChart}
                className="w-full bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                确认这个出生时辰为真命盘
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
