import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NODE_WIDTH, NODE_HEIGHT } from '../../utils/constants'

function PersonNode({ data }) {
  const { person } = data
  const isMale = person.gender === 'male'
  const genderLabel = isMale ? 'Nam' : 'Nữ'
  const genderIcon = isMale ? '👨' : '👩'
  const headerColor = isMale ? 'bg-sky-600' : 'bg-rose-500'
  const hasBirthDate = Boolean(person.birthDate)
  const hasDeathDate = Boolean(person.deathDate)
  const hasNote = Boolean(person.role)

  return (
    // Chiều cao cố định bằng đúng NODE_HEIGHT dùng trong layoutTree.js: dù
    // ngày sinh/ngày mất/ghi chú có bị ẩn hoàn toàn (xem bên dưới) hay không,
    // tổng chiều cao card không đổi, nếu không khoảng cách dành cho đường nối
    // giữa các đời sẽ bị lệch và bị node đè lên.
    <div
      className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
    >
      <Handle type="target" position={Position.Top} id="top" className="!opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="!opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="!opacity-0" />

      {/* Khối avatar + họ tên */}
      <div className={`flex shrink-0 flex-col items-center rounded-t-xl ${headerColor} px-3 pb-3 pt-3`}>
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow">
          <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
        </div>
        <p
          className="mt-2 w-full truncate text-center text-sm font-bold uppercase tracking-wide text-white"
          title={person.name}
        >
          {person.name}
        </p>
      </div>

      {/* Thông tin cá nhân - mỗi dòng (ngày sinh/ngày mất) chỉ được render khi
          có dữ liệu; thiếu dữ liệu thì bỏ hẳn dòng đó (không chừa khoảng
          trắng). flex-1 + justify-center tự canh giữa phần còn lại. */}
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 text-center">
        <p className="text-xs text-slate-500">
          {genderIcon} {genderLabel}
        </p>
        {hasBirthDate && <p className="text-xs text-slate-500">🎂 {person.birthDate}</p>}
        {hasDeathDate && <p className="text-xs text-slate-500">✝ {person.deathDate}</p>}
      </div>

      {/* Ghi chú/vai trò - chỉ render khi có, không chừa khoảng trắng khi thiếu. */}
      {hasNote && (
        <div className="shrink-0 border-t border-slate-100 bg-amber-50 px-3 py-1.5 text-center text-[11px] italic text-amber-700">
          {person.role}
        </div>
      )}
    </div>
  )
}

export default memo(PersonNode)
