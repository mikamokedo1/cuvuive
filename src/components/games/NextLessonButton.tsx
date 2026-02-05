import { ArrowRight, Check } from "lucide-react";
import { ActionButton } from "../common/ActionButton";

export const NextLessonButton = ({
  onClick,
  disabled,
  isLast,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLast: boolean;
}) => {
  return (
    <ActionButton
      variant="glossy"
      color={isLast ? "green" : "orange"}
      size="auto"
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${disabled ? "opacity-50 grayscale" : "animate-bounce-subtle"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLast ? (
        <Check className="w-10 h-10 text-white" strokeWidth={4} />
      ) : (
        <ArrowRight className="w-10 h-10 text-white" strokeWidth={4} />
      )}
    </ActionButton>
  );
};
