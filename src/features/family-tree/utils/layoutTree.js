import { NODE_WIDTH, NODE_HEIGHT, SPOUSE_GAP, SIBLING_GAP, LEVEL_HEIGHT, TOGGLE_SIZE } from './constants'

/**
 * Gom 2 vợ chồng (hoặc 1 người, nếu chưa có/không có vợ chồng) thành một
 * "gia đình hạt nhân" (family unit). Mỗi unit biết các con của mình và
 * được dựng đệ quy thành cây các family unit, bắt đầu từ rootIds.
 *
 * Chỉ dùng `spouseIds[0]` (vợ/chồng đầu tiên) để dựng cây hiển thị - đây
 * là giới hạn có chủ đích để giữ layout đơn giản, dữ liệu vẫn hỗ trợ khai
 * báo nhiều vợ/chồng cho tương lai.
 */
export function buildFamilyUnits(peopleById, rootIds) {
  const unitOfPerson = new Map() // personId -> unitId
  const units = new Map() // unitId -> unit

  function getOrCreateUnit(personId) {
    const existingUnitId = unitOfPerson.get(personId)
    if (existingUnitId) return units.get(existingUnitId)

    const person = peopleById[personId]
    const spouseId = person.spouseIds?.[0] ?? null
    const spouse = spouseId ? peopleById[spouseId] : null

    const memberIds = spouse
      ? person.gender === 'female' && spouse.gender === 'male'
        ? [spouseId, personId]
        : [personId, spouseId]
      : [personId]

    const childrenIds = [...new Set([...(person.childrenIds ?? []), ...(spouse?.childrenIds ?? [])])]

    const unit = {
      id: memberIds.join('__'),
      bloodId: personId, // người "máu mủ" dùng để nối lên thế hệ cha/mẹ
      memberIds,
      childrenIds,
      childUnits: [],
    }

    units.set(unit.id, unit)
    memberIds.forEach((id) => unitOfPerson.set(id, unit.id))
    return unit
  }

  function buildRecursive(personId) {
    const unit = getOrCreateUnit(personId)
    if (unit.childUnits.length === 0 && unit.childrenIds.length > 0) {
      unit.childUnits = unit.childrenIds.map(buildRecursive)
    }
    return unit
  }

  const roots = rootIds.map(buildRecursive)
  return roots
}

function unitOwnWidth(unit) {
  return unit.memberIds.length === 2 ? NODE_WIDTH * 2 + SPOUSE_GAP : NODE_WIDTH
}

/** Tính bề rộng chiếm dụng của mỗi unit (đệ quy, tôn trọng trạng thái thu gọn). */
function computeWidth(unit, collapsedIds) {
  const ownWidth = unitOwnWidth(unit)
  const isCollapsed = collapsedIds.has(unit.id)

  if (isCollapsed || unit.childUnits.length === 0) {
    unit.layoutWidth = ownWidth
    return unit.layoutWidth
  }

  const childrenWidth =
    unit.childUnits.reduce((sum, child) => sum + computeWidth(child, collapsedIds), 0) +
    (unit.childUnits.length - 1) * SIBLING_GAP

  unit.layoutWidth = Math.max(ownWidth, childrenWidth)
  return unit.layoutWidth
}

