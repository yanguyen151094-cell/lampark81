# The Muse Hotel Hai Phong — Project Plan

## 1. Project Description
**The Muse Hotel Hai Phong** là website giới thiệu và đặt phòng cho chuỗi boutique hotel tại khu đô thị quốc tế Đồi Rồng, Đồ Sơn, Hải Phòng. Gồm 3 cơ sở: The Muse 1, The Muse 2, The Muse 3.

**Target users:** Khách du lịch trong nước và quốc tế tìm kiếm chỗ lưu trú cao cấp tại Hải Phòng.
**Core value:** Trải nghiệm boutique hotel sang trọng, phong cách tối giản hiện đại, thiên nhiên ven biển.

---

## 2. Page Structure
- `/` — Trang Chủ (Hero, giới thiệu, 3 cơ sở, phòng nổi bật, tiện ích, đánh giá, CTA)
- `/properties` — Danh Sách Cơ Sở (3 khách sạn với card + Xem chi tiết)
- `/properties/:id` — Chi Tiết Cơ Sở (gallery, mô tả, loại phòng, bản đồ, đặt phòng)
- `/rooms` — Danh Sách Phòng (tất cả loại phòng + giá)
- `/gallery` — Thư Viện Ảnh
- `/about` — Giới Thiệu Thương Hiệu
- `/contact` — Liên Hệ (bản đồ, form, Zalo, WhatsApp)

---

## 3. Core Features
- [x] Navbar cố định + responsive mobile menu
- [x] Trang chủ đầy đủ sections
- [x] Danh sách 3 cơ sở
- [x] Trang chi tiết cơ sở
- [x] Danh sách phòng với giá
- [x] Thư viện ảnh
- [x] Trang giới thiệu
- [x] Trang liên hệ với form
- [x] Form đặt phòng (Readdy Form)
- [x] Form liên hệ (Readdy Form)
- [ ] Admin panel (Phase 2 — cần Supabase)

---

## 4. Data Model Design
Hiện tại dùng mock data. Khi kết nối Supabase (Phase 2):

### Table: properties
| Field | Type | Description |
|-------|------|-------------|
| id | text | slug (muse-1, muse-2, muse-3) |
| name | text | Tên cơ sở |
| description | text | Mô tả |
| address | text | Địa chỉ |
| images | text[] | Danh sách URL ảnh |

### Table: rooms
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| property_id | text | Cơ sở |
| name | text | Tên phòng |
| price | numeric | Giá/đêm |
| capacity | int | Sức chứa |
| amenities | text[] | Tiện ích |

### Table: bookings
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Tên khách |
| email | text | Email |
| checkin | date | Ngày nhận phòng |
| checkout | date | Ngày trả phòng |
| property_id | text | Cơ sở |
| room_id | uuid | Phòng |

---

## 5. Backend / Third-party Integration Plan
- **Supabase**: Phase 2 — quản lý ảnh, thông tin phòng, đặt phòng
- **Shopify**: Không cần
- **Stripe**: Không cần (thanh toán trực tiếp hoặc qua Zalo/WhatsApp)
- **Readdy Form**: Dùng cho form liên hệ và form đặt phòng

---

## 6. Development Phase Plan

### Phase 1: Frontend UI (Hiện tại)
- Mục tiêu: Xây dựng toàn bộ giao diện với mock data
- Deliverable: 7 trang hoàn chỉnh, responsive, đẹp

### Phase 2: Admin & Data Management (Tiếp theo)
- Mục tiêu: Tích hợp Supabase để quản lý ảnh, phòng, đặt chỗ
- Deliverable: Admin panel, upload ảnh, quản lý phòng

### Phase 3: SEO & Optimization
- Mục tiêu: Tối ưu SEO, tốc độ tải trang
- Deliverable: Meta tags, structured data, performance
