import { useState, FormEvent } from 'react';

interface Room {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface Props {
  room: Room;
  onClose: () => void;
}

export default function BookingModal({ room, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new URLSearchParams();
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });
    data.append('room_name', room.name);
    data.append('room_price', `${room.price / 1000000} triệu/đêm`);

    try {
      await fetch('https://readdy.ai/api/form/d7hvt7c6o6v9400gq81g', {
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Đặt phòng</h2>
            <p className="text-gray-500 text-sm">{room.name}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
              <i className="ri-check-line text-3xl text-green-500"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Đặt phòng thành công!</h3>
            <p className="text-gray-500 text-sm mb-6">Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút. Cảm ơn bạn đã tin tưởng LamPark81!</p>
            <button onClick={onClose} className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3 rounded-full cursor-pointer whitespace-nowrap">
              Đóng
            </button>
          </div>
        ) : (
          <form
            data-readdy-form
            id="booking-form"
            onSubmit={handleSubmit}
            className="p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Họ và tên *</label>
                <input
                  name="full_name"
                  required
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Số điện thoại *</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="0123 456 789"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ngày vào ở *</label>
                <input
                  name="check_in"
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Số đêm ở</label>
                <select
                  name="duration"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="1 đêm">1 đêm</option>
                  <option value="2 đêm">2 đêm</option>
                  <option value="3 đêm">3 đêm</option>
                  <option value="1 tuần">1 tuần (7 đêm)</option>
                  <option value="2 tuần">2 tuần (14 đêm)</option>
                  <option value="1 tháng">1 tháng (30 đêm)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ghi chú</label>
              <textarea
                name="note"
                rows={3}
                maxLength={500}
                placeholder="Yêu cầu đặc biệt, câu hỏi..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Price Summary */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Giá phòng</span>
                <span className="font-bold text-gray-900">{(room.price / 1000000).toFixed(1)} triệu/đêm</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Thanh toán trước khi nhận phòng</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'Đang gửi...' : 'Xác nhận đặt phòng'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
