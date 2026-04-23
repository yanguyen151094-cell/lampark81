import { useState } from 'react';
import { reels as initialReels } from '@/mocks/reels';
import { useDataStore } from '@/context/DataStore';

type Reel = typeof initialReels[0];

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function AdminReels() {
  const { reels: reelList, setReels } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reel | null>(null);

  const handleAddNew = () => {
    setEditing({ id: Date.now().toString(), title: '', thumbnail: '', views: 0, likes: 0, duration: '0:00' });
    setShowForm(true);
  };

  const handleEdit = (reel: Reel) => {
    setEditing({ ...reel });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editing) return;
    const exists = reelList.find((r) => r.id === editing.id);
    const newList = exists
      ? reelList.map((r) => (r.id === editing.id ? editing : r))
      : [...reelList, editing];
    setReels(newList);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa video này?')) {
      setReels(reelList.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Video Reels</h2>
          <p className="text-gray-500 text-sm">{reelList.length} video</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line"></i>
          Thêm video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reelList.map((reel) => (
          <div key={reel.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="relative h-40">
              <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
                  <i className="ri-play-fill text-white text-xl ml-0.5"></i>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">{reel.duration}</div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{reel.title}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><i className="ri-eye-line"></i>{formatViews(reel.views)}</span>
                <span className="flex items-center gap-1"><i className="ri-heart-line"></i>{formatViews(reel.likes)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(reel)} className="flex-1 flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-edit-line"></i> Sửa
                </button>
                <button onClick={() => handleDelete(reel.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-delete-bin-line"></i> Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Thêm/Sửa Video</h3>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tiêu đề video</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">URL Thumbnail</label>
                <input type="url" value={editing.thumbnail} onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })} placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Thời lượng</label>
                  <input type="text" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="1:30" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Lượt xem</label>
                  <input type="number" value={editing.views} onChange={(e) => setEditing({ ...editing, views: Number(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl cursor-pointer whitespace-nowrap">Hủy</button>
                <button onClick={handleSave} className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl cursor-pointer whitespace-nowrap">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
