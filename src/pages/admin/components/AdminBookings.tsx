import { useState } from 'react';

const mockBookings = [
  { id: 'BK001', guestName: 'Nguyễn Minh Tuấn', phone: '0901234567', email: 'tuan@email.com', roomName: 'Studio A1', checkIn: '2025-05-01', duration: '6 tháng', status: 'confirmed', note: 'Cần phòng yên tĩnh' },
  { id: 'BK002', guestName: 'Trần Thị Lan', phone: '0912345678', email: 'lan@email.com', roomName: '1 Phòng Ngủ B2', checkIn: '2025-05-15', duration: '12 tháng', status: 'pending', note: '' },
  { id: 'BK003', guestName: 'Lê Văn Hùng', phone: '0923456789', email: 'hung@email.com', roomName: 'Deluxe C3', checkIn: '2025-06-01', duration: '3 tháng', status: 'confirmed', note: 'Có xe máy' },
  { id: 'BK004', guestName: 'Phạm Thu Hương', phone: '0934567890', email: 'huong@email.com', roomName: 'Economy D4', checkIn: '2025-05-20', duration: '6 tháng', status: 'cancelled', note: '' },
  { id: 'BK005', guestName: 'Hoàng Đức Nam', phone: '0945678901', email: 'nam@email.com', roomName: 'Premium E5', checkIn: '2025-07-01', duration: 'Dài hạn', status: 'pending', note: 'Cần thêm thông tin' },
];

type Booking = typeof mockBookings[0];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  confirmed: { label: 'Đã xác nhận', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = (id: string, status: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đặt phòng</h2>
          <p className="text-gray-500 text-sm">{bookings.length} yêu cầu</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                filter === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {s === 'all' ? 'Tất cả' : STATUS_LABELS[s]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-xl flex-shrink-0">
                  <i className="ri-user-line text-amber-600"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900">{booking.guestName}</p>
                    <span className="text-xs text-gray-400">#{booking.id}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><i className="ri-phone-line"></i>{booking.phone}</span>
                    <span className="flex items-center gap-1"><i className="ri-mail-line"></i>{booking.email}</span>
                    <span className="flex items-center gap-1"><i className="ri-home-line"></i>{booking.roomName}</span>
                    <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{booking.checkIn}</span>
                    <span className="flex items-center gap-1"><i className="ri-time-line"></i>{booking.duration}</span>
                  </div>
                  {booking.note && <p className="text-xs text-gray-400 mt-1 italic">&ldquo;{booking.note}&rdquo;</p>}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_LABELS[booking.status]?.color}`}>
                  {STATUS_LABELS[booking.status]?.label}
                </span>
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      className="bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Hủy
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
