import { ArrowLeft } from "lucide-react";
import { ActionButton } from "../common/ActionButton";

export const BackLessonButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => {
  return (
    <ActionButton
      variant="glossy"
      color="blue"
      size="auto"
      className="w-16 h-16 rounded-full disabled:opacity-50 disabled:grayscale"
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowLeft size={20} className="text-white" strokeWidth={4} />
    </ActionButton>
  );
};
