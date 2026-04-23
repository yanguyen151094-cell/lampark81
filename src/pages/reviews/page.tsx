import { useState, FormEvent } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import ChatWidget from '@/components/feature/ChatWidget';
import { overallStats } from '@/mocks/reviews';
import { useDataStore } from '@/context/DataStore';

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <i
          key={s}
          className={`text-lg cursor-pointer transition-colors ${
            s <= (interactive ? (hover || rating) : rating) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-gray-300'
          }`}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate && onRate(s)}
        ></i>
      ))}
    </div>
  );
}

const nearbyPlaces = [
  { icon: 'ri-store-2-line', label: 'Chợ địa phương', distance: '200m', color: 'text-orange-500' },
  { icon: 'ri-school-line', label: 'Trường Đại học', distance: '500m', color: 'text-green-500' },
  { icon: 'ri-hospital-line', label: 'Bệnh viện', distance: '800m', color: 'text-red-500' },
  { icon: 'ri-shopping-bag-line', label: 'Trung tâm TM', distance: '1km', color: 'text-amber-500' },
  { icon: 'ri-bus-line', label: 'Bến xe buýt', distance: '150m', color: 'text-sky-500' },
  { icon: 'ri-restaurant-line', label: 'Khu ẩm thực', distance: '300m', color: 'text-pink-500' },
];

export default function ReviewsPage() {
  const { reviews } = useDataStore();
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new URLSearchParams();
    const formData = new FormData(form);
    formData.forEach((value, key) => data.append(key, value.toString()));
    data.append('rating', newRating.toString());

    try {
      await fetch('https://readdy.ai/api/form/d7hvt7s6o6v9400gq820', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Đánh Giá & Bản Đồ</h1>
          <p className="text-gray-400">Ý kiến thực tế từ cư dân LamPark81</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Overall Stats */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-8 items-center" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div className="text-center">
            <div className="text-7xl font-bold text-gray-900">{overallStats.averageRating}</div>
            <StarRating rating={Math.round(overallStats.averageRating)} />
            <div className="text-gray-500 text-sm mt-2">{overallStats.totalReviews} đánh giá</div>
          </div>
          <div className="flex-1 space-y-2 w-full max-w-xs">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = overallStats.ratingBreakdown[star as keyof typeof overallStats.ratingBreakdown];
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-4">{star}</span>
                  <i className="ri-star-fill text-amber-400 text-sm"></i>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8">{pct}%</span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              { value: '98%', label: 'Hài lòng' },
              { value: '4.8★', label: 'Trung bình' },
              { value: '264', label: 'Đánh giá' },
              { value: '5+', label: 'Năm HĐ' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-xl font-bold text-gray-900">Tất cả đánh giá</h2>
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover object-top" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-gray-400 text-xs">{review.roomName} · {new Date(review.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{review.content}&rdquo;</p>
                {review.images.length > 0 && (
                  <div className="flex gap-2">
                    {review.images.map((img, idx) => (
                      <img key={idx} src={img} alt="Review" className="w-24 h-16 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Write Review */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
              <h3 className="font-bold text-gray-900 mb-4">Viết đánh giá</h3>
              {submitted ? (
                <div className="text-center py-4">
                  <i className="ri-check-line text-4xl text-green-500 block mb-2"></i>
                  <p className="text-gray-600 text-sm">Cảm ơn bạn đã đánh giá!</p>
                </div>
              ) : (
                <form data-readdy-form id="review-form" onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Họ tên *</label>
                    <input name="author_name" required type="text" placeholder="Tên của bạn" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email</label>
                    <input name="email" type="email" placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Đánh giá *</label>
                    <StarRating rating={newRating} interactive onRate={setNewRating} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Nội dung *</label>
                    <textarea name="review_content" required rows={4} maxLength={500} placeholder="Chia sẻ trải nghiệm của bạn..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60">
                    {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                  </button>
                </form>
              )}
            </div>

            {/* Map Mini */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Vị trí LamPark81</h3>
                <p className="text-gray-500 text-xs mt-1">81 Đường LamPark, TP.HCM</p>
              </div>
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.6!3d10.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzEyLjAiTiAxMDbCsDM2JzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="p-4 space-y-2">
                {nearbyPlaces.slice(0, 4).map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <i className={`${p.icon} ${p.color}`}></i>
                    <span className="text-gray-600 flex-1">{p.label}</span>
                    <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{p.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingContacts />
      <ChatWidget />
    </div>
  );
}
