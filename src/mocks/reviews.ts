export const reviews = [
  {
    id: 1,
    name: 'Nguyễn Minh Châu',
    location: 'Hà Nội',
    hotelStayed: 'The Muse 1',
    rating: 5,
    comment: 'Tuyệt vời! Phòng rộng rãi, sạch sẽ và view biển đẹp đến mê hồn. Nhân viên rất nhiệt tình và thân thiện. Chắc chắn sẽ quay lại vào dịp hè tới!',
    date: 'Tháng 12, 2024',
    avatar: 'https://readdy.ai/api/search-image?query=young%20Vietnamese%20woman%20smiling%20portrait%2C%20natural%20lighting%2C%20clean%20background%2C%20friendly%20face%2C%20professional%20headshot&width=100&height=100&seq=av1&orientation=squarish',
  },
  {
    id: 2,
    name: 'Trần Văn Hùng',
    location: 'TP. Hồ Chí Minh',
    hotelStayed: 'The Muse 3',
    rating: 5,
    comment: 'Private Pool Villa là trải nghiệm không thể nào quên. Dịch vụ butler cá nhân chu đáo, bữa sáng ngon tuyệt, khung cảnh biển lúc hoàng hôn thật sự kỳ diệu.',
    date: 'Tháng 11, 2024',
    avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20businessman%20smiling%20portrait%2C%20natural%20lighting%2C%20clean%20background%2C%20professional%20headshot&width=100&height=100&seq=av2&orientation=squarish',
  },
  {
    id: 3,
    name: 'Lê Phương Linh',
    location: 'Đà Nẵng',
    hotelStayed: 'The Muse 2',
    rating: 5,
    comment: 'Không gian rất thơ mộng và yên tĩnh. Vườn thiên nhiên xanh mát, spa tuyệt vời. Đây là nơi hoàn hảo để thoát khỏi nhịp sống bận rộn thành phố.',
    date: 'Tháng 10, 2024',
    avatar: 'https://readdy.ai/api/search-image?query=young%20Vietnamese%20woman%20long%20hair%20smiling%20portrait%2C%20natural%20warm%20lighting%2C%20clean%20background%2C%20beautiful%20face&width=100&height=100&seq=av3&orientation=squarish',
  },
  {
    id: 4,
    name: 'Phạm Quốc Tuấn',
    location: 'Hải Phòng',
    hotelStayed: 'The Muse 1',
    rating: 5,
    comment: 'Là người Hải Phòng nhưng lần đầu ở The Muse Hotel thật sự bị ấn tượng. Không cần đi đâu xa, ngay thành phố mình có khách sạn đẳng cấp thế này!',
    date: 'Tháng 9, 2024',
    avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20man%20middle%20aged%20smiling%20portrait%2C%20natural%20lighting%2C%20clean%20background%2C%20friendly%20professional%20headshot&width=100&height=100&seq=av4&orientation=squarish',
  },
];

export type Review = typeof reviews[0];
