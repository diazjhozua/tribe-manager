import {
  VStack,
  Text,
  Input,
  Box,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  width?: 'full' | 'auto';
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  showPasswordToggle = false,
  width = 'full'
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && type === 'password'
    ? (showPassword ? 'text' : 'password')
    : type;

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
          type={inputType}
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
          pr={showPasswordToggle ? "12" : "4"}
          required={required}
        />
        {showPasswordToggle && type === 'password' && (
          <Button
            position="absolute"
            right="3"
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            color="gray.400"
            _hover={{
              color: 'green.600',
              bg: 'green.50',
              transform: 'translateY(-50%) scale(1.1)'
            }}
            borderRadius="xl"
            transition="all 0.2s ease"
          >
            <Icon as={showPassword ? FaEyeSlash : FaEye} boxSize={4} />
          </Button>
        )}
      </Box>
    </VStack>
  );
};