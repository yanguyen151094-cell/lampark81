# LamPark81 - Website Cho Thuê Phòng

## 1. Mô Tả Dự Án
Website cho thuê phòng tại LamPark81 - giao diện hiện đại, đầy đủ chức năng tìm kiếm, đặt phòng, gallery ảnh, đánh giá, bản đồ, admin dashboard, chatbot, video reels và kênh liên hệ đa nền tảng (Zalo, SĐT, Facebook).

**Đối tượng**: Người tìm phòng trọ/căn hộ tại khu vực LamPark81  
**Giá trị cốt lõi**: Trải nghiệm đặt phòng trực tuyến nhanh chóng, minh bạch, tiện lợi

## 2. Cấu Trúc Trang
- `/` - Trang chủ (Home)
- `/search` - Tìm kiếm & Đặt phòng
- `/gallery` - Thư viện ảnh phòng
- `/reviews` - Đánh giá & Bản đồ
- `/admin` - Admin Dashboard (quản lý nội dung)
- `/chat` - Chat & Video Reels

## 3. Tính Năng Cốt Lõi
- [x] Trang chủ đầy đủ: Hero, tìm kiếm nhanh, gallery, tiện ích, đánh giá, bản đồ, CTA, footer
- [ ] Tìm kiếm & lọc phòng theo giá, loại, ngày
- [ ] Đặt phòng online với form booking
- [ ] Gallery ảnh masonry + lightbox
- [ ] Hệ thống đánh giá (rating + review)
- [ ] Tích hợp Google Maps
- [ ] Admin Dashboard: quản lý phòng, ảnh, đánh giá, booking
- [ ] Chatbot thông minh 24/7
- [ ] Video Reels (dạng TikTok/Instagram)
- [ ] Floating contact bar: Zalo, SĐT, Facebook
- [ ] Live chat widget
- [ ] Tối ưu mobile & desktop
- [ ] Tối ưu cho Vercel deployment

## 4. Mô Hình Dữ Liệu (Mock Data)
### Phòng (rooms)
- id, name, type, price, area, floor, status, images[], amenities[], description

### Đánh giá (reviews)
- id, roomId, author, avatar, rating, content, date, images[]

### Booking
- id, roomId, guestName, phone, email, checkIn, checkOut, status, note

### Video Reels
- id, title, thumbnail, videoUrl, views, likes

## 5. Tích Hợp Bên Thứ Ba
- Supabase: Chưa kết nối - dùng mock data trước
- Google Maps: Embed iframe
- Zalo/Facebook: Link liên hệ trực tiếp
- Vercel: Tối ưu build & deploy

## 6. Kế Hoạch Phát Triển

### Phase 1: Trang Chủ (Home) ✅
- Mục tiêu: Xây dựng trang chủ đầy đủ, đẹp, ấn tượng
- Deliverable: Hero, Search bar, Features, Gallery preview, Reels preview, Reviews, Map, CTA, Footer, Floating contacts

### Phase 2: Tìm Kiếm & Đặt Phòng
- Mục tiêu: Trang tìm kiếm với filter và form đặt phòng
- Deliverable: Search filters, Room list, Room detail, Booking form

### Phase 3: Gallery Phòng
- Mục tiêu: Thư viện ảnh đầy đủ với lightbox
- Deliverable: Masonry gallery, Lightbox, Category filter

### Phase 4: Đánh Giá & Bản Đồ
- Mục tiêu: Hệ thống review và bản đồ vị trí
- Deliverable: Review list, Rating system, Google Maps embed

### Phase 5: Admin Dashboard
- Mục tiêu: Quản lý toàn bộ nội dung website
- Deliverable: Quản lý phòng, ảnh, booking, review

### Phase 6: Chat & Reels
- Mục tiêu: Chat widget và video reels
- Deliverable: Chatbot, Live chat, Video reels section
