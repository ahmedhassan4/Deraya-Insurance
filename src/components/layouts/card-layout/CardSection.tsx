import cn from "@/utils/class-names";

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};
