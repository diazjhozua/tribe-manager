import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaLeaf, FaCookie, FaCog, FaChartBar } from 'react-icons/fa';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Cookies() {
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
          <Icon as={FaCookie} boxSize={8} color="green.300" opacity={0.3} />
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
          <Icon as={FaLeaf} boxSize={6} color="green.200" opacity={0.4} />
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
                🍪 COOKIE CRUMBS
              </Badge>
              <Heading
                as="h1"
                size="3xl"
                color="gray.800"
                fontWeight="black"
                letterSpacing="-0.02em"
                textAlign="center"
              >
                Cookie
                <Text as="span" color="green.600" ml={3}>
                  Policy
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
                🍪 Just like grandma's recipe, we use cookies to make your Tribe Manager
                experience better! This policy explains what cookies we use, why we use them,
                and how you can manage them.
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
                {/* What Are Cookies */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaCookie} />
                    1. What Are Cookies?
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    Cookies are small text files that are stored on your device when you visit Tribe Manager.
                    They help us remember your preferences and provide a better user experience.
                  </Text>
                  <Text color="gray.600" lineHeight="relaxed">
                    🏠 <strong>Think of cookies like family photos on your fridge</strong> - they help us remember
                    what's important to your family and make your home (our website) feel more personal and welcoming.
                  </Text>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Types of Cookies */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaCog} />
                    2. Types of Cookies We Use
                  </Heading>

                  {/* Essential Cookies */}
                  <VStack gap={3} align="start" w="full">
                    <Heading as="h3" size="md" color="green.600">
                      🔧 Essential Cookies (Always Active)
                    </Heading>
                    <Text color="gray.600" lineHeight="relaxed">
                      These cookies are necessary for Tribe Manager to function properly. They cannot be disabled.
                    </Text>
                    <VStack gap={2} align="start" pl={4}>
                      <Text color="gray.600">
                        <strong>🔐 Authentication:</strong> Keep you logged in securely to your family tribe.
                      </Text>
                      <Text color="gray.600">
                        <strong>🛡️ Security:</strong> Protect against unauthorized access and security threats.
                      </Text>
                      <Text color="gray.600">
                        <strong>⚖️ Load Balancing:</strong> Ensure optimal performance and service availability.
                      </Text>
                      <Text color="gray.600">
                        <strong>🎛️ User Interface:</strong> Remember your language and accessibility preferences.
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Functional Cookies */}
                  <VStack gap={3} align="start" w="full">
                    <Heading as="h3" size="md" color="green.600">
                      ⚙️ Functional Cookies (Can Be Disabled)
                    </Heading>
                    <Text color="gray.600" lineHeight="relaxed">
                      These cookies enhance your experience but are not essential for basic functionality.
                    </Text>
                    <VStack gap={2} align="start" pl={4}>
                      <Text color="gray.600">
                        <strong>🎨 Personalization:</strong> Remember your theme preferences and dashboard layout.
                      </Text>
                      <Text color="gray.600">
                        <strong>🔔 Notifications:</strong> Store your notification preferences and settings.
                      </Text>
                      <Text color="gray.600">
                        <strong>📍 Location:</strong> Remember your timezone for accurate task scheduling.
                      </Text>
                      <Text color="gray.600">
                        <strong>💾 Form Data:</strong> Save draft tasks and partially completed forms.
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Analytics Cookies */}
                  <VStack gap={3} align="start" w="full">
                    <Heading as="h3" size="md" color="green.600">
                      📊 Analytics Cookies (Can Be Disabled)
                    </Heading>
                    <Text color="gray.600" lineHeight="relaxed">
                      These cookies help us understand how families use Tribe Manager to improve our service.
                    </Text>
                    <VStack gap={2} align="start" pl={4}>
                      <Text color="gray.600">
                        <strong>📈 Usage Analytics:</strong> Track which features are most helpful to families.
                      </Text>
                      <Text color="gray.600">
                        <strong>🐛 Error Tracking:</strong> Identify and fix issues to improve your experience.
                      </Text>
                      <Text color="gray.600">
                        <strong>⚡ Performance:</strong> Monitor loading times and optimize for better speed.
                      </Text>
                      <Text color="gray.600">
                        <strong>🎯 A/B Testing:</strong> Test new features to ensure they work well for families.
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Third-Party Cookies */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    3. Third-Party Cookies
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    We work with trusted partners who may also set cookies to help provide our service:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>📊 Google Analytics:</strong> Helps us understand how families interact with Tribe Manager
                      (you can opt out at <Text as="span" color="green.600" textDecoration="underline">tools.google.com/dlpage/gaoptout</Text>).
                    </Text>
                    <Text color="gray.600">
                      <strong>🔐 Authentication Services:</strong> Enable secure login through Google, Facebook, or Apple.
                    </Text>
                    <Text color="gray.600">
                      <strong>💳 Payment Processing:</strong> Secure payment processing for premium family features.
                    </Text>
                    <Text color="gray.600">
                      <strong>💬 Customer Support:</strong> Live chat and help desk functionality for family assistance.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Managing Cookies */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700" display="flex" alignItems="center" gap={2}>
                    <Icon as={FaChartBar} />
                    4. Managing Your Cookie Preferences
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    You have full control over your cookie preferences:
                  </Text>

                  <VStack gap={3} align="start" w="full">
                    <Heading as="h3" size="md" color="green.600">
                      🎛️ In Tribe Manager
                    </Heading>
                    <VStack gap={2} align="start" pl={4}>
                      <Text color="gray.600">
                        Go to <strong>Settings → Privacy → Cookie Preferences</strong> to customize your choices.
                      </Text>
                      <Text color="gray.600">
                        Toggle analytics and functional cookies on or off based on your comfort level.
                      </Text>
                      <Text color="gray.600">
                        Changes take effect immediately and are saved to your family profile.
                      </Text>
                    </VStack>
                  </VStack>

                  <VStack gap={3} align="start" w="full">
                    <Heading as="h3" size="md" color="green.600">
                      🌐 In Your Browser
                    </Heading>
                    <VStack gap={2} align="start" pl={4}>
                      <Text color="gray.600">
                        <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
                      </Text>
                      <Text color="gray.600">
                        <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                      </Text>
                      <Text color="gray.600">
                        <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                      </Text>
                      <Text color="gray.600">
                        <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Impact of Disabling Cookies */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    5. What Happens When You Disable Cookies?
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    Here's how disabling different types of cookies affects your Tribe Manager experience:
                  </Text>
                  <VStack gap={3} align="start" pl={4}>
                    <Text color="gray.600">
                      <strong>🔧 Essential Cookies Disabled:</strong> Tribe Manager will not function properly.
                      You may experience login issues and security vulnerabilities.
                    </Text>
                    <Text color="gray.600">
                      <strong>⚙️ Functional Cookies Disabled:</strong> You'll lose personalization features,
                      but core family management functions will still work.
                    </Text>
                    <Text color="gray.600">
                      <strong>📊 Analytics Cookies Disabled:</strong> No impact on functionality.
                      You'll simply be anonymous in our usage statistics.
                    </Text>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Cookie Retention */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    6. Cookie Retention Periods
                  </Heading>
                  <VStack gap={3} align="start">
                    <Text color="gray.600">
                      <strong>🔐 Session Cookies:</strong> Deleted when you close your browser (used for login sessions).
                    </Text>
                    <Text color="gray.600">
                      <strong>📅 Persistent Cookies:</strong> Stored for specific periods based on their purpose:
                    </Text>
                    <VStack gap={2} align="start" pl={8}>
                      <Text color="gray.600">• Preferences: 1 year</Text>
                      <Text color="gray.600">• Analytics: 2 years</Text>
                      <Text color="gray.600">• Security: 30 days</Text>
                      <Text color="gray.600">• Authentication: 30 days</Text>
                    </VStack>
                  </VStack>
                </VStack>

                <Box w="full" h="2px" bgGradient="linear(to-r, transparent, green.200, transparent)" />

                {/* Contact Information */}
                <VStack gap={4} align="start" w="full">
                  <Heading as="h2" size="lg" color="green.700">
                    7. Questions About Cookies?
                  </Heading>
                  <Text color="gray.600" lineHeight="relaxed">
                    If you have any questions about our cookie policy or need help managing your preferences:
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
                🍪 We believe in transparency about our cookie usage. This policy will be updated
                whenever we make changes to how we use cookies, and we'll notify you of any significant updates.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}