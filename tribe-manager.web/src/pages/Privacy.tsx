import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaLeaf, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
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
          <Icon as={FaShieldAlt} boxSize={6} color="green.200" opacity={0.4} />
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
                🛡️ PRIVACY PROMISE
              </Badge>
              <Heading
                as="h1"
                size="3xl"
                color="gray.800"
                fontWeight="black"
                letterSpacing="-0.02em"
                textAlign="center"
              >
                Your Family's
                <Text as="span" color="green.600" ml={3}>
                  Privacy Matters
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
                🏠 At Tribe Manager, we understand that family data is sacred. This privacy policy
                explains how we protect, collect, and use your information to help your family
                thrive while keeping your data secure.
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
                {/* Information We Collect */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaUsers} />
                    1. Information We Collect
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    To provide the best family management experience, we collect:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>👤 Account Information:</strong> Name, email address, and profile information you provide when creating your family tribe.
                    </Text>
                    <Text color="gray.600">
                      <strong>🏠 Family Data:</strong> Tasks, points, rewards, and family member information you add to manage your household.
                    </Text>
                    <Text color="gray.600">
                      <strong>📱 Usage Information:</strong> How you interact with Tribe Manager to improve our service and your experience.
                    </Text>
                    <Text color="gray.600">
                      <strong>🔧 Technical Data:</strong> Device information, IP address, and browser type for security and optimization purposes.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* How We Use Your Information */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaShieldAlt} />
                    2. How We Use Your Information
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    We use your information exclusively to:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>✅ Provide Our Service:</strong> Enable task management, points tracking, and family collaboration features.
                    </Text>
                    <Text color="gray.600">
                      <strong>🔒 Account Security:</strong> Protect your account and verify your identity for secure access.
                    </Text>
                    <Text color="gray.600">
                      <strong>📧 Communication:</strong> Send important updates, notifications, and support messages related to your account.
                    </Text>
                    <Text color="gray.600">
                      <strong>🚀 Service Improvement:</strong> Analyze usage patterns to enhance features and user experience.
                    </Text>
                    <Text color="gray.600">
                      <strong>⚖️ Legal Compliance:</strong> Meet legal obligations and enforce our terms of service.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Information Sharing */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    3. Information Sharing
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    <strong>🏠 Your family data stays with your family.</strong> We never sell your personal information.
                    We only share data in these limited circumstances:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>👨‍👩‍👧‍👦 Within Your Tribe:</strong> Family members you invite can see shared tasks, points, and rewards within your tribe.
                    </Text>
                    <Text color="gray.600">
                      <strong>🔧 Service Providers:</strong> Trusted third-party services that help us operate Tribe Manager (hosting, analytics, support).
                    </Text>
                    <Text color="gray.600">
                      <strong>⚖️ Legal Requirements:</strong> When required by law or to protect rights, property, or safety.
                    </Text>
                    <Text color="gray.600">
                      <strong>🤝 Business Transfers:</strong> In the event of a merger or acquisition (you'll be notified in advance).
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Data Security */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    4. Data Security
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    We implement industry-standard security measures to protect your family's data:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>🔐 Encryption:</strong> All data is encrypted in transit and at rest using advanced encryption standards.
                    </Text>
                    <Text color="gray.600">
                      <strong>🛡️ Access Controls:</strong> Strict access controls ensure only authorized personnel can access systems.
                    </Text>
                    <Text color="gray.600">
                      <strong>🔍 Regular Audits:</strong> We conduct regular security audits and vulnerability assessments.
                    </Text>
                    <Text color="gray.600">
                      <strong>📊 Monitoring:</strong> Continuous monitoring for suspicious activity and potential threats.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Your Rights */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    5. Your Privacy Rights
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    You have complete control over your family's data:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>👀 Access:</strong> View all personal data we have about you and your family.
                    </Text>
                    <Text color="gray.600">
                      <strong>✏️ Correction:</strong> Update or correct any inaccurate information.
                    </Text>
                    <Text color="gray.600">
                      <strong>🗑️ Deletion:</strong> Request deletion of your account and all associated data.
                    </Text>
                    <Text color="gray.600">
                      <strong>📤 Export:</strong> Download a copy of your family's data in a portable format.
                    </Text>
                    <Text color="gray.600">
                      <strong>🚫 Opt-out:</strong> Unsubscribe from marketing communications at any time.
                    </Text>
                  </VStack>
                  <Text color="gray.600" fontSize="sm" fontStyle="italic" mt={3}>
                    To exercise these rights, contact us at diaz.jhozua@gmail.com
                  </Text>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Contact Information */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    6. Contact Us
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    Questions about this privacy policy or your data? We're here to help:
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
                🌱 This privacy policy may be updated to reflect changes in our practices or legal requirements.
                We'll notify you of any significant changes via email or in-app notification.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}