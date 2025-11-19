import React, { useState } from 'react'
import ColumnSelect from './ColumnSelect'

type ColumnValue = 'todo' | 'inprogress' | 'done'

type Props = {
  onAdd: (title: string, description: string, column: ColumnValue) => void
}

export default function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [column, setColumn] = useState<ColumnValue>('todo')

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!title.trim()) return
    onAdd(title, description, column)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={submit} className="add-form">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <ColumnSelect value={column} onChange={(v) => setColumn(v)} />
      <button type="submit" className="primary">Add</button>
    </form>
  )
}
