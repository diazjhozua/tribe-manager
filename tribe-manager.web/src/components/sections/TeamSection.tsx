import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Badge,
  Icon,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaLeaf,
  FaTree,
  FaSeedling,
} from 'react-icons/fa';

interface Creator {
  name: string;
  role: string;
  description: string;
  initials: string;
  jungleRole: string;
  emoji: string;
  jungleIcon: React.ElementType;
  bgColor: string;
  skills: string[];
}

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard = ({ creator }: CreatorCardProps) => (
  <Box
    bg="white"
    p={10}
    borderRadius="3xl"
    boxShadow="0 15px 40px rgba(34, 197, 94, 0.15)"
    textAlign="center"
    _hover={{
      boxShadow: '0 25px 50px rgba(34, 197, 94, 0.25)',
      transform: 'translateY(-10px) scale(1.02)',
    }}
    transition="all 0.4s ease"
    border="3px solid"
    borderColor="green.100"
    position="relative"
    overflow="hidden"
    maxW="2xl"
    mx="auto"
  >
    {/* Background Pattern */}
    <Box
      position="absolute"
      top="-30px"
      right="-30px"
      w="120px"
      h="120px"
      bg={creator.bgColor}
      borderRadius="full"
      opacity="0.1"
    />
    <Box
      position="absolute"
      bottom="-20px"
      left="-20px"
      w="80px"
      h="80px"
      bg="teal.400"
      borderRadius="full"
      opacity="0.08"
    />

    <VStack gap={8} position="relative" zIndex={1}>
      {/* Avatar */}
      <Avatar.Root size="2xl">
        <Avatar.Image src="https://avatars.githubusercontent.com/u/81425546?v=4" alt="Jhozua Diaz" />
        <Avatar.Fallback bg={creator.bgColor} color="white" fontSize="2xl" fontWeight="bold">
          {creator.initials}
        </Avatar.Fallback>
      </Avatar.Root>

      <VStack gap={4} textAlign="center">
        <VStack gap={2}>
          <Heading as="h3" size="2xl" color="gray.800" fontWeight="black">
            {creator.name}
          </Heading>
          <Badge
            bg="rgba(34, 197, 94, 0.15)"
            color="green.700"
            px={6}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="wide"
            border="2px solid"
            borderColor="green.200"
          >
            {creator.jungleRole}
          </Badge>
          <Text color="gray.600" fontWeight="semibold" fontSize="lg">
            {creator.role}
          </Text>
        </VStack>
        <Text color="gray.600" lineHeight="relaxed" fontSize="lg" maxW="xl">
          {creator.description}
        </Text>
      </VStack>



      {/* Social Links */}
      <HStack gap={6}>
        <Box
          as="a"
          href="https://www.linkedin.com/in/diazjhozua/"
          target="_blank"
          rel="noopener noreferrer"
          p={3}
          borderRadius="xl"
          bg="blue.50"
          _hover={{ bg: 'blue.100', transform: 'scale(1.15)' }}
          transition="all 0.3s ease"
          cursor="pointer"
        >
          <Icon as={FaLinkedin} color="blue.600" boxSize={6} />
        </Box>
        <Box
          as="a"
          href="https://github.com/diazjhozua"
          target="_blank"
          rel="noopener noreferrer"
          p={3}
          borderRadius="xl"
          bg="gray.50"
          _hover={{ bg: 'gray.100', transform: 'scale(1.15)' }}
          transition="all 0.3s ease"
          cursor="pointer"
        >
          <Icon as={FaGithub} color="gray.700" boxSize={6} />
        </Box>
      </HStack>
    </VStack>
  </Box>
);

export const TeamSection = () => {
  const creator: Creator = {
    name: 'Jhozua Diaz',
    role: 'Founder & Full-Stack Developer',
    jungleRole: '🏠 Family Tech Innovator',
    description: 'Passionate developer and family management enthusiast who believes technology should bring families closer together. Created Tribe Manager to help households transform chaos into harmony through smart organization and gamification.',
    initials: 'JD',
    emoji: '👨‍💻',
    jungleIcon: FaTree,
    bgColor: 'emerald.400',
    skills: [
      'React & Next.js',
      'Node.js & TypeScript',
      'Family-Centered Design',
      'Gamification Systems',
      'Full-Stack Development',
      'Home Management Solutions'
    ]
  };

  return (
    <Box
      id="creator"
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

      <Container maxW="container.xl" position="relative" zIndex={1}>
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
              🌳 MEET THE CREATOR
            </Badge>
            <Heading
              as="h2"
              size="3xl"
              color="gray.800"
              fontWeight="black"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              The Mind Behind
              <Text as="span" color="green.600" ml={3}>
                Tribe Manager
              </Text>
            </Heading>
            <Text
              fontSize="xl"
              color="gray.600"
              maxW="4xl"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              🏠 Meet the family tech innovator who envisioned and built Tribe Manager.
              Driven by a passion for bringing families together through technology and
              a belief that every household can become more organized and harmonious.
            </Text>
          </VStack>

          <CreatorCard creator={creator} />

          {/* Creator Journey */}
          <Box
            bg="white"
            p={10}
            borderRadius="3xl"
            shadow="0 10px 30px rgba(34, 197, 94, 0.1)"
            border="2px solid"
            borderColor="green.100"
            textAlign="center"
            maxW="4xl"
            w="full"
          >
            <VStack gap={6}>
              <Text fontSize="3xl">🌱</Text>
              <Heading as="h3" size="xl" color="gray.800" fontWeight="bold">
                The Journey Continues
              </Heading>
              <Text color="gray.600" fontSize="lg" lineHeight="relaxed">
                Born from the challenges of managing a busy household,
                Tribe Manager represents the belief that technology should simplify family life,
                not complicate it. Every feature is designed with real families in mind,
                helping transform daily chores into opportunities for connection and growth.
              </Text>
              <HStack gap={12} justify="center" flexWrap="wrap" mt={4}>
                <VStack gap={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">1K+</Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="semibold">Users</Text>
                </VStack>
                <VStack gap={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">500+</Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="semibold">Families Helped</Text>
                </VStack>
                <VStack gap={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">10K+</Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="semibold">Tasks Accomplished</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
