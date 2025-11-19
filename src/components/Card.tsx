import React from 'react'
import type { Task } from '../hooks/useKanban'
import type { Board } from '../hooks/useKanban'

type Props = {
  task: Task
  column: keyof Board
  onDragStart: (e: React.DragEvent, id: string, from: keyof Board) => void
  onRemove: (col: keyof Board, id: string) => void
}

export default function Card({ task, column, onDragStart, onRemove }: Props) {
  return (
    <article className="card" draggable onDragStart={(e) => onDragStart(e, task.id, column)}>
      <div className="card-head">
        <strong>{task.title}</strong>
        <button className="delete" onClick={() => onRemove(column, task.id)} aria-label="Remove">
          ×
        </button>
      </div>
      {task.description && <p className="desc">{task.description}</p>}
    </article>
  )
}
