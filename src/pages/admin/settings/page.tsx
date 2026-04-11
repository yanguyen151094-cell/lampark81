import { useEffect, useState, FormEvent } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../../../lib/supabase';
import ImageUpload from '../../../components/base/ImageUpload';

type SettingKey = string;

const CONTACT_FIELDS: { key: SettingKey; label: string }[] = [
  { key: 'contact_phone', label: 'Số điện thoại liên hệ' },
  { key: 'contact_email', label: 'Email liên hệ' },
  { key: 'contact_zalo', label: 'Số Zalo (không dấu chấm)' },
  { key: 'facebook_url', label: 'Link Facebook Page' },
];

const STAT_KEYS = ['brand_stat1', 'brand_stat2', 'brand_stat3', 'brand_stat4'];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    const map: Record<string, string> = {};
    (data ?? []).forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const set = (key: string, value: string) => setSettings(s => ({ ...s, [key]: value }));

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({
      key, value, updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' });
    setSaving(false);
    if (!error) showToast('Đã lưu cài đặt thành công!');
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
            <i className="ri-check-line"></i> {toast}
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Cài đặt Website</h1>
          <p className="text-stone-500 text-sm mt-1">Chỉnh sửa nội dung hiển thị trên toàn website</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i></div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 gap-6 max-w-3xl">

              {/* Hero section */}
              <div className="bg-white rounded-xl border border-stone-100 p-6">
                <h2 className="text-sm font-semibold text-stone-900 mb-5 flex items-center gap-2">
                  <i className="ri-home-line text-amber-600"></i> Nội dung Trang chủ (Hero)
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Tiêu đề Hero</label>
                    <input type="text" value={settings.hero_title ?? ''} onChange={e => set('hero_title', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Phụ đề Hero</label>
                    <textarea rows={3} value={settings.hero_subtitle ?? ''} onChange={e => set('hero_subtitle', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                  </div>
                </div>
              </div>

              {/* Brand / Philosophy section */}
              <div className="bg-white rounded-xl border border-stone-100 p-6">
                <h2 className="text-sm font-semibold text-stone-900 mb-5 flex items-center gap-2">
                  <i className="ri-sparkling-line text-amber-600"></i> Triết Lý The Muse (trang chủ)
                </h2>
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Tiêu đề mục</label>
                    <input type="text" value={settings.brand_title ?? ''} onChange={e => set('brand_title', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>

                  {/* Paragraphs */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Đoạn văn 1</label>
                    <textarea rows={3} value={settings.brand_para1 ?? ''} onChange={e => set('brand_para1', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Đoạn văn 2</label>
                    <textarea rows={3} value={settings.brand_para2 ?? ''} onChange={e => set('brand_para2', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                  </div>

                  {/* 3 images */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-3">Ảnh minh họa (3 ảnh)</label>
                    <div className="space-y-4">
                      {(['brand_image1', 'brand_image2', 'brand_image3'] as const).map((key, i) => (
                        <div key={key}>
                          <p className="text-xs text-stone-400 mb-1.5">Ảnh {i + 1}{i === 0 ? ' (ảnh lớn — banner)' : ` (ảnh nhỏ ${i})`}</p>
                          <ImageUpload
                            value={settings[key] ?? ''}
                            onChange={url => set(key, url)}
                            label=""
                            folder="brand"
                            previewHeight={i === 0 ? 'h-40' : 'h-28'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-3">Thống kê (4 ô số liệu)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {STAT_KEYS.map((base, i) => (
                        <div key={base} className="bg-stone-50 rounded-xl p-3 space-y-2">
                          <p className="text-xs text-stone-400 font-medium">Ô thống kê {i + 1}</p>
                          <div>
                            <label className="block text-xs text-stone-500 mb-0.5">Số / ký hiệu</label>
                            <input type="text" value={settings[`${base}_num`] ?? ''} onChange={e => set(`${base}_num`, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-300" />
                          </div>
                          <div>
                            <label className="block text-xs text-stone-500 mb-0.5">Nhãn</label>
                            <input type="text" value={settings[`${base}_label`] ?? ''} onChange={e => set(`${base}_label`, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About section */}
              <div className="bg-white rounded-xl border border-stone-100 p-6">
                <h2 className="text-sm font-semibold text-stone-900 mb-5 flex items-center gap-2">
                  <i className="ri-information-line text-amber-600"></i> Nội dung Giới thiệu
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Tiêu đề mục Giới thiệu</label>
                    <input type="text" value={settings.about_title ?? ''} onChange={e => set('about_title', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Nội dung Giới thiệu</label>
                    <textarea rows={4} value={settings.about_content ?? ''} onChange={e => set('about_content', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-xl border border-stone-100 p-6">
                <h2 className="text-sm font-semibold text-stone-900 mb-5 flex items-center gap-2">
                  <i className="ri-contacts-line text-amber-600"></i> Thông tin liên hệ
                </h2>
                <div className="space-y-4">
                  {CONTACT_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>
                      <input type="text" value={settings[key] ?? ''} onChange={e => set(key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={saving}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer whitespace-nowrap disabled:opacity-60">
                {saving ? (
                  <span className="flex items-center justify-center gap-2"><i className="ri-loader-4-line animate-spin"></i> Đang lưu...</span>
                ) : 'Lưu tất cả thay đổi'}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
