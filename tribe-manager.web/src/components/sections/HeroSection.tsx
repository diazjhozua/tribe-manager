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
  Badge,
} from '@chakra-ui/react';
import { FaLeaf, FaSeedling, FaTree } from 'react-icons/fa';

export const HeroSection = () => {
  return (
    <Box
      id="hero"
      position="relative"
      bgGradient="linear(135deg, #065f46 0%, #059669 25%, #10b981 50%, #34d399 75%, #6ee7b7 100%)"
      color="white"
      py={{ base: 24, md: 40 }}
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        bgImage="radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)"
        bgSize="60px 60px"
      />

      {/* Floating Elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        css={{
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          },
        }}
      >
        <Icon as={FaLeaf} boxSize={8} color="green.200" opacity={0.6} />
      </Box>
      <Box
        position="absolute"
        top="20%"
        right="15%"
        css={{
          animation: 'floatReverse 4s ease-in-out infinite',
          '@keyframes floatReverse': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-15px) rotate(-3deg)' },
          },
        }}
      >
        <Icon as={FaTree} boxSize={10} color="green.300" opacity={0.4} />
      </Box>
      <Box
        position="absolute"
        bottom="20%"
        left="20%"
        css={{
          animation: 'floatSlow 3.5s ease-in-out infinite',
          '@keyframes floatSlow': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-12px) rotate(3deg)' },
          },
        }}
      >
        <Icon as={FaSeedling} boxSize={6} color="green.100" opacity={0.7} />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack gap={10} textAlign="center">
          {/* Badge */}
          <Badge
            bg="rgba(255, 255, 255, 0.2)"
            color="white"
            px={6}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="wide"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.300"
          >
            🏠 REVOLUTIONIZING FAMILY HOMES
          </Badge>

          {/* Main Heading */}
          <VStack gap={4}>
            <Heading
              as="h1"
              size={{ base: '2xl', md: '4xl', lg: '5xl' }}
              fontWeight="black"
              lineHeight="shorter"
              letterSpacing="-0.02em"
              textShadow="0 4px 20px rgba(0,0,0,0.3)"
            >
              Manage Your
              <Text
                as="span"
                color="yellow.300"
                textShadow="0 0 20px rgba(251, 191, 36, 0.6)"
                ml={4}
              >
                Family Home
              </Text>
              <br />
              <Text
                as="span"
                fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}
                opacity={0.9}
              >
                🏠 Effortlessly Together
              </Text>
            </Heading>
          </VStack>

          {/* Description */}
          <Text
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            maxW="4xl"
            opacity={0.95}
            lineHeight="relaxed"
            fontWeight="medium"
            textShadow="0 2px 10px rgba(0,0,0,0.2)"
          >
            🚀 Transform your household into a well-organized tribe where everyone
            collaborates seamlessly. Manage tasks, earn points, and create harmony
            in your family home with our innovative management platform.
          </Text>

          {/* Action Buttons */}
          <HStack gap={6} flexWrap="wrap" justify="center">
            <Button
              as="a"
              href="#cta"
              size="lg"
              bg="rgba(255, 255, 255, 0.95)"
              color="green.800"
              _hover={{
                bg: 'white',
                transform: 'translateY(-3px) scale(1.05)',
                shadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              _active={{
                transform: 'translateY(-1px) scale(1.02)',
              }}
              transition="all 0.3s ease"
              borderRadius="2xl"
              fontWeight="bold"
              px={8}
              py={6}
              fontSize="lg"
              border="3px solid"
              borderColor="whiteAlpha.400"
              backdropFilter="blur(10px)"
            >
              🏠 Start Your Tribe
              <Icon as={FaLeaf} ml={2} color="green.600" />
            </Button>

            <Button
              as="a"
              href="#about"
              size="lg"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.600"
              borderWidth="2px"
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: 'white',
                transform: 'translateY(-2px)',
                shadow: '0 15px 30px rgba(0,0,0,0.15)',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.3s ease"
              borderRadius="2xl"
              fontWeight="bold"
              px={8}
              py={6}
              fontSize="lg"
              backdropFilter="blur(10px)"
            >
              📱 See Features
            </Button>
          </HStack>

          {/* Feature Pills */}
          <Flex gap={4} flexWrap="wrap" justify="center" mt={8}>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              ✅ Task Management
            </Badge>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              🏆 Points & Rewards
            </Badge>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              👨‍👩‍👧‍👦 Family Collaboration
            </Badge>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};
