import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <i className="ri-hotel-line text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Muse Admin
            </span>
          </div>
          <p className="text-stone-500 text-sm">Đăng nhập để quản lý khách sạn</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@themusehotel.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                <i className="ri-error-warning-line text-red-500 text-sm"></i>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-sm transition whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i> Đang đăng nhập...
                </span>
              ) : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-xs text-amber-700 font-medium mb-1">
              <i className="ri-information-line"></i> Lưu ý
            </p>
            <p className="text-xs text-amber-600">
              Tài khoản admin được tạo trong Supabase Dashboard → Authentication → Users. Liên hệ kỹ thuật viên để được cấp quyền truy cập.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          © 2024 The Muse Hotel Hai Phong. All rights reserved.
        </p>
      </div>
    </div>
  );
}
