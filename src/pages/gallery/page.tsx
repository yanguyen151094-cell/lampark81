import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { supabase, GalleryItem } from '../../lib/supabase';

type Category = { id: string; label: string };

export default function GalleryPage() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', label: 'Tất Cả' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
    const fetchGallery = async () => {
      const { data } = await supabase.from('gallery').select('*').order('sort_order');
      const items: GalleryItem[] = data ?? [];
      setImages(items);
      // Build unique categories from gallery data
      const catMap = new Map<string, string>();
      items.forEach(img => {
        if (img.category && img.label) catMap.set(img.category, img.label);
      });
      const cats: Category[] = [{ id: 'all', label: 'Tất Cả' }];
      catMap.forEach((label, id) => cats.push({ id, label }));
      setCategories(cats);
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=luxury%20hotel%20photo%20gallery%20collage%2C%20multiple%20views%20rooms%20pool%20lobby%20dining%2C%20warm%20golden%20photography%2C%20boutique%20hotel%20Vietnam%2C%20professional%20editorial%20photography&width=1920&height=600&seq=gallery-hero&orientation=landscape"
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Thư Viện Ảnh</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Thư Viện Ảnh</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${activeCategory === cat.id ? 'bg-gold text-white' : 'bg-cream-dark text-brown/70 hover:bg-white'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-3xl text-gold"></i></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-brown/40">
              <i className="ri-image-line text-4xl block mb-3"></i>
              <p>Chưa có ảnh nào trong thư viện.</p>
            </div>
          ) : (
            /* Masonry-style Grid */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <div
                  key={img.id}
                  className={`group break-inside-avoid rounded-xl overflow-hidden cursor-pointer relative transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={() => setLightbox(img.url)}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs text-gold font-medium">{img.label}</span>
                    <span className="text-white text-sm font-medium">{img.caption}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
                      <i className="ri-zoom-in-line text-white text-sm"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" className="max-w-4xl max-h-[90vh] object-contain rounded-lg w-full" />
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer" onClick={() => setLightbox(null)}>
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
