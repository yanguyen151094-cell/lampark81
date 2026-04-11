import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ hotels: 0, rooms: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [h, r, g] = await Promise.all([
        supabase.from('hotels').select('id', { count: 'exact', head: true }),
        supabase.from('rooms').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
      ]);
      setStats({ hotels: h.count ?? 0, rooms: r.count ?? 0, gallery: g.count ?? 0 });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { icon: 'ri-building-2-line', label: 'Cơ sở', value: stats.hotels, color: 'bg-amber-50 text-amber-700', href: '/admin/hotels' },
    { icon: 'ri-hotel-bed-line', label: 'Phòng nghỉ', value: stats.rooms, color: 'bg-emerald-50 text-emerald-700', href: '/admin/rooms' },
    { icon: 'ri-image-line', label: 'Ảnh thư viện', value: stats.gallery, color: 'bg-sky-50 text-sky-700', href: '/admin/gallery' },
  ];

  const quickActions = [
    { icon: 'ri-add-circle-line', label: 'Thêm phòng mới', href: '/admin/rooms', color: 'text-amber-600' },
    { icon: 'ri-image-add-line', label: 'Thêm ảnh vào thư viện', href: '/admin/gallery', color: 'text-emerald-600' },
    { icon: 'ri-edit-line', label: 'Chỉnh sửa thông tin cơ sở', href: '/admin/hotels', color: 'text-sky-600' },
    { icon: 'ri-settings-3-line', label: 'Cài đặt nội dung website', href: '/admin/settings', color: 'text-purple-600' },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Tổng quan
          </h1>
          <p className="text-stone-500 text-sm mt-1">Quản lý toàn bộ nội dung website The Muse Hotel</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {cards.map((c) => (
            <Link to={c.href} key={c.label} className="bg-white rounded-xl border border-stone-100 p-6 hover:shadow-md transition cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${c.color.split(' ')[0]}`}>
                <i className={`${c.icon} text-xl ${c.color.split(' ')[1]}`}></i>
              </div>
              <p className="text-3xl font-bold text-stone-900">{loading ? '...' : c.value}</p>
              <p className="text-stone-500 text-sm mt-1">{c.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition cursor-pointer"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-stone-50">
                  <i className={`${a.icon} text-lg ${a.color}`}></i>
                </div>
                <span className="text-sm font-medium text-stone-700">{a.label}</span>
                <i className="ri-arrow-right-s-line text-stone-400 ml-auto"></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-sm font-medium text-amber-800 mb-1">
            <i className="ri-lightbulb-line mr-1"></i> Hướng dẫn sử dụng
          </p>
          <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
            <li>Vào <strong>Cơ sở</strong> để chỉnh sửa thông tin, mô tả và ảnh của The Muse 1, 2, 3</li>
            <li>Vào <strong>Phòng nghỉ</strong> để thêm phòng mới, đổi giá, đổi ảnh và thay đổi nội dung</li>
            <li>Vào <strong>Thư viện ảnh</strong> để upload/xóa ảnh trên trang Gallery</li>
            <li>Vào <strong>Cài đặt</strong> để chỉnh sửa nội dung tổng quan trên website</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
