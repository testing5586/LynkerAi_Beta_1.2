
import { useState, useEffect } from 'react';
import { MOCK_CONSULTATION_INFO } from '@/data/appointment';
import { MOCK_MASTER_PROFILE } from '@/data/user';
import { MOCK_AI_CHAT_HISTORY } from '@/data/ai_settings';
import JitsiVideoContainer from './JitsiVideoContainer';
import ConsultationHeader from './ConsultationHeader';
import ConsultationSidebar from './ConsultationSidebar';
import ConsultationActions from './ConsultationActions';

export default function ConsultationRoomLayout() {
  const [isCallActive, setIsCallActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showNotePanel, setShowNotePanel] = useState(false);
  const [subtitles, setSubtitles] = useState(MOCK_AI_CHAT_HISTORY);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

// Timer effect
  useEffect(() => {
    if (!isCallActive) return;
    
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallActive]);

  // Recording timer effect
  useEffect(() => {
    if (!isRecording) return;
    
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleEndCall = () => {
    setIsCallActive(false);
    // Redirect after a brief delay
    setTimeout(() => {
      window.location.href = './prognosis-service-entry.html';
    }, 1000);
  };

  const handleViewKnowledgeBase = () => {
    window.location.href = './knowledge-base.html';
  };

  const handleViewRecordDetail = () => {
    window.location.href = './user-record-detail.html';
  };

const handleViewMasterRecord = () => {
    window.location.href = './master-record-detail.html';
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Save recording to user's prognosis record
    setTimeout(() => {
      window.location.href = './user-record-detail.html';
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background overflow-hidden">
{/* Header */}
      <ConsultationHeader
        master={MOCK_MASTER_PROFILE}
        elapsedTime={formatTime(elapsedTime)}
        isCallActive={isCallActive}
        isRecording={isRecording}
        recordingTime={recordingTime}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Video Container */}
<div className="flex-1 flex flex-col gap-4 min-w-0">
           <JitsiVideoContainer
             jitsiUrl={MOCK_CONSULTATION_INFO.jitsiMeetingUrl}
             isCallActive={isCallActive}
           />
         </div>

        {/* Sidebar */}
        <ConsultationSidebar
          showNotePanel={showNotePanel}
          onToggleNotePanel={() => setShowNotePanel(!showNotePanel)}
          onViewKnowledgeBase={handleViewKnowledgeBase}
          onViewRecordDetail={handleViewRecordDetail}
          onViewMasterRecord={handleViewMasterRecord}
        />
      </div>

{/* Actions */}
      <ConsultationActions
        isCallActive={isCallActive}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isRecording={isRecording}
        recordingTime={recordingTime}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOff(!isVideoOff)}
        onEndCall={handleEndCall}
        onViewNotes={() => setShowNotePanel(!showNotePanel)}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
    </div>
  );
}
