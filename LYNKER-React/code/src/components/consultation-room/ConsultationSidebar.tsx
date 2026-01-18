
import ConsultationAIAssistant from './ConsultationAIAssistant';

interface ConsultationSidebarProps {
  showNotePanel: boolean;
  onToggleNotePanel: () => void;
  onViewKnowledgeBase: () => void;
  onViewRecordDetail: () => void;
  onViewMasterRecord: () => void;
}

export default function ConsultationSidebar({
  showNotePanel,
  onToggleNotePanel,
  onViewKnowledgeBase,
  onViewRecordDetail,
  onViewMasterRecord,
}: ConsultationSidebarProps) {
  return (
    <div className="w-80 flex flex-col gap-4">
      <ConsultationAIAssistant />
    </div>
  );
}
