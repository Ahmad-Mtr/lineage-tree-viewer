import { useMemo, useEffect, useRef, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
  type ReactFlowInstance,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import type { Person, Lang, TreeLayout, Palette, FilterMode } from '@/lib/types'
import type { KarajahData } from '@/lib/types'
import { genColor } from '@/lib/palettes'
import { personFirst } from '@/lib/i18n'
import { layoutTidy, layoutColumns, layoutRadial } from '@/lib/layout'

// ── Custom node ─────────────────────────────────────────────────────────────

interface NodeData {
  person: Person
  lang: Lang
  palette: Palette
  isSelected: boolean
  isOnPath: boolean
  isHidden: boolean
  collapsed: boolean
  canCollapse: boolean
  layout: TreeLayout
  onToggleCollapse: (id: string) => void
  onSelect: (id: string) => void
  [key: string]: unknown
}

function PersonNode({ data }: { data: NodeData }) {
  const {
    person, lang, palette, isSelected, isOnPath, isHidden,
    collapsed, canCollapse, layout, onToggleCollapse,
  } = data
  const ar = lang === 'ar'
  const color = genColor(person.gen, palette)
  const bg = `color-mix(in oklch, ${color} 14%, var(--cream))`

  const srcPos = layout === 'columns' ? Position.Right : Position.Bottom
  const tgtPos = layout === 'columns' ? Position.Left : Position.Top

  const cls = [
    'tree-node',
    isSelected ? 'selected' : '',
    isOnPath ? 'on-path' : '',
    isHidden ? 'hidden-node' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      style={{ background: isOnPath ? undefined : bg }}
    >
      <Handle type="target" position={tgtPos} />
      <span className="tree-node__swatch" style={{ background: color }} />
      <span className={`tree-node__name${ar ? ' ar' : ''}`} dir={ar ? 'rtl' : 'ltr'}>
        {personFirst(person, lang)}
      </span>
      <Handle type="source" position={srcPos} />
      {canCollapse && (
        <button
          type="button"
          className="tree-node__toggle"
          onClick={(e) => { e.stopPropagation(); onToggleCollapse(person.id) }}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '+' : '−'}
        </button>
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = { personNode: PersonNode as any }

// ── Main tree view ──────────────────────────────────────────────────────────

interface TreeViewProps {
  data: KarajahData
  lang: Lang
  layout: TreeLayout
  palette: Palette
  selectedId: string | null
  highlightPath: Set<string> | null
  collapsed: Set<string>
  filterMode: FilterMode
  genSingle: number
  genRange: [number, number]
  onSelect: (id: string) => void
  onToggleCollapse: (id: string) => void
}

function TreeInner({
  data, lang, layout, palette, selectedId, highlightPath,
  collapsed, filterMode, genSingle, genRange,
  onSelect, onToggleCollapse,
}: TreeViewProps) {
  const rfRef = useRef<ReactFlowInstance | null>(null)

  const activeGens = useMemo(() => {
    if (filterMode === 'single') return new Set([genSingle])
    if (filterMode === 'range') {
      const s = new Set<number>()
      for (let g = genRange[0]; g <= genRange[1]; g++) s.add(g)
      return s
    }
    return null
  }, [filterMode, genSingle, genRange])

  const layoutResult = useMemo(() => {
    if (layout === 'columns') return layoutColumns(data, collapsed)
    if (layout === 'radial') return layoutRadial(data, collapsed)
    return layoutTidy(data, collapsed)
  }, [layout, data, collapsed])

  const { nodes, edges } = useMemo(() => {
    const { positions, edges: rawEdges } = layoutResult

    const stableOnToggle = onToggleCollapse
    const stableOnSelect = onSelect

    const nodes: Node[] = Object.entries(positions).map(([id, pos]) => {
      const person = data.byId[id]
      const isSelected = id === selectedId
      const isOnPath = !!highlightPath?.has(id)
      const isGenActive = !activeGens || activeGens.has(person.gen)
      const isHidden = !isGenActive && !isSelected && !isOnPath
      const canCollapse = data.childrenOf[id].length > 0

      const nodeData: NodeData = {
        person, lang, palette, isSelected, isOnPath, isHidden,
        collapsed: collapsed.has(id),
        canCollapse, layout,
        onToggleCollapse: stableOnToggle,
        onSelect: stableOnSelect,
      }

      return {
        id,
        position: { x: pos.x, y: pos.y },
        type: 'personNode',
        data: nodeData,
        selectable: false,
        draggable: false,
      }
    })

    const edgeType = layout === 'columns' ? 'smoothstep' : layout === 'radial' ? 'straight' : 'smoothstep'

    const edges: Edge[] = rawEdges.map(([source, target]) => ({
      id: `${source}→${target}`,
      source,
      target,
      type: edgeType,
      style: {
        stroke: highlightPath?.has(source) && highlightPath?.has(target)
          ? 'var(--ink)'
          : 'var(--taupe-deep)',
        strokeWidth: highlightPath?.has(source) && highlightPath?.has(target) ? 1.5 : 1,
      },
    }))

    return { nodes, edges }
  }, [layoutResult, data, lang, palette, selectedId, highlightPath, collapsed, activeGens, layout, onSelect, onToggleCollapse])

  // Re-fit whenever layout or collapse set changes
  const fitKey = `${layout}-${collapsed.size}`
  useEffect(() => {
    if (!rfRef.current) return
    const id = requestAnimationFrame(() =>
      rfRef.current?.fitView({ padding: 0.15, duration: 300 })
    )
    return () => cancelAnimationFrame(id)
  }, [fitKey])

  // Center and zoom to the selected node whenever selection changes
  useEffect(() => {
    if (!selectedId) return
    const id = requestAnimationFrame(() =>
      rfRef.current?.fitView({ nodes: [{ id: selectedId }], duration: 400, padding: 0.5, maxZoom: 1.5 })
    )
    return () => cancelAnimationFrame(id)
  }, [selectedId])

  const handleNodeClick = useCallback((_e: ReactMouseEvent, node: Node) => {
    const nd = node.data as NodeData
    if (!nd.isHidden) onSelect(nd.person.id)
  }, [onSelect])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag
      zoomOnScroll
      zoomOnPinch
      minZoom={0.1}
      maxZoom={2.5}
      proOptions={{ hideAttribution: true }}
      style={{ background: 'transparent' }}
      onNodeClick={handleNodeClick}
      onInit={(instance) => {
        rfRef.current = instance
        instance.fitView({ padding: 0.15 })
      }}
    >
      <Controls showInteractive={false} position="bottom-right" />
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--taupe)" />
    </ReactFlow>
  )
}

export function TreeView(props: TreeViewProps) {
  return (
    <ReactFlowProvider>
      <TreeInner {...props} />
    </ReactFlowProvider>
  )
}
