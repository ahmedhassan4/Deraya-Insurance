export interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  // Optional props with default values
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  gradient?: {
    from: string;
    to: string;
  };
}