/** Đặt tọa độ x/y cho từng thành viên + junction node, sinh ra nodes/edges của React Flow. */
function positionUnit({ unit, leftX, depth, collapsedIds, peopleById, onToggle, nodes, edges }) {
  const width = unit.layoutWidth
  const centerX = leftX + width / 2
  const y = depth * LEVEL_HEIGHT
  const ownWidth = unitOwnWidth(unit)
  const ownLeft = centerX - ownWidth / 2
  const hasChildren = unit.childrenIds.length > 0
  const isCollapsed = collapsedIds.has(unit.id)

  unit.memberIds.forEach((personId, index) => {
    nodes.push({
      id: personId,
      type: 'person',
      position: { x: ownLeft + index * (NODE_WIDTH + SPOUSE_GAP), y },
      data: { person: peopleById[personId] },
      draggable: false,
      selectable: false,
    })
  })

  if (unit.memberIds.length === 2) {
    const [leftId, rightId] = unit.memberIds
    edges.push({
      id: `spouse-${unit.id}`,
      source: leftId,
      sourceHandle: 'right',
      target: rightId,
      targetHandle: 'left',
      type: 'straight',
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      selectable: false,
      focusable: false,
      zIndex: 0,
    })
  }

  if (hasChildren) {
    const junctionId = `junction-${unit.id}`
    const junctionY = unit.memberIds.length === 2 ? y + NODE_HEIGHT / 2 : y + NODE_HEIGHT

    nodes.push({
      id: junctionId,
      type: 'junction',
      position: { x: centerX, y: junctionY },
      data: {},
      draggable: false,
      selectable: false,
    })

    // Nút +/- luôn canh theo người "máu mủ" (bloodId) của UNIT NÀY - tức
    // người nối trực hệ lên thế hệ cha/mẹ phía trên (vd: Võ Thị Liên, không
    // phải chồng cô ấy) - chứ không phải điểm giữa của cặp vợ chồng. Đặt sát
    // mép dưới card của chính người đó (chồng lên viền dưới, giống huy hiệu)
    // để nút trông "dính" liền vào node thay vì trôi nổi cách xa bên dưới.
    const bloodIndex = unit.memberIds.indexOf(unit.bloodId)
    const toggleX = ownLeft + bloodIndex * (NODE_WIDTH + SPOUSE_GAP) + NODE_WIDTH / 2
    const toggleY = y + NODE_HEIGHT - TOGGLE_SIZE / 2

    if (!isCollapsed) {
      const childrenRowWidth =
        unit.childUnits.reduce((sum, child) => sum + child.layoutWidth, 0) +
        (unit.childUnits.length - 1) * SIBLING_GAP

      let cursor = centerX - childrenRowWidth / 2

      unit.childUnits.forEach((childUnit) => {
        positionUnit({ unit: childUnit, leftX: cursor, depth: depth + 1, collapsedIds, peopleById, onToggle, nodes, edges })

        cursor += childUnit.layoutWidth + SIBLING_GAP

        edges.push({
          id: `desc-${junctionId}-${childUnit.bloodId}`,
          source: junctionId,
          sourceHandle: 'bottom',
          target: childUnit.bloodId,
          targetHandle: 'top',
          type: 'smoothstep',
          pathOptions: { borderRadius: 12 },
          style: { stroke: '#94a3b8', strokeWidth: 2 },
          selectable: false,
          focusable: false,
          zIndex: 0,
        })
      })
    }

    // Nút +/- là một node riêng, luôn tồn tại (kể cả khi thu gọn) và được
    // neo gần hàng con thay vì gần node cha/đường nối vợ chồng.
    nodes.push({
      id: `toggle-${unit.id}`,
      type: 'toggle',
      position: { x: toggleX - TOGGLE_SIZE / 2, y: toggleY },
      data: { isCollapsed, onToggle: () => onToggle(unit.id) },
      draggable: false,
      selectable: false,
      zIndex: 10,
    })
  }
}

/**
 * Dựng sẵn tập unit id cần thu gọn lúc khởi tạo, dựa trên cờ `collapsed`
 * khai báo trên từng người trong dữ liệu nguồn (vd: familyData.js). Một unit
 * được coi là thu gọn nếu bất kỳ thành viên nào trong cặp vợ/chồng có
 * `collapsed: true`.
 */
export function getInitialCollapsedUnitIds(peopleById, rootIds) {
  const roots = buildFamilyUnits(peopleById, rootIds)
  const collapsedIds = new Set()

  function walk(unit) {
    if (unit.memberIds.some((id) => peopleById[id]?.collapsed)) {
      collapsedIds.add(unit.id)
    }
    unit.childUnits.forEach(walk)
  }

  roots.forEach(walk)
  return collapsedIds
}

/**
 * Điểm vào chính: nhận danh sách người + id thủy tổ + tập id đang thu gọn,
 * trả về { nodes, edges } sẵn sàng render bằng React Flow.
 */
export function buildTreeLayout({ peopleById, rootIds, collapsedIds, onToggle }) {
  const roots = buildFamilyUnits(peopleById, rootIds)
  roots.forEach((root) => computeWidth(root, collapsedIds))

  const totalWidth =
    roots.reduce((sum, root) => sum + root.layoutWidth, 0) + (roots.length - 1) * SIBLING_GAP * 2

  const nodes = []
  const edges = []
  let cursor = -totalWidth / 2

  roots.forEach((root) => {
    positionUnit({ unit: root, leftX: cursor, depth: 0, collapsedIds, peopleById, onToggle, nodes, edges })
    cursor += root.layoutWidth + SIBLING_GAP * 2
  })

  return { nodes, edges }
}
