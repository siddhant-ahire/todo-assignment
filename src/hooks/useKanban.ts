import { useEffect, useState } from 'react'
import type { DragEvent } from 'react'

export type Task = {
  id: string
  title: string
  description?: string
}

export type Board = {
  todo: Task[]
  inprogress: Task[]
  done: Task[]
}

const STORAGE_KEY = 'kanban-board-v1'

const defaultBoard = (): Board => ({
  todo: [
    { id: 't-' + Date.now(), title: 'Sample task', description: 'Try dragging me' },
  ],
  inprogress: [],
  done: [],
})

export function useKanban() {
  const [board, setBoard] = useState<Board>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : defaultBoard()
    } catch {
      return defaultBoard()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
    } catch {
      // ignore
    }
  }, [board])

  const addTask = (title: string, description: string, column: keyof Board = 'todo') => {
    if (!title.trim()) return
    const task: Task = { id: 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8), title: title.trim(), description: description.trim() }
    setBoard((b) => ({ ...b, [column]: [task, ...b[column]] }))
  }

  const removeTask = (col: keyof Board, id: string) => {
    setBoard((b) => ({ ...b, [col]: b[col].filter((t) => t.id !== id) }))
  }

  const onDragStart = (e: DragEvent, taskId: string, from: keyof Board) => {
    e.dataTransfer?.setData('text/plain', JSON.stringify({ taskId, from }))
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (e: DragEvent, to: keyof Board) => {
    e.preventDefault()
    try {
      const payload = e.dataTransfer?.getData('text/plain')
      if (!payload) return
      const { taskId, from } = JSON.parse(payload) as { taskId: string; from: keyof Board }
      if (from === to) return
      setBoard((b) => {
        const sourceList = [...b[from]]
        const idx = sourceList.findIndex((t) => t.id === taskId)
        if (idx === -1) return b
        const [task] = sourceList.splice(idx, 1)
        const destList = [task, ...b[to]]
        return { ...b, [from]: sourceList, [to]: destList }
      })
    } catch {
      // ignore
    }
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  }

  return { board, addTask, removeTask, onDragStart, onDrop, onDragOver }
}
