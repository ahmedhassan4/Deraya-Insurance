import { ReactNode } from 'react';
import { Text } from 'rizzui';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    children && (
      <Text as="p" className="text-red-500">
        {children}
      </Text>
    )
  );
};
export default ErrorMessage;
