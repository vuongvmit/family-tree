// Kích thước layout dùng chung giữa layout engine và các custom node.
// NODE_HEIGHT phải khớp CHÍNH XÁC với chiều cao cố định mà PersonNode render
// (xem PersonNode.jsx) - nếu lệch nhau, khoảng cách dành cho đường nối giữa
// các đời sẽ bị co lại và bị node đè lên đường nối.
export const NODE_WIDTH = 240
export const NODE_HEIGHT = 210
export const SPOUSE_GAP = 60 // khoảng cách ngang giữa 2 vợ chồng
export const SIBLING_GAP = 70 // khoảng cách ngang giữa các nhánh con
export const LEVEL_HEIGHT = 400 // khoảng cách dọc giữa các đời (đủ chỗ cho đường nối đi vòng + nút +/-)

// Nút +/- được tách thành một node riêng (xem ToggleNode.jsx), luôn hiển thị
// dù đang thu gọn hay mở rộng (khác PersonNode/con - vốn biến mất hoàn toàn
// khi thu gọn nên không thể gắn nút lên đó được). Nút được đặt chồng lên mép
// dưới card của người trực hệ (xem layoutTree.js) để trông "dính" vào node.
export const TOGGLE_SIZE = 28
