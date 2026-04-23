import { useLang } from '@/context/LanguageContext';

const nearbyPlacesVi = [
  { icon: 'ri-store-2-line', label: 'Chợ địa phương', distance: '200m', color: 'text-orange-500' },
  { icon: 'ri-school-line', label: 'Trường Đại học', distance: '500m', color: 'text-green-500' },
  { icon: 'ri-hospital-line', label: 'Bệnh viện', distance: '800m', color: 'text-red-500' },
  { icon: 'ri-shopping-bag-line', label: 'Trung tâm TM', distance: '1km', color: 'text-amber-500' },
  { icon: 'ri-bus-line', label: 'Bến xe buýt', distance: '150m', color: 'text-sky-500' },
  { icon: 'ri-restaurant-line', label: 'Khu ẩm thực', distance: '300m', color: 'text-pink-500' },
];

const nearbyPlacesEn = [
  { icon: 'ri-store-2-line', label: 'Local Market', distance: '200m', color: 'text-orange-500' },
  { icon: 'ri-school-line', label: 'University', distance: '500m', color: 'text-green-500' },
  { icon: 'ri-hospital-line', label: 'Hospital', distance: '800m', color: 'text-red-500' },
  { icon: 'ri-shopping-bag-line', label: 'Shopping Mall', distance: '1km', color: 'text-amber-500' },
  { icon: 'ri-bus-line', label: 'Bus Station', distance: '150m', color: 'text-sky-500' },
  { icon: 'ri-restaurant-line', label: 'Food Court', distance: '300m', color: 'text-pink-500' },
];

export default function MapSection() {
  const { lang } = useLang();
  const nearbyPlaces = lang === 'en' ? nearbyPlacesEn : nearbyPlacesVi;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {lang === 'en' ? 'Location' : 'Vị trí'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {lang === 'en' ? (
              <>Convenient <span className="text-amber-500">Location</span></>
            ) : (
              <>Vị Trí <span className="text-amber-500">Thuận Lợi</span></>
            )}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Info Panel */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-xl">
                  <i className="ri-map-pin-2-fill text-red-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">LamPark81</h3>
                  <p className="text-gray-500 text-sm">81 Đường LamPark, Phường X, Quận Y, TP.HCM</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  {lang === 'en' ? 'Nearby Amenities' : 'Tiện ích xung quanh'}
                </h4>
                {nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className={`${place.icon} ${place.color} text-lg`}></i>
                    </div>
                    <span className="text-gray-700 text-sm flex-1">{place.label}</span>
                    <span className="text-gray-400 text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{place.distance}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=LamPark81+Ho+Chi+Minh+City"
                target="_blank"
                rel="nofollow noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors cursor-pointer w-full"
              >
                <i className="ri-navigation-line"></i>
                {lang === 'en' ? 'Get Directions' : 'Chỉ đường đến đây'}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px]">
            <iframe
              title="LamPark81 Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.6!3d10.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzEyLjAiTiAxMDbCsDM2JzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
