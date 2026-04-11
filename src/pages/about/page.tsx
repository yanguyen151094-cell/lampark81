import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const milestones = [
  { year: '2019', title: 'The Muse 1 Khai Trương', desc: 'Cơ sở đầu tiên mở cửa tại khu đô thị Đồi Rồng, Đồ Sơn.' },
  { year: '2021', title: 'The Muse 2 Ra Đời', desc: 'Mở rộng với cơ sở thứ hai, tập trung vào không gian thiên nhiên và wellness.' },
  { year: '2023', title: 'The Muse 3 - Đỉnh Cao Mới', desc: 'Cơ sở cao cấp nhất với Private Pool Villa và dịch vụ butler 5 sao.' },
  { year: '2024', title: 'Giải Thưởng Boutique Hotel', desc: 'Được công nhận là Boutique Hotel xuất sắc nhất Hải Phòng.' },
];

const values = [
  { icon: 'ri-heart-line', title: 'Tận Tâm', desc: 'Mỗi nhân viên đều coi khách như người thân, phục vụ bằng cả trái tim.' },
  { icon: 'ri-star-line', title: 'Chất Lượng', desc: 'Tiêu chuẩn dịch vụ quốc tế trong từng chi tiết nhỏ nhất.' },
  { icon: 'ri-leaf-line', title: 'Bền Vững', desc: 'Hoạt động theo hướng thân thiện môi trường, bảo tồn vẻ đẹp thiên nhiên.' },
  { icon: 'ri-emotion-happy-line', title: 'Trải Nghiệm', desc: 'Tạo ra những kỷ niệm đẹp và cảm xúc khó phai trong lòng khách hàng.' },
];

const team = [
  {
    name: 'Nguyễn Phước Long',
    role: 'Nhà Sáng Lập & CEO',
    image: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20hotel%20executive%20portrait%2C%20business%20suit%2C%20warm%20natural%20light%2C%20confident%20friendly%20expression%2C%20clean%20background%2C%20headshot%20professional&width=300&height=400&seq=team1&orientation=portrait',
  },
  {
    name: 'Trần Minh Hương',
    role: 'Giám Đốc Vận Hành',
    image: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20hotel%20manager%20woman%20portrait%2C%20elegant%20attire%2C%20warm%20light%2C%20friendly%20smile%2C%20clean%20background%2C%20professional%20headshot&width=300&height=400&seq=team2&orientation=portrait',
  },
  {
    name: 'Lê Văn Đức',
    role: 'Bếp Trưởng',
    image: 'https://readdy.ai/api/search-image?query=professional%20Vietnamese%20chef%20portrait%2C%20chef%20uniform%2C%20warm%20kitchen%20background%2C%20confident%20smile%2C%20professional%20headshot%2C%20culinary%20expert&width=300&height=400&seq=team3&orientation=portrait',
  },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-96 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=boutique%20hotel%20team%20meeting%20hotel%20lobby%2C%20warm%20ambiance%2C%20elegant%20interior%2C%20professional%20hotel%20staff%2C%20Vietnamese%20coastal%20hotel%2C%20warm%20light%2C%20wide%20angle&width=1920&height=600&seq=about-hero&orientation=landscape"
          alt="About"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Giới Thiệu</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Về The Muse Hotel</h1>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">
                Câu Chuyện Thương Hiệu
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brown font-bold mb-6">
                Hơn 5 Năm Chắp Cánh<br />
                <span className="italic font-normal">Cho Giấc Mơ Nghỉ Dưỡng</span>
              </h2>
              <p className="text-brown/60 text-base leading-relaxed mb-4">
                The Muse Hotel được thành lập năm 2019 với sứ mệnh mang đến không gian nghỉ dưỡng boutique đẳng cấp tại Hải Phòng — thành phố cảng năng động và đầy tiềm năng du lịch của Việt Nam.
              </p>
              <p className="text-brown/60 text-base leading-relaxed mb-4">
                Tọa lạc tại khu đô thị quốc tế Đồi Rồng, Đồ Sơn, chúng tôi có vị trí chiến lược với tầm nhìn ra biển và gần các điểm du lịch nổi tiếng. Mỗi cơ sở được thiết kế tỉ mỉ để kể một câu chuyện riêng, mang đến cảm xúc độc đáo cho từng vị khách.
              </p>
              <p className="text-brown/60 text-base leading-relaxed">
                Với đội ngũ hơn 50 nhân viên tận tâm và trên 1000 khách hàng hài lòng, The Muse Hotel tự hào là điểm đến boutique hàng đầu tại Hải Phòng.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-80">
                <img
                  src="https://readdy.ai/api/search-image?query=boutique%20hotel%20exterior%20lush%20garden%20entrance%2C%20elegant%20architecture%2C%20tropical%20landscaping%2C%20warm%20morning%20light%2C%20Vietnamese%20coastal%20setting%2C%20welcoming%20atmosphere%2C%20professional%20photography&width=600&height=500&seq=about1&orientation=portrait"
                  alt="The Muse Hotel Story"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold rounded-2xl p-5 w-40">
                <div className="font-serif text-3xl font-bold text-white">5+</div>
                <div className="text-white/80 text-xs">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream-dark px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">Giá Trị Cốt Lõi</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brown font-bold">Những Gì Chúng Tôi Tin</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div
                key={val.title}
                className={`bg-cream rounded-xl p-6 text-center transition-all duration-700 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-xl mx-auto mb-4">
                  <i className={`${val.icon} text-gold text-xl`}></i>
                </div>
                <h3 className="font-serif text-lg font-bold text-brown mb-2">{val.title}</h3>
                <p className="text-brown/50 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">Hành Trình</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brown font-bold">Mốc Phát Triển</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2"></div>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-6 md:gap-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-10 md:pl-0`}>
                    <div className="bg-white rounded-xl p-5 inline-block text-left max-w-sm">
                      <span className="text-gold font-bold text-sm">{m.year}</span>
                      <h4 className="font-serif text-base font-bold text-brown mt-1 mb-1">{m.title}</h4>
                      <p className="text-brown/60 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-5"></div>
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-cream-dark px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">Đội Ngũ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brown font-bold">Những Người Tạo Nên The Muse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`bg-cream rounded-2xl overflow-hidden text-center transition-all duration-700 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="h-56 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-brown mb-1">{member.name}</h3>
                  <p className="text-gold text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brown font-bold mb-4">
            Sẵn Sàng Khám Phá<br />
            <span className="italic text-gold font-normal">The Muse Hotel?</span>
          </h2>
          <p className="text-brown/60 mb-8">Đặt phòng ngay hôm nay và trải nghiệm sự khác biệt.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rooms" className="bg-gold hover:bg-gold-dark text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors whitespace-nowrap cursor-pointer">
              Đặt Phòng Ngay
            </Link>
            <Link to="/contact" className="border border-gold text-gold hover:bg-gold hover:text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors whitespace-nowrap cursor-pointer">
              Liên Hệ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
