import { useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/admin/dashboard', icon: 'ri-dashboard-line', label: 'Tổng quan' },
  { path: '/admin/hotels', icon: 'ri-building-2-line', label: 'Cơ sở' },
  { path: '/admin/rooms', icon: 'ri-hotel-bed-line', label: 'Phòng nghỉ' },
  { path: '/admin/gallery', icon: 'ri-image-line', label: 'Thư viện ảnh' },
  { path: '/admin/settings', icon: 'ri-settings-3-line', label: 'Cài đặt' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin');
      } else {
        setUserEmail(session.user.email ?? '');
      }
      setChecking(false);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-stone-100 flex flex-col fixed h-full z-20">
        <div className="p-5 border-b border-stone-100">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-hotel-line text-white text-sm"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Muse
              </p>
              <p className="text-xs text-stone-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition cursor-pointer ${
                  active
                    ? 'bg-amber-50 text-amber-700 font-medium'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <i className={`${item.icon} text-base ${active ? 'text-amber-600' : ''}`}></i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-stone-100">
          <div className="px-3 py-2 mb-1">
            <p className="text-xs text-stone-500 truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-600 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
          >
            <i className="ri-logout-box-line text-base"></i>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
