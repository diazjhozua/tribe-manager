import { Box } from '@chakra-ui/react';
import {
  Header,
  Footer,
  HeroSection,
  AboutSection,
  TeamSection,
  CallToActionSection,
} from '@/components';

export default function Home() {
  return (
    <Box>
      <Header />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <CallToActionSection />
      <Footer />
    </Box>
  );
}
