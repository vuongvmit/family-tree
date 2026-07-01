import { familyStructure } from '../../../data/familyData'

// Nạp trước tất cả ảnh trong src/assets để Vite băm/đóng gói đúng đường dẫn
// khi build production (đường dẫn dạng chuỗi thô như '/src/assets/x.png'
// chỉ chạy được lúc dev, sẽ vỡ ảnh khi build nếu không import qua glob).
const assetModules = import.meta.glob('/src/assets/*', { eager: true, import: 'default' })
const FALLBACK_AVATAR = assetModules['/src/assets/blank.png'] ?? ''

function resolveAvatar(img) {
  if (!img) return FALLBACK_AVATAR
  if (/^(https?:)?\/\//.test(img) || img.startsWith('data:')) return img
  const filename = img.split('/').pop()
  return assetModules[`/src/assets/${filename}`] ?? FALLBACK_AVATAR
}

function toId(id) {
  return String(id)
}

// Ảnh thật (không phải blank.png) trong dữ liệu này được đặt tên theo quy ước
// TÊN-DDMMYYYY.png (vd: VMH-08031973.png). Nếu người đó chưa khai báo
// birthDate tường minh, suy ra từ tên file ảnh - đây là dữ liệu có thật đã
// được mã hoá sẵn trong tên file, không phải giá trị bịa đặt.
function parseBirthDateFromFilename(img) {
  if (!img) return null
  const match = img.match(/-(\d{2})(\d{2})(\d{4})\.\w+$/)
  if (!match) return null
  const [, day, month, year] = match
  return `${day}/${month}/${year}`
}

function buildPeopleById() {
  const result = {}

  familyStructure.forEach((person) => {
    result[toId(person.id)] = {
      id: toId(person.id),
      name: person.name,
      gender: person.gender,
      birthDate: person.birthDate ?? parseBirthDateFromFilename(person.img) ?? null,
      deathDate: person.deathDate ?? null,
      avatar: resolveAvatar(person.img),
      // Hỗ trợ cả `note`/`notes` như alias của `role` để tránh lệch tên field.
      role: person.role ?? person.note ?? person.notes ?? null,
      parentIds: (person.parentIds ?? []).map(toId),
      spouseIds: (person.spouseIds ?? []).map(toId),
      childrenIds: [],
      collapsed: Boolean(person.collapsed),
    }
  })

  // familyData.js chỉ khai báo parentIds, childrenIds được suy ra ngược lại.
  Object.values(result).forEach((person) => {
    person.parentIds.forEach((parentId) => {
      result[parentId]?.childrenIds.push(person.id)
    })
  })

  return result
}

function computeRootIds(peopleById) {
  const people = Object.values(peopleById)

  // Người "dâu/rể" (không có parentIds vì không sinh ra trong họ) nhưng lấy
  // một người có dòng máu (có parentIds) thì KHÔNG được tính là thủy tổ - họ
  // chỉ nên được kéo vào cây tự động qua spouseIds của người dòng máu đó.
  const marriedIntoBloodline = new Set()
  people.forEach((person) => {
    if (person.parentIds.length > 0) {
      person.spouseIds.forEach((spouseId) => marriedIntoBloodline.add(spouseId))
    }
  })

  const seen = new Set()
  const roots = []

  people
    .filter((person) => person.parentIds.length === 0 && !marriedIntoBloodline.has(person.id))
    .forEach((person) => {
      if (seen.has(person.id)) return
      roots.push(person.id)
      seen.add(person.id)
      person.spouseIds.forEach((spouseId) => seen.add(spouseId))
    })

  return roots
}

export const peopleById = buildPeopleById()
export const rootIds = computeRootIds(peopleById)
