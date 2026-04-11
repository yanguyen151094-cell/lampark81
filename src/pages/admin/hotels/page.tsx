import { useEffect, useState, FormEvent } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase, Hotel } from '../../../lib/supabase';
import ImageUpload from '../../../components/base/ImageUpload';

const emptyHotel: Partial<Hotel> = {
  name: '', tagline: '', short_desc: '', description: '',
  address: '', phone: '', email: '', image: '',
  gallery: [], amenities: [], badge: '',
};

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [form, setForm] = useState<Partial<Hotel>>(emptyHotel);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const fetchHotels = async () => {
    const { data } = await supabase.from('hotels').select('*').order('sort_order');
    setHotels(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchHotels(); }, []);

  const openEdit = (hotel: Hotel) => {
    setEditing(hotel);
    setForm({ ...hotel });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const amenities = typeof form.amenities === 'string'
      ? (form.amenities as unknown as string).split('\n').map(s => s.trim()).filter(Boolean)
      : form.amenities ?? [];
    const gallery = typeof form.gallery === 'string'
      ? (form.gallery as unknown as string).split('\n').map(s => s.trim()).filter(Boolean)
      : form.gallery ?? [];
    const { error } = await supabase.from('hotels').update({
      name: form.name, tagline: form.tagline, short_desc: form.short_desc,
      description: form.description, address: form.address, phone: form.phone,
      email: form.email, image: form.image, gallery, amenities,
      badge: form.badge || null, updated_at: new Date().toISOString(),
    }).eq('id', editing.id);
    setSaving(false);
    if (!error) {
      showToast('Đã lưu thông tin cơ sở!');
      setEditing(null);
      fetchHotels();
    }
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
          <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Quản lý Cơ sở</h1>
          <p className="text-stone-500 text-sm mt-1">Chỉnh sửa thông tin The Muse 1, 2, 3</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i></div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {hotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-stone-900">{hotel.name}</h3>
                    {hotel.badge && <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full whitespace-nowrap">{hotel.badge}</span>}
                  </div>
                  <p className="text-xs text-stone-500 mb-1"><i className="ri-map-pin-line mr-1"></i>{hotel.address}</p>
                  <p className="text-xs text-stone-500 mb-4"><i className="ri-phone-line mr-1"></i>{hotel.phone}</p>
                  <button
                    onClick={() => openEdit(hotel)}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-1"></i> Chỉnh sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between">
                <h2 className="font-bold text-stone-900">Chỉnh sửa: {editing.name}</h2>
                <button onClick={() => setEditing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 cursor-pointer">
                  <i className="ri-close-line text-stone-500"></i>
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                {[
                  { label: 'Tên cơ sở', key: 'name' },
                  { label: 'Slogan (tagline)', key: 'tagline' },
                  { label: 'Mô tả ngắn', key: 'short_desc' },
                  { label: 'Địa chỉ', key: 'address' },
                  { label: 'Số điện thoại', key: 'phone' },
                  { label: 'Email', key: 'email' },
                  { label: 'Badge (VD: Nổi bật, Premium...)', key: 'badge' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>
                    <input
                      type="text"
                      value={(form as Record<string, unknown>)[key] as string ?? ''}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Mô tả chi tiết</label>
                  <textarea rows={4} value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                </div>
                <ImageUpload
                  value={form.image ?? ''}
                  onChange={url => setForm(f => ({ ...f, image: url }))}
                  label="Ảnh đại diện cơ sở"
                  folder="hotels"
                  previewHeight="h-40"
                />
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-2">Ảnh Gallery (tải lên nhiều ảnh)</label>
                  <div className="space-y-2">
                    {(Array.isArray(form.gallery) ? form.gallery : []).map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                          <img src={url} alt="" className="w-full h-full object-cover object-top" />
                        </div>
                        <input
                          type="text"
                          value={url}
                          onChange={e => {
                            const arr = [...(form.gallery ?? [])];
                            arr[idx] = e.target.value;
                            setForm(f => ({ ...f, gallery: arr }));
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300"
                        />
                        <button type="button" onClick={() => setForm(f => ({ ...f, gallery: (f.gallery ?? []).filter((_, i) => i !== idx) }))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer flex-shrink-0">
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                    <ImageUpload
                      value=""
                      onChange={url => { if (url) setForm(f => ({ ...f, gallery: [...(f.gallery ?? []), url] })); }}
                      label=""
                      folder="hotels/gallery"
                      previewHeight="h-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Tiện ích (mỗi tiện ích 1 dòng)</label>
                  <textarea rows={4} value={(Array.isArray(form.amenities) ? form.amenities : []).join('\n')}
                    onChange={e => setForm(f => ({ ...f, amenities: e.target.value.split('\n') }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditing(null)}
                    className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition cursor-pointer whitespace-nowrap">
                    Hủy
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap disabled:opacity-60">
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
