import { cn } from "@/libs/utils/cn";

interface TextTitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const TextTitle = ({ children, as: Tag = "h1", className }: TextTitleProps) => {
  return (
    <div className="title-wrapper mb-6">
      <Tag
        className={cn(
          "text-3xl md:text-6xl text-orange-500 font-display font-bold text-center drop-shadow-sm",
          className,
        )}
      >
        {children}
      </Tag>
    </div>
  );
};

export default TextTitle;
