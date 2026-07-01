import { useMemo, useState, useCallback } from 'react'
import { ReactFlow, Background, Controls, MiniMap, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import PersonNode from './nodes/PersonNode'
import JunctionNode from './nodes/JunctionNode'
import ToggleNode from './nodes/ToggleNode'
import { peopleById, rootIds } from '../utils/adaptFamilyData'
import { buildTreeLayout, getInitialCollapsedUnitIds } from '../utils/layoutTree'

const nodeTypes = { person: PersonNode, junction: JunctionNode, toggle: ToggleNode }

export default function FamilyTree() {
  const [collapsedIds, setCollapsedIds] = useState(() => getInitialCollapsedUnitIds(peopleById, rootIds))

  const toggleUnit = useCallback((unitId) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev)
      if (next.has(unitId)) {
        next.delete(unitId)
      } else {
        next.add(unitId)
      }
      return next
    })
  }, [])

  const { nodes, edges } = useMemo(
    () => buildTreeLayout({ peopleById, rootIds, collapsedIds, onToggle: toggleUnit }),
    [collapsedIds, toggleUnit],
  )

  return (
    <div className="flex h-full w-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <h1 className="text-lg font-semibold text-slate-800">Cây gia phả họ Vũ</h1>
        <p className="text-xs text-slate-400">Kéo để di chuyển · Cuộn để phóng to/thu nhỏ · Bấm [+/−] để mở rộng/thu gọn</p>
      </header>

      <div className="min-h-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.1}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="!bg-white" nodeColor="#cbd5e1" />
        </ReactFlow>
      </div>
    </div>
  )
}
