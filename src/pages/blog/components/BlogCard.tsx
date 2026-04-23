import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import type { BlogPost } from '@/mocks/blogs';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { lang } = useLang();
  const title = lang === 'en' ? post.titleEn : post.titleVi;
  const excerpt = lang === 'en' ? post.excerptEn : post.excerptVi;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
      style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}
    >
      <div className="w-full h-52 overflow-hidden relative">
        <img
          src={post.image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'vi-VN', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-time-line"></i>
            {post.readTime} {lang === 'en' ? 'min read' : 'phút đọc'}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="mt-4 flex items-center gap-1 text-amber-500 text-sm font-semibold">
          <span>{lang === 'en' ? 'Read more' : 'Đọc thêm'}</span>
          <i className="ri-arrow-right-line"></i>
        </div>
      </div>
    </Link>
  );
}
