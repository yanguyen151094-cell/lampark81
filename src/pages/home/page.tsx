import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import BrandSection from './components/BrandSection';
import PropertiesSection from './components/PropertiesSection';
import FeaturedRooms from './components/FeaturedRooms';
import AmenitiesSection from './components/AmenitiesSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <main className="bg-cream font-sans">
      <Navbar />
      <HeroSection />
      <BrandSection />
      <PropertiesSection />
      <FeaturedRooms />
      <AmenitiesSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
