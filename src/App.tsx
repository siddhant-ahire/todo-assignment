import './App.css'
import { useKanban } from './hooks/useKanban'
import Card from './components/Card'
import TaskInput from './components/TaskInput'

function App() {
  const { board, addTask, removeTask, onDragStart, onDrop, onDragOver } = useKanban()

  return (
    <div className="app-root">
      <header>
        <h1>Simple Kanban Board</h1>
        <p className="subtitle">Drag cards between columns. State is saved to localStorage.</p>
      </header>

      <section className="add-task">
        <TaskInput onAdd={addTask} />
      </section>

      <main className="board">
        <div className="column" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'todo')}>
          <h2>Todo</h2>
          <div className="column-body">
            {board.todo.map((task) => (
              <Card key={task.id} task={task} column="todo" onDragStart={onDragStart} onRemove={removeTask} />
            ))}
          </div>
        </div>

        <div className="column" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'inprogress')}>
          <h2>In Progress</h2>
          <div className="column-body">
            {board.inprogress.map((task) => (
              <Card key={task.id} task={task} column="inprogress" onDragStart={onDragStart} onRemove={removeTask} />
            ))}
          </div>
        </div>

        <div className="column" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'done')}>
          <h2>Done</h2>
          <div className="column-body">
            {board.done.map((task) => (
              <Card key={task.id} task={task} column="done" onDragStart={onDragStart} onRemove={removeTask} />
            ))}
          </div>
        </div>
      </main>

      <footer className="footer-note">Board persisted to localStorage under key <code>kanban-board-v1</code></footer>
    </div>
  )
}

export default App
