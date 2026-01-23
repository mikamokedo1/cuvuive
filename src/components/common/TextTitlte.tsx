const TextTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="title-wrapper">
      <span className="text-3xl md:text-6xl text-orange-500 font-display font-bold text-center drop-shadow-sm">
        {children}
      </span>
    </div>
  );
};

export default TextTitle;
