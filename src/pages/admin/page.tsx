import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminRooms from './components/AdminRooms';
import AdminReviews from './components/AdminReviews';
import AdminBookings from './components/AdminBookings';
import AdminReels from './components/AdminReels';
import AdminVideoIntro from './components/AdminVideoIntro';
import AdminBlog from './components/AdminBlog';

const LOGO_URL = 'https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/5ec72bfd1f8b9242cb55030dbeddfcfa.jpeg';

const ADMIN_PASSWORD = 'Yamato@123';

const tabs = [
  { id: 'rooms', label: 'Quản lý phòng', icon: 'ri-home-4-line' },
  { id: 'bookings', label: 'Đặt phòng', icon: 'ri-calendar-check-line' },
  { id: 'reviews', label: 'Đánh giá', icon: 'ri-star-line' },
  { id: 'reels', label: 'Video Reels', icon: 'ri-video-line' },
  { id: 'videointro', label: 'Video Giới Thiệu', icon: 'ri-film-line' },
  { id: 'blog', label: 'Quản lý Blog', icon: 'ri-article-line' },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('rooms');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div className="text-center mb-8">
            <img src={LOGO_URL} alt="LamPark81" className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
            <h1 className="font-bold text-gray-900 text-xl">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">LamPark81 Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mật khẩu admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
              Đăng nhập
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/" className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer">← Về trang chủ</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="LamPark81" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">LamPark81</p>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-gray-900'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <i className={`${tab.icon} text-base flex-shrink-0`}></i>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white text-sm transition-all cursor-pointer"
          >
            <i className="ri-home-line text-base"></i>
            Về trang chủ
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-red-400 text-sm transition-all cursor-pointer"
          >
            <i className="ri-logout-box-line text-base"></i>
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 cursor-pointer"
          >
            <i className="ri-menu-line text-gray-700"></i>
          </button>
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="LamPark81" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-bold text-gray-900 text-sm">Admin - {tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {activeTab === 'rooms' && <AdminRooms />}
          {activeTab === 'bookings' && <AdminBookings />}
          {activeTab === 'reviews' && <AdminReviews />}
          {activeTab === 'reels' && <AdminReels />}
          {activeTab === 'videointro' && <AdminVideoIntro />}
          {activeTab === 'blog' && <AdminBlog />}
        </div>
      </div>
    </div>
  );
}
