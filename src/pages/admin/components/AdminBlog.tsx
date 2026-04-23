import { useState } from 'react';
import { blogs as initialBlogs } from '@/mocks/blogs';
import type { BlogPost } from '@/mocks/blogs';
import { useDataStore } from '@/context/DataStore';

const EMPTY_POST: BlogPost = {
  id: '',
  slug: '',
  category: 'Du lịch',
  titleVi: '',
  titleEn: '',
  excerptVi: '',
  excerptEn: '',
  contentVi: '',
  contentEn: '',
  image: '',
  date: new Date().toISOString().split('T')[0],
  author: 'LamPark81 Team',
  readTime: 5,
  tags: [],
  metaTitleVi: '',
  metaTitleEn: '',
  metaDescriptionVi: '',
  metaDescriptionEn: '',
  published: true,
};

const CATEGORIES = ['Du lịch', 'Địa điểm', 'Lịch sử', 'Ẩm thực & Giải trí', 'Kiến trúc', 'Trải nghiệm', 'Văn hóa', 'Giải trí', 'Hướng dẫn', 'LamPark81'];

export default function AdminBlog() {
  const { blogs: blogList, setBlogs } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'vi' | 'en'>('vi');
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setImagePreview(post.image);
    setShowForm(true);
    setActiveTab('vi');
  };

  const handleAddNew = () => {
    setEditing({ ...EMPTY_POST, id: Date.now().toString() });
    setImagePreview('');
    setShowForm(true);
    setActiveTab('vi');
  };

  const handleSave = () => {
    if (!editing) return;
    const slug = editing.slug || editing.titleVi.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    const updated = { ...editing, slug, image: imagePreview || editing.image };
    const exists = blogList.find((b) => b.id === updated.id);
    const newList = exists
      ? blogList.map((b) => (b.id === updated.id ? updated : b))
      : [updated, ...blogList];
    setBlogs(newList);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa bài viết này?')) {
      setBlogs(blogList.filter((b) => b.id !== id));
    }
  };

  const handleTogglePublish = (id: string) => {
    setBlogs(blogList.map((b) => b.id === id ? { ...b, published: !b.published } : b));
  };

  const handleAddTag = () => {
    if (!editing || !tagInput.trim()) return;
    setEditing({ ...editing, tags: [...editing.tags, tagInput.trim()] });
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Quản lý Blog</h2>
          <p className="text-gray-500 text-sm">{blogList.length} bài viết · {blogList.filter((b) => b.published).length} đã đăng</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
        >
          <i className="ri-add-line"></i>
          <span className="hidden sm:inline">Thêm bài viết</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-3">
        {blogList.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 h-20 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-xl">
                <img src={post.image} alt={post.titleVi} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Đã đăng' : 'Ẩn'}
                  </span>
                </div>
                <p className="font-bold text-gray-900 text-sm truncate">{post.titleVi}</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate hidden md:block">{post.titleEn}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{post.date}</span>
                  <span className="flex items-center gap-1"><i className="ri-time-line"></i>{post.readTime} phút</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-end justify-center flex-shrink-0">
                <button
                  onClick={() => handleEdit(post)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-edit-line text-sm"></i>
                </button>
                <button
                  onClick={() => handleTogglePublish(post.id)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    post.published ? 'bg-green-50 hover:bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                  }`}
                >
                  <i className={`text-sm ${post.published ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <h3 className="font-bold text-gray-900 text-base">
                {editing.id && initialBlogs.find((b) => b.id === editing.id) ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h3>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Image */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Ảnh bìa bài viết</label>
                <div className="flex flex-col gap-3">
                  {imagePreview && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setImagePreview('')}
                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full text-xs cursor-pointer"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-xl py-3 text-sm text-gray-500 hover:text-amber-600 cursor-pointer transition-colors">
                      <i className="ri-upload-cloud-line text-lg"></i>
                      <span>Tải ảnh từ máy</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Hoặc dán URL ảnh..."
                        value={imagePreview.startsWith('data:') ? '' : imagePreview}
                        onChange={(e) => setImagePreview(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Tabs */}
              <div className="bg-gray-50 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setActiveTab('vi')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === 'vi' ? 'bg-white text-gray-900' : 'text-gray-500'}`}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => setActiveTab('en')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === 'en' ? 'bg-white text-gray-900' : 'text-gray-500'}`}
                >
                  English
                </button>
              </div>

              {activeTab === 'vi' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tiêu đề (Tiếng Việt)</label>
                    <input
                      type="text"
                      value={editing.titleVi}
                      onChange={(e) => setEditing({ ...editing, titleVi: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mô tả ngắn (VI)</label>
                    <textarea
                      value={editing.excerptVi}
                      onChange={(e) => setEditing({ ...editing, excerptVi: e.target.value })}
                      rows={2}
                      maxLength={500}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Nội dung (VI)</label>
                    <textarea
                      value={editing.contentVi}
                      onChange={(e) => setEditing({ ...editing, contentVi: e.target.value })}
                      rows={10}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none font-mono"
                    />
                    <p className="text-xs text-gray-400 mt-1">Dùng ## cho tiêu đề H2, ### cho H3, ** ** cho in đậm, - cho danh sách</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Meta Title (VI)</label>
                    <input
                      type="text"
                      value={editing.metaTitleVi}
                      onChange={(e) => setEditing({ ...editing, metaTitleVi: e.target.value })}
                      maxLength={60}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Meta Description (VI)</label>
                    <textarea
                      value={editing.metaDescriptionVi}
                      onChange={(e) => setEditing({ ...editing, metaDescriptionVi: e.target.value })}
                      rows={2}
                      maxLength={160}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Title (English)</label>
                    <input
                      type="text"
                      value={editing.titleEn}
                      onChange={(e) => setEditing({ ...editing, titleEn: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Excerpt (EN)</label>
                    <textarea
                      value={editing.excerptEn}
                      onChange={(e) => setEditing({ ...editing, excerptEn: e.target.value })}
                      rows={2}
                      maxLength={500}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Content (EN)</label>
                    <textarea
                      value={editing.contentEn}
                      onChange={(e) => setEditing({ ...editing, contentEn: e.target.value })}
                      rows={10}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Meta Title (EN)</label>
                    <input
                      type="text"
                      value={editing.metaTitleEn}
                      onChange={(e) => setEditing({ ...editing, metaTitleEn: e.target.value })}
                      maxLength={60}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Meta Description (EN)</label>
                    <textarea
                      value={editing.metaDescriptionEn}
                      onChange={(e) => setEditing({ ...editing, metaDescriptionEn: e.target.value })}
                      rows={2}
                      maxLength={160}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Common fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Danh mục</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ngày đăng</label>
                  <input
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Thời gian đọc (phút)</label>
                  <input
                    type="number"
                    value={editing.readTime}
                    onChange={(e) => setEditing({ ...editing, readTime: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editing.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="cursor-pointer text-gray-400 hover:text-red-500">
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Thêm tag..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  />
                  <button onClick={handleAddTag} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm cursor-pointer">
                    Thêm
                  </button>
                </div>
              </div>

              {/* Published */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="w-4 h-4 accent-amber-400 cursor-pointer"
                />
                <label htmlFor="published" className="text-sm text-gray-700 cursor-pointer">Đăng bài ngay</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm">
                  Hủy
                </button>
                <button onClick={handleSave} className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm">
                  Lưu bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
