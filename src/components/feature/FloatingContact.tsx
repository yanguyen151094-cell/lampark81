import { useState } from 'react';

const PHONE = '0888808818';
const PHONE_DISPLAY = '088.880.8818';
const ZALO_URL = `https://zalo.me/${PHONE}`;
const FB_URL = 'https://www.facebook.com/themusehotelhaiphong';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-3"
      style={{ bottom: '90px', right: '20px' }}
    >
      {/* Contact items */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        {/* Phone */}
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-4 py-2 hover:bg-stone-50 transition cursor-pointer no-underline shadow-md"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        >
          <span className="text-sm font-medium text-stone-700 whitespace-nowrap">{PHONE_DISPLAY}</span>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
            <i className="ri-phone-line text-base"></i>
          </div>
        </a>

        {/* Zalo */}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="nofollow noreferrer"
          className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-4 py-2 hover:bg-stone-50 transition cursor-pointer no-underline shadow-md"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        >
          <span className="text-sm font-medium text-stone-700 whitespace-nowrap">Zalo</span>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full text-white flex-shrink-0 text-xs font-extrabold tracking-tight"
            style={{ background: '#0068FF' }}
          >
            Zalo
          </div>
        </a>

        {/* Facebook */}
        <a
          href={FB_URL}
          target="_blank"
          rel="nofollow noreferrer"
          className="flex items-center gap-2 bg-white border border-stone-100 rounded-full px-4 py-2 hover:bg-stone-50 transition cursor-pointer no-underline shadow-md"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        >
          <span className="text-sm font-medium text-stone-700 whitespace-nowrap">Facebook</span>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full text-white flex-shrink-0"
            style={{ background: '#1877F2' }}
          >
            <i className="ri-facebook-fill text-base"></i>
          </div>
        </a>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-12 h-12 flex items-center justify-center rounded-full text-white transition cursor-pointer whitespace-nowrap shadow-lg hover:scale-105 active:scale-95"
        style={{ background: open ? '#64748b' : '#C9A26D' }}
        title={open ? 'Đóng' : 'Liên hệ'}
      >
        <i className={`text-xl transition-transform duration-300 ${open ? 'ri-close-line rotate-90' : 'ri-customer-service-2-line'}`}></i>
      </button>
    </div>
  );
}
