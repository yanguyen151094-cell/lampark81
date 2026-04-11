import { useEffect, useState, FormEvent } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase, GalleryItem } from '../../../lib/supabase';
import ImageUpload from '../../../components/base/ImageUpload';

const CATEGORIES = [
  { id: 'exterior', label: 'Ngoại thất' },
  { id: 'lobby', label: 'Sảnh' },
  { id: 'room', label: 'Phòng nghỉ' },
  { id: 'pool', label: 'Hồ bơi' },
  { id: 'dining', label: 'Nhà hàng' },
  { id: 'spa', label: 'Spa & Wellness' },
];

const emptyItem = { id: '', category: 'room', label: 'Phòng nghỉ', caption: '', url: '' };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyItem });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState('all');

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery').select('*').order('sort_order');
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const id = `g${Date.now()}`;
    const catInfo = CATEGORIES.find(c => c.id === form.category);
    const { error } = await supabase.from('gallery').insert([{
      id, category: form.category, label: catInfo?.label ?? form.category,
      caption: form.caption, url: form.url, sort_order: items.length + 1,
    }]);
    setSaving(false);
    if (!error) { showToast('Đã thêm ảnh mới!'); setShowAdd(false); setForm({ ...emptyItem }); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('gallery').delete().eq('id', id);
    showToast('Đã xóa ảnh!');
    setDeleteId(null);
    fetchItems();
  };

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat);

  return (
    <AdminLayout>
      <div className="p-8">
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
            <i className="ri-check-line"></i> {toast}
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Thư viện ảnh</h1>
            <p className="text-stone-500 text-sm mt-1">Quản lý ảnh hiển thị trên trang Gallery ({items.length} ảnh)</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i> Thêm ảnh mới
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setFilterCat('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${filterCat === 'all' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
            Tất cả ({items.length})
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilterCat(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${filterCat === c.id ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
              {c.label} ({items.filter(i => i.category === c.id).length})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-stone-100 overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button onClick={() => setDeleteId(item.id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap">
                      <i className="ri-delete-bin-line mr-1"></i> Xóa
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <span className="inline-block text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full mb-1">{item.label}</span>
                  <p className="text-xs text-stone-600 truncate">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-16 text-stone-400">
            <i className="ri-image-line text-4xl mb-3 block"></i>
            <p className="text-sm">Chưa có ảnh nào trong danh mục này</p>
          </div>
        )}

        {/* Add Modal */}
        {showAdd && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between">
                <h2 className="font-bold text-stone-900">Thêm ảnh mới</h2>
                <button onClick={() => setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 cursor-pointer">
                  <i className="ri-close-line text-stone-500"></i>
                </button>
              </div>
              <form onSubmit={handleAdd} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Danh mục</label>
                  <select value={form.category} onChange={e => { const cat = CATEGORIES.find(c => c.id === e.target.value); setForm(f => ({ ...f, category: e.target.value, label: cat?.label ?? '' })); }}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Chú thích ảnh</label>
                  <input type="text" value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
                    placeholder="VD: Hồ bơi vô cực The Muse 1" required
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <ImageUpload
                  value={form.url}
                  onChange={url => setForm(f => ({ ...f, url }))}
                  label="Ảnh"
                  folder="gallery"
                  previewHeight="h-36"
                />
                <div className="p-3 bg-stone-50 rounded-lg">
                  <p className="text-xs text-stone-500"><i className="ri-information-line mr-1"></i>
                    Hỗ trợ tải file trực tiếp hoặc dán link từ Google Drive (public), Imgur, Cloudinary.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowAdd(false)}
                    className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm cursor-pointer whitespace-nowrap hover:bg-stone-50">Hủy</button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-60">
                    {saving ? 'Đang thêm...' : 'Thêm ảnh'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-red-500 text-2xl"></i>
              </div>
              <h3 className="font-bold text-stone-900 mb-2">Xóa ảnh này?</h3>
              <p className="text-stone-500 text-sm mb-6">Ảnh sẽ bị xóa khỏi thư viện vĩnh viễn.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm cursor-pointer whitespace-nowrap">Hủy</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">Xóa</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
