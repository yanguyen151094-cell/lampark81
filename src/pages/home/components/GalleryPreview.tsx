import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

const GALLERY_IMAGES = [
  { src: 'https://readdy.ai/api/search-image?query=modern%20studio%20apartment%20interior%20with%20minimalist%20design%2C%20white%20walls%2C%20wooden%20floor%2C%20large%20window%2C%20cozy%20bed%2C%20clean%20aesthetic%2C%20bright%20natural%20light%2C%20Vietnam%20apartment&width=600&height=450&seq=gp1&orientation=landscape', labelVi: 'Studio A1', labelEn: 'Studio A1', price: '3.5tr/tháng', priceEn: '3.5M/mo' },
  { src: 'https://readdy.ai/api/search-image?query=one%20bedroom%20apartment%20interior%20modern%20design%2C%20separate%20bedroom%20with%20queen%20bed%2C%20living%20room%2C%20clean%20white%20walls%2C%20wooden%20furniture%2C%20bright%20natural%20light&width=600&height=450&seq=gp2&orientation=landscape', labelVi: '1 Phòng Ngủ B2', labelEn: '1 Bedroom B2', price: '5tr/tháng', priceEn: '5M/mo' },
  { src: 'https://readdy.ai/api/search-image?query=deluxe%20hotel%20room%20style%20apartment%2C%20premium%20interior%20design%2C%20king%20size%20bed%2C%20elegant%20decor%2C%20city%20view%20window%2C%20luxury%20feel%2C%20Vietnam&width=600&height=450&seq=gp3&orientation=landscape', labelVi: 'Deluxe C3', labelEn: 'Deluxe C3', price: '4.2tr/tháng', priceEn: '4.2M/mo' },
  { src: 'https://readdy.ai/api/search-image?query=luxury%20penthouse%20apartment%20interior%2C%20spacious%20living%20area%2C%20panoramic%20city%20view%2C%20luxury%20furniture%2C%20modern%20design%2C%20high%20floor%20apartment%20Vietnam&width=600&height=450&seq=gp4&orientation=landscape', labelVi: 'Premium E5', labelEn: 'Premium E5', price: '6.5tr/tháng', priceEn: '6.5M/mo' },
  { src: 'https://readdy.ai/api/search-image?query=modern%20apartment%20bathroom%20with%20clean%20white%20tiles%2C%20shower%2C%20good%20lighting%2C%20minimalist%20design%2C%20Vietnam%20rental%20room&width=600&height=450&seq=gp5&orientation=landscape', labelVi: 'Phòng tắm cao cấp', labelEn: 'Premium Bathroom', price: '', priceEn: '' },
  { src: 'https://readdy.ai/api/search-image?query=modern%20apartment%20kitchen%20area%20with%20compact%20design%2C%20modern%20appliances%2C%20clean%20countertop%2C%20bright%20lighting%2C%20Vietnam&width=600&height=450&seq=gp6&orientation=landscape', labelVi: 'Bếp hiện đại', labelEn: 'Modern Kitchen', price: '', priceEn: '' },
];

export default function GalleryPreview() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              {lang === 'en' ? 'Photo Gallery' : 'Thư viện ảnh'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {lang === 'en' ? (
                <>Explore Our<br /><span className="text-amber-500">Living Spaces</span></>
              ) : (
                <>Khám Phá<br /><span className="text-amber-500">Không Gian Sống</span></>
              )}
            </h2>
          </div>
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2 text-gray-700 hover:text-amber-500 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'View all photos' : 'Xem tất cả ảnh'}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setLightbox(idx)}
            >
              <img
                src={img.src}
                alt={lang === 'en' ? img.labelEn : img.labelVi}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm">{lang === 'en' ? img.labelEn : img.labelVi}</p>
                  {(lang === 'en' ? img.priceEn : img.price) && (
                    <p className="text-amber-300 text-xs font-medium">{lang === 'en' ? img.priceEn : img.price}</p>
                  )}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                  <i className="ri-zoom-in-line text-white text-sm"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/gallery')}
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-10 py-3.5 rounded-full text-sm transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'View all rooms' : 'Xem tất cả phòng'}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white text-3xl cursor-pointer" onClick={() => setLightbox(null)}>
            <i className="ri-close-line"></i>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <img
            src={GALLERY_IMAGES[lightbox].src}
            alt={lang === 'en' ? GALLERY_IMAGES[lightbox].labelEn : GALLERY_IMAGES[lightbox].labelVi}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_IMAGES.length); }}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lang === 'en' ? GALLERY_IMAGES[lightbox].labelEn : GALLERY_IMAGES[lightbox].labelVi}
          </div>
        </div>
      )}
    </section>
  );
}
