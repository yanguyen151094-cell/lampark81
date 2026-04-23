import { useState, useRef, useEffect } from 'react';

const LOGO_URL = 'https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/5ec72bfd1f8b9242cb55030dbeddfcfa.jpeg';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  'giá': 'Giá phòng tại LamPark81 dao động từ 2.8 triệu đến 6.5 triệu/tháng tùy loại phòng. Bạn muốn xem chi tiết loại phòng nào?',
  'phòng trống': 'Hiện tại chúng tôi có nhiều phòng trống: Studio A1 (3.5tr), 1PN B2 (5tr), Deluxe C3 (4.2tr), Economy D4 (2.8tr). Bạn muốn đặt lịch xem phòng không?',
  'đặt phòng': 'Để đặt phòng, bạn có thể: 1) Gọi hotline 0377 028 202, 2) Chat Zalo cùng số, 3) Điền form đặt phòng trên website. Chúng tôi sẽ liên hệ xác nhận trong 30 phút!',
  'tiện ích': 'LamPark81 có đầy đủ tiện ích: Wifi 100Mbps, Điều hòa, Tủ lạnh, Máy giặt, Bếp từ, Bảo vệ 24/7, Camera an ninh, Thang máy, Bãi xe.',
  'địa chỉ': 'LamPark81 tọa lạc tại 81 Đường LamPark, Phường X, Quận Y, TP.HCM. Gần chợ, trường học và trung tâm thương mại.',
  'giờ': 'LamPark81 mở cửa 24/7! Bảo vệ trực 24/24, bạn có thể vào ra bất kỳ lúc nào.',
  'hợp đồng': 'Hợp đồng thuê tối thiểu 3 tháng. Đặt cọc 1 tháng tiền thuê. Thanh toán hàng tháng. Có thể gia hạn linh hoạt.',
  'wifi': 'Wifi tốc độ cao 100Mbps, miễn phí cho tất cả cư dân. Đường truyền ổn định 24/7.',
  'bãi xe': 'Có bãi xe máy và ô tô. Phí gửi xe máy: 100k/tháng, ô tô: 500k/tháng.',
  'xem phòng': 'Bạn có thể đặt lịch xem phòng bất kỳ lúc nào! Gọi 0377 028 202 hoặc nhắn Zalo để đặt lịch. Chúng tôi sẽ dẫn bạn tham quan trực tiếp.',
};

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'bot',
  text: 'Xin chào! Tôi là trợ lý ảo của LamPark81 🏠 Tôi có thể giúp bạn tìm hiểu về phòng trống, giá cả, tiện ích và đặt lịch xem phòng. Bạn cần hỗ trợ gì?',
  time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
};

const QUICK_QUESTIONS = ['Giá phòng?', 'Phòng trống?', 'Tiện ích?', 'Giờ mở cửa?'];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return 'Cảm ơn bạn đã liên hệ! Để được tư vấn chi tiết hơn, vui lòng gọi hotline 0377 028 202 hoặc chat Zalo cùng số. Chúng tôi hỗ trợ 24/7!';
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: getBotResponse(text),
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{ boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}
      >
        <i className={`text-2xl transition-all ${open ? 'ri-close-line' : 'ri-chat-3-fill'}`}></i>
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
        )}
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 z-50 w-80 md:w-96 bg-white rounded-2xl overflow-hidden flex flex-col"
          style={{ height: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        >
          {/* Header */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
            <img src={LOGO_URL} alt="Bot" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-white font-semibold text-sm">LamPark81 Bot</p>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                Hỗ trợ 24/7
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-gray-400 hover:text-white cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <img src={LOGO_URL} alt="Bot" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0" />
                )}
                <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-400 text-gray-900 rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-gray-400 text-xs mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <img src={LOGO_URL} alt="Bot" className="w-7 h-7 rounded-full object-cover" />
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-sm" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Nhập câu hỏi..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-9 h-9 flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-send-plane-fill text-base"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
