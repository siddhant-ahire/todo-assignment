type ColumnValue = 'todo' | 'inprogress' | 'done'

type Props = {
  value: ColumnValue
  onChange: (value: ColumnValue) => void
}

export default function ColumnSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as ColumnValue)}>
      <option value="todo">Todo</option>
      <option value="inprogress">In Progress</option>
      <option value="done">Done</option>
    </select>
  )
}
