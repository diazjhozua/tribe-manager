import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaLeaf, FaHandshake, FaGavel, FaUsers } from 'react-icons/fa';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Terms() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box>
      <Header />
      <Box
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

        {/* Floating Elements */}
        <Box
          position="absolute"
          top="10%"
          right="5%"
          css={{
            animation: 'float 4s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-10px) rotate(3deg)' },
            },
          }}
        >
          <Icon as={FaHandshake} boxSize={8} color="green.300" opacity={0.3} />
        </Box>
        <Box
          position="absolute"
          bottom="15%"
          left="8%"
          css={{
            animation: 'floatSlow 5s ease-in-out infinite',
            '@keyframes floatSlow': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-8px) rotate(-2deg)' },
            },
          }}
        >
          <Icon as={FaGavel} boxSize={6} color="green.200" opacity={0.4} />
        </Box>

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={12} align="start">
            {/* Header Section */}
            <VStack gap={6} textAlign="center" w="full">
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
                📜 TRIBE TERMS
              </Badge>
              <Heading
                as="h1"
                size="3xl"
                color="gray.800"
                fontWeight="black"
                letterSpacing="-0.02em"
                textAlign="center"
              >
                Terms &
                <Text as="span" color="green.600" ml={3}>
                  Conditions
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color="gray.600"
                maxW="4xl"
                lineHeight="relaxed"
                fontWeight="medium"
                textAlign="center"
              >
                🤝 Welcome to the Tribe Manager family! These terms and conditions outline
                the rules and guidelines for using our family home management platform.
                By joining our tribe, you agree to these terms.
              </Text>
              <Text fontSize="sm" color="gray.500" fontStyle="italic">
                Last updated: {currentDate}
              </Text>
            </VStack>

            {/* Content Sections */}
            <Box
              bg="white"
              p={10}
              borderRadius="3xl"
              shadow="0 10px 30px rgba(34, 197, 94, 0.1)"
              border="2px solid"
              borderColor="green.100"
              w="full"
            >
              <VStack gap={8} align="start">
                {/* Acceptance of Terms */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaHandshake} />
                    1. Acceptance of Terms
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    By accessing and using Tribe Manager, you accept and agree to be bound by these terms and conditions.
                    If you do not agree to these terms, please do not use our service.
                  </Text>
                  <Text color="gray.600" lineHeight="relaxed">
                    🏠 <strong>Family Agreement:</strong> When you create a family tribe, all family members invited
                    to join are also bound by these terms and conditions.
                  </Text>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Service Description */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaUsers} />
                    2. Service Description
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    Tribe Manager is a family home management platform that provides:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>✅ Task Management:</strong> Create, assign, and track household tasks and chores.
                    </Text>
                    <Text color="gray.600">
                      <strong>🏆 Points & Rewards System:</strong> Gamified system to motivate family members through points and virtual rewards.
                    </Text>
                    <Text color="gray.600">
                      <strong>👨‍👩‍👧‍👦 Family Collaboration:</strong> Tools for family communication, calendar integration, and progress tracking.
                    </Text>
                    <Text color="gray.600">
                      <strong>🛒 Virtual Shops:</strong> In-app reward systems where family members can spend earned points.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* User Responsibilities */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    3. User Responsibilities
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    As a Tribe Manager user, you agree to:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>✨ Use Responsibly:</strong> Use the service in a lawful manner and in accordance with these terms.
                    </Text>
                    <Text color="gray.600">
                      <strong>🔒 Account Security:</strong> Maintain the confidentiality of your account credentials and notify us of any unauthorized access.
                    </Text>
                    <Text color="gray.600">
                      <strong>📧 Accurate Information:</strong> Provide accurate and up-to-date information when creating your account.
                    </Text>
                    <Text color="gray.600">
                      <strong>🏠 Family Supervision:</strong> Parents/guardians are responsible for supervising their children's use of the platform.
                    </Text>
                    <Text color="gray.600">
                      <strong>🚫 Prohibited Activities:</strong> Not engage in harmful, illegal, or disruptive activities on the platform.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Family Tribes & Privacy */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    4. Family Tribes & Privacy
                  </Heading>
                  <VStack gap={3} align="start">
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>👨‍👩‍👧‍👦 Family Data Sharing:</strong> When you invite family members to your tribe, they will have access
                      to shared tasks, points, and rewards within your family group.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🔐 Data Privacy:</strong> Your family's data is private and not shared with other families or tribes.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>👑 Tribe Administration:</strong> The tribe creator has administrative rights to manage family members,
                      tasks, and rewards within their tribe.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🚪 Leaving a Tribe:</strong> Family members can leave a tribe at any time, but their contribution
                      history may remain for family records.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Points & Rewards */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    5. Points & Rewards System
                  </Heading>
                  <VStack gap={3} align="start">
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🏆 Virtual Currency:</strong> Points earned through Tribe Manager are virtual and have no real-world monetary value.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🛒 Family Rewards:</strong> Rewards and prizes are determined by each family and are not provided by Tribe Manager.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>⚖️ Fair Play:</strong> Points should be awarded fairly and accurately by family administrators.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🔄 System Changes:</strong> We reserve the right to modify the points system for improvements and updates.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Limitation of Liability */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    6. Limitation of Liability
                  </Heading>
                  <VStack gap={3} align="start">
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🛡️ Service Availability:</strong> We strive for 99.9% uptime but cannot guarantee uninterrupted service.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>📊 Data Accuracy:</strong> While we work to ensure data accuracy, you are responsible for verifying
                      important information within your family tribe.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>👨‍👩‍👧‍👦 Family Relationships:</strong> Tribe Manager is a tool to assist family management but cannot resolve
                      family disputes or replace parental guidance.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>⚖️ Legal Disclaimer:</strong> Our liability is limited to the maximum extent permitted by law.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Termination */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    7. Account Termination
                  </Heading>
                  <VStack gap={3} align="start">
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>🚪 Your Right to Terminate:</strong> You may delete your account and terminate service at any time
                      through your account settings.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>⚠️ Our Right to Terminate:</strong> We may suspend or terminate accounts that violate these terms
                      or engage in harmful activities.
                    </Text>
                    <Text color="gray.600" lineHeight="relaxed">
                      <strong>💾 Data Retention:</strong> Upon termination, your data will be deleted according to our privacy policy,
                      with some information retained for legal compliance.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Changes to Terms */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    8. Changes to Terms
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    We may update these terms and conditions periodically. We will notify you of significant changes via:
                  </Text>
                  <VStack gap={2} align="start" pl={4}>
                    <Text color="gray.600">📧 Email notification to your registered email address</Text>
                    <Text color="gray.600">📱 In-app notification when you next use Tribe Manager</Text>
                    <Text color="gray.600">🌐 Updated terms posted on our website with the revision date</Text>
                  </VStack>
                  <Text color="gray.600" lineHeight="relaxed" fontSize="sm" fontStyle="italic">
                    Continued use of Tribe Manager after changes constitutes acceptance of the new terms.
                  </Text>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Contact Information */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    9. Contact Us
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    Questions about these terms and conditions? We're here to help:
                  </Text>
                  <VStack gap={2} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>📧 Email:</strong> diaz.jhozua@gmail.com
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </Box>

            {/* Bottom Note */}
            <Box
              bg="green.50"
              p={6}
              borderRadius="2xl"
              border="2px solid"
              borderColor="green.200"
              w="full"
              textAlign="center"
            >
              <Text color="green.700" fontWeight="semibold">
                🌱 By using Tribe Manager, you're joining a community dedicated to stronger families
                and better home management. Thank you for being part of our growing tribe!
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}