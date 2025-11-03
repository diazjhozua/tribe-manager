import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Link,
  Icon,
  Badge,
  SimpleGrid,
  Circle,
  Flex,
} from '@chakra-ui/react';
import { FaLeaf, FaUsers, FaHome, FaShieldAlt, FaRocket, FaStar, FaCheck, FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormInput, PasswordToggle } from '../components/ui';

export default function Register() {
  const [currentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    familySize: '',
    agreeToTerms: false,
    joinNewsletter: false,
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration form submitted:', formData);
  };

  return (
    <Box minH="100vh" w="100vw" position="relative" overflow="hidden">
      {/* Mobile Full Background */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(135deg, #065f46 0%, #059669 25%, #10b981 50%, #34d399 75%, #6ee7b7 100%)"
        zIndex={0}
      />

    <Flex minH="100vh" w="100%" direction={{ base: 'column', lg: 'row' }} position="relative" overflow="hidden">
      {/* Left Side - Hero/Branding */}
      <Box
        display={{ base: 'none', lg: 'flex' }}
        flex="0 0 35%"
        minW="0"
        position="relative"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Animated Gradient Background */}
        <Box
          position="absolute"
          top="-50%"
          left="-50%"
          right="-50%"
          bottom="-50%"
          bgGradient="conic(from 0deg, #065f46, #059669, #10b981, #34d399, #6ee7b7, #065f46)"
          css={{
            animation: 'gradientRotate 20s linear infinite',
            '@keyframes gradientRotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}
        />

        {/* Glass Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(6, 95, 70, 0.8)"
          backdropFilter="blur(20px)"
        />

        {/* Floating Elements */}
        <Box
          position="absolute"
          top="20%"
          left="10%"
          w="120px"
          h="120px"
          borderRadius="50%"
          bg="rgba(52, 211, 153, 0.1)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(52, 211, 153, 0.2)"
          css={{
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) scale(1)' },
              '50%': { transform: 'translateY(-30px) scale(1.1)' }
            }
          }}
        />

        <Box
          position="absolute"
          bottom="30%"
          right="15%"
          w="80px"
          h="80px"
          transform="rotate(45deg)"
          bg="rgba(16, 185, 129, 0.1)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(16, 185, 129, 0.3)"
          borderRadius="20px"
          css={{
            animation: 'floatReverse 8s ease-in-out infinite',
            '@keyframes floatReverse': {
              '0%, 100%': { transform: 'rotate(45deg) translateY(0px)' },
              '50%': { transform: 'rotate(45deg) translateY(-20px)' }
            }
          }}
        />

        <VStack gap={10} textAlign="center" color="white" maxW="xl" px={8} position="relative" zIndex={1}>
          <VStack gap={6}>
            {/* Logo with Glow Effect */}
            <Box
              p={6}
              bg="whiteAlpha.200"
              borderRadius="3xl"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.400"
              shadow="0 0 60px rgba(52, 211, 153, 0.3)"
              css={{
                animation: 'logoGlow 4s ease-in-out infinite',
                '@keyframes logoGlow': {
                  '0%, 100%': { boxShadow: '0 0 60px rgba(52, 211, 153, 0.3)' },
                  '50%': { boxShadow: '0 0 80px rgba(52, 211, 153, 0.5)' }
                }
              }}
            >
              <Icon as={FaLeaf} boxSize={16} color="white" />
            </Box>

            <VStack gap={4}>
              <Heading size="4xl" fontWeight="black" textShadow="0 4px 20px rgba(0,0,0,0.4)" letterSpacing="-0.02em">
                Join the Family! 🌱
              </Heading>
              <Text fontSize="2xl" opacity={0.95} lineHeight="tall" textShadow="0 2px 10px rgba(0,0,0,0.3)" fontWeight="medium">
                Create your family tribe and start organizing your home
              </Text>
            </VStack>
          </VStack>

          {/* Stats */}
          <SimpleGrid columns={3} gap={6} w="full">
            <VStack gap={2}>
              <Circle size="60px" bg="whiteAlpha.200" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300">
                <Icon as={FaUsers} boxSize={6} color="white" />
              </Circle>
              <Text fontSize="2xl" fontWeight="black">10K+</Text>
              <Text fontSize="sm" opacity={0.9}>Families</Text>
            </VStack>
            <VStack gap={2}>
              <Circle size="60px" bg="whiteAlpha.200" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300">
                <Icon as={FaShieldAlt} boxSize={6} color="white" />
              </Circle>
              <Text fontSize="2xl" fontWeight="black">100%</Text>
              <Text fontSize="sm" opacity={0.9}>Secure</Text>
            </VStack>
            <VStack gap={2}>
              <Circle size="60px" bg="whiteAlpha.200" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300">
                <Icon as={FaStar} boxSize={6} color="white" />
              </Circle>
              <Text fontSize="2xl" fontWeight="black">4.9</Text>
              <Text fontSize="sm" opacity={0.9}>Rating</Text>
            </VStack>
          </SimpleGrid>

          {/* Feature Highlights */}
          <Box
            p={6}
            bg="whiteAlpha.100"
            borderRadius="2xl"
            backdropFilter="blur(15px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            maxW="md"
          >
            <Text fontSize="sm" opacity={0.9} fontStyle="italic" lineHeight="tall">
              "Setting up our family tribe was so easy! Now everyone knows their tasks and we're more organized than ever."
            </Text>
            <Text fontSize="xs" opacity={0.7} mt={2}>- Jennifer K., Mother of 4</Text>
          </Box>
        </VStack>
      </Box>

      {/* Right Side - Registration Form */}
      <Box
        flex="0 0 65%"
        w="100%"
        minW="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        bg={{ base: 'transparent', lg: 'white' }}
      >
        {/* Mobile Background with Glassmorphism */}
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(135deg, rgba(240, 253, 244, 0.9) 0%, rgba(236, 253, 245, 0.9) 50%, rgba(209, 250, 229, 0.9) 100%)"
          backdropFilter="blur(20px)"
        />

        <Container maxW="100%" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 8, md: 12 }} position="relative" zIndex={1} w="100%">
          <Box maxW="100%" mx="auto" w="100%">
          <VStack gap={8} w="100%">
            {/* Mobile Header - Only shown on small screens */}
            <VStack gap={4} textAlign="center" display={{ base: 'flex', lg: 'none' }}>
              <HStack gap={2}>
                <Box
                  p={3}
                  bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
                  borderRadius="2xl"
                  shadow="xl"
                  transform="rotate(-5deg)"
                  _hover={{ transform: 'rotate(0deg) scale(1.05)' }}
                  transition="all 0.3s ease"
                >
                  <Icon as={FaLeaf} boxSize={6} color="white" />
                </Box>
                <VStack gap={0} align="start">
                  <Heading size="xl" color="gray.800" fontWeight="black">
                    Tribe Manager
                  </Heading>
                  <Badge
                    bg="rgba(34, 197, 94, 0.1)"
                    color="green.700"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wide"
                  >
                    🏠 FAMILY HOME MANAGEMENT
                  </Badge>
                </VStack>
              </HStack>
            </VStack>

            {/* Form Header */}
            <VStack gap={3} textAlign="center">
              <Heading as="h1" size="2xl" color="gray.800" fontWeight="black" letterSpacing="-0.02em" fontSize={{ base: '2xl', md: '3xl' }}>
                Create Your Family Tribe 🌱
              </Heading>
              <Text color="gray.600" fontSize="lg" fontWeight="medium">
                Join thousands of families creating organized, collaborative homes
              </Text>
            </VStack>

            {/* Registration Form */}
            <Box
              bg={{ base: 'rgba(255, 255, 255, 0.95)', lg: 'white' }}
              backdropFilter={{ base: 'blur(20px)', lg: 'none' }}
              p={{ base: 6, md: 8, lg: 10 }}
              borderRadius="3xl"
              shadow="0 32px 64px rgba(0, 0, 0, 0.12)"
              border="1px solid"
              borderColor={{ base: 'whiteAlpha.300', lg: 'gray.100' }}
              w="full"
              maxW="full"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                bgGradient: 'linear(to-r, #059669, #10b981, #34d399)',
                borderTopRadius: '3xl'
              }}
            >
              <form onSubmit={handleSubmit}>
                <VStack gap={6}>
                  {/* Multi-Step Progress Indicator */}
                  <VStack gap={4} w="full">
                    <HStack justify="space-between" w="full" position="relative">
                      {/* Progress Line */}
                      <Box
                        position="absolute"
                        top="50%"
                        left="0"
                        right="0"
                        h="2px"
                        bg="gray.200"
                        transform="translateY(-50%)"
                        zIndex={0}
                      />
                      <Box
                        position="absolute"
                        top="50%"
                        left="0"
                        h="2px"
                        bg="green.400"
                        transform="translateY(-50%)"
                        zIndex={1}
                        transition="width 0.5s ease"
                        width={`${((currentStep - 1) / (totalSteps - 1)) * 100}%`}
                      />

                      {/* Step Circles */}
                      {[1, 2, 3].map((step) => (
                        <Circle
                          key={step}
                          size="40px"
                          bg={step <= currentStep ? 'green.400' : 'gray.200'}
                          color={step <= currentStep ? 'white' : 'gray.500'}
                          position="relative"
                          zIndex={2}
                          transition="all 0.3s ease"
                          transform={step === currentStep ? 'scale(1.1)' : 'scale(1)'}
                          shadow={step === currentStep ? '0 0 20px rgba(34, 197, 94, 0.4)' : 'none'}
                        >
                          {step < currentStep ? (
                            <Icon as={FaCheck} boxSize={4} />
                          ) : step === 1 ? (
                            <Icon as={FaUser} boxSize={4} />
                          ) : step === 2 ? (
                            <Icon as={FaHome} boxSize={4} />
                          ) : (
                            <Icon as={FaLock} boxSize={4} />
                          )}
                        </Circle>
                      ))}
                    </HStack>

                    {/* Step Labels */}
                    <HStack justify="space-between" w="full">
                      <Text fontSize="xs" color={currentStep >= 1 ? 'green.600' : 'gray.500'} fontWeight="semibold" textAlign="center" w="33%">
                        Personal Info
                      </Text>
                      <Text fontSize="xs" color={currentStep >= 2 ? 'green.600' : 'gray.500'} fontWeight="semibold" textAlign="center" w="33%">
                        Family Details
                      </Text>
                      <Text fontSize="xs" color={currentStep >= 3 ? 'green.600' : 'gray.500'} fontWeight="semibold" textAlign="center" w="33%">
                        Security
                      </Text>
                    </HStack>

                    {/* Overall Progress Bar */}
                    <Box
                      w="full"
                      h="8px"
                      bg="gray.100"
                      borderRadius="full"
                      overflow="hidden"
                      position="relative"
                    >
                      <Box
                        h="full"
                        bg="linear-gradient(to-r, #10b981, #34d399)"
                        borderRadius="full"
                        transition="all 0.5s ease"
                        width={`${progressPercentage}%`}
                      />
                    </Box>
                  </VStack>
                  {/* Personal Information */}
                  <VStack gap={4} w="full" align="start">
                    <HStack gap={2}>
                      <Icon as={FaUsers} color="green.600" />
                      <Heading size="md" color="gray.800">
                        Personal Information
                      </Heading>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} w="full">
                      <FormInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />

                      <FormInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </SimpleGrid>

                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </VStack>

                  <Box w="full" h="1px" bg="gray.200" />

                  {/* Family Information */}
                  <VStack gap={4} w="full" align="start">
                    <HStack gap={2}>
                      <Icon as={FaHome} color="green.600" />
                      <Heading size="md" color="gray.800">
                        Family Information
                      </Heading>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} w="full">
                      <FormInput
                        label="Family/Tribe Name"
                        name="familyName"
                        value={formData.familyName}
                        onChange={handleInputChange}
                        placeholder="e.g., The Smith Family"
                        required
                      />

                      <VStack gap={2} align="start" w="full">
                        <Text color="gray.700" fontWeight="600" fontSize="sm" letterSpacing="0.025em">
