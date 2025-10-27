import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Flex,
  Spacer,
  Link,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';

export const Header = () => {
  const { open: isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg="rgba(248, 250, 252, 0.98)"
      backdropFilter="blur(16px)"
      borderBottom="1px"
      borderColor="green.100"
      position="sticky"
      top={0}
      zIndex={1000}
      transition="all 0.3s ease"
      _hover={{ bg: 'rgba(248, 250, 252, 1)' }}
      boxShadow="0 1px 3px rgba(34, 197, 94, 0.1)"
    >
      <Container maxW="container.xl">
        <Flex py={3} alignItems="center">
          {/* Logo */}
          <HStack
            gap={2}
            cursor="pointer"
            _hover={{ transform: 'scale(1.02)' }}
            transition="transform 0.3s ease"
          >
            <Box
              position="relative"
              p={2}
              bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
              borderRadius="2xl"
              shadow="lg"
              _hover={{
                shadow: 'xl',
                transform: 'rotate(5deg)',
              }}
              transition="all 0.3s ease"
            >
              <Icon as={FaLeaf} boxSize={5} color="white" />
              <Box
                position="absolute"
                top="-1"
                right="-1"
                w="3"
                h="3"
                bg="yellow.400"
                borderRadius="full"
                animation="pulse 2s infinite"
              />
            </Box>
            <VStack gap={0} align="start">
              <Heading
                size="2xl"
                color="gray.800"
                lineHeight="1"
                fontWeight="bold"
                letterSpacing="-0.025em"
              >
                Tribe Manager
              </Heading>
              <Text
                fontSize="2xs"
                color="green.600"
                fontWeight="semibold"
                letterSpacing="wide"
              >
                FAMILY HOME MANAGEMENT
              </Text>
            </VStack>
          </HStack>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack gap={1} display={{ base: 'none', lg: 'flex' }}>
            <Link
              href="#hero"
              position="relative"
              py={2}
              px={4}
              borderRadius="2xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                color: 'green.700',
                bg: 'green.50',
                transform: 'translateY(-1px)',
                shadow: 'md',
              }}
              transition="all 0.3s ease"
            >
              🏠 Home
            </Link>

            <Link
              href="#about"
              py={2}
              px={4}
              borderRadius="2xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                color: 'green.700',
                bg: 'green.50',
                transform: 'translateY(-1px)',
                shadow: 'md',
              }}
              transition="all 0.3s ease"
            >
              🌳 About
            </Link>

            <Link
              href="#creator"
              py={2}
              px={4}
              borderRadius="2xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                color: 'green.700',
                bg: 'green.50',
                transform: 'translateY(-1px)',
                shadow: 'md',
              }}
              transition="all 0.3s ease"
            >
              👨‍💻 Creator
            </Link>
          </HStack>

          {/* CTA Button */}
          <Button
            as="a"
            href="#cta"
            display={{ base: 'none', md: 'flex' }}
            size="sm"
            bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
            color="white"
            _hover={{
              transform: 'translateY(-2px) scale(1.05)',
              shadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
              bg: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
              color: 'white',
            }}
            _active={{
              transform: 'translateY(0) scale(1)',
            }}
            transition="all 0.3s ease"
            borderRadius="2xl"
            fontWeight="bold"
            px={6}
            fontSize="sm"
            border="2px solid"
            borderColor="green.200"
          >
            🏠 Start Family Tribe
          </Button>

          {/* Mobile Menu Toggle */}
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            variant="ghost"
            onClick={onToggle}
            color="green.600"
            _hover={{
              bg: 'green.50',
              color: 'green.700',
              transform: 'scale(1.1)',
            }}
            borderRadius="xl"
            aria-label="Toggle Navigation"
            transition="all 0.3s ease"
          >
            {isOpen ? <Icon as={FaTimes} /> : <Icon as={FaBars} />}
          </IconButton>
        </Flex>

        {/* Mobile Navigation */}
        {isOpen && (
          <VStack
            gap={1}
            align="stretch"
            pb={4}
            pt={2}
            borderTop="1px"
            borderColor="green.100"
            mt={2}
            bg="green.25"
            borderRadius="xl"
            mx={-4}
            px={4}
          >
            <Link
              href="#hero"
              py={3}
              px={4}
              borderRadius="xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                bg: 'green.50',
                color: 'green.700',
                transform: 'translateX(4px)',
              }}
              display="flex"
              alignItems="center"
              gap={3}
              transition="all 0.3s ease"
            >
              <Text fontSize="lg">🏠</Text>
              Home
            </Link>
            <Link
              href="#about"
              py={3}
              px={4}
              borderRadius="xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                bg: 'green.50',
                color: 'green.700',
                transform: 'translateX(4px)',
              }}
              display="flex"
              alignItems="center"
              gap={3}
              transition="all 0.3s ease"
            >
              <Text fontSize="lg">🌳</Text>
              About
            </Link>
            <Link
              href="#creator"
              py={3}
              px={4}
              borderRadius="xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                bg: 'green.50',
                color: 'green.700',
                transform: 'translateX(4px)',
              }}
              display="flex"
              alignItems="center"
              gap={3}
              transition="all 0.3s ease"
            >
              <Text fontSize="lg">👨‍💻</Text>
              Creator
            </Link>
            <Link
              href="#contact"
              py={3}
              px={4}
              borderRadius="xl"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
              _hover={{
                bg: 'green.50',
                color: 'green.700',
                transform: 'translateX(4px)',
              }}
              display="flex"
              alignItems="center"
              gap={3}
              transition="all 0.3s ease"
            >
              <Text fontSize="lg">📧</Text>
              Contact
            </Link>
            <Button
              as="a"
              href="#cta"
              mt={3}
              size="sm"
              bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
              color="white"
              _hover={{
                bg: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
                transform: 'scale(1.02)',
                color: 'white',
              }}
              borderRadius="xl"
              fontWeight="bold"
              border="2px solid"
              borderColor="green.200"
            >
              🏠 Start Family Tribe
            </Button>
          </VStack>
        )}
      </Container>
    </Box>
  );
};
