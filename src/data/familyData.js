/**
 * Cấu trúc gia phả dễ chỉnh sửa
 * 
 * Để thêm người mới:
 * - Thêm object vào mảng familyStructure
 * - Để người nào là bố/mẹ: thêm id của bố/mẹ vào parentIds
 * - Để liên kết với vợ/chồng: thêm id vợ/chồng vào spouseIds
 * - (Tùy chọn) Để thêm hình ảnh: thêm field img với đường dẫn hình
 * 
 * Ví dụ thêm con mới cho người ID 15 và vợ/chồng ID 16:
 * { id: 99, name: 'Tên Con', gender: 'male', parentIds: [15, 16], img: '/src/assets/hinh.jpg' }
 *
 * Lưu ý hình ảnh:
 * - Mặc định dùng: /src/assets/blank.png
 * - Có thể thay bằng URL bất kỳ hoặc đường dẫn tới file trong src/assets
 *
 * Các field tùy chọn khác (bỏ trống/không khai báo thì ô đó tự ẩn trên card,
 * không chừa khoảng trắng):
 * - birthDate: 'DD/MM/YYYY'  (ngày sinh)
 * - deathDate: 'DD/MM/YYYY'  (ngày mất - có nghĩa là đã mất)
 * - role: 'Trưởng họ đời 5'  (ghi chú/vai trò)
 *
 * Ví dụ: { id: 99, name: 'Tên Con', gender: 'male', parentIds: [15, 16],
 *          birthDate: '20/05/1990', deathDate: null, role: 'Trưởng họ đời 6' }
 */

