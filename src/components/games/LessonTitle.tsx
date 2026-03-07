export const LessonTitle = ({
  children,
  tag = "span",
}: {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}) => {
  const Tag = tag;
  return (
    <Tag className="text-2xl md:text-6xl text-orange-500 font-display font-bold text-center drop-shadow-sm text-center">
      {children}
    </Tag>
  );
};
