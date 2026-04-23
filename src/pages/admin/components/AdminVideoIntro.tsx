import { useState } from 'react';

interface VideoIntro {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  isActive: boolean;
}

const initialVideos: VideoIntro[] = [
  {
    id: '1',
    title: 'Giới thiệu LamPark81 - Không gian sống lý tưởng',
    description: 'Khám phá không gian sống hiện đại, tiện nghi tại LamPark81. Nơi hội tụ đầy đủ tiện ích, an ninh 24/7 và dịch vụ chuyên nghiệp.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://readdy.ai/api/search-image?query=modern%20apartment%20building%20exterior%2C%20beautiful%20architecture%2C%20green%20surroundings%2C%20Vietnam%20residential%20complex%2C%20professional%20photography&width=800&height=450&seq=vi1&orientation=landscape',
    isActive: true,
  },
  {
    id: '2',
    title: 'Tour tham quan các phòng cao cấp',
    description: 'Xem trực tiếp các phòng Studio, Deluxe và Premium với nội thất cao cấp, view đẹp và đầy đủ tiện nghi.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://readdy.ai/api/search-image?query=luxury%20apartment%20interior%20tour%2C%20premium%20furniture%2C%20modern%20design%2C%20bright%20lighting%2C%20Vietnam%20apartment%20showcase&width=800&height=450&seq=vi2&orientation=landscape',
    isActive: false,
  },
];

export default function AdminVideoIntro() {
  const [videos, setVideos] = useState<VideoIntro[]>(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<VideoIntro | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoIntro | null>(null);

  const handleAddNew = () => {
    setEditing({
      id: Date.now().toString(),
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      isActive: false,
    });
    setShowForm(true);
  };

  const handleEdit = (v: VideoIntro) => {
    setEditing({ ...v });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editing) return;
    setVideos((prev) => {
      const exists = prev.find((v) => v.id === editing.id);
      if (exists) return prev.map((v) => (v.id === editing.id ? editing : v));
      return [...prev, editing];
    });
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa video này?')) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setVideos((prev) => prev.map((v) => ({ ...v, isActive: v.id === id ? !v.isActive : v.isActive })));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Video Giới Thiệu</h2>
          <p className="text-gray-500 text-sm">{videos.length} video · {videos.filter(v => v.isActive).length} đang hiển thị</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
        >
          <i className="ri-add-line"></i>
          Thêm video
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <i className="ri-information-line text-amber-500 text-lg flex-shrink-0 mt-0.5"></i>
        <div>
          <p className="text-amber-800 text-sm font-semibold">Hướng dẫn thêm video</p>
          <p className="text-amber-700 text-xs mt-1">Dán link YouTube hoặc link video trực tiếp. Với YouTube, dùng định dạng: <code className="bg-amber-100 px-1 rounded">https://www.youtube.com/embed/VIDEO_ID</code></p>
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              <div className="relative w-full md:w-64 h-40 md:h-auto flex-shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPreviewVideo(video)}
                    className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors cursor-pointer"
                  >
                    <i className="ri-play-fill text-white text-2xl ml-1"></i>
                  </button>
                </div>
                <div className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${video.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                  {video.isActive ? 'Đang hiển thị' : 'Ẩn'}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-4 md:p-5">
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2">{video.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <i className="ri-link-m"></i>
                  <span className="truncate max-w-xs">{video.videoUrl || 'Chưa có URL'}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleToggleActive(video.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      video.isActive
                        ? 'bg-green-50 hover:bg-green-100 text-green-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <i className={video.isActive ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                    {video.isActive ? 'Đang hiển thị' : 'Đang ẩn'}
                  </button>
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line"></i> Chỉnh sửa
                  </button>
                  <button
                    onClick={() => setPreviewVideo(video)}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-play-circle-line"></i> Xem trước
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i> Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <i className="ri-film-line text-5xl text-gray-300 mb-4 block"></i>
            <p className="text-gray-500">Chưa có video giới thiệu nào</p>
            <button onClick={handleAddNew} className="mt-4 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm cursor-pointer whitespace-nowrap">
              Thêm video đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="font-bold text-gray-900">Thêm / Sửa Video Giới Thiệu</h3>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tiêu đề video</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="VD: Giới thiệu LamPark81..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mô tả</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  maxLength={500}
                  placeholder="Mô tả ngắn về video..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">URL Video (YouTube Embed hoặc link trực tiếp)</label>
                <input
                  type="url"
                  value={editing.videoUrl}
                  onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
                <p className="text-xs text-gray-400 mt-1">YouTube: Vào video → Chia sẻ → Nhúng → Lấy link embed</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">URL Ảnh thumbnail</label>
                <input
                  type="url"
                  value={editing.thumbnail}
                  onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
                {editing.thumbnail && (
                  <img src={editing.thumbnail} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.isActive}
                    onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
                    className="w-4 h-4 accent-amber-400"
                  />
                  <span className="text-sm text-gray-700">Hiển thị trên website</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl cursor-pointer whitespace-nowrap text-sm">
                  Hủy
                </button>
                <button onClick={handleSave} className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl cursor-pointer whitespace-nowrap text-sm">
                  Lưu video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPreviewVideo(null)}>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">{previewVideo.title}</h3>
              <button onClick={() => setPreviewVideo(null)} className="text-white text-2xl cursor-pointer w-9 h-9 flex items-center justify-center">
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={previewVideo.videoUrl}
                title={previewVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
