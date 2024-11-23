import cn from "@/utils/class-names";

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("min-h-[50vh] lg:min-h-full", className)}>
      {children}
    </div>
  );
};
