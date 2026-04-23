import { useState } from 'react';
import { rooms as initialRooms } from '@/mocks/rooms';
import { useDataStore } from '@/context/DataStore';

type Room = typeof initialRooms[0];

function formatPrice(price: number): string {
  return (price / 1000000).toFixed(1) + ' triệu';
}

export default function AdminRooms() {
  const { rooms: roomList, setRooms } = useDataStore();
  const [editing, setEditing] = useState<Room | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'warn' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'warn' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleEdit = (room: Room) => {
    setEditing({ ...room });
    setNewImages([]);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditing({
      id: Date.now().toString(),
      name: '',
      type: 'studio',
      price: 3000000,
      area: 25,
      floor: 1,
      status: 'available',
      rating: 5.0,
      reviewCount: 0,
      images: [],
      amenities: [],
      description: '',
      featured: false,
    });
    setNewImages([]);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      showToast('Vui lòng nhập tên phòng!', 'warn');
      return;
    }
    const updated = { ...editing, images: [...editing.images, ...newImages] };
    const exists = roomList.find((r) => r.id === updated.id);
    const newList = exists
      ? roomList.map((r) => (r.id === updated.id ? updated : r))
      : [...roomList, updated];
    setRooms(newList);
    setShowForm(false);
    setEditing(null);
    setNewImages([]);
    showToast(exists ? 'Cập nhật phòng thành công!' : 'Thêm phòng mới thành công!');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa phòng này?')) {
      setRooms(roomList.filter((r) => r.id !== id));
      showToast('Đã xóa phòng!');
    }
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục tất cả dữ liệu phòng về mặc định? Dữ liệu hiện tại sẽ bị xóa.')) {
      setRooms([...initialRooms]);
      showToast('Đã khôi phục dữ liệu mặc định!');
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setNewImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveExistingImage = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, images: editing.images.filter((_, i) => i !== idx) });
  };

  const handleRemoveNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      showToast('⚠️ Ảnh tải lên chỉ hiển thị trong phiên này. Dùng URL ảnh để lưu vĩnh viễn!', 'warn');
    }
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) setNewImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-lg transition-all ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-amber-400 text-gray-900'
        }`}>
          <i className={`text-base ${toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}`}></i>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Quản lý phòng</h2>
          <p className="text-gray-500 text-sm">{roomList.length} phòng</p>
        </div>
        <div className="flex items-center gap-2">
          {roomList.length === 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              <i className="ri-refresh-line"></i>
              <span className="hidden sm:inline">Khôi phục mặc định</span>
            </button>
          )}
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
          >
            <i className="ri-add-line"></i>
            <span className="hidden sm:inline">Thêm phòng mới</span>
            <span className="sm:hidden">Thêm</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {roomList.length === 0 && (
        <div className="bg-white rounded-2xl p-16 text-center" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div className="w-16 h-16 flex items-center justify-center bg-amber-50 rounded-2xl mx-auto mb-4">
            <i className="ri-building-2-line text-3xl text-amber-400"></i>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Chưa có phòng nào</h3>
          <p className="text-gray-500 text-sm mb-6">Nhấn “Khôi phục mặc định” để lấy lại dữ liệu mẫu hoặc thêm phòng mới</p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer whitespace-nowrap"
          >
            <i className="ri-refresh-line"></i>
            Khôi phục dữ liệu mặc định
          </button>
        </div>
      )}

      {/* Desktop Table */}
      {roomList.length > 0 && (
      <div className="hidden md:block bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phòng</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Loại</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Giá</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ảnh</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {roomList.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={room.images[0]} alt={room.name} className="w-12 h-10 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{room.name}</p>
                        <p className="text-gray-400 text-xs">Tầng {room.floor} · {room.area}m²</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full capitalize">{room.type}</span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">{formatPrice(room.price)}/đêm</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {room.status === 'available' ? 'Còn phòng' : 'Đã đặt'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{room.images.length} ảnh</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(room)} className="w-8 h-8 flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors cursor-pointer">
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button onClick={() => handleDelete(room.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors cursor-pointer">
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Mobile Card List */}
      {roomList.length > 0 && (
      <div className="md:hidden space-y-3">
        {roomList.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div className="flex gap-3 p-4">
              <img src={room.images[0]} alt={room.name} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{room.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">Tầng {room.floor} · {room.area}m² · {room.images.length} ảnh</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {room.status === 'available' ? 'Còn phòng' : 'Đã đặt'}
                  </span>
                  <span className="text-xs font-semibold text-gray-900">{formatPrice(room.price)}/đêm</span>
                </div>
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              <button onClick={() => handleEdit(room)} className="flex-1 flex items-center justify-center gap-1.5 py-3 text-amber-600 text-xs font-semibold hover:bg-amber-50 transition-colors cursor-pointer">
                <i className="ri-edit-line"></i> Chỉnh sửa
              </button>
              <div className="w-px bg-gray-100"></div>
              <button onClick={() => handleDelete(room.id)} className="flex-1 flex items-center justify-center gap-1.5 py-3 text-red-500 text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer">
                <i className="ri-delete-bin-line"></i> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Edit Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <h3 className="font-bold text-gray-900 text-base">Chỉnh sửa phòng</h3>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tên phòng</label>
                  <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Loại phòng</label>
                  <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer">
                    <option value="studio">Studio</option>
                    <option value="1bedroom">1 Phòng ngủ</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="premium">Premium</option>
                    <option value="economy">Economy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Giá (VNĐ/đêm)</label>
                  <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Diện tích (m²)</label>
                  <input type="number" value={editing.area} onChange={(e) => setEditing({ ...editing, area: Number(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tầng</label>
                  <input type="number" value={editing.floor} onChange={(e) => setEditing({ ...editing, floor: Number(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Trạng thái</label>
                  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer">
                    <option value="available">Còn phòng</option>
                    <option value="booked">Đã đặt</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 accent-amber-400" />
                    <span className="text-sm text-gray-700">Phòng nổi bật</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mô tả</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} maxLength={500} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none" />
              </div>

              {/* Images Management */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Ảnh hiện tại ({editing.images.length})</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editing.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="" className="w-20 h-16 object-cover rounded-lg" />
                      <button onClick={() => handleRemoveExistingImage(idx)} className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                  {editing.images.length === 0 && <p className="text-gray-400 text-xs italic">Chưa có ảnh nào</p>}
                </div>

                <label className="text-xs font-semibold text-gray-600 mb-2 block">Thêm ảnh mới</label>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-amber-300 hover:border-amber-400 bg-amber-50 hover:bg-amber-100 rounded-xl py-3 mb-2 text-sm text-amber-700 cursor-pointer transition-colors">
                  <i className="ri-upload-cloud-2-line text-lg"></i>
                  <span className="font-semibold">Tải lên ảnh từ máy (nhiều ảnh cùng lúc)</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                </label>
                <div className="flex gap-2 mb-2">
                  <input type="url" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Hoặc dán URL ảnh..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" onKeyDown={(e) => e.key === 'Enter' && handleAddImageUrl()} />
                  <button onClick={handleAddImageUrl} className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer whitespace-nowrap">Thêm</button>
                </div>
                {newImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt="" className="w-20 h-16 object-cover rounded-lg border-2 border-amber-400" />
                        <button onClick={() => handleRemoveNewImage(idx)} className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs cursor-pointer">
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm">Hủy</button>
                <button onClick={handleSave} className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm">Lưu thay đổi</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
