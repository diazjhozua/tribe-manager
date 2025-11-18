import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Flex,
  Link,
  Badge,
} from '@chakra-ui/react';
import {
  FaLeaf,
  FaCopyright,
  FaSeedling,
  FaHeart,
} from 'react-icons/fa';


export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: 'Privacy Promise', href: '/privacy' },
    { label: 'Tribe Terms', href: '/terms' },
    { label: 'Cookie Crumbs', href: '/cookies' },
  ];

  return (
    <Box
      bg="linear-gradient(135deg, #065f46 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)"
      color="white"
      py={16}
      position="relative"
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
        bgImage={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 5C60 15 70 25 50 45C30 25 40 15 50 5M20 30C30 40 40 50 20 70C0 50 10 40 20 30M80 30C90 40 100 50 80 70C60 50 70 40 80 30' fill='%2310b981'/%3E%3C/svg%3E")`}
        bgSize="150px 150px"
      />

      {/* Floating Elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        css={{
          animation: 'float 4s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-10px) rotate(3deg)' },
          },
        }}
      >
        <Icon as={FaLeaf} boxSize={8} color="green.300" opacity={0.3} />
      </Box>
      <Box
        position="absolute"
        bottom="15%"
        right="8%"
        css={{
          animation: 'floatSlow 5s ease-in-out infinite',
          '@keyframes floatSlow': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-8px) rotate(-2deg)' },
          },
        }}
      >
        <Icon as={FaSeedling} boxSize={6} color="green.200" opacity={0.4} />
      </Box>

      <Container maxW="full" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <VStack gap={12}>
          {/* Header Section */}
          <VStack gap={6} textAlign="center">
            <HStack gap={3}>
              <Box
                p={3}
                bg="linear-gradient(135deg, #10b981, #34d399)"
                borderRadius="2xl"
                shadow="xl"
                _hover={{ transform: 'rotate(5deg) scale(1.05)' }}
                transition="transform 0.3s ease"
              >
                <Icon as={FaLeaf} boxSize={8} color="white" />
              </Box>
              <VStack gap={0} align="start">
                <Heading as="h3" size="2xl" color="white" fontWeight="black" letterSpacing="-0.025em">
                  Tribe Manager
                </Heading>
                <Badge
                  bg="rgba(52, 211, 153, 0.2)"
                  color="green.300"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="wide"
                  border="1px solid"
                  borderColor="green.400"
                >
                  🌿 FAMILY HOME MANAGEMENT
                </Badge>
              </VStack>
            </HStack>
            <Text color="green.100" maxW="2xl" fontSize="lg" lineHeight="relaxed">
              🌟 Nurturing digital tribes to thrive in their natural habitat.
              We cultivate extraordinary collaboration through innovation,
              growth, and the timeless wisdom of the jungle ecosystem.
            </Text>
          </VStack>

          <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.400, transparent)" />


          <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.400, transparent)" />

          {/* Bottom Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            w="full"
            gap={6}
          >
            <VStack gap={2} align={{ base: 'center', md: 'start' }}>
              <HStack gap={2} color="green.200">
                <Icon as={FaCopyright} />
                <Text fontSize="sm">
                  {currentYear} Tribe Manager. All rights reserved.
                </Text>
              </HStack>
              <HStack gap={1} color="green.300" fontSize="sm">
                <Text>Made with</Text>
                <Icon as={FaHeart} color="red.400" />
                <Text>in the Digital Jungle</Text>
              </HStack>
            </VStack>

            <HStack gap={8} fontSize="sm" flexWrap="wrap" justify="center">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="green.200"
                  _hover={{
                    color: 'white',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.3s ease'
                  }}
                  transition="all 0.3s ease"
                >
                  {link.label}
                </Link>
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};
