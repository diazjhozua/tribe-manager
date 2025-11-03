import {
  VStack,
  Text,
  Input,
  Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  width?: 'full' | 'auto';
  children?: ReactNode;
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  width = 'full',
  children
}: FormInputProps) => {
  return (
    <VStack gap={2} align="start" w={width}>
      <Text
        color="gray.700"
        fontWeight="600"
        fontSize="sm"
        letterSpacing="0.025em"
      >
        {label}
      </Text>
      <Box position="relative" w="full">
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          size="lg"
          borderRadius="2xl"
          border="2px solid"
          borderColor="gray.200"
          bg="gray.50"
          _focus={{
            borderColor: 'green.400',
            boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
            bg: 'white',
            transform: 'translateY(-1px)'
          }}
          _hover={{
            borderColor: 'green.300',
            bg: 'white'
          }}
          transition="all 0.2s ease"
          fontSize="md"
          fontWeight="500"
          pr={children ? "12" : "4"}
          required={required}
        />
        {children}
      </Box>
    </VStack>
  );
};