import { useDataStore } from '@/context/DataStore';

export default function AdminReviews() {
  const { reviews: reviewList, setReviews } = useDataStore();

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa đánh giá này?')) {
      setReviews(reviewList.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h2>
          <p className="text-gray-500 text-sm">{reviewList.length} đánh giá</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviewList.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                    <span className="text-xs text-gray-400">{review.roomName}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <i key={s} className={`text-xs ${s <= review.rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.content}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
