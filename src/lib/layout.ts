import type { KarajahData } from './types'

export interface NodePos { x: number; y: number; gen: number }
export interface LayoutResult {
  positions: Record<string, NodePos>
  edges: Array<[string, string]>
  width: number
  height: number
  NODE_W: number
  NODE_H: number
}

const NODE_W = 128
const NODE_H = 44

// Top-down tidy layout — leaves at fixed x increments, parents centered over children
export function layoutTidy(data: KarajahData, collapsed: Set<string>): LayoutResult {
  const X_GAP = 16
  const Y_GAP = 64
  const positions: Record<string, NodePos> = {}
  let nextX = 0

  function walk(id: string, depth: number): number {
    const p = data.byId[id]
    const kids = collapsed.has(id) ? [] : data.childrenOf[id]
    if (kids.length === 0) {
      positions[id] = { x: nextX, y: depth * (NODE_H + Y_GAP), gen: p.gen }
      nextX += NODE_W + X_GAP
      return positions[id].x
    }
    const childXs = kids.map(c => walk(c, depth + 1))
    const left = childXs[0]
    const right = childXs[childXs.length - 1]
    positions[id] = { x: (left + right) / 2, y: depth * (NODE_H + Y_GAP), gen: p.gen }
    return positions[id].x
  }
  walk(data.root.id, 0)

  let maxX = 0, maxY = 0
  for (const pos of Object.values(positions)) {
    maxX = Math.max(maxX, pos.x + NODE_W)
    maxY = Math.max(maxY, pos.y + NODE_H)
  }

  const edges: Array<[string, string]> = []
  for (const id of Object.keys(positions)) {
    if (collapsed.has(id)) continue
    for (const cid of data.childrenOf[id]) {
      if (positions[cid]) edges.push([id, cid])
    }
  }

  return { positions, edges, width: maxX, height: maxY, NODE_W, NODE_H }
}

// Horizontal generational columns
export function layoutColumns(data: KarajahData, collapsed: Set<string>): LayoutResult {
  const COL_W = NODE_W
  const ROW_H = NODE_H
  const X_GAP = 80
  const Y_GAP = 12
  const HEADER = 32

  const positions: Record<string, NodePos> = {}
  const order: Record<number, number> = {}

  function walk(id: string) {
    const p = data.byId[id]
    const row = order[p.gen] ?? 0
    order[p.gen] = row + 1
    positions[id] = {
      x: (p.gen - 1) * (COL_W + X_GAP),
      y: HEADER + row * (ROW_H + Y_GAP),
      gen: p.gen,
    }
    if (!collapsed.has(id)) {
      for (const cid of data.childrenOf[id]) walk(cid)
    }
  }
  walk(data.root.id)

  let maxX = 0, maxY = 0
  for (const pos of Object.values(positions)) {
    maxX = Math.max(maxX, pos.x + COL_W)
    maxY = Math.max(maxY, pos.y + ROW_H)
  }

  const edges: Array<[string, string]> = []
  for (const id of Object.keys(positions)) {
    if (collapsed.has(id)) continue
    for (const cid of data.childrenOf[id]) {
      if (positions[cid]) edges.push([id, cid])
    }
  }

  return { positions, edges, width: maxX + 16, height: maxY + 16, NODE_W: COL_W, NODE_H: ROW_H }
}

// Radial layout — root at center, descendants spread outward
export function layoutRadial(data: KarajahData, collapsed: Set<string>): LayoutResult {
  const RING = 130

  function leafCount(id: string): number {
    if (collapsed.has(id)) return 1
    const kids = data.childrenOf[id]
    if (kids.length === 0) return 1
    return kids.reduce((s, c) => s + leafCount(c), 0)
  }

  const positions: Record<string, NodePos> = {}

  function walk(id: string, startAng: number, endAng: number, depth: number) {
    const p = data.byId[id]
    const angle = (startAng + endAng) / 2
    const r = depth * RING
    positions[id] = { x: Math.cos(angle) * r, y: Math.sin(angle) * r, gen: p.gen }
    if (collapsed.has(id)) return
    const kids = data.childrenOf[id]
    if (kids.length === 0) return
    const total = kids.reduce((s, c) => s + leafCount(c), 0)
    let a = startAng
    for (const c of kids) {
      const share = (endAng - startAng) * (leafCount(c) / total)
      walk(c, a, a + share, depth + 1)
      a += share
    }
  }
  walk(data.root.id, -Math.PI, Math.PI, 0)

  const edges: Array<[string, string]> = []
  for (const id of Object.keys(positions)) {
    if (collapsed.has(id)) continue
    for (const cid of data.childrenOf[id]) {
      if (positions[cid]) edges.push([id, cid])
    }
  }

  const pts = Object.values(positions)
  const minX = Math.min(...pts.map(p => p.x)) - NODE_W
  const maxX = Math.max(...pts.map(p => p.x)) + NODE_W
  const minY = Math.min(...pts.map(p => p.y)) - NODE_H
  const maxY = Math.max(...pts.map(p => p.y)) + NODE_H
  const ox = -minX, oy = -minY
  for (const pos of Object.values(positions)) { pos.x += ox; pos.y += oy }

  return { positions, edges, width: maxX - minX, height: maxY - minY, NODE_W, NODE_H }
}
