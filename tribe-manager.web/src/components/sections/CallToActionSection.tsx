import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { FaArrowRight, FaLeaf, FaTree, FaSeedling } from 'react-icons/fa';

export const CallToActionSection = () => {
  return (
    <Box
      id="cta"
      position="relative"
      bgGradient="linear(135deg, #065f46 0%, #059669 25%, #10b981 50%, #34d399 75%, #6ee7b7 100%)"
      color="white"
      py={{ base: 20, md: 32 }}
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
        bgSize="80px 80px"
      />

      {/* Floating Elements */}
      <Box
        position="absolute"
        top="15%"
        left="5%"
        css={{
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-15px) rotate(5deg)' },
          },
        }}
      >
        <Icon as={FaLeaf} boxSize={12} color="green.200" opacity={0.4} />
      </Box>
      <Box
        position="absolute"
        top="25%"
        right="8%"
        css={{
          animation: 'floatReverse 4s ease-in-out infinite',
          '@keyframes floatReverse': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(-8deg)' },
          },
        }}
      >
        <Icon as={FaTree} boxSize={16} color="green.300" opacity={0.3} />
      </Box>
      <Box
        position="absolute"
        bottom="20%"
        left="15%"
        css={{
          animation: 'floatSlow 5s ease-in-out infinite',
          '@keyframes floatSlow': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-10px) rotate(3deg)' },
          },
        }}
      >
        <Icon as={FaSeedling} boxSize={10} color="green.100" opacity={0.5} />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack gap={12} textAlign="center">
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
            🏠 START YOUR FAMILY JOURNEY
          </Badge>

          {/* Main Heading */}
          <VStack gap={4}>
            <Heading
              as="h2"
              size={{ base: '2xl', md: '4xl' }}
              fontWeight="black"
              lineHeight="shorter"
              letterSpacing="-0.02em"
              textShadow="0 4px 20px rgba(0,0,0,0.3)"
            >
              Ready to Transform Your
              <Text
                as="span"
                color="yellow.300"
                textShadow="0 0 20px rgba(251, 191, 36, 0.6)"
                ml={4}
              >
                Family Home?
              </Text>
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              opacity={0.95}
              lineHeight="relaxed"
              fontWeight="medium"
              textShadow="0 2px 10px rgba(0,0,0,0.2)"
            >
              🏠 Join thousands of families creating more organized, harmonious homes.
              Start managing tasks, earning rewards, and building stronger family
              connections with Tribe Manager today.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <HStack gap={6} flexWrap="wrap" justify="center">
            <Button
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
              🏠 Create Your Family Tribe
              <Icon as={FaArrowRight} ml={2} />
            </Button>

            <Button
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
              👥 Join Existing Family Tribe
            </Button>
          </HStack>

          {/* Bottom Stats/Benefits */}
          <Flex gap={8} flexWrap="wrap" justify="center" mt={8}>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              🆓 Free to Start
            </Badge>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              👨‍👩‍👧‍👦 Perfect for All Family Sizes
            </Badge>
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              📱 Easy Setup in Minutes
            </Badge>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};
