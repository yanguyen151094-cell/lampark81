import { useState, useRef, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  previewHeight?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Ảnh',
  folder = 'uploads',
  previewHeight = 'h-36',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    // Validate file size (50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError(`File quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Tối đa cho phép 50MB.`);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr, data } = await supabase.storage
      .from('hotel-images')
      .upload(fileName, file, { upsert: true, cacheControl: '3600' });
    setUploading(false);
    if (upErr) {
      setError('Upload thất bại: ' + upErr.message);
      return;
    }
    const { data: pub } = supabase.storage.from('hotel-images').getPublicUrl(data.path);
    onChange(pub.publicUrl);
    setUrlInput(pub.publicUrl);
    if (fileRef.current) fileRef.current.value = '';
  };

  const applyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
  };

  return (
    <div>
      <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>

      {/* Tab switcher */}
      <div className="flex mb-3 bg-stone-100 rounded-lg p-1 gap-1">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`flex-1 py-1.5 rounded-md text-xs font-medium transition cursor-pointer whitespace-nowrap ${tab === 'upload' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <i className="ri-upload-cloud-line mr-1"></i> Tải ảnh lên
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex-1 py-1.5 rounded-md text-xs font-medium transition cursor-pointer whitespace-nowrap ${tab === 'url' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <i className="ri-links-line mr-1"></i> Dán link URL
        </button>
      </div>

      {tab === 'upload' ? (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            className="hidden"
            id={`img-upload-${label}`}
          />
          <label
            htmlFor={`img-upload-${label}`}
            className={`flex flex-col items-center justify-center w-full border-2 border-dashed border-stone-200 rounded-lg cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
            style={{ minHeight: '80px' }}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <i className="ri-loader-4-line animate-spin text-2xl text-amber-600"></i>
                <span className="text-xs text-stone-500">Đang tải lên...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <i className="ri-image-add-line text-2xl text-stone-400"></i>
                <span className="text-xs text-stone-500">Nhấp để chọn ảnh (JPG, PNG, WEBP)</span>
                <span className="text-xs text-stone-400">Tối đa 50MB</span>
              </div>
            )}
          </label>
          {error && <p className="text-red-500 text-xs mt-1"><i className="ri-error-warning-line mr-1"></i>{error}</p>}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="px-3 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition cursor-pointer whitespace-nowrap"
          >
            Áp dụng
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className={`mt-2 w-full ${previewHeight} relative rounded-lg overflow-hidden border border-stone-100`}>
          <img src={value} alt="preview" className="w-full h-full object-cover object-top" />
          <button
            type="button"
            onClick={() => { onChange(''); setUrlInput(''); }}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition cursor-pointer"
            title="Xóa ảnh"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>
      )}
    </div>
  );
}
