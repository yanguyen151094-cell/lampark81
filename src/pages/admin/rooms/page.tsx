import { useEffect, useState, FormEvent } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase, Room, Hotel } from '../../../lib/supabase';
import ImageUpload from '../../../components/base/ImageUpload';

const emptyRoom: Partial<Room> = {
  hotel_id: 'muse-1', hotel_name: 'The Muse 1', name: '',
  capacity: 2, price: 0, size: 0, bed_type: '',
  image: '', images: [], amenities: [], description: '', is_active: true, sort_order: 0,
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filterHotel, setFilterHotel] = useState('all');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Room> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const [{ data: r }, { data: h }] = await Promise.all([
      supabase.from('rooms').select('*').order('hotel_id').order('sort_order'),
      supabase.from('hotels').select('id,name').order('sort_order'),
    ]);
    setRooms(r ?? []);
    setHotels(h ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openNew = () => {
    setIsNew(true);
    setEditing({ ...emptyRoom, id: `r${Date.now()}` });
  };

  const openEdit = (room: Room) => {
    setIsNew(false);
    setEditing({ ...room, images: room.images?.length ? room.images : (room.image ? [room.image] : []) });
  };

  const handleAddImage = (url: string) => {
    setEditing(f => ({ ...f!, images: [...(f?.images ?? []), url] }));
  };

  const handleRemoveImage = (idx: number) => {
    setEditing(f => ({ ...f!, images: (f?.images ?? []).filter((_, i) => i !== idx) }));
  };

  const handleSetCover = (url: string) => {
    setEditing(f => ({ ...f!, image: url }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const amenities = typeof editing.amenities === 'string'
      ? (editing.amenities as unknown as string).split('\n').map(s => s.trim()).filter(Boolean)
      : editing.amenities ?? [];
    const selectedHotel = hotels.find(h => h.id === editing.hotel_id);
    const images = editing.images ?? [];
    const image = editing.image || images[0] || '';
    const payload = { ...editing, amenities, images, image, hotel_name: selectedHotel?.name ?? editing.hotel_name };
    let error;
    if (isNew) {
      ({ error } = await supabase.from('rooms').insert([payload]));
    } else {
      ({ error } = await supabase.from('rooms').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing.id!));
    }
    setSaving(false);
    if (!error) { showToast(isNew ? 'Đã thêm phòng mới!' : 'Đã lưu thay đổi!'); setEditing(null); fetchData(); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('rooms').delete().eq('id', id);
    showToast('Đã xóa phòng!');
    setDeleteId(null);
    fetchData();
  };

  const filtered = filterHotel === 'all' ? rooms : rooms.filter(r => r.hotel_id === filterHotel);

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
            <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Quản lý Phòng nghỉ</h1>
            <p className="text-stone-500 text-sm mt-1">Thêm, sửa, xóa phòng và điều chỉnh giá</p>
          </div>
          <button onClick={openNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i> Thêm phòng mới
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {[{ id: 'all', name: 'Tất cả' }, ...hotels].map(h => (
            <button key={h.id} onClick={() => setFilterHotel(h.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${filterHotel === h.id ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-amber-300'}`}>
              {h.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i></div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Phòng</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Cơ sở</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Sức chứa</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Giá/đêm</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Ảnh</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map(room => (
                  <tr key={room.id} className="hover:bg-stone-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900">{room.name}</p>
                          <p className="text-xs text-stone-400">{room.bed_type} · {room.size}m²</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-600">{room.hotel_name}</td>
                    <td className="px-5 py-4 text-sm text-stone-600">{room.capacity} người</td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-amber-700">{room.price.toLocaleString('vi-VN')}₫</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                        {room.images?.length ?? 1} ảnh
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(room)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap">
                          <i className="ri-edit-line"></i> Sửa
                        </button>
                        <button onClick={() => setDeleteId(room.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap">
                          <i className="ri-delete-bin-line"></i> Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-stone-400 text-sm">
                <i className="ri-hotel-bed-line text-3xl mb-2 block"></i>
                Chưa có phòng nào. Nhấn "Thêm phòng mới" để bắt đầu.
              </div>
            )}
          </div>
        )}

        {/* Room Form Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between">
                <h2 className="font-bold text-stone-900">{isNew ? 'Thêm phòng mới' : 'Chỉnh sửa phòng'}</h2>
                <button onClick={() => setEditing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 cursor-pointer">
                  <i className="ri-close-line text-stone-500"></i>
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Thuộc cơ sở</label>
                  <select value={editing.hotel_id ?? 'muse-1'} onChange={e => setEditing(f => ({ ...f!, hotel_id: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                {[
                  { label: 'Tên phòng', key: 'name', type: 'text' },
                  { label: 'Loại giường', key: 'bed_type', type: 'text' },
                  { label: 'Giá/đêm (VNĐ)', key: 'price', type: 'number' },
                  { label: 'Sức chứa (người)', key: 'capacity', type: 'number' },
                  { label: 'Diện tích (m²)', key: 'size', type: 'number' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>
                    <input type={type} value={(editing as Record<string, unknown>)[key] as string ?? ''}
                      onChange={e => setEditing(f => ({ ...f!, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                ))}

                {/* Multi-image Gallery */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-stone-600">Bộ ảnh phòng <span className="text-stone-400">(hiển thị slideshow cho khách)</span></label>
                    <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{editing.images?.length ?? 0} ảnh</span>
                  </div>

                  {/* Existing images */}
                  {(editing.images ?? []).length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {(editing.images ?? []).map((url, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden h-24 border-2 border-transparent hover:border-amber-400 transition">
                          <img src={url} alt="" className="w-full h-full object-cover object-top" />
                          {editing.image === url && (
                            <div className="absolute top-1 left-1 bg-amber-600 text-white text-xs px-1.5 py-0.5 rounded-md">Bìa</div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            {editing.image !== url && (
                              <button type="button" onClick={() => handleSetCover(url)}
                                className="text-white text-xs bg-amber-600/80 hover:bg-amber-600 px-2 py-1 rounded cursor-pointer whitespace-nowrap">
                                Đặt bìa
                              </button>
                            )}
                            <button type="button" onClick={() => handleRemoveImage(idx)}
                              className="w-7 h-7 flex items-center justify-center bg-red-500/80 hover:bg-red-600 text-white rounded-full cursor-pointer">
                              <i className="ri-close-line text-sm"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new image */}
                  <div className="border border-dashed border-stone-200 rounded-xl p-3">
                    <p className="text-xs text-stone-400 mb-2">Thêm ảnh mới vào bộ sưu tập:</p>
                    <ImageUpload
                      value=""
                      onChange={url => { if (url) handleAddImage(url); }}
                      label=""
                      folder="rooms"
                      previewHeight="h-28"
                    />
                  </div>
                  <p className="text-xs text-stone-400 mt-1.5">Hover lên ảnh → nhấn "Đặt bìa" để chọn ảnh đại diện</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Mô tả phòng</label>
                  <textarea rows={3} value={editing.description ?? ''} onChange={e => setEditing(f => ({ ...f!, description: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Tiện ích (mỗi tiện ích 1 dòng)</label>
                  <textarea rows={4} value={(Array.isArray(editing.amenities) ? editing.amenities : []).join('\n')}
                    onChange={e => setEditing(f => ({ ...f!, amenities: e.target.value.split('\n') }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditing(null)}
                    className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition cursor-pointer whitespace-nowrap">Hủy</button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap disabled:opacity-60">
                    {saving ? 'Đang lưu...' : (isNew ? 'Thêm phòng' : 'Lưu thay đổi')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-red-500 text-2xl"></i>
              </div>
              <h3 className="font-bold text-stone-900 mb-2">Xóa phòng này?</h3>
              <p className="text-stone-500 text-sm mb-6">Hành động này không thể hoàn tác.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm cursor-pointer whitespace-nowrap hover:bg-stone-50">Hủy</button>
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">Xóa</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
