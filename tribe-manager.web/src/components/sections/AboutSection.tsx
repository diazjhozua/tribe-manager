import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FaTasks,
  FaUserFriends,
  FaTrophy,
  FaHome,
} from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
  bgGradient: string;
  emoji: string;
}

const FeatureCard = ({ icon, title, description, iconColor, bgGradient, emoji }: FeatureCardProps) => (
  <Box
    bg="white"
    p={8}
    borderRadius="3xl"
    boxShadow="0 10px 30px rgba(34, 197, 94, 0.1)"
    textAlign="center"
    _hover={{
      boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
      transform: 'translateY(-8px) scale(1.02)',
    }}
    transition="all 0.4s ease"
    border="2px solid"
    borderColor="green.50"
    position="relative"
    overflow="hidden"
  >
    {/* Background Pattern */}
    <Box
      position="absolute"
      top="-20px"
      right="-20px"
      w="80px"
      h="80px"
      bgGradient={bgGradient}
      borderRadius="full"
      opacity="0.1"
    />

    <VStack gap={4}>
      <Box
        p={6}
        bg={iconColor}
        borderRadius="2xl"
        shadow="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="fit-content"
        height="fit-content"
        minW="16"
        minH="16"
        _hover={{ transform: 'rotate(10deg) scale(1.1)' }}
        transition="transform 0.3s ease"
      >
        <Icon as={icon} w={8} h={8} color="white" />
      </Box>

      <VStack gap={2}>
        <Text fontSize="3xl">{emoji}</Text>
        <Heading as="h3" size="lg" color="gray.800" fontWeight="bold">
          {title}
        </Heading>
        <Text color="gray.600" lineHeight="relaxed" fontSize="md">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
);

export const AboutSection = () => {
  const features = [
    {
      icon: FaTasks,
      title: 'Task Management & Points',
      description: 'Easily create, assign, and track tasks for each family member. Earn points through our gamified system that motivates and rewards family members for completing household responsibilities.',
      iconColor: 'green.500',
      bgGradient: 'linear(to-br, green.400, green.600)',
      emoji: '✅',
    },
    {
      icon: FaUserFriends,
      title: 'Tribe Creation & Collaboration',
      description: 'Create or join family tribes with role-based responsibilities. Built-in communication tools and calendar integration keep everyone connected and organized.',
      iconColor: 'green.600',
      bgGradient: 'linear(to-br, green.500, green.700)',
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      icon: FaTrophy,
      title: 'Rewards & Progress Tracking',
      description: 'Virtual shops where earned points can be spent on rewards, privileges, and treats. Monitor progress with detailed reports and celebrate family achievements together.',
      iconColor: 'teal.500',
      bgGradient: 'linear(to-br, teal.400, teal.600)',
      emoji: '🏆',
    },
  ];

  return (
    <Box
      id="about"
      py={24}
      bg="linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Background Jungle Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.05"
        bgImage="url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M50 5C60 15 70 25 50 45C30 25 40 15 50 5M20 30C30 40 40 50 20 70C0 50 10 40 20 30M80 30C90 40 100 50 80 70C60 50 70 40 80 30\" fill=\"%2310b981\"/></svg>')"
        bgSize="200px 200px"
      />

      <Container maxW="full" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <VStack gap={20}>
          <VStack gap={6} textAlign="center">
            <Badge
              bg="rgba(34, 197, 94, 0.1)"
              color="green.700"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="wide"
              border="2px solid"
              borderColor="green.200"
            >
              🏠 ABOUT TRIBE MANAGER
            </Badge>
            <Heading
              as="h2"
              size="3xl"
              color="gray.800"
              fontWeight="black"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              Revolutionizing
              <Text as="span" color="green.600" ml={3}>
                Family Home Management
              </Text>
            </Heading>
            <Text
              fontSize="xl"
              color="gray.600"
              maxW="4xl"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              🏠 Tribe Manager is an innovative platform designed to help families efficiently manage their homes by providing a comprehensive suite of tools for organizing tasks, tracking progress, and fostering collaboration. Transform mundane chores into engaging activities that bring your family together.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w="full">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
                bgGradient={feature.bgGradient}
                emoji={feature.emoji}
              />
            ))}
          </SimpleGrid>

          {/* Call to Action */}
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            shadow="0 10px 30px rgba(34, 197, 94, 0.1)"
            border="2px solid"
            borderColor="green.100"
            textAlign="center"
            maxW="2xl"
          >
            <VStack gap={4}>
              <Text fontSize="2xl">🏠</Text>
              <Heading as="h3" size="lg" color="gray.800">
                Ready to Transform Your Home?
              </Heading>
              <Text color="gray.600">
                Join thousands of families who have streamlined their household management and created more harmonious homes with Tribe Manager.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
