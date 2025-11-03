import { Button, Icon } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PasswordToggle = ({ isVisible, onToggle }: PasswordToggleProps) => {
  return (
    <Button
      position="absolute"
      right="3"
      top="50%"
      transform="translateY(-50%)"
      variant="ghost"
      size="sm"
      onClick={onToggle}
      color="gray.400"
      _hover={{
        color: 'green.600',
        bg: 'green.50',
        transform: 'translateY(-50%) scale(1.1)'
      }}
      borderRadius="xl"
      transition="all 0.2s ease"
    >
      <Icon as={isVisible ? FaEyeSlash : FaEye} boxSize={4} />
    </Button>
  );
};