import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'

/**
 * Node vô hình đặt tại điểm giữa của đường nối vợ/chồng (hoặc ngay dưới
 * node đơn thân), dùng làm điểm xuất phát chung cho các đường nối xuống
 * từng con - tạo hiệu ứng nhánh cây gia phả kinh điển.
 */
function JunctionNode() {
  return (
    <div style={{ width: 1, height: 1 }}>
      <Handle type="source" position={Position.Bottom} id="bottom" className="!opacity-0" />
    </div>
  )
}

export default memo(JunctionNode)