Family Size
                        </Text>
                        <select
                          name="familySize"
                          value={formData.familySize}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '2px solid #dcfce7',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            color: '#374151'
                          }}
                        >
                          <option value="">Select family size</option>
                          <option value="2">2 members</option>
                          <option value="3">3 members</option>
                          <option value="4">4 members</option>
                          <option value="5">5 members</option>
                          <option value="6">6 members</option>
                          <option value="7+">7+ members</option>
                        </select>
                      </VStack>
                    </SimpleGrid>
                  </VStack>

                  <Box w="full" h="1px" bg="gray.200" />

                  {/* Password */}
                  <VStack gap={4} w="full" align="start">
                    <Heading size="md" color="gray.800">
                      Account Security
                    </Heading>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} w="full">
                      <FormInput
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        required
                      >
                        <PasswordToggle
                          isVisible={showPassword}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                      </FormInput>

                      <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                      >
                        <PasswordToggle
                          isVisible={showConfirmPassword}
                          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      </FormInput>
                    </SimpleGrid>
                  </VStack>

                  {/* Terms and Newsletter */}
                  <VStack gap={3} w="full" align="start">
                    <HStack gap={2} align="start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#10b981',
                          marginTop: '2px'
                        }}
                      />
                      <Text fontSize="sm" color="gray.600">
                        I agree to the{' '}
                        <Link as={RouterLink} to="/terms" color="green.600" fontWeight="semibold">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link as={RouterLink} to="/privacy" color="green.600" fontWeight="semibold">
                          Privacy Policy
                        </Link>
                      </Text>
                    </HStack>

                    <HStack gap={2} align="start">
                      <input
                        type="checkbox"
                        name="joinNewsletter"
                        checked={formData.joinNewsletter}
                        onChange={handleInputChange}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#10b981',
                          marginTop: '2px'
                        }}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Send me family management tips and product updates
                      </Text>
                    </HStack>
                  </VStack>

                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    h="60px"
                    bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
                    color="white"
                    _hover={{
                      transform: 'translateY(-3px)',
                      shadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                      bg: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
                    }}
                    _active={{
                      transform: 'translateY(-1px)',
                      shadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    borderRadius="2xl"
                    fontWeight="bold"
                    fontSize="lg"
                    letterSpacing="0.025em"
                  >
                    <HStack gap={2}>
                      <Icon as={FaLeaf} boxSize={5} />
                      <Text>Create Your Family Tribe</Text>
                    </HStack>
                  </Button>

                </VStack>
              </form>
            </Box>

            {/* Sign In Link */}
            <HStack gap={2}>
              <Text color="gray.600">Already have a family tribe?</Text>
              <Link
                as={RouterLink}
                to="/login"
                color="green.600"
                fontWeight="bold"
                _hover={{ color: 'green.800', textDecoration: 'underline' }}
              >
                Sign In Here 🔑
              </Link>
            </HStack>

            {/* Back to Home */}
            <Link
              as={RouterLink}
              to="/"
              color="green.600"
              fontWeight="semibold"
              _hover={{ color: 'green.800', textDecoration: 'underline' }}
            >
              ← Back to Home
            </Link>
          </VStack>
          </Box>
        </Container>
      </Box>
    </Flex>
    </Box>
  );
}