export const familyStructure = [
  // Tầng 1: Ông cố và Bà cô
  { id: 1, name: 'Ông Cố', gender: 'male', img: '/src/assets/blank.png', spouseIds: [2] },
  { id: 2, name: 'Bà Cô', gender: 'female', img: '/src/assets/blank.png', spouseIds: [1] },

  // Tầng 2: 8 người con của cặp C1
  { id: 3, name: 'Võ Thị Liên', gender: 'female', img: 'src/assets/VTL-.png', collapsed: true, parentIds: [1, 2], spouseIds: [11] },
  { id: 4, name: 'Võ Thị Lý', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [1, 2], spouseIds: [12] },
  { id: 5, name: 'Con Long 2', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [1, 2], spouseIds: [13] },
  { id: 6, name: 'Con Gái 2', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [1, 2], spouseIds: [14] },
//  { id: 7, name: 'Con Long 3', gender: 'male', parentIds: [1, 2], spouseIds: [15] },
//  { id: 8, name: 'Con Gái 3', gender: 'female', parentIds: [1, 2], spouseIds: [16] },
//  { id: 9, name: 'Con Long 4', gender: 'male', parentIds: [1, 2], spouseIds: [17] },
//  { id: 10, name: 'Con Gái 4', gender: 'female', parentIds: [1, 2], spouseIds: [18] },

  // Tầng 2: Vợ/chồng của 8 người con (C2)
  { id: 11, name: 'Chồng Võ Thị Liên', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [3] },
  { id: 12, name: 'Trần Quan Sự', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [4] },
  { id: 13, name: 'Vợ/Chồng 3', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [5] },
  { id: 14, name: 'Vợ/Chồng 4', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [6] },
//  { id: 15, name: 'Vợ/Chồng 5', gender: 'female', spouseIds: [7] },
//  { id: 16, name: 'Vợ/Chồng 6', gender: 'male', spouseIds: [8] },
//  { id: 17, name: 'Vợ/Chồng 7', gender: 'female', spouseIds: [9] },
//  { id: 18, name: 'Vợ/Chồng 8', gender: 'male', spouseIds: [10] },

  // Tầng 3: 2 con từ mỗi cặp C2
  // Từ cặp 3-11
  { id: 19, name: 'Vũ Minh Hùng', gender: 'male', img: 'src/assets/VMH-08031973.png', collapsed: true, parentIds: [3, 11], spouseIds: [27] },
  { id: 20, name: 'Vũ Minh Tuấn', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [3, 11], spouseIds: [28] },
  // Từ cặp 4-12
  { id: 21, name: 'Cháu 2.1', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [4, 12], spouseIds: [29] },
  { id: 22, name: 'Cháu 2.2', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [4, 12], spouseIds: [30] },
  // Từ cặp 5-13
  { id: 23, name: 'Cháu 3.1', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [5, 13], spouseIds: [31] },
  { id: 24, name: 'Cháu 3.2', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [5, 13], spouseIds: [32] },
  // Từ cặp 6-14
  { id: 25, name: 'Cháu 4.1', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [6, 14], spouseIds: [33] },
  { id: 26, name: 'Cháu 4.2', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [6, 14], spouseIds: [34] },
  // Từ cặp 7-15
//  { id: 35, name: 'Cháu 5.1', gender: 'male', parentIds: [7, 15], spouseIds: [43] },
//  { id: 36, name: 'Cháu 5.2', gender: 'female', parentIds: [7, 15], spouseIds: [44] },
//  // Từ cặp 8-16
//  { id: 37, name: 'Cháu 6.1', gender: 'male', parentIds: [8, 16], spouseIds: [45] },
//  { id: 38, name: 'Cháu 6.2', gender: 'female', parentIds: [8, 16], spouseIds: [46] },
//  // Từ cặp 9-17
//  { id: 39, name: 'Cháu 7.1', gender: 'male', parentIds: [9, 17], spouseIds: [47] },
//  { id: 40, name: 'Cháu 7.2', gender: 'female', parentIds: [9, 17], spouseIds: [48] },
//  // Từ cặp 10-18
//  { id: 41, name: 'Cháu 8.1', gender: 'male', parentIds: [10, 18], spouseIds: [49] },
//  { id: 42, name: 'Cháu 8.2', gender: 'female', parentIds: [10, 18], spouseIds: [50] },

  // Tầng 3: Vợ/chồng của 16 người cháu (C3)
  { id: 27, name: 'Võ Thị Đông', gender: 'female', img: 'src/assets/VTD-20101975.png', collapsed: true, spouseIds: [19] },
  { id: 28, name: 'Tôn Nữ Vân Dung', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [20] },
  { id: 29, name: 'Vợ/Chồng Cháu 2.1', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [21] },
  { id: 30, name: 'Vợ/Chồng Cháu 2.2', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [22] },
  { id: 31, name: 'Vợ/Chồng Cháu 3.1', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [23] },
  { id: 32, name: 'Vợ/Chồng Cháu 3.2', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [24] },
  { id: 33, name: 'Vợ/Chồng Cháu 4.1', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [25] },
  { id: 34, name: 'Vợ/Chồng Cháu 4.2', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [26] },
//  { id: 43, name: 'Vợ/Chồng Cháu 5.1', gender: 'female', spouseIds: [35] },
//  { id: 44, name: 'Vợ/Chồng Cháu 5.2', gender: 'male', spouseIds: [36] },
//  { id: 45, name: 'Vợ/Chồng Cháu 6.1', gender: 'female', spouseIds: [37] },
//  { id: 46, name: 'Vợ/Chồng Cháu 6.2', gender: 'male', spouseIds: [38] },
//  { id: 47, name: 'Vợ/Chồng Cháu 7.1', gender: 'female', spouseIds: [39] },
//  { id: 48, name: 'Vợ/Chồng Cháu 7.2', gender: 'male', spouseIds: [40] },
//  { id: 49, name: 'Vợ/Chồng Cháu 8.1', gender: 'female', spouseIds: [41] },
//  { id: 50, name: 'Vợ/Chồng Cháu 8.2', gender: 'male', spouseIds: [42] },

  // Tầng 4: 2 con từ mỗi cặp C3
  // Từ cặp 19-27
  { id: 51, name: 'Vũ Minh Vương', gender: 'male', img: 'src/assets/VMV-05021993.png', collapsed: true, parentIds: [19, 27], spouseIds: [56] },
  { id: 52, name: 'Vũ Minh Cảnh', gender: 'male', img: 'src/assets/VMC-06091995.png', collapsed: true, parentIds: [19, 27], spouseIds: [57] },
  // Từ cặp 20-28
  { id: 53, name: 'Vũ Vân Anh', gender: 'male', img: '/src/assets/blank.png', collapsed: true, parentIds: [20, 28], spouseIds: [58] },
  { id: 54, name: 'Vũ Thành Tú', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [20, 28], spouseIds: [59] },
  { id: 55, name: 'Vũ Thành Trung', gender: 'female', img: '/src/assets/blank.png', collapsed: true, parentIds: [20, 28], spouseIds: [60] },
  // ... Có thể thêm các thế hệ sau tương tự

// Tầng 4: Vợ/chồng (C4)
  { id: 56, name: 'Lê Thị Lợi', gender: 'female', img: 'src/assets/LTL-22021993.png', collapsed: true, spouseIds: [51] },
  { id: 57, name: 'Chưa có vợ', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [52] },
  { id: 58, name: 'Đỗ Hữu Tuấn', gender: 'male', img: '/src/assets/blank.png', collapsed: true, spouseIds: [53] },
  { id: 59, name: 'Trần Sương', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [54] },
  { id: 60, name: 'Chị Hằng(đã mất)', gender: 'female', img: '/src/assets/blank.png', collapsed: true, spouseIds: [55] },

  // Tầng 5: 2 con từ mỗi cặp C4
  { id: 61, name: 'Vũ Minh Khôi', gender: 'male', img: 'src/assets/VMK-29102023.png', parentIds: [51, 56] },
];
