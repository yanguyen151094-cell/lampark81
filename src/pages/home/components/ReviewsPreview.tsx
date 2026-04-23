import { useNavigate } from 'react-router-dom';
import { overallStats } from '@/mocks/reviews';
import { useLang } from '@/context/LanguageContext';
import { useDataStore } from '@/context/DataStore';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <i key={s} className={`text-sm ${s <= rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-gray-300'}`}></i>
      ))}
    </div>
  );
}

export default function ReviewsPreview() {
  const navigate = useNavigate();
  const { reviews } = useDataStore();
  const displayReviews = reviews.slice(0, 6);
  const { lang } = useLang();

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              {lang === 'en' ? 'Reviews' : 'Đánh giá'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {lang === 'en' ? (
                <>What Our<br /><span className="text-amber-500">Guests Say About Us</span></>
              ) : (
                <>Khách Hàng<br /><span className="text-amber-500">Nói Gì Về Chúng Tôi</span></>
              )}
            </h2>
          </div>
          {/* Overall Rating */}
          <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{overallStats.averageRating}</div>
              <StarRating rating={Math.round(overallStats.averageRating)} />
              <div className="text-gray-500 text-xs mt-1">
                {overallStats.totalReviews} {lang === 'en' ? 'reviews' : 'đánh giá'}
              </div>
            </div>
            <div className="space-y-1.5 min-w-[120px]">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = overallStats.ratingBreakdown[star as keyof typeof overallStats.ratingBreakdown];
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <i className="ri-star-fill text-amber-400 text-xs"></i>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400 w-6">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-300"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                  <p className="text-gray-400 text-xs">{review.roomName}</p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={review.rating} />
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.content}&rdquo;
              </p>

              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Review" className="w-20 h-14 object-cover rounded-lg" />
                  ))}
                </div>
              )}

              <p className="text-gray-400 text-xs">
                {new Date(review.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/reviews')}
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-10 py-4 rounded-full text-sm transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'View all reviews' : 'Xem tất cả đánh giá'}
          </button>
        </div>
      </div>
    </section>
  );
}
