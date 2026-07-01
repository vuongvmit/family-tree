import { memo } from 'react'
import { TOGGLE_SIZE } from '../../utils/constants'

/**
 * Nút +/- mở rộng/thu gọn nhánh con, tách riêng khỏi PersonNode.
 *
 * Lý do phải là một node độc lập (không gắn vào node cha hay node con):
 * khi một nhánh bị thu gọn, các node con biến mất hoàn toàn khỏi cây (xem
 * layoutTree.js), nên nút bấm không thể "sống" trên node con - sẽ không còn
 * gì để bấm mở lại. Node cha thì luôn hiển thị nhưng gắn nút lên đó khiến nút
 * nằm sát đường nối vợ/chồng, dễ gây cảm giác nút "dính" vào đường nối thay
 * vì thuộc về nhánh con. Do đó ToggleNode được đặt tại vị trí neo cố định
 * ngay phía trên hàng con (gần điểm vào của node con), độc lập với cả node
 * cha lẫn node con, và luôn tồn tại bất kể trạng thái thu gọn.
 */
function ToggleNode({ data }) {
  const { isCollapsed, onToggle } = data

  return (
    <button
      type="button"
      onClick={onToggle}
      className="nodrag nopan pointer-events-auto flex items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-bold leading-none text-slate-600 shadow hover:bg-slate-50"
      style={{ width: TOGGLE_SIZE, height: TOGGLE_SIZE }}
      title={isCollapsed ? 'Mở rộng nhánh' : 'Thu gọn nhánh'}
    >
      {isCollapsed ? '+' : '−'}
    </button>
  )
}

export default memo(ToggleNode)
