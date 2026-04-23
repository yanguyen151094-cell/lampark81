import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import ChatWidget from '@/components/feature/ChatWidget';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import FeaturedRooms from './components/FeaturedRooms';
import GalleryPreview from './components/GalleryPreview';
import ReelsPreview from './components/ReelsPreview';
import ReviewsPreview from './components/ReviewsPreview';
import MapSection from './components/MapSection';
import CTASection from './components/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ReelsPreview />
        <FeaturesSection />
        <FeaturedRooms />
        <GalleryPreview />
        <ReviewsPreview />
        <MapSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingContacts />
      <ChatWidget />
    </div>
  );
}
