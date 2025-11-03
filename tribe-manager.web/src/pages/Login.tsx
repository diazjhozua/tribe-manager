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
  Flex,
  SimpleGrid,
  Circle,
} from '@chakra-ui/react';
import { FaLeaf, FaShieldAlt, FaRocket, FaHeart, FaStar, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormInput, PasswordToggle } from '../components/ui';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Handle login logic here
    console.log('Login form submitted:', formData);
    setIsLoading(false);
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

        {/* Geometric Shapes */}
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

        {/* Floating Icons */}
        <Box
          position="absolute"
          top="15%"
          right="20%"
          css={{
            animation: 'pulse 3s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.2)' }
            }
          }}
        >
          <Circle size="60px" bg="whiteAlpha.200" backdropFilter="blur(10px)">
            <Icon as={FaLeaf} boxSize={8} color="white" />
          </Circle>
        </Box>

        <Box
          position="absolute"
          bottom="20%"
          left="20%"
          css={{
            animation: 'bounce 4s ease-in-out infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-15px)' }
            }
          }}
        >
          <Circle size="40px" bg="whiteAlpha.200" backdropFilter="blur(10px)">
            <Icon as={FaHeart} boxSize={5} color="white" />
          </Circle>
        </Box>

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
                Welcome Back! 🏠
              </Heading>
              <Text fontSize="2xl" opacity={0.95} lineHeight="tall" textShadow="0 2px 10px rgba(0,0,0,0.3)" fontWeight="medium">
                Continue managing your family tribe
              </Text>
            </VStack>
          </VStack>

          {/* Enhanced Stats */}
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
                <Icon as={FaCheckCircle} boxSize={6} color="white" />
              </Circle>
              <Text fontSize="2xl" fontWeight="black">99%</Text>
              <Text fontSize="sm" opacity={0.9}>Success Rate</Text>
            </VStack>
            <VStack gap={2}>
              <Circle size="60px" bg="whiteAlpha.200" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300">
                <Icon as={FaStar} boxSize={6} color="white" />
              </Circle>
              <Text fontSize="2xl" fontWeight="black">4.9</Text>
              <Text fontSize="sm" opacity={0.9}>Rating</Text>
            </VStack>
          </SimpleGrid>

          {/* Testimonial */}
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
              "Tribe Manager transformed our chaotic household into a well-organized family. Our kids are more responsible and we're all happier!"
            </Text>
            <HStack justify="center" mt={3} gap={1}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} as={FaStar} boxSize={3} color="yellow.300" />
              ))}
            </HStack>
            <Text fontSize="xs" opacity={0.7} mt={2}>- Sarah M., Mother of 3</Text>
          </Box>
        </VStack>
      </Box>

      {/* Right Side - Login Form */}
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

        {/* Floating Orbs for Desktop */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          top="20%"
          right="10%"
          w="200px"
          h="200px"
          borderRadius="50%"
          bgGradient="radial(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)"
          css={{
            animation: 'orbFloat 15s ease-in-out infinite',
            '@keyframes orbFloat': {
              '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
              '33%': { transform: 'translateY(-30px) translateX(20px)' },
              '66%': { transform: 'translateY(20px) translateX(-15px)' }
            }
          }}
        />

        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          bottom="30%"
          left="5%"
          w="150px"
          h="150px"
          borderRadius="50%"
          bgGradient="radial(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)"
          css={{
            animation: 'orbFloatReverse 12s ease-in-out infinite',
            '@keyframes orbFloatReverse': {
              '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
              '50%': { transform: 'translateY(-20px) translateX(-10px)' }
            }
          }}
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
              <Heading as="h1" size={{ base: 'xl', md: '2xl' }} color="gray.800" fontWeight="black" letterSpacing="-0.02em">
                Welcome Back! 👋
              </Heading>
              <Text color="gray.600" fontSize="lg" fontWeight="medium">
                Sign in to continue managing your family tribe
              </Text>
            </VStack>

            {/* Login Form */}
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
              _after={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                bgGradient: 'conic(from 0deg, transparent, rgba(34, 197, 94, 0.03), transparent)',
                css: {
                  animation: 'cardGlow 8s linear infinite',
                  '@keyframes cardGlow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                },
                zIndex: -1
              }}
            >
              <form onSubmit={handleSubmit}>
                <VStack gap={6}>
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />

                  <FormInput
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  >
                    <PasswordToggle
                      isVisible={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                    />
                  </FormInput>

                  <HStack justify="space-between" w="full">
                    <HStack gap={2}>
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#10b981'
                        }}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Remember me
                      </Text>
                    </HStack>
                    <Link
                      as={RouterLink}
                      to="/forgot-password"
                      fontSize="sm"
                      color="green.600"
                      fontWeight="semibold"
                      _hover={{ color: 'green.800', textDecoration: 'underline' }}
                    >
                      Forgot password?
                    </Link>
                  </HStack>

                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    h="64px"
                    bg="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
                    color="white"
                    _hover={{
                      transform: isLoading ? 'none' : 'translateY(-3px)',
                      shadow: isLoading ? 'none' : '0 20px 40px rgba(34, 197, 94, 0.4)',
                      bg: isLoading ? 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)' : 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
                    }}
                    _active={{
                      transform: isLoading ? 'none' : 'translateY(-1px)',
                      shadow: isLoading ? 'none' : '0 10px 25px rgba(34, 197, 94, 0.3)'
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    borderRadius="2xl"
                    fontWeight="bold"
                    fontSize="lg"
                    letterSpacing="0.025em"
                    position="relative"
                    overflow="hidden"
                    loading={isLoading}
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: isLoading ? '-100%' : '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.6s ease',
                      ...(isLoading && {
                        animation: 'shimmer 1.5s infinite',
                        '@keyframes shimmer': {
                          '0%': { left: '-100%' },
                          '100%': { left: '100%' }
                        }
                      })
                    }}
                    _hover={{
                      _before: {
                        left: isLoading ? '100%' : '100%'
                      }
                    }}
                  >
                    {isLoading ? (
                      <HStack gap={3}>
                        <Box
                          w="20px"
                          h="20px"
                          border="2px solid"
                          borderColor="white"
                          borderTopColor="transparent"
                          borderRadius="50%"
                          css={{
                            animation: 'spin 1s linear infinite',
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' }
                            }
                          }}
                        />
                        <Text>Signing In...</Text>
                      </HStack>
                    ) : (
                      <HStack gap={2}>
                        <Icon as={FaLeaf} boxSize={5} />
                        <Text>Sign In to Your Tribe</Text>
                      </HStack>
                    )}
                  </Button>

                </VStack>
              </form>
            </Box>

            {/* Sign Up Link */}
            <Box
              p={6}
              bg="green.50"
              borderRadius="2xl"
              border="1px solid"
              borderColor="green.100"
              textAlign="center"
            >
              <VStack gap={2}>
                <Text color="gray.600" fontSize="sm">
                  Don't have a family tribe yet?
                </Text>
                <Link
                  as={RouterLink}
                  to="/register"
                  color="green.600"
                  fontWeight="bold"
                  fontSize="lg"
                  _hover={{
                    color: 'green.800',
                    textDecoration: 'none',
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.2s ease"
                >
                  Create Your Tribe 🌱
                </Link>
              </VStack>
            </Box>

            {/* Back to Home */}
            <HStack justify="center" pt={4}>
              <Link
                as={RouterLink}
                to="/"
                color="gray.500"
                fontWeight="semibold"
                fontSize="sm"
                _hover={{
                  color: 'green.600',
                  textDecoration: 'none',
                  transform: 'translateX(-2px)'
                }}
                transition="all 0.2s ease"
              >
                ← Back to Home
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
    </Flex>
    </Box>
  );
